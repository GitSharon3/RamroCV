import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  GripVertical, 
  Code2, 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderOpen, 
  PlusCircle, 
  FileText, 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Sparkles,
  Trash2,
  Plus,
  X,
  Building,
  Calendar,
  Info,
  School,
  Star,
  Tag,
  Folder,
  Code,
  ExternalLink,
  Upload,
  Camera,
  Eye,
  EyeOff,
  CheckCircle2,
  Download
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResumeStore } from '../../store/resumeStore';
import { downloadPDF } from '../../utils/resumeUtils';
import { parseLatex } from '../../utils/latexParser';
const SECTION_TYPES = [
  { id: 'languages', label: 'Languages' },
  { id: 'certifications', label: 'Certifications and licenses' },
  { id: 'awards', label: 'Awards and honors' },
  { id: 'websites', label: 'Websites and social media' },
  { id: 'references', label: 'References' },
  { id: 'hobbies', label: 'Hobbies and interests' },
  { id: 'custom', label: 'Custom section' },
];


// --- Extracted Section Components ---
import { LatexImporter } from './sections/LatexImporter';
export { LatexImporter };
import { PersonalInfo } from './sections/PersonalInfoForm';
import { ProfessionalSummary } from './sections/ProfessionalSummaryForm';
import { WorkExperience } from './sections/WorkExperienceForm';
import { Education } from './sections/EducationForm';
import { Skills } from './sections/SkillsForm';
import { Projects } from './sections/ProjectsForm';
import { AdditionalSections } from './sections/AdditionalSectionsForm';

// ============================================
// MAIN RESUME FORM EDITOR COMPONENT
// ============================================

const sections = {
  personalInfo: { component: PersonalInfo, label: 'Personal Information', icon: User, color: 'blue' },
  summary: { component: ProfessionalSummary, label: 'Professional Summary', icon: FileText, color: 'cyan' },
  experience: { component: WorkExperience, label: 'Work Experience', icon: Briefcase, color: 'indigo' },
  education: { component: Education, label: 'Education', icon: GraduationCap, color: 'emerald' },
  skills: { component: Skills, label: 'Skills', icon: Wrench, color: 'violet' },
  projects: { component: Projects, label: 'Projects', icon: FolderOpen, color: 'amber' },
  additional: { component: AdditionalSections, label: 'Additional Sections', icon: PlusCircle, color: 'rose' },
};

const colorMap = {
  blue: { border: 'border-l-blue-500', bg: 'bg-blue-50/40', icon: 'text-blue-600' },
  cyan: { border: 'border-l-cyan-500', bg: 'bg-cyan-50/40', icon: 'text-cyan-600' },
  indigo: { border: 'border-l-indigo-500', bg: 'bg-indigo-50/40', icon: 'text-indigo-600' },
  emerald: { border: 'border-l-emerald-500', bg: 'bg-emerald-50/40', icon: 'text-emerald-600' },
  violet: { border: 'border-l-violet-500', bg: 'bg-violet-50/40', icon: 'text-violet-600' },
  amber: { border: 'border-l-amber-500', bg: 'bg-amber-50/40', icon: 'text-amber-600' },
  rose: { border: 'border-l-rose-500', bg: 'bg-rose-50/40', icon: 'text-rose-600' },
};

const ResumeFormEditor = () => {
  const store = useResumeStore();
  const { sectionOrder = [], reorderSections, syncSectionOrder, personalInfo } = store;
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(['personalInfo']);
  const [draggedSection, setDraggedSection] = useState(null);
  const [activeTab, setActiveTab] = useState('edit');
  const [isReady, setIsReady] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadPDF('resume-preview', `${personalInfo.firstName || 'my'}-resume.pdf`);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (syncSectionOrder) syncSectionOrder();
    setIsReady(true);
  }, [syncSectionOrder]);

  if (!isReady || !sectionOrder || sectionOrder.length === 0) {
    return <div className="flex items-center justify-center p-8"><p className="text-gray-500">Loading form...</p></div>;
  }

  const toggleSection = (id) => setExpandedSections(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleDragOver = (e, targetId) => {
    e.preventDefault();
    if (draggedSection && draggedSection !== targetId) {
      const newOrder = [...sectionOrder];
      const from = newOrder.indexOf(draggedSection);
      const to = newOrder.indexOf(targetId);
      newOrder.splice(from, 1);
      newOrder.splice(to, 0, draggedSection);
      reorderSections(newOrder);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Tab Bar */}
      <div className="bg-white rounded-2xl shadow-sm border p-1.5 sm:p-2 flex gap-1.5 sm:gap-2">
        <button onClick={() => setActiveTab('edit')} className={`flex-1 py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${activeTab === 'edit' ? 'bg-sky-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}><User size={14} /> <span className="whitespace-nowrap">Build Resume</span></button>
        <button onClick={() => setActiveTab('latex')} className={`flex-1 py-2 sm:py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${activeTab === 'latex' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}><Code2 size={14} /> <span className="whitespace-nowrap">Import LaTeX</span></button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'edit' ? (
          <motion.div key="edit" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
            <p className="text-xs text-gray-400 px-1 flex items-center gap-1"><GripVertical size={12} /> Drag sections to reorder layout</p>
            {sectionOrder.map((sid) => {
              const sec = sections[sid];
              if (!sec) return null;
              const SectionComp = sec.component;
              const isExt = expandedSections.includes(sid);
              const colors = colorMap[sec.color];
              return (
                <motion.div key={sid} draggable onDragStart={() => setDraggedSection(sid)} onDragOver={(e) => handleDragOver(e, sid)} onDragEnd={() => setDraggedSection(null)} layout className={`bg-white rounded-xl sm:rounded-2xl shadow-sm border border-l-4 ${colors.border} overflow-hidden transition-all ${draggedSection === sid ? 'opacity-50 scale-98 shadow-lg' : 'hover:shadow-md'}`}>
                  <button onClick={() => toggleSection(sid)} className="w-full px-3 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2 sm:gap-3"><GripVertical className="text-gray-300 flex-shrink-0" size={16} /><div className={`p-1.5 rounded-lg ${colors.bg}`}><sec.icon className={colors.icon} size={14} /></div><span className="font-semibold text-gray-800 text-xs sm:text-sm">{sec.label}</span></div>
                    <motion.div animate={{ rotate: isExt ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown className="text-gray-400" size={16} /></motion.div>
                  </button>
                  <AnimatePresence>{isExt && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-3 sm:px-5 pb-4 sm:pb-5 pt-1 border-t border-gray-100"><SectionComp /></div>
                    </motion.div>
                  )}</AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div key="latex" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="bg-white rounded-2xl shadow-sm border p-5">
            <LatexImporter onImported={() => setActiveTab('edit')} />
          </motion.div>
        )}
      </AnimatePresence>

      {activeTab === 'edit' && (
        <div className="pt-3 sm:pt-4 mt-2 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              onClick={handleDownload} 
              disabled={isDownloading}
              className={`flex-1 py-2.5 sm:py-3.5 ${isDownloading ? 'bg-gray-100 text-gray-400' : 'bg-emerald-500 hover:bg-emerald-600 text-white'} rounded-xl font-bold flex items-center justify-center gap-2 shadow-emerald-200 transition-all text-xs sm:text-sm`}
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download size={14} className="sm:w-4 sm:h-4" />
              )}
              <span className="whitespace-nowrap">{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>
            <button 
              onClick={() => navigate('/builder/download')} 
              className="flex-1 py-2.5 sm:py-3.5 bg-sky-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sky-200 hover:bg-sky-600 transition-all text-xs sm:text-sm"
            >
              <span className="whitespace-nowrap">Review</span> <ArrowRight size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeFormEditor;
