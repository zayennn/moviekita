import React from 'react';
import { motion } from 'framer-motion';
import MovieList from '../components/Home/MovieList';
import HeroSection from '../components/Home/HeroSection';
import { movies } from '../data/movies';

const HomePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <HeroSection />
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8 text-center">Featured Movies</h2>
                <MovieList movies={movies} />
            </div>
        </motion.div>
    );
};

export default HomePage;