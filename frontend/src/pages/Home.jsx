import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, GraduationCap, Gauge, CheckCircle, Mail, Linkedin, Sparkles, TrendingUp, Zap, Target, Users, Award } from 'lucide-react';
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
  const [activeService, setActiveService] = useState(null);
  const [stats, setStats] = useState({ clients: 0, savings: 0, roi: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate stats on mount
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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#39ADE3]/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FFD1]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-20 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img 
              src="https://customer-assets.emergentagent.com/job_startgrowthlab/artifacts/1vv64623_IMG_4950.PNG" 
              alt="Start & Growth Logo" 
              className="h-12 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <nav className="hidden md:flex items-center gap-12">
            <a href="#services" className="text-white/60 hover:text-[#00FFD1] transition-all duration-300 text-base font-medium tracking-wide relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00FFD1] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#portfolio" className="text-white/60 hover:text-[#00FFD1] transition-all duration-300 text-base font-medium tracking-wide relative group">
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00FFD1] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#benefits" className="text-white/60 hover:text-[#00FFD1] transition-all duration-300 text-base font-medium tracking-wide relative group">
              Benefits
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00FFD1] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-white/60 hover:text-[#00FFD1] transition-all duration-300 text-base font-medium tracking-wide relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00FFD1] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          <a href="#contact">
            <Button className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 font-semibold px-8 rounded-none h-14 shadow-lg shadow-[#00FFD1]/20 hover:shadow-[#00FFD1]/40 transition-all duration-300 hover:scale-105">
              Get Started
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 lg:px-20 relative">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, transparent 80px), repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 80px)',
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        
        <div className="container mx-auto relative z-10 max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-[#39ADE3]/30 hover:border-[#00FFD1]/50 transition-all duration-300 cursor-pointer group">
              <Sparkles className="w-4 h-4 text-[#00FFD1] animate-pulse" />
              <span className="text-sm font-medium text-white/90 group-hover:text-[#00FFD1] transition-colors">AI-Powered Business Transformation</span>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight max-w-5xl">
              <span className="inline-block hover:text-[#39ADE3] transition-colors duration-300">Transform</span>{' '}
              <span className="inline-block hover:text-[#39ADE3] transition-colors duration-300">Your</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] via-[#00FFD1] to-[#39ADE3] animate-gradient bg-[length:200%_auto]">Business Growth</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed font-light">
              Reduce operational costs by <span className="text-[#00FFD1] font-semibold">60%</span> while scaling productivity exponentially.
              <br />Enterprise AI consulting for companies ready to lead.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <a href="#contact">
                <Button className="bg-[#00FFD1] text-black hover:bg-white font-semibold px-10 py-7 rounded-none text-lg group shadow-2xl shadow-[#00FFD1]/30 hover:shadow-[#00FFD1]/50 transition-all duration-300">
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </a>
              <a href="#portfolio">
                <Button className="bg-white/5 backdrop-blur-sm text-white hover:bg-white hover:text-black border border-white/20 font-semibold px-10 py-7 rounded-none text-lg transition-all duration-300 hover:scale-105">
                  View Success Stories
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-20 w-full max-w-4xl">
              <div className="text-center group cursor-pointer">
                <div className="text-5xl font-bold text-[#00FFD1] mb-2 group-hover:scale-110 transition-transform duration-300">{stats.clients}+</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Clients Transformed</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-5xl font-bold text-[#00FFD1] mb-2 group-hover:scale-110 transition-transform duration-300">{stats.savings}%</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Cost Reduction</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-5xl font-bold text-[#00FFD1] mb-2 group-hover:scale-110 transition-transform duration-300">{stats.roi}%</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Average ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39ADE3]/10 border border-[#39ADE3]/20 mb-6">
              <Target className="w-4 h-4 text-[#39ADE3]" />
              <span className="text-sm font-medium text-[#39ADE3]">OUR SERVICES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Comprehensive AI Solutions</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Enterprise-grade services designed to accelerate your digital transformation</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {mockData.services.map((service, index) => {
              const Icon = serviceIcons[service.icon];
              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#39ADE3]/20 to-[#00FFD1]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  <Card className="relative bg-black/40 backdrop-blur-xl border-white/10 p-10 h-full hover:border-[#39ADE3]/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#39ADE3]/20">
                    <div className="space-y-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#39ADE3]/20 to-[#00FFD1]/20 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#39ADE3] to-[#00FFD1] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                        <Icon className="w-10 h-10 text-[#39ADE3] group-hover:text-[#00FFD1] transition-colors duration-500 relative z-10" />
                      </div>
                      <h3 className="text-2xl font-bold group-hover:text-[#00FFD1] transition-colors duration-300">{service.title}</h3>
                      <p className="text-white/70 leading-relaxed">{service.description}</p>
                      <div className="pt-4">
                        <div className="inline-flex items-center gap-2 text-[#39ADE3] group-hover:text-[#00FFD1] transition-colors duration-300 cursor-pointer">
                          <span className="font-semibold">Explore Service</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
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
      <section id="portfolio" className="py-32 px-6 lg:px-20 relative bg-[#0a0a0a]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/20 mb-6">
              <Award className="w-4 h-4 text-[#00FFD1]" />
              <span className="text-sm font-medium text-[#00FFD1]">SUCCESS STORIES</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Real Impact, Real Results</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Transforming businesses across industries with measurable outcomes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mockData.portfolio.map((project, index) => (
              <Card 
                key={index} 
                className="group relative bg-black/60 backdrop-blur-xl border-white/10 p-10 hover:border-[#39ADE3]/50 transition-all duration-500 overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-[#39ADE3]/20"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#39ADE3]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                <div className="relative space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-3xl font-bold mb-2 group-hover:text-[#00FFD1] transition-colors duration-300">{project.client}</h3>
                      <p className="text-[#39ADE3] text-sm uppercase tracking-wider font-semibold">{project.industry}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-[#00FFD1] mb-1">{project.result}</div>
                      <div className="text-white/60 text-sm">Impact</div>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed text-lg">{project.description}</p>
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-[#39ADE3]" />
                      <span className="font-semibold text-white/90">Solution</span>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39ADE3]/10 border border-[#39ADE3]/20 mb-6">
              <TrendingUp className="w-4 h-4 text-[#39ADE3]" />
              <span className="text-sm font-medium text-[#39ADE3]">WHY CHOOSE US</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">The AI Advantage</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Measurable ROI through intelligent automation and strategic implementation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {mockData.benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#39ADE3]/50 transition-all duration-500 hover:bg-white/10 cursor-pointer hover:scale-105"
              >
                <CheckCircle className="w-8 h-8 text-[#00FFD1] mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00FFD1] transition-colors duration-300">{benefit.title}</h3>
                <p className="text-white/70 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#39ADE3]/20 via-[#00FFD1]/20 to-[#39ADE3]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-black border-2 border-[#39ADE3] p-12 backdrop-blur-xl">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#39ADE3] to-[#00FFD1] mb-4">300-500% ROI</div>
                <p className="text-xl text-white/80">Most clients see positive returns within <span className="text-[#00FFD1] font-semibold">6-12 months</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-20 relative bg-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/20 mb-6">
              <Users className="w-4 h-4 text-[#00FFD1]" />
              <span className="text-sm font-medium text-[#00FFD1]">GET IN TOUCH</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Start Your Transformation</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Let's discuss how AI can accelerate your business growth and deliver measurable results</p>
          </div>

          <Card className="relative bg-black/60 backdrop-blur-xl border-white/10 p-12 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#39ADE3]/10 to-[#00FFD1]/10 blur-3xl"></div>
            <form onSubmit={handleSubmit} className="relative space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-white font-semibold text-lg flex items-center gap-2">
                    Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 backdrop-blur-sm border-white/20 text-white h-14 rounded-none focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-white font-semibold text-lg flex items-center gap-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/5 backdrop-blur-sm border-white/20 text-white h-14 rounded-none focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-lg"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-white font-semibold text-lg">Company</label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-white h-14 rounded-none focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-lg"
                  placeholder="Your Company Name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-white font-semibold text-lg">Message *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-white/5 backdrop-blur-sm border-white/20 text-white rounded-none focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 resize-none transition-all duration-300 text-lg"
                  placeholder="Tell us about your project, challenges, and goals..."
                />
              </div>
              <Button 
                type="submit"
                className="bg-[#00FFD1] text-black hover:bg-white font-bold px-12 py-8 rounded-none text-lg w-full shadow-2xl shadow-[#00FFD1]/30 hover:shadow-[#00FFD1]/50 transition-all duration-300 hover:scale-105 group"
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
                className="h-12 object-contain"
              />
              <p className="text-white/60 leading-relaxed max-w-md">AI Consulting and Software Engineering specialists helping businesses achieve exponential growth through intelligent automation.</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/5 backdrop-blur-sm hover:bg-[#00FFD1] border border-white/10 flex items-center justify-center transition-all duration-300 group hover:scale-110">
                  <Mail className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 backdrop-blur-sm hover:bg-[#00FFD1] border border-white/10 flex items-center justify-center transition-all duration-300 group hover:scale-110">
                  <Linkedin className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
              <nav className="flex flex-col gap-3">
                <a href="#services" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 hover:translate-x-2 inline-block">Services</a>
                <a href="#portfolio" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 hover:translate-x-2 inline-block">Portfolio</a>
                <a href="#benefits" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 hover:translate-x-2 inline-block">Benefits</a>
                <a href="#contact" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 hover:translate-x-2 inline-block">Contact</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white mb-6">Services</h4>
              <nav className="flex flex-col gap-3">
                <a href="#services" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 hover:translate-x-2 inline-block">AI Automation</a>
                <a href="#services" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 hover:translate-x-2 inline-block">AI Training</a>
                <a href="#services" className="text-white/60 hover:text-[#00FFD1] transition-colors duration-300 hover:translate-x-2 inline-block">Performance Audit</a>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-white/60 text-sm">
            <p>© 2025 Startandgrowth. All rights reserved. Crafted with precision for the future of business.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;