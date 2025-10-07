
import React from 'react';

const ChefHatIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-warm-orange" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 .34.03.68.08 1H5c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2h-.08c.05-.32.08-.66.08-1 0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm-7 11v-2h2v2H5zm4 0v-2h2v2H9zm4 0v-2h2v2h-2zm4 0v-2h2v2h-2z" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center border-b-2 border-earthy-brown pb-6">
      <div className="flex justify-center items-center gap-4">
        <ChefHatIcon />
        <h1 className="text-4xl md:text-5xl font-bold font-sans text-earthy-brown">AI Recipe Inventor</h1>
      </div>
      <p className="mt-2 text-lg text-earthy-brown/80">Your creative partner in the kitchen</p>
    </header>
  );
};
