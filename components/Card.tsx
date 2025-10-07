
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <section className={`bg-white/30 p-6 rounded-lg shadow-md border-2 border-earthy-brown ${className}`}>
      {title && <h2 className="text-2xl font-bold font-sans mb-4 text-earthy-brown">{title}</h2>}
      {children}
    </section>
  );
};
