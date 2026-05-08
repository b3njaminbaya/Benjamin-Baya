import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-950 text-white overflow-hidden px-6 text-center">
    {/* Background glows */}
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[130px]" />
      <div className="absolute bottom-[-10%] right-[15%] w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[110px]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>

    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-[9rem] font-extrabold leading-none mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 select-none">
        404
      </p>
      <h1 className="text-3xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-gray-400 max-w-sm mx-auto mb-10 leading-relaxed">
        This page doesn't exist or may have been moved. Head back and keep exploring.
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
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
        >
          <ArrowLeft size={18} />
          Go back
        </button>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
