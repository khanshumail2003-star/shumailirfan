import { motion } from 'motion/react';
import { ArrowRight, Palette, Layout, Briefcase, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import AutoSlider from '../components/AutoSlider';

const services = [
  {
    title: 'Logo Design',
    description: 'Unique and memorable visual identities that capture your brand essence.',
    icon: Palette,
  },
  {
    title: 'Social Media Design',
    description: 'Engaging content for TikTok, Instagram, and Facebook to boost your presence.',
    icon: Layout,
  },
  {
    title: 'Business Cards',
    description: 'Professional and impactful business cards that leave a lasting impression.',
    icon: Briefcase,
  },
  {
    title: 'Visual Storytelling',
    description: 'Turning complex ideas into simple, eye-catching visual narratives.',
    icon: Award,
  },
];

const stats = [
  { label: 'Projects Completed', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'Years Experience', value: '2+' },
  { label: 'Quranic Studies', value: '6 Years' },
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Banner / Announcement */}
      <div className="bg-violet-600 text-white py-2 overflow-hidden whitespace-nowrap relative z-50">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <span className="mx-4 font-medium uppercase tracking-widest text-xs">
            ✨ Shumail Irfan - Professional Graphic Designer ✨ Logo Design ✨ Social Media Content ✨ Visual Storytelling ✨ Open for New Projects ✨
          </span>
          <span className="mx-4 font-medium uppercase tracking-widest text-xs">
            ✨ Shumail Irfan - Professional Graphic Designer ✨ Logo Design ✨ Social Media Content ✨ Visual Storytelling ✨ Open for New Projects ✨
          </span>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-amber-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-0 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold">
                <CheckCircle2 size={16} />
                <span>Available for New Projects</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 leading-tight">
                Crafting Visual <span className="text-violet-600">Excellence</span> Through Design
              </h1>
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                Hello! I’m Hafiz Muhammad Shumail, a passionate graphic designer dedicated to turning your ideas into impactful visual stories.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-bold text-lg hover:bg-violet-700 transition-all shadow-lg hover:shadow-violet-200 flex items-center group"
                >
                  View My Work
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-violet-600 transition-all"
                >
                  Let's Talk
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <AutoSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Banner Section */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center text-white">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Shumail Irfan</h3>
                <p className="text-slate-400 text-sm">Professional Graphic Design Services</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {['Logo Design', 'Branding', 'Social Media', 'UI/UX'].map((tag) => (
                <span key={tag} className="px-4 py-1.5 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-3xl bg-slate-50 border border-slate-100"
              >
                <div className="text-4xl font-bold text-violet-600 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-violet-100/50 rounded-full blur-3xl -ml-32" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-slate-900">Why Work With Me?</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                As a Hafiz-e-Quran, I bring a unique level of discipline, focus, and integrity to every project. My background in computer science and mathematics allows me to blend technical precision with creative flair.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Attention to Detail', desc: 'Every pixel matters. I ensure your designs are flawless and professional.' },
                  { title: 'Timely Delivery', desc: 'I respect your time and always aim to deliver high-quality work on schedule.' },
                  { title: 'Client-Centric Approach', desc: 'Your vision is my priority. I work closely with you to achieve your goals.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center text-white shrink-0 mt-1">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-violet-600 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10 space-y-6">
                <div className="text-5xl font-bold">100%</div>
                <div className="text-xl font-medium opacity-90">Client Satisfaction Guarantee</div>
                <p className="text-violet-100 leading-relaxed">
                  "My mission is to help individuals and businesses make a name for themselves through impactful visual storytelling."
                </p>
                <div className="pt-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        className="w-12 h-12 rounded-full border-4 border-violet-600"
                        alt="Client"
                      />
                    ))}
                    <div className="w-12 h-12 rounded-full bg-violet-500 border-4 border-violet-600 flex items-center justify-center text-xs font-bold">
                      +20
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-violet-200">Trusted by 30+ clients worldwide</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">My Creative Process</h2>
            <p className="text-lg text-slate-600">
              A structured approach to ensure every design project is a success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Discovery', desc: 'We discuss your goals, audience, and vision to build a solid foundation.' },
              { step: '02', title: 'Design', desc: 'I create initial concepts and refine them based on your feedback.' },
              { step: '03', title: 'Delivery', desc: 'Final designs are polished and delivered in all required formats.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="text-6xl font-black text-slate-100 absolute top-4 right-8 group-hover:text-violet-50 transition-colors">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">What I Offer</h2>
            <p className="text-lg text-slate-600">
              I provide a wide range of graphic design services tailored to meet your specific needs and help your brand stand out.
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
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
              >
                <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-violet-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-violet-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/50 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/50 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Ready to bring your vision to life?
              </h2>
              <p className="text-xl text-violet-100">
                Let's collaborate and create something extraordinary together.
              </p>
              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-10 py-5 bg-white text-violet-600 rounded-2xl font-bold text-xl hover:bg-violet-50 transition-all shadow-xl"
                >
                  Start a Project
                  <ArrowRight size={24} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
