import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Sparkles, Shield, Zap, Download, Users, BarChart3, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useResumeStore } from '../store/resumeStore';

// Import assets
import logo from '../assets/logo.png';
import template1 from '../assets/template1.png';
import template2 from '../assets/template2.png';
import template3 from '../assets/template3.png';
import template4 from '../assets/template4.png';
import template5 from '../assets/template5.png';
import template6 from '../assets/template6.png';
import template7 from '../assets/template7.png';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const LandingPage = () => {
  const { setActiveTemplate } = useResumeStore();

  // Removed handleStartBuilding as we handle via Link to /builder/choose
  // Removed handleSelectTemplate as we handle via Link in templates section

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100/60">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="RamroCV" 
              className="w-8 h-8 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">
              Ramro<span className="text-sky-500">CV</span>
            </span>
          </Link>
          <Link
            to="/builder/choose"
            className="px-5 py-2 border-2 border-sky-500 text-sky-600 rounded-full text-sm font-bold hover:bg-sky-500 hover:text-white transition-all duration-200"
          >
            Build My Resume
          </Link>
        </div>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-sky-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-20 -left-40 w-[500px] h-[500px] bg-sky-100 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="max-w-6xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="space-y-7"
            >

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-gray-900 leading-[1.12] tracking-tight"
              >
                Build a{' '}
                <span className="text-sky-500 underline decoration-sky-200 underline-offset-4 decoration-[3px]">
                  free resume
                </span>{' '}
                in a few clicks
              </motion.h1>

              {/* Subhead */}
              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-gray-600 text-lg leading-relaxed max-w-lg"
              >
                The first step to a better job? A better resume. Only 2% of resumes win, and yours will be one of them. Create it now with our free resume builder!
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 pt-1">
                <Link
                  to="/builder/choose"
                  id="hero-cta-new"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-sky-500 text-white rounded-xl text-sm font-bold hover:bg-sky-600 shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 transition-all duration-200"
                >
                  Create a New Resume
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/builder/choose"
                  id="hero-cta-improve"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-sky-200 text-sky-600 rounded-xl text-sm font-bold hover:bg-sky-50 transition-all duration-200"
                >
                  Improve My Resume
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="flex items-center gap-6 pt-4"
              >
                <div>
                  <div className="text-2xl font-extrabold text-sky-500">48%</div>
                  <div className="text-xs text-gray-500">more likely to get hired</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <div className="text-2xl font-extrabold text-sky-500">12%</div>
                  <div className="text-xs text-gray-500">better pay with your next job</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Resume Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative hidden lg:block"
            >
              {/* Resume card */}
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-sky-100/50 border border-sky-100 p-0 overflow-hidden max-w-md mx-auto">
                {/* Blue header */}
                <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 pt-6 pb-5 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                    <Users className="text-white" size={28} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Samantha Williams</div>
                    <div className="text-sky-100 text-sm">Senior Analyst</div>
                    <div className="text-sky-200 text-xs mt-0.5">samantha.williams@email.com</div>
                  </div>
                </div>

                {/* Color dots */}
                <div className="flex gap-2 px-6 pt-4">
                  {['bg-sky-500', 'bg-sky-400', 'bg-amber-400', 'bg-emerald-400', 'bg-slate-800', 'bg-gray-400'].map((c, i) => (
                    <div key={i} className={`w-5 h-5 rounded-full ${c} ${i === 0 ? 'ring-2 ring-sky-300 ring-offset-1' : ''}`} />
                  ))}
                </div>

                {/* Resume content mockup */}
                <div className="px-6 py-4 grid grid-cols-2 gap-4">
                  {/* Left col */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-1.5">Summary</div>
                      <div className="space-y-1">
                        <div className="h-1.5 w-full bg-gray-200 rounded" />
                        <div className="h-1.5 w-5/6 bg-gray-200 rounded" />
                        <div className="h-1.5 w-4/6 bg-gray-200 rounded" />
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-1.5">Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {['Project Mgmt', 'Data Analysis', 'Statistical Modeling'].map((s, i) => (
                          <span key={i} className="text-[7px] bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Right col */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-1.5">Experience</div>
                      <div className="text-[8px] font-bold text-gray-700">Senior Analyst</div>
                      <div className="text-[7px] text-gray-500 mb-1">Tech Corp · 2022 — Present</div>
                      <div className="space-y-0.5">
                        <div className="h-1 w-full bg-gray-100 rounded" />
                        <div className="h-1 w-4/5 bg-gray-100 rounded" />
                        <div className="h-1 w-full bg-gray-100 rounded" />
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] font-bold text-gray-700">Business Analyst</div>
                      <div className="text-[7px] text-gray-500 mb-1">StartupX · 2019 — 2022</div>
                      <div className="space-y-0.5">
                        <div className="h-1 w-full bg-gray-100 rounded" />
                        <div className="h-1 w-3/5 bg-gray-100 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ATS badge */}
                <div className="mx-6 mb-4">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                    <CheckCircle size={13} />
                    ATS Perfect
                  </div>
                </div>
              </div>

              {/* Floating AI card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 -right-4 bg-white rounded-xl shadow-xl border border-gray-100 p-4 w-56"
              >
                <div className="flex items-center gap-2 text-sky-500 font-bold text-xs mb-2.5">
                  <Sparkles size={14} />
                  AI-powered ideas
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <ArrowRight size={8} className="text-sky-500" />
                    </div>
                    <p className="text-[10px] text-gray-600 leading-snug">Analyzed market trends to identify new growth opportunities.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 mt-0.5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <ArrowRight size={8} className="text-sky-500" />
                    </div>
                    <p className="text-[10px] text-gray-600 leading-snug">Reduced operational costs by 15% through process optimization.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ─── Features Section ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Everything you need to build a <span className="text-sky-500">winning resume</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Professional tools, beautiful templates, and smart features — all in one place, completely free.
            </p>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap before:content-[''] before:absolute before:left-0 before:top-0 before:w-16 md:before:w-32 before:h-full before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:content-[''] after:absolute after:right-0 after:top-0 after:w-16 md:after:w-32 after:h-full after:bg-gradient-to-l after:from-white after:to-transparent after:z-10 py-4">
          <motion.div
            className="flex gap-6 items-center px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35,
            }}
          >
            {[
              { icon: Shield, title: 'ATS-Friendly Templates', desc: 'Machine-readable format that passes Applicant Tracking Systems with flying colors.', color: 'sky' },
              { icon: Zap, title: 'Real-Time Preview', desc: 'See changes instantly in a live 2-panel editor as you type. No delays.', color: 'amber' },
              { icon: Download, title: 'PDF Export', desc: 'Download a high-quality, selectable-text PDF — ready for any job application.', color: 'emerald' },
              { icon: Sparkles, title: 'LaTeX Import', desc: 'Import your existing LaTeX resume (moderncv, etc.) and auto-populate all fields.', color: 'violet' },
              { icon: Users, title: 'Profile Photo', desc: 'Upload a profile picture for the modern template. Toggle visibility per template.', color: 'rose' },
              { icon: BarChart3, title: 'Drag & Reorder', desc: 'Customize section order by dragging. Your resume, your layout.', color: 'indigo' },
              // Duplicate the array for seamless scroll
              { icon: Shield, title: 'ATS-Friendly Templates', desc: 'Machine-readable format that passes Applicant Tracking Systems with flying colors.', color: 'sky' },
              { icon: Zap, title: 'Real-Time Preview', desc: 'See changes instantly in a live 2-panel editor as you type. No delays.', color: 'amber' },
              { icon: Download, title: 'PDF Export', desc: 'Download a high-quality, selectable-text PDF — ready for any job application.', color: 'emerald' },
              { icon: Sparkles, title: 'LaTeX Import', desc: 'Import your existing LaTeX resume (moderncv, etc.) and auto-populate all fields.', color: 'violet' },
              { icon: Users, title: 'Profile Photo', desc: 'Upload a profile picture for the modern template. Toggle visibility per template.', color: 'rose' },
              { icon: BarChart3, title: 'Drag & Reorder', desc: 'Customize section order by dragging. Your resume, your layout.', color: 'indigo' },
            ].map((feat, i) => {
              const colorMap = {
                sky: 'bg-sky-50 text-sky-500 border-sky-100',
                amber: 'bg-amber-50 text-amber-500 border-amber-100',
                emerald: 'bg-emerald-50 text-emerald-500 border-emerald-100',
                violet: 'bg-violet-50 text-violet-500 border-violet-100',
                rose: 'bg-rose-50 text-rose-500 border-rose-100',
                indigo: 'bg-indigo-50 text-indigo-500 border-indigo-100',
              };
              return (
                <div
                  key={`${feat.title}-${i}`}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-100 transition-shadow min-w-[320px] max-w-[320px] whitespace-normal"
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 border ${colorMap[feat.color]}`}>
                    <feat.icon size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Templates Preview ─── */}
      <section className="py-24 bg-sky-50/30 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6">
              Expertly Crafted <span className="text-sky-500">Resume Dimensions</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Elevate your professional narrative with our diverse collection of ATS-optimized and designer layouts. 
              Find the perfect architecture to showcase your career projectory.
            </p>
          </motion.div>
        </div>

        {/* Manual Template Showcase */}
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar -mx-5 px-5 lg:-mx-0 lg:px-0">
            {[
              { img: template1, id: 'celestial', name: 'Celestial', desc: 'Refined neutral tones' },
              { img: template2, id: 'ats-classic', name: 'ATS Classic', desc: 'Machine readable' },
              { img: template3, id: 'astralis', name: 'Astralis', desc: 'Classic & Professional' },
              { img: template4, id: 'lumina', name: 'Lumina', desc: 'Modern 2-column with banner' },
              { img: template5, id: 'zenith', name: 'Zenith', desc: 'Elegant centered header' },
              { img: template6, id: 'horizon', name: 'Horizon', desc: 'Striking left sidebar' },
              { img: template7, id: 'nova', name: 'Nova', desc: 'Bold & Impactful' },
              { img: template2, id: 'ats', name: 'ATS', desc: 'Simple & Neat' },
            ].map((tpl) => (
              <div
                key={`template-${tpl.id}`}
                className="relative min-w-[280px] sm:min-w-[380px] bg-white rounded-[2rem] shadow-xl shadow-sky-100/40 border border-sky-50 overflow-hidden group snap-center transition-all duration-500 hover:shadow-2xl hover:shadow-sky-200/50"
              >
                {/* Image & Hover Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={tpl.img} 
                    alt={tpl.name} 
                    className="w-full h-full object-cover grayscale-[0.2] blur-[0px] group-hover:grayscale-0 group-hover:blur-[2px] transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Premium Advanced Hover Overlay */}
                  <div className="absolute inset-0 bg-sky-900/10 backdrop-blur-[0px] group-hover:backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
                    {/* Floating Template Badge */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[10px] font-black text-sky-600 uppercase tracking-[0.2em] shadow-xl border border-white">
                        {tpl.name}
                      </span>
                    </div>

                    {/* Main CTA Button */}
                    <button 
                      onClick={() => {
                        setActiveTemplate(tpl.id);
                      }}
                    >
                      <Link 
                        to="/builder/details" 
                        className="inline-flex items-center gap-3 px-8 py-4 bg-sky-500 text-white font-bold rounded-2xl shadow-2xl shadow-sky-500/30 hover:bg-sky-600 hover:scale-105 active:scale-95 transition-all duration-300 translate-y-8 group-hover:translate-y-0"
                      >
                        <Sparkles size={18} className="animate-pulse" />
                        Use This Template
                      </Link>
                    </button>

                    {/* Subtitle */}
                    <div className="mt-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <p className="text-white text-xs font-semibold tracking-wide drop-shadow-md">{tpl.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll controls hint */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="h-[2px] w-32 bg-sky-100 rounded-full relative overflow-hidden">
               <motion.div 
                 className="absolute inset-0 bg-sky-500"
                 animate={{ x: [-128, 128] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               />
            </div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Scroll horizontally to explore
            </span>
            <div className="h-[2px] w-32 bg-sky-100 rounded-full relative overflow-hidden">
               <motion.div 
                 className="absolute inset-0 bg-sky-500"
                 animate={{ x: [-128, 128] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
               />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Ready to build your resume?
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
              Join thousands who've landed their dream jobs with resumes built on RamroCV.
            </p>
            <Link
              to="/builder"
              id="cta-bottom-btn"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 text-white rounded-xl font-bold text-base hover:bg-sky-600 shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 transition-all duration-200"
            >
              Start Building — It's Free
              <ChevronRight size={18} />
            </Link>
            <p className="text-xs text-gray-400 mt-4">No sign-up required · Your data stays in your browser</p>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logo} 
                alt="RamroCV" 
                className="w-8 h-8 object-contain"
              />
              <span className="font-bold text-white text-xl">
                Ramro<span className="text-sky-500">CV</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm">
              The easiest way to build a professional, ATS-friendly resume that lands you interviews. No login required.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-2">Build</span>
            <Link to="/builder" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">Start Building</Link>
            <Link to="/builder" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">Templates</Link>
            <Link to="/builder" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">Import LaTeX</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="text-white font-semibold mb-2">Legal</span>
            <a href="#" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-sky-400 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-5 mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} RamroCV. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            Made with <Heart size={14} className="text-rose-500 fill-rose-500" /> by <span className="text-white font-medium">Sharon</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
