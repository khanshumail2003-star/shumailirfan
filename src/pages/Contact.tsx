import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, MessageSquare } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  console.log('Contact component rendering');
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    console.log('Contact page location state:', location.state);
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        subject: location.state.subject || prev.subject,
        message: location.state.message || prev.message,
      }));
    }
  }, [location.state]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black text-white bg-dark-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 text-violet-400 font-bold uppercase tracking-widest text-sm bg-violet-500/10 px-4 py-2 rounded-full border border-violet-500/20 mb-8"
          >
            <MessageSquare size={18} />
            <span>Let's Collaborate</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
          >
            Start a <span className="text-gradient">Legendary</span> <span className="text-violet-400">Project</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Ready to elevate your brand? Whether you need a strategic logo, a complete visual identity, or high-impact social media content, I'm here to bring your vision to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-800 flex items-start space-x-8 group hover:border-violet-500/30 transition-all"
            >
              <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400 shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                <Mail size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">Email Me</h3>
                <p className="text-slate-300 text-sm break-all font-medium">hafizmuhammadshumailirfan@gmail.com</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-800 flex items-start space-x-8 group hover:border-green-500/30 transition-all"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                <Phone size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">WhatsApp</h3>
                <p className="text-slate-300 text-sm font-medium">+92 315 5431571</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-800 flex items-start space-x-8 group hover:border-amber-500/30 transition-all"
            >
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Location</h3>
                <p className="text-slate-300 text-sm font-medium">Rahim Yar Khan, Pakistan</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl p-10 md:p-16 rounded-[4rem] border border-slate-800 shadow-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm font-black text-slate-300 uppercase tracking-widest ml-1">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-8 py-5 bg-slate-800/50 border border-slate-700 rounded-3xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-600 font-medium"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-black text-slate-300 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-8 py-5 bg-slate-800/50 border border-slate-700 rounded-3xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-600 font-medium"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="subject" className="text-sm font-black text-slate-300 uppercase tracking-widest ml-1">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-8 py-5 bg-slate-800/50 border border-slate-700 rounded-3xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-600 font-medium"
                  placeholder="How can I help you?"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="text-sm font-black text-slate-300 uppercase tracking-widest ml-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-8 py-5 bg-slate-800/50 border border-slate-700 rounded-3xl focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all resize-none text-white placeholder-slate-600 font-medium"
                  placeholder="Tell me about your project goals..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-6 bg-gradient-to-r from-violet-600 to-amber-600 text-white rounded-3xl font-black text-xl hover:scale-[1.02] transition-all shadow-2xl shadow-violet-600/20 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={28} />
                    <span className="uppercase tracking-widest">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={28} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span className="uppercase tracking-widest">Send Message</span>
                  </>
                )}
              </button>


              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 text-green-400 bg-green-500/10 p-6 rounded-3xl border border-green-500/20"
                >
                  <CheckCircle2 size={24} />
                  <span className="font-bold">Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-3 text-red-400 bg-red-500/10 p-6 rounded-3xl border border-red-500/20"
                >
                  <AlertCircle size={24} />
                  <span className="font-bold">{errorMessage}</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
