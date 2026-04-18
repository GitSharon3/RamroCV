import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useResumeStore } from '../store/resumeStore';
import { loadFromShareableLink } from '../utils/resumeUtils';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Download as DownloadIcon, 
  FileCheck, 
  Share2 
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Consolidated Components
import { StepIndicator, TemplateSwitcher, VerticalTemplateSwitcher } from '../components/builder/BuilderUI';
import ResumeFormEditor, { LatexImporter } from '../components/builder/ResumeFormEditor';
import ResumePreview from '../components/preview/ResumePreview';

// Styles & Assets
import './BuilderPage.css';
import logo from '../assets/logo.png';

// ============================================
// INTERNAL COMPONENTS
// ============================================

/**
 * AnimatedLogo - Logo component with floating animation
 */
const AnimatedLogo = React.memo(() => (
  <div className="builder-logo">
    <div className="builder-logo__icon-wrapper">
      <img src={logo} alt="RamroCV" className="builder-logo__image" />
      <Sparkles className="builder-logo__sparkle builder-logo__sparkle--1" size={10} />
      <Sparkles className="builder-logo__sparkle builder-logo__sparkle--2" size={8} />
      <Sparkles className="builder-logo__sparkle builder-logo__sparkle--3" size={6} />
    </div>
    <span className="builder-logo__text">Ramro<span className="builder-logo__accent">CV</span></span>
  </div>
));
AnimatedLogo.displayName = 'AnimatedLogo';

/**
 * StepErrorBoundary - Prevents the entire builder from crashing
 */
class StepErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error) { console.error('Step crash:', error); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center p-8 bg-red-50 rounded-2xl border border-red-200">
          <div className="text-center">
            <h3 className="text-lg font-bold text-red-700 mb-2">Something went wrong</h3>
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-600 text-white rounded-lg">Refresh</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * Step 1: Choose Template
 */
const ChooseTemplateStep = () => {
  const [tab, setTab] = useState('template');
  const { activeTemplate, setActiveTemplate, loadSampleData } = useResumeStore();
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    // Auto-select first template if none selected
    if (!activeTemplate) {
      setActiveTemplate('modern');
    }
    navigate('/builder/details');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
      <div className="text-center py-4 sm:py-6">
        {/* Simple CTA Button at Top */}
        <motion.button 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartBuilding} 
          className="choose-template__simple-btn"
        >
          <ArrowRight size={20} />
          Enter Details
        </motion.button>
        
        {/* Tab Switcher */}
        <div className="flex justify-center my-4">
          <div className="choose-template__tabs choose-template__tabs--compact">
            {['template', 'latex'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`choose-template__tab ${tab === t ? 'choose-template__tab--active' : ''}`}>
                {t === 'template' ? 'Templates' : 'Import LaTeX'}
              </button>
            ))}
            <div className="choose-template__tab-indicator" style={{ transform: tab === 'template' ? 'translateX(0)' : 'translateX(100%)' }} />
          </div>
        </div>

        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {tab === 'template' ? (
              <motion.div key="tpl" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <TemplateSwitcher />
              </motion.div>
            ) : (
              <motion.div key="ltx" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="choose-template__latex-box">
                  <LatexImporter onImported={() => navigate('/builder/details')} />
                </div>
                <button onClick={() => { loadSampleData(); navigate('/builder/details'); }} className="choose-template__sample-btn mt-6">
                  <Sparkles size={16} className="text-amber-500" /> Load Sample Data
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Step 2: Edit Details
 */
const EditResumeStep = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-3 sm:gap-5 h-full">
    <div className="text-center px-2 flex-shrink-0">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">Enter your details</h1>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">Fill the form and see live changes.</p>
    </div>
    <div className="flex flex-col xl:flex-row gap-3 sm:gap-6 flex-1 min-h-0">
      {/* Preview - Shown first on mobile */}
      <div className="flex-1 min-w-0 bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col order-1 xl:order-2 h-[250px] sm:h-[350px] xl:h-auto">
        <StepErrorBoundary><ResumePreview hideTemplateSwitcher hideActionBar initialZoom={1.0} /></StepErrorBoundary>
      </div>
      {/* Form */}
      <div className="xl:w-[420px] w-full flex-shrink-0 bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col order-2 xl:order-1 min-h-[300px] xl:min-h-0">
        <div className="flex-1 overflow-y-auto p-3 sm:p-4"><StepErrorBoundary><ResumeFormEditor /></StepErrorBoundary></div>
      </div>
    </div>
  </motion.div>
);

/**
 * Step 3: Download
 */
const DownloadResumeStep = () => {
  const { activeTemplate, setActiveTemplate, personalInfo, education, experience, skills, projects, additionalSections } = useResumeStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const templateNames = { 
    'celestial': 'Celestial', 
    'ats-classic': 'ATS Classic', 
    'astralis': 'Astralis', 
    'lumina': 'Lumina', 
    'zenith': 'Zenith', 
    'horizon': 'Horizon', 
    'nova': 'Nova' 
  };

  const handleDownload = async () => {
    const { downloadPDF } = await import('../utils/resumeUtils');
    setIsDownloading(true);
    try {
      await downloadPDF('resume-preview', `${personalInfo.firstName || 'my'}-resume.pdf`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const { generateShareableLink } = await import('../utils/resumeUtils');
    setIsSharing(true);
    const link = generateShareableLink({ personalInfo, education, experience, skills, projects, additionalSections, activeTemplate });
    try {
      await navigator.clipboard.writeText(link);
      alert('Link copied to clipboard!');
    } catch {
      prompt('Copy this link:', link);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 xl:h-[calc(100vh-180px)] xl:min-h-[500px]">
        {/* Template Switcher - Hidden on mobile, shown on xl */}
        <div className="hidden xl:flex xl:w-64 w-full flex-shrink-0 bg-white rounded-2xl border shadow-sm p-4 flex-col">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Switch Style</h3>
          <VerticalTemplateSwitcher />
        </div>
        
        {/* Resume Preview */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col order-1 xl:order-2 h-[350px] sm:h-[450px] xl:h-auto">
          <ResumePreview hideTemplateSwitcher hideActionBar initialZoom={0.8} />
        </div>
        
        {/* Action Panel */}
        <div className="xl:w-64 w-full flex-shrink-0 order-2 xl:order-3">
          <div className="bg-white rounded-2xl p-4 sm:p-6 border shadow-sm xl:sticky xl:top-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-sm">
              <FileCheck size={24} className="sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 text-center">Resume Ready!</h2>
            <p className="text-xs text-gray-500 text-center mb-4 sm:mb-6">Your resume is polished and ready for your next big role.</p>
            
            <button 
              onClick={handleDownload} 
              disabled={isDownloading}
              className={`w-full py-3 sm:py-3.5 ${isDownloading ? 'bg-gray-100' : 'bg-emerald-500 hover:bg-emerald-600'} text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm shadow-emerald-100 mb-3 text-sm sm:text-base`}
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <DownloadIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
              )}
              {isDownloading ? 'Processing...' : 'Download PDF'}
            </button>
            
            <button 
              onClick={handleShare} 
              className="w-full py-2.5 sm:py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all border border-gray-100 text-sm sm:text-base"
            >
              <Share2 size={14} className="sm:w-4 sm:h-4" /> Share Link
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Template Switcher */}
      <div className="xl:hidden mt-4 sm:mt-6 bg-white rounded-2xl border shadow-sm p-3 sm:p-4 overflow-x-auto">
        <p className="text-xs text-gray-400 mb-2 px-1">Switch Template:</p>
        <div className="flex gap-2 sm:gap-3 w-max">
          {Object.entries(templateNames).map(([id, name]) => (
            <button key={id} onClick={() => setActiveTemplate(id)} className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${activeTemplate === id ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-700'}`}>{name}</button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN BUILDER PAGE
// ============================================

const BuilderPage = () => {
  const { wizardStep, setWizardStep } = useResumeStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathToStep = { '/builder/choose': 1, '/builder/details': 2, '/builder/download': 3 };
    const step = Object.entries(pathToStep).find(([p]) => location.pathname.includes(p))?.[1];
    if (step && step !== wizardStep) setWizardStep(step);
  }, [location.pathname, wizardStep, setWizardStep]);

  useEffect(() => {
    const sharedData = loadFromShareableLink();
    if (sharedData) {
      const store = useResumeStore.getState();
      if (sharedData.personalInfo) Object.entries(sharedData.personalInfo).forEach(([k, v]) => store.updatePersonalInfo(k, v));
      if (sharedData.activeTemplate) store.setActiveTemplate(sharedData.activeTemplate);
    }
  }, []);

  const navConfig = useMemo(() => {
    const configs = { 1: { text: 'Start Building', showBack: false }, 2: { text: 'Review Resume', showBack: true }, 3: { text: 'Finish Session', showBack: true } };
    return configs[wizardStep] || configs[1];
  }, [wizardStep]);

  const renderStep = () => {
    if (location.pathname.includes('choose')) return <ChooseTemplateStep />;
    if (location.pathname.includes('details')) return <EditResumeStep />;
    if (location.pathname.includes('download')) return <DownloadResumeStep />;
    return null;
  };

  return (
    <div className="builder-page">
      <header className="builder-header">
        <div className="builder-header__container">
          <Link to="/"><AnimatedLogo /></Link>
          <div className="builder-header__nav">
            {navConfig.showBack && (
              <button onClick={() => navigate(-1)} className="builder-nav-btn builder-nav-btn--back"><ArrowLeft size={14} /> Back</button>
            )}
            <button 
              onClick={() => {
                if (wizardStep === 1) navigate('/builder/details');
                else if (wizardStep === 2) navigate('/builder/download');
                else navigate('/');
              }} 
              className="builder-nav-btn builder-nav-btn--primary"
            >
              {navConfig.text} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      <StepIndicator />

      <main className="builder-main">
        <AnimatePresence mode="wait">
          <motion.div 
            key={location.pathname} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            className="builder-main__content"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="builder-footer">
        <div className="builder-footer__content">
          <p className="builder-footer__text">Built with ♥ by Sharon · Data remains local</p>
        </div>
      </footer>
    </div>
  );
};

export default BuilderPage;
