import React from 'react';
import { motion } from 'framer-motion';
import { Download as DownloadIcon, FileCheck, Share2 } from 'lucide-react';
import ResumePreview from '../../components/ResumePreview';
import VerticalTemplateSwitcher from '../../components/VerticalTemplateSwitcher';
import { useResumeStore } from '../../store/resumeStore';

const DownloadResumeStep = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      {/* Main 3-Column Layout */}
      <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-180px)] min-h-[600px]">
        
        {/* Left Sidebar - Template Switcher (Vertical Scroll) */}
        <div className="xl:w-64 w-full flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex flex-col">
          <VerticalTemplateSwitcher />
        </div>

        {/* Center - Resume Preview */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <ResumePreview hideTemplateSwitcher={true} hideActionBar={true} initialZoom={0.95} />
        </div>

        {/* Right Sidebar - Download Actions */}
        <div className="xl:w-64 w-full flex-shrink-0">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm sticky top-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <FileCheck size={24} />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1 text-center">Ready!</h2>
            <p className="text-xs text-gray-500 mb-4 text-center">
              Your resume is ready to download.
            </p>
            
            <div className="space-y-2">
              <button 
                onClick={() => document.getElementById('download-pdf-btn')?.click()}
                className="w-full py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <DownloadIcon size={16} />
                Download PDF
              </button>
              
              <button 
                onClick={() => document.getElementById('share-link-btn')?.click()}
                className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <Share2 size={14} />
                Share Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Horizontal scroll templates on mobile */}
      <div className="xl:hidden mt-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Choose Template
          </h3>
          <div className="overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
            <div className="flex gap-3" style={{ width: 'max-content' }}>
              {['celestial', 'ats-classic', 'astralis', 'lumina', 'zenith', 'horizon', 'nova'].map((tplId) => (
                <MobileTemplateButton key={tplId} templateId={tplId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Mobile template button component
const MobileTemplateButton = ({ templateId }) => {
  const { activeTemplate, setActiveTemplate } = useResumeStore();
  const isActive = activeTemplate === templateId;
  
  const templateNames = {
    'celestial': 'Celestial',
    'ats-classic': 'ATS Classic',
    'astralis': 'Astralis',
    'lumina': 'Lumina',
    'zenith': 'Zenith',
    'horizon': 'Horizon',
    'nova': 'Nova'
  };
  
  return (
    <button
      onClick={() => setActiveTemplate(templateId)}
      className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
        isActive 
          ? 'bg-sky-500 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {templateNames[templateId]}
    </button>
  );
};

export default DownloadResumeStep;
