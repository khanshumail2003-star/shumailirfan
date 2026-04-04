import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 bg-dark-gradient">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-slate-800 text-center"
      >
        <div className="w-24 h-24 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
          <AlertCircle size={48} />
        </div>
        
        <h1 className="text-6xl font-black text-white mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-10 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="w-full py-4 bg-violet-600 text-white rounded-2xl font-bold text-lg hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center space-x-3 group"
          >
            <Home size={24} />
            <span>Back to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold text-lg hover:bg-slate-700 transition-all flex items-center justify-center space-x-3"
          >
            <ArrowLeft size={24} />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
