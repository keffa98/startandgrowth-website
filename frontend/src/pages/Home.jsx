import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, GraduationCap, Gauge, CheckCircle, Mail, Linkedin, Sparkles, TrendingUp, Zap, Target, Users, Award, ChevronRight } from 'lucide-react';
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
  const [stats, setStats] = useState({ clients: 0, savings: 0, roi: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-[#39ADE3]/10 to-[#0774B6]/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-[#00FFD1]/10 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-[#39ADE3]/5 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50 shadow-sm">
        <div className="container mx-auto px-6 lg:px-20 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img 
              src="https://customer-assets.emergentagent.com/job_startgrowthlab/artifacts/1vv64623_IMG_4950.PNG" 
              alt="Start & Growth Logo" 
              className="h-12 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <nav className="hidden md:flex items-center gap-12">
            <a href="#services" className="text-slate-600 hover:text-[#0774B6] transition-all duration-300 text-base font-medium relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0774B6] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#portfolio" className="text-slate-600 hover:text-[#0774B6] transition-all duration-300 text-base font-medium relative group">
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0774B6] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#benefits" className="text-slate-600 hover:text-[#0774B6] transition-all duration-300 text-base font-medium relative group">
              Benefits
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0774B6] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-slate-600 hover:text-[#0774B6] transition-all duration-300 text-base font-medium relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0774B6] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          <a href="#contact">
            <Button className="bg-[#0774B6] text-white hover:bg-[#39ADE3] font-semibold px-8 rounded-xl h-12 shadow-lg shadow-[#0774B6]/20 hover:shadow-[#39ADE3]/30 transition-all duration-300 hover:scale-105">
              Get Started
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 lg:px-20 relative">
        <div className="container mx-auto relative z-10 max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-[#39ADE3]/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <Sparkles className="w-4 h-4 text-[#0774B6] animate-pulse" />
              <span className="text-sm font-semibold text-slate-700 group-hover:text-[#0774B6] transition-colors">AI-Powered Business Transformation</span>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight max-w-5xl">
              <span className="inline-block hover:text-[#0774B6] transition-colors duration-300">Transform</span>{' '}
              <span className="inline-block hover:text-[#0774B6] transition-colors duration-300">Your</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0774B6] via-[#39ADE3] to-[#0774B6] animate-gradient bg-[length:200%_auto]">Business Growth</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed font-light">
              Reduce operational costs by <span className="text-[#0774B6] font-bold">60%</span> while scaling productivity exponentially.
              <br />Enterprise AI consulting for companies ready to lead.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <a href="#contact">
                <Button className="bg-[#0774B6] text-white hover:bg-[#39ADE3] font-semibold px-10 py-7 rounded-2xl text-lg group shadow-2xl shadow-[#0774B6]/30 hover:shadow-[#39ADE3]/40 transition-all duration-300 hover:scale-105">
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </a>
              <a href="#portfolio">
                <Button className="bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white border-2 border-slate-200 hover:border-[#39ADE3] font-semibold px-10 py-7 rounded-2xl text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                  View Success Stories
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-12 pt-20 w-full max-w-4xl">
              <div className="text-center group cursor-pointer">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0774B6] to-[#39ADE3] mb-2 group-hover:scale-110 transition-transform duration-300">{stats.clients}+</div>
                <div className="text-slate-600 text-sm uppercase tracking-wider font-semibold">Clients Transformed</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0774B6] to-[#39ADE3] mb-2 group-hover:scale-110 transition-transform duration-300">{stats.savings}%</div>
                <div className="text-slate-600 text-sm uppercase tracking-wider font-semibold">Cost Reduction</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0774B6] to-[#39ADE3] mb-2 group-hover:scale-110 transition-transform duration-300">{stats.roi}%</div>
                <div className="text-slate-600 text-sm uppercase tracking-wider font-semibold">Average ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#39ADE3]/10 border border-[#39ADE3]/30 mb-6">
              <Target className="w-4 h-4 text-[#0774B6]" />
              <span className="text-sm font-bold text-[#0774B6] uppercase tracking-wide">Our Services</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">Comprehensive AI Solutions</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Enterprise-grade services designed to accelerate your digital transformation</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {mockData.services.map((service, index) => {
              const Icon = serviceIcons[service.icon];
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#39ADE3]/20 to-[#0774B6]/10 opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-opacity duration-500"></div>
                  <Card className="relative bg-white/80 backdrop-blur-xl border-slate-200 p-10 h-full hover:border-[#39ADE3] rounded-3xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl shadow-lg">
                    <div className="space-y-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#39ADE3]/20 to-[#0774B6]/10 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-10 h-10 text-[#0774B6] group-hover:text-[#39ADE3] transition-colors duration-500 relative z-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#0774B6] transition-colors duration-300">{service.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{service.description}</p>
                      <div className="pt-4">
                        <div className="inline-flex items-center gap-2 text-[#0774B6] group-hover:gap-4 transition-all duration-300 cursor-pointer font-semibold">
                          <span>Explore Service</span>
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
      <section id="portfolio" className="py-32 px-6 lg:px-20 relative bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0774B6]/10 border border-[#0774B6]/30 mb-6">
              <Award className="w-4 h-4 text-[#0774B6]" />
              <span className="text-sm font-bold text-[#0774B6] uppercase tracking-wide">Success Stories</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">Real Impact, Real Results</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Transforming businesses across industries with measurable outcomes</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mockData.portfolio.map((project, index) => (
              <Card 
                key={index} 
                className="group relative bg-white/80 backdrop-blur-xl border-slate-200 p-10 hover:border-[#39ADE3] rounded-3xl transition-all duration-500 overflow-hidden hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#39ADE3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl rounded-full"></div>
                <div className="relative space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-3xl font-bold mb-2 text-slate-900 group-hover:text-[#0774B6] transition-colors duration-300">{project.client}</h3>
                      <p className="text-[#39ADE3] text-sm uppercase tracking-wider font-bold">{project.industry}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0774B6] to-[#39ADE3] mb-1">{project.result}</div>
                      <div className="text-slate-500 text-sm font-semibold">Impact</div>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-lg">{project.description}</p>
                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-[#39ADE3]" />
                      <span className="font-bold text-slate-700">Solution</span>
                    </div>
                    <p className="text-slate-600">{project.solution}</p>
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
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#39ADE3]/10 border border-[#39ADE3]/30 mb-6">
              <TrendingUp className="w-4 h-4 text-[#0774B6]" />
              <span className="text-sm font-bold text-[#0774B6] uppercase tracking-wide">Why Choose Us</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">The AI Advantage</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Measurable ROI through intelligent automation and strategic implementation</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {mockData.benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="group p-8 bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-[#39ADE3] rounded-3xl transition-all duration-500 hover:bg-white cursor-pointer hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <CheckCircle className="w-8 h-8 text-[#0774B6] mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-[#0774B6] transition-colors duration-300">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#39ADE3]/30 via-[#0774B6]/30 to-[#39ADE3]/30 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="relative bg-white/90 backdrop-blur-xl border-2 border-[#39ADE3] p-12 rounded-3xl shadow-2xl">
                <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0774B6] via-[#39ADE3] to-[#0774B6] mb-4">300-500% ROI</div>
                <p className="text-xl text-slate-700">Most clients see positive returns within <span className="text-[#0774B6] font-bold">6-12 months</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 lg:px-20 relative bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0774B6]/10 border border-[#0774B6]/30 mb-6">
              <Users className="w-4 h-4 text-[#0774B6]" />
              <span className="text-sm font-bold text-[#0774B6] uppercase tracking-wide">Get In Touch</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">Start Your Transformation</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Let's discuss how AI can accelerate your business growth and deliver measurable results</p>
          </div>

          <Card className="relative bg-white/90 backdrop-blur-xl border-slate-200 p-12 md:p-16 overflow-hidden rounded-3xl shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#39ADE3]/10 to-[#0774B6]/5 blur-3xl rounded-full"></div>
            <form onSubmit={handleSubmit} className="relative space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-slate-700 font-bold text-lg">Name *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-50 border-slate-300 text-slate-900 h-14 rounded-xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-lg"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-slate-700 font-bold text-lg">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-slate-50 border-slate-300 text-slate-900 h-14 rounded-xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-lg"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-slate-700 font-bold text-lg">Company</label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-slate-50 border-slate-300 text-slate-900 h-14 rounded-xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 transition-all duration-300 text-lg"
                  placeholder="Your Company Name"
                />
              </div>
              <div className="space-y-3">
                <label className="text-slate-700 font-bold text-lg">Message *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-slate-50 border-slate-300 text-slate-900 rounded-xl focus:border-[#39ADE3] focus:ring-2 focus:ring-[#39ADE3]/20 resize-none transition-all duration-300 text-lg"
                  placeholder="Tell us about your project, challenges, and goals..."
                />
              </div>
              <Button 
                type="submit"
                className="bg-[#0774B6] text-white hover:bg-[#39ADE3] font-bold px-12 py-8 rounded-2xl text-lg w-full shadow-2xl shadow-[#0774B6]/30 hover:shadow-[#39ADE3]/40 transition-all duration-300 hover:scale-105 group"
              >
                <span>Send Inquiry</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-16 px-6 lg:px-20 relative bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6 md:col-span-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_startgrowthlab/artifacts/1vv64623_IMG_4950.PNG" 
                alt="Start & Growth Logo" 
                className="h-12 object-contain"
              />
              <p className="text-slate-600 leading-relaxed max-w-md">AI Consulting and Software Engineering specialists helping businesses achieve exponential growth through intelligent automation.</p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-slate-100 hover:bg-[#0774B6] border border-slate-200 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110">
                  <Mail className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                </a>
                <a href="#" className="w-12 h-12 bg-slate-100 hover:bg-[#0774B6] border border-slate-200 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110">
                  <Linkedin className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-slate-900 mb-6">Quick Links</h4>
              <nav className="flex flex-col gap-3">
                <a href="#services" className="text-slate-600 hover:text-[#0774B6] transition-colors duration-300 hover:translate-x-2 inline-block">Services</a>
                <a href="#portfolio" className="text-slate-600 hover:text-[#0774B6] transition-colors duration-300 hover:translate-x-2 inline-block">Portfolio</a>
                <a href="#benefits" className="text-slate-600 hover:text-[#0774B6] transition-colors duration-300 hover:translate-x-2 inline-block">Benefits</a>
                <a href="#contact" className="text-slate-600 hover:text-[#0774B6] transition-colors duration-300 hover:translate-x-2 inline-block">Contact</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-slate-900 mb-6">Services</h4>
              <nav className="flex flex-col gap-3">
                <a href="#services" className="text-slate-600 hover:text-[#0774B6] transition-colors duration-300 hover:translate-x-2 inline-block">AI Automation</a>
                <a href="#services" className="text-slate-600 hover:text-[#0774B6] transition-colors duration-300 hover:translate-x-2 inline-block">AI Training</a>
                <a href="#services" className="text-slate-600 hover:text-[#0774B6] transition-colors duration-300 hover:translate-x-2 inline-block">Performance Audit</a>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center text-slate-600 text-sm">
            <p>© 2025 Startandgrowth. All rights reserved. Crafted with precision for the future of business.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;