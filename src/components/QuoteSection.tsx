import React from 'react';
import { GRAIN } from './grain.ts';
import igorBanner from '../assets/igor-banner.png';
import clinicaBg from '../assets/clinica-bg.jpg';

export const QuoteSection: React.FC = () => {
  return (
    <section aria-label="Filosofia MindSight" className="bg-[#F8FAFC] py-6 sm:py-10">
      <div className="relative overflow-hidden w-[98%] mx-auto bg-[#020617] text-white rounded-b-[16px] py-16 sm:py-24">
        {/* Background photo + dark overlay (keeps the text legible on a bright image) */}
        <img
          src={clinicaBg}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#020617]/95 via-[#020617]/85 to-[#020617]/70"
        />

        {/* Film grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.14] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />

        <figure className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14">
          <img
            src={igorBanner}
            alt="Igor, Estrategista Comercial e Founder da MindSight"
            draggable={false}
            className="w-44 sm:w-56 md:w-64 h-auto shrink-0 select-none"
          />

          <div className="text-center md:text-left">
            <blockquote>
              <p className="font-instrument text-3xl sm:text-4xl lg:text-[46px] leading-[1.15] text-white text-balance">
                “Marketing sem vendas é só vaidade. Atrair é metade do caminho. A outra metade, a
                que define o resultado, é o comercial.”
              </p>
            </blockquote>
            <figcaption className="mt-6 text-sm sm:text-base font-inter text-[#94A3B8]">
              <strong className="font-semibold text-white">Igor, Estrategista Comercial,</strong>{' '}
              Founder of MindSight
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
};
