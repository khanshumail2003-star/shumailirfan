import { motion } from 'motion/react';
import { Project } from '../types';
import { ExternalLink, ZoomIn } from 'lucide-react';

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
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-violet-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <button
            onClick={() => onClick(project)}
            className="p-3 bg-white rounded-full text-violet-600 hover:bg-violet-50 transition-colors"
          >
            <ZoomIn size={20} />
          </button>
        </div>
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold text-violet-600 uppercase tracking-wider bg-violet-50 px-2 py-1 rounded">
          {project.category}
        </span>
        <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-slate-600 text-sm line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}
