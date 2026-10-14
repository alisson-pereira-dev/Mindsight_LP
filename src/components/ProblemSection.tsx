import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Problem {
  title: string;
  text: string;
}

// Os 4 "problemas silenciosos" da segunda dobra
const problems: Problem[] = [
  {
    title: 'Fantasma do Comercial',
    text: 'Você sabe que o comercial pode melhorar. Já treinou a secretária, já tentou organizar. Melhora um pouco, depois volta ao normal. Não falta boa vontade. Falta estrutura que se sustente.',
  },
  {
    title: 'Secretária Heroína',
    text: 'Uma pessoa faz tudo: atende, agenda, responde, vende. Dá conta, mas o resultado depende do esforço dela, não de um processo. E o que depende de esforço não escala e não se controla.',
  },
  {
    title: 'Mais Leads Não É o Teto',
    text: 'Mais tráfego traz mais contato, mas não garante que o interesse vire agendamento. Enquanto a conversão fica no improviso, parte do que você já paga pra atrair se perde no caminho.',
  },
  {
    title: 'Clínica no Automático',
    text: 'A clínica cresce quando a indicação aparece, quando o anúncio performa. Funciona, mas ninguém sabe exatamente por quê, nem como repetir de propósito. O resultado acontece, só que sem controle.',
  },
];

interface ProblemCardProps {
  item: Problem;
  index: number;
  onHoverChange: (hovering: boolean) => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ item, index, onHoverChange }) => {
  const num = String((index % problems.length) + 1).padStart(2, '0');
  return (
    <article
      onPointerEnter={(e) => e.pointerType === 'mouse' && onHoverChange(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && onHoverChange(false)}
      className="problem-card relative overflow-hidden w-[320px] sm:w-[360px] shrink-0 rounded-[20px] bg-white border border-[#E2E8F0] p-8 shadow-sm flex flex-col select-none"
    >
      {/* Huge decorative number */}
      <span
        aria-hidden="true"
        className="absolute -top-3 right-3 font-sora font-extrabold text-7xl sm:text-[84px] leading-none text-[#0DC0E0]/10 tracking-tighter pointer-events-none"
      >
        {num}
      </span>

      <span className="relative z-10 text-xs font-bold text-[#0AA9D1] uppercase tracking-wider font-inter">
        Problema {num}
      </span>
      <h3 className="relative z-10 mt-1.5 font-sora font-bold text-xl sm:text-[22px] text-[#0F172A] tracking-tight leading-snug">
        {item.title}
      </h3>
      <p className="relative z-10 mt-4 text-[15px] text-[#475569] font-inter leading-relaxed">
        {item.text}
      </p>
    </article>
  );
};

interface ProblemSectionProps {
  onResolveClick?: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onResolveClick }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Authoritative position ref
  const xRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const isHoveringRef = useRef(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startXRef = useRef(0);
  const dragStartXRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const halfWidthRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measureWidth = () => {
      if (track) {
        // Half width is exactly half of the total scroll width (set A + set B)
        const total = track.scrollWidth;
        if (total > 0) {
          halfWidthRef.current = total / 2;
        }
      }
    };

    measureWidth();
    // Re-measure after images load or window resizes
    window.addEventListener('resize', measureWidth);
    const timer = setTimeout(measureWidth, 500);

    const speed = 0.45; // Smooth ~90s pace

    const step = () => {
      const currentTrack = trackRef.current;
      if (!currentTrack) {
        animFrameIdRef.current = requestAnimationFrame(step);
        return;
      }

      if (halfWidthRef.current <= 0) {
        halfWidthRef.current = currentTrack.scrollWidth / 2;
      }
      const halfWidth = halfWidthRef.current;

      if (isDraggingRef.current) {
        // Being dragged actively: handled in pointermove
      } else if (Math.abs(velocityRef.current) > 0.08) {
        // Smooth inertia momentum
        xRef.current += velocityRef.current;
        velocityRef.current *= 0.92; // friction decay

        if (halfWidth > 0) {
          if (xRef.current <= -halfWidth) xRef.current += halfWidth;
          if (xRef.current > 0) xRef.current -= halfWidth;
        }
        currentTrack.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      } else if (!isPausedRef.current && !isHoveringRef.current) {
        // Normal constant auto-scroll
        xRef.current -= speed;
        if (halfWidth > 0) {
          if (xRef.current <= -halfWidth) xRef.current += halfWidth;
          if (xRef.current > 0) xRef.current -= halfWidth;
        }
        currentTrack.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }

      animFrameIdRef.current = requestAnimationFrame(step);
    };

    animFrameIdRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      clearTimeout(timer);
      window.removeEventListener('resize', measureWidth);
    };
  }, []);

  // Pointer drag handlers for desktop and mobile
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary mouse button (left click) or touch/pen
    if (e.button !== 0) return;
    e.preventDefault();

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture isn't supported
    }

    isDraggingRef.current = true;
    isPausedRef.current = true;
    setIsGrabbing(true);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    startXRef.current = e.clientX;
    dragStartXRef.current = xRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;

    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const deltaX = e.clientX - startXRef.current;
    const currentDelta = e.clientX - lastXRef.current;

    // Calculate velocity for natural momentum release
    velocityRef.current = (currentDelta / dt) * 16;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;

    let newX = dragStartXRef.current + deltaX;

    if (halfWidthRef.current <= 0 && trackRef.current) {
      halfWidthRef.current = trackRef.current.scrollWidth / 2;
    }
    const halfWidth = halfWidthRef.current;

    if (halfWidth > 0) {
      while (newX > 0) newX -= halfWidth;
      while (newX < -halfWidth) newX += halfWidth;
    }

    xRef.current = newX;
    trackRef.current.style.transform = `translate3d(${newX}px, 0, 0)`;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    isDraggingRef.current = false;
    setIsGrabbing(false);

    // Limit maximum throw velocity
    velocityRef.current = Math.max(Math.min(velocityRef.current, 24), -24);

    // Resume auto-scroll after 1200ms
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, 1200);
  };

  // Hovering a card stops the slide; leaving resumes after a short delay so crossing
  // the 16px gap between two cards doesn't make the track stutter.
  const handleHoverChange = (hovering: boolean) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (hovering) {
      isHoveringRef.current = true;
      velocityRef.current = 0;
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        isHoveringRef.current = false;
      }, 120);
    }
  };

  // Each set repeats the 4 cards twice so a set is wider than any screen;
  // pr-4 on the set keeps (set + gap) == half of the track for a seamless loop.
  const renderCleanBlockSet = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex gap-4 pr-4 shrink-0">
      {[...problems, ...problems].map((p, i) => (
        <ProblemCard key={`${keyPrefix}-${i}`} item={p} index={i} onHoverChange={handleHoverChange} />
      ))}
    </div>
  );

  return (
    <section
      id="problema"
      className="relative py-28 bg-light-bg text-[#0F172A] overflow-hidden select-none"
    >

      {/* FIXED HEADER (fora do marquee, centralizado) */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        {/* Badge */}
        <div className="inline-block mb-4">
          <span className="bg-[#E6F9FC] text-[#0AA9D1] border border-[#B3ECF5] px-3.5 py-1.5 rounded-full text-xs tracking-widest font-semibold font-inter uppercase">
            O DIAGNÓSTICO OCULTO
          </span>
        </div>

        {/* H2 Sora 42px */}
        <h2 className="font-sora font-bold text-3xl sm:text-[42px] text-[#0F172A] tracking-tight leading-[1.2]">
          O que segura o seu comercial{' '}
          <span className="text-[#0AA9D1]">(e quase ninguém percebe)</span>
        </h2>

        {/* Abertura */}
        <p className="mt-5 text-base sm:text-lg text-[#64748B] font-inter max-w-2xl mx-auto leading-relaxed">
          <strong className="font-semibold text-[#0F172A]">A sua clínica funciona.</strong> Mas quem
          toca o negócio sente que podia render mais, e que falta controle sobre o que acontece no
          meio do caminho. Quase sempre o freio está em problemas silenciosos, que a gente vive todo
          dia mas nunca parou pra nomear.
        </p>
      </div>

      {/* DRAGGABLE MARQUEE TRACK (joinmoxie.com style) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDragStart={(e) => e.preventDefault()}
        className={`relative z-10 w-full overflow-hidden marquee-mask select-none touch-pan-y ${
          isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ touchAction: 'pan-y', userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <div
          ref={trackRef}
          className="problem-track flex w-max will-change-transform py-8"
          style={{ willChange: 'transform' }}
        >
          {/* Render 2 identical sets (Set A + Set B) for infinite seamless looping */}
          {renderCleanBlockSet('set-a')}
          {renderCleanBlockSet('set-b')}
        </div>
      </div>

      {/* Bottom Hint & Action CTA */}
      <div className="relative z-20 mt-6 text-center flex flex-col items-center gap-4">
        <span className="text-xs text-[#64748B] font-inter">
          ↔ Arraste horizontalmente para ver cada problema
        </span>

        {onResolveClick && (
          <button
            onClick={onResolveClick}
            className="group inline-flex items-center gap-2 bg-[#0DC0E0] hover:bg-[#0AA9D1] text-[#020617] font-sora font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-[0_6px_22px_rgba(13,192,224,0.35)] cursor-pointer"
          >
            <span>Quero vender mais</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        )}
      </div>
    </section>
  );
};
