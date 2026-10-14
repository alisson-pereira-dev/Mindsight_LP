import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProblemSection } from './components/ProblemSection.tsx';
import { LogicPainSection } from './components/LogicPainSection.tsx';
import { SolutionSection } from './components/SolutionSection.tsx';
import { QuoteSection } from './components/QuoteSection.tsx';
import { DifferentiationSection } from './components/DifferentiationSection.tsx';
import { StatsSection } from './components/StatsSection.tsx';
import { DiagnosisFormSection } from './components/DiagnosisFormSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [formInView, setFormInView] = useState(false);

  // Initialize Lenis for buttery smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => {
      // Show floating CTA after scrolling past hero
      setShowFloatingCta(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // The floating CTA is pointless (and covers the form) while the form itself is on screen
  useEffect(() => {
    const target = document.getElementById('diagnostico');
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const scrollToDiagnosis = () => {
    const target = document.getElementById('diagnostico');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100svh] bg-light-bg text-[#0F172A] selection:bg-[#0DC0E0]/20 selection:text-[#0AA9D1] relative">
      {/* Top Sticky Navigation */}
      <Navbar onCtaClick={scrollToDiagnosis} />

      {/* Main Content Flow */}
      <main>
        {/* 1. HERO with Three.js / Canvas particle effect & GSAP reveal */}
        <HeroSection onCtaClick={scrollToDiagnosis} />

        {/* 2. O PROBLEMA (Dark #020617 Bento Box with the 4 enemies) */}
        <ProblemSection onResolveClick={scrollToDiagnosis} />

        {/* 3. DOR LÓGICA (Editorial, animated counters, leak simulator) */}
        <LogicPainSection />

        {/* 4. A SOLUÇÃO (Pinned Scrolltelling with 4 structural pillars) */}
        <SolutionSection onCtaClick={scrollToDiagnosis} />

        {/* 4.5 CITAÇÃO (div intermediária: foto + frase de posicionamento) */}
        <QuoteSection />

        {/* 5. DIFERENCIAÇÃO (Anti-agency comparison matrix) */}
        <DifferentiationSection />

        {/* 5.5 NÚMEROS (faixa em carrossel infinito, logo acima do formulário) */}
        <StatsSection />

        {/* 6. CTA FINAL + FORMULÁRIO (Linear-style qualification diagnostic) */}
        <DiagnosisFormSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA for High Conversion on Scroll */}
      {showFloatingCta && !formInView && (
        <div className="fixed right-4 sm:right-6 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={scrollToDiagnosis}
            className="group flex items-center gap-2.5 bg-[#020617] hover:bg-[#0F172A] text-white border border-[#0DC0E0]/40 px-4 sm:px-5 py-3 rounded-full shadow-[0_8px_30px_rgba(13,192,224,0.3)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="w-2 h-2 rounded-full bg-[#0DC0E0] animate-ping motion-reduce:animate-none" />
            <span className="font-sora font-semibold text-xs sm:text-sm">Diagnosticar Comercial</span>
            <div className="w-5 h-5 rounded-full bg-[#0DC0E0] text-[#020617] flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
