import { useResumeStore } from '../../store/resumeStore';
import { Download, Share2, Check, ZoomIn, ZoomOut } from 'lucide-react';
import { downloadPDF, generateShareableLink } from '../../utils/resumeUtils';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ATSClassic from '../../templates/ATSClassic';
import Astralis from '../../templates/Astralis';
import Celestial from '../../templates/Celestial';
import Lumina from '../../templates/Lumina';
import Zenith from '../../templates/Zenith';
import Horizon from '../../templates/Horizon';
import Nova from '../../templates/Nova';
import { TemplateSwitcher } from '../builder/BuilderUI';

const ResumePreview = ({ hideTemplateSwitcher, hideActionBar, initialZoom = 0.75 }) => {
  const { activeTemplate, sectionOrder, personalInfo, education, experience, skills, projects, additionalSections } = useResumeStore();
  const [showCopied, setShowCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [zoom, setZoom] = useState(initialZoom);
  const [responsiveScale, setResponsiveScale] = useState(1);
  const containerRef = useRef(null);

  // Calculate responsive scale based on container width
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const resumeWidth = 210 * 3.7795275591; // 210mm in pixels (1mm = 3.7795px)
      const padding = window.innerWidth < 640 ? 16 : 48; // Less padding on mobile
      const availableWidth = containerWidth - padding;
      const scale = Math.min(1, availableWidth / resumeWidth);
      setResponsiveScale(Math.max(scale, 0.35)); // Minimum scale of 0.35
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    // Also calculate after a short delay to ensure container is rendered
    const timeout = setTimeout(calculateScale, 100);
    return () => {
      window.removeEventListener('resize', calculateScale);
      clearTimeout(timeout);
    };
  }, [hideActionBar]); // Recalculate when hideActionBar changes

  const resumeData = { personalInfo, education, experience, skills, projects, additionalSections, sectionOrder };

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
    const link = generateShareableLink({ personalInfo, education, experience, skills, projects, additionalSections, activeTemplate });
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

  const TemplateComponent = {
    'celestial': Celestial,
    'ats-classic': ATSClassic,
    'astralis': Astralis,
    'lumina': Lumina,
    'zenith': Zenith,
    'horizon': Horizon,
    'nova': Nova
  }[activeTemplate] || Celestial;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Template Switcher */}
      {!hideTemplateSwitcher && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <TemplateSwitcher />
        </div>
      )}

      {/* Action Bar */}
      {!hideActionBar && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              id="download-pdf-btn"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all font-medium text-sm disabled:opacity-50 shadow-sm shadow-sky-200"
            >
              <motion.div animate={isDownloading ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 1, repeat: isDownloading ? Infinity : 0, ease: 'linear' }}>
                <Download size={16} />
              </motion.div>
              {isDownloading ? 'Generating PDF…' : 'Download PDF'}
            </button>

            <button onClick={handleShare} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">
              <AnimatePresence mode="wait">
                {showCopied ? (
                  <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={16} className="text-green-600" /></motion.span>
                ) : (
                  <motion.span key="share" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Share2 size={16} /></motion.span>
                )}
              </AnimatePresence>
              {showCopied ? 'Copied!' : 'Share'}
            </button>

            <div className="flex items-center gap-1 border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={zoomOut} className="px-2 py-2.5 hover:bg-gray-100 transition-colors text-gray-600"><ZoomOut size={14} /></button>
              <span className="text-xs text-gray-500 px-1 tabular-nums w-10 text-center">{Math.round(zoom * 100)}%</span>
              <button onClick={zoomIn} className="px-2 py-2.5 hover:bg-gray-100 transition-colors text-gray-600"><ZoomIn size={14} /></button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Preview Canvas */}
      <div 
        ref={containerRef} 
        className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-auto flex-1 relative custom-scrollbar"
        style={{ minHeight: hideActionBar ? '350px' : '250px' }}
      >
        <div className="flex justify-center items-start min-h-full p-4 sm:p-8 relative">
          {/* The constraint wrapper that solves the flex-centering transform bug */ }
          <div
            style={{
               width: `${210 * 3.7795275591 * (hideActionBar ? responsiveScale : zoom)}px`,
               height: `${297 * 3.7795275591 * (hideActionBar ? responsiveScale : zoom)}px`,
               transition: 'width 0.2s ease, height 0.2s ease',
               flexShrink: 0,
               position: 'relative'
            }}
          >
            <div
              style={{
                transform: `scale(${hideActionBar ? responsiveScale : zoom})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
                willChange: 'transform'
              }}
            >
              <motion.div
                layout
                id="resume-preview"
                className="resume-preview-export"
                style={{
                  width: '210mm',
                  minWidth: '210mm',
                  maxWidth: '210mm',
                  minHeight: '297mm',
                  backgroundColor: 'white',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeTemplate}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TemplateComponent {...resumeData} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
