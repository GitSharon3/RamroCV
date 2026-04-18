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

