import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Star, ArrowRight, Sparkles, Shield, Zap, Download, Users, BarChart3, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const BRAND_COLOR = '#0ea5e9'; // sky-500

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100/60">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center shadow-md shadow-sky-200 group-hover:shadow-lg group-hover:shadow-sky-300 transition-shadow">
              <FileText className="text-white" size={18} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">
              Ramro<span className="text-sky-500">CV</span>
            </span>
          </Link>
          <Link
            to="/builder"
            id="nav-build-btn"
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
                  to="/builder"
                  id="hero-cta-new"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-sky-500 text-white rounded-xl text-sm font-bold hover:bg-sky-600 shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 transition-all duration-200"
                >
                  Create a New Resume
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/builder"
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
      <section className="py-20 bg-sky-50/40">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Choose from professional templates
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Start with an ATS-ready classic or a stunning modern design. Switch anytime.
            </p>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-transparent px-2 -mx-2">
            {/* ATS Classic preview */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 overflow-hidden group hover:shadow-xl transition-shadow min-w-[320px] max-w-[320px] sm:min-w-[350px] sm:max-w-[350px] flex-shrink-0 snap-center">
              <div className="p-6 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <FileText size={16} className="text-gray-600" />
                  <h3 className="font-bold text-gray-900">ATS Classic</h3>
                </div>
                <p className="text-xs text-gray-400">Machine-readable, black & white layout</p>
              </div>
              {/* Mini mockup */}
              <div className="mx-6 mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="text-center mb-3 pb-2 border-b border-gray-300">
                  <div className="h-3 w-32 bg-gray-800 rounded mx-auto mb-1.5" />
                  <div className="h-1.5 w-40 bg-gray-300 rounded mx-auto" />
                </div>
                <div className="mb-2">
                  <div className="h-2 w-28 bg-gray-700 rounded mb-1.5" />
                  <div className="h-1.5 w-full bg-gray-100 rounded mb-1" />
                  <div className="h-1.5 w-5/6 bg-gray-100 rounded mb-1" />
                  <div className="h-1.5 w-4/6 bg-gray-100 rounded" />
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="h-2 w-20 bg-gray-700 rounded mb-1.5" />
                  <div className="h-1.5 w-full bg-gray-100 rounded mb-1" />
                  <div className="h-1.5 w-3/4 bg-gray-100 rounded" />
                </div>
              </div>
              <div className="px-6 pb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  <CheckCircle size={12} /> ATS Compliant
                </span>
              </div>
            </div>

            {/* Blue Modern preview */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 overflow-hidden group hover:shadow-xl transition-shadow min-w-[320px] max-w-[320px] sm:min-w-[350px] sm:max-w-[350px] flex-shrink-0 snap-center">
              <div className="p-6 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Star size={16} className="text-sky-500" />
                  <h3 className="font-bold text-gray-900">Blue Modern</h3>
                </div>
                <p className="text-xs text-gray-400">Professional 2-column with photo support</p>
              </div>
              {/* Mini mockup */}
              <div className="mx-6 mb-6 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex">
                <div className="w-20 bg-sky-700 p-3 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-sky-500/50 border border-sky-400/50" />
                  <div className="w-full space-y-1 mt-1">
                    <div className="h-1 w-full bg-sky-500/40 rounded" />
                    <div className="h-1 w-3/4 bg-sky-500/40 rounded" />
                    <div className="h-1 w-full bg-sky-500/40 rounded" />
                  </div>
                </div>
                <div className="flex-1 p-3 space-y-2">
                  <div className="h-2.5 w-28 bg-sky-600 rounded mb-1" />
                  <div className="h-1.5 w-full bg-gray-100 rounded" />
                  <div className="h-1.5 w-4/5 bg-gray-100 rounded" />
                  <div className="h-2 w-20 bg-sky-600 rounded mt-2 mb-1" />
                  <div className="h-1.5 w-full bg-gray-100 rounded" />
                  <div className="h-1.5 w-3/5 bg-gray-100 rounded" />
                </div>
              </div>
              <div className="px-6 pb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  <Users size={12} /> Photo Support
                </span>
              </div>
            </div>
            
            {/* Added "More coming soon" card to show it's horizontal */}
            <div className="bg-sky-50/50 rounded-2xl shadow-inner border border-sky-100/50 overflow-hidden group min-w-[320px] max-w-[320px] sm:min-w-[350px] sm:max-w-[350px] flex-shrink-0 snap-center flex items-center justify-center">
              <div className="text-center p-8 opacity-70">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-sky-200">
                  <Sparkles size={24} className="text-sky-400" />
                </div>
                <h3 className="font-bold text-gray-700 mb-1">More Templates</h3>
                <p className="text-xs text-gray-500">Coming soon in future updates</p>
              </div>
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                <FileText className="text-white" size={16} />
              </div>
              <span className="font-bold text-white text-xl">
                Ramro<span className="text-sky-500">CV</span>
              </span>
            </div>
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
