import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader2, FileText, ArrowRight } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const SpecsRenderer = ({ text }) => {
  const lines = text.split('\n');
  const elements = [];
  let key = 0;

  for (const line of lines) {
    const stripped = line.trim();

    if (!stripped) {
      elements.push(<div key={key++} className="h-3" />);
      continue;
    }

    if (/^[-*=]{2,}$/.test(stripped)) {
      elements.push(<hr key={key++} className="border-slate-200 my-4" />);
      continue;
    }

    const renderInline = (str) => {
      const parts = str.split(/(\*\*[^*]+\*\*)/);
      return parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i}>{p.slice(2, -2)}</strong>
          : p
      );
    };

    if (stripped.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-base font-bold text-[#0774B6] mt-5 mb-2">
          {renderInline(stripped.slice(4))}
        </h3>
      );
    } else if (stripped.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-lg font-bold text-[#0774B6] mt-8 mb-3 pb-2 border-b-2 border-[#e8f4fd]">
          {renderInline(stripped.slice(3))}
        </h2>
      );
    } else if (stripped.startsWith('# ')) {
      elements.push(
        <h1 key={key++} className="text-2xl font-black text-[#0774B6] mt-6 mb-4">
          {renderInline(stripped.slice(2))}
        </h1>
      );
    } else if (/^[-*] /.test(stripped)) {
      const indent = line.length - line.trimStart().length;
      elements.push(
        <li key={key++} className={`text-slate-700 leading-relaxed mb-1 ${indent >= 2 ? 'ml-6 list-[circle]' : 'ml-4 list-disc'}`}>
          {renderInline(stripped.slice(2))}
        </li>
      );
    } else if (/^\d+\. /.test(stripped)) {
      elements.push(
        <li key={key++} className="text-slate-700 leading-relaxed mb-1 ml-4 list-decimal">
          {renderInline(stripped.replace(/^\d+\. /, ''))}
        </li>
      );
    } else {
      elements.push(
        <p key={key++} className="text-slate-700 leading-relaxed mb-2">
          {renderInline(stripped)}
        </p>
      );
    }
  }

  return <div className="specs-content">{elements}</div>;
};

const Specs = () => {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchSpecs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/specs/${token}`);
        if (!res.ok) { setNotFound(true); return; }
        setData(await res.json());
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecs();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#39ADE3]" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-4">
        <FileText className="w-12 h-12 text-slate-300" />
        <h1 className="text-2xl font-bold text-slate-800">Document not found</h1>
        <p className="text-slate-500 text-center">This link may have expired or is invalid.</p>
        <Link to="/" className="text-[#0774B6] font-semibold flex items-center gap-1 hover:underline">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to home
        </Link>
      </div>
    );
  }

  const clientName = data.company || data.name;
  const date = new Date(data.created_at).toLocaleDateString(
    data.language === 'fr' ? 'fr-FR' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0774B6] to-[#39ADE3] text-white">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            startandgrowth.net
          </Link>
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
            Startandgrowth · AI Consulting &amp; Software Engineering
          </p>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">Cahier des Charges</h1>
          <p className="text-white/80 text-sm">{clientName} · {date}</p>
        </div>
      </div>

      {/* Accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#00FFD1] to-[#39ADE3]" />

      {/* Document */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
          <SpecsRenderer text={data.specs_document} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Prepared by{' '}
            <a href="https://startandgrowth.net" className="text-[#0774B6] font-semibold hover:underline">
              Startandgrowth
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Specs;
