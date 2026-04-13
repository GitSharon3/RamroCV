import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, GripVertical, Code2, User, Briefcase, GraduationCap, Wrench, FolderOpen, PlusCircle, FileText, ArrowRight } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';
import PersonalInfo from './PersonalInfo';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import ProfessionalSummary from './ProfessionalSummary';
import AdditionalSections from './AdditionalSections';
import LatexImporter from './LatexImporter';

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
  blue: { border: 'border-l-blue-500', bg: 'bg-blue-50/40', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
  cyan: { border: 'border-l-cyan-500', bg: 'bg-cyan-50/40', icon: 'text-cyan-600', badge: 'bg-cyan-100 text-cyan-700' },
  indigo: { border: 'border-l-indigo-500', bg: 'bg-indigo-50/40', icon: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
  emerald: { border: 'border-l-emerald-500', bg: 'bg-emerald-50/40', icon: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  violet: { border: 'border-l-violet-500', bg: 'bg-violet-50/40', icon: 'text-violet-600', badge: 'bg-violet-100 text-violet-700' },
  amber: { border: 'border-l-amber-500', bg: 'bg-amber-50/40', icon: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
  rose: { border: 'border-l-rose-500', bg: 'bg-rose-50/40', icon: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' },
};

const TAB_EDIT = 'edit';
const TAB_LATEX = 'latex';

const ResumeForm = () => {
  const { sectionOrder, reorderSections, syncSectionOrder } = useResumeStore();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(['personalInfo']);
  const [draggedSection, setDraggedSection] = useState(null);
  const [activeTab, setActiveTab] = useState(TAB_EDIT);

  useEffect(() => {
    syncSectionOrder();
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  const handleDragStart = (sectionId) => setDraggedSection(sectionId);

  const handleDragOver = (e, targetSectionId) => {
    e.preventDefault();
    if (draggedSection && draggedSection !== targetSectionId) {
      const newOrder = [...sectionOrder];
      const draggedIndex = newOrder.indexOf(draggedSection);
      const targetIndex = newOrder.indexOf(targetSectionId);
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedSection);
      reorderSections(newOrder);
    }
  };

  const handleDragEnd = () => setDraggedSection(null);

  return (
    <div className="flex flex-col gap-4">
      {/* Tab Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 flex gap-2">
        <button
          onClick={() => setActiveTab(TAB_EDIT)}
          id="tab-edit"
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === TAB_EDIT
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <User size={15} />
          Build Resume
        </button>
        <button
          onClick={() => setActiveTab(TAB_LATEX)}
          id="tab-latex"
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === TAB_LATEX
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Code2 size={15} />
          Import LaTeX
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === TAB_EDIT ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-3"
          >
            <p className="text-xs text-gray-400 px-1 flex items-center gap-1">
              <GripVertical size={12} />
              Drag sections to reorder your resume layout
            </p>

            {sectionOrder.map((sectionId) => {
              const section = sections[sectionId];
              if (!section) return null;
              const SectionComponent = section.component;
              const isExpanded = expandedSections.includes(sectionId);
              const colors = colorMap[section.color];
              const isDragging = draggedSection === sectionId;

              return (
                <motion.div
                  key={sectionId}
                  draggable
                  onDragStart={() => handleDragStart(sectionId)}
                  onDragOver={(e) => handleDragOver(e, sectionId)}
                  onDragEnd={handleDragEnd}
                  layout
                  className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${colors.border} overflow-hidden transition-all ${
                    isDragging ? 'opacity-50 scale-98 shadow-lg' : 'hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => toggleSection(sectionId)}
                    className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-gray-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="text-gray-300 cursor-grab" size={18} />
                      <div className={`p-1.5 rounded-lg ${colors.bg}`}>
                        <section.icon className={colors.icon} size={16} />
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">{section.label}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="text-gray-400" size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-gray-100">
                          <SectionComponent />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="latex"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            <LatexImporter onImported={() => navigate('/builder/details')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Step Button */}
      {activeTab === TAB_EDIT && (
        <div className="pt-4 mt-2">
          <button
            onClick={() => navigate('/builder/download')}
            className="w-full py-4 bg-sky-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm shadow-sky-200 hover:bg-sky-600 transition-all text-sm uppercase tracking-wider"
          >
            Review & Download Resume
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;
