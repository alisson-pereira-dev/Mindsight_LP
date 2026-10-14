import React, { useEffect, useRef, useState } from 'react';
import { Clock, UserX, CalendarX } from 'lucide-react';
import { GRAIN } from './grain.ts';

export const LogicPainSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animated counters
  const [lostContacts, setLostContacts] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [emptyHours, setEmptyHours] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters smoothly
          const duration = 1800;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(Math.max(elapsed / duration, 0), 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setLostContacts(Math.round(ease * 72));
            setResponseTime(Math.round(ease * 48));
            setEmptyHours(Math.round(ease * 34));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="bg-[#F8FAFC] py-6 sm:py-10">
      {/* Dark card: rounded corners + content */}
      <div className="relative overflow-hidden w-[98%] mx-auto bg-[#020617] text-white rounded-b-[28px] sm:rounded-b-[40px] py-20 sm:py-28">
        {/* Film grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />

        <div className="relative z-10 max-w-[760px] mx-auto px-4 sm:px-6 text-center">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0DC0E0]/10 border border-[#0DC0E0]/25 text-[#0DC0E0] text-xs font-semibold uppercase tracking-wider mb-6 font-inter">
            A Conta Que Ninguém Faz
          </div>

          {/* Editorial Title */}
          <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-white tracking-tight leading-[1.2]">
            O quanto do que você já atrai{' '}
            <span className="text-[#0DC0E0]">está virando agenda?</span>
          </h2>

          {/* Editorial Body Text */}
          <div className="mt-8 text-lg sm:text-[20px] text-[#CBD5E1] font-inter leading-relaxed">
            <p className="font-sora font-semibold text-white">Pensa nos últimos 30 dias.</p>

            {/* As 3 perguntas */}
            <ul className="mt-6 space-y-3 text-left text-[17px] sm:text-lg">
              {[
                'Quantos pacientes entraram em contato e não fecharam?',
                'Quantos demoraram pra ter resposta?',
                'Quantos horários abriram e ficaram vazios?',
              ].map((q) => (
                <li
                  key={q}
                  className="flex items-start gap-3 rounded-xl bg-white/[0.04] border border-white/10 px-5 py-3.5 text-white"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] w-2 h-2 rounded-full bg-[#0DC0E0] shrink-0"
                  />
                  <span>{q}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-6 text-left sm:text-center">
              <p>
                Você provavelmente não sabe os números exatos.{' '}
                <strong className="font-sora font-semibold text-white">E esse é o ponto:</strong> sem
                processo e sem controle, dá pra sentir que o comercial vai bem, mas não dá pra saber
                o quanto ele poderia ir melhor.
              </p>
              <p>
                O interesse você já paga pra gerar.{' '}
                <strong className="font-sora font-semibold text-white">
                  O que decide o faturamento é quanto desse interesse você transforma em consulta.
                </strong>{' '}
                E essa parte, hoje, acontece no improviso.
              </p>
            </div>
          </div>

          {/* 3 Metric Cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {/* Card 1 */}
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-[12px] p-6 border border-white/10 relative overflow-hidden group hover:border-[#0DC0E0]/60 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#0DC0E0]/10 text-[#0DC0E0] flex items-center justify-center mb-4">
                <UserX className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="font-sora font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {lostContacts}%
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Contatos que não fecham
              </div>
              <p className="mt-2 text-xs text-[#94A3B8] leading-normal font-inter">
                Morrem no vácuo de follow-up após a primeira cotação de valor.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-[12px] p-6 border border-white/10 relative overflow-hidden group hover:border-[#0DC0E0]/60 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#0DC0E0]/10 text-[#0DC0E0] flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="font-sora font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {responseTime}min
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Tempo médio de resposta
              </div>
              <p className="mt-2 text-xs text-[#94A3B8] leading-normal font-inter">
                A cada 10 minutos de demora, a probabilidade de fechamento despenca.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/[0.04] backdrop-blur-sm rounded-[12px] p-6 border border-white/10 relative overflow-hidden group hover:border-[#0DC0E0]/60 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#0DC0E0]/10 text-[#0DC0E0] flex items-center justify-center mb-4">
                <CalendarX className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="font-sora font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {emptyHours}h+
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Horários vazios / mês
              </div>
              <p className="mt-2 text-xs text-[#94A3B8] leading-normal font-inter">
                Espaços na grade de médicos que poderiam gerar faturamento recorrente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
