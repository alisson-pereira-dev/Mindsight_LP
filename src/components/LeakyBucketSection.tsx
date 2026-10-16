import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GRAIN } from './grain.ts';
import bucketImg from '../assets/balde.jpg';

interface LeakyBucketSectionProps {
  onCtaClick: () => void;
}

const leaks = [
  'Lead que manda mensagem e demora horas para ser respondido',
  'Paciente que pergunta o preço e nunca mais ouve falar da clínica',
  'Follow-up que não existe, porque ninguém tem tempo ou processo para fazer',
  'Atendimento que varia dependendo de quem pegou o WhatsApp naquele dia',
  'Lead que “ficou de pensar” e nunca mais foi procurado',
];

export const LeakyBucketSection: React.FC<LeakyBucketSectionProps> = ({ onCtaClick }) => {
  return (
    <section
      id="balde"
      aria-label="O balde furado"
      className="relative overflow-hidden bg-[#020617] text-white"
    >
      {/* Film grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay z-20"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[640px]">
        {/* Image: fades into the dark background (right edge on desktop, bottom edge on mobile) */}
        <div className="relative h-[360px] sm:h-[460px] lg:h-auto lg:min-h-[720px]">
          <img
            src={bucketImg}
            alt="Balde de metal com furos, deixando a água escapar por todos os lados"
            draggable={false}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-[50%_45%] select-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-[#020617] via-[#020617]/10 to-transparent lg:via-[#020617]/0"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block bg-gradient-to-l from-[#020617] to-transparent w-1/3 ml-auto"
          />
        </div>

        {/* Copy */}
        <div className="relative z-10 flex items-center px-6 sm:px-10 lg:pl-4 lg:pr-14 xl:pr-24 py-14 sm:py-20 lg:py-24 -mt-10 lg:mt-0">
          <div className="max-w-xl">
            <span className="inline-block bg-[#0DC0E0]/10 text-[#0DC0E0] border border-[#0DC0E0]/25 px-3.5 py-1.5 rounded-full text-xs tracking-widest font-semibold font-inter uppercase">
              O balde furado
            </span>

            <h2 className="mt-6 font-sora font-extrabold text-3xl sm:text-4xl lg:text-[40px] tracking-tight leading-[1.15] text-white">
              Os leads chegam.
              <br />
              Mas os furos do seu comercial{' '}
              <span className="text-[#0DC0E0]">fazem o investimento ir embora.</span>
            </h2>

            <div className="mt-6 space-y-4 text-[15px] sm:text-base text-[#CBD5E1] font-inter leading-relaxed">
              <p>
                Você investe em tráfego, em Instagram, em indicação. Os leads chegam. O balde enche.
              </p>
              <p>
                Mas se o seu comercial não tem processo, o balde está furado. E isso faz você
                subaproveitar o investimento que você já faz…
              </p>
            </div>

            <h3 className="mt-8 font-sora font-bold text-xl sm:text-2xl text-white">
              Os furos mais comuns:
            </h3>
            <ul className="mt-4 space-y-3">
              {leaks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-[#E2E8F0] font-inter leading-snug">
                  <CheckCircle2 className="w-5 h-5 text-[#0DC0E0] shrink-0 mt-px" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4 text-[15px] sm:text-base text-[#CBD5E1] font-inter leading-relaxed">
              <p>
                Cada furo desses é um paciente que você já pagou para captar, saindo pela lateral
                antes de sentar na cadeira.
              </p>
              <p>
                Você pode continuar enchendo o balde. Ou pode parar de perder o que já está
                entrando.
              </p>
            </div>

            <button
              onClick={onCtaClick}
              className="group mt-9 inline-flex items-center justify-center gap-3 bg-[#0DC0E0] hover:bg-[#0AA9D1] text-[#020617] font-sora font-bold text-sm sm:text-base px-7 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_30px_rgba(13,192,224,0.4)] cursor-pointer text-center"
            >
              <span>Eu quero reparar os furos do balde na minha clínica</span>
              <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
