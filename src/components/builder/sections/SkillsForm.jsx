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

export const Skills = () => {
  const { skills, addSkill, updateSkill, removeSkill } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate', category: '' });
  const [bulkInput, setBulkInput] = useState('');
  const [showBulk, setShowBulk] = useState(false);

  const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const levelColors = {
    Expert: 'bg-purple-100 text-purple-700 border-purple-200',
    Advanced: 'bg-blue-100 text-blue-700 border-blue-200',
    Intermediate: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Beginner: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const handleAdd = () => {
    if (newSkill.name.trim()) { addSkill(newSkill); setNewSkill({ name: '', level: 'Intermediate', category: '' }); }
  };

  const handleBulkAdd = () => {
    bulkInput.split(/[,;\n]/).map(s => s.trim()).filter(Boolean).forEach(name => addSkill({ name, level: 'Intermediate', category: '' }));
    setBulkInput(''); setShowBulk(false); setIsAdding(false);
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {skills.map((skill) => (
          <motion.div key={skill.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border font-medium ${levelColors[skill.level] || levelColors.Beginner}`}>
            <span>{skill.name}</span>
            <select value={skill.level} onChange={(e) => updateSkill(skill.id, 'level', e.target.value)} className="bg-transparent text-xs outline-none">
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <button onClick={() => removeSkill(skill.id)} className="ml-0.5 hover:text-red-600"><X size={12} /></button>
          </motion.div>
        ))}
      </div>
      {isAdding ? (
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 space-y-3">
          {!showBulk ? (
            <div className="flex gap-2">
              <input value={newSkill.name} onChange={(e) => setNewSkill({...newSkill, name: e.target.value})} placeholder="Skill name" className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none" onKeyDown={(e) => e.key === 'Enter' && handleAdd()} />
              <button onClick={handleAdd} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm">Add</button>
              <button onClick={() => setShowBulk(true)} className="px-3 py-2 bg-gray-100 rounded-lg text-sm">Bulk</button>
            </div>
          ) : (
            <div className="space-y-2">
              <textarea value={bulkInput} onChange={(e) => setBulkInput(e.target.value)} placeholder="React, Python, AWS..." rows={3} className="w-full px-3 py-2 border rounded-lg text-sm outline-none" />
              <div className="flex gap-2"><button onClick={handleBulkAdd} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm">Add All</button><button onClick={() => setShowBulk(false)} className="px-3 py-2 bg-gray-100 rounded-lg text-sm">Back</button></div>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:bg-violet-50 flex items-center justify-center gap-2 text-sm font-medium transition-all"><Plus size={15} /> Add Skill</button>
      )}
    </div>
  );
};
