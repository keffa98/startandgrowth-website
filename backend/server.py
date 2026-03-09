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
from notion_client import AsyncClient as NotionAsyncClient

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
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'agent@startandgrowth.net')

# Environment
APP_ENV = os.environ.get('APP_ENV', 'development')
IS_PRODUCTION = APP_ENV == 'production'
LEADS_COLLECTION = 'leads' if IS_PRODUCTION else 'leads_dev'
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:3000')

# Notion setup
NOTION_API_KEY = os.environ.get('NOTION_API_KEY', '')
NOTION_CONTACTS_DB_ID = os.environ.get('NOTION_CONTACTS_DB_ID', '')
NOTION_CONTACTS_DB_DEV_ID = os.environ.get('NOTION_CONTACTS_DB_DEV_ID', NOTION_CONTACTS_DB_ID)
NOTION_SPECS_PARENT_PAGE_ID = os.environ.get('NOTION_SPECS_PARENT_PAGE_ID', '')
notion = NotionAsyncClient(auth=NOTION_API_KEY) if NOTION_API_KEY else None

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
specs_store = {}  # In-memory fallback when Firestore is unavailable

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
# For production: use OPENAI_API_KEY
# For Emergent environment: uses EMERGENT_LLM_KEY with their proxy
api_key = os.environ.get('OPENAI_API_KEY') or os.environ.get('EMERGENT_LLM_KEY', '')
base_url = None

# If using Emergent key, use their proxy
if not os.environ.get('OPENAI_API_KEY') and os.environ.get('EMERGENT_LLM_KEY'):
    base_url = "https://api.emergentmethods.ai/v1"

openai_client = AsyncOpenAI(
    api_key=api_key,
    base_url=base_url
)


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
    get_or_create_chat(session_id, language)
    
    # Get initial greeting
    greeting_prompt = "Start the conversation with a greeting." if language == "en" else "Commencez la conversation avec une salutation."
    response = await chat_with_openai(session_id, greeting_prompt, language)
    
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


def _split_text_blocks(text: str, max_length: int = 2000) -> list:
    """Split text into Notion-compatible rich_text blocks (max 2000 chars each)."""
    return [
        {"type": "text", "text": {"content": text[i:i + max_length]}}
        for i in range(0, len(text), max_length)
    ]


async def save_contact_to_notion(contact, notion_page_url: str = None):
    """Add a contact entry to the Notion contacts database."""
    db_id = NOTION_CONTACTS_DB_DEV_ID if not IS_PRODUCTION else NOTION_CONTACTS_DB_ID
    if not notion or not db_id:
        return
    properties = {
        "Name": {"title": [{"text": {"content": contact.name}}]},
        "Email": {"email": contact.email},
    }
    if contact.company:
        properties["Company"] = {"rich_text": [{"text": {"content": contact.company}}]}
    if contact.phone:
        properties["Phone"] = {"phone_number": contact.phone}
    if notion_page_url:
        properties["Specs Page"] = {"url": notion_page_url}
    await notion.pages.create(
        parent={"database_id": db_id},
        properties=properties,
    )


def _parse_inline(text: str) -> list:
    """Convert **bold** markdown to Notion rich_text objects."""
    import re
    parts = []
    for chunk in re.split(r'(\*\*[^*]+\*\*)', text):
        if chunk.startswith('**') and chunk.endswith('**'):
            parts.append({"type": "text", "text": {"content": chunk[2:-2]}, "annotations": {"bold": True}})
        elif chunk:
            for sub in [chunk[i:i+2000] for i in range(0, len(chunk), 2000)]:
                parts.append({"type": "text", "text": {"content": sub}})
    return parts or [{"type": "text", "text": {"content": ""}}]


def _specs_to_notion_blocks(text: str) -> list:
    """Convert markdown-like specs text to Notion block objects, handling indented sub-bullets."""
    import re
    blocks = []
    for line in text.split('\n'):
        # Measure indentation before stripping
        indent = len(line) - len(line.lstrip())
        stripped = line.strip()

        # Decorative separator lines
        if re.fullmatch(r'[-*=]{2,}', stripped):
            blocks.append({"object": "block", "type": "divider", "divider": {}})
            continue

        if not stripped:
            blocks.append({"object": "block", "type": "paragraph", "paragraph": {"rich_text": []}})
            continue

        if stripped.startswith('### '):
            blocks.append({"object": "block", "type": "heading_3", "heading_3": {"rich_text": _parse_inline(stripped[4:])}})
        elif stripped.startswith('## '):
            blocks.append({"object": "block", "type": "heading_2", "heading_2": {"rich_text": _parse_inline(stripped[3:])}})
        elif stripped.startswith('# '):
            blocks.append({"object": "block", "type": "heading_1", "heading_1": {"rich_text": _parse_inline(stripped[2:])}})
        elif re.match(r'^[-*] ', stripped):
            content = stripped[2:]
            if indent >= 2 and blocks:
                # Nest under the last bullet as a Notion child block
                parent = blocks[-1]
                parent_type = parent.get("type")
                if parent_type in ("bulleted_list_item", "numbered_list_item"):
                    parent.setdefault(parent_type, {}).setdefault("children", []).append(
                        {"object": "block", "type": "bulleted_list_item",
                         "bulleted_list_item": {"rich_text": _parse_inline(content)}}
                    )
                    continue
            blocks.append({"object": "block", "type": "bulleted_list_item",
                            "bulleted_list_item": {"rich_text": _parse_inline(content)}})
        elif re.match(r'^\d+\. ', stripped):
            content = re.sub(r'^\d+\. ', '', stripped)
            blocks.append({"object": "block", "type": "numbered_list_item",
                            "numbered_list_item": {"rich_text": _parse_inline(content)}})
        else:
            blocks.append({"object": "block", "type": "paragraph", "paragraph": {"rich_text": _parse_inline(stripped)}})

    return blocks


async def create_specs_notion_page(contact, specs_document: str, language: str) -> str | None:
    """Create a Notion page with the specs document and return its URL."""
    if not notion or not NOTION_SPECS_PARENT_PAGE_ID:
        return None
    title = f"Cahier des Charges – {contact.name}"
    if contact.company:
        title += f" ({contact.company})"

    contact_lines = [f"👤 {contact.name}", f"✉️ {contact.email}"]
    if contact.company:
        contact_lines.append(f"🏢 {contact.company}")
    if contact.phone:
        contact_lines.append(f"📞 {contact.phone}")

    children = [
        {
            "object": "block", "type": "callout",
            "callout": {
                "rich_text": [{"type": "text", "text": {"content": "\n".join(contact_lines)}}],
                "icon": {"emoji": "📋"},
                "color": "blue_background",
            },
        },
        {"object": "block", "type": "divider", "divider": {}},
        *_specs_to_notion_blocks(specs_document),
    ]

    page = await notion.pages.create(
        parent={"page_id": NOTION_SPECS_PARENT_PAGE_ID},
        properties={"title": {"title": [{"text": {"content": title}}]}},
        children=children,
    )
    return page.get("url")


@api_router.post("/assistant/generate-specs")
async def generate_specs(request: GenerateSpecsRequest):
    """Generate specifications document and send via email"""
    try:
        if request.session_id not in chat_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        session_data = chat_sessions[request.session_id]
        language = request.language
        
        # Generate specs document
        specs_prompt = SPECS_GENERATION_PROMPT.get(language, SPECS_GENERATION_PROMPT["en"])
        specs_document = await chat_with_openai(request.session_id, specs_prompt, language)
        
        # Save to Notion: create specs page then add contact to DB
        notion_page_url = None
        try:
            notion_page_url = await create_specs_notion_page(request.contact, specs_document, language)
            await save_contact_to_notion(request.contact, notion_page_url)
            if notion_page_url:
                logger.info(f"Notion page created: {notion_page_url}")
        except Exception as e:
            logger.error(f"Notion integration error: {str(e)}")

        # Save lead to database
        lead_id = str(uuid.uuid4())
        specs_token = str(uuid.uuid4())
        specs_url = f"{FRONTEND_URL}/specs/{specs_token}"
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
            "specs_token": specs_token,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        specs_data = {
            "specs_document": specs_document,
            "name": request.contact.name,
            "company": request.contact.company,
            "language": language,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        if USE_FIRESTORE:
            firestore_db.collection(LEADS_COLLECTION).document(lead_id).set(lead_doc)
            firestore_db.collection('specs_tokens').document(specs_token).set(specs_data)
            logger.info(f"Lead saved to Firestore ({LEADS_COLLECTION}): {lead_id}")
        else:
            specs_store[specs_token] = specs_data
            logger.info(f"Specs stored in memory with token: {specs_token}")
        
        # Send email with specs
        email_subject = (
            f"Your Project Proposal – {request.contact.company or request.contact.name} | Startandgrowth"
            if language == "en" else
            f"Votre Cahier de Charges – {request.contact.company or request.contact.name} | Startandgrowth"
        )

        def specs_to_html(text: str) -> str:
            """Convert plain-text specs (markdown-like) to HTML."""
            import re
            lines = text.split('\n')
            html_parts = []
            in_list = False
            for line in lines:
                stripped = line.strip()
                if not stripped:
                    if in_list:
                        html_parts.append('</ul>')
                        in_list = False
                    html_parts.append('<br>')
                    continue
                # Headings
                if stripped.startswith('### '):
                    if in_list: html_parts.append('</ul>'); in_list = False
                    html_parts.append(f'<h3 style="color:#0774B6;font-size:15px;margin:20px 0 6px 0;">{stripped[4:]}</h3>')
                elif stripped.startswith('## '):
                    if in_list: html_parts.append('</ul>'); in_list = False
                    html_parts.append(f'<h2 style="color:#0774B6;font-size:17px;font-weight:700;margin:28px 0 8px 0;padding-bottom:6px;border-bottom:2px solid #e8f4fd;">{stripped[3:]}</h2>')
                elif stripped.startswith('# '):
                    if in_list: html_parts.append('</ul>'); in_list = False
                    html_parts.append(f'<h1 style="color:#0774B6;font-size:20px;font-weight:700;margin:28px 0 8px 0;">{stripped[2:]}</h1>')
                # Bullet points
                elif stripped.startswith('- ') or stripped.startswith('* '):
                    if not in_list:
                        html_parts.append('<ul style="margin:8px 0;padding-left:20px;">')
                        in_list = True
                    content = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', stripped[2:])
                    html_parts.append(f'<li style="margin:4px 0;color:#444;">{content}</li>')
                # Regular paragraph
                else:
                    if in_list: html_parts.append('</ul>'); in_list = False
                    content = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', stripped)
                    html_parts.append(f'<p style="margin:8px 0;color:#444;line-height:1.7;">{content}</p>')
            if in_list:
                html_parts.append('</ul>')
            return '\n'.join(html_parts)

        specs_html = specs_to_html(specs_document)
        date_str = datetime.now(timezone.utc).strftime('%B %d, %Y') if language == 'en' else datetime.now(timezone.utc).strftime('%d %B %Y')

        email_html = f"""<!DOCTYPE html>
<html lang="{'en' if language == 'en' else 'fr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{email_subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f4f8;padding:40px 20px;">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0774B6 0%,#39ADE3 100%);border-radius:12px 12px 0 0;padding:40px 48px;text-align:center;">
          <p style="margin:0 0 16px 0;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.75);">Startandgrowth · AI Consulting &amp; Software Engineering</p>
          <h1 style="margin:0 0 8px 0;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">
            {"Project Proposal" if language == "en" else "Proposition de Projet"}
          </h1>
          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.8);">{date_str}</p>
        </td></tr>

        <!-- Divider accent -->
        <tr><td style="height:4px;background:linear-gradient(90deg,#00FFD1,#39ADE3);"></td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:48px;">

          <p style="margin:0 0 24px 0;font-size:16px;color:#1a1a2e;line-height:1.6;">
            {"Dear" if language == "en" else "Cher(e)"} <strong>{request.contact.name}</strong>,
          </p>

          <p style="margin:0 0 32px 0;font-size:15px;color:#444;line-height:1.7;">
            {"Following our discussion, please find below the project proposal we have prepared for you. This document outlines the scope, objectives, and key deliverables based on your requirements." if language == "en" else "Suite à notre échange, veuillez trouver ci-dessous la proposition de projet que nous avons préparée pour vous. Ce document présente le périmètre, les objectifs et les livrables clés basés sur vos besoins."}
          </p>

          <!-- Specs document -->
          <div style="background:#f8fbff;border:1px solid #e0edf7;border-left:4px solid #0774B6;border-radius:8px;padding:32px 36px;margin-bottom:36px;">
            {specs_html}
          </div>

          <!-- CTA -->
          <div style="background:#f0f9ff;border-radius:8px;padding:24px 32px;margin-bottom:36px;text-align:center;">
            <p style="margin:0 0 16px 0;font-size:15px;color:#444;line-height:1.6;">
              {"You can reach to discuss the next steps and get answer to any questions you may have." if language == "en" else "Vous pouver nous contacter pour discuter des prochaines étapes de votre projet."}
            </p>
            <a href="https://calendar.app.google/gxFMbemWhmKeWnCD6" style="display:inline-block;background:linear-gradient(135deg,#0774B6,#39ADE3);color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 32px;border-radius:6px;letter-spacing:0.5px;">
              {"Visit our website" if language == "en" else "Visiter notre site"}
            </a>
          </div>

          <!-- Public specs link -->
          <div style="background:#f5f5f5;border:1px solid #e0e0e0;border-radius:8px;padding:16px 24px;margin-bottom:36px;text-align:center;">
            <p style="margin:0 0 12px 0;font-size:13px;color:#666;">{"View the full document online:" if language == "en" else "Consulter le document complet en ligne :"}</p>
            <a href="{specs_url}" style="display:inline-block;background:#fff;border:2px solid #0774B6;color:#0774B6;text-decoration:none;font-weight:700;font-size:14px;padding:12px 28px;border-radius:6px;">{"Open document" if language == "en" else "Ouvrir le document"} →</a>
          </div>

          <!-- Signature -->
          <table cellpadding="0" cellspacing="0" style="border-top:1px solid #eee;padding-top:28px;width:100%;">
            <tr>
              <td>
                <p style="margin:0 0 4px 0;font-size:15px;font-weight:700;color:#1a1a2e;">Aros FONTON</p>
                <p style="margin:0 0 2px 0;font-size:13px;color:#0774B6;font-weight:600;">Software Engineer|AI Consultant</p>
                <p style="margin:0;font-size:13px;color:#888;">arosf@startandgrowth.net</p>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#1a1a2e;border-radius:0 0 12px 12px;padding:24px 48px;text-align:center;">
          <p style="margin:0 0 8px 0;font-size:13px;color:rgba(255,255,255,0.5);">
            © 2022 Startandgrowth · AI Consulting &amp; Software Engineering
          </p>
          <p style="margin:0;font-size:13px;">
            <a href="https://startandgrowth.net" style="color:#39ADE3;text-decoration:none;">startandgrowth.net</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>"""
        
        # Send email
        email_sent = False
        email_id = None
        try:
            if resend.api_key and resend.api_key != 're_your_api_key_here':
                params = {
                    "from": SENDER_EMAIL,
                    "to": [request.contact.email],
                    "cc": ["arosf@startandgrowth.net"],
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
            "specs_url": specs_url,
            "notion_page_url": notion_page_url,
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
        docs = firestore_db.collection(LEADS_COLLECTION).order_by('created_at', direction=fs.Query.DESCENDING).stream()
        for doc in docs:
            leads.append(doc.to_dict())
    else:
        docs = await mongo_db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
        leads = docs
    return {"leads": leads, "count": len(leads)}


@api_router.get("/specs/{token}")
async def get_specs(token: str):
    """Public endpoint to retrieve a specs document by token"""
    if USE_FIRESTORE:
        doc = firestore_db.collection('specs_tokens').document(token).get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Document not found")
        return doc.to_dict()
    # Fallback: in-memory store for local dev
    if token in specs_store:
        return specs_store[token]
    raise HTTPException(status_code=404, detail="Document not found")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
