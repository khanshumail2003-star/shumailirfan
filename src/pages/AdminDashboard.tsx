import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, onSnapshot, deleteDoc, doc, query, orderBy, getDocsFromServer, limit, updateDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Project } from '../types';
import { Plus, Trash2, LogOut, LogIn, LayoutDashboard, Image as ImageIcon, Type, Tag, Loader2, CheckCircle2, AlertCircle, Upload, X, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAILS = ['khanshumail2003@gmail.com', 'hafizmuhammadshumailirfan@gmail.com'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Logo',
  });

  useEffect(() => {
    let unsubscribeProjects: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser && ADMIN_EMAILS.map(e => e.toLowerCase()).includes(currentUser.email?.toLowerCase() || '')) {
        // Set up real-time listener for projects
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        unsubscribeProjects = onSnapshot(q, (snapshot) => {
          const projectsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Project[];
          setProjects(projectsData);
        }, (error) => {
          handleFirestoreError(error, 'list', 'projects');
        });
      } else {
        if (unsubscribeProjects) {
          unsubscribeProjects();
          unsubscribeProjects = null;
        }
        setProjects([]);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProjects) unsubscribeProjects();
    };
  }, []);

  const handleLogout = () => signOut(auth);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimension 800px for significantly faster upload
          const MAX_DIM = 800;
          if (width > height) {
            if (width > MAX_DIM) {
              height *= MAX_DIM / width;
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width *= MAX_DIM / height;
              height = MAX_DIM;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.5 quality for maximum speed
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5);
          setImagePreview(compressedBase64);
          setFormData(prev => ({ ...prev, imageUrl: compressedBase64 }));
          console.log("Image processed and compressed", { 
            originalSize: file.size, 
            compressedSize: Math.round(compressedBase64.length * 0.75) 
          });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFirestoreError = (error: any, operationType: string, path: string | null) => {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
        isAnonymous: auth.currentUser?.isAnonymous,
        tenantId: auth.currentUser?.tenantId,
        providerInfo: auth.currentUser?.providerData.map(provider => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL
        })) || []
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    return errInfo;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit clicked", { 
      user: user?.email, 
      formData: { 
        ...formData, 
        imageUrl: formData.imageUrl ? `present (${Math.round(formData.imageUrl.length * 0.75 / 1024)} KB)` : 'missing' 
      } 
    });
    
    if (!user || !ADMIN_EMAILS.map(e => e.toLowerCase()).includes(user.email?.toLowerCase() || '')) {
      alert("Unauthorized access. Please sign in with an admin account.");
      return;
    }
    
    if (!formData.imageUrl) {
      alert("Please upload an image first");
      return;
    }

    if (formData.imageUrl.length > 1000000) {
      alert("The image is still too large for the database. Please try a smaller image or a different format.");
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    
    // Optimistically clear the form to make it feel instant
    const currentFormData = { ...formData };
    const currentEditingId = editingId;
    
    setFormData({ title: '', description: '', imageUrl: '', category: 'Logo' });
    setImagePreview(null);
    setEditingId(null);
    
    try {
      if (currentEditingId) {
        await updateDoc(doc(db, 'projects', currentEditingId), {
          ...currentFormData,
        });
        console.log("Document updated successfully:", currentEditingId);
      } else {
        await addDoc(collection(db, 'projects'), {
          ...currentFormData,
          createdAt: serverTimestamp(),
        });
      }
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error: any) {
      // If it fails, restore the form data so the user doesn't lose their work
      setFormData(currentFormData);
      setImagePreview(currentFormData.imageUrl);
      setEditingId(currentEditingId);
      
      const errInfo = handleFirestoreError(error, currentEditingId ? 'update' : 'create', 'projects');
      setStatus('error');
      
      let errorMessage = error.message || 'Unknown error';
      if (errorMessage.includes('permission-denied')) {
        errorMessage = "Permission denied. This usually means the security rules are blocking the write. Ensure you are signed in with the correct admin email and it is verified.";
      } else if (errorMessage.includes('quota-exceeded')) {
        errorMessage = "Database quota exceeded. Please try again later.";
      }
      
      alert(`Failed to add project: ${errorMessage}\n\nDebug Info: ${JSON.stringify(errInfo.authInfo)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      category: project.category,
    });
    setImagePreview(project.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      // No need to call fetchProjects() due to onSnapshot
    } catch (error: any) {
      handleFirestoreError(error, 'delete', `projects/${id}`);
      console.error("Error deleting project:", error);
    }
  };

  const testConnection = async () => {
    try {
      console.log("Testing Firestore connection...");
      console.log("Current Config:", {
        projectId: firebaseConfig.projectId,
        databaseId: firebaseConfig.firestoreDatabaseId,
        authDomain: firebaseConfig.authDomain
      });
      
      const testRef = collection(db, 'projects');
      // Use getDocsFromServer to bypass cache and check real connectivity
      const snapshot = await getDocsFromServer(query(testRef, limit(1)));
      
      console.log("Connection test successful. Snapshot empty?", snapshot.empty);
      alert(`Connection successful! Database is reachable. Found ${snapshot.size} projects in initial check.`);
    } catch (error: any) {
      const errInfo = handleFirestoreError(error, 'get', 'projects');
      console.error("Connection test failed:", error);
      
      let extraMsg = "";
      if (error.message?.includes('offline')) {
        extraMsg = "\n\nDevice appears to be offline or Firebase is blocked.";
      } else if (error.message?.includes('permission-denied')) {
        extraMsg = "\n\nPermission denied. This might be a rules issue or the database ID is incorrect.";
      }
      
      alert(`Connection failed: ${error.message}${extraMsg}\n\nAuth: ${errInfo.authInfo.email || 'Not logged in'}\nDB ID: ${firebaseConfig.firestoreDatabaseId}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-violet-500" size={48} />
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.map(e => e.toLowerCase()).includes(user.email?.toLowerCase() || '')) {
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
              <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
              <p className="text-slate-300 text-sm font-medium">Welcome back, <span className="text-violet-400">Shumail Irfan</span></p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-[10px] font-mono text-slate-500">
              <p>User: {user?.email || 'N/A'}</p>
              <p>UID: {user?.uid?.slice(0, 8)}...</p>
              <p>DB: {firebaseConfig.firestoreDatabaseId?.slice(0, 8)}...</p>
            </div>
            <button
              onClick={testConnection}
              className="px-6 py-3 bg-slate-900 text-violet-400 border border-slate-800 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center space-x-2"
            >
              <ShieldCheck size={20} />
              <span>Test Connection</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-slate-900 text-slate-300 border border-slate-800 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center space-x-2"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Project Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-slate-800 sticky top-28"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2 tracking-tight">
                {editingId ? <ShieldCheck size={20} className="text-violet-400" /> : <Plus size={20} className="text-violet-400" />}
                <span>{editingId ? 'Edit' : 'Add New'} <span className="text-violet-400">Project</span></span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Project Title</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      required
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all placeholder:text-slate-600 font-medium"
                      placeholder="e.g. Modern Brand Identity"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all appearance-none font-medium"
                    >
                      <option value="Logo">Logo Design</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Business Card">Business Card</option>
                      <option value="Branding">Branding</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Project Image</label>
                  <div className="space-y-4">
                    {!imagePreview ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group/upload">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-slate-500 mb-2 group-hover/upload:text-violet-400 transition-colors" />
                          <p className="text-sm text-slate-400 font-medium">Click to upload image</p>
                          <p className="text-xs text-slate-600 mt-1 italic">Note: Large images may fail due to database limits</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                    ) : (
                      <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-700 group/preview">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setFormData(prev => ({ ...prev, imageUrl: '' }));
                            }}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-violet-500/50 outline-none transition-all resize-none placeholder:text-slate-600 font-medium"
                    placeholder="Tell the story behind this design..."
                  />
                </div>

                <div className="flex gap-3">
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ title: '', description: '', imageUrl: '', category: 'Logo' });
                        setImagePreview(null);
                      }}
                      className="flex-1 py-4 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700 transition-all border border-slate-700"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "flex-[2] py-4 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center space-x-2 disabled:opacity-70",
                      editingId && "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20"
                    )}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (editingId ? <CheckCircle2 size={20} /> : <Plus size={20} />)}
                    <span>{isSubmitting ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Project' : 'Add Project')}</span>
                  </button>
                </div>

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
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-3 bg-violet-600 text-white rounded-xl hover:bg-violet-500 transition-all shadow-xl transform translate-y-4 group-hover:translate-y-0"
                      >
                        <ShieldCheck size={20} />
                      </button>
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
                    <h3 className="text-lg font-bold text-white mt-2 group-hover:text-violet-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-300 text-sm mt-2 line-clamp-2 font-medium">{project.description}</p>
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
