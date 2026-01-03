import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film } from 'react-icons/fi';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <Film className="text-3xl text-purple-500" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            FilmStream
                        </span>
                    </Link>

                    <div className="flex space-x-6">
                        <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
                        <Link to="/" className="hover:text-purple-400 transition-colors">Movies</Link>
                        <Link to="/" className="hover:text-purple-400 transition-colors">Series</Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;