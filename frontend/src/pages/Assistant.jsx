import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Send, Bot, User, Loader2, FileText, Mail, Sun, Moon, Brain, Code, Rocket, BarChart, Zap, Target, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { useTheme, useLanguage } from '../context/AppContext';
import { translations } from '../translations';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Assistant = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const isDark = theme === 'dark';
  const t = translations[language].assistant;

  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [specsGenerated, setSpecsGenerated] = useState(false);
  const [specsDocument, setSpecsDocument] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    startSession();
  }, [language]);

  const startSession = async () => {
    setIsStarting(true);
    setMessages([]);
    setShowContactForm(false);
    setSpecsGenerated(false);
    setSpecsDocument('');
    
    try {
      const response = await fetch(`${API_URL}/api/assistant/start?language=${language}`, {
        method: 'POST'
      });
      const data = await response.json();
      setSessionId(data.session_id);
      setMessages([{ role: 'assistant', content: data.greeting }]);
    } catch (error) {
      console.error('Failed to start session:', error);
      setMessages([{ role: 'assistant', content: t.errorStarting }]);
    }
    setIsStarting(false);
    inputRef.current?.focus();
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading || !sessionId) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: userMessage,
          language: language
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      
      if (data.requires_contact) {
        setShowContactForm(true);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: t.errorSending }]);
    }
    setIsLoading(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactInfo.name || !contactInfo.email) return;

    setIsGenerating(true);
    try {
      const response = await fetch(`${API_URL}/api/assistant/generate-specs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          contact: contactInfo,
          language: language
        })
      });
      const data = await response.json();
      
      if (data.success) {
        setSpecsDocument(data.specs_document);
        setSpecsGenerated(true);
        setShowContactForm(false);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.email_sent 
            ? t.specsEmailSent.replace('{email}', contactInfo.email)
            : t.specsGenerated
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: t.errorGenerating }]);
      }
    } catch (error) {
      console.error('Failed to generate specs:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: t.errorGenerating }]);
    }
    setIsGenerating(false);
  };

  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0A0B0F] text-white' : 'bg-white text-slate-900'} relative overflow-hidden transition-colors duration-500`}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'opacity-40' : 'opacity-20'}`}>
          <div 
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl animate-mesh-1"
            style={{
              background: `radial-gradient(circle, ${isDark ? 'rgba(57,173,227,0.3)' : 'rgba(57,173,227,0.15)'} 0%, transparent 70%)`,
              top: '10%',
              left: '10%'
            }}
          />
          <div 
            className="absolute w-[600px] h-[600px] rounded-full blur-3xl animate-mesh-2"
            style={{
              background: `radial-gradient(circle, ${isDark ? 'rgba(0,255,209,0.25)' : 'rgba(0,255,209,0.12)'} 0%, transparent 70%)`,
              bottom: '20%',
              right: '15%'
            }}
          />
        </div>
        
        {/* Floating Icons */}
        <div className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-10'}`}>
          <div className="absolute top-[15%] left-[8%] animate-float-slow">
            <Brain className={`w-16 h-16 ${isDark ? 'text-[#39ADE3]' : 'text-[#0774B6]'}`} />
          </div>
          <div className="absolute top-[25%] right-[12%] animate-float-delayed" style={{ animationDelay: '1s' }}>
            <Code className={`w-20 h-20 ${isDark ? 'text-[#00FFD1]' : 'text-[#39ADE3]'}`} />
          </div>
          <div className="absolute bottom-[30%] left-[10%] animate-float-delayed" style={{ animationDelay: '2.5s' }}>
            <Target className={`w-16 h-16 ${isDark ? 'text-[#00FFD1]' : 'text-[#39ADE3]'}`} />
          </div>
        </div>

        {/* Geometric Shapes */}
        <div className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-[0.06]'}`}>
          <div className="absolute top-[20%] right-[20%] w-32 h-32 border-2 border-[#39ADE3] rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-[30%] left-[25%] w-24 h-24 border-2 border-[#00FFD1] rounded-full animate-pulse-slow"></div>
        </div>

        {/* Mouse Follow */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(circle, ${isDark ? 'rgba(0,255,209,0.4)' : 'rgba(0,255,209,0.2)'} 0%, transparent 70%)`,
            left: mousePosition.x - 250,
            top: mousePosition.y - 250
          }}
        />
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-2xl ${isDark ? 'bg-[#0A0B0F]/80 border-white/5' : 'bg-white/80 border-slate-200/50'} border-b transition-colors duration-500`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-[#39ADE3] blur-xl opacity-50 group-hover:opacity-100 transition-opacity rounded-full"></div>
              <img 
                src="https://customer-assets.emergentagent.com/job_startgrowthlab/artifacts/1vv64623_IMG_4950.PNG" 
                alt="Start & Growth Logo" 
                className="h-8 sm:h-10 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLanguage}
              className={`px-3 sm:px-4 h-10 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'en' ? '🇫🇷' : '🇬🇧'}
            </button>
            
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 pt-28 pb-8 relative z-10">
        <Link to="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-white/70 hover:text-[#00FFD1]' : 'text-slate-600 hover:text-[#0774B6]'} transition-colors mb-6`}>
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span className="text-sm font-semibold">{t.backToHome}</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/20 mb-4 backdrop-blur-xl">
              <Bot className="w-4 h-4 text-[#00FFD1]" />
              <span className="text-xs font-bold text-[#00FFD1] uppercase tracking-wider">{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#0774B6] via-[#39ADE3] to-[#00FFD1]">
              {t.title}
            </h1>
            <p className={`text-lg ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
              {t.subtitle}
            </p>
          </div>

          {/* Chat Container */}
          <Card className={`${isDark ? 'bg-[#12141A]/80 border-white/10' : 'bg-white border-slate-200 shadow-xl'} backdrop-blur-xl rounded-3xl overflow-hidden`}>
            {/* Messages Area */}
            <div className="h-[400px] sm:h-[500px] overflow-y-auto p-4 sm:p-6 space-y-4" data-testid="chat-messages">
              {isStarting ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-8 h-8 animate-spin text-[#39ADE3]" />
                </div>
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      data-testid={`message-${msg.role}-${idx}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'assistant' 
                          ? 'bg-gradient-to-br from-[#39ADE3] to-[#00FFD1]' 
                          : isDark ? 'bg-white/10' : 'bg-slate-100'
                      }`}>
                        {msg.role === 'assistant' ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className={`w-4 h-4 ${isDark ? 'text-white' : 'text-slate-600'}`} />
                        )}
                      </div>
                      <div className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.role === 'assistant'
                          ? isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-800'
                          : 'bg-gradient-to-br from-[#0774B6] to-[#39ADE3] text-white'
                      }`}>
                        <p className="text-sm sm:text-base whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#39ADE3] to-[#00FFD1]">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                        <Loader2 className="w-5 h-5 animate-spin text-[#39ADE3]" />
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Contact Form */}
            {showContactForm && !specsGenerated && (
              <div className={`p-4 sm:p-6 border-t ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-[#00FFD1]" />
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.contactTitle}</h3>
                </div>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      placeholder={t.namePlaceholder}
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className={`${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/50' : 'bg-white border-slate-200'} rounded-xl`}
                      data-testid="contact-name"
                    />
                    <Input
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className={`${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/50' : 'bg-white border-slate-200'} rounded-xl`}
                      data-testid="contact-email"
                    />
                    <Input
                      placeholder={t.companyPlaceholder}
                      value={contactInfo.company}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, company: e.target.value }))}
                      className={`${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/50' : 'bg-white border-slate-200'} rounded-xl`}
                      data-testid="contact-company"
                    />
                    <Input
                      placeholder={t.phonePlaceholder}
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className={`${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/50' : 'bg-white border-slate-200'} rounded-xl`}
                      data-testid="contact-phone"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isGenerating || !contactInfo.name || !contactInfo.email}
                    className="w-full bg-gradient-to-r from-[#00FFD1] to-[#39ADE3] text-black hover:from-[#39ADE3] hover:to-[#00FFD1] font-bold h-12 rounded-xl"
                    data-testid="generate-specs-btn"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t.generating}
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        {t.generateAndSend}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}

            {/* Specs Document Display */}
            {specsGenerated && specsDocument && (
              <div className={`p-4 sm:p-6 border-t ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#00FFD1]" />
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.specsTitle}</h3>
                  </div>
                  <Button
                    onClick={startSession}
                    variant="outline"
                    className={`${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-slate-200'} rounded-xl`}
                    data-testid="new-conversation-btn"
                  >
                    {t.newConversation}
                  </Button>
                </div>
                <div className={`max-h-[300px] overflow-y-auto p-4 rounded-xl ${isDark ? 'bg-black/20' : 'bg-white'} text-sm whitespace-pre-wrap ${isDark ? 'text-white/80' : 'text-slate-700'}`}>
                  {specsDocument}
                </div>
              </div>
            )}

            {/* Input Area */}
            {!showContactForm && !specsGenerated && (
              <form onSubmit={sendMessage} className={`p-4 sm:p-6 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <div className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={t.inputPlaceholder}
                    disabled={isLoading || isStarting}
                    className={`flex-1 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/50' : 'bg-slate-50 border-slate-200'} rounded-xl h-12`}
                    data-testid="chat-input"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || isStarting || !inputMessage.trim()}
                    className="bg-gradient-to-r from-[#0774B6] to-[#39ADE3] text-white hover:from-[#39ADE3] hover:to-[#00FFD1] rounded-xl h-12 px-6"
                    data-testid="send-message-btn"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
