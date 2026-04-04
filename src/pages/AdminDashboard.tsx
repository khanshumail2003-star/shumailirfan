import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Project } from '../types';
import { Plus, Trash2, LogOut, LogIn, LayoutDashboard, Image as ImageIcon, Type, Tag, Loader2, CheckCircle2, AlertCircle, Upload, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAILS = ['khanshumail2003@gmail.com', 'hafizmuhammadshumailirfan@gmail.com'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
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
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("Image size must be less than 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData(prev => ({ ...prev, imageUrl: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) return;
    if (!formData.imageUrl) {
      alert("Please upload an image");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'projects'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setFormData({ title: '', description: '', imageUrl: '', category: 'Logo' });
      setImagePreview(null);
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-violet-500" size={48} />
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-black flex items-center justify-center p-4 bg-dark-gradient">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl text-center border border-slate-800"
        >
          <div className="w-20 h-20 bg-violet-500/10 text-violet-400 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-violet-500/20">
            <LayoutDashboard size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Admin Access</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            This area is restricted to Shumail Irfan. Please sign in with your authorized email to manage your portfolio.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full py-4 bg-violet-600 text-white rounded-2xl font-bold text-lg hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center space-x-3"
          >
            <LogIn size={24} />
            <span>Go to Login</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black bg-dark-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-600/20">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-slate-400 text-sm">Welcome back, Shumail Irfan</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-slate-900 text-slate-300 border border-slate-800 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center space-x-2"
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
              className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-slate-800 sticky top-28"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Plus size={20} className="text-violet-400" />
                <span>Add New Project</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Project Title</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all"
                      placeholder="e.g. Modern Brand Identity"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all appearance-none"
                    >
                      <option value="Logo">Logo Design</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Business Card">Business Card</option>
                      <option value="Branding">Branding</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Project Image</label>
                  <div className="space-y-4">
                    {!imagePreview ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-slate-500 mb-2" />
                          <p className="text-sm text-slate-500">Click to upload image</p>
                          <p className="text-xs text-slate-600 mt-1">Max size: 1MB</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    ) : (
                      <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-700">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, imageUrl: '' }));
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all resize-none"
                    placeholder="Tell the story behind this design..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                  <span>{isSubmitting ? 'Adding...' : 'Add Project'}</span>
                </button>

                {status === 'success' && (
                  <div className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-3 rounded-lg text-sm font-medium border border-green-400/20">
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
                  className="bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-800 group"
                >
                  <div className="aspect-video relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-xl transform translate-y-4 group-hover:translate-y-0"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 px-2 py-1 rounded border border-violet-500/20">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm mt-2 line-clamp-2">{project.description}</p>
                  </div>
                </motion.div>
              ))}

              {projects.length === 0 && (
                <div className="col-span-full py-20 text-center bg-slate-900/30 rounded-[2rem] border-2 border-dashed border-slate-800">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                    <ImageIcon size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-white">No projects yet</h3>
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
