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

export const AdditionalSections = () => {
  const { additionalSections, addAdditionalItem, removeAdditionalItem, updateAdditionalItem } = useResumeStore();
  const [addingInput, setAddingInput] = useState({});

  const handleAdd = (secId) => {
    if (addingInput[secId]?.trim()) {
      addAdditionalItem(secId, { name: addingInput[secId] });
      setAddingInput({ ...addingInput, [secId]: '' });
    }
  };

  return (
    <div className="space-y-6 pt-2">
      {SECTION_TYPES.map(sec => {
        const items = additionalSections[sec.id] || [];
        return (
          <div key={sec.id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-2 border-b font-semibold text-gray-700 text-sm">{sec.label}</div>
            <div className="p-3">
              <div className="space-y-2 mb-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border rounded-lg p-2">
                    <input value={item.name} onChange={(e) => updateAdditionalItem(sec.id, item.id, 'name', e.target.value)} className="flex-1 outline-none text-sm" />
                    <button onClick={() => removeAdditionalItem(sec.id, item.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={addingInput[sec.id] || ''} onChange={(e) => setAddingInput({...addingInput, [sec.id]: e.target.value})} onKeyDown={(e) => e.key === 'Enter' && handleAdd(sec.id)} placeholder={`Add ${sec.label}...`} className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none bg-gray-50" />
                <button onClick={() => handleAdd(sec.id)} className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Plus size={18} /></button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
