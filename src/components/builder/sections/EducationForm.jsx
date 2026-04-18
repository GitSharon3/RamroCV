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

const SortableEducationItem = ({ edu, removeEducation, updateEducation }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: edu.id });

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
      className={`bg-white border rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition-shadow relative ${isDragging ? 'ring-2 ring-emerald-500 shadow-xl' : 'border-gray-200'}`}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 bg-white border border-gray-200 p-1 rounded-md shadow-sm cursor-grab active:cursor-grabbing text-gray-400 hover:text-emerald-500 z-10" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>

      <div className="flex justify-between items-start mb-4 ml-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg"><GraduationCap className="text-green-600" size={20} /></div>
          <div><h3 className="font-semibold text-gray-800">{edu.school || 'School Name'}</h3><p className="text-sm text-gray-600">{edu.degree || 'Degree'}</p></div>
        </div>
        <button onClick={() => removeEducation(edu.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 ml-2">
        <input type="text" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} placeholder="School" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm bg-gray-50/50 hover:bg-white focus:bg-white transition-all" />
        <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="Degree" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm bg-gray-50/50 hover:bg-white focus:bg-white transition-all" />
        <div className="flex gap-2 md:col-span-2">
          <input type="text" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} placeholder="Start Date" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm bg-gray-50/50 hover:bg-white focus:bg-white transition-all" />
          <input type="text" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} placeholder="End Date" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm bg-gray-50/50 hover:bg-white focus:bg-white transition-all" />
        </div>
      </div>
    </motion.div>
  );
};

export const Education = () => {
  const { education, addEducation, updateEducation, removeEducation, reorderEducation } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState({ school: '', degree: '', field: '', startDate: '', endDate: '', location: '', description: '' });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = education.findIndex((item) => item.id === active.id);
      const newIndex = education.findIndex((item) => item.id === over.id);
      reorderEducation(arrayMove(education, oldIndex, newIndex));
    }
  };

  const handleAdd = () => {
    if (newEducation.school && newEducation.degree) {
      addEducation(newEducation);
      setNewEducation({ school: '', degree: '', field: '', startDate: '', endDate: '', location: '', description: '' });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4 pt-2">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={education.map(e => e.id)} strategy={verticalListSortingStrategy}>
          <div className="ml-3 pl-2 border-l-2 border-dashed border-gray-100">
            <AnimatePresence mode="popLayout">
              {education.map((edu) => (
                <SortableEducationItem key={edu.id} edu={edu} removeEducation={removeEducation} updateEducation={updateEducation} />
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>
      
      {isAdding ? (
        <motion.div layout initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="bg-emerald-50/50 border-2 border-emerald-300 rounded-xl p-5 shadow-sm mt-4">
          <h3 className="font-semibold text-gray-800 mb-4">Add Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input type="text" value={newEducation.school} onChange={(e) => setNewEducation({...newEducation, school: e.target.value})} placeholder="School *" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20 text-sm transition-all" />
            <input type="text" value={newEducation.degree} onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})} placeholder="Degree *" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20 text-sm transition-all" />
            <div className="flex gap-2 md:col-span-2">
              <input type="text" value={newEducation.startDate} onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})} placeholder="Start Date" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20 text-sm transition-all" />
              <input type="text" value={newEducation.endDate} onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})} placeholder="End Date" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20 text-sm transition-all" />
            </div>
          </div>
          <div className="flex gap-2 mt-4"><button onClick={handleAdd} className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-700 transition-all hover:-translate-y-0.5">Add Education</button><button onClick={() => setIsAdding(false)} className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">Cancel</button></div>
        </motion.div>
      ) : (
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => setIsAdding(true)} className="w-full mt-4 py-4 border-2 border-dashed border-emerald-200 bg-emerald-50/30 rounded-xl text-emerald-600 hover:bg-emerald-50 flex items-center justify-center gap-2 text-sm font-bold transition-all"><PlusCircle size={18} /> Add Education</motion.button>
      )}
    </div>
  );
};
