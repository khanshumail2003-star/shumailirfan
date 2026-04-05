import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Project } from '../types';

export default function AutoSlider() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data({ serverTimestamps: 'estimate' })
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching slider projects:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const nextSlide = () => setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === projects.length - 1 ? projects.length - 1 : prev - 1));

  if (loading) {
    return (
      <div className="relative h-[650px] w-full flex items-center justify-center bg-slate-900/50 rounded-[4rem] border border-slate-800">
        <Loader2 className="animate-spin text-violet-500" size={48} />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="relative h-[650px] w-full flex items-center justify-center bg-slate-900/50 rounded-[4rem] border border-slate-800 text-center p-8">
        <div className="space-y-4">
          <Sparkles size={48} className="text-slate-700 mx-auto" />
          <h3 className="text-2xl font-bold text-white">No Masterpieces Yet</h3>
          <p className="text-slate-400">Add your first project in the admin dashboard to see it here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[650px] w-full overflow-hidden rounded-[4rem] shadow-[0_0_100px_rgba(139,92,246,0.1)] border border-slate-800 group">
      <AnimatePresence mode="wait">
        <motion.div
          key={projects[current].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <img
            src={projects[current].imageUrl}
            alt={projects[current].title}
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
              {projects[current].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-slate-300 font-medium leading-relaxed line-clamp-2"
            >
              {projects[current].description}
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
        {projects.map((_, idx) => (
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
