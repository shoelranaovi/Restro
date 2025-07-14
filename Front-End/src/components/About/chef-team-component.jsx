import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const ChefCard = ({ name, title, image }) => {
  return (
    <div data-aos="zoom-in-up"  className="relative p-5 bg-cream rounded-lg border border-orange-300 border-opacity-30">
      <div className="flex flex-col items-center">
        <div className="w-48 h-48 md:w-56 md:h-56 relative mb-4">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-b from-orange-400 via-yellow-500 to-green-600">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-lg text-gray-600 mb-4">{title}</p>
        <p className="text-center text-gray-500 mb-6 px-2">
          Cras suscipit, tellus at ornare lacinia, sem metus mollis ante, id aliquet ante purus non lorem.
        </p>
        <div className="flex space-x-2">
          <SocialButton icon={<Facebook size={18} />} color="bg-orange-500" />
          <SocialButton icon={<Twitter size={18} />} color="bg-orange-500" />
          <SocialButton icon={<Linkedin size={18} />} color="bg-orange-500" />
          <SocialButton icon={<Instagram size={18} />} color="bg-orange-500" />
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ icon, color }) => {
  return (
    <button className={`${color} w-8 h-8 rounded-md flex items-center justify-center text-white hover:opacity-80 transition-opacity`}>
      {icon}
    </button>
  );
};

const ChefTeam = () => {
  const chefs = [
    {
      id: 1,
      name: 'Roberto Martinez',
      title: 'Executive Chef',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/chef-2.webp',
    },
    {
      id: 2,
      name: 'Daniel Lee',
      title: 'Sous Chef',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/Daniel-Lee-1.webp',
    },
    {
      id: 3,
      name: 'James Harris',
      title: 'Pastry Chef',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/James-Harris.webp',
    },
    {
      id: 4,
      name: 'Ethan Parker',
      title: 'Vegan Chef',
      image: 'https://preview.templateorbit.com/exlusive/rasoi-reverie/wp-content/uploads/sites/28/2024/12/Ethan-Parker.webp',
    },
  ];

  return (
    <div className="bg-cream min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div data-aos="fade-right" className="text-center mb-16">
          <p className="text-orange-500  font-medium mb-2">
            <span className="border-b-2 border-orange-500 mx-1">----</span> Team <span className="border-b-2 border-orange-500 mx-1">----</span>
          </p>
          <h2 className="text-3xl md:text-3xl font-bold text-gray-800">Meet Our Chefs</h2>
        </div>
        
        <div    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef) => (
            <ChefCard     key={chef.id} {...chef} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChefTeam;