import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo.tsx';

interface NavbarProps {
  onCtaClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCtaClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-[#E2E8F0]/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center focus:outline-none"
          >
            <Logo size="md" isDark={!isScrolled} />
          </a>

          {/* Desktop Nav Items */}
          <nav className={`hidden md:flex items-center space-x-1 lg:space-x-2 backdrop-blur-sm border rounded-full px-5 py-1.5 shadow-xs transition-colors duration-300 ${
              isScrolled ? 'bg-white/60 border-[#E2E8F0]/70' : 'bg-white/5 border-white/10'
            }`}>
            <button
              onClick={() => scrollToSection('problema')}
              className={`px-4 py-2 text-sm font-medium hover:text-[#0DC0E0] transition-colors rounded-full ${isScrolled ? 'text-[#0F172A]' : 'text-white'}`}
            >
              O Problema
            </button>
            <button
              onClick={() => scrollToSection('solucao')}
              className={`px-4 py-2 text-sm font-medium hover:text-[#0DC0E0] transition-colors rounded-full ${isScrolled ? 'text-[#0F172A]' : 'text-white'}`}
            >
              A Solução
            </button>
            <button
              onClick={() => scrollToSection('diferenciais')}
              className={`px-4 py-2 text-sm font-medium hover:text-[#0DC0E0] transition-colors rounded-full ${isScrolled ? 'text-[#0F172A]' : 'text-white'}`}
            >
              Por que nós
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onCtaClick}
              className="group relative inline-flex items-center gap-2 bg-[#0DC0E0] hover:bg-[#0AA9D1] text-[#020617] font-semibold text-sm px-6 py-2.5 rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-[0_4px_14px_rgba(13,192,224,0.35)] active:scale-[0.98] cursor-pointer"
            >
              <span>Quero diagnosticar meu comercial</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl border transition-colors ${
                isScrolled
                  ? 'text-[#0F172A] hover:bg-[#F8FAFC] border-[#E2E8F0]'
                  : 'text-white hover:bg-white/10 border-white/20'
              }`}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#E2E8F0] px-5 py-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => scrollToSection('problema')}
              className="text-left py-2.5 px-3 rounded-lg text-base font-medium text-[#0F172A] hover:bg-[#E6F9FC] hover:text-[#0AA9D1] transition-colors"
            >
              O Problema
            </button>
            <button
              onClick={() => scrollToSection('solucao')}
              className="text-left py-2.5 px-3 rounded-lg text-base font-medium text-[#0F172A] hover:bg-[#E6F9FC] hover:text-[#0AA9D1] transition-colors"
            >
              A Solução
            </button>
            <button
              onClick={() => scrollToSection('diferenciais')}
              className="text-left py-2.5 px-3 rounded-lg text-base font-medium text-[#0F172A] hover:bg-[#E6F9FC] hover:text-[#0AA9D1] transition-colors"
            >
              Por que nós
            </button>
            <div className="pt-3 border-t border-[#E2E8F0]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCtaClick();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#0DC0E0] hover:bg-[#0AA9D1] text-[#020617] font-semibold text-sm py-3 px-6 rounded-full shadow-[0_4px_14px_rgba(13,192,224,0.35)]"
              >
                <span>Quero diagnosticar meu comercial</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
