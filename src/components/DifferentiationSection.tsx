import React from 'react';
import { X, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const DifferentiationSection: React.FC = () => {
  const comparisonItems = [
    {
      topic: 'Especialização',
      agency: 'Atende qualquer segmento, sem foco em clínicas nem em comercial',
      mindsight: 'Especialista em comercial, dedicada ao nicho de clínicas',
    },
    {
      topic: 'Seleção de clientes',
      agency: 'Aceita qualquer cliente que feche contrato',
      mindsight: 'Seletiva, trabalha com quem tem fit para o método funcionar',
    },
    {
      topic: 'O que entrega',
      agency: 'Contatos avulsos, sem acompanhar o que acontece depois',
      mindsight: 'Estrutura, script e processo para o time comercial da clínica usar',
    },
    {
      topic: 'O que mede',
      agency: 'Impressões, CPC, cliques',
      mindsight: 'Taxa de conversão, ticket médio, dinheiro no caixa',
    },
    {
      topic: 'Objetivo final',
      agency: 'Gerar mais leads',
      mindsight: 'Gerar mais venda, com os leads que a clínica já tem',
    },
  ];

  return (
    <section id="diferenciais" className="py-24 sm:py-32 bg-light-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Context & Editorial */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F9FC] border border-[#B3ECF5] text-[#0AA9D1] text-xs font-semibold uppercase tracking-wider mb-5 font-inter">
              Posicionamento Imparcial
            </div>

            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-[40px] text-[#0F172A] tracking-tight leading-[1.15]">
              A diferença entre <span className="text-[#0AA9D1]">gerar lead</span> e{' '}
              <span className="text-[#0AA9D1]">gerar paciente</span> que fecha tratamento
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-lg text-[#64748B] font-inter leading-relaxed">
              <p>
                A maioria das empresas entrega lead e vai embora. Deixa o dono sozinho justamente na
                parte que decide o resultado: o que acontece depois que o paciente demonstra
                interesse.
              </p>
              <p>
                <strong className="font-sora font-semibold text-[#0F172A]">
                  A gente faz o contrário. Começa onde as outras param.
                </strong>
              </p>
              <p>
                É uma especialização dupla e rara: não é agência que atende clínica entre vários
                nichos, nem consultoria comercial genérica. É comercial de verdade, construído pra
                realidade de quem toca uma clínica, e integrado com a atração que você já faz.
              </p>
            </div>

            {/* Anti-agency Callout Banner with dashed #0DC0E0 border */}
            <div className="mt-8 p-6 rounded-2xl bg-white border-2 border-dashed border-[#0DC0E0] shadow-xs relative">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E6F9FC] flex items-center justify-center text-[#0AA9D1] shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sora font-bold text-sm sm:text-base text-[#0F172A]">
                    Por isso a gente não atende todo mundo.
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-[#475569] font-inter leading-relaxed">
                    Antes de qualquer proposta, tem uma consulta comercial: um diagnóstico do seu
                    comercial pra entender se faz sentido pros dois lados. Se não fizer, nós te
                    direcionamos com transparência e te indicamos o melhor caminho, mesmo que não
                    seja conosco.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Comparative Grid */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[20px] border border-[#E2E8F0] shadow-sm overflow-hidden">
              {/* Header Columns */}
              <div className="grid grid-cols-2 text-center border-b border-[#E2E8F0]">
                {/* Traditional Agency Header */}
                <div className="p-5 sm:p-6 bg-[#F8FAFC] border-r border-[#E2E8F0]">
                  {/* spacer: mesma altura do selo "Método" da coluna ao lado */}
                  <div className="mb-2 h-[18px]" aria-hidden="true" />
                  <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider block font-inter">
                    O Mercado Tradicional
                  </span>
                  <div className="font-sora font-bold text-lg sm:text-xl text-[#64748B] mt-1 line-through decoration-[#94A3B8]/60">
                    Agência Comum
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-1 font-inter">
                    Entrega lead e vai embora
                  </p>
                </div>

                {/* MindSight Header */}
                <div className="p-5 sm:p-6 bg-[#E6F9FC]/60 relative">
                  <div className="mb-2">
                    <span className="inline-flex items-center gap-1 bg-[#0DC0E0] text-[#020617] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <Zap className="w-3 h-3 fill-current" /> Método
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#0AA9D1] uppercase tracking-wider block font-inter">
                    Inteligência Comercial
                  </span>
                  <div className="font-sora font-bold text-lg sm:text-xl text-[#0F172A] mt-1 flex items-center justify-center">
                    Mind<span className="text-[#0DC0E0]">Sight</span>
                  </div>
                  <p className="text-xs text-[#0AA9D1] mt-1 font-medium font-inter">
                    Começa onde as outras param
                  </p>
                </div>
              </div>

              {/* Comparison Rows */}
              <div className="divide-y divide-[#E2E8F0]">
                {comparisonItems.map((item, idx) => (
                  <div key={idx} className="text-xs sm:text-sm">
                    {/* Topic label */}
                    <div className="px-4 sm:px-5 py-2 bg-[#F8FAFC] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8] font-inter">
                      {item.topic}
                    </div>
                    <div className="grid grid-cols-2">
                      {/* Agency column */}
                      <div className="p-4 sm:p-5 bg-white flex items-start gap-2.5 text-[#64748B] border-r border-[#E2E8F0]">
                        <div className="w-5 h-5 rounded-full bg-[#F1F5F9] text-[#94A3B8] flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="leading-snug">{item.agency}</span>
                      </div>

                      {/* MindSight column */}
                      <div className="p-4 sm:p-5 bg-white flex items-start gap-2.5 text-[#0F172A] font-medium">
                        <div className="w-5 h-5 rounded-full bg-[#E6F9FC] text-[#0DC0E0] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="leading-snug">{item.mindsight}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom bar summary */}
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-center text-xs text-[#64748B] font-inter">
                Resultado:{' '}
                <strong className="text-[#0F172A]">
                  clínicas que estruturam o comercial aumentam a taxa de conversão em até 2x a 3x,
                </strong>{' '}
                sem precisar gastar um real a mais em anúncios.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
