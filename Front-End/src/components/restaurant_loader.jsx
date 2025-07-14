import React from 'react';

const RestaurantLoader = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Main Logo/Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          
          {/* Floating food items */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}>
            <span className="text-xs flex items-center justify-center h-full">🍕</span>
          </div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}>
            <span className="text-xs flex items-center justify-center h-full">🥗</span>
          </div>
          <div className="absolute top-1/2 -right-6 w-7 h-7 bg-red-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}>
            <span className="text-xs flex items-center justify-center h-full">🍔</span>
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Loading...
        </h2>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto mb-6">
          <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse transform origin-left">
            <div className="w-full h-full bg-gradient-to-r from-orange-400 to-red-500 animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>

        {/* Fun loading messages */}
        <p className="text-gray-600 mt-6 text-sm animate-pulse">
          Please wait while we load your content...
        </p>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default RestaurantLoader;