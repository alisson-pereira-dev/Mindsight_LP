import React from 'react';
import { Play, Star } from 'lucide-react';
import esteticaImg from '../estetica.jpg';
import tricologiaImg from '../tricologia.jpg';
import gastroImg from '../gastro.png';
import clinicaGeralImg from '../clinica geral.png';

interface Testimonial {
  /** Name of the media file (without extension) in src/assets/depoimentos/ */
  id: string;
  /** Still image shown until a video/GIF exists (and as the video poster) */
  poster: string;
  posterPosition: string;
  name: string;
  role: string;
  quote: string;
}

// Drop files into src/assets/depoimentos/ named after the `id` above
// (e.g. patricia.mp4, camila.webm, gastro.gif) and they show up automatically.
const mediaFiles = import.meta.glob('../assets/depoimentos/*.{mp4,webm,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const findMedia = (id: string) => {
  const entry = Object.entries(mediaFiles).find(([path]) => {
    const file = path.split('/').pop() ?? '';
    return file.replace(/\.[^.]+$/, '') === id;
  });
  return entry ? entry[1] : null;
};

// NOTE: Patrícia and Camila come from casos_reais.md. The Gastro / Clínica Geral
// quotes are DRAFTS and must be replaced with real, authorized testimonials.
const testimonials: Testimonial[] = [
  {
    id: 'patricia',
    poster: esteticaImg,
    posterPosition: 'object-[62%_22%]',
    name: 'Dra. Patrícia Leite',
    role: 'Estética Avançada',
    quote: 'Hoje temos processo comercial ativo e agenda lotada',
  },
  {
    id: 'camila',
    poster: tricologiaImg,
    posterPosition: 'object-[center_18%]',
    name: 'Dra. Camila Vasconcelos',
    role: 'Tricologia & Dermatologia',
    quote: 'Dar método e treinamento para a recepção foi a virada de chave',
  },
  {
    id: 'gastro',
    poster: gastroImg,
    posterPosition: 'object-[55%_22%]',
    name: 'Gastroenterologia',
    role: 'Cliente MindSight',
    quote: 'A equipe sabe o que dizer em cada etapa e a agenda deixou de depender de sorte',
  },
  {
    id: 'clinica-geral',
    poster: clinicaGeralImg,
    posterPosition: 'object-[40%_28%]',
    name: 'Clínica Geral',
    role: 'Cliente MindSight',
    quote: 'Sei de onde vem cada paciente e onde cada contato parou',
  },
];

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Small square slot: looping muted video, GIF, or the poster photo as a fallback. */
const MediaSquare: React.FC<{ item: Testimonial }> = ({ item }) => {
  const src = findMedia(item.id);
  const isGif = src?.toLowerCase().includes('.gif');

  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-[#0F172A] border border-[#E2E8F0] shadow-sm">
      {src && !isGif ? (
        <video
          src={src}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          aria-label={`Mini entrevista: ${item.name}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <>
          <img
            src={src ?? item.poster}
            alt={`${item.name}`}
            draggable={false}
            className={`absolute inset-0 w-full h-full object-cover ${src ? '' : item.posterPosition}`}
          />
          {!src && (
            // Placeholder cue: this slot is waiting for a video/GIF
            <span className="absolute inset-0 z-10 flex items-center justify-center">
              <span className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-[#020617] text-[#020617] ml-0.5" />
              </span>
            </span>
          )}
        </>
      )}
      {/* Dark overlay: black at the bottom fading to transparent at the top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"
      />
    </div>
  );
};

const TestimonialItem: React.FC<{ item: Testimonial }> = ({ item }) => (
  <article className="flex items-start gap-4 w-[420px] sm:w-[520px] shrink-0 select-none">
    <MediaSquare item={item} />

    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-x-3 gap-y-1">
        <span className="shrink-0 rounded-md bg-[#0DC0E0]/10 px-3 py-1 font-sora text-[15px] font-medium text-[#0AA9D1]">
          {item.name}
        </span>
        <span className="text-xs leading-snug text-[#64748B] font-inter sm:whitespace-nowrap">{item.role}</span>
      </div>

      <p className="mt-3 text-[15px] leading-snug font-medium text-[#0F172A] font-inter line-clamp-2 min-h-[2.6em]">
        “ {item.quote} ”
      </p>

      <div className="mt-3 flex gap-1" aria-label="5 de 5 estrelas">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />
        ))}
      </div>
    </div>
  </article>
);

export const TestimonialsSection: React.FC = () => {
  // Two identical sets side by side -> translateX(-50%) loops seamlessly.
  const renderSet = (key: string) => (
    <div key={key} className="flex items-start gap-16 pr-16 shrink-0" aria-hidden={key === 'b'}>
      {testimonials.map((t) => (
        <TestimonialItem key={`${key}-${t.id}`} item={t} />
      ))}
    </div>
  );

  return (
    <section
      id="depoimentos"
      aria-label="Depoimentos de clínicas"
      className="py-10 bg-[#F8FAFC] border-y border-[#E2E8F0] overflow-hidden"
    >
      <div className="marquee-container marquee-mask overflow-hidden">
        <div
          className="marquee-track marquee-left items-start motion-reduce:!animate-none"
          style={{ gap: 0 }}
        >
          {renderSet('a')}
          {renderSet('b')}
        </div>
      </div>
    </section>
  );
};
