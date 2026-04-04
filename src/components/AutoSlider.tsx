import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
    title: 'Legendary Logo Identities',
    subtitle: 'Crafting unique visual signatures for global brands.',
  },
  {
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
    title: 'Social Media Dominance',
    subtitle: 'High-impact content designed for viral engagement.',
  },
  {
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    title: 'Strategic Brand Stories',
    subtitle: 'Transforming complex visions into visual narratives.',
  },
];

export default function AutoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative h-[650px] w-full overflow-hidden rounded-[4rem] shadow-[0_0_100px_rgba(139,92,246,0.1)] border border-slate-800">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-16 left-16 z-20 text-white max-w-2xl space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center space-x-2 bg-violet-500/20 text-violet-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-violet-500/30"
            >
              <Sparkles size={14} />
              <span>Featured Masterpiece</span>
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-5xl md:text-7xl font-black leading-tight tracking-tighter"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-slate-300 font-medium leading-relaxed"
            >
              {slides[current].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute right-12 bottom-16 z-30 flex space-x-4">
        <button
          onClick={prevSlide}
          className="p-4 bg-slate-900/80 hover:bg-violet-600 text-white rounded-2xl backdrop-blur-md transition-all duration-300 border border-slate-800 shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-4 bg-slate-900/80 hover:bg-violet-600 text-white rounded-2xl backdrop-blur-md transition-all duration-300 border border-slate-800 shadow-xl"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-16 left-16 z-30 flex space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              current === idx ? 'w-12 bg-gradient-to-r from-violet-500 to-amber-500' : 'w-4 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
