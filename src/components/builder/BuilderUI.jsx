import React from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  LayoutTemplate, 
  FileText, 
  Palette, 
  ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Asset imports for templates
import temp1 from '../../assets/template1.png';
import temp2 from '../../assets/template2.png';
import temp3 from '../../assets/template3.png';
import temp4 from '../../assets/template4.png';
import temp5 from '../../assets/template5.png';
import temp6 from '../../assets/template6.png';
import temp7 from '../../assets/template7.png';

/**
 * Shared Template Configuration
 */
export const TEMPLATES = [
  {
    id: 'ats-classic',
    name: 'ATS(Classic)',
    icon: FileText,
    description: 'Professional monochrome layout, optimized for stability.',
    badge: 'Modern',
    badgeColor: 'bg-green-100 text-green-800',
    image: temp4,
  },
  {
    id: 'horizon',
    name: 'Horizon',
    icon: LayoutTemplate,
    description: 'Minimalist framed header with clean sections.',
    badge: 'Safe',
    badgeColor: 'bg-sky-100 text-sky-800',
    image: temp5,
  },
  {
    id: 'nova',
    name: 'Nova',
    icon: LayoutTemplate,
    description: 'Bold impact CV with integrated profile photography.',
    badge: 'Bold',
    badgeColor: 'bg-rose-100 text-rose-800',
    image: temp6,
  },
  {
    id: 'celestial',
    name: 'Celestial',
    icon: Palette,
    description: 'Soft neutral tones with refined sidebar typography.',
    badge: 'Premium',
    badgeColor: 'bg-amber-100 text-amber-800',
    image: temp1,
  },
  {
    id: 'lumina',
    name: 'Lumina',
    icon: LayoutTemplate,
    description: 'Modern two-column design with a top photo banner.',
    badge: 'Creative',
    badgeColor: 'bg-orange-100 text-orange-800',
    image: temp3,
  },
  {
    id: 'astralis',
    name: 'Astralis',
    icon: FileText,
    description: 'High readability, machine-friendly black & white layout.',
    badge: 'ATS',
    badgeColor: 'bg-indigo-100 text-indigo-800',
    image: temp7,
  },
  {
    id: 'zenith',
    name: 'Zenith',
    icon: FileText,
    description: 'Elegant single-column with centered typography and lines.',
    badge: 'Executive',
    badgeColor: 'bg-slate-200 text-slate-800',
    image: temp2,
  }
];

/**
 * StepIndicator Component
 */
export const StepIndicator = () => {
  const { wizardStep } = useResumeStore();
  const navigate = useNavigate();

  const steps = [
    { id: 1, name: 'Choose template', path: '/builder/choose' },
    { id: 2, name: 'Enter your details', path: '/builder/details' },
    { id: 3, name: 'Download resume', path: '/builder/download' },
  ];

  return (
    <div className="w-full flex justify-center py-6 sm:py-10 bg-white">
      <div className="flex items-center gap-2 sm:gap-4 max-w-2xl w-full px-4">
        {steps.map((step, index) => {
          const isActive = wizardStep === step.id;
          const isCompleted = wizardStep > step.id;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => (isCompleted || isActive) && navigate(step.path)}
                className="flex items-center gap-2 group outline-none"
                disabled={!isCompleted && !isActive}
              >
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isActive || isCompleted ? '#0ea5e9' : '#f3f4f6',
                    color: isActive || isCompleted ? '#ffffff' : '#9ca3af',
                    borderColor: isActive ? 'transparent' : isCompleted ? '#0ea5e9' : '#e5e7eb'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold border ${isActive ? 'ring-4 ring-sky-100 shadow-md' : ''}`}
                >
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={16} strokeWidth={3} /></motion.div>
                  ) : step.id}
                </motion.div>
                <span
                  className={`text-[10px] sm:text-sm transition-colors duration-300 whitespace-nowrap ${isActive ? 'block' : 'hidden sm:block'} ${
                    isActive ? 'text-gray-900 font-bold' : isCompleted ? 'text-gray-700 font-semibold' : 'text-gray-400 font-semibold'
                  }`}
                >
                  {step.name}
                </span>
              </button>

              {index < steps.length - 1 && (
                <div className="flex-1 h-1 bg-gray-100 rounded-full min-w-[20px] sm:min-w-[40px] relative overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-sky-500 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

/**
 * TemplateSwitcher Component (Carousel View)
 */
export const TemplateSwitcher = () => {
  const { activeTemplate, setActiveTemplate } = useResumeStore();

  return (
    <div className="w-full relative overflow-hidden group py-8">
      <div 
        className="flex overflow-x-auto gap-10 sm:gap-12 pb-12 pt-8 px-8 sm:px-12 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {TEMPLATES.map((tpl) => {
          const isActive = activeTemplate === tpl.id;
          return (
            <motion.button
              key={tpl.id}
              onClick={() => setActiveTemplate(tpl.id)}
              animate={{
                scale: isActive ? 1.02 : 1,
                opacity: isActive ? 1 : 0.8
              }}
              whileHover={{ scale: 1.02, y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex-shrink-0 w-80 sm:w-96 rounded-3xl border-[3px] transition-all duration-300 snap-center focus:outline-none text-left flex flex-col items-center overflow-hidden
                ${isActive ? 'border-sky-500 shadow-2xl shadow-sky-200/60 bg-white z-10 ring-4 ring-sky-100' : 'border-sky-100 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100/40 bg-white'}`}
            >
              <div className={`relative w-full h-[420px] sm:h-[480px] rounded-t-3xl overflow-hidden ${isActive ? 'bg-sky-50' : 'bg-gradient-to-b from-sky-50 to-blue-50'}`}>
                 <motion.img 
                   src={tpl.image} 
                   alt={tpl.name} 
                   className="w-full h-full object-contain object-center p-4"
                   whileHover={{ scale: 1.03 }}
                   transition={{ duration: 0.3 }}
                 />
                 <AnimatePresence>
                   {isActive && (
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-sky-500/20 to-transparent flex items-start justify-end p-5"
                     >
                        <motion.div 
                          initial={{ scale: 0, y: -10 }}
                          animate={{ scale: 1, y: 0 }}
                          className="bg-sky-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5"
                        >
                          <Check size={14} strokeWidth={3} /> Selected
                        </motion.div>
                     </motion.div>
                   )}
                 </AnimatePresence>
                 
                 {/* Hover overlay for non-active cards */}
                 {!isActive && (
                   <motion.div
                     initial={{ opacity: 0 }}
                     whileHover={{ opacity: 1 }}
                     className="absolute inset-0 bg-sky-500/10 flex items-center justify-center"
                   >
                     <span className="bg-white/90 text-sky-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                       Click to Select
                     </span>
                   </motion.div>
                 )}
              </div>
              
              <div className="w-full p-5 bg-white rounded-b-3xl flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-sky-100 text-sky-600' : 'bg-sky-50 text-sky-400'}`}>
                      <tpl.icon size={18} />
                    </div>
                    <span className={`font-bold text-lg ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                      {tpl.name}
                    </span>
                  </div>
                  {tpl.badge && (
                    <span className={`text-[11px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${tpl.badgeColor}`}>
                      {tpl.badge}
                    </span>
                  )}
                </div>
                <p className={`text-sm leading-relaxed ${isActive ? 'text-slate-600' : 'text-slate-500'}`}>{tpl.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
      
      {/* Scroll Hint overlay - Baby blue themed */}
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-sky-50/90 to-transparent pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-sky-50/90 to-transparent pointer-events-none" />
      
      <div className="absolute bottom-2 w-full text-center text-sm font-semibold tracking-widest uppercase text-sky-400 flex items-center justify-center gap-2">
        <ArrowRight size={16} className="animate-pulse" /> Swipe to explore templates
      </div>
    </div>
  );
};

/**
 * VerticalTemplateSwitcher Component (Sidebar View)
 */
export const VerticalTemplateSwitcher = () => {
  const { activeTemplate, setActiveTemplate } = useResumeStore();

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-4 px-2">
        Choose Template
      </h3>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-4" style={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }}>
        {TEMPLATES.map((tpl) => {
          const isActive = activeTemplate === tpl.id;
          return (
            <motion.button
              key={tpl.id}
              onClick={() => setActiveTemplate(tpl.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left rounded-2xl border-[3px] overflow-hidden transition-all ${
                isActive
                  ? 'border-sky-500 shadow-lg shadow-sky-200/50 ring-2 ring-sky-100'
                  : 'border-sky-100 hover:border-sky-300 hover:shadow-md hover:shadow-sky-100/30'
              } bg-white`}
            >
              <div className={`relative h-36 w-full overflow-hidden ${isActive ? 'bg-sky-50' : 'bg-gradient-to-b from-sky-50 to-white'}`}>
                <img 
                  src={tpl.image} 
                  alt={tpl.name} 
                  className="w-full h-full object-contain object-top p-2" 
                />
                {isActive && (
                  <div className="absolute inset-0 bg-sky-500/10 flex items-center justify-center">
                    <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center shadow-xl">
                      <Check size={20} className="text-white" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-bold text-sm ${isActive ? 'text-sky-600' : 'text-slate-700'}`}>
                    {tpl.name}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-bold ${tpl.badgeColor}`}>
                    {tpl.badge}
                  </span>
                </div>
                <p className={`text-xs line-clamp-2 leading-relaxed ${isActive ? 'text-slate-600' : 'text-slate-500'}`}>{tpl.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
