import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Download as DownloadIcon } from 'lucide-react';
import ResumePreview from '../../components/ResumePreview';

const DownloadResumeStep = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 order-2 lg:order-1">
          <ResumePreview hideTemplateSwitcher={false} initialZoom={0.85} />
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
  );
};

export default DownloadResumeStep;
