import React, { useEffect, useRef, useState } from 'react';
import { Clock, UserX, CalendarX, Calculator, Sparkles } from 'lucide-react';

// Fine film-grain texture (SVG turbulence) layered over the dark blue background
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const LogicPainSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animated counters
  const [lostContacts, setLostContacts] = useState(0);
  const [responseTime, setResponseTime] = useState(0);
  const [emptyHours, setEmptyHours] = useState(0);

  // Interactive Diagnostic Leak Simulator
  const [monthlyLeads, setMonthlyLeads] = useState<number>(200);
  const [ticketAverage, setTicketAverage] = useState<number>(1200);

  // Math: With poor commercial structure, 70% leak. With 30% conversion optimization, recoverable revenue is high!
  const estimatedLostMonthly = Math.round(monthlyLeads * 0.35 * ticketAverage);

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
          <div className="mt-8 space-y-6 text-lg sm:text-[20px] text-[#CBD5E1] font-inter leading-relaxed text-left sm:text-center">
            <p>
              Pare um minuto e olhe para o seu WhatsApp agora.{' '}
              <strong className="font-sora font-semibold text-white">
                Quantas conversas foram iniciadas esta semana e simplesmente pararam?
              </strong>
            </p>
            <p>
              O paciente mandou mensagem porque tem uma dor, um desejo e dinheiro para pagar. Ele já
              conhece sua clínica. Mas se a resposta demora, ou se a conversa soa robótica e sem
              estratégia, ele vai para quem responder primeiro com autoridade.
            </p>
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

          {/* Interactive Leak Calculator */}
          <div className="mt-10 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-[16px] p-6 sm:p-8 text-left">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0DC0E0]/15 flex items-center justify-center text-[#0DC0E0]">
                  <Calculator className="w-4 h-4" />
                </div>
                <h3 className="font-sora font-bold text-base sm:text-lg text-white">
                  Simule o vazamento comercial da sua clínica
                </h3>
              </div>
              <span className="hidden sm:inline-block text-xs bg-[#0DC0E0]/10 text-[#0DC0E0] border border-[#0DC0E0]/20 px-2.5 py-1 rounded-full font-medium">
                Diagnóstico Instantâneo
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Input 1: Leads */}
              <div>
                <div className="flex justify-between items-start gap-3 sm:min-h-9 text-xs font-semibold text-[#CBD5E1] mb-2 font-inter">
                  <span>Leads / Contatos no mês:</span>
                  <span className="text-[#0DC0E0] font-bold text-sm">{monthlyLeads} contatos</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="25"
                  value={monthlyLeads}
                  onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                  style={
                    {
                      '--p': `${((monthlyLeads - 50) / 750) * 100}%`,
                      '--track': '#1E293B',
                    } as React.CSSProperties
                  }
                  className="range-mind"
                  aria-label="Leads por mês"
                />
                <div className="flex justify-between text-[11px] text-[#64748B] mt-1.5">
                  <span>50</span>
                  <span>400</span>
                  <span>800+</span>
                </div>
              </div>

              {/* Input 2: Ticket Average */}
              <div>
                <div className="flex justify-between items-start gap-3 sm:min-h-9 text-xs font-semibold text-[#CBD5E1] mb-2 font-inter">
                  <span>Ticket médio (Consulta / Procedimento):</span>
                  <span className="text-[#0DC0E0] font-bold text-sm whitespace-nowrap">
                    {ticketAverage.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="5000"
                  step="100"
                  value={ticketAverage}
                  onChange={(e) => setTicketAverage(Number(e.target.value))}
                  style={
                    {
                      '--p': `${((ticketAverage - 300) / 4700) * 100}%`,
                      '--track': '#1E293B',
                    } as React.CSSProperties
                  }
                  className="range-mind"
                  aria-label="Ticket médio"
                />
                <div className="flex justify-between text-[11px] text-[#64748B] mt-1.5">
                  <span>R$ 300</span>
                  <span>R$ 2.500</span>
                  <span>R$ 5.000+</span>
                </div>
              </div>
            </div>

            {/* Result Alert Box */}
            <div className="bg-[#020617] border border-[#0DC0E0]/20 text-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#94A3B8] uppercase tracking-wider font-semibold">
                  Estimativa de receita que escapa pelo ralo mensalmente:
                </span>
                <div className="font-sora font-extrabold text-2xl sm:text-3xl text-[#0DC0E0] mt-1">
                  {estimatedLostMonthly.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                  <span className="text-xs font-normal text-[#94A3B8] ml-2">/ mês</span>
                </div>
              </div>
              <div className="text-xs text-[#94A3B8] max-w-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0DC0E0] shrink-0" />
                <span>
                  Recuperar apenas 20% disso já paga a estruturação comercial inteira da sua clínica.
                </span>
              </div>
            </div>
          </div>

          {/* Impact Quote Box */}
          <div className="mt-12 text-left bg-[#0DC0E0]/[0.07] border-l-4 border-[#0DC0E0] rounded-r-xl p-6 sm:p-7">
            <p className="font-sora font-semibold text-lg sm:text-[20px] text-white leading-relaxed">
              “Marketing sem vendas é só vaidade. Atrair é metade do caminho. A outra metade, a que
              define o resultado, é o comercial.”
            </p>
            <span className="block mt-3 text-xs sm:text-sm font-semibold text-[#0DC0E0] uppercase tracking-wider font-inter">
              — Filosofia Operacional MindSight
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
