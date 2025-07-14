import { useState, useEffect } from 'react';

export default function TestimonialSlider() {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'James F',
      title: 'Loyal Guest',
      avatar: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/portrait-of-smiling-chef-in-uniform.webp',
      stars: 5,
      quote: 'The atmosphere is so welcoming, and the staff is incredibly attentive. The menu had so many options, and everything we ordered was outstanding.'
    },
    {
      id: 2,
      name: 'David M',
      title: 'Happy Customer',
      avatar: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/handsome-young-chef-holding-broccoli.webp',
      stars: 5,
      quote: 'A perfect spot for a romantic dinner. The dishes were beautifully presented, and the flavors were out of this world. I can\'t wait to come back and try more!'
    },
    {
      id: 3,
      name: 'Sarah J',
      title: 'Local Food Enthusiast',
      avatar: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/portrait-of-a-smiling-elegant-man-at-morning.webp',
      stars: 5,
      quote: 'The best dining experience I\'ve had in a long time! The food was exceptional, the staff was incredibly friendly, and the ambiance made it all the more special.'
    },
    {
      id: 4,
      name: 'Michael P',
      title: 'First-time Visitor',
      avatar: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/portrait-of-smiling-chef-in-uniform.webp',
      stars: 5,
      quote: 'Blown away by the quality and service. Every dish was a masterpiece and the staff made us feel like VIPs. Will definitely be returning!'
    },
    {
      id: 5,
      name: 'Emma L',
      title: 'Culinary Explorer',
      avatar: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/chef-in-uniform-and-toque-blanche-holding-tray.webp',
      stars: 5,
      quote: 'The chef\'s tasting menu was an incredible journey of flavors. Each course told a story and the wine pairings were absolutely perfect.'
    }
  ];

  // State for current slide index
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [autoplayInterval, setAutoplayInterval] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  // Update slides to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Setup autoplay
  useEffect(() => {
    // Clear any existing interval
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }

    // Setup new interval
    const interval = setInterval(() => {
      animateSlide('next');
    }, 5000);
    
    setAutoplayInterval(interval);

    // Cleanup
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, testimonials.length]);

  // Animate slide transition
  const animateSlide = (dir) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(dir);
    
    setTimeout(() => {
      if (dir === 'next') {
        nextSlide();
      } else {
        prevSlide();
      }
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  // Navigate to next slide
  const nextSlide = () => {
    const maxIndex = Math.max(0, testimonials.length - slidesToShow);
    setCurrentIndex(prevIndex => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  // Navigate to previous slide
  const prevSlide = () => {
    const maxIndex = Math.max(0, testimonials.length - slidesToShow);
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 'next' : 'prev');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(rating)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-orange-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        ))}
      </div>
    );
  };

  // Calculate visible testimonials
  const visibleTestimonials = testimonials.slice(
    currentIndex, 
    currentIndex + slidesToShow
  );

  // Calculate max pagination index
  const maxPaginationIndex = Math.max(0, testimonials.length - slidesToShow);
  const paginationDots = Array.from({ length: maxPaginationIndex + 1 }, (_, i) => i);

  // Generate slider animation classes
  const getSliderClasses = () => {
    let classes = "flex space-x-5 transition-all duration-300 ease-in-out";
    
    if (isAnimating) {
      classes += direction === 'next' 
        ? " -translate-x-4 opacity-0" 
        : " translate-x-4 opacity-0";
    } else {
      classes += " translate-x-0 opacity-100";
    }
    
    return classes;
  };

  return (
    <div className="bg-white w-full">
      <div className="container mx-auto px-4 py-12">
        <div data-aos="fade-right" className="text-center mb-12">
          <p className="text-green-600 font-medium relative inline-flex before:content-[''] before:absolute before:-left-12 before:top-1/2 before:h-px before:w-8 before:bg-green-600 after:content-[''] after:absolute after:-right-12 after:top-1/2 after:h-px after:w-8 after:bg-green-600">Testimonials</p>
          <h2 className="text-4xl font-bold text-gray-900 mt-2 transition-all duration-700 hover:text-green-700">What Our Guests Are Saying</h2>
        </div>

        <div className="flex">
          {/* Custom Testimonial Slider */}
          <div data-aos="fade-left" className="w-full lg:w-2/3 relative overflow-hidden">
            <div className={getSliderClasses()}>
              {visibleTestimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="bg-green-50 rounded-lg p-6 flex-shrink-0 flex-grow shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
                  style={{ 
                    width: `calc(${100/slidesToShow}% - ${(slidesToShow-1)*20/slidesToShow}px)` 
                  }}
                >
                  <div className="animate-pulse-slow">
                    <StarRating rating={testimonial.stars} />
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-green-400 transition-all duration-500 hover:scale-110">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-green-600">{testimonial.title}</p>
                    </div>
                    <div className="ml-auto text-4xl text-green-700 font-serif opacity-50">"</div>
                  </div>
                  
                  <p className="mt-4 text-gray-700 italic">{testimonial.quote}</p>
                  <div className="ml-auto text-4xl text-green-700 font-serif opacity-50 mt-auto">"</div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <button 
              onClick={() => animateSlide('prev')} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white rounded-full shadow-lg p-2 text-gray-600 hover:text-green-600 hover:scale-110 focus:outline-none transition-all duration-300"
              disabled={isAnimating}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => animateSlide('next')} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white rounded-full shadow-lg p-2 text-gray-600 hover:text-green-600 hover:scale-110 focus:outline-none transition-all duration-300"
              disabled={isAnimating}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Enhanced pagination dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {paginationDots.map((dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => goToSlide(dotIndex)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    dotIndex === currentIndex 
                      ? 'bg-green-600 w-8' 
                      : 'bg-gray-300 w-2 hover:bg-green-400'
                  }`}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Image Section (only visible on large screens) */}
          <div data-aos="fade-down"   className="hidden lg:block lg:w-1/3 pl-6">
            <div className="rounded-lg overflow-hidden h-full shadow-xl transform transition-all duration-700 hover:scale-105">
              <img
                src="https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/portrait-of-a-smiling-elegant-man-at-morning-buffe.webp"
                alt="Chef serving food"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}