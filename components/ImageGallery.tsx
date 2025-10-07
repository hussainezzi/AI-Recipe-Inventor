
import React from 'react';
import { Card } from './Card';

interface ImageGalleryProps {
  images: string[];
  caption: string;
  isLoading: boolean;
  recipeName: string;
}

const LoadingSkeleton: React.FC = () => (
  <div className="bg-gray-200/50 rounded-lg animate-pulse aspect-[4/3]"></div>
);

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, caption, isLoading, recipeName }) => {
  return (
    <Card title="4. Visuals & Caption">
      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-bold font-sans mb-3">Generated Photos</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading && Array.from({ length: 4 }).map((_, index) => <LoadingSkeleton key={index} />)}
            {!isLoading && images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`AI generated photo ${index + 1} of ${recipeName}`}
                className="rounded-lg shadow-md w-full h-full object-cover aspect-[4/3] border-2 border-earthy-brown/50"
              />
            ))}
          </div>
        </div>

        {caption && (
          <div>
            <h4 className="text-xl font-bold font-sans mb-3">Social Media Caption</h4>
            <div className="bg-warm-orange/10 border-l-4 border-warm-orange text-earthy-brown p-4 rounded-r-lg">
              <p className="italic">{caption}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
