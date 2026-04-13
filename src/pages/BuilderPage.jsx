import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useResumeStore } from '../store/resumeStore';
import { loadFromShareableLink } from '../utils/pdfExport';
import StepIndicator from '../components/StepIndicator';
import { FileText, ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const BuilderPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { wizardStep, setWizardStep, activeTemplate, loadSampleData } = useResumeStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Sync wizardStep with Route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/builder/choose')) setWizardStep(1);
    else if (path.includes('/builder/details')) setWizardStep(2);
    else if (path.includes('/builder/download')) setWizardStep(3);
  }, [location.pathname, setWizardStep]);

  useEffect(() => {
    const sharedData = loadFromShareableLink();
    if (sharedData) {
      if (sharedData.personalInfo) {
        Object.entries(sharedData.personalInfo).forEach(([k, v]) => {
          useResumeStore.getState().updatePersonalInfo(k, v);
        });
      }
      if (sharedData.activeTemplate) {
        useResumeStore.getState().setActiveTemplate(sharedData.activeTemplate);
      }
    }
  }, []);

  const handleNextStep = () => {
    if (wizardStep === 1) navigate('/builder/details');
    else if (wizardStep === 2) navigate('/builder/download');
  };

  const handlePrevStep = () => {
    if (wizardStep === 2) navigate('/builder/choose');
    else if (wizardStep === 3) navigate('/builder/details');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* ─── Header ─── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="text-white" size={15} strokeWidth={2.5} />
              </div>
              <span className="text-sm font-bold text-gray-900 tracking-tight">
                Ramro<span className="text-sky-500">CV</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
             {wizardStep > 1 && (
               <button 
                 onClick={handlePrevStep}
                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
               >
                 <ArrowLeft size={14} />
                 Back
               </button>
             )}
             <button
                onClick={() => {
                  if (wizardStep === 3) navigate('/');
                  else handleNextStep();
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  wizardStep === 3 
                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                  : 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-100 hover:shadow-sky-200'
                }`}
             >
                {wizardStep === 1 ? 'Start Building' : wizardStep === 2 ? 'Review Resume' : 'Finish Session'}
                <ArrowRight size={16} />
             </button>
          </div>
        </div>
      </header>

      {/* ─── Progress Indicator ─── */}
      <StepIndicator />

      {/* ─── Step Content ─── */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 pb-12">
        <AnimatePresence mode="wait">
          {/* Outlet handles the specific step route */}
          <Outlet />
        </AnimatePresence>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-white border-t border-gray-50 py-6 mt-12">
        <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
           Built with ❤️ by Sharon · Data remains local in your browser
        </p>
      </footer>
    </div>
  );
};

export default BuilderPage;
