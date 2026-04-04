import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Code, Briefcase, Heart, User } from 'lucide-react';

const education = [
  {
    title: 'Graphic Designing',
    institution: 'Promotezz International',
    period: '2026',
    description: 'Completed a 3-month intensive course covering logo design, social media design, and creative concepts.',
    icon: PaletteIcon,
  },
  {
    title: 'Hafiz-e-Quran',
    institution: 'Quranic Studies',
    period: '2012 - 2018',
    description: 'Completed Quranic studies, developing discipline, focus, and dedication.',
    icon: BookOpen,
  },
  {
    title: 'Matriculation',
    institution: 'Alyahan Grammar High School',
    period: '2025',
    description: 'Strong interest in Computer and Mathematics, supporting technical skills in design.',
    icon: GraduationCap,
  },
  {
    title: 'Office Management',
    institution: 'Vital College',
    period: '2025',
    description: 'Gained knowledge of office work, management, and basic computer skills.',
    icon: Briefcase,
  },
];

const skills = [
  { name: 'Adobe Photoshop', level: 90 },
  { name: 'Adobe Illustrator', level: 85 },
  { name: 'Logo Design', level: 95 },
  { name: 'Social Media Content', level: 92 },
  { name: 'Office Management', level: 88 },
  { name: 'Visual Storytelling', level: 85 },
];

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
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 text-violet-600 font-bold uppercase tracking-widest text-sm">
              <User size={18} />
              <span>About Me</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              A Journey of Discipline, <span className="text-violet-600">Faith</span>, and Creativity
            </h1>
            <div className="prose prose-lg text-slate-600 max-w-none space-y-6">
              <p>
                Hello! I’m Hafiz Muhammad Shumail, a passionate graphic designer with a strong interest in visual storytelling. I specialize in creating creative and impactful designs, including logos, business cards, and social media content.
              </p>
              <p>
                I am a hardworking and struggling person. I faced health problems and difficulties since childhood, but I never gave up. I am a Hafiz of Quran and along with education I am also looking for skills, such as graphic designing and office management.
              </p>
              <p>
                I am a simple, helpful and family oriented person who wants to make a name for himself through his hard work. My journey as a Hafiz-e-Quran (2012-2018) helped me develop discipline, focus, and dedication in my life.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img
                src="https://picsum.photos/seed/shumail/800/1000"
                alt="About Shumail"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl z-20 max-w-xs border border-slate-100">
              <div className="flex items-center space-x-4 mb-4 text-violet-600">
                <Heart className="fill-current" />
                <span className="font-bold text-slate-900">My Values</span>
              </div>
              <p className="text-sm text-slate-600 italic">
                "I believe in hard work, honesty, and helping others. My goal is to make a positive impact through my creative skills."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Education Timeline */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Education & Certifications</h2>
            <div className="w-20 h-1.5 bg-violet-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-6"
              >
                <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 shrink-0">
                  <item.icon size={28} />
                </div>
                <div>
                  <span className="text-xs font-bold text-violet-600 uppercase tracking-wider bg-violet-50 px-2 py-1 rounded">
                    {item.period}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3">{item.title}</h3>
                  <p className="text-sm font-semibold text-slate-500 mb-3">{item.institution}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full -mr-48 -mt-48 blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Technical Expertise</h2>
              <p className="text-slate-400 mb-12 text-lg leading-relaxed">
                Over the years, I've honed my skills in various design tools and management techniques to deliver professional results.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center text-violet-400">
                    <Code size={20} />
                  </div>
                  <span className="font-medium">Office Management</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400">
                    <Layout size={20} />
                  </div>
                  <span className="font-medium">UI/UX Concepts</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{skill.name}</span>
                    <span className="text-violet-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-violet-500"
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
