import React from 'react';
import { X, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const DifferentiationSection: React.FC = () => {
  const comparisonItems = [
    {
      agency: 'Entrega contatos avulsos e encerra a responsabilidade',
      mindsight: 'Assume a conversão até o paciente sentar na cadeira',
    },
    {
      agency: 'Culpa a secretária e a recepção se as vendas não sobem',
      mindsight: 'Treina, padroniza scripts e audita o atendimento',
    },
    {
      agency: 'Sugere dobrar o tráfego mesmo com o funil vazando',
      mindsight: 'Corrige o vazamento para faturar mais com os mesmos leads',
    },
    {
      agency: 'Apresenta relatórios de impressões, CPC e cliques',
      mindsight: 'Mede taxa de conversão, ticket médio e dinheiro no caixa',
    },
    {
      agency: 'Templates genéricos copiados de e-commerces e infoprodutos',
      mindsight: 'Inteligência especializada em ética, compliance e saúde',
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

            <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-[#0F172A] tracking-tight leading-[1.15]">
              Por que a gente, e não{' '}
              <span className="text-[#0AA9D1]">mais uma agência</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#64748B] font-inter leading-relaxed">
              Agências de tráfego são especialistas em gerar interesse. Mas clínicas de alta
              performance não quebram por falta de interesse — quebram pelo abismo que existe entre
              a mensagem no WhatsApp e o pagamento da consulta.
            </p>

            <p className="mt-4 text-base sm:text-lg text-[#64748B] font-inter leading-relaxed">
              Nós não concorremos com o seu tráfego; nós tornamos o seu tráfego lucrativo. Nós somos
              a peça comercial que faltava na sua engrenagem.
            </p>

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
                    Trabalhamos exclusivamente com clínicas que já possuem fluxo ativo de pacientes,
                    já faturam de forma consistente e entenderam que o próximo nível não é gastar
                    mais em anúncios, mas sim fechar com maestria.
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
                  <div className="absolute top-2 right-3">
                    <span className="inline-flex items-center gap-1 bg-[#0DC0E0] text-[#020617] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <Zap className="w-3 h-3 fill-current" /> Método
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#0AA9D1] uppercase tracking-wider block font-inter">
                    Inteligência Comercial
                  </span>
                  <div className="font-sora font-bold text-lg sm:text-xl text-[#0F172A] mt-1 flex items-center justify-center gap-1.5">
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
                  <div key={idx} className="grid grid-cols-2 text-xs sm:text-sm">
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
                ))}
              </div>

              {/* Bottom bar summary */}
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-center text-xs text-[#64748B] font-inter">
                Resultado: <strong className="text-[#0F172A]">Taxa de conversão 2x a 3x superior</strong> sem precisar gastar um real a mais em anúncios.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
