import { useState } from 'react';
import { motion } from 'motion/react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogIn, ArrowRight, ShieldCheck, Mail, Lock, UserPlus } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black flex items-center justify-center p-4 bg-dark-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-slate-800 text-center"
      >
        <div className="w-20 h-20 bg-violet-500/10 text-violet-400 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-violet-500/20">
          <ShieldCheck size={40} />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          {isSignUp 
            ? 'Join our community of creative designers today.' 
            : 'Sign in to access your dashboard and manage your projects.'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 py-2 rounded-lg border border-red-400/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-violet-600 text-white rounded-2xl font-bold text-lg hover:bg-violet-500 transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center space-x-3 group disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isSignUp ? <UserPlus size={24} /> : <LogIn size={24} />}
                <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
                <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-slate-400 hover:text-violet-400 transition-colors text-sm font-medium"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
