import React from 'react';
import { useResumeStore } from '../store/resumeStore';
import { LayoutTemplate, FileText, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const templates = [
  {
    id: 'celestial',
    name: 'Celestial',
    icon: Palette,
    description: 'Soft neutral tones with refined typography for a sophisticated and professional feel.',
    gradient: 'from-[#f7f5f0] to-[#e8e4d8]',
    badge: 'Premium',
    badgeColor: 'bg-amber-100 text-amber-800',
    preview: (
      <div className="flex gap-1.5 h-full">
        <div className="w-12 bg-[#e8e4d8] rounded p-1 space-y-1">
          <div className="h-1.5 w-3/4 bg-[#8c7e6a] rounded mx-auto mb-1.5" />
          <div className="h-1 w-full bg-[#8c7e6a]/40 rounded" />
          <div className="h-1 w-5/6 bg-[#8c7e6a]/40 rounded" />
        </div>
        <div className="flex-1 space-y-1 pt-1">
          <div className="h-1 w-full bg-gray-200 rounded" />
          <div className="h-1 w-3/4 bg-gray-200 rounded" />
          <div className="h-1.5 w-1/2 bg-[#8c7e6a]/60 rounded mt-1.5" />
          <div className="h-1 w-full bg-gray-100 rounded" />
          <div className="h-1 w-5/6 bg-gray-100 rounded" />
        </div>
      </div>
    ),
  },
  {
    id: 'ats-classic',
    name: 'ATS Classic',
    icon: FileText,
    description: 'Machine-readable, ATS-friendly black & white layout',
    gradient: 'from-gray-700 to-gray-900',
    badge: 'ATS',
    badgeColor: 'bg-green-100 text-green-800',
    preview: (
      <div className="space-y-1">
        <div className="h-2.5 w-24 bg-gray-800 rounded mb-2 mx-auto" />
        <div className="h-1.5 w-32 bg-gray-400 rounded mx-auto mb-1" />
        <div className="border-t border-gray-400 my-1.5 w-full" />
        <div className="h-1.5 w-16 bg-gray-700 rounded mb-1" />
        <div className="h-1 w-full bg-gray-200 rounded" />
        <div className="h-1 w-5/6 bg-gray-200 rounded" />
        <div className="border-t border-gray-400 my-1.5 w-full" />
        <div className="h-1.5 w-16 bg-gray-700 rounded mb-1" />
        <div className="h-1 w-full bg-gray-200 rounded" />
        <div className="h-1 w-4/6 bg-gray-200 rounded" />
      </div>
    ),
  },
  {
    id: 'astralis',
    name: 'Astralis',
    icon: LayoutTemplate,
    description: 'A modern and professional resume template with a clean and structured layout.',
    gradient: 'from-indigo-100 to-white',
    badge: 'Classic',
    badgeColor: 'bg-indigo-100 text-indigo-800',
    preview: (
      <div className="space-y-1 pb-1 flex flex-col items-center w-full">
        <div className="h-1.5 w-20 bg-gray-800 rounded mb-0.5" />
        <div className="h-1 w-12 bg-gray-500 rounded mb-1" />
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="w-full bg-gray-100 h-1.5 mt-1" />
        <div className="w-full h-1 mt-0.5 flex items-center justify-between px-1">
           <div className="w-1/3 border-b-[1px] border-dotted border-gray-400"></div>
           <div className="w-1/3 border-b-[1px] border-dotted border-gray-400 ml-1"></div>
        </div>
        <div className="w-full bg-gray-100 h-1.5 mt-1" />
        <div className="w-full h-1 mt-0.5 flex items-center justify-between px-1">
           <div className="w-1/3 border-b-[1px] border-dotted border-gray-400"></div>
           <div className="w-1/3 border-b-[1px] border-dotted border-gray-400 ml-1"></div>
        </div>
      </div>
    ),
  },
  {
    id: 'lumina',
    name: 'Lumina',
    icon: LayoutTemplate,
    description: 'Modern two-column design with a top photo banner.',
    gradient: 'from-orange-50 to-orange-100',
    badge: 'Photo',
    badgeColor: 'bg-orange-100 text-orange-800',
    preview: (
      <div className="space-y-1">
        <div className="h-4 w-full bg-orange-200 rounded-sm mb-1 flex items-center justify-between px-1">
           <div className="h-2 w-2 rounded-sm bg-orange-300"></div>
           <div className="h-2 w-8 rounded-sm bg-orange-300"></div>
        </div>
        <div className="flex gap-1.5">
          <div className="w-1/3">
             <div className="h-1 w-full bg-gray-200 rounded mb-0.5"></div>
             <div className="h-1 w-full bg-gray-200 rounded mb-0.5"></div>
             <div className="h-1 w-3/4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-2/3 border-l border-gray-100 pl-1.5">
             <div className="h-1 w-full bg-gray-300 rounded mb-0.5"></div>
             <div className="h-1 w-full bg-gray-300 rounded mb-0.5"></div>
             <div className="h-1 w-5/6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'zenith',
    name: 'Zenith',
    icon: FileText,
    description: 'Elegant single-column with centered typography.',
    gradient: 'from-slate-100 to-slate-200',
    badge: 'Executive',
    badgeColor: 'bg-slate-200 text-slate-800',
    preview: (
      <div className="space-y-1 flex flex-col items-center">
        <div className="h-1 w-12 bg-gray-400 rounded mt-0.5 mb-0.5"></div>
        <div className="h-1.5 w-20 bg-gray-800 rounded mb-0.5"></div>
        <div className="h-1 w-16 bg-gray-400 rounded mb-1"></div>
        <div className="w-full border-b border-dotted border-gray-400 mb-1"></div>
        <div className="w-full">
           <div className="h-1 w-full bg-gray-200 rounded mb-0.5"></div>
           <div className="h-1 w-full bg-gray-200 rounded mb-0.5"></div>
           <div className="h-1 w-5/6 bg-gray-200 rounded mb-0.5"></div>
        </div>
      </div>
    ),
  },
  {
    id: 'horizon',
    name: 'Horizon',
    icon: LayoutTemplate,
    description: 'Striking left sidebar with framed header box.',
    gradient: 'from-gray-100 to-gray-200',
    badge: 'Creative',
    badgeColor: 'bg-purple-100 text-purple-800',
    preview: (
      <div className="flex gap-0 h-[60px] overflow-hidden rounded relative">
        <div className="w-1/3 bg-gray-200 p-1 flex flex-col gap-1">
          <div className="h-1 w-3/4 bg-gray-400 rounded mt-4"></div>
          <div className="h-1 w-full bg-gray-300 rounded"></div>
        </div>
        <div className="w-2/3 bg-white p-1 pt-6 flex flex-col gap-1 relative">
           <div className="absolute top-2 left-2 right-2 border border-gray-400 h-6 flex flex-col items-center justify-center bg-white z-10">
              <div className="h-1 w-12 bg-gray-800 rounded mb-0.5"></div>
              <div className="h-0.5 w-8 bg-gray-500 rounded"></div>
           </div>
           <div className="h-1 w-full bg-gray-200 rounded"></div>
           <div className="h-1 w-5/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    ),
  },
  {
    id: 'nova',
    name: 'Nova',
    icon: LayoutTemplate,
    description: 'A bold, impactful CV highlighting career moments.',
    gradient: 'from-blue-50 to-blue-100',
    badge: 'Bold',
    badgeColor: 'bg-blue-200 text-blue-900',
    preview: (
      <div className="flex gap-0 h-[60px] overflow-hidden rounded relative bg-white">
        <div className="w-1/3 bg-gray-200 p-1 flex flex-col items-center gap-1 pt-2">
          <div className="h-4 w-4 bg-gray-400 rounded-full mb-1"></div>
          <div className="h-1 w-full bg-gray-300 rounded"></div>
        </div>
        <div className="w-2/3 bg-white p-1 pt-2 flex flex-col gap-1">
           <div className="h-1.5 w-16 bg-gray-900 rounded mb-0.5"></div>
           <div className="h-1 w-full bg-gray-200 rounded"></div>
           <div className="h-1 w-5/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    ),
  },
  {
    id: 'ats',
    name: 'ATS',
    icon: FileText,
    description: 'A simple resume with an organized, neat design.',
    gradient: 'from-gray-100 to-gray-200',
    badge: 'Simple',
    badgeColor: 'bg-gray-200 text-gray-800',
    preview: (
      <div className="space-y-1 flex flex-col p-1">
        <div className="h-1.5 w-16 bg-gray-900 rounded mb-0.5"></div>
        <div className="h-1 w-12 bg-gray-600 rounded mb-0.5"></div>
        <div className="w-full border-b-[2px] border-double border-gray-600 mb-1"></div>
        <div className="w-full">
           <div className="h-1 w-full bg-gray-200 rounded mb-0.5"></div>
           <div className="h-1 w-5/6 bg-gray-200 rounded mb-0.5"></div>
           <div className="h-1 w-3/4 bg-gray-200 rounded mb-0.5"></div>
        </div>
      </div>
    ),
  }
];
const TemplateSwitcher = () => {
  const { activeTemplate, setActiveTemplate } = useResumeStore();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Choose Template</h3>
      <div className="grid grid-cols-1 gap-3">
        {templates.map((tpl) => {
          const isActive = activeTemplate === tpl.id;
          return (
            <motion.button
              key={tpl.id}
              onClick={() => setActiveTemplate(tpl.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative w-full text-left rounded-xl border-2 overflow-hidden transition-all ${
                isActive
                  ? 'border-sky-500 shadow-md shadow-sky-100'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Mini preview */}
              <div className={`p-4 bg-gradient-to-br ${tpl.gradient} opacity-10 absolute inset-0`} />
              <div className="relative p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <tpl.icon size={16} className={isActive ? 'text-sky-500' : 'text-gray-500'} />
                      <span className={`font-semibold text-sm ${isActive ? 'text-sky-600' : 'text-gray-800'}`}>
                        {tpl.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{tpl.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tpl.badgeColor}`}>
                    {tpl.badge}
                  </span>
                </div>
                {/* Mini Preview Render */}
                <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm">
                  {tpl.preview}
                </div>
              </div>
              {isActive && (
                <motion.div
                  layoutId="templateActive"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500"
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
