import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Tag, Share2, Download } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          className="relative w-full max-w-6xl bg-slate-900 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(139,92,246,0.15)] border border-slate-800"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-slate-800/80 hover:bg-violet-600 text-white rounded-full backdrop-blur-md z-20 transition-all duration-300 shadow-xl"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col lg:flex-row h-full max-h-[85vh] overflow-y-auto lg:overflow-hidden">
            <div className="lg:w-3/5 bg-black/40 flex items-center justify-center p-4 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-800">
              <div className="relative group w-full h-full flex items-center justify-center">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="max-w-full max-h-[60vh] lg:max-h-full object-contain rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="lg:w-2/5 p-10 lg:p-16 flex flex-col bg-slate-900/50">
              <div className="flex-1 space-y-8">
                <div className="flex items-center space-x-3 text-violet-400">
                  <div className="p-2 bg-violet-500/10 rounded-lg">
                    <Tag size={20} />
                  </div>
                  <span className="text-sm font-black uppercase tracking-[0.2em]">
                    {project.category}
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                  {project.title}
                </h2>
                <div className="prose prose-invert prose-lg max-w-none text-slate-400 leading-relaxed font-medium">
                  {project.description}
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl transition-all font-bold text-sm border border-slate-700">
                    <Share2 size={18} />
                    <span>Share Project</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl transition-all font-bold text-sm shadow-lg shadow-violet-600/20">
                    <Download size={18} />
                    <span>Inquire Now</span>
                  </button>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 flex items-center justify-between text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                <div className="flex items-center space-x-3">
                  <Calendar size={18} className="text-violet-500" />
                  <span>{project.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently Added'}</span>
                </div>
                <span className="text-slate-700">Ref: {project.id.slice(0, 8)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
