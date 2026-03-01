from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import asyncio
import resend
import json
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from openai import AsyncOpenAI

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database initialization - supports both Firestore and MongoDB
USE_FIRESTORE = False
db = None
firestore_db = None
mongo_db = None

def init_database():
    """Initialize database - Firestore for production, MongoDB for local dev"""
    global USE_FIRESTORE, db, firestore_db, mongo_db
    
    # Try Firebase first
    service_account_path = ROOT_DIR / 'firebase-service-account.json'
    firebase_env = os.environ.get('FIREBASE_SERVICE_ACCOUNT')
    
    if service_account_path.exists() or firebase_env:
        try:
            import firebase_admin
            from firebase_admin import credentials, firestore
            
            if not firebase_admin._apps:
                if service_account_path.exists():
                    cred = credentials.Certificate(str(service_account_path))
                else:
                    service_account_info = json.loads(firebase_env)
                    cred = credentials.Certificate(service_account_info)
                firebase_admin.initialize_app(cred)
            
            firestore_db = firestore.client()
            USE_FIRESTORE = True
            logging.info("✅ Using Firestore database")
            return firestore_db
        except Exception as e:
            logging.warning(f"Firebase init failed: {e}, falling back to MongoDB")
    
    # Fallback to MongoDB for local development
    try:
        from motor.motor_asyncio import AsyncIOMotorClient
        mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
        client = AsyncIOMotorClient(mongo_url)
        mongo_db = client[os.environ.get('DB_NAME', 'startandgrowth')]
        USE_FIRESTORE = False
        logging.info("✅ Using MongoDB database (local mode)")
        return mongo_db
    except Exception as e:
        logging.error(f"MongoDB init failed: {e}")
        raise ValueError("No database available. Set up Firebase or MongoDB.")

# Initialize database
db = init_database()

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'aiagent@startandgrowth.net')

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Store active chat sessions (in-memory for now)
chat_sessions = {}

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ChatMessage(BaseModel):
    session_id: str
    message: str
    language: str = "en"

class ChatResponse(BaseModel):
    response: str
    is_complete: bool = False
    requires_contact: bool = False

class ContactInfo(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None

class GenerateSpecsRequest(BaseModel):
    session_id: str
    contact: ContactInfo
    language: str = "en"

# System prompts for the AI assistant
SYSTEM_PROMPTS = {
    "en": """You are an AI consultant assistant for Startandgrowth, an AI consulting and software engineering company. Your role is to help potential clients define their project requirements.

IMPORTANT GUIDELINES:
1. Ask ONE question at a time to understand their needs
2. Be friendly, professional, and concise
3. Focus on understanding:
   - What problem they want to solve
   - What type of solution they need (AI implementation, software application, automation, etc.)
   - Key features and functionalities required
   - Target users/audience
   - Timeline expectations
   - Budget range (optional, ask gently)
   - Any existing systems to integrate with

4. After gathering enough information (typically 5-8 exchanges), summarize what you understood and ask if they want to generate a specifications document.

5. When the user confirms they want the specs document, respond with exactly: "[READY_FOR_SPECS]" followed by a brief summary.

6. Keep responses short and focused - maximum 2-3 sentences per response.

Start by warmly greeting the user and asking what brings them to Startandgrowth today.""",

    "fr": """Vous êtes un assistant consultant IA pour Startandgrowth, une entreprise de conseil en IA et d'ingénierie logicielle. Votre rôle est d'aider les clients potentiels à définir les exigences de leur projet.

DIRECTIVES IMPORTANTES:
1. Posez UNE question à la fois pour comprendre leurs besoins
2. Soyez amical, professionnel et concis
3. Concentrez-vous sur la compréhension de:
   - Quel problème ils veulent résoudre
   - Quel type de solution ils ont besoin (implémentation IA, application logicielle, automatisation, etc.)
   - Fonctionnalités clés requises
   - Utilisateurs/audience cible
   - Attentes en termes de délais
   - Fourchette de budget (optionnel, demandez délicatement)
   - Systèmes existants à intégrer

4. Après avoir recueilli suffisamment d'informations (généralement 5-8 échanges), résumez ce que vous avez compris et demandez s'ils veulent générer un document de spécifications.

5. Lorsque l'utilisateur confirme qu'il veut le document de spécifications, répondez exactement: "[READY_FOR_SPECS]" suivi d'un bref résumé.

6. Gardez les réponses courtes et ciblées - maximum 2-3 phrases par réponse.

Commencez par saluer chaleureusement l'utilisateur et demandez ce qui les amène chez Startandgrowth aujourd'hui."""
}

SPECS_GENERATION_PROMPT = {
    "en": """Based on our conversation, generate a professional software/AI project specifications document. Include:

1. **Project Overview**
   - Project name (suggest one based on the discussion)
   - Brief description
   - Business objectives

2. **Problem Statement**
   - Current challenges
   - Pain points addressed

3. **Proposed Solution**
   - Solution type (AI/Software/Automation)
   - High-level architecture

4. **Functional Requirements**
   - Core features (list with priorities: Must-have, Should-have, Nice-to-have)
   - User stories

5. **Technical Requirements**
   - Suggested technology stack
   - Integration requirements
   - Performance expectations

6. **Target Users**
   - Primary users
   - User personas

7. **Timeline & Milestones**
   - Suggested phases
   - Key deliverables

8. **Budget Considerations**
   - Estimated effort level (Small/Medium/Large)
   - Cost factors to consider

9. **Next Steps**
   - Recommended actions
   - Questions to clarify

Format this as a professional document that can be shared with stakeholders.""",

    "fr": """Sur la base de notre conversation, générez un document professionnel de spécifications de projet logiciel/IA. Incluez:

1. **Aperçu du Projet**
   - Nom du projet (suggérez-en un basé sur la discussion)
   - Brève description
   - Objectifs commerciaux

2. **Énoncé du Problème**
   - Défis actuels
   - Points de douleur adressés

3. **Solution Proposée**
   - Type de solution (IA/Logiciel/Automatisation)
   - Architecture de haut niveau

4. **Exigences Fonctionnelles**
   - Fonctionnalités principales (liste avec priorités: Indispensable, Souhaitable, Optionnel)
   - User stories

5. **Exigences Techniques**
   - Stack technologique suggéré
   - Exigences d'intégration
   - Attentes de performance

6. **Utilisateurs Cibles**
   - Utilisateurs principaux
   - Personas utilisateurs

7. **Calendrier & Jalons**
   - Phases suggérées
   - Livrables clés

8. **Considérations Budgétaires**
   - Niveau d'effort estimé (Petit/Moyen/Grand)
   - Facteurs de coût à considérer

9. **Prochaines Étapes**
   - Actions recommandées
   - Questions à clarifier

Formatez ceci comme un document professionnel pouvant être partagé avec les parties prenantes."""
}


# OpenAI client initialization
openai_client = AsyncOpenAI(api_key=os.environ.get('EMERGENT_LLM_KEY', ''))


async def chat_with_openai(session_id: str, user_message: str, language: str = "en") -> str:
    """Send message to OpenAI and get response"""
    # Get or create session
    if session_id not in chat_sessions:
        chat_sessions[session_id] = {
            "messages": [],
            "language": language,
            "history": [{"role": "system", "content": SYSTEM_PROMPTS.get(language, SYSTEM_PROMPTS["en"])}]
        }
    
    session = chat_sessions[session_id]
    
    # Add user message to history
    session["history"].append({"role": "user", "content": user_message})
    
    # Call OpenAI
    response = await openai_client.chat.completions.create(
        model="gpt-4o",
        messages=session["history"],
        max_tokens=1000,
        temperature=0.7
    )
    
    assistant_message = response.choices[0].message.content
    
    # Add assistant response to history
    session["history"].append({"role": "assistant", "content": assistant_message})
    
    return assistant_message


def get_or_create_chat(session_id: str, language: str = "en"):
    """Get existing chat session or create a new one"""
    if session_id not in chat_sessions:
        chat_sessions[session_id] = {
            "messages": [],
            "language": language,
            "history": [{"role": "system", "content": SYSTEM_PROMPTS.get(language, SYSTEM_PROMPTS["en"])}]
        }
    return chat_sessions[session_id]


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.get("/health")
async def health_check():
    """Health check endpoint for Render"""
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc_data = {
        "id": status_obj.id,
        "client_name": status_obj.client_name,
        "timestamp": status_obj.timestamp.isoformat()
    }
    # Save to database
    if USE_FIRESTORE:
        firestore_db.collection('status_checks').document(status_obj.id).set(doc_data)
    else:
        await mongo_db.status_checks.insert_one(doc_data)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = []
    if USE_FIRESTORE:
        docs = firestore_db.collection('status_checks').stream()
        for doc in docs:
            data = doc.to_dict()
            if isinstance(data.get('timestamp'), str):
                data['timestamp'] = datetime.fromisoformat(data['timestamp'])
            status_checks.append(StatusCheck(**data))
    else:
        docs = await mongo_db.status_checks.find({}, {"_id": 0}).to_list(1000)
        for data in docs:
            if isinstance(data.get('timestamp'), str):
                data['timestamp'] = datetime.fromisoformat(data['timestamp'])
            status_checks.append(StatusCheck(**data))
    return status_checks


@api_router.post("/assistant/chat", response_model=ChatResponse)
async def chat_with_assistant(request: ChatMessage):
    """Send a message to the AI assistant and get a response"""
    try:
        get_or_create_chat(request.session_id, request.language)
        
        # Store user message
        chat_sessions[request.session_id]["messages"].append({
            "role": "user",
            "content": request.message,
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
        # Send message to OpenAI
        response = await chat_with_openai(request.session_id, request.message, request.language)
        
        # Store assistant response
        chat_sessions[request.session_id]["messages"].append({
            "role": "assistant",
            "content": response,
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
        # Check if ready to generate specs
        is_complete = "[READY_FOR_SPECS]" in response
        if is_complete:
            response = response.replace("[READY_FOR_SPECS]", "").strip()
        
        return ChatResponse(
            response=response,
            is_complete=is_complete,
            requires_contact=is_complete
        )
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/assistant/start")
async def start_session(language: str = "en"):
    """Start a new chat session"""
    session_id = str(uuid.uuid4())
    chat = get_or_create_chat(session_id, language)
    
    # Get initial greeting
    greeting_prompt = "Start the conversation with a greeting." if language == "en" else "Commencez la conversation avec une salutation."
    user_message = UserMessage(text=greeting_prompt)
    response = await chat.send_message(user_message)
    
    # Store the greeting
    chat_sessions[session_id]["messages"].append({
        "role": "assistant",
        "content": response,
        "timestamp": datetime.now(timezone.utc).isoformat()
    })
    
    return {
        "session_id": session_id,
        "greeting": response
    }


@api_router.post("/assistant/generate-specs")
async def generate_specs(request: GenerateSpecsRequest):
    """Generate specifications document and send via email"""
    try:
        if request.session_id not in chat_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        session_data = chat_sessions[request.session_id]
        chat = session_data["chat"]
        language = request.language
        
        # Generate specs document
        specs_prompt = SPECS_GENERATION_PROMPT.get(language, SPECS_GENERATION_PROMPT["en"])
        user_message = UserMessage(text=specs_prompt)
        specs_document = await chat.send_message(user_message)
        
        # Save lead to database
        lead_id = str(uuid.uuid4())
        lead_doc = {
            "id": lead_id,
            "session_id": request.session_id,
            "name": request.contact.name,
            "email": request.contact.email,
            "company": request.contact.company,
            "phone": request.contact.phone,
            "language": language,
            "conversation": session_data["messages"],
            "specs_document": specs_document,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        if USE_FIRESTORE:
            firestore_db.collection('leads').document(lead_id).set(lead_doc)
            logger.info(f"Lead saved to Firestore: {lead_id}")
        else:
            await mongo_db.leads.insert_one(lead_doc)
            logger.info(f"Lead saved to MongoDB: {lead_id}")
        
        # Send email with specs
        email_subject = "Your Project Specifications - Startandgrowth" if language == "en" else "Vos Spécifications de Projet - Startandgrowth"
        
        email_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 800px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #0774B6, #39ADE3); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                .specs {{ background: white; padding: 20px; border-radius: 8px; margin-top: 20px; white-space: pre-wrap; }}
                .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
                h1 {{ margin: 0; }}
                h2 {{ color: #0774B6; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>{"Project Specifications" if language == "en" else "Spécifications du Projet"}</h1>
                    <p>{"Generated by Startandgrowth AI Assistant" if language == "en" else "Généré par l'Assistant IA Startandgrowth"}</p>
                </div>
                <div class="content">
                    <p>{"Dear" if language == "en" else "Cher(e)"} {request.contact.name},</p>
                    <p>{"Thank you for using our AI assistant. Below are your project specifications based on our conversation:" if language == "en" else "Merci d'avoir utilisé notre assistant IA. Voici les spécifications de votre projet basées sur notre conversation:"}</p>
                    <div class="specs">
                        {specs_document.replace(chr(10), '<br>')}
                    </div>
                    <p style="margin-top: 30px;">{"Our team will review these specifications and contact you shortly to discuss the next steps." if language == "en" else "Notre équipe examinera ces spécifications et vous contactera prochainement pour discuter des prochaines étapes."}</p>
                    <p>{"Best regards," if language == "en" else "Cordialement,"}<br><strong>The Startandgrowth Team</strong></p>
                </div>
                <div class="footer">
                    <p>© 2025 Startandgrowth - AI Consulting & Software Engineering</p>
                    <p><a href="https://startandgrowth.com">startandgrowth.com</a></p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Send email
        email_sent = False
        email_id = None
        try:
            if resend.api_key and resend.api_key != 're_your_api_key_here':
                params = {
                    "from": SENDER_EMAIL,
                    "to": [request.contact.email],
                    "subject": email_subject,
                    "html": email_html
                }
                email_result = await asyncio.to_thread(resend.Emails.send, params)
                email_sent = True
                email_id = email_result.get("id") if email_result else None
                logger.info(f"Email sent: {email_id}")
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
        
        # Clean up session
        if request.session_id in chat_sessions:
            del chat_sessions[request.session_id]
        
        return {
            "success": True,
            "specs_document": specs_document,
            "email_sent": email_sent,
            "email_id": email_id,
            "message": "Specifications generated successfully!" if language == "en" else "Spécifications générées avec succès!"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Generate specs error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/leads")
async def get_leads():
    """Get all leads from database"""
    leads = []
    if USE_FIRESTORE:
        from firebase_admin import firestore as fs
        docs = firestore_db.collection('leads').order_by('created_at', direction=fs.Query.DESCENDING).stream()
        for doc in docs:
            leads.append(doc.to_dict())
    else:
        docs = await mongo_db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        leads = docs
    return {"leads": leads, "count": len(leads)}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
