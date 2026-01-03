import React from 'react';
import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi'; // Perbaiki import

const HeroSection = () => {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-full flex items-center"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Unlimited <span className="text-purple-500">Movies</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Stream your favorite movies and series anytime, anywhere. 
            High-quality streaming on all your devices.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-full font-bold flex items-center space-x-2"
          >
            <FiPlay className="text-xl" /> {/* Ganti Play jadi FiPlay */}
            <span>Start Watching Free</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;