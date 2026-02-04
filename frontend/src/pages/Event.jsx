import React from 'react';
import { ArrowRight, Target, Calendar, Users, Rocket, TrendingUp, Award, Linkedin, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useTheme, useLanguage } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Event = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';

  const eventData = {
    fr: {
      hero: {
        title: 'AI FACTORY : COTONOU 2026',
        subtitle: 'L\'Intelligence Artificielle au service de la performance et de la souveraineté numérique.',
        description: 'Un afterwork exclusif pour connecter l\'expertise technique à la croissance économique.',
        format: 'Format : Afterwork Stratégique | Lieu : Cotonou | Cible : Décideurs & Talents Tech'
      },
      why: {
        title: 'Pourquoi l\'IA Factory ?',
        intro: 'L\'Afrique ne doit plus seulement être consommatrice, mais architecte de sa révolution numérique. Pour bâtir les champions de demain (nos futurs GAFAM), deux leviers sont indispensables :',
        points: [
          {
            title: 'La Scalabilité',
            desc: 'Passer de l\'artisanat au déploiement industriel (DevOps & Automation).'
          },
          {
            title: 'La Performance',
            desc: 'Transformer la donnée en profit réel et en optimisation opérationnelle.'
          },
          {
            title: 'La Souveraineté',
            desc: 'Maîtriser nos outils pour garantir notre indépendance numérique.'
          }
        ]
      },
      program: {
        title: '2h30 pour changer de perspective',
        intro: 'L\'événement est conçu pour être un condensé d\'inspiration et de pragmatisme.',
        items: [
          {
            icon: '⚡',
            title: 'Lightning Talk (45 min)',
            points: [
              'IA & ROI : Comment l\'IA booste concrètement le chiffre d\'affaires.',
              'Démos : Cas d\'usages adaptés au marché béninois (Logistique, Fintech, AgriTech).',
              'Souveraineté : Infrastructures et Cloud, les bases de la liberté.'
            ]
          },
          {
            icon: '🤝',
            title: 'Networking Sélectif',
            points: [
              'Mise en relation entre porteurs de projets, investisseurs et experts.'
            ]
          },
          {
            icon: '🎙️',
            title: 'Capsules "Future of Africa"',
            points: [
              'Enregistrement de podcasts live pour documenter la vision des leaders tech présents.'
            ]
          }
        ]
      },
      benefits: {
        title: 'Ce que vous allez en retirer',
        decision: {
          title: 'Pour les Décideurs (CEOs/CMOs)',
          items: [
            'Comprendre le ROI réel de l\'IA.',
            'Identifier les leviers de réduction de coûts.',
            'Accéder à un réseau d\'experts qualifiés.'
          ]
        },
        experts: {
          title: 'Pour les Experts (CTOs/Devs)',
          items: [
            'Découvrir les standards DevOps internationaux.',
            'Échanger sur les enjeux de la data locale.',
            'Contribuer à la souveraineté du pays.'
          ]
        }
      },
      initiator: {
        title: 'L\'Initiateur',
        subtitle: 'Une expertise internationale au service du local',
        name: 'Kéffa AGBOTON',
        bio: 'Ingénieur DevOps & Performance avec 7 ans d\'expérience internationale. Consultant en automatisation et IA, il accompagne les entreprises dans leur transformation vers des systèmes hautement scalables. Membre actif de la diaspora engagé pour l\'éclosion de champions tech africains.'
      },
      ecosystem: {
        title: 'Écosystème & Synergies',
        subtitle: 'Une dynamique collective',
        intro: 'Cet événement aspire à fédérer les forces vives de l\'écosystème :',
        items: [
          'Les communautés de développeurs locales.',
          'Les réseaux d\'accompagnement à l\'entrepreneuriat numérique.',
          'Les institutions de promotion des PME et de l\'investissement.'
        ],
        note: '(En cours de structuration avec les acteurs majeurs du secteur).'
      },
      cta: {
        title: 'Restez informés ou rejoignez l\'aventure',
        subtitle: 'Vous souhaitez participer, devenir partenaire ou intervenir ?',
        button: 'Contactez-moi'
      }
    },
    en: {
      hero: {
        title: 'AI FACTORY: COTONOU 2026',
        subtitle: 'Artificial Intelligence for performance and digital sovereignty.',
        description: 'An exclusive afterwork to connect technical expertise with economic growth.',
        format: 'Format: Strategic Afterwork | Location: Cotonou | Target: Decision Makers & Tech Talents'
      },
      why: {
        title: 'Why AI Factory?',
        intro: 'Africa must no longer just be a consumer, but an architect of its digital revolution. To build tomorrow\'s champions (our future GAFAMs), two levers are essential:',
        points: [
          {
            title: 'Scalability',
            desc: 'Moving from artisanal to industrial deployment (DevOps & Automation).'
          },
          {
            title: 'Performance',
            desc: 'Transforming data into real profit and operational optimization.'
          },
          {
            title: 'Sovereignty',
            desc: 'Mastering our tools to guarantee our digital independence.'
          }
        ]
      },
      program: {
        title: '2.5 hours to change perspective',
        intro: 'The event is designed to be a condensed mix of inspiration and pragmatism.',
        items: [
          {
            icon: '⚡',
            title: 'Lightning Talk (45 min)',
            points: [
              'AI & ROI: How AI concretely boosts revenue.',
              'Demos: Use cases adapted to the Beninese market (Logistics, Fintech, AgriTech).',
              'Sovereignty: Infrastructure and Cloud, the foundations of freedom.'
            ]
          },
          {
            icon: '🤝',
            title: 'Selective Networking',
            points: [
              'Connecting project leaders, investors, and experts.'
            ]
          },
          {
            icon: '🎙️',
            title: '"Future of Africa" Capsules',
            points: [
              'Live podcast recording to document the vision of tech leaders present.'
            ]
          }
        ]
      },
      benefits: {
        title: 'What you will gain',
        decision: {
          title: 'For Decision Makers (CEOs/CMOs)',
          items: [
            'Understand the real ROI of AI.',
            'Identify cost reduction levers.',
            'Access a network of qualified experts.'
          ]
        },
        experts: {
          title: 'For Experts (CTOs/Devs)',
          items: [
            'Discover international DevOps standards.',
            'Exchange on local data challenges.',
            'Contribute to the country\'s sovereignty.'
          ]
        }
      },
      initiator: {
        title: 'The Initiator',
        subtitle: 'International expertise serving local needs',
        name: 'Kéffa AGBOTON',
        bio: 'DevOps & Performance Engineer with 7 years of international experience. Consultant in automation and AI, he supports companies in their transformation towards highly scalable systems. Active member of the diaspora committed to the emergence of African tech champions.'
      },
      ecosystem: {
        title: 'Ecosystem & Synergies',
        subtitle: 'A collective dynamic',
        intro: 'This event aspires to federate the ecosystem\'s vital forces:',
        items: [
          'Local developer communities.',
          'Digital entrepreneurship support networks.',
          'SME promotion and investment institutions.'
        ],
        note: '(Currently being structured with major sector players).'
      },
      cta: {
        title: 'Stay informed or join the adventure',
        subtitle: 'Would you like to participate, become a partner, or speak?',
        button: 'Contact Me'
      }
    }
  };

  const content = eventData[language];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0A0B0F] text-white' : 'bg-white text-slate-900'} relative overflow-hidden transition-colors duration-500`}>
      {/* Background Elements */}
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
        </div>
      </div>

      {/* Back to Home */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 pt-32 pb-8">
        <Link to="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-white/70 hover:text-[#00FFD1]' : 'text-slate-600 hover:text-[#0774B6]'} transition-colors`}>
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span className="text-sm font-semibold">Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00FFD1]/10 border border-[#00FFD1]/20 mb-6 backdrop-blur-xl">
            <Calendar className="w-4 h-4 text-[#00FFD1]" />
            <span className="text-xs font-bold text-[#00FFD1] uppercase tracking-wider">Exclusive Event</span>
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
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative">
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
      <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative ${isDark ? 'bg-[#0a0a0a]' : 'bg-slate-50'}`}>
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
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative">
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
      <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative ${isDark ? 'bg-[#0a0a0a]' : 'bg-slate-50'}`}>
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
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative">
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
      <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-20 relative ${isDark ? 'bg-[#0a0a0a]' : 'bg-slate-50'}`}>
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
