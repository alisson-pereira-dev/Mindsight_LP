import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, TrendingUp, Sparkles, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo.tsx';
import esteticaImg from '../estetica.jpg';
import tricologiaImg from '../tricologia.jpg';
import gastroImg from '../gastro.png';
import clinicaGeralImg from '../clinica geral.png';

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
      } else if (!isPausedRef.current) {
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

  // Render a clean set of cards (Bloco 1 + Gastro + Bloco 2 + Clínica Geral)
  const renderCleanBlockSet = (keyPrefix: string) => {
    return (
      <div key={keyPrefix} className="flex items-center gap-4 shrink-0">
        {/* =========================================================
            BLOCO 1 (Altura total alinhada em 440px)
            ========================================================= */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Card 1: Foto Grande 280x440 - Estética Avançada (estetica.jpg) */}
          <div className="w-[280px] h-[440px] rounded-[16px] overflow-hidden relative shrink-0 border border-white/10 shadow-lg group select-none">
            <img
              src={esteticaImg}
              referrerPolicy="no-referrer"
              alt="Dra. Patrícia Leite - Estética Avançada"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-[62%_center] transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">
              <p className="font-instrument italic text-[17px] text-white leading-snug drop-shadow-sm mb-3">
                “Antes da MindSight, meu WhatsApp era pura incerteza. Hoje temos processo comercial ativo e agenda lotada com procedimentos de alto valor.”
              </p>
              <div className="pt-3 border-t border-white/15">
                <span className="block text-xs font-semibold text-white font-inter">
                  Dra. Patrícia Leite
                </span>
                <span className="block text-[11px] text-[#0DC0E0] font-inter mt-0.5">
                  Fundadora & Diretora • Estética Avançada
                </span>
              </div>
            </div>
          </div>

          {/* Coluna Bloco 1 (Largura 780px, Altura 440px com 2 linhas) */}
          <div className="w-[780px] h-[440px] flex flex-col justify-between shrink-0 select-none">
            {/* Linha Superior (h: 140px, gap: 16px) */}
            <div className="flex gap-4 h-[140px]">
              {/* Card 2: Card 240x140 - MindSight Logo (goodjuju equiv) */}
              <div className="w-[240px] h-[140px] bg-white rounded-[16px] p-5 border border-[#E5E7EB] shadow-sm flex flex-col justify-between shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-inter">
                    Plataforma
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#0DC0E0]" />
                </div>
                <div className="flex items-center gap-2.5">
                  <Logo size="sm" isDark={false} />
                </div>
                <div className="text-[11px] font-medium text-[#6B7280] font-inter">
                  Inteligência Comercial Ativa
                </div>
              </div>

              {/* Card 3: Card 260x140 - $31M Saved */}
              <div className="w-[260px] h-[140px] bg-white rounded-[16px] p-5 border border-[#E5E7EB] shadow-sm flex flex-col justify-between shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-inter">
                    Receita Protegida
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                </div>
                <div className="font-sora font-bold text-[28px] text-[#111827] tracking-tight leading-none">
                  $31M Saved
                </div>
                <div className="text-[12px] text-[#6B7280] font-inter leading-tight">
                  Recuperado em agendamentos perdidos
                </div>
              </div>

              {/* Card 4: Card 260x140 - 65% Lower Costs */}
              <div className="w-[260px] h-[140px] bg-white rounded-[16px] p-5 border border-[#E5E7EB] shadow-sm flex flex-col justify-between shrink-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-inter">
                    Eficiência
                  </span>
                  <TrendingUp className="w-3.5 h-3.5 text-[#0DC0E0]" />
                </div>
                <div className="font-sora font-bold text-[28px] text-[#111827] tracking-tight leading-none">
                  65% Lower Costs
                </div>
                <div className="text-[12px] text-[#6B7280] font-inter leading-tight">
                  No custo por consulta confirmada
                </div>
              </div>
            </div>

            {/* Linha Inferior (h: 284px, gap: 16px) */}
            <div className="flex gap-4 h-[284px]">
              {/* Card 5: Card 240x284 (2x altura) - 2x Higher Order Value */}
              <div className="w-[240px] h-[284px] bg-white rounded-[16px] p-6 border border-[#E5E7EB] shadow-sm flex flex-col justify-between shrink-0">
                <div>
                  <span className="text-[10px] font-bold text-[#0AA9D1] uppercase tracking-wider font-inter block mb-3">
                    Ticket Médio
                  </span>
                  <div className="font-sora font-bold text-[36px] text-[#111827] tracking-tight leading-none">
                    2x
                  </div>
                  <div className="font-sora font-semibold text-[15px] text-[#111827] mt-1 leading-tight">
                    Higher Order Value
                  </div>
                  <p className="mt-4 text-[13px] text-[#6B7280] font-inter leading-relaxed">
                    Scripts consultivos focados em tratamentos completos e procedimentos de alto valor
                    agregado.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F3F4F6] text-[11px] font-semibold text-[#0DC0E0] font-inter">
                  + Rentabilidade por paciente
                </div>
              </div>

              {/* Card 6: Card Depo 524x284 com foto 80x80 - Depoimento Clínico */}
              <div className="w-[524px] h-[284px] bg-white rounded-[16px] p-7 border border-[#E5E7EB] shadow-sm flex flex-col justify-between shrink-0">
                <div className="flex items-start gap-5">
                  <img
                    src={esteticaImg}
                    referrerPolicy="no-referrer"
                    alt="Dra. Patrícia Leite"
                    draggable={false}
                    className="w-20 h-20 rounded-full object-cover object-[62%_28%] shrink-0 border-2 border-[#0DC0E0]/30 shadow-sm pointer-events-none select-none"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-inter block mb-1">
                      Depoimento Verificado
                    </span>
                    <p className="font-instrument italic text-[18px] text-[#111827] leading-snug">
                      “A MindSight trouxe estabilidade real. Com processo e método comercial estruturado,
                      conseguimos zerar os horários vagos e focar 100% na excelência do atendimento aos pacientes.”
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F3F4F6] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#111827] font-inter block">
                      Dra. Patrícia Leite
                    </span>
                    <span className="text-[11px] text-[#6B7280] font-inter">
                      Sócia Diretora • Clínica de Estética Avançada
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#E6F9FC] text-[#0AA9D1] font-semibold px-2.5 py-1 rounded-full font-inter">
                    Cliente Ativo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Foto Gastroenterologia 300x440 (gastro.png) */}
        <div className="w-[300px] h-[440px] rounded-[16px] overflow-hidden relative shrink-0 border border-white/10 shadow-lg group select-none">
          <img
            src={gastroImg}
            alt="Gastroenterologia"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-[55%_22%] transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">
            <p className="font-instrument italic text-[17px] text-white leading-snug drop-shadow-sm mb-3">
              “Hoje quem chama no WhatsApp é respondido rápido e com método. A equipe sabe o que dizer em cada etapa e a agenda deixou de depender de sorte.”
            </p>
            <div className="pt-3 border-t border-white/15">
              <span className="block text-xs font-semibold text-white font-inter">Gastroenterologia</span>
              <span className="block text-[11px] text-[#0DC0E0] font-inter mt-0.5">Cliente MindSight</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            BLOCO 2 (Altura total alinhada em 440px)
            ========================================================= */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Card 7: Foto Tricologia 300x440 (tricologia.jpg) */}
          <div className="w-[300px] h-[440px] rounded-[16px] overflow-hidden relative shrink-0 border border-white/10 shadow-lg group select-none">
            <img
              src={tricologiaImg}
              referrerPolicy="no-referrer"
              alt="Dra. Camila Vasconcelos - Tricologia & Saúde Capilar"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">
              <p className="font-instrument italic text-[17px] text-white leading-snug drop-shadow-sm mb-3">
                “Tirar o comercial das costas da recepção e dar método e treinamento para ela foi a virada de chave.
                Nossa agenda nunca esteve tão previsível.”
              </p>
              <div className="pt-3 border-t border-white/15">
                <span className="block text-xs font-semibold text-white font-inter">
                  Dra. Camila Vasconcelos
                </span>
                <span className="block text-[11px] text-[#0DC0E0] font-inter mt-0.5">
                  Diretora Clínica • Tricologia & Dermatologia
                </span>
              </div>
            </div>
          </div>

          {/* Grid de 4 Stats do Bloco 2 (Largura 480px, Altura 440px em 2x2) */}
          <div className="w-[480px] h-[440px] grid grid-cols-2 gap-4 shrink-0 select-none">
            {/* Card 8: 42% More Confident */}
            <div className="h-[212px] bg-white rounded-[16px] p-5 border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-inter block mb-2">
                  Segurança
                </span>
                <div className="font-sora font-bold text-[28px] text-[#111827] tracking-tight leading-none">
                  42%
                </div>
                <div className="font-sora font-semibold text-[14px] text-[#111827] mt-1 leading-tight">
                  More Confident
                </div>
                <p className="mt-2.5 text-[12px] text-[#6B7280] font-inter leading-relaxed">
                  Aumento na taxa de conversão direta de consultas particulares.
                </p>
              </div>
              <div className="pt-2 border-t border-[#F3F4F6] text-[11px] font-semibold text-[#0DC0E0] font-inter">
                Fechamento Ativo
              </div>
            </div>

            {/* Card 9: +25h Time Saved */}
            <div className="h-[212px] bg-white rounded-[16px] p-5 border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-inter block mb-2">
                  Produtividade
                </span>
                <div className="font-sora font-bold text-[28px] text-[#111827] tracking-tight leading-none">
                  +25h
                </div>
                <div className="font-sora font-semibold text-[14px] text-[#111827] mt-1 leading-tight">
                  Time Saved
                </div>
                <p className="mt-2.5 text-[12px] text-[#6B7280] font-inter leading-relaxed">
                  Horas semanais recuperadas de retrabalho com planilhas e recados.
                </p>
              </div>
              <div className="pt-2 border-t border-[#F3F4F6] text-[11px] font-semibold text-[#10B981] font-inter">
                Sem Sobrecarga
              </div>
            </div>

            {/* Card 10: 37% Less Guesswork */}
            <div className="h-[212px] bg-white rounded-[16px] p-5 border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-inter block mb-2">
                  Previsibilidade
                </span>
                <div className="font-sora font-bold text-[28px] text-[#111827] tracking-tight leading-none">
                  37%
                </div>
                <div className="font-sora font-semibold text-[14px] text-[#111827] mt-1 leading-tight">
                  Less Guesswork
                </div>
                <p className="mt-2.5 text-[12px] text-[#6B7280] font-inter leading-relaxed">
                  Menos intuição e mais métricas claras sobre onde cada contato parou.
                </p>
              </div>
              <div className="pt-2 border-t border-[#F3F4F6] text-[11px] font-semibold text-[#0DC0E0] font-inter">
                Dados em Tempo Real
              </div>
            </div>

            {/* Card 11: +10% Higher Margins */}
            <div className="h-[212px] bg-white rounded-[16px] p-5 border border-[#E5E7EB] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider font-inter block mb-2">
                  Lucro
                </span>
                <div className="font-sora font-bold text-[28px] text-[#111827] tracking-tight leading-none">
                  +10%
                </div>
                <div className="font-sora font-semibold text-[14px] text-[#111827] mt-1 leading-tight">
                  Higher Margins
                </div>
                <p className="mt-2.5 text-[12px] text-[#6B7280] font-inter leading-relaxed">
                  Margem líquida agregada ao eliminar o desperdício de pacientes.
                </p>
              </div>
              <div className="pt-2 border-t border-[#F3F4F6] text-[11px] font-semibold text-[#10B981] font-inter">
                Lucro Líquido
              </div>
            </div>
          </div>
        </div>

        {/* Foto Clínica Geral 340x440 (clinica geral.png) */}
        <div className="w-[340px] h-[440px] rounded-[16px] overflow-hidden relative shrink-0 border border-white/10 shadow-lg group select-none">
          <img
            src={clinicaGeralImg}
            alt="Clínica Geral"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-[40%_28%] transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end">
            <p className="font-instrument italic text-[17px] text-white leading-snug drop-shadow-sm mb-3">
              “O que mais gostei foi a clareza: sei de onde vem cada paciente e onde cada contato parou. Com a recepção treinada, eu foco só no atendimento.”
            </p>
            <div className="pt-3 border-t border-white/15">
              <span className="block text-xs font-semibold text-white font-inter">Clínica Geral</span>
              <span className="block text-[11px] text-[#0DC0E0] font-inter mt-0.5">Cliente MindSight</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="problema"
      className="relative py-28 bg-light-bg text-[#0F172A] overflow-hidden select-none"
    >

      {/* FIXED HEADER (fora do marquee, centralizado) */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-14">
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

        {/* Sub */}
        <p className="mt-5 text-base sm:text-lg text-[#64748B] font-inter max-w-2xl mx-auto leading-relaxed">
          Se a sua clínica já investe em marketing e tem procura, o gargalo não está na geração de
          leads. Está exatamente nos inimigos silenciosos da conversão:
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
          className="flex gap-4 w-max will-change-transform py-2"
          style={{ willChange: 'transform' }}
        >
          {/* Render 2 identical sets (Set A + Set B) for infinite seamless looping */}
          {renderCleanBlockSet('set-a')}
          {renderCleanBlockSet('set-b')}
        </div>
      </div>

      {/* Bottom Hint & Action CTA */}
      <div className="relative z-20 mt-12 text-center flex flex-col items-center gap-4">
        <span className="text-xs text-[#64748B] font-inter">
          ↔ Arraste horizontalmente para navegar pelas métricas
        </span>

        {onResolveClick && (
          <button
            onClick={onResolveClick}
            className="group inline-flex items-center gap-2 bg-[#0DC0E0] hover:bg-[#0AA9D1] text-[#020617] font-sora font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-[0_6px_22px_rgba(13,192,224,0.35)] cursor-pointer"
          >
            <span>Quero resolver isso</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        )}
      </div>
    </section>
  );
};
