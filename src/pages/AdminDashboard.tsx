import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Project } from '../types';
import { Plus, Trash2, LogOut, LogIn, LayoutDashboard, Image as ImageIcon, Type, Tag, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const ADMIN_EMAILS = ['khanshumail2003@gmail.com', 'hafizmuhammadshumailirfan@gmail.com'];

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Logo',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser && ADMIN_EMAILS.includes(currentUser.email || '')) {
        fetchProjects();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchProjects = async () => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const projectsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
    setProjects(projectsData);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'projects'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setFormData({ title: '', description: '', imageUrl: '', category: 'Logo' });
      setStatus('success');
      fetchProjects();
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Error adding project:", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-violet-600" size={48} />
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-violet-50 text-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <LayoutDashboard size={40} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Admin Access</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            This area is restricted to Shumail Irfan. Please sign in with your authorized email to manage your portfolio.
          </p>
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-violet-600 text-white rounded-2xl font-bold text-lg hover:bg-violet-700 transition-all shadow-lg hover:shadow-violet-200 flex items-center justify-center space-x-3"
          >
            <LogIn size={24} />
            <span>Sign in with Google</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center text-white">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-500 text-sm">Welcome back, Shumail Irfan</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center space-x-2"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Project Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 sticky top-28"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <Plus size={20} className="text-violet-600" />
                <span>Add New Project</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Project Title</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                      placeholder="e.g. Modern Brand Identity"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all appearance-none"
                    >
                      <option value="Logo">Logo Design</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Business Card">Business Card</option>
                      <option value="Branding">Branding</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      required
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
                    placeholder="Tell the story behind this design..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-all shadow-lg hover:shadow-violet-200 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                  <span>{isSubmitting ? 'Adding...' : 'Add Project'}</span>
                </button>

                {status === 'success' && (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg text-sm font-medium">
                    <CheckCircle2 size={16} />
                    <span>Project added successfully!</span>
                  </div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Projects List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group"
                >
                  <div className="aspect-video relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest bg-violet-50 px-2 py-1 rounded">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">{project.title}</h3>
                    <p className="text-slate-500 text-sm mt-2 line-clamp-2">{project.description}</p>
                  </div>
                </motion.div>
              ))}

              {projects.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <ImageIcon size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No projects yet</h3>
                  <p className="text-slate-500">Start by adding your first masterpiece.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
