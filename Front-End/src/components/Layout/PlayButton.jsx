import { Play } from 'lucide-react';
import React from 'react';

const PlayButton = () => {
  return (
    <div className="relative w-12 h-12">
      {/* Rotating buffer animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full border-t-4 border-orange-500 border-solid rounded-full animate-spin-slow" />
      </div>

      {/* Button Background */}
      <div className="absolute inset-1 flex items-center justify-center bg-white rounded-full shadow-md">
        {/* Green play icon inside circle */}
        <div className="w-6 h-6 border-2  border-green-600 rounded-full flex items-center justify-center">
         <Play className='text-black' size={10} />
        </div>
      </div>
    </div>
  );
};

export default PlayButton;

