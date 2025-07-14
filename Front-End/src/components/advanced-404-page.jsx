import React, { useState, useEffect } from 'react';
import { Home, ArrowLeft, UtensilsCrossed, ChefHat, Coffee, Heart, MapPin, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MetaData from './Layout/MetaData/MetaData';

export default function GlobalRestaurant404Page() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);
  const [floatingItems, setFloatingItems] = useState([]);
  const [hungerLevel, setHungerLevel] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate=useNavigate()

  // Global food emojis representing various cuisines
  const globalFoodEmojis = ['🍕', '🍔', '🍟', '🌮', '🍝', '🥗', '🍤', '🥘', '🍜', '🍛', '🥟', '🍱', '🌯', '🥙', '🧆', '🍖', '🍗', '🥩', '🍳', '🥞'];

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Glitch effect trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Generate floating food items
  useEffect(() => {
    const newItems = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji: globalFoodEmojis[Math.floor(Math.random() * globalFoodEmojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      size: 16 + Math.random() * 16
    }));
    setFloatingItems(newItems);
  }, []);

  // Simulate hunger level increasing over time
  useEffect(() => {
    const interval = setInterval(() => {
      setHungerLevel(prev => (prev + 1) % 100);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const glitchStyle = glitchActive ? {
    transform: `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`,
    filter: 'hue-rotate(45deg)',
  } : {};

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden relative">
      <MetaData title='404 Not Found' />
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-restaurant-pattern"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(234, 88, 12, 0.2) 0%, transparent 50%)`,
            transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`
          }}
        />
      </div>

      {/* Floating Food Items */}
      {floatingItems.map((item) => (
        <div
          key={item.id}
          className="absolute opacity-60 select-none pointer-events-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
            animation: `floatFood ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Status Bar */}
      <div className="fixed top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-orange-200 space-y-2">
        <div className="flex items-center gap-2 text-orange-600">
          <Heart className="fill-current" size={16} />
          <span className="font-medium text-xs">Appetite: {hungerLevel}%</span>
        </div>
        <div className="w-20 h-1.5 bg-orange-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-150"
            style={{ width: `${hungerLevel}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <Clock size={14} />
          <span className="text-xs font-medium">{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Chef Hat Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <ChefHat size={72} className="text-orange-600 animate-bounce" />
              <div className="absolute -top-1 -right-1 text-xl animate-pulse">✨</div>
            </div>
          </div>

          {/* 404 Number with Glitch Effect */}
          <div className="relative mb-8">
            <h1 
              className="text-8xl md:text-9xl font-bold mb-4 text-orange-600 transition-all duration-200"
              style={glitchStyle}
            >
              4
              <span className="relative inline-block">
                0
                <span className="absolute inset-0 text-red-500 opacity-80 animate-ping">
                  0
                </span>
              </span>
              4
            </h1>
            
            {/* Glitch Lines */}
            {glitchActive && (
              <>
                <div className="absolute top-1/4 left-0 right-0 h-1 bg-yellow-400 animate-pulse" />
                <div className="absolute bottom-1/4 left-0 right-0 h-1 bg-red-400 animate-pulse" />
              </>
            )}
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-800">
              Page Not Found - Kitchen's Closed Here!
            </h2>
            <p className="text-lg md:text-xl mb-6 text-gray-600 max-w-2xl mx-auto">
              The page you're looking for seems to have been taken off the menu. 
              But don't worry, our kitchen is still cooking up amazing experiences for you!
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
              <UtensilsCrossed size={18} />
              <span className="font-medium">Error 404: page Not Found</span>
            </div>
          </div>

          {/* Global Restaurant Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-3">🌍</div>
              <div className="text-lg font-bold text-gray-800">Global</div>
              <div className="text-sm text-gray-600">Cuisines Available</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-3">⭐</div>
              <div className="text-lg font-bold text-gray-800">Premium</div>
              <div className="text-sm text-gray-600">Quality Service</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-3">🚀</div>
              <div className="text-lg font-bold text-gray-800">Fast</div>
              <div className="text-sm text-gray-600">Delivery & Service</div>
            </div>
          </div>

          {/* Cuisine Categories */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Explore Our Cuisine Categories:</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { emoji: '🍕', name: 'Italian', color: 'from-green-400 to-red-400' },
                { emoji: '🍜', name: 'Asian', color: 'from-yellow-400 to-red-400' },
                { emoji: '🌮', name: 'Mexican', color: 'from-green-400 to-yellow-400' },
                { emoji: '🍔', name: 'American', color: 'from-blue-400 to-red-400' },
                { emoji: '🥙', name: 'Mediterranean', color: 'from-blue-400 to-green-400' },
                { emoji: '🍛', name: 'Indian', color: 'from-orange-400 to-red-400' }
              ].map((cuisine, index) => (
                <div 
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group min-w-[100px]"
                >
                  <div className="text-2xl mb-2 group-hover:animate-bounce">{cuisine.emoji}</div>
                  <div className="font-semibold text-gray-800 text-sm">{cuisine.name}</div>
                  <div className={`w-full h-1 rounded-full mt-2 bg-gradient-to-r ${cuisine.color}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg shadow-orange-500/25"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            
            <button
               onClick={() => navigate("/")}
              className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-white/70 backdrop-blur-sm border border-orange-200 text-gray-800 hover:bg-white/90 shadow-lg"
            >
              <Home size={20} className="group-hover:rotate-12 transition-transform" />
              Home
            </button>

            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-amber-100 border border-amber-200 text-amber-800 hover:bg-amber-200 shadow-lg"
            >
              <UtensilsCrossed size={20} className="group-hover:rotate-12 transition-transform" />
              View Menu
            </button>
          </div>

          {/* Additional Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button className="px-4 py-2 text-sm bg-white/50 hover:bg-white/70 rounded-full border border-orange-200 text-gray-700 transition-all duration-300">
              <MapPin size={14} className="inline mr-1" />
              Locations
            </button>
            <button className="px-4 py-2 text-sm bg-white/50 hover:bg-white/70 rounded-full border border-orange-200 text-gray-700 transition-all duration-300">
              <Star size={14} className="inline mr-1" />
              Reviews
            </button>
            <button className="px-4 py-2 text-sm bg-white/50 hover:bg-white/70 rounded-full border border-orange-200 text-gray-700 transition-all duration-300">
              <Coffee size={14} className="inline mr-1" />
              Contact
            </button>
          </div>

          {/* Global Message */}
          <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-orange-200 max-w-lg mx-auto">
            <p className="text-gray-700 font-medium">
              "Great food brings people together from around the world."
            </p>
            <p className="text-orange-600 font-semibold mt-2 text-sm">- Our Philosophy</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes floatFood {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-25px) rotate(180deg) scale(1.1); 
            opacity: 0.9;
          }
        }
        
        .bg-restaurant-pattern {
          background-size: 60px 60px;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(234, 88, 12, 0.1) 2px, transparent 2px),
            radial-gradient(circle at 80% 50%, rgba(185, 28, 28, 0.1) 2px, transparent 2px);
        }
      `}</style>
    </div>
  );
}