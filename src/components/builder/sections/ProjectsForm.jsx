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

export const Projects = () => {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', technologies: '', link: '' });

  const handleAdd = () => {
    if (newProject.name.trim()) { addProject(newProject); setNewProject({ name: '', description: '', technologies: '', link: '' }); setIsAdding(false); }
  };

  return (
    <div className="space-y-4 pt-2">
      <AnimatePresence mode="popLayout">
        {projects.map((proj, idx) => (
          <motion.div key={proj.id} className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">{proj.name}</h3>
              <button onClick={() => removeProject(proj.id)} className="text-red-500"><Trash2 size={16} /></button>
            </div>
            <textarea value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} placeholder="Description" rows={3} className="w-full px-3 py-2 border rounded-lg text-sm outline-none mb-2" />
            <input value={proj.technologies} onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)} placeholder="Tech stack" className="w-full px-3 py-2 border rounded-lg text-sm outline-none" />
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={() => setIsAdding(true)} className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:bg-amber-50 flex items-center justify-center gap-2 text-sm font-medium transition-all"><Plus size={15} /> Add Project</button>
    </div>
  );
};
