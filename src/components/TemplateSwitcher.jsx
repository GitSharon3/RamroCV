import React from 'react';
import { useResumeStore } from '../store/resumeStore';
import { LayoutTemplate, FileText, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const templates = [
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
    id: 'blue-modern',
    name: 'Blue Modern',
    icon: LayoutTemplate,
    description: 'Professional 2-column design with blue header & photo',
    gradient: 'from-blue-600 to-blue-800',
    badge: 'Photo',
    badgeColor: 'bg-blue-100 text-blue-800',
    preview: (
      <div className="flex gap-1.5">
        <div className="w-12 bg-blue-800 rounded p-1 space-y-1">
          <div className="w-6 h-6 rounded-full bg-blue-400 mx-auto mb-1.5" />
          <div className="h-1 w-full bg-blue-600 rounded" />
          <div className="h-1 w-3/4 bg-blue-600 rounded" />
          <div className="h-1 w-full bg-blue-600 rounded" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="h-1.5 w-3/4 bg-blue-600 rounded" />
          <div className="h-1 w-full bg-gray-200 rounded" />
          <div className="h-1 w-5/6 bg-gray-200 rounded" />
          <div className="h-1.5 w-3/4 bg-blue-600 rounded mt-1" />
          <div className="h-1 w-full bg-gray-200 rounded" />
          <div className="h-1 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>
    ),
  },
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
