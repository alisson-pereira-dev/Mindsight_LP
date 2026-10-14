import React from 'react';
import logoAzul from '../assets/logo-azul.png';
import logoBranco from '../assets/logo-branco.png';

interface LogoProps {
  className?: string;
  /** true = versão branca (para fundos escuros), false = versão azul (fundos claros) */
  isDark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const heights = {
  sm: 'h-8',
  md: 'h-11',
  lg: 'h-14',
};

export const Logo: React.FC<LogoProps> = ({ className = '', isDark = false, size = 'md' }) => {
  return (
    <img
      src={isDark ? logoBranco : logoAzul}
      alt="MindSight Company"
      draggable={false}
      className={`${heights[size]} w-auto select-none transition-opacity duration-300 ${className}`}
    />
  );
};
