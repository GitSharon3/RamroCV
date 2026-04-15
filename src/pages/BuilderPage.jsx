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
import ResumeFormEditor from '../components/builder/ResumeFormEditor';
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
  const { activeTemplate, loadSampleData } = useResumeStore();
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
      <div className="text-center py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Start your resume</h1>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">Pick a design or import existing LaTeX code.</p>
        
        <div className="flex justify-center mb-8">
          <div className="choose-template__tabs">
            {['template', 'latex'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`choose-template__tab ${tab === t ? 'choose-template__tab--active' : ''}`}>
                {t === 'template' ? 'Choose a Design' : 'Import LaTeX'}
              </button>
            ))}
            <div className="choose-template__tab-indicator" style={{ transform: tab === 'template' ? 'translateX(0)' : 'translateX(100%)' }} />
          </div>
        </div>

        <div className="min-h-[450px]">
          <AnimatePresence mode="wait">
            {tab === 'template' ? (
              <motion.div key="tpl" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <TemplateSwitcher />
                {activeTemplate && (
                  <button onClick={() => navigate('/builder/details')} className="choose-template__bottom-next-btn mt-8">
                    Continue to Details <ArrowRight size={18} />
                  </button>
                )}
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
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Enter your details</h1>
      <p className="text-sm text-gray-500 mt-1">Fill the form and see live changes.</p>
    </div>
    <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-260px)] min-h-[600px]">
      <div className="xl:w-[420px] w-full flex-shrink-0 bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4"><StepErrorBoundary><ResumeFormEditor /></StepErrorBoundary></div>
      </div>
      <div className="flex-1 min-w-0 bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col">
        <StepErrorBoundary><ResumePreview hideTemplateSwitcher hideActionBar initialZoom={1.0} /></StepErrorBoundary>
      </div>
    </div>
  </motion.div>
);

/**
 * Step 3: Download
 */
const DownloadResumeStep = () => {
  const { activeTemplate, setActiveTemplate } = useResumeStore();
  const templateNames = { 'celestial': 'Celestial', 'ats-classic': 'ATS Classic', 'astralis': 'Astralis', 'lumina': 'Lumina', 'zenith': 'Zenith', 'horizon': 'Horizon', 'nova': 'Nova' };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-180px)] min-h-[600px]">
        <div className="xl:w-64 w-full flex-shrink-0 bg-white rounded-2xl border shadow-sm p-4 flex flex-col"><VerticalTemplateSwitcher /></div>
        <div className="flex-1 min-w-0 bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col"><ResumePreview hideTemplateSwitcher hideActionBar initialZoom={0.95} /></div>
        <div className="xl:w-64 w-full flex-shrink-0">
          <div className="bg-white rounded-2xl p-5 border shadow-sm sticky top-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3"><FileCheck size={24} /></div>
            <h2 className="text-lg font-bold text-gray-900 mb-1 text-center">Ready!</h2>
            <button onClick={() => document.getElementById('download-pdf-btn')?.click()} className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all"><DownloadIcon size={16} /> Download PDF</button>
            <button onClick={() => document.getElementById('share-link-btn')?.click()} className="w-full py-2.5 mt-2 bg-gray-100 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-all"><Share2 size={14} /> Share Link</button>
          </div>
        </div>
      </div>
      <div className="xl:hidden mt-6 bg-white rounded-2xl border shadow-sm p-4 overflow-x-auto">
        <div className="flex gap-3 w-max">
          {Object.entries(templateNames).map(([id, name]) => (
            <button key={id} onClick={() => setActiveTemplate(id)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeTemplate === id ? 'bg-sky-500 text-white' : 'bg-gray-100 text-gray-700'}`}>{name}</button>
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

  const CurrentStepComponent = () => {
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
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="builder-main__content">
            <CurrentStepComponent />
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
