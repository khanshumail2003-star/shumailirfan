import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Tag } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md z-10 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
            <div className="md:w-3/5 bg-slate-100">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:w-2/5 p-8 md:p-10 flex flex-col">
              <div className="flex-1">
                <div className="flex items-center space-x-2 text-violet-600 mb-4">
                  <Tag size={16} />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  {project.title}
                </h2>
                <div className="prose prose-violet max-w-none text-slate-600 leading-relaxed">
                  {project.description}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{project.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently Added'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
