import { useResumeStore } from '../store/resumeStore';
import { Download, Share2, Check, ZoomIn, ZoomOut } from 'lucide-react';
import { downloadPDF, generateShareableLink } from '../utils/pdfExport';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ATSClassic from '../templates/ATSClassic';
import BlueModern from '../templates/BlueModern';
import TemplateSwitcher from './TemplateSwitcher';

const ResumePreview = () => {
  const { activeTemplate, sectionOrder, personalInfo, education, experience, skills, projects, hobbies } = useResumeStore();
  const [showCopied, setShowCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [zoom, setZoom] = useState(0.75);

  const resumeData = { personalInfo, education, experience, skills, projects, hobbies, sectionOrder };

  const handleDownload = async () => {
    setIsDownloading(true);
    // Temporarily set zoom to 1 for capture
    const prevZoom = zoom;
    setZoom(1);
    await new Promise(r => setTimeout(r, 200));
    await downloadPDF('resume-preview', `${personalInfo.firstName || 'my'}-resume.pdf`);
    setZoom(prevZoom);
    setIsDownloading(false);
  };

  const handleShare = async () => {
    const link = generateShareableLink({ personalInfo, education, experience, skills, projects, hobbies, activeTemplate });
    try {
      await navigator.clipboard.writeText(link);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2500);
    } catch {
      prompt('Copy this link:', link);
    }
  };

  const zoomIn = () => setZoom(z => Math.min(z + 0.1, 1.2));
  const zoomOut = () => setZoom(z => Math.max(z - 0.1, 0.4));

  const TemplateComponent = activeTemplate === 'ats-classic' ? ATSClassic : BlueModern;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Template Switcher */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <TemplateSwitcher />
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            id="download-pdf-btn"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all font-medium text-sm disabled:opacity-50 shadow-sm shadow-sky-200"
          >
            <motion.div
              animate={isDownloading ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, repeat: isDownloading ? Infinity : 0, ease: 'linear' }}
            >
              <Download size={16} />
            </motion.div>
            {isDownloading ? 'Generating PDF…' : 'Download PDF'}
          </button>

          <button
            onClick={handleShare}
            id="share-link-btn"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            <AnimatePresence mode="wait">
              {showCopied ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check size={16} className="text-green-600" />
                </motion.span>
              ) : (
                <motion.span key="share" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Share2 size={16} />
                </motion.span>
              )}
            </AnimatePresence>
            {showCopied ? 'Copied!' : 'Share'}
          </button>

          {/* Zoom */}
          <div className="flex items-center gap-1 border border-gray-200 rounded-xl overflow-hidden">
            <button onClick={zoomOut} className="px-2 py-2.5 hover:bg-gray-100 transition-colors text-gray-600" title="Zoom out">
              <ZoomOut size={14} />
            </button>
            <span className="text-xs text-gray-500 px-1 tabular-nums w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={zoomIn} className="px-2 py-2.5 hover:bg-gray-100 transition-colors text-gray-600" title="Zoom in">
              <ZoomIn size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Resume Preview Canvas */}
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-auto flex-1"
        style={{ minHeight: '600px', maxHeight: 'calc(100vh - 320px)' }}>
        <div className="flex justify-center py-8 px-4">
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              width: '210mm',
              boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: zoom < 1 ? `calc((1 - ${zoom}) * -297mm)` : 0,
            }}
          >
            <TemplateComponent {...resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
