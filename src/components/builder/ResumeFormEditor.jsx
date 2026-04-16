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
  CheckCircle2
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

// ============================================
// SHARED UI COMPONENTS
// ============================================

const AutoResizeTextarea = ({ value, onChange, placeholder, rows = 1, className, onBlur }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={rows}
      style={{ overflow: 'hidden' }}
      className={`transition-all duration-200 ${className}`}
    />
  );
};

// ============================================
// LATEX PARSER LOGIC
// ============================================

// LaTeX parser logic has been extracted to src/utils/latexParser.js

const SAMPLE_LATEX = `\\documentclass[11pt,a4paper]{moderncv}
\\moderncvtheme{classic}
\\firstname{Jane}
\\familyname{Smith}
\\title{Full Stack Developer}
\\phone{+1 (555) 000-1234}
\\email{jane.smith@email.com}
\\homepage{janesmith.dev}
\\begin{document}
\\maketitle
\\section{Summary}
Passionate full stack developer with 4 years of experience building scalable web apps using React, Node.js and PostgreSQL.
\\section{Experience}
\\cventry{2021--Present}{Senior Developer}{TechCorp}{New York, NY}{}{
  \\begin{itemize}
    \\item Led migration of monolith to microservices, reducing deploy time by 60\\%
    \\item Built real-time dashboard serving 50k concurrent users
  \\end{itemize}
}
\\cventry{2019--2021}{Junior Developer}{StartupXYZ}{Remote}{}{
  \\begin{itemize}
    \\item Developed REST APIs consumed by iOS and Android apps
    \\item Improved test coverage from 20\\% to 85\\%
  \\end{itemize}
}
\\section{Education}
\\cventry{2015--2019}{Bachelor of Science in Computer Science}{MIT}{Cambridge, MA}{}{}
\\section{Skills}
\\cvitem{Languages}{JavaScript, TypeScript, Python, SQL}
\\cvitem{Frameworks}{React, Next.js, Node.js, Express}
\\cvitem{Cloud}{AWS, Docker, Kubernetes}
\\section{Projects}
\\cventry{}{TaskFlow}{}{}{}{Kanban-style project management tool built with React and Firebase.}
\\end{document}`;

/**
 * LatexImporter - Internalized LaTeX parser UI
 */
export const LatexImporter = ({ onImported }) => {
  const { loadParsedData } = useResumeStore();
  const [latexInput, setLatexInput] = useState('');
  const [parseResult, setParseResult] = useState(null);
  const [isImported, setIsImported] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const fileInputRef = useRef(null);

  const handleParse = () => {
    if (!latexInput.trim()) return;
    try {
      const result = parseLatex(latexInput);
      setParseResult(result);
      setIsImported(false);
    } catch (e) {
      setParseResult({ errors: ['Failed completely to parse this document: ' + e.message] });
    }
  };

  const handleImport = () => {
    if (!parseResult || parseResult.errors?.length > 0) return;
    loadParsedData(parseResult);
    setIsImported(true);
    if (onImported) onImported();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith('.tex')) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setLatexInput(ev.target.result); setParseResult(null); setIsImported(false); };
    reader.readAsText(file);
  };

  const handleLoadSample = () => { setLatexInput(SAMPLE_LATEX); setParseResult(null); setIsImported(false); };

  const hasData = parseResult && !parseResult.errors?.length && (
    Object.values(parseResult.personalInfo || {}).some(v => v) ||
    (parseResult.experience || []).length > 0 ||
    (parseResult.education || []).length > 0 ||
    (parseResult.skills || []).length > 0
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Code2 size={22} className="text-purple-600" />
          Import from LaTeX
        </h2>
        <p className="text-gray-500 text-sm mt-1">Paste your .tex code or upload a file.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"><Upload size={14} /> Upload .tex</button>
        <input ref={fileInputRef} type="file" accept=".tex" onChange={handleFileUpload} className="hidden" />
        <button onClick={handleLoadSample} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"><FileText size={14} /> Load Sample</button>
      </div>

      <AnimatePresence>
        {showSample && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-xl overflow-auto max-h-60 font-mono leading-relaxed">{SAMPLE_LATEX}</pre>
          </motion.div>
        )}
      </AnimatePresence>

      <textarea
        value={latexInput}
        onChange={(e) => { setLatexInput(e.target.value); setParseResult(null); setIsImported(false); }}
        placeholder="Paste your LaTeX resume code here..."
        rows={8}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl font-mono text-xs text-gray-800 focus:ring-2 focus:ring-purple-500 transition-all outline-none resize-y bg-gray-50"
      />

      <button onClick={handleParse} disabled={!latexInput.trim()} className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-40 transition-colors flex items-center justify-center gap-2"><FileText size={16} /> Parse LaTeX</button>

      {parseResult && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {parseResult.errors && parseResult.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm font-medium">
              ⚠️ {parseResult.errors[0]}
            </div>
          )}
          {hasData && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-green-700 font-semibold mb-3"><CheckCircle2 size={16} /> Parsed Successfully</div>
              <button onClick={handleImport} disabled={isImported} className={`w-full py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isImported ? 'bg-green-600 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                {isImported ? 'Imported to Editor!' : 'Inject Data to Editor'}
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// ============================================
// SUB-COMPONENTS (Internal)
// ============================================

/**
 * ImageUploader - Handles profile photo uploads
 */
const ImageUploader = () => {
  const { personalInfo, setPhoto, toggleShowPhoto } = useResumeStore();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const processFile = (file) => {
    setError('');
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => processFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Profile Photo</h3>
        {personalInfo.photo && (
          <button
            onClick={toggleShowPhoto}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              personalInfo.showPhoto
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {personalInfo.showPhoto ? <Eye size={12} /> : <EyeOff size={12} />}
            {personalInfo.showPhoto ? 'Showing' : 'Hidden'}
          </button>
        )}
      </div>

      {personalInfo.photo ? (
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <img
              src={personalInfo.photo}
              alt="Profile Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 shadow"
            />
            <button
              onClick={() => setPhoto(null)}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow"
            >
              <X size={12} />
            </button>
          </motion.div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">Photo uploaded successfully</p>
            <label className="cursor-pointer text-xs text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2">
              Change photo
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileInput} className="hidden" />
            </label>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
            dragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
          }`}
        >
          <Camera className="mx-auto text-gray-400 mb-2" size={28} />
          <p className="text-sm text-gray-600 mb-1">Drag & drop your photo here</p>
          <p className="text-xs text-gray-400 mb-3">JPG, PNG, WebP · Max 5MB</p>
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Upload size={14} />
            Browse File
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileInput} className="hidden" />
          </label>
        </div>
      )}
    </div>
  );
};

/**
 * PersonalInfo Section
 */
const PersonalInfo = () => {
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

      <div className="grid grid-cols-2 gap-3">
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
              className="grid grid-cols-12 gap-3 items-end bg-gray-50/50 p-3 rounded-xl border border-gray-100 relative group"
            >
              <div className="col-span-5">
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
              <div className="col-span-6">
                <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase">URL / Handle</label>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  placeholder="username or full link"
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-xs bg-white transition-all shadow-sm"
                />
              </div>
              <div className="col-span-1 flex justify-end">
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

/**
 * ProfessionalSummary Section
 */
const ProfessionalSummary = () => {
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

/**
 * SortableExperienceItem Component
 */
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

/**
 * WorkExperience Section
 */
const WorkExperience = () => {
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

/**
 * SortableEducationItem Component
 */
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

/**
 * Education Section
 */
const Education = () => {
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

/**
 * Skills Section
 */
const Skills = () => {
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

/**
 * Projects Section
 */
const Projects = () => {
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

/**
 * AdditionalSections Section
 */
const AdditionalSections = () => {
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
  const { sectionOrder = [], reorderSections, syncSectionOrder } = store;
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState(['personalInfo']);
  const [draggedSection, setDraggedSection] = useState(null);
  const [activeTab, setActiveTab] = useState('edit');
  const [isReady, setIsReady] = useState(false);

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
      <div className="bg-white rounded-2xl shadow-sm border p-2 flex gap-2">
        <button onClick={() => setActiveTab('edit')} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'edit' ? 'bg-sky-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}><User size={15} /> Build Resume</button>
        <button onClick={() => setActiveTab('latex')} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'latex' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}><Code2 size={15} /> Import LaTeX</button>
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
                <motion.div key={sid} draggable onDragStart={() => setDraggedSection(sid)} onDragOver={(e) => handleDragOver(e, sid)} onDragEnd={() => setDraggedSection(null)} layout className={`bg-white rounded-2xl shadow-sm border border-l-4 ${colors.border} overflow-hidden transition-all ${draggedSection === sid ? 'opacity-50 scale-98 shadow-lg' : 'hover:shadow-md'}`}>
                  <button onClick={() => toggleSection(sid)} className="w-full px-4 py-3.5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3"><GripVertical className="text-gray-300" size={18} /><div className={`p-1.5 rounded-lg ${colors.bg}`}><sec.icon className={colors.icon} size={16} /></div><span className="font-semibold text-gray-800 text-sm">{sec.label}</span></div>
                    <motion.div animate={{ rotate: isExt ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown className="text-gray-400" size={18} /></motion.div>
                  </button>
                  <AnimatePresence>{isExt && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1 border-t border-gray-100"><SectionComp /></div>
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
        <div className="pt-4 mt-2">
          <button onClick={() => navigate('/builder/download')} className="w-full py-4 bg-sky-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sky-200 hover:bg-sky-600 transition-all text-sm uppercase tracking-wider">
            Review & Download Resume <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeFormEditor;
