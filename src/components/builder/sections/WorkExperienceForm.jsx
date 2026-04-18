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

import { AutoResizeTextarea } from './Shared';

const SortableExperienceItem = ({ exp, removeExperience, updateExperience }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: exp.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`bg-white border rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition-shadow relative ${isDragging ? 'ring-2 ring-blue-500 shadow-xl' : 'border-gray-200'}`}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 bg-white border border-gray-200 p-1 rounded-md shadow-sm cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-500 z-10" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>

      <div className="flex justify-between items-start mb-4 ml-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg"><Briefcase className="text-blue-600" size={20} /></div>
          <div>
            <h3 className="font-semibold text-gray-800">{exp.position || 'Untitled Position'}</h3>
            <p className="text-sm text-gray-600">{exp.company || 'Company Name'}</p>
          </div>
        </div>
        <button onClick={() => removeExperience(exp.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 ml-2">
        <div className="relative group">
          <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
          <input type="text" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white" />
        </div>
        <div className="relative group">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
          <input type="text" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} placeholder="Job Title" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white" />
        </div>
        <div className="relative group">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
          <input type="text" value={exp.location} onChange={(e) => updateExperience(exp.id, 'location', e.target.value)} placeholder="Location" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white" />
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input type="text" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Start Date" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white" />
          </div>
          <div className="relative flex-1 group">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input type="text" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="End Date" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all bg-gray-50/50 hover:bg-white focus:bg-white" />
          </div>
        </div>
      </div>
      <AutoResizeTextarea value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} placeholder="• Key achievement..." rows={3} className="w-full ml-2" />
    </motion.div>
  );
};

export const WorkExperience = () => {
  const { experience, addExperience, updateExperience, removeExperience, reorderExperience } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState({ company: '', position: '', startDate: '', endDate: '', location: '', description: '' });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = experience.findIndex((item) => item.id === active.id);
      const newIndex = experience.findIndex((item) => item.id === over.id);
      reorderExperience(arrayMove(experience, oldIndex, newIndex));
    }
  };

  const handleAdd = () => {
    if (newExperience.company && newExperience.position) {
      addExperience(newExperience);
      setNewExperience({ company: '', position: '', startDate: '', endDate: '', location: '', description: '' });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4 pt-2">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-700">
        <Info size={13} className="mt-0.5 flex-shrink-0" />
        <span>Use drag handle to reorder. Use <code className="bg-indigo-100 px-1 rounded">• bullet</code> or <code className="bg-indigo-100 px-1 rounded">- dash</code> for lists.</span>
      </motion.div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={experience.map(e => e.id)} strategy={verticalListSortingStrategy}>
          <div className="ml-3 pl-2 border-l-2 border-dashed border-gray-100">
            <AnimatePresence mode="popLayout">
              {experience.map((exp) => (
                <SortableExperienceItem key={exp.id} exp={exp} removeExperience={removeExperience} updateExperience={updateExperience} />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      {isAdding ? (
        <motion.div layout initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="bg-blue-50/50 border-2 border-blue-300 rounded-xl p-5 shadow-sm mt-4">
          <h3 className="font-semibold text-gray-800 mb-4">Add Position</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input type="text" value={newExperience.company} onChange={(e) => setNewExperience({...newExperience, company: e.target.value})} placeholder="Company *" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-sm transition-all" />
            <input type="text" value={newExperience.position} onChange={(e) => setNewExperience({...newExperience, position: e.target.value})} placeholder="Title *" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-sm transition-all" />
            <div className="flex gap-2 md:col-span-2">
              <input type="text" value={newExperience.startDate} onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})} placeholder="Start Date" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-sm transition-all" />
              <input type="text" value={newExperience.endDate} onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})} placeholder="End Date" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-sm transition-all" />
            </div>
          </div>
          <div className="flex gap-2 mt-4"><button onClick={handleAdd} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-0.5">Add Experience</button><button onClick={() => setIsAdding(false)} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">Cancel</button></div>
        </motion.div>
      ) : (
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => setIsAdding(true)} className="w-full mt-4 py-4 border-2 border-dashed border-blue-200 bg-blue-50/30 rounded-xl text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2 text-sm font-bold transition-all"><PlusCircle size={18} /> Add Work Experience</motion.button>
      )}
    </div>
  );
};
