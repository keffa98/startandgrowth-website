import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, GraduationCap, Gauge, CheckCircle, Mail, Linkedin, Sparkles, TrendingUp, Zap, Target, Users, Award, ChevronRight, Rocket, Brain, Shield, Globe, Sun, Moon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { mockData } from '../mock';
import { useTheme, useLanguage } from '../context/AppContext';
import { translations } from '../translations';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({ clients: 0, savings: 0, roi: 0 });

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

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        clients: Math.floor(150 * progress),
        savings: Math.floor(60 * progress),
        roi: Math.floor(450 * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert(t.contact.form.successMessage);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const serviceIcons = {
    automation: Bot,
    formation: GraduationCap,
    audit: Gauge
  };

  const features = [
    { icon: Brain, title: t.hero.features.aiPowered.title, desc: t.hero.features.aiPowered.desc },
    { icon: Rocket, title: t.hero.features.fastResults.title, desc: t.hero.features.fastResults.desc },
    { icon: Shield, title: t.hero.features.enterprise.title, desc: t.hero.features.enterprise.desc },
    { icon: Globe, title: t.hero.features.global.title, desc: t.hero.features.global.desc }
  ];

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0A0B0F] text-white' : 'bg-white text-slate-900'} relative overflow-hidden transition-colors duration-500`}>
      {/* Advanced animated background */}
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
        <div className="container mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-[#39ADE3] blur-xl opacity-50 group-hover:opacity-100 transition-opacity rounded-full"></div>
              <img 
                src="https://customer-assets.emergentagent.com/job_startgrowthlab/artifacts/1vv64623_IMG_4950.PNG" 
                alt="Start & Growth Logo" 
                className="h-10 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {[t.nav.services, t.nav.portfolio, t.nav.benefits, t.nav.contact].map((item, idx) => (
              <a 
                key={idx}
                href={`#${['services', 'portfolio', 'benefits', 'contact'][idx]}`} 
                className={`${isDark ? 'text-white/70 hover:text-[#00FFD1]' : 'text-slate-600 hover:text-[#0774B6]'} transition-all duration-300 text-sm font-semibold uppercase tracking-wider relative group`}
              >
                {item}
                <span className={`absolute -bottom-2 left-0 w-0 h-0.5 ${isDark ? 'bg-gradient-to-r from-[#00FFD1] to-[#39ADE3]' : 'bg-[#0774B6]'} group-hover:w-full transition-all duration-500`}></span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`px-4 h-10 rounded-full font-semibold text-sm transition-all duration-300 ${
                isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {language === 'en' ? '🇫🇷 FR' : '🇬🇧 EN'}
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
            
            <a href="#contact">
              <Button className="bg-gradient-to-r from-[#0774B6] to-[#39ADE3] text-white hover:from-[#39ADE3] hover:to-[#00FFD1] font-bold px-6 h-11 rounded-full shadow-lg shadow-[#0774B6]/30 hover:shadow-[#00FFD1]/40 transition-all duration-300 hover:scale-105 border border-white/10">
                {t.nav.getStarted}
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-10">
              <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-200'} backdrop-blur-xl border hover:border-[#0774B6] transition-all duration-300 group cursor-pointer shadow-lg`}>
                <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'} animate-pulse`} />
                <span className={`text-xs font-bold ${isDark ? 'text-white/90' : 'text-[#0774B6]'} uppercase tracking-wider transition-colors`}>{t.hero.badge}</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                <span className={`block ${isDark ? 'text-white' : 'text-slate-900'} hover-3d`}>{t.hero.title1}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] via-[#00FFD1] to-[#39ADE3] animate-gradient-x bg-[length:200%_auto] hover-3d">{t.hero.title2}</span>
                <span className={`block ${isDark ? 'text-white' : 'text-slate-900'} hover-3d`}>{t.hero.title3}</span>
              </h1>

              <p className={`text-lg ${isDark ? 'text-white/70' : 'text-slate-700'} leading-relaxed max-w-xl`}>
                {t.hero.description} <span className={`${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'} font-bold text-xl`}>60%</span> {t.hero.description2}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact">
                  <Button className="bg-gradient-to-r from-[#00FFD1] to-[#39ADE3] text-black hover:from-[#39ADE3] hover:to-[#00FFD1] font-bold px-8 h-14 rounded-full text-base group shadow-2xl shadow-[#00FFD1]/30 hover:shadow-[#00FFD1]/50 transition-all duration-300 hover:scale-105 border-2 border-white/20">
                    <span>{t.hero.cta1}</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </a>
                <a href="#portfolio">
                  <Button className={`${isDark ? 'bg-white/5 text-white hover:bg-white/10 border-white/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'} backdrop-blur-xl border hover:border-[#39ADE3] font-bold px-8 h-14 rounded-full text-base transition-all duration-300 hover:scale-105`}>
                    {t.hero.cta2}
                  </Button>
                </a>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#39ADE3]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className={`text-3xl font-bold ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] to-[#00FFD1]' : 'text-[#0774B6]'}`}>{stats.clients}+</div>
                    <div className={`text-xs ${isDark ? 'text-white/60' : 'text-slate-600'} uppercase tracking-wider font-semibold mt-1`}>{t.hero.stats.clients}</div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#39ADE3]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className={`text-3xl font-bold ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] to-[#00FFD1]' : 'text-[#0774B6]'}`}>{stats.savings}%</div>
                    <div className={`text-xs ${isDark ? 'text-white/60' : 'text-slate-600'} uppercase tracking-wider font-semibold mt-1`}>{t.hero.stats.savings}</div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#39ADE3]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className={`text-3xl font-bold ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] to-[#00FFD1]' : 'text-[#0774B6]'}`}>{stats.roi}%</div>
                    <div className={`text-xs ${isDark ? 'text-white/60' : 'text-slate-600'} uppercase tracking-wider font-semibold mt-1`}>{t.hero.stats.roi}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={idx}
                    className={`group relative overflow-hidden rounded-3xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur-xl border p-6 hover:border-[#39ADE3]/50 transition-all duration-500 hover:scale-105 cursor-pointer`}
                    style={{
                      animation: `float-up 0.6s ease-out ${idx * 0.1}s both`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#39ADE3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#39ADE3]/20 to-[#00FFD1]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className={`w-6 h-6 ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'}`} />
                      </div>
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'} ${isDark ? 'group-hover:text-[#00FFD1]' : 'group-hover:text-[#0774B6]'} transition-colors`}>{feature.title}</h3>
                      <p className={`text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${isDark ? 'bg-[#39ADE3]/10 border-[#39ADE3]/20' : 'bg-blue-50 border-blue-200'} border mb-6 backdrop-blur-xl`}>
              <Target className={`w-4 h-4 ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'}`} />
              <span className={`text-xs font-bold ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'} uppercase tracking-wider`}>{t.services.badge}</span>
            </div>
            <h2 className={`text-5xl lg:text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.services.title}</h2>
            <p className={`text-xl ${isDark ? 'text-white/60' : 'text-slate-600'} max-w-2xl mx-auto`}>{t.services.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {t.services.items.map((service, index) => {
              const Icon = serviceIcons[['automation', 'formation', 'audit'][index]];
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#39ADE3]/20 to-[#00FFD1]/10 opacity-0 group-hover:opacity-100 rounded-3xl blur-2xl transition-opacity duration-500"></div>
                  <Card className={`relative h-full ${isDark ? 'bg-[#12141A]/80 border-white/10' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur-2xl p-8 hover:border-[#39ADE3]/50 rounded-3xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#39ADE3]/20 overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#39ADE3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-[100px]"></div>
                    
                    <div className="relative space-y-6">
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#39ADE3]/20 to-[#00FFD1]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Icon className={`w-8 h-8 ${isDark ? 'text-[#00FFD1] group-hover:text-[#39ADE3]' : 'text-[#0774B6] group-hover:text-[#39ADE3]'} transition-colors duration-500`} />
                      </div>
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#39ADE3] group-hover:to-[#00FFD1] transition-all duration-300`}>{service.title}</h3>
                      <p className={`${isDark ? 'text-white/70' : 'text-slate-600'} leading-relaxed`}>{service.description}</p>
                      <div className="pt-4">
                        <div className={`inline-flex items-center gap-2 ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'} group-hover:gap-4 transition-all duration-300 cursor-pointer font-bold`}>
                          <span className="text-sm uppercase tracking-wider">{t.services.learnMore}</span>
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${isDark ? 'bg-[#00FFD1]/10 border-[#00FFD1]/20' : 'bg-blue-50 border-blue-200'} border mb-6 backdrop-blur-xl`}>
              <Award className={`w-4 h-4 ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'}`} />
              <span className={`text-xs font-bold ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'} uppercase tracking-wider`}>{t.portfolio.badge}</span>
            </div>
            <h2 className={`text-5xl lg:text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.portfolio.title}</h2>
            <p className={`text-xl ${isDark ? 'text-white/60' : 'text-slate-600'} max-w-2xl mx-auto`}>{t.portfolio.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockData.portfolio.map((project, index) => (
              <Card 
                key={index} 
                className={`group relative ${isDark ? 'bg-[#12141A]/80 border-white/10' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur-2xl p-10 hover:border-[#39ADE3]/50 rounded-3xl transition-all duration-500 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-[#39ADE3]/20`}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#39ADE3]/20 via-[#00FFD1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full"></div>
                
                <div className="relative space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#39ADE3] group-hover:to-[#00FFD1] transition-all duration-300`}>{project.client}</h3>
                      <p className={`${isDark ? 'text-[#39ADE3]' : 'text-[#0774B6]'} text-xs uppercase tracking-widest font-bold`}>{project.industry}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-black ${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00FFD1] to-[#39ADE3]' : 'text-[#0774B6]'}`}>{project.result}</div>
                      <div className={`text-xs ${isDark ? 'text-white/50' : 'text-slate-500'} uppercase tracking-wider font-semibold mt-1`}>{t.portfolio.impact}</div>
                    </div>
                  </div>
                  <p className={`${isDark ? 'text-white/70' : 'text-slate-600'} leading-relaxed text-lg`}>{project.description}</p>
                  <div className={`pt-6 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-[#00FFD1]' : 'bg-[#0774B6]'}`}></div>
                      <span className={`font-bold ${isDark ? 'text-white/90' : 'text-slate-700'} text-sm uppercase tracking-wider`}>{t.portfolio.solution}</span>
                    </div>
                    <p className={`${isDark ? 'text-white/60' : 'text-slate-600'}`}>{project.solution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-32 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${isDark ? 'bg-[#39ADE3]/10 border-[#39ADE3]/20' : 'bg-blue-50 border-blue-200'} border mb-6 backdrop-blur-xl`}>
              <TrendingUp className={`w-4 h-4 ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'}`} />
              <span className={`text-xs font-bold ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'} uppercase tracking-wider`}>{t.benefits.badge}</span>
            </div>
            <h2 className={`text-5xl lg:text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.benefits.title}</h2>
            <p className={`text-xl ${isDark ? 'text-white/60' : 'text-slate-600'} max-w-2xl mx-auto`}>{t.benefits.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {t.benefits.items.map((benefit, index) => (
              <div 
                key={index} 
                className={`group relative p-8 ${isDark ? 'bg-[#12141A]/60 border-white/10' : 'bg-white border-slate-200 shadow-lg'} backdrop-blur-xl border hover:border-[#39ADE3]/50 rounded-3xl transition-all duration-500 hover:bg-opacity-80 cursor-pointer hover:scale-105 overflow-hidden`}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#39ADE3] via-[#00FFD1] to-[#39ADE3] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CheckCircle className={`w-8 h-8 ${isDark ? 'text-[#00FFD1]' : 'text-[#0774B6]'} mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`} />
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white group-hover:text-[#00FFD1]' : 'text-slate-900 group-hover:text-[#0774B6]'} transition-colors duration-300`}>{benefit.title}</h3>
                <p className={`${isDark ? 'text-white/70' : 'text-slate-600'} leading-relaxed`}>{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* ROI Showcase */}
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-[#39ADE3]/20 via-[#00FFD1]/20 to-[#39ADE3]/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            <div className={`relative ${isDark ? 'bg-[#12141A]/80' : 'bg-white'} backdrop-blur-2xl border-2 border-[#39ADE3]/50 p-16 rounded-3xl text-center overflow-hidden shadow-2xl`}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#39ADE3]/5 to-transparent"></div>
              <div className="relative">
                <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] via-[#00FFD1] to-[#39ADE3] mb-4 animate-gradient-x bg-[length:200%_auto]">{t.benefits.roi}</div>
                <p className={`text-xl ${isDark ? 'text-white/80' : 'text-slate-700'}`}>{t.benefits.roiDesc} <span className="text-[#00FFD1] font-bold">{t.benefits.roiTime}</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/20 mb-6 backdrop-blur-xl">
              <Users className="w-4 h-4 text-[#00FFD1]" />
              <span className="text-xs font-bold text-[#00FFD1] uppercase tracking-wider">{t.contact.badge}</span>
            </div>
            <h2 className={`text-5xl lg:text-6xl font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.contact.title}</h2>
            <p className={`text-xl ${isDark ? 'text-white/60' : 'text-slate-600'} max-w-2xl mx-auto`}>{t.contact.subtitle}</p>
          </div>

          <Card className={`relative ${isDark ? 'bg-[#12141A]/80 border-white/10' : 'bg-white border-slate-200 shadow-2xl'} backdrop-blur-2xl p-12 md:p-16 overflow-hidden rounded-3xl`}>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#39ADE3]/20 to-[#00FFD1]/10 blur-3xl rounded-full"></div>
            <form onSubmit={handleSubmit} className="relative space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className={`${isDark ? 'text-white' : 'text-slate-700'} font-bold text-sm uppercase tracking-wider`}>{t.contact.form.name} *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`${isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} backdrop-blur-sm h-14 rounded-2xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-base`}
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>
                <div className="space-y-3">
                  <label className={`${isDark ? 'text-white' : 'text-slate-700'} font-bold text-sm uppercase tracking-wider`}>{t.contact.form.email} *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`${isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} backdrop-blur-sm h-14 rounded-2xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-base`}
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className={`${isDark ? 'text-white' : 'text-slate-700'} font-bold text-sm uppercase tracking-wider`}>{t.contact.form.company}</label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`${isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} backdrop-blur-sm h-14 rounded-2xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-base`}
                  placeholder={t.contact.form.companyPlaceholder}
                />
              </div>
              <div className="space-y-3">
                <label className={`${isDark ? 'text-white' : 'text-slate-700'} font-bold text-sm uppercase tracking-wider`}>{t.contact.form.message} *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className={`${isDark ? 'bg-white/5 border-white/20 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'} backdrop-blur-sm rounded-2xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 resize-none transition-all duration-300 text-base`}
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-[#00FFD1] to-[#39ADE3] text-black hover:from-[#39ADE3] hover:to-[#00FFD1] font-black px-12 h-16 rounded-full text-base w-full shadow-2xl shadow-[#00FFD1]/30 hover:shadow-[#00FFD1]/50 transition-all duration-300 hover:scale-105 group uppercase tracking-wider"
              >
                <span>{t.contact.form.submit}</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'border-white/10' : 'border-slate-200'} py-16 px-6 lg:px-20 relative transition-colors duration-500`}>
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6 md:col-span-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_startgrowthlab/artifacts/1vv64623_IMG_4950.PNG" 
                alt="Start & Growth Logo" 
                className="h-10 object-contain"
              />
              <p className={`${isDark ? 'text-white/60' : 'text-slate-600'} leading-relaxed max-w-md`}>{t.footer.description}</p>
              <div className="flex gap-4">
                <a href="#" className={`w-12 h-12 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#39ADE3] hover:to-[#00FFD1] border rounded-2xl flex items-center justify-center transition-all duration-300 group hover:scale-110`}>
                  <Mail className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-600'} group-hover:text-white transition-colors`} />
                </a>
                <a href="#" className={`w-12 h-12 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#39ADE3] hover:to-[#00FFD1] border rounded-2xl flex items-center justify-center transition-all duration-300 group hover:scale-110`}>
                  <Linkedin className={`w-5 h-5 ${isDark ? 'text-white' : 'text-slate-600'} group-hover:text-white transition-colors`} />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-6 uppercase tracking-wider`}>{t.footer.quickLinks}</h4>
              <nav className="flex flex-col gap-3">
                {[t.nav.services, t.nav.portfolio, t.nav.benefits, t.nav.contact].map((item, idx) => (
                  <a key={idx} href={`#${['services', 'portfolio', 'benefits', 'contact'][idx]}`} className={`${isDark ? 'text-white/60 hover:text-[#00FFD1]' : 'text-slate-600 hover:text-[#0774B6]'} transition-all duration-300 hover:translate-x-2 inline-block text-sm`}>{item}</a>
                ))}
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-6 uppercase tracking-wider`}>{t.footer.services}</h4>
              <nav className="flex flex-col gap-3">
                {t.footer.servicesItems.map((item, idx) => (
                  <a key={idx} href="#services" className={`${isDark ? 'text-white/60 hover:text-[#00FFD1]' : 'text-slate-600 hover:text-[#0774B6]'} transition-all duration-300 hover:translate-x-2 inline-block text-sm`}>{item}</a>
                ))}
              </nav>
            </div>
          </div>
          <div className={`pt-8 border-t ${isDark ? 'border-white/10 text-white/50' : 'border-slate-200 text-slate-600'} text-center text-sm`}>
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
