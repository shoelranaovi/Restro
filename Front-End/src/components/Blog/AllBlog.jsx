import React, { useState } from 'react';

const PostArchive = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Kid-Friendly Menu Options Everyone Will Love',
      category: 'Menu',
      date: 'December 25, 2024',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/young-happy-waiter-working-in-a-cafe-300x200.webp',
      alt: 'Waiter holding a tray at a restaurant'
    },
    {
      id: 2,
      title: 'A Day in the Life of Our Kitchen Team',
      category: 'Kitchen',
      date: 'December 25, 2024',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-employees-receiving-768x512.webp',
      alt: 'Restaurant kitchen team'
    },
    {
      id: 3,
      title: 'Exploring Global Flavors on Our Menu',
      category: 'Menu',
      date: 'December 25, 2024',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/served-dinner-table-768x512.webp',
      alt: 'Table set with silver service'
    },
    {
      id: 4,
      title: 'The Secret Behind Our Signature Sauce',
      category: 'Ingredients',
      date: 'December 25, 2024',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/53897-set-table-in-ornate-dining-room-768x512.webp',
      alt: 'Restaurant dining room with kitchen view'
    },
    {
      id: 5,
      title: 'A Beginner\'s Guide to Fine Dining Etiquette',
      category: 'Desserts',
      date: 'December 25, 2024',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/chef-preparing-vegetarian-768x512.webp',
      alt: 'Fine dining table settings'
    },
    {
      id: 6,
      title: 'Top 5 Desserts to Satisfy Your Sweet Tooth',
      category: 'Desserts',
      date: 'December 25, 2024',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-counter-with-different-lunch-768x512.webp',
      alt: 'Chef plating desserts'
    },
    {
      id: 6,
      title: 'Top 5 Desserts to Satisfy Your Sweet Tooth',
      category: 'Desserts',
      date: 'December 25, 2024',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/restaurant-counter-with-different-lunch-768x512.webp',
      alt: 'Chef plating desserts'
    }
  ]);

  // For "Load More" functionality
  const [visiblePosts, setVisiblePosts] = useState(6);
  
  const loadMorePosts = () => {
    // In a real app, this would fetch more posts from an API
    setVisiblePosts(prevCount => prevCount + 6);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Menu':
        return 'bg-green-50 text-green-600';
      case 'Kitchen':
        return 'bg-green-50 text-green-600';
      case 'Ingredients':
        return 'bg-green-50 text-green-600';
      case 'Desserts':
        return 'bg-green-50 text-green-600';
      default:
        return 'bg-green-50 text-green-600';
    }
  };

  return (
    <div className="bg-green-50 min-h-screen pb-16">
      {/* Header Section */}
      <div data-aos="fade-left" className="text-center py-12 px-4">
        <h1 className="text-4xl font-serif text-gray-900 mb-2">Post Archive</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, visiblePosts).map((post) => (
            <div data-aos="zoom-in-down" key={post.id} className="group bg-white rounded-lg overflow-hidden shadow-sm transition duration-300 hover:shadow-md">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.alt} 
                  className="w-full h-60 object-cover"
                />
                <div className="absolute bottom-4 right-4">
                  <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-serif font-semibold mb-2 group-hover:text-green-600 transition-colors">
                  <a href={`/post/${post.id}`} className="hover:underline">{post.title}</a>
                </h2>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <time>{post.date}</time>
                  </div>
                </div>
                <a 
                  href={`/post/${post.id}`} 
                  className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors duration-200"
                >
                  <span>Read More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visiblePosts < posts.length && (
          <div className="text-center mt-12">
            <button 
              onClick={loadMorePosts}
              className="px-6 py-2 border border-green-500 text-green-600 hover:bg-green-50 rounded transition-colors duration-200"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostArchive;