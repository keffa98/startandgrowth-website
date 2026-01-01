import React, { useState } from 'react';
import { ArrowRight, Bot, GraduationCap, Gauge, CheckCircle, Mail, Linkedin } from 'lucide-react';
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

  const [selectedService, setSelectedService] = useState(null);

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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black border-b border-white/25">
        <div className="container mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_startgrowthlab/artifacts/1vv64623_IMG_4950.PNG" 
              alt="Start & Growth Logo" 
              className="h-10 object-contain"
            />
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-white/70 hover:text-white transition-colors text-lg font-medium">Services</a>
            <a href="#portfolio" className="text-white/70 hover:text-white transition-colors text-lg font-medium">Portfolio</a>
            <a href="#benefits" className="text-white/70 hover:text-white transition-colors text-lg font-medium">Benefits</a>
            <a href="#contact" className="text-white/70 hover:text-white transition-colors text-lg font-medium">Contact</a>
          </nav>
          <a href="#contact">
            <Button className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 font-medium px-6 rounded-none h-12">
              Get Started
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, transparent 1px, transparent 7.6923%), repeating-linear-gradient(-90deg, #fff, #fff 1px, transparent 1px, transparent 7.6923%)',
            backgroundSize: '100% 100%'
          }}></div>
        </div>
        <div className="container mx-auto relative z-10 max-w-6xl">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight">
              Transform Your Business<br />with <span className="text-[#39ADE3]">AI-Powered</span> Solutions
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-3xl mx-auto leading-relaxed">
              Reduce operational costs by up to 60% while scaling productivity. Specialized AI consulting and software engineering for high-growth companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a href="#contact">
                <Button className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 font-medium px-8 rounded-none h-14 text-lg w-full sm:w-auto flex items-center justify-center gap-3">
                  Schedule Consultation <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
              <a href="#portfolio">
                <Button className="bg-white/10 text-white hover:bg-white hover:text-black font-medium px-8 rounded-none h-14 text-lg w-full sm:w-auto transition-all duration-300">
                  View Portfolio
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 lg:px-20 bg-[#121212]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Our Services</h2>
            <p className="text-xl text-white/85 max-w-2xl mx-auto">Comprehensive AI solutions tailored to your business needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {mockData.services.map((service, index) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Card 
                  key={index} 
                  className="bg-black border-white/25 p-8 hover:border-[#39ADE3] transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedService(selectedService === index ? null : index)}
                >
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-[#39ADE3]/10 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-[#39ADE3]" />
                    </div>
                    <h3 className="text-2xl font-semibold group-hover:text-[#39ADE3] transition-colors">{service.title}</h3>
                    <p className="text-white/85 leading-relaxed">{service.description}</p>
                    <div className="pt-4">
                      <Button className="bg-white/10 text-white hover:bg-[#00FFD1] hover:text-black font-medium px-6 rounded-none h-12 w-full transition-all duration-300">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 lg:px-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Success Stories</h2>
            <p className="text-xl text-white/85 max-w-2xl mx-auto">Real results from real businesses</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {mockData.portfolio.map((project, index) => (
              <Card key={index} className="bg-[#121212] border-white/25 p-8 hover:border-[#39ADE3] transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-semibold">{project.client}</h3>
                    <span className="text-[#00FFD1] font-semibold text-lg">{project.result}</span>
                  </div>
                  <p className="text-white/70 text-sm uppercase tracking-wide">{project.industry}</p>
                  <p className="text-white/85 leading-relaxed">{project.description}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/70"><span className="font-semibold text-white">Solution:</span> {project.solution}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 lg:px-20 bg-[#121212]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Why Invest in AI?</h2>
            <p className="text-xl text-white/85 max-w-2xl mx-auto">Measurable ROI through intelligent automation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockData.benefits.map((benefit, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#00FFD1] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-white/85 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <div className="inline-block bg-black border border-[#39ADE3] p-8">
              <p className="text-3xl md:text-4xl font-semibold text-[#00FFD1] mb-2">Average ROI: 300-500%</p>
              <p className="text-white/85">Most clients see positive returns within 6-12 months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 lg:px-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">Start Your Transformation</h2>
            <p className="text-xl text-white/85">Let's discuss how AI can accelerate your business growth</p>
          </div>
          <Card className="bg-[#121212] border-white/25 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-medium">Name *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-black border-white/40 text-white h-12 rounded-none focus:border-[#39ADE3]"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-medium">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-black border-white/40 text-white h-12 rounded-none focus:border-[#39ADE3]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-white font-medium">Company</label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-black border-white/40 text-white h-12 rounded-none focus:border-[#39ADE3]"
                  placeholder="Your company name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white font-medium">Message *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-black border-white/40 text-white rounded-none focus:border-[#39ADE3] resize-none"
                  placeholder="Tell us about your project or challenges..."
                />
              </div>
              <Button 
                type="submit"
                className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/90 font-medium px-8 rounded-none h-14 text-lg w-full"
              >
                Send Inquiry
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/25 py-12 px-6 lg:px-20 bg-[#121212]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_startgrowthlab/artifacts/1vv64623_IMG_4950.PNG" 
                alt="Start & Growth Logo" 
                className="h-10 object-contain"
              />
              <p className="text-white/70 leading-relaxed">AI Consulting and Software Engineering specialists helping businesses achieve exponential growth.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Quick Links</h4>
              <nav className="flex flex-col gap-2">
                <a href="#services" className="text-white/70 hover:text-[#39ADE3] transition-colors">Services</a>
                <a href="#portfolio" className="text-white/70 hover:text-[#39ADE3] transition-colors">Portfolio</a>
                <a href="#benefits" className="text-white/70 hover:text-[#39ADE3] transition-colors">Benefits</a>
                <a href="#contact" className="text-white/70 hover:text-[#39ADE3] transition-colors">Contact</a>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/10 hover:bg-[#00FFD1] flex items-center justify-center transition-all duration-300 group">
                  <Mail className="w-5 h-5 text-white group-hover:text-black" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 hover:bg-[#00FFD1] flex items-center justify-center transition-all duration-300 group">
                  <Linkedin className="w-5 h-5 text-white group-hover:text-black" />
                </a>
              </div>
              <p className="text-white/70 text-sm">© 2025 Startandgrowth. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;