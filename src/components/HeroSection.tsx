import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, TrendingUp } from 'lucide-react';
import bgIgor from '../bg_igor.jpg';
import gsap from 'gsap';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subheadlineRef = useRef<HTMLParagraphElement | null>(null);
  const ctaBoxRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const proofRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.6,
        delay: 0.1,
      })
        .from(
          headlineRef.current,
          {
            opacity: 0,
            y: 35,
            duration: 0.9,
            filter: 'blur(8px)',
          },
          '-=0.3'
        )
        .from(
          subheadlineRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          ctaBoxRef.current,
          {
            opacity: 0,
            scale: 0.95,
            y: 20,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          proofRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.5,
          },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center pt-28 pb-20 overflow-hidden bg-[#020617]"
    >
      {/* Background photo: subject anchored to the right, copy sits on the dark left */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgIgor}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[72%_center] lg:object-right"
          fetchPriority="high"
        />
        {/* Left-to-right fade for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/85 to-[#020617]/10 max-lg:from-[#020617]/95 max-lg:via-[#020617]/80 max-lg:to-[#020617]/55" />
        {/* Top (navbar) and bottom (blend into next dark section) fades */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020617]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020617] to-transparent" />
        {/* Cyan ambient glow */}
        <div className="absolute top-1/3 left-[-10%] w-[600px] h-[600px] rounded-full bg-[#0DC0E0]/10 blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl flex flex-col items-start text-left">
          {/* Anti-Agency Position Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0DC0E0]/10 border border-[#0DC0E0]/30 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#0DC0E0] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#0DC0E0] font-inter">
              INTELIGÊNCIA COMERCIAL PARA CLÍNICAS
            </span>
          </div>

          {/* Hero Headline */}
          <h1
            ref={headlineRef}
            className="font-sora font-extrabold text-3xl sm:text-5xl lg:text-[52px] text-white tracking-tight leading-[1.12]"
          >
            Atrair paciente a sua clínica já consegue.{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0DC0E0] via-[#5CE1F5] to-[#0DC0E0]">
              O que falta é transformar esse interesse em agenda cheia.
            </span>
          </h1>

          {/* Hero Subheadline */}
          <p
            ref={subheadlineRef}
            className="mt-6 text-base sm:text-lg lg:text-[18px] text-[#CBD5E1] font-inter max-w-xl leading-relaxed"
          >
            Você já investe, já tem paciente bom entrando todo mês. Mas o comercial ainda roda no
            esforço e sem controle. E você sabe que dá pra ir além.
          </p>

          {/* Primary CTA */}
          <div ref={ctaBoxRef} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={onCtaClick}
              className="group relative inline-flex items-center justify-center gap-3 bg-[#0DC0E0] hover:bg-[#0AA9D1] text-[#020617] font-sora font-bold text-base px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_30px_rgba(13,192,224,0.45)] cursor-pointer"
            >
              <span>Quero diagnosticar o comercial da minha clínica</span>
              <div className="w-7 h-7 rounded-full bg-[#020617]/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight className="w-4 h-4 text-[#020617]" />
              </div>
            </button>
          </div>

          {/* Social Proof Sutil */}
          <div
            ref={proofRef}
            className="mt-10 pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-[#94A3B8] font-inter"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0DC0E0] shrink-0" />
              <span>
                <span className="font-medium text-white">Especialistas em comercial</span> para
                clínicas que já faturam
              </span>
            </div>
            <div className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Foco em faturamento de consultas & procedimentos</span>
            </div>
            <div className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/20" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0DC0E0] shrink-0" />
              <span>Metodologia validada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
