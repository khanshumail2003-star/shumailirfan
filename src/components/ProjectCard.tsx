import { motion } from 'motion/react';
import { Project } from '../types';
import { ZoomIn, ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group relative bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 border border-slate-800 hover:border-violet-500/30"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onClick(project)}
            className="p-4 bg-white rounded-full text-black shadow-2xl hover:bg-violet-500 hover:text-white transition-colors"
          >
            <ZoomIn size={24} />
          </motion.button>
        </div>
      </div>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-black text-violet-400 uppercase tracking-[0.2em] bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20">
            {project.category}
          </span>
          <ArrowRight size={18} className="text-slate-700 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
        </div>
        <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}
