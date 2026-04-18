import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, GripVertical, Code2, User, Briefcase, GraduationCap, 
  Wrench, FolderOpen, PlusCircle, FileText, ArrowRight, Mail, Phone, 
  MapPin, Link as LinkIcon, Sparkles, Trash2, Plus, X, Building, 
  Calendar, Info, School, Star, Tag, Folder, Code, ExternalLink, 
  Upload, Camera, Eye, EyeOff, CheckCircle2, Download
} from 'lucide-react';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, 
  useSensor, useSensors,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, 
  verticalListSortingStrategy, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResumeStore } from '../../../store/resumeStore';
import { downloadPDF } from '../../../utils/resumeUtils';
import { parseLatex } from '../../../utils/latexParser';

const SECTION_TYPES = [
  { id: 'languages', label: 'Languages' },
  { id: 'certifications', label: 'Certifications and licenses' },
  { id: 'awards', label: 'Awards and honors' },
  { id: 'websites', label: 'Websites and social media' },
  { id: 'references', label: 'References' },
  { id: 'hobbies', label: 'Hobbies and interests' },
  { id: 'custom', label: 'Custom section' },
];

import { ImageUploader } from './ImageUploader';

export const PersonalInfo = () => {
  const { 
    personalInfo, 
    updatePersonalInfo, 
    loadSampleData, 
    clearAllData, 
    addSocialLink, 
    removeSocialLink, 
    updateSocialLink 
  } = useResumeStore();

  const fields = [
    { name: 'firstName', label: 'First Name', icon: User, placeholder: 'Jane', col: 1 },
    { name: 'lastName', label: 'Last Name', icon: User, placeholder: 'Smith', col: 1 },
    { name: 'title', label: 'Professional Title', icon: FileText, placeholder: 'Senior Software Engineer', col: 2 },
    { name: 'email', label: 'Email', icon: Mail, placeholder: 'jane@example.com', col: 1 },
    { name: 'phone', label: 'Phone', icon: Phone, placeholder: '+1 (555) 000-1234', col: 1 },
    { name: 'city', label: 'City', icon: MapPin, placeholder: 'San Francisco', col: 1 },
    { name: 'country', label: 'Country', icon: MapPin, placeholder: 'USA', col: 1 },
  ];

  return (
    <div className="space-y-5 pt-2">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={loadSampleData}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-xs font-semibold"
        >
          <Sparkles size={13} /> Load Sample
        </button>
        <button
          onClick={clearAllData}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-semibold"
        >
          <Trash2 size={13} /> Clear All
        </button>
      </div>

      <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50">
        <ImageUploader />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map((field) => (
          <div key={field.name} className={`relative ${field.col === 2 ? 'col-span-2' : ''}`}>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
            <div className="relative">
              <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
              <input
                type="text"
                value={personalInfo[field.name] || ''}
                onChange={(e) => updatePersonalInfo(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white transition-all"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
            <LinkIcon size={14} className="text-blue-500" /> Social Media (Max 3)
          </label>
          {(personalInfo.socialLinks || []).length < 3 && (
            <button
              onClick={addSocialLink}
              className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase"
            >
              <Plus size={12} /> Add Platform
            </button>
          )}
        </div>

        <div className="space-y-3">
          {(personalInfo.socialLinks || []).map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end bg-gray-50/50 p-3 rounded-xl border border-gray-100 relative group"
            >
              <div className="sm:col-span-5">
                <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">Platform</label>
                <div className="relative">
                  <select
                    value={link.platform}
                    onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                    className="w-full pl-3 pr-8 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xs bg-white appearance-none"
                  >
                    {['LinkedIn', 'Twitter', 'Facebook', 'Instagram', 'GitHub', 'Website', 'Threads', 'Behance', 'Dribbble'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">URL / Handle</label>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  placeholder="username or full link"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xs bg-white transition-all shadow-sm"
                />
              </div>
              <div className="sm:col-span-1 flex justify-end">
                <button
                  onClick={() => removeSocialLink(index)}
                  className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          ))}
          {(personalInfo.socialLinks || []).length === 0 && (
            <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/30">
              <p className="text-[11px] text-gray-400 font-medium">No social links added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
