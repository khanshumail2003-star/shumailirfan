import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Code, Briefcase, Heart, User, Palette, Star, ShieldCheck, Zap } from 'lucide-react';

const education = [
  {
    title: 'Professional Graphic Designing',
    institution: 'Promotezz International',
    period: '2026',
    description: 'Mastered advanced design principles, including logo creation, brand identity, and high-impact social media marketing visuals.',
    icon: PaletteIcon,
  },
  {
    title: 'Hafiz-e-Quran',
    institution: 'Quranic Studies',
    period: '2012 - 2018',
    description: 'Successfully completed the memorization of the Holy Quran, instilling deep values of discipline, focus, and spiritual integrity.',
    icon: BookOpen,
  },
  {
    title: 'Matriculation (Science)',
    institution: 'Alyahan Grammar High School',
    period: '2025',
    description: 'Focused on Computer Science and Mathematics, providing a strong analytical foundation for technical design work.',
    icon: GraduationCap,
  },
  {
    title: 'Office Management Certification',
    institution: 'Vital College',
    period: '2025',
    description: 'Expertise in professional office workflows, digital management, and advanced computer operations.',
    icon: Briefcase,
  },
];

const skills = [
  { name: 'Logo & Brand Identity', level: 95 },
  { name: 'Social Media Marketing Design', level: 92 },
  { name: 'Adobe Creative Suite', level: 90 },
  { name: 'Visual Storytelling', level: 88 },
  { name: 'Office Management', level: 90 },
  { name: 'UI/UX Design Concepts', level: 85 },
];

const profileImageUrl = "https://vui.unsplash.com/resize?height=256&quality=60&type=auto&url=https%3A%2F%2Fsearched-images.s3.us-west-2.amazonaws.com%2Fc28ff94d-4680-4062-8a52-983e649ecc5a%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIAQ4GRIA4QTG2PSHUB%252F20260404%252Fus-west-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20260404T195739Z%26X-Amz-Expires%3D86400%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3D3229c7b1bf4e80bed0a17dbe98a9520285736f931b7d9e67b209149db1d5f31c&sign=EdZuP-8f-ldGiyAPDMnEMHQZ5zOi9Rztl8vvYWx9nkQ";

function PaletteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.707-.484 2.103-1.206.35-.64.302-1.425-.12-2.027A2.39 2.39 0 0 1 14 17a2 2 0 1 1 4 0 2.39 2.39 0 0 1-.017.265 2.5 2.5 0 1 0 4.017-2.021C21.89 14.045 22 13.06 22 12c0-5.5-4.5-10-10-10z" />
    </svg>
  );
}

export default function About() {
  return (
    <div className="pt-32 pb-20 bg-black text-white bg-dark-gradient min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 text-violet-400 font-bold uppercase tracking-widest text-sm bg-violet-500/10 px-4 py-2 rounded-full border border-violet-500/20">
              <User size={18} />
              <span>The Designer's Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
              Discipline, <span className="text-gradient">Faith</span>, and Creative Mastery
            </h1>
            <div className="prose prose-invert prose-lg text-slate-400 max-w-none space-y-6">
              <p>
                I am Hafiz Muhammad Shumail, a professional graphic designer dedicated to the art of visual storytelling. My expertise lies in crafting high-impact logos, strategic brand identities, and engaging social media content that drives real-world results.
              </p>
              <p>
                My journey is defined by resilience. Despite facing health challenges since childhood, I have embraced a path of continuous growth and excellence. As a Hafiz-e-Quran, I carry the values of integrity, patience, and unwavering focus into every design project I undertake.
              </p>
              <p>
                I am a hardworking professional who believes in the power of visual communication to transform businesses. My goal is to help you make a legendary name for yourself through creative excellence and technical precision.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="text-violet-500" size={24} />
                <span className="font-bold text-sm text-slate-300">Trusted Professional</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="text-amber-500" size={24} />
                <span className="font-bold text-sm text-slate-300">Fast Turnaround</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="text-violet-500" size={24} />
                <span className="font-bold text-sm text-slate-300">Premium Quality</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-600 to-amber-600 rounded-[4rem] blur-2xl opacity-20" />
            <div className="aspect-[4/5] bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border border-slate-800">
              <img
                src={profileImageUrl}
                alt="Hafiz Muhammad Shumail"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-slate-900/90 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl z-20 max-w-xs border border-slate-800">
              <div className="flex items-center space-x-4 mb-4 text-violet-400">
                <Heart className="fill-current" />
                <span className="font-bold text-white">Core Values</span>
              </div>
              <p className="text-slate-400 italic leading-relaxed">
                "I believe in the fusion of hard work, spiritual honesty, and creative innovation to deliver designs that resonate."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Education Timeline */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Academic & Professional Journey</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-violet-600 to-amber-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {education.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/40 backdrop-blur-sm p-10 rounded-[3rem] border border-slate-800 hover:border-violet-500/30 transition-all flex items-start space-x-8 group"
              >
                <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-400 shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-all duration-500">
                  <item.icon size={32} />
                </div>
                <div>
                  <span className="text-xs font-black text-violet-400 uppercase tracking-[0.2em] bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20">
                    {item.period}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-4">{item.title}</h3>
                  <p className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">{item.institution}</p>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-slate-900/50 backdrop-blur-xl rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative border border-slate-800 shadow-3xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full -mr-48 -mt-48 blur-[120px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="text-5xl font-black mb-8 leading-tight">Technical <span className="text-gradient">Mastery</span> & Expertise</h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                I leverage industry-leading tools and strategic methodologies to ensure every design is not only beautiful but also functional and goal-oriented.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4 p-6 bg-slate-800/50 rounded-3xl border border-slate-700 hover:border-violet-500/30 transition-colors">
                  <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center text-violet-400">
                    <Code size={24} />
                  </div>
                  <span className="font-bold text-lg">Digital Strategy</span>
                </div>
                <div className="flex items-center space-x-4 p-6 bg-slate-800/50 rounded-3xl border border-slate-700 hover:border-amber-500/30 transition-colors">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
                    <Palette size={24} />
                  </div>
                  <span className="font-bold text-lg">Brand Identity</span>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-slate-200">{skill.name}</span>
                    <span className="text-violet-400">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-violet-600 to-amber-600 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Layout(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}
