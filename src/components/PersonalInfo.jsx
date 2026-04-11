import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { User, Mail, Phone, MapPin, Link, FileText, Sparkles, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUploader from './ImageUploader';

const PersonalInfo = () => {
  const { personalInfo, updatePersonalInfo, loadSampleData, clearAllData } = useResumeStore();
  const [showTooltip, setShowTooltip] = useState(null);

  const fields = [
    { name: 'firstName', label: 'First Name', icon: User, placeholder: 'Jane', col: 1 },
    { name: 'lastName', label: 'Last Name', icon: User, placeholder: 'Smith', col: 1 },
    { name: 'title', label: 'Professional Title', icon: FileText, placeholder: 'Senior Software Engineer', col: 2 },
    { name: 'email', label: 'Email', icon: Mail, placeholder: 'jane@example.com', col: 1 },
    { name: 'phone', label: 'Phone', icon: Phone, placeholder: '+1 (555) 000-1234', col: 1 },
    { name: 'city', label: 'City', icon: MapPin, placeholder: 'San Francisco', col: 1 },
    { name: 'state', label: 'State / Province', icon: MapPin, placeholder: 'CA', col: 1 },
    { name: 'country', label: 'Country', icon: MapPin, placeholder: 'USA', col: 1 },
    { name: 'zip', label: 'ZIP / Postal Code', icon: MapPin, placeholder: '94102', col: 1 },
    { name: 'website', label: 'Website / Portfolio', icon: Link, placeholder: 'janesmith.dev', col: 1 },
    { name: 'linkedin', label: 'LinkedIn', icon: Link, placeholder: 'linkedin.com/in/janesmith', col: 1 },
    { name: 'github', label: 'GitHub', icon: Link, placeholder: 'github.com/janesmith', col: 1 },
  ];

  return (
    <div className="space-y-5 pt-2">
      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={loadSampleData}
          id="load-sample-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-xs font-semibold"
        >
          <Sparkles size={13} />
          Load Sample
        </button>
        <button
          onClick={clearAllData}
          id="clear-all-btn"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-semibold"
        >
          <Trash2 size={13} />
          Clear All
        </button>
      </div>

      {/* Profile Photo */}
      <div className="border border-dashed border-gray-200 rounded-xl p-4 bg-gray-50/50">
        <ImageUploader />
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-3">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`relative ${field.col === 2 ? 'col-span-2' : ''}`}
          >
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              {field.label}
            </label>
            <div className="relative">
              <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
              <input
                type="text"
                value={personalInfo[field.name] || ''}
                onChange={(e) => updatePersonalInfo(field.name, e.target.value)}
                onFocus={() => setShowTooltip(field.name)}
                onBlur={() => setShowTooltip(null)}
                placeholder={field.placeholder}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-sm bg-white"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Professional Summary
        </label>
        <textarea
          value={personalInfo.summary || ''}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          placeholder="Brief 2-4 sentence overview of your professional background, key skills, and career goals..."
          rows={4}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none text-sm"
        />
        <p className="text-xs text-gray-400 mt-1">
          💡 Tip: Lead with your years of experience, core expertise, and biggest achievement.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;
