import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, Clock, Crown } from 'lucide-react';

// Custom Link component to replace react-router-dom's Link
const Link = ({ to, children, className }) => {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
};

const Footer = () => {
  // Array for data
  const pagesLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Menu', path: '/menu' },
  ];

  const quickLinks = [
    { name: 'Chefs', path: '/chefs' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Contact', path: '/contact' },
  ];

  const contactInfo = [
    { icon: <Phone size={18} />, text: '+88-123-4567', link: 'tel:+88-123-4567' },
    { icon: <Mail size={18} />, text: 'support@gmail.com', link: 'mailto:support@gmail.com' },
    { icon: <MapPin size={18} />, text: '1234 Foodie City, United States', link: 'https://maps.google.com/?q=1234+Foodie+City,+United+States' },
    { icon: <Clock size={18} />, text: 'Monday – Friday: 11:00 AM – 10:00 PM', link: null },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, path: 'https://facebook.com', color: 'bg-[#3b5998]' },
    { icon: <Twitter size={20} />, path: 'https://twitter.com', color: 'bg-[#1DA1F2]' },
    { icon: <Linkedin size={20} />, path: 'https://linkedin.com', color: 'bg-[#0077B5]' },
    { icon: <Instagram size={20} />, path: 'https://instagram.com', color: 'bg-[#E1306C]' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">About</h2>
            <p className="text-gray-300">
              Royal Rasoi is dedicated to providing an exceptional dining experience with a menu crafted from the finest ingredients.
            </p>
          </div>

          {/* Pages Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Pages</h2>
            <ul className="space-y-2">
              {pagesLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-gray-300 hover:text-orange-400 flex items-center">
                    <span className="text-orange-400 mr-2">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-gray-300 hover:text-orange-400 flex items-center">
                    <span className="text-orange-400 mr-2">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-orange-400 mr-3">{item.icon}</span>
                  {item.link ? (
                    <a href={item.link} className="text-gray-300 hover:text-orange-400">
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-300">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Logo in center above copyright section */}
      <div className="flex justify-center -mb-8">
        <div className="bg-gray-900 px-8 relative z-10">
          <div className="flex flex-col items-center">
            <Crown size={28} className="text-orange-400" />
            <div className="mt-2 text-center">
              <h3 className="text-xl font-bold">Restro</h3>
              <div className="w-full h-0.5 bg-orange-400 mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800 mt-12 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025. All Rights Reserved.</p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-2 mt-4 md:mt-0">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.path} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${social.color} w-10 h-10 rounded flex items-center justify-center hover:opacity-90 transition-opacity`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="flex justify-center pb-4">
        <div className="w-1/2 h-1 bg-gray-700 rounded-full"></div>
      </div>
    </footer>
  );
};

export default Footer;