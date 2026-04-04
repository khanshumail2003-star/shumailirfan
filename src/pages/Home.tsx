import { motion } from 'motion/react';
import { ArrowRight, Palette, Layout, Briefcase, Award, CheckCircle2, Sparkles, ShieldCheck, Zap, Globe, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import AutoSlider from '../components/AutoSlider';

const services = [
  {
    title: 'Premium Logo Design',
    description: 'Crafting unique and memorable visual identities that capture your brand essence and leave a lasting impression.',
    icon: Palette,
  },
  {
    title: 'Social Media Mastery',
    description: 'High-impact content for TikTok, Instagram, and Facebook designed to boost engagement and drive social growth.',
    icon: Layout,
  },
  {
    title: 'Corporate Branding',
    description: 'Professional and impactful business cards, letterheads, and brand guidelines that define your corporate excellence.',
    icon: Briefcase,
  },
  {
    title: 'Visual Storytelling',
    description: 'Turning complex ideas into simple, eye-catching visual narratives that resonate with your target audience.',
    icon: Award,
  },
];

const stats = [
  { label: 'Projects Completed', value: '50+' },
  { label: 'Global Clients', value: '30+' },
  { label: 'Years Experience', value: '2+' },
  { label: 'Quranic Studies', value: '6 Years' },
];

const profileImageUrl = "https://vui.unsplash.com/resize?height=256&quality=60&type=auto&url=https%3A%2F%2Fsearched-images.s3.us-west-2.amazonaws.com%2Fc28ff94d-4680-4062-8a52-983e649ecc5a%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIAQ4GRIA4QTG2PSHUB%252F20260404%252Fus-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20260404T195739Z%26X-Amz-Expires%3D86400%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3D3229c7b1bf4e80bed0a17dbe98a9520285736f931b7d9e67b209149db1d5f31c&sign=EdZuP-8f-ldGiyAPDMnEMHQZ5zOi9Rztl8vvYWx9nkQ";

export default function Home() {
  return (
    <div className="pt-16 bg-black text-white">
      {/* Banner / Announcement */}
      <div className="bg-gradient-to-r from-violet-600 to-amber-600 text-white py-2 overflow-hidden whitespace-nowrap relative z-50 shadow-lg">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <span className="mx-4 font-bold uppercase tracking-widest text-xs">
            ✨ Shumail Irfan - Professional Graphic Designer ✨ Premium Logo Design ✨ Social Media Content ✨ Visual Storytelling ✨ Open for New Projects ✨
          </span>
          <span className="mx-4 font-bold uppercase tracking-widest text-xs">
            ✨ Shumail Irfan - Professional Graphic Designer ✨ Premium Logo Design ✨ Social Media Content ✨ Visual Storytelling ✨ Open for New Projects ✨
          </span>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-dark-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-violet-500/10 text-violet-400 px-4 py-2 rounded-full text-sm font-bold border border-violet-500/20">
                <Zap size={16} className="animate-pulse" />
                <span>Top-Rated Graphic Designer</span>
              </div>
              <h1 className="text-6xl sm:text-8xl font-black text-white leading-[1.1] tracking-tight">
                Elevate Your <span className="text-gradient">Brand</span> With Visual Mastery
              </h1>
              <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                I am Hafiz Muhammad Shumail, a professional graphic designer specializing in high-end visual identities and strategic brand storytelling.
              </p>
              
              <div className="flex items-center space-x-4 py-4">
                <img 
                  src={profileImageUrl} 
                  alt="Shumail Irfan" 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-500/30 shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-white">Shumail Irfan</h4>
                  <p className="text-slate-500 text-sm">Creative Director & Designer</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-bold text-lg hover:bg-violet-500 transition-all shadow-xl shadow-violet-600/20 flex items-center group"
                >
                  Explore Portfolio
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-slate-900 text-white border border-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all"
                >
                  Contact Me
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-amber-600/20 blur-3xl rounded-[3rem] opacity-50" />
              <AutoSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-slate-950 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center space-x-2">
              <ShieldCheck size={24} className="text-violet-500" />
              <span className="font-bold tracking-tighter text-xl">TRUSTED DESIGN</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe size={24} className="text-amber-500" />
              <span className="font-bold tracking-tighter text-xl">GLOBAL REACH</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={24} className="text-violet-500" />
              <span className="font-bold tracking-tighter text-xl">PREMIUM QUALITY</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap size={24} className="text-amber-500" />
              <span className="font-bold tracking-tighter text-xl">FAST DELIVERY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-10 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 backdrop-blur-sm hover:border-violet-500/30 transition-colors group"
              >
                <div className="text-5xl font-black text-violet-400 mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-5xl font-black text-white mb-6">Expert Design Services</h2>
            <p className="text-xl text-slate-400">
              I provide high-end graphic design solutions tailored to elevate your brand's visual presence in a competitive market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 p-10 rounded-[2.5rem] shadow-xl hover:shadow-violet-600/5 transition-all border border-slate-800 group hover:border-violet-500/30"
              >
                <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400 mb-8 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-600 to-amber-600 rounded-[3rem] blur-2xl opacity-20" />
              <img 
                src={profileImageUrl} 
                alt="Shumail Irfan" 
                className="relative w-full rounded-[3rem] shadow-2xl border border-slate-800 grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl font-black text-white">The Designer Behind The Craft</h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                As a Hafiz-e-Quran and a dedicated designer, I blend spiritual discipline with technical precision. My work is built on the pillars of integrity, excellence, and creative innovation.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Strategic Vision', desc: 'I don’t just design; I build visual strategies that align with your business goals.' },
                  { title: 'Uncompromising Quality', desc: 'Every project undergoes a rigorous quality check to ensure it meets global standards.' },
                  { title: 'Reliable Partnership', desc: 'I act as an extension of your team, committed to your long-term success.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4 group">
                    <div className="w-8 h-8 bg-violet-500/10 rounded-full flex items-center justify-center text-violet-400 shrink-0 mt-1 group-hover:bg-violet-500 group-hover:text-white transition-all">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center text-violet-400 font-bold hover:text-violet-300 transition-colors group"
              >
                Learn More About Me
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-violet-900/40 to-slate-900/40 backdrop-blur-xl rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden border border-slate-800 shadow-3xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full -mr-48 -mt-48 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full -ml-48 -mb-48 blur-[100px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Ready to <span className="text-gradient">Transform</span> Your Brand?
              </h2>
              <p className="text-2xl text-slate-400">
                Let's collaborate on your next big project and create something truly legendary.
              </p>
              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-12 py-6 bg-violet-600 text-white rounded-[2rem] font-black text-2xl hover:bg-violet-500 transition-all shadow-2xl shadow-violet-600/30"
                >
                  Start Your Project
                  <ArrowRight size={28} className="ml-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
