import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiClock, FiCalendar } from 'react-icons/fi'; // Perbaiki import

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300"
    >
      <Link to={`/watch/${movie.id}`}>
        <div className="relative h-64 overflow-hidden">
          <img 
            src={movie.thumbnail} 
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-purple-600 p-4 rounded-full">
              <FiPlay className="text-2xl" /> {/* Ganti Play jadi FiPlay */}
            </div>
          </motion.div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
            {movie.title}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {movie.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genre.slice(0, 2).map((genre, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-700/50 rounded text-xs">
                {genre}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <FiClock className="text-purple-400" />
              <span>{movie.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-purple-400" />
              <span>{movie.year}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;