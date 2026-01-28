import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Bot, GraduationCap, Gauge, CheckCircle, Mail, Linkedin, Sparkles, TrendingUp, Zap, Target, Users, Award, ChevronRight, Rocket, BarChart, Brain, Code, Shield, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { mockData } from '../mock';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({ clients: 0, savings: 0, roi: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

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
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const serviceIcons = {
    automation: Bot,
    formation: GraduationCap,
    audit: Gauge
  };

  const features = [
    { icon: Brain, title: 'AI-Powered', desc: 'Cutting-edge intelligence' },
    { icon: Rocket, title: 'Fast Results', desc: '6-12 months ROI' },
    { icon: Shield, title: 'Enterprise Grade', desc: 'Bank-level security' },
    { icon: Globe, title: 'Global Scale', desc: 'Worldwide deployment' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white relative overflow-hidden">
      {/* Advanced animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-40">
          <div 
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl animate-mesh-1"
            style={{
              background: 'radial-gradient(circle, rgba(57,173,227,0.3) 0%, transparent 70%)',
              top: '10%',
              left: '10%'
            }}
          />
          <div 
            className="absolute w-[600px] h-[600px] rounded-full blur-3xl animate-mesh-2"
            style={{
              background: 'radial-gradient(circle, rgba(0,255,209,0.25) 0%, transparent 70%)',
              bottom: '20%',
              right: '15%'
            }}
          />
          <div 
            className="absolute w-[700px] h-[700px] rounded-full blur-3xl animate-mesh-3"
            style={{
              background: 'radial-gradient(circle, rgba(7,116,182,0.2) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(57,173,227,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(57,173,227,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        {/* Mouse follower glow */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,209,0.4) 0%, transparent 70%)',
            left: mousePosition.x - 250,
            top: mousePosition.y - 250
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-2xl bg-[#0A0B0F]/80 border-b border-white/5">
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
            {['Services', 'Portfolio', 'Benefits', 'Contact'].map((item, idx) => (
              <a 
                key={idx}
                href={`#${item.toLowerCase()}`} 
                className="text-white/70 hover:text-[#00FFD1] transition-all duration-300 text-sm font-semibold uppercase tracking-wider relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00FFD1] to-[#39ADE3] group-hover:w-full transition-all duration-500"></span>
              </a>
            ))}
          </nav>
          <a href="#contact">
            <Button className="bg-gradient-to-r from-[#0774B6] to-[#39ADE3] text-white hover:from-[#39ADE3] hover:to-[#00FFD1] font-bold px-6 h-11 rounded-full shadow-lg shadow-[#0774B6]/30 hover:shadow-[#00FFD1]/40 transition-all duration-300 hover:scale-105 border border-white/10">
              Get Started
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#00FFD1]/50 transition-all duration-300 group cursor-pointer">
                <Sparkles className="w-4 h-4 text-[#00FFD1] animate-pulse" />
                <span className="text-xs font-bold text-white/90 uppercase tracking-wider group-hover:text-[#00FFD1] transition-colors">Powered by AI</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                <span className="block text-white hover-3d">Transform</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] via-[#00FFD1] to-[#39ADE3] animate-gradient-x bg-[length:200%_auto] hover-3d">Business</span>
                <span className="block text-white hover-3d">Growth</span>
              </h1>

              <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                Reduce operational costs by <span className="text-[#00FFD1] font-bold text-xl">60%</span> while scaling exponentially. Enterprise AI consulting for ambitious companies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact">
                  <Button className="bg-gradient-to-r from-[#00FFD1] to-[#39ADE3] text-black hover:from-[#39ADE3] hover:to-[#00FFD1] font-bold px-8 h-14 rounded-full text-base group shadow-2xl shadow-[#00FFD1]/30 hover:shadow-[#00FFD1]/50 transition-all duration-300 hover:scale-105 border-2 border-white/20">
                    <span>Schedule Consultation</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </a>
                <a href="#portfolio">
                  <Button className="bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 border border-white/20 hover:border-[#39ADE3] font-bold px-8 h-14 rounded-full text-base transition-all duration-300 hover:scale-105">
                    View Case Studies
                  </Button>
                </a>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#39ADE3]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] to-[#00FFD1]">{stats.clients}+</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mt-1">Clients</div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#39ADE3]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] to-[#00FFD1]">{stats.savings}%</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mt-1">Savings</div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#39ADE3]/20 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative text-center">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] to-[#00FFD1]">{stats.roi}%</div>
                    <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mt-1">ROI</div>
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
                    className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:border-[#39ADE3]/50 transition-all duration-500 hover:scale-105 cursor-pointer"
                    style={{
                      animation: `float-up 0.6s ease-out ${idx * 0.1}s both`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#39ADE3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#39ADE3]/20 to-[#00FFD1]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-6 h-6 text-[#00FFD1]" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#00FFD1] transition-colors">{feature.title}</h3>
                      <p className="text-sm text-white/60">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Advanced Cards */}
      <section id="services" className="py-32 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#39ADE3]/10 border border-[#39ADE3]/20 mb-6 backdrop-blur-xl">
              <Target className="w-4 h-4 text-[#00FFD1]" />
              <span className="text-xs font-bold text-[#00FFD1] uppercase tracking-wider">Our Expertise</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-6 text-white">Comprehensive AI Solutions</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Enterprise-grade services designed to accelerate transformation</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {mockData.services.map((service, index) => {
              const Icon = serviceIcons[service.icon];
              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#39ADE3]/20 to-[#00FFD1]/10 opacity-0 group-hover:opacity-100 rounded-3xl blur-2xl transition-opacity duration-500"></div>
                  <Card className="relative h-full bg-[#12141A]/80 backdrop-blur-2xl border-white/10 p-8 hover:border-[#39ADE3]/50 rounded-3xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#39ADE3]/20 overflow-hidden">
                    {/* Animated corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#39ADE3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-[100px]"></div>
                    
                    <div className="relative space-y-6">
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#39ADE3]/20 to-[#00FFD1]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Icon className="w-8 h-8 text-[#00FFD1] group-hover:text-[#39ADE3] transition-colors duration-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#39ADE3] group-hover:to-[#00FFD1] transition-all duration-300">{service.title}</h3>
                      <p className="text-white/70 leading-relaxed">{service.description}</p>
                      <div className="pt-4">
                        <div className="inline-flex items-center gap-2 text-[#00FFD1] group-hover:gap-4 transition-all duration-300 cursor-pointer font-bold">
                          <span className="text-sm uppercase tracking-wider">Learn More</span>
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

      {/* Portfolio Section - Advanced Grid */}
      <section id="portfolio" className="py-32 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/20 mb-6 backdrop-blur-xl">
              <Award className="w-4 h-4 text-[#00FFD1]" />
              <span className="text-xs font-bold text-[#00FFD1] uppercase tracking-wider">Success Stories</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-6 text-white">Real Impact, Real Results</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Transforming businesses with measurable outcomes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockData.portfolio.map((project, index) => (
              <Card 
                key={index} 
                className="group relative bg-[#12141A]/80 backdrop-blur-2xl border-white/10 p-10 hover:border-[#39ADE3]/50 rounded-3xl transition-all duration-500 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-[#39ADE3]/20"
              >
                {/* Animated gradient overlay */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#39ADE3]/20 via-[#00FFD1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full"></div>
                
                <div className="relative space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#39ADE3] group-hover:to-[#00FFD1] transition-all duration-300">{project.client}</h3>
                      <p className="text-[#39ADE3] text-xs uppercase tracking-widest font-bold">{project.industry}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00FFD1] to-[#39ADE3]">{project.result}</div>
                      <div className="text-white/50 text-xs uppercase tracking-wider font-semibold mt-1">Impact</div>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed text-lg">{project.description}</p>
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-1 rounded-full bg-[#00FFD1]"></div>
                      <span className="font-bold text-white/90 text-sm uppercase tracking-wider">Solution</span>
                    </div>
                    <p className="text-white/60">{project.solution}</p>
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
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#39ADE3]/10 border border-[#39ADE3]/20 mb-6 backdrop-blur-xl">
              <TrendingUp className="w-4 h-4 text-[#00FFD1]" />
              <span className="text-xs font-bold text-[#00FFD1] uppercase tracking-wider">Why Choose Us</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-6 text-white">The AI Advantage</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Measurable ROI through intelligent automation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {mockData.benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group relative p-8 bg-[#12141A]/60 backdrop-blur-xl border border-white/10 hover:border-[#39ADE3]/50 rounded-3xl transition-all duration-500 hover:bg-[#12141A]/80 cursor-pointer hover:scale-105 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#39ADE3] via-[#00FFD1] to-[#39ADE3] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CheckCircle className="w-8 h-8 text-[#00FFD1] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00FFD1] transition-colors duration-300">{benefit.title}</h3>
                <p className="text-white/70 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* ROI Showcase */}
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-[#39ADE3]/20 via-[#00FFD1]/20 to-[#39ADE3]/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            <div className="relative bg-[#12141A]/80 backdrop-blur-2xl border-2 border-[#39ADE3]/50 p-16 rounded-3xl text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#39ADE3]/5 to-transparent"></div>
              <div className="relative">
                <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] via-[#00FFD1] to-[#39ADE3] mb-4 animate-gradient-x bg-[length:200%_auto]">300-500% ROI</div>
                <p className="text-xl text-white/80">Most clients see positive returns within <span className="text-[#00FFD1] font-bold">6-12 months</span></p>
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
              <span className="text-xs font-bold text-[#00FFD1] uppercase tracking-wider">Get In Touch</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-6 text-white">Start Your Transformation</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Let's discuss how AI can accelerate your growth</p>
          </div>

          <Card className="relative bg-[#12141A]/80 backdrop-blur-2xl border-white/10 p-12 md:p-16 overflow-hidden rounded-3xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#39ADE3]/20 to-[#00FFD1]/10 blur-3xl rounded-full"></div>
            <form onSubmit={handleSubmit} className="relative space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-white font-bold text-sm uppercase tracking-wider">Name *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 backdrop-blur-sm border-white/20 text-white h-14 rounded-2xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-base"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-white font-bold text-sm uppercase tracking-wider">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 backdrop-blur-sm border-white/20 text-white h-14 rounded-2xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-base"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-white font-bold text-sm uppercase tracking-wider">Company</label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-white h-14 rounded-2xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-base"
                  placeholder="Your Company Name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-white font-bold text-sm uppercase tracking-wider">Message *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-white rounded-2xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 resize-none transition-all duration-300 text-base"
                  placeholder="Tell us about your project, challenges, and goals..."
                />
              </div>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-[#00FFD1] to-[#39ADE3] text-black hover:from-[#39ADE3] hover:to-[#00FFD1] font-black px-12 h-16 rounded-full text-base w-full shadow-2xl shadow-[#00FFD1]/30 hover:shadow-[#00FFD1]/50 transition-all duration-300 hover:scale-105 group uppercase tracking-wider"
              >
                <span>Send Inquiry</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6 md:col-span-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_startgrowthlab/artifacts/1vv64623_IMG_4950.PNG" 
                alt="Start & Growth Logo" 
                className="h-10 object-contain"
              />
              <p className="text-white/60 leading-relaxed max-w-md">AI Consulting and Software Engineering specialists helping businesses achieve exponential growth through intelligent automation.</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/5 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#39ADE3] hover:to-[#00FFD1] border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-300 group hover:scale-110">
                  <Mail className="w-5 h-5 text-white transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#39ADE3] hover:to-[#00FFD1] border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-300 group hover:scale-110">
                  <Linkedin className="w-5 h-5 text-white transition-colors" />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h4>
              <nav className="flex flex-col gap-3">
                {['Services', 'Portfolio', 'Benefits', 'Contact'].map((item, idx) => (
                  <a key={idx} href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-[#00FFD1] transition-all duration-300 hover:translate-x-2 inline-block text-sm">{item}</a>
                ))}
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Services</h4>
              <nav className="flex flex-col gap-3">
                <a href="#services" className="text-white/60 hover:text-[#00FFD1] transition-all duration-300 hover:translate-x-2 inline-block text-sm">AI Automation</a>
                <a href="#services" className="text-white/60 hover:text-[#00FFD1] transition-all duration-300 hover:translate-x-2 inline-block text-sm">AI Training</a>
                <a href="#services" className="text-white/60 hover:text-[#00FFD1] transition-all duration-300 hover:translate-x-2 inline-block text-sm">Performance Audit</a>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-white/50 text-sm">
            <p>© 2025 Startandgrowth. All rights reserved. Engineered for the future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;