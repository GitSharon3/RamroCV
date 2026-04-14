import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Zap, 
  Download, 
  Users, 
  BarChart3, 
  ChevronRight, 
  Heart, 
  Menu, 
  X,
  Star,
  FileText,
  Layout,
  Award,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResumeStore } from '../store/resumeStore';
import { useState, useEffect } from 'react';

// ============================================
// STYLES
// ============================================
import './LandingPage.css';

// ============================================
// ASSET IMPORTS
// ============================================
import logo from '../assets/logo.png';
import template1 from '../assets/template1.png';
import template2 from '../assets/template2.png';
import template3 from '../assets/template3.png';
import template4 from '../assets/template4.png';
import template5 from '../assets/template5.png';
import template6 from '../assets/template6.png';
import template7 from '../assets/template7.png';

// ============================================
// ANIMATION CONFIGURATIONS
// ============================================
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ============================================
// NAVIGATION CONFIGURATION
// ============================================
const navItems = [
  { label: 'Templates', href: '#templates', icon: Layout },
  { label: 'Features', href: '#features', icon: Star },
  { label: 'How It Works', href: '#how-it-works', icon: FileText },
];

// ============================================
// LANDING PAGE COMPONENT
// ============================================
const LandingPage = () => {
  const { setActiveTemplate } = useResumeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="landing-page">
      {/* ============================================
          NAVBAR SECTION
          ============================================ */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <img src={logo} alt="RamroCV" className="navbar__logo-img" />
            <span className="navbar__logo-text">
              Ramro<span className="navbar__logo-accent">CV</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar__desktop">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="navbar__link"
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </a>
            ))}
            <Link to="/builder/choose" className="navbar__cta">
              Build My Resume
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar__mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="navbar__mobile"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="navbar__mobile-link"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </a>
              ))}
              <Link
                to="/builder/choose"
                className="navbar__mobile-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                Build My Resume
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="hero">
        {/* Background Decorations */}
        <div className="hero__bg">
          <div className="hero__bg-blob hero__bg-blob--1" />
          <div className="hero__bg-blob hero__bg-blob--2" />
        </div>

        <div className="hero__container">
          <div className="hero__grid">
            {/* Left Column - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="hero__content"
            >
              {/* Trust Badge */}
              <motion.div variants={fadeUp} custom={0} className="hero__badge">
                <span className="hero__badge-dot" />
                <span>Trusted by 50,000+ job seekers</span>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={fadeUp} custom={1} className="hero__title">
                Build a{' '}
                <span className="hero__title-accent">free resume</span>
                <br />
                in a few clicks
              </motion.h1>

              {/* Subhead */}
              <motion.p variants={fadeUp} custom={2} className="hero__subtitle">
                The first step to a better job? A better resume. Only 2% of resumes win, 
                and yours will be one of them. Create it now with our free resume builder!
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} custom={3} className="hero__cta-group">
                <Link to="/builder/choose" className="hero__cta hero__cta--primary">
                  Create a New Resume
                  <ArrowRight size={18} />
                </Link>
                <Link to="/builder/choose" className="hero__cta hero__cta--secondary">
                  Improve My Resume
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div variants={fadeUp} custom={4} className="hero__stats">
                <div className="hero__stat">
                  <div className="hero__stat-value">48%</div>
                  <div className="hero__stat-label">more likely to get hired</div>
                </div>
                <div className="hero__stat-divider" />
                <div className="hero__stat">
                  <div className="hero__stat-value">12%</div>
                  <div className="hero__stat-label">better pay with your next job</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="hero__preview-wrapper"
            >
              {/* Resume Card */}
              <div className="hero__preview-card">
                {/* Card Header */}
                <div className="hero__preview-header">
                  <div className="hero__preview-avatar">
                    <Users size={28} />
                  </div>
                  <div className="hero__preview-info">
                    <div className="hero__preview-name">Samantha Williams</div>
                    <div className="hero__preview-role">Senior Analyst</div>
                    <div className="hero__preview-email">samantha.williams@email.com</div>
                  </div>
                </div>

                {/* Color Dots */}
                <div className="hero__preview-colors">
                  {['bg-sky-500', 'bg-sky-400', 'bg-amber-400', 'bg-emerald-400', 'bg-slate-800', 'bg-gray-400'].map((c, i) => (
                    <div key={i} className={`hero__preview-color ${c} ${i === 0 ? 'hero__preview-color--active' : ''}`} />
                  ))}
                </div>

                {/* Resume Mockup Content */}
                <div className="hero__preview-body">
                  <div className="hero__preview-col">
                    <div className="hero__preview-section">
                      <div className="hero__preview-section-title">Summary</div>
                      <div className="hero__preview-lines">
                        <div className="hero__preview-line" />
                        <div className="hero__preview-line hero__preview-line--80" />
                        <div className="hero__preview-line hero__preview-line--60" />
                      </div>
                    </div>
                    <div className="hero__preview-section">
                      <div className="hero__preview-section-title">Skills</div>
                      <div className="hero__preview-tags">
                        {['Project Mgmt', 'Data Analysis', 'Statistical Modeling'].map((s, i) => (
                          <span key={i} className="hero__preview-tag">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hero__preview-col">
                    <div className="hero__preview-section">
                      <div className="hero__preview-section-title">Experience</div>
                      <div className="hero__preview-job">
                        <div className="hero__preview-job-title">Senior Analyst</div>
                        <div className="hero__preview-job-company">Tech Corp · 2022 — Present</div>
                        <div className="hero__preview-job-lines">
                          <div className="hero__preview-job-line" />
                          <div className="hero__preview-job-line hero__preview-job-line--80" />
                          <div className="hero__preview-job-line" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ATS Badge */}
                <div className="hero__preview-badge">
                  <CheckCircle size={14} />
                  ATS Perfect
                </div>
              </div>

              {/* Floating AI Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="hero__ai-card"
              >
                <div className="hero__ai-card-header">
                  <Sparkles size={16} />
                  <span>AI-powered ideas</span>
                </div>
                <div className="hero__ai-card-items">
                  <div className="hero__ai-card-item">
                    <div className="hero__ai-card-icon">
                      <ArrowRight size={10} />
                    </div>
                    <p>Analyzed market trends to identify new growth opportunities.</p>
                  </div>
                  <div className="hero__ai-card-item">
                    <div className="hero__ai-card-icon">
                      <ArrowRight size={10} />
                    </div>
                    <p>Reduced operational costs by 15% through process optimization.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ============================================
          FEATURES SECTION
          ============================================ */}
      <section id="features" className="features">
        <div className="features__container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="features__header"
          >
            <span className="features__eyebrow">Features</span>
            <h2 className="features__title">
              Everything you need to build a <span className="features__title-accent">winning resume</span>
            </h2>
            <p className="features__subtitle">
              Professional tools, beautiful templates, and smart features — all in one place, completely free.
            </p>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="features__marquee">
          <motion.div
            className="features__marquee-track"
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
                sky: { bg: 'features__card-icon--sky', text: 'features__card-text--sky' },
                amber: { bg: 'features__card-icon--amber', text: 'features__card-text--amber' },
                emerald: { bg: 'features__card-icon--emerald', text: 'features__card-text--emerald' },
                violet: { bg: 'features__card-icon--violet', text: 'features__card-text--violet' },
                rose: { bg: 'features__card-icon--rose', text: 'features__card-text--rose' },
                indigo: { bg: 'features__card-icon--indigo', text: 'features__card-text--indigo' },
              };
              return (
                <div key={`${feat.title}-${i}`} className="features__card">
                  <div className={`features__card-icon ${colorMap[feat.color].bg}`}>
                    <feat.icon size={20} />
                  </div>
                  <h3 className="features__card-title">{feat.title}</h3>
                  <p className="features__card-desc">{feat.desc}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============================================
          TEMPLATES SECTION
          ============================================ */}
      <section id="templates" className="templates">
        <div className="templates__container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="templates__header"
          >
            <span className="templates__eyebrow">Templates</span>
            <h2 className="templates__title">
              Expertly Crafted <span className="templates__title-accent">Resume Designs</span>
            </h2>
            <p className="templates__subtitle">
              Elevate your professional narrative with our diverse collection of ATS-optimized 
              and designer layouts. Find the perfect architecture to showcase your career trajectory.
            </p>
          </motion.div>
        </div>

        {/* Template Showcase */}
        <div className="templates__showcase">
          <div className="templates__grid">
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
              <div key={`template-${tpl.id}`} className="templates__card">
                {/* Image & Hover Container */}
                <div className="templates__card-image-wrapper">
                  <img src={tpl.img} alt={tpl.name} className="templates__card-image" />
                  
                  {/* Hover Overlay */}
                  <div className="templates__card-overlay">
                    {/* Floating Template Badge */}
                    <div className="templates__card-badge">
                      <span>{tpl.name}</span>
                    </div>

                    {/* Main CTA Button */}
                    <Link 
                      to="/builder/details" 
                      onClick={() => setActiveTemplate(tpl.id)}
                      className="templates__card-cta"
                    >
                      <Sparkles size={18} />
                      Use This Template
                    </Link>

                    {/* Subtitle */}
                    <div className="templates__card-desc">
                      <p>{tpl.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="templates__scroll-indicator">
            <div className="templates__scroll-bar">
              <motion.div 
                className="templates__scroll-progress"
                animate={{ x: [-128, 128] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <span className="templates__scroll-text">Scroll horizontally to explore</span>
            <div className="templates__scroll-bar">
              <motion.div 
                className="templates__scroll-progress"
                animate={{ x: [-128, 128] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS SECTION
          ============================================ */}
      <section id="how-it-works" className="how-it-works">
        <div className="how-it-works__container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="how-it-works__header"
          >
            <span className="how-it-works__eyebrow">How It Works</span>
            <h2 className="how-it-works__title">
              Build your resume in <span className="how-it-works__title-accent">3 simple steps</span>
            </h2>
            <p className="how-it-works__subtitle">
              No complicated software. No design skills needed. Just answer a few questions and get a professional resume in minutes.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="how-it-works__steps"
          >
            {[
              {
                number: '01',
                icon: Layout,
                title: 'Choose a Template',
                desc: 'Browse our collection of ATS-optimized templates and pick the one that fits your style.',
              },
              {
                number: '02',
                icon: FileText,
                title: 'Fill in Your Details',
                desc: 'Enter your work experience, education, and skills. Our AI helps suggest improvements.',
              },
              {
                number: '03',
                icon: Download,
                title: 'Download & Apply',
                desc: 'Export your resume as a PDF and start applying to your dream jobs immediately.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                custom={i}
                className="how-it-works__step"
              >
                <div className="how-it-works__step-number">{step.number}</div>
                <div className="how-it-works__step-icon">
                  <step.icon size={28} />
                </div>
                <h3 className="how-it-works__step-title">{step.title}</h3>
                <p className="how-it-works__step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="cta">
        <div className="cta__container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="cta__content"
          >
            <div className="cta__badge">
              <Sparkles size={16} />
              <span>Free forever. No credit card required.</span>
            </div>
            <h2 className="cta__title">
              Ready to build your resume?
            </h2>
            <p className="cta__subtitle">
              Join thousands who've landed their dream jobs with resumes built on RamroCV.
            </p>
            <Link to="/builder/choose" className="cta__button">
              Start Building — It's Free
              <ChevronRight size={20} />
            </Link>
            <p className="cta__note">No sign-up required · Your data stays in your browser</p>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          FOOTER SECTION
          ============================================ */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <img src={logo} alt="RamroCV" className="footer__logo-img" />
                <span className="footer__logo-text">
                  Ramro<span className="footer__logo-accent">CV</span>
                </span>
              </Link>
              <p className="footer__tagline">
                The easiest way to build a professional, ATS-friendly resume that lands you interviews. No login required.
              </p>
              <div className="footer__social">
                <a href="#" className="footer__social-link" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="footer__social-link" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="footer__social-link" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="footer__links">
              <span className="footer__links-title">Product</span>
              <a href="#templates" className="footer__link">Templates</a>
              <a href="#features" className="footer__link">Features</a>
              <a href="#how-it-works" className="footer__link">How It Works</a>
              <Link to="/builder/choose" className="footer__link">Start Building</Link>
            </div>

            <div className="footer__links">
              <span className="footer__links-title">Resources</span>
              <Link to="/builder" className="footer__link">Resume Builder</Link>
              <Link to="/builder" className="footer__link">Import LaTeX</Link>
              <a href="#" className="footer__link">ATS Tips</a>
              <a href="#" className="footer__link">Career Blog</a>
            </div>

            <div className="footer__links">
              <span className="footer__links-title">Legal</span>
              <a href="#" className="footer__link">Privacy Policy</a>
              <a href="#" className="footer__link">Terms of Service</a>
              <a href="#" className="footer__link">Cookie Policy</a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer__bottom">
            <p className="footer__copyright">
              © {new Date().getFullYear()} RamroCV. All rights reserved.
            </p>
            <div className="footer__made-with">
              Made with <Heart size={14} /> by <span className="footer__author">Sharon</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
