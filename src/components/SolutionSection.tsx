import React, { useState } from 'react';
import { ArrowUpRight, Compass, Users2, Cpu, BarChart3, Check } from 'lucide-react';

interface SolutionSectionProps {
  onCtaClick: () => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onCtaClick }) => {
  const [activePilar, setActivePilar] = useState<number>(0);

  const pillars = [
    {
      num: '01',
      title: 'Processo comercial claro',
      subtitle: 'Padronização de ponta a ponta do funil de atendimento',
      icon: Compass,
      description:
        'Substituímos o atendimento amador por scripts consultivos sob medida, cadência estratégica de follow-up, quebra de objeções de preço e protocolo de confirmação para eliminar o no-show na raiz.',
      benefits: [
        'Scripts testados para consultas particulares e tratamentos',
        'Cadência de follow-up em 5 etapas para quem parou de responder',
        'Protocolo anti no-show com confirmação ativa humanizada',
      ],
    },
    {
      num: '02',
      title: 'Equipe que vende',
      subtitle: 'Treinamento contínuo e desenvolvimento de habilidades comerciais',
      icon: Users2,
      description:
        'Sua recepcionista não precisa adivinhar como fechar tratamentos. Nós treinamos, alinhamos e acompanhamos o time de atendimento da clínica para agir com postura consultiva, empatia e alta taxa de conversão.',
      benefits: [
        'Treinamento prático de vendas na área da saúde',
        'Alinhamento de tom de voz e postura de autoridade médica',
        'Auditoria semanal de conversas para evolução contínua',
      ],
    },
    {
      num: '03',
      title: 'Tecnologia e inteligência artificial',
      subtitle: 'Velocidade de resposta em segundos e triagem inteligente',
      icon: Cpu,
      description:
        'Implementamos CRM especializado em saúde integrado ao WhatsApp e automações inteligentes com IA. O lead recebe o primeiro contato em menos de 60 segundos, é qualificado e encaminhado sem atrito.',
      benefits: [
        'Primeira resposta instantânea com IA humanizada 24/7',
        'CRM configurado com funil visual por procedimento',
        'Automação de resgate de pacientes inativos há mais de 6 meses',
      ],
    },
    {
      num: '04',
      title: 'Previsibilidade e dados',
      subtitle: 'Painel executivo com clareza matemática de cada centavo',
      icon: BarChart3,
      description:
        'Chega de reuniões de vaidade sobre alcance e cliques. Você terá um painel em tempo real com taxa de conversão por procedimento, CAC real, tempo de resposta e previsão exata de faturamento do próximo mês.',
      benefits: [
        'Dashboard gerencial com taxa de conversão real',
        'Métricas individuais de performance por atendente',
        'Previsibilidade de faturamento para planejamento de expansão',
      ],
    },
  ];

  return (
    <section id="solucao" className="py-24 sm:py-32 bg-light-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Pinned / Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F9FC] border border-[#B3ECF5] text-[#0AA9D1] text-xs font-semibold uppercase tracking-wider mb-5 font-inter">
              A Solução Definitiva
            </div>

            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-[46px] text-[#0F172A] tracking-tight leading-[1.15]">
              Não existe fórmula mágica.{' '}
              <span className="text-[#0AA9D1]">Existe estrutura.</span>
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-lg text-[#64748B] font-inter leading-relaxed">
              <p>
                A MindSight não é mais uma agência que promete leads milagrosos para depois culpar
                sua secretária quando o faturamento não sobe.
              </p>
              <p>
                Nós entramos na operação da sua clínica e construímos os 4 pilares fundamentais de um
                comercial moderno, previsível e focado em lucro.
              </p>
            </div>

            {/* Quick pillar navigation pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {pillars.map((p, idx) => (
                <button
                  key={p.num}
                  onClick={() => {
                    setActivePilar(idx);
                    const el = document.getElementById(`pilar-${p.num}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    activePilar === idx
                      ? 'bg-[#0DC0E0] text-[#020617] shadow-xs'
                      : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                  }`}
                >
                  Pilar {p.num}
                </button>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#E2E8F0] hidden lg:block">
              <button
                onClick={onCtaClick}
                className="group inline-flex items-center gap-3 bg-[#0DC0E0] hover:bg-[#0AA9D1] text-[#020617] font-sora font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-[0_4px_14px_rgba(13,192,224,0.3)] cursor-pointer"
              >
                <span>Quero essa estrutura na minha clínica</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Scrolltelling Stack Column */}
          <div className="lg:col-span-7 space-y-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  id={`pilar-${pillar.num}`}
                  key={pillar.num}
                  onMouseEnter={() => setActivePilar(idx)}
                  className={`relative bg-white rounded-[16px] border transition-all duration-300 p-8 sm:p-10 overflow-hidden ${
                    activePilar === idx
                      ? 'border-[#0DC0E0] shadow-[0_12px_36px_rgba(13,192,224,0.12)]'
                      : 'border-[#E2E8F0] hover:border-[#B3ECF5] shadow-xs'
                  }`}
                >
                  {/* Huge Decorative 01/02/03/04 Watermark */}
                  <span className="absolute -top-4 -right-2 font-sora font-extrabold text-8xl sm:text-9xl text-[#0DC0E0]/10 select-none pointer-events-none tracking-tighter">
                    {pillar.num}
                  </span>

                  {/* Header info */}
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-[#E6F9FC] text-[#0AA9D1] border border-[#B3ECF5] flex items-center justify-center">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0AA9D1] uppercase tracking-wider font-inter">
                        PILAR {pillar.num}
                      </span>
                      <h3 className="font-sora font-bold text-2xl text-[#0F172A]">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-[#64748B] mb-4 relative z-10 font-inter">
                    {pillar.subtitle}
                  </p>

                  <p className="text-base text-[#334155] leading-relaxed font-inter mb-6 relative z-10">
                    {pillar.description}
                  </p>

                  {/* Benefits checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-[#F1F5F9] relative z-10">
                    {pillar.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                        <div className="w-5 h-5 rounded-full bg-[#E6F9FC] text-[#0AA9D1] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Mobile CTA */}
            <div className="lg:hidden pt-4 text-center">
              <button
                onClick={onCtaClick}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0DC0E0] hover:bg-[#0AA9D1] text-[#020617] font-sora font-bold text-base py-4 px-6 rounded-full shadow-[0_6px_20px_rgba(13,192,224,0.35)]"
              >
                <span>Quero essa estrutura na minha clínica</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
