import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';
import TemplateSwitcher from '../../components/TemplateSwitcher';
import { useNavigate } from 'react-router-dom';
import LatexImporter from '../../components/LatexImporter';

const ChooseTemplateStep = () => {
  const [stepOneTab, setStepOneTab] = useState('template');
  const { loadSampleData } = useResumeStore();
  const navigate = useNavigate();

  return (
    <motion.div
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
             onClick={() => navigate('/builder/details')}
             className="text-sky-500 font-bold hover:underline"
           >
             Skip and choose later
           </button>
        </div>

        {/* --- Content Area --- */}
        <div className="min-h-[450px]">
          {stepOneTab === 'template' ? (
            <motion.div 
              key="template-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-100/50 max-w-5xl mx-auto text-left"
            >
               <TemplateSwitcher showNextButton={true} onNext={() => navigate('/builder/details')} />
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
                  <LatexImporter onImported={() => navigate('/builder/details')} />
                  <p className="text-[10px] text-gray-400 mt-4 text-center">
                     Import your existing LaTeX code to auto-populate the data.
                  </p>
               </div>
               <div className="mt-8">
                  <p className="text-xs text-gray-400 mb-4 italic">Or start with sample data to see how it works</p>
                  <button 
                    onClick={() => { loadSampleData(); navigate('/builder/details'); }}
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
  );
};

export default ChooseTemplateStep;
