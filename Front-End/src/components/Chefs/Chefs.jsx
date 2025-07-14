import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const ChefTeam = () => {
  const chefs = [
    {
      id: 1,
      name: 'Roberto Martinez',
      position: 'Executive Chef',
      description: 'Cras suscipit, tellus at ornare lacinia, sem metus mollis ante, id aliquet ante purus non lorem.',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/chef-2.webp'
    },
    {
      id: 2,
      name: 'Daniel Lee',
      position: 'Sous Chef',
      description: 'Cras suscipit, tellus at ornare lacinia, sem metus mollis ante, id aliquet ante purus non lorem.',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/Daniel-Lee-1.webp'
    },
    {
      id: 3,
      name: 'James Harris',
      position: 'Pastry Chef',
      description: 'Cras suscipit, tellus at ornare lacinia, sem metus mollis ante, id aliquet ante purus non lorem.',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/James-Harris.webp'
    },
    {
      id: 4,
      name: 'Ethan Parker',
      position: 'Vegan Chef',
      description: 'Cras suscipit, tellus at ornare lacinia, sem metus mollis ante, id aliquet ante purus non lorem.',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/Ethan-Parker.webp'
    }
  ];

  return (
    <div className="bg-green-50 w-full py-12 px-4">
      {/* Main header */}
      <div data-aos="fade-right" className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">Chefs</h1>
        <p className="text-gray-600 mx-auto max-w-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
      </div>

      {/* Team section */}
      <div className="max-w-6xl mx-auto">
        <div data-aos="fade-left" className="flex justify-center items-center mb-8">
          <div className="h-px bg-amber-500 w-12"></div>
          <span className="mx-4 text-amber-500 font-medium">Team</span>
          <div className="h-px bg-amber-500 w-12"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif text-center text-gray-800 mb-12">Meet Our Chefs</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef) => (
            <div data-aos="zoom-in"  key={chef.id} className="border border-amber-200 rounded-lg p-6 flex flex-col items-center">
              <div className="w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-transparent" style={{ 
                background: 'linear-gradient(to bottom, #f59e0b, #10b981)',
                padding: '4px'
              }}>
                <div className="rounded-full overflow-hidden bg-white w-full h-full flex items-center justify-center">
                  <img src={chef.image} alt={chef.name} className="w-full h-full object-cover" />
                </div>
              </div>
              
              <h3 className="text-xl font-serif font-medium mb-1">{chef.name}</h3>
              <p className="text-gray-600 mb-4">{chef.position}</p>
              <p className="text-center text-gray-600 mb-6">{chef.description}</p>
              
              <div className="flex space-x-2">
                <a href="#" className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center text-white hover:bg-amber-600 transition">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center text-white hover:bg-amber-600 transition">
                  <Twitter size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center text-white hover:bg-amber-600 transition">
                  <Linkedin size={16} />
                </a>
                <a href="#" className="w-8 h-8 bg-amber-500 rounded-sm flex items-center justify-center text-white hover:bg-amber-600 transition">
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChefTeam;