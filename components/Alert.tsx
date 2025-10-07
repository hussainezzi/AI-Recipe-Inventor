
import React from 'react';

interface AlertProps {
  message: string;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md flex justify-between items-center" role="alert">
      <div>
        <p className="font-bold">Error</p>
        <p>{message}</p>
      </div>
      <button onClick={onClose} className="text-red-500 hover:text-red-700 font-bold text-2xl">&times;</button>
    </div>
  );
};
