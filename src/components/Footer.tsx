import React from 'react';
import { ArrowUp, ArrowUpRight, Heart } from 'lucide-react';
import { Logo } from './Logo.tsx';
import logoAzul from '../assets/logo-azul.png';

const columns = [
  {
    title: 'Navegação',
    links: [
      { label: 'O Problema', href: '#problema' },
      { label: 'A Solução', href: '#solucao' },
      { label: 'Por que nós', href: '#diferenciais' },
      { label: 'Diagnóstico comercial', href: '#diagnostico' },
    ],
  },
  {
    title: 'Como ajudamos',
    links: [
      { label: 'Processo comercial claro', href: '#solucao' },
      { label: 'Equipe que vende', href: '#solucao' },
      { label: 'Tecnologia e inteligência artificial', href: '#solucao' },
      { label: 'Previsibilidade e dados', href: '#solucao' },
    ],
  },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-light-bg border-t border-[#E2E8F0] text-[#64748B] font-inter">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <Logo size="md" isDark={false} />
            <p className="mt-5 text-sm leading-relaxed max-w-xs">
              Inteligência comercial para clínicas: transformamos o interesse que você já gera em
              agenda cheia, com processo, equipe treinada e previsibilidade.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <h4 className="font-sora font-semibold text-sm text-[#0F172A]">{col.title}</h4>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-[#0AA9D1] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Institutional + CTA */}
          <div className="md:col-span-2">
            <h4 className="font-sora font-semibold text-sm text-[#0F172A]">Institucional</h4>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>Privacidade & LGPD</li>
              <li>Conformidade CFM</li>
            </ul>
            <a
              href="#diagnostico"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0AA9D1] hover:text-[#0F172A] transition-colors"
            >
              Agendar diagnóstico
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Made-with line */}
        <p className="mt-16 sm:mt-20 text-center text-sm text-[#0F172A] flex items-center justify-center gap-1.5 flex-wrap">
          Feito com
          <Heart className="w-4 h-4 text-[#0AA9D1] fill-[#0AA9D1]" aria-label="amor" />
          pela equipe MindSight, para a sua clínica!
        </p>

        {/* Copyright + back to top */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <span>© {new Date().getFullYear()} MindSight Company. Todos os direitos reservados.</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-[#0AA9D1] transition-colors cursor-pointer"
            aria-label="Voltar ao topo"
          >
            Voltar ao topo
            <span className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      {/* Oversized faded wordmark, cropped at the bottom edge */}
      <div
        aria-hidden="true"
        className="relative mt-10 h-32 sm:h-48 lg:h-60 overflow-hidden pointer-events-none select-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
        }}
      >
        <img
          src={logoAzul}
          alt=""
          draggable={false}
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[92%] max-w-6xl h-auto opacity-[0.12]"
        />
      </div>
    </footer>
  );
};
