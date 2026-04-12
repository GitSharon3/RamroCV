import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResumeStore } from '../store/resumeStore';
import { loadFromShareableLink } from '../utils/pdfExport';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import StepIndicator from '../components/StepIndicator';
import TemplateSwitcher from '../components/TemplateSwitcher';
import LatexImporter from '../components/LatexImporter';
import { FileText, PanelLeft, PanelRight, LayoutPanelLeft, ArrowLeft, ArrowRight, Sparkles, Download as DownloadIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BuilderPage = () => {
  const [mobileView, setMobileView] = useState('edit');
  const [isMobile, setIsMobile] = useState(false);
  const [stepOneTab, setStepOneTab] = useState('template');
  const { wizardStep, setWizardStep, activeTemplate, personalInfo, setPhoto, loadSampleData } = useResumeStore();
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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
    if (wizardStep < 3) setWizardStep(wizardStep + 1);
  };

  const handlePrevStep = () => {
    if (wizardStep > 1) setWizardStep(wizardStep - 1);
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
          {wizardStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center py-10">
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 font-playfair">
                   Start your resume
                </h1>
                <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
                   Pick a beautiful design and fill in your details, or import existing LaTeX code.
                </p>

                {/* --- Tab Slider --- */}
                <div className="flex justify-center mb-10">
                  <div className="bg-gray-100 p-1.5 rounded-full inline-flex relative shadow-inner">
                    <button
                      onClick={() => setStepOneTab('template')}
                      className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${stepOneTab === 'template' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Choose a Design
                    </button>
                    <button
                      onClick={() => setStepOneTab('latex')}
                      className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${stepOneTab === 'latex' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Import LaTeX
                    </button>
                    <div
                      className="absolute top-1.5 left-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm transition-transform duration-300 ease-out"
                      style={{
                        transform: stepOneTab === 'template' ? 'translateX(0)' : 'translateX(100%)',
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-center gap-4 mb-4">
                   <button 
                     onClick={() => setWizardStep(2)}
                     className="text-sky-500 font-bold hover:underline"
                   >
                     Skip and choose later
                   </button>
                </div>

                {/* --- Step 1 Content Area --- */}
                <div className="min-h-[450px]">
                  {stepOneTab === 'template' ? (
                    <motion.div 
                      key="template-tab"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-100/50 max-w-5xl mx-auto text-left"
                    >
                       <TemplateSwitcher showNextButton={true} onNext={() => setWizardStep(2)} />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="latex-tab"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-100/50 max-w-xl mx-auto"
                    >
                       <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 justify-center">
                          <FileText className="text-sky-500" size={20} />
                          Already have a resume?
                       </h3>
                       <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                          <LatexImporter />
                          <p className="text-[10px] text-gray-400 mt-4 text-center">
                             Import your existing LaTeX code to auto-populate the data.
                          </p>
                       </div>
                       <div className="mt-8">
                          <p className="text-xs text-gray-400 mb-4 italic">Or start with sample data to see how it works</p>
                          <button 
                            onClick={() => { loadSampleData(); setWizardStep(2); }}
                            className="w-full py-3 bg-gray-50 border border-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                          >
                            <Sparkles size={16} className="text-sky-400" />
                            Load Sample Details
                          </button>
                       </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {wizardStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto pb-4 scrollbar-hide">
                <ResumeForm />
              </div>
              <div className="h-full">
                <ResumePreview />
              </div>
            </motion.div>
          )}

          {wizardStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1 order-2 lg:order-1">
                  <ResumePreview />
                </div>
                <div className="w-full lg:w-80 order-1 lg:order-2 space-y-6">
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/50 text-center">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <DownloadIcon size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 font-playfair">All set!</h2>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                      Your professional resume is ready. Download the high-quality PDF to start applying.
                    </p>
                    <div className="space-y-3">
                       <button 
                         onClick={() => document.getElementById('download-pdf-btn')?.click()}
                         className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100"
                       >
                         Download PDF Resume
                       </button>
                       <p className="text-[10px] text-gray-400 italic">Selectable text & ATS-optimized</p>
                    </div>
                  </div>

                  <div className="bg-sky-500 rounded-3xl p-8 text-white shadow-xl shadow-sky-200">
                    <h3 className="font-bold flex items-center gap-2 mb-4">
                      <Sparkles size={18} />
                      Next Steps
                    </h3>
                    <ul className="text-sm space-y-4 opacity-90">
                       <li className="flex gap-2">
                         <span className="font-bold">1.</span>
                         <span>Check for any typos one last time.</span>
                       </li>
                       <li className="flex gap-2">
                         <span className="font-bold">2.</span>
                         <span>Rename the file professionally (e.g. John_Doe_Resume.pdf).</span>
                       </li>
                       <li className="flex gap-2">
                         <span className="font-bold">3.</span>
                         <span>Upload to job portals and start landing interviews!</span>
                       </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
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
