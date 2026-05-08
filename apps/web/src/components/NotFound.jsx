import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-8xl font-extrabold text-indigo-500 mb-4 leading-none">404</p>
        <h1 className="text-3xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-gray-400 max-w-md mb-10">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Home size={18} />
            Go home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            Go back
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default NotFound;
