import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/Player/VideoPlayer';
import MovieCard from '../components/Shared/MovieCard';
import { movies, additionalMovies } from '../data/movies';
import { FiChevronLeft } from 'react-icons/fi';

const WatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const currentMovie = [...movies, ...additionalMovies].find(m => m.id === parseInt(id));
    setMovie(currentMovie);

    if (currentMovie) {
      const allMovies = [...movies, ...additionalMovies];
      const filtered = allMovies
        .filter(m => 
          m.id !== currentMovie.id && 
          m.genre.some(g => currentMovie.genre.includes(g))
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      
      setRecommendations(filtered);
    }
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Movie not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-purple-600 px-6 py-2 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <FiChevronLeft />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Video Player */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <VideoPlayer movie={movie} />
          
          {/* Movie Info */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-gray-400">{movie.year}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">{movie.duration}</span>
            </div>
            <p className="text-gray-300 mb-4">{movie.description}</p>
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre, idx) => (
                <span key={idx} className="px-3 py-1 bg-purple-600/20 border border-purple-500 rounded-full">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.map(rec => (
                  <MovieCard key={rec.id} movie={rec} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default WatchPage;