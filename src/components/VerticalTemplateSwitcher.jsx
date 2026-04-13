import React from 'react';
import { useResumeStore } from '../store/resumeStore';
import { LayoutTemplate, FileText, Palette, Check } from 'lucide-react';
import { motion } from 'framer-motion';

import temp1 from '../assets/template1.png';
import temp2 from '../assets/template2.png';
import temp3 from '../assets/template3.png';
import temp4 from '../assets/template4.png';
import temp5 from '../assets/template5.png';
import temp6 from '../assets/template6.png';
import temp7 from '../assets/template7.png';

const templates = [
  {
    id: 'celestial',
    name: 'Celestial',
    icon: Palette,
    description: 'Soft neutral tones with refined typography.',
    badge: 'Premium',
    badgeColor: 'bg-amber-100 text-amber-800',
    image: temp1,
  },
  {
    id: 'ats-classic',
    name: 'ATS(Classic)',
    icon: FileText,
    description: 'Machine-readable, ATS-friendly black & white layout.',
    badge: 'ATS',
    badgeColor: 'bg-green-100 text-green-800',
    image: temp7,
  },
  {
    id: 'astralis',
    name: 'Astralis',
    icon: LayoutTemplate,
    description: 'Clean and structured layout.',
    badge: 'Classic',
    badgeColor: 'bg-indigo-100 text-indigo-800',
    image: temp4,
  },
  {
    id: 'lumina',
    name: 'Lumina',
    icon: LayoutTemplate,
    description: 'Modern two-column design with a top photo banner.',
    badge: 'Photo',
    badgeColor: 'bg-orange-100 text-orange-800',
    image: temp3,
  },
  {
    id: 'zenith',
    name: 'Zenith',
    icon: FileText,
    description: 'Elegant single-column with centered typography.',
    badge: 'Executive',
    badgeColor: 'bg-slate-200 text-slate-800',
    image: temp5,
  },
  {
    id: 'horizon',
    name: 'Horizon',
    icon: LayoutTemplate,
    description: 'Striking left sidebar with framed header box.',
    badge: 'Creative',
    badgeColor: 'bg-purple-100 text-purple-800',
    image: temp6,
  },
  {
    id: 'nova',
    name: 'Nova',
    icon: LayoutTemplate,
    description: 'A bold, impactful CV highlighting career moments.',
    badge: 'Bold',
    badgeColor: 'bg-blue-200 text-blue-900',
    image: temp2,
  }
];

const VerticalTemplateSwitcher = () => {
  const { activeTemplate, setActiveTemplate } = useResumeStore();

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">
        Choose Template
      </h3>
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3" style={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }}>
        {templates.map((tpl) => {
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

export default VerticalTemplateSwitcher;
