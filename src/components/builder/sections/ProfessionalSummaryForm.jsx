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

export const ProfessionalSummary = () => {
  const { personalInfo, updatePersonalInfo } = useResumeStore();
  return (
    <div className="space-y-4 pt-2">
      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Professional Summary</label>
      <AutoResizeTextarea
        value={personalInfo.summary || ''}
        onChange={(e) => updatePersonalInfo('summary', e.target.value)}
        placeholder="Brief 2-4 sentence overview of your professional background, key skills, and career goals..."
        rows={3}
        className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-sm bg-white"
      />
      <p className="text-xs text-gray-400">💡 Lead with years of experience and biggest achievement.</p>
    </div>
  );
};
