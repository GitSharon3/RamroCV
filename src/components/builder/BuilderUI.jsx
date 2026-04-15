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
import { motion } from 'framer-motion';

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
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-sky-500 text-white ring-4 ring-sky-100 shadow-md scale-110'
                      : isCompleted
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 text-gray-400 border border-gray-200'
                  }`}
                >
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : step.id}
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold transition-colors duration-300 whitespace-nowrap ${
                    isActive ? 'text-gray-900 font-bold' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
              </button>

              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-gray-200 min-w-[20px] sm:min-w-[40px]">
                  <div
                    className="h-full bg-sky-500 transition-all duration-500"
                    style={{ width: isCompleted ? '100%' : '0%' }}
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
 * TemplateSwitcher Component (Grid View)
 */
export const TemplateSwitcher = () => {
  const { activeTemplate, setActiveTemplate } = useResumeStore();

  return (
    <div className="template-switcher">
      <div className="template-switcher__grid">
        {TEMPLATES.map((tpl) => {
          const isActive = activeTemplate === tpl.id;
          return (
            <motion.button
              key={tpl.id}
              onClick={() => setActiveTemplate(tpl.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`template-card ${isActive ? 'template-card--active' : ''}`}
            >
              <div className="template-card__preview">
                 <img 
                   src={tpl.image} 
                   alt={tpl.name} 
                   className="template-card__image" 
                 />
                 <div className="template-card__overlay">
                    <span className="template-card__selected-text">Selected</span>
                 </div>
              </div>
              
              <div className="template-card__info">
                <div className="template-card__header">
                  <div className="template-card__name-wrapper">
                    <tpl.icon 
                      size={16} 
                      className={`template-card__icon ${isActive ? 'template-card__icon--active' : ''}`} 
                    />
                    <span className={`template-card__name ${isActive ? 'template-card__name--active' : ''}`}>
                      {tpl.name}
                    </span>
                  </div>
                  {tpl.badge && (
                    <span className={`template-card__badge ${tpl.badgeColor}`}>
                      {tpl.badge}
                    </span>
                  )}
                </div>
                <p className="template-card__description">{tpl.description}</p>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="templateActive"
                  className="template-card__active-indicator"
                />
              )}
            </motion.button>
          );
        })}
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
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">
        Choose Template
      </h3>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3" style={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }}>
        {TEMPLATES.map((tpl) => {
          const isActive = activeTemplate === tpl.id;
          return (
            <motion.button
              key={tpl.id}
              onClick={() => setActiveTemplate(tpl.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left rounded-xl border-2 overflow-hidden transition-all ${
                isActive
                  ? 'border-sky-500 shadow-md shadow-sky-100'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              } bg-white`}
            >
              <div className="relative h-32 w-full bg-gray-50 overflow-hidden">
                <img 
                  src={tpl.image} 
                  alt={tpl.name} 
                  className="w-full h-full object-cover object-top" 
                />
                {isActive && (
                  <div className="absolute inset-0 bg-sky-500/20 flex items-center justify-center">
                    <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center shadow-lg">
                      <Check size={16} className="text-white" strokeWidth={3} />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold text-sm ${isActive ? 'text-sky-600' : 'text-gray-900'}`}>
                    {tpl.name}
                  </span>
                  <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-bold ${tpl.badgeColor}`}>
                    {tpl.badge}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{tpl.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
