import { Mail, Phone, MapPin, MessageCircle, ShieldCheck, Star, Globe, Zap, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-slate-400 pt-24 pb-12 border-t border-slate-900 relative overflow-hidden">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-600/5 rounded-full blur-[100px] -mt-32" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-600/5 rounded-full blur-[100px] -mb-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-amber-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-violet-600/20">
                S
              </div>
              <span className="font-black text-white text-2xl tracking-tighter">Shumail Khan</span>
            </div>
            <p className="text-lg leading-relaxed">
              Crafting legendary visual identities and strategic brand stories for global clients. Excellence in every pixel.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">5.0 Client Rating</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="hover:text-violet-400 transition-colors flex items-center group"
                  >
                    <span>{item}</span>
                    <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <Mail size={20} className="text-violet-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="text-sm break-all">hafizmuhammadshumailirfan@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone size={20} className="text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+92 315 5431571</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <MapPin size={20} className="text-violet-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Rahim Yar Khan, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Connect & Trust */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.tiktok.com/@shumailkhanfx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center hover:bg-violet-600 hover:border-violet-500 text-white transition-all group"
                >
                  <span className="sr-only">TikTok</span>
                  <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/923155431571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center hover:bg-green-600 hover:border-green-500 text-white transition-all group"
                >
                  <span className="sr-only">WhatsApp</span>
                  <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-2xl flex items-center space-x-3">
              <ShieldCheck size={24} className="text-violet-500" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-tighter">Secure & Trusted</p>
                <p className="text-[10px] text-slate-500 uppercase font-black">Verified Professional</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-[0.2em]">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-slate-500">&copy; {new Date().getFullYear()} Shumail Khan. All rights reserved.</p>
            <a 
              href="https://hananirfanportfolio.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-violet-400 transition-colors flex items-center"
            >
              Partner Portfolio <ArrowUpRight size={12} className="ml-1" />
            </a>
          </div>
          <div className="flex space-x-8 text-slate-600">
            <a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
