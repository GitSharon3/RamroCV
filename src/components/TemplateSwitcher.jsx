import React from 'react';
import { useResumeStore } from '../store/resumeStore';
import { LayoutTemplate, FileText, Palette, ArrowRight } from 'lucide-react';
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
    gradient: 'from-[#f7f5f0] to-[#e8e4d8]',
    badge: 'Premium',
    badgeColor: 'bg-amber-100 text-amber-800',
    image: temp1,
  },
  {
    id: 'ats-classic',
    name: 'ATS(Classic)',
    icon: FileText,
    description: 'Machine-readable, ATS-friendly black & white layout.',
    gradient: 'from-gray-700 to-gray-900',
    badge: 'ATS',
    badgeColor: 'bg-green-100 text-green-800',
    image: temp7,
  },
  {
    id: 'astralis',
    name: 'Astralis',
    icon: LayoutTemplate,
    description: 'Clean and structured layout.',
    gradient: 'from-indigo-100 to-white',
    badge: 'Classic',
    badgeColor: 'bg-indigo-100 text-indigo-800',
    image: temp3,
  },
  {
    id: 'lumina',
    name: 'Lumina',
    icon: LayoutTemplate,
    description: 'Modern two-column design with a top photo banner.',
    gradient: 'from-orange-50 to-orange-100',
    badge: 'Photo',
    badgeColor: 'bg-orange-100 text-orange-800',
    image: temp4,
  },
  {
    id: 'zenith',
    name: 'Zenith',
    icon: FileText,
    description: 'Elegant single-column with centered typography.',
    gradient: 'from-slate-100 to-slate-200',
    badge: 'Executive',
    badgeColor: 'bg-slate-200 text-slate-800',
    image: temp5,
  },
  {
    id: 'horizon',
    name: 'Horizon',
    icon: LayoutTemplate,
    description: 'Striking left sidebar with framed header box.',
    gradient: 'from-gray-100 to-gray-200',
    badge: 'Creative',
    badgeColor: 'bg-purple-100 text-purple-800',
    image: temp6,
  },
  {
    id: 'nova',
    name: 'Nova',
    icon: LayoutTemplate,
    description: 'A bold, impactful CV highlighting career moments.',
    gradient: 'from-blue-50 to-blue-100',
    badge: 'Bold',
    badgeColor: 'bg-blue-200 text-blue-900',
    image: temp2,
  }
];

const TemplateSwitcher = ({ showNextButton, onNext }) => {
  const { activeTemplate, setActiveTemplate } = useResumeStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Choose Template</h3>
        {showNextButton && activeTemplate && (
          <button 
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-bold hover:bg-sky-600 transition-colors shadow-sm shadow-sky-200"
          >
            Next: Enter Details
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
        {templates.map((tpl) => {
          const isActive = activeTemplate === tpl.id;
          return (
            <motion.button
              key={tpl.id}
              onClick={() => setActiveTemplate(tpl.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex-shrink-0 w-64 text-left rounded-2xl border-2 overflow-hidden transition-all snap-center ${
                isActive
                  ? 'border-sky-500 shadow-lg shadow-sky-100'
                  : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
              } bg-white flex flex-col`}
            >
              <div className="relative h-[320px] w-full bg-gray-50 border-b border-gray-100 overflow-hidden flex-shrink-0">
                 <img src={tpl.image} alt={tpl.name} className="w-full h-[320px] object-cover object-top" />
                 <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-4 transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-white font-bold text-sm tracking-wide">Selected</span>
                 </div>
              </div>
              
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <tpl.icon size={16} className={isActive ? 'text-sky-500' : 'text-gray-500'} />
                    <span className={`font-bold text-sm ${isActive ? 'text-sky-600' : 'text-gray-900'}`}>
                      {tpl.name}
                    </span>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${tpl.badgeColor}`}>
                    {tpl.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{tpl.description}</p>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="templateActive"
                  className="absolute top-0 left-0 right-0 h-1 bg-sky-500"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSwitcher;
