import React, { useEffect, useRef } from 'react';

interface Stat {
  value: string;
  label: string;
}

// Números fornecidos pela MindSight (referência da hero). Para incluir novos, basta
// adicionar itens aqui. NÃO inventar métricas: só valores reais e comprováveis.
const stats: Stat[] = [
  { value: '1.000+', label: 'Vendedores treinados' },
  { value: 'R$ 57mi+', label: 'Gerados em faturamento' },
  { value: '500+', label: 'Mentorias comerciais' },
];

const StatItem: React.FC<{ item: Stat }> = ({ item }) => (
  <div className="group shrink-0 text-center select-none">
    <div className="font-sora font-semibold text-4xl sm:text-5xl tracking-tight text-[#0F172A] group-hover:text-[#0DC0E0] transition-colors duration-300">
      {item.value}
    </div>
    <div className="mt-1 text-sm sm:text-base text-[#64748B] font-inter">{item.label}</div>
  </div>
);

const HOVER_RATE = 0.25; // speed while the mouse is over the strip (1 = normal)

export const StatsSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const targetRate = useRef(1);
  const currentRate = useRef(1);
  const rafId = useRef<number | null>(null);

  // Ease the CSS animation's playbackRate toward the target so entering/leaving
  // the strip slows down / speeds up smoothly instead of stopping.
  const tick = () => {
    const anim = trackRef.current?.getAnimations()[0];
    currentRate.current += (targetRate.current - currentRate.current) * 0.08;
    if (Math.abs(targetRate.current - currentRate.current) < 0.005) {
      currentRate.current = targetRate.current;
    }
    if (anim) anim.playbackRate = currentRate.current;
    rafId.current =
      currentRate.current === targetRate.current ? null : requestAnimationFrame(tick);
  };

  const setTarget = (rate: number) => {
    targetRate.current = rate;
    if (rafId.current === null) rafId.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // 3 stats per set, repeated to fill any screen width. Two identical sets side by side ->
  // translateX(-50%) loops seamlessly (pr-* on each set equals the gap between items).
  const renderSet = (key: string) => (
    <div key={key} className="flex items-start gap-20 sm:gap-28 pr-20 sm:pr-28 shrink-0" aria-hidden={key === 'b'}>
      {[...stats, ...stats].map((s, i) => (
        <StatItem key={`${key}-${i}`} item={s} />
      ))}
    </div>
  );

  return (
    <section
      id="numeros"
      aria-label="Números da MindSight"
      className="py-7 sm:py-9 bg-[#F8FAFC] border-y border-[#E2E8F0] overflow-hidden"
    >
      <div
        className="marquee-container marquee-mask overflow-hidden"
        onPointerEnter={(e) => e.pointerType === 'mouse' && setTarget(HOVER_RATE)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setTarget(1)}
      >
        <div
          ref={trackRef}
          className="marquee-track marquee-left items-start motion-reduce:!animate-none"
          // inline style overrides the global ":hover { animation-play-state: paused }" rule
          style={{ gap: 0, animationPlayState: 'running' }}
        >
          {renderSet('a')}
          {renderSet('b')}
        </div>
      </div>
    </section>
  );
};
