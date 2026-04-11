import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useResumeStore } from '../store/resumeStore';
import { loadFromShareableLink } from '../utils/pdfExport';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';
import { FileText, PanelLeft, PanelRight, LayoutPanelLeft, ArrowLeft } from 'lucide-react';

const BuilderPage = () => {
  const [mobileView, setMobileView] = useState('edit');
  const [isMobile, setIsMobile] = useState(false);
  const resumeStore = useResumeStore();

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
          resumeStore.updatePersonalInfo(k, v);
        });
      }
      if (sharedData.activeTemplate) {
        resumeStore.setActiveTemplate(sharedData.activeTemplate);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ─── Header ─── */}
      <header className="bg-white/90 backdrop-blur-md border-b border-sky-100/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand + Back */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-gray-400 hover:text-sky-500 transition-colors text-xs font-medium"
            >
              <ArrowLeft size={14} />
              Home
            </Link>
            <div className="w-px h-5 bg-gray-200" />
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-sm shadow-sky-200">
                <FileText className="text-white" size={15} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-gray-900 tracking-tight">
                  Ramro<span className="text-sky-500">CV</span>
                </span>
                <span className="text-[9px] text-gray-400 font-medium">ATS-Ready · Professional</span>
              </div>
            </Link>
          </div>

          {/* Desktop indicators */}
          {!isMobile && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <LayoutPanelLeft size={14} />
                <span>2-Panel Editor</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-500 font-medium">Auto-saving</span>
              </div>
            </div>
          )}

          {/* Mobile Tab Switcher */}
          {isMobile && (
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setMobileView('edit')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mobileView === 'edit' ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <PanelLeft size={14} />
                Edit
              </button>
              <button
                onClick={() => setMobileView('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mobileView === 'preview' ? 'bg-white text-sky-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                <PanelRight size={14} />
                Preview
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ─── Main 2-Panel Layout ─── */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 sm:px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* LEFT — Form */}
          <div
            className={`${isMobile && mobileView !== 'edit' ? 'hidden' : 'block'} lg:sticky lg:top-[72px] lg:max-h-[calc(100vh-88px)] lg:overflow-y-auto pb-8 scrollbar-thin`}
          >
            <ResumeForm />
          </div>

          {/* RIGHT — Preview */}
          <div className={`${isMobile && mobileView !== 'preview' ? 'hidden' : 'block'} pb-8`}>
            <ResumePreview />
          </div>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-white border-t border-gray-100 py-4 mt-4">
        <p className="text-center text-xs text-gray-400">
          🔒 Your data is stored locally in your browser · Never sent to any server ·{' '}
          <Link to="/" className="text-sky-500 hover:underline">RamroCV</Link>
        </p>
      </footer>
    </div>
  );
};

export default BuilderPage;
