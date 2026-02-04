import React, { useState, useEffect } from 'react';
import { ArrowRight, Target, Calendar, Users, Rocket, TrendingUp, Award, Linkedin, Mail, Brain, Code, BarChart, Zap, Sparkles, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useTheme, useLanguage } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { translations } from '../translations';

const Event = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const isDark = theme === 'dark';
  const t = translations[language];

  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const content = t.eventPage;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0A0B0F] text-white' : 'bg-white text-slate-900'} relative overflow-hidden transition-colors duration-500`}>
      {/* Advanced animated background - same as homepage */}
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
          <div 
            className="absolute w-[700px] h-[700px] rounded-full blur-3xl animate-mesh-3"
            style={{
              background: `radial-gradient(circle, ${isDark ? 'rgba(7,116,182,0.2)' : 'rgba(7,116,182,0.1)'} 0%, transparent 70%)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
        
        {/* Floating Icons and Shapes */}
        <div className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-[0.02]'}`}>
          {/* AI Brain Icon */}
          <div className="absolute top-[15%] left-[8%] animate-float-slow">
            <Brain className={`w-16 h-16 ${isDark ? 'text-[#39ADE3]' : 'text-[#0774B6]'}`} />
          </div>
          
          {/* Code Icon */}
          <div className="absolute top-[25%] right-[12%] animate-float-delayed" style={{ animationDelay: '1s' }}>
            <Code className={`w-20 h-20 ${isDark ? 'text-[#00FFD1]' : 'text-[#39ADE3]'}`} />
          </div>
          
          {/* Rocket Icon */}
          <div className="absolute top-[60%] left-[15%] animate-float-slow" style={{ animationDelay: '2s' }}>
            <Rocket className={`w-14 h-14 ${isDark ? 'text-[#39ADE3]' : 'text-[#0774B6]'}`} />
          </div>
          
          {/* Bar Chart Icon */}
          <div className="absolute bottom-[20%] right-[18%] animate-float-delayed" style={{ animationDelay: '1.5s' }}>
            <BarChart className={`w-18 h-18 ${isDark ? 'text-[#00FFD1]' : 'text-[#39ADE3]'}`} />
          </div>
          
          {/* Zap Icon */}
          <div className="absolute top-[40%] right-[8%] animate-float-slow" style={{ animationDelay: '0.5s' }}>
            <Zap className={`w-12 h-12 ${isDark ? 'text-[#39ADE3]' : 'text-[#0774B6]'}`} />
          </div>
          
          {/* Target Icon */}
          <div className="absolute bottom-[35%] left-[10%] animate-float-delayed" style={{ animationDelay: '2.5s' }}>
            <Target className={`w-16 h-16 ${isDark ? 'text-[#00FFD1]' : 'text-[#39ADE3]'}`} />
          </div>
          
          {/* Sparkles Icon */}
          <div className="absolute top-[70%] right-[25%] animate-float-slow" style={{ animationDelay: '1.2s' }}>
            <Sparkles className={`w-14 h-14 ${isDark ? 'text-[#39ADE3]' : 'text-[#0774B6]'}`} />
          </div>
          
          {/* TrendingUp Icon */}
          <div className="absolute top-[50%] left-[5%] animate-float-delayed" style={{ animationDelay: '3s' }}>
            <TrendingUp className={`w-18 h-18 ${isDark ? 'text-[#00FFD1]' : 'text-[#39ADE3]'}`} />
          </div>
        </div>
        
        {/* Geometric Shapes */}
        <div className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-[0.01]'}`}>
          {/* Circles */}
          <div className="absolute top-[20%] right-[20%] w-32 h-32 border-2 border-[#39ADE3] rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-[30%] left-[25%] w-24 h-24 border-2 border-[#00FFD1] rounded-full animate-pulse-slow"></div>
          
          {/* Squares */}
          <div className="absolute top-[45%] right-[30%] w-20 h-20 border-2 border-[#39ADE3] animate-rotate-slow"></div>
          <div className="absolute bottom-[15%] left-[35%] w-28 h-28 border-2 border-[#00FFD1] animate-rotate-reverse"></div>
          
          {/* Triangles */}
          <div className="absolute top-[35%] left-[20%] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-[#39ADE3] animate-float-slow"></div>
          <div className="absolute bottom-[40%] right-[15%] w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[40px] border-b-[#00FFD1] animate-float-delayed" style={{ animationDelay: '2s' }}></div>
          
          {/* Hexagons */}
          <div className="absolute top-[55%] right-[40%] w-16 h-16 animate-pulse-slow" style={{ animationDelay: '1s' }}>
            <svg viewBox="0 0 100 100" className={`w-full h-full ${isDark ? 'stroke-[#39ADE3]' : 'stroke-[#0774B6]'}`} fill="none" strokeWidth="2">
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
            </svg>
          </div>
          <div className="absolute bottom-[25%] left-[40%] w-20 h-20 animate-rotate-slow">
            <svg viewBox="0 0 100 100" className={`w-full h-full ${isDark ? 'stroke-[#00FFD1]' : 'stroke-[#39ADE3]'}`} fill="none" strokeWidth="2">
              <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
            </svg>
          </div>
        </div>
        
        {/* Grid Pattern */}
        <div 
          className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-5'}`}
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(57,173,227,0.1)' : 'rgba(57,173,227,0.05)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(57,173,227,0.1)' : 'rgba(57,173,227,0.05)'} 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        {/* Mouse Follow Effect */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(circle, ${isDark ? 'rgba(0,255,209,0.4)' : 'rgba(0,255,209,0.2)'} 0%, transparent 70%)`,
            left: mousePosition.x - 250,
            top: mousePosition.y - 250
          }}
        />
      </div>

      {/* Header with Theme/Language Toggle */}
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
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`px-3 sm:px-4 h-10 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'en' ? '🇫🇷' : '🇬🇧'}
            </button>
            
            {/* Theme Toggle */}
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

      {/* Back to Home */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 pt-28 pb-4 relative z-10">
        <Link to="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-white/70 hover:text-[#00FFD1]' : 'text-slate-600 hover:text-[#0774B6]'} transition-colors`}>
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span className="text-sm font-semibold">{content.backToHome}</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/20 mb-6 backdrop-blur-xl">
            <Calendar className="w-4 h-4 text-[#00FFD1]" />
            <span className="text-xs font-bold text-[#00FFD1] uppercase tracking-wider">{content.hero.badge}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#0774B6] via-[#39ADE3] to-[#00FFD1]">
            {content.hero.title}
          </h1>
          
          <p className={`text-xl sm:text-2xl ${isDark ? 'text-white/80' : 'text-slate-700'} mb-4 max-w-3xl mx-auto`}>
            {content.hero.subtitle}
          </p>
          
          <p className={`text-lg ${isDark ? 'text-white/60' : 'text-slate-600'} mb-6 max-w-2xl mx-auto`}>
            {content.hero.description}
          </p>
          
          <div className={`inline-block px-6 py-3 rounded-full ${isDark ? 'bg-white/5' : 'bg-slate-100'} border ${isDark ? 'border-white/10' : 'border-slate-200'} text-sm ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
            {content.hero.format}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {content.why.title}
          </h2>
          <p className={`text-lg ${isDark ? 'text-white/70' : 'text-slate-600'} mb-12 text-center max-w-3xl mx-auto`}>
            {content.why.intro}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {content.why.points.map((point, idx) => (
              <Card key={idx} className={`${isDark ? 'bg-[#12141A]/80 border-white/10' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur-xl p-8 rounded-3xl hover:scale-105 transition-all duration-500`}>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'}`}>{point.title}</h3>
                <p className={`${isDark ? 'text-white/70' : 'text-slate-600'} leading-relaxed`}>{point.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative z-10 ${isDark ? 'bg-[#0a0a0a]/50' : 'bg-slate-50/50'} backdrop-blur-sm`}>
        <div className="container mx-auto max-w-5xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {content.program.title}
          </h2>
          <p className={`text-lg ${isDark ? 'text-white/70' : 'text-slate-600'} mb-12 text-center`}>
            {content.program.intro}
          </p>
          
          <div className="space-y-6">
            {content.program.items.map((item, idx) => (
              <Card key={idx} className={`${isDark ? 'bg-[#12141A]/80 border-white/10' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur-xl p-8 rounded-3xl`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                    <ul className="space-y-2">
                      {item.points.map((point, pidx) => (
                        <li key={pidx} className={`flex items-start gap-2 ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
                          <span className="text-[#00FFD1] mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {content.benefits.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className={`${isDark ? 'bg-[#12141A]/80 border-white/10' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur-xl p-8 rounded-3xl`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'}`}>{content.benefits.decision.title}</h3>
              <ul className="space-y-3">
                {content.benefits.decision.items.map((item, idx) => (
                  <li key={idx} className={`flex items-start gap-3 ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
                    <Target className="w-5 h-5 text-[#00FFD1] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card className={`${isDark ? 'bg-[#12141A]/80 border-white/10' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur-xl p-8 rounded-3xl`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'}`}>{content.benefits.experts.title}</h3>
              <ul className="space-y-3">
                {content.benefits.experts.items.map((item, idx) => (
                  <li key={idx} className={`flex items-start gap-3 ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
                    <Target className="w-5 h-5 text-[#00FFD1] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Initiator Section */}
      <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative z-10 ${isDark ? 'bg-[#0a0a0a]/50' : 'bg-slate-50/50'} backdrop-blur-sm`}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {content.initiator.title}
            </h2>
            <p className={`text-xl ${isDark ? 'text-[#39ADE3]' : 'text-[#0774B6]'} font-semibold`}>
              {content.initiator.subtitle}
            </p>
          </div>
          
          <Card className={`${isDark ? 'bg-[#12141A]/80 border-white/10' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur-xl p-8 md:p-12 rounded-3xl text-center`}>
            <h3 className={`text-3xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{content.initiator.name}</h3>
            <p className={`text-lg ${isDark ? 'text-white/70' : 'text-slate-600'} leading-relaxed max-w-2xl mx-auto`}>
              {content.initiator.bio}
            </p>
          </Card>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {content.ecosystem.title}
          </h2>
          <p className={`text-xl ${isDark ? 'text-[#39ADE3]' : 'text-[#0774B6]'} font-semibold mb-8 text-center`}>
            {content.ecosystem.subtitle}
          </p>
          <p className={`text-lg ${isDark ? 'text-white/70' : 'text-slate-600'} mb-8 text-center`}>
            {content.ecosystem.intro}
          </p>
          
          <div className="space-y-4 mb-6">
            {content.ecosystem.items.map((item, idx) => (
              <div key={idx} className={`flex items-start gap-3 ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
                <Rocket className="w-5 h-5 text-[#00FFD1] flex-shrink-0 mt-0.5" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
          
          <p className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'} text-center italic`}>
            {content.ecosystem.note}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative z-10 ${isDark ? 'bg-[#0a0a0a]/50' : 'bg-slate-50/50'} backdrop-blur-sm`}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {content.cta.title}
          </h2>
          <p className={`text-lg ${isDark ? 'text-white/70' : 'text-slate-600'} mb-12`}>
            {content.cta.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.linkedin.com/in/k%C3%A9ffa-agboton/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-[#0774B6] to-[#39ADE3] text-white hover:from-[#39ADE3] hover:to-[#00FFD1] font-bold px-8 h-14 rounded-full text-base group shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                <Linkedin className="w-5 h-5 mr-2" />
                <span>LinkedIn</span>
              </Button>
            </a>
            <a href="mailto:contact@startandgrowth.com">
              <Button className={`${isDark ? 'bg-white/5 text-white hover:bg-white/10 border-white/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'} backdrop-blur-xl border font-bold px-8 h-14 rounded-full text-base transition-all duration-300 hover:scale-105 w-full sm:w-auto`}>
                <Mail className="w-5 h-5 mr-2" />
                <span>Email</span>
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Event;
