import React, { useState, useRef } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { Upload, FileText, X, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// LaTeX parser — extracts common resume fields from moderncv, resumetex, and custom formats
const parseLatex = (latex) => {
  const result = {
    personalInfo: {},
    experience: [],
    education: [],
    skills: [],
    projects: [],
    errors: [],
    warnings: [],
  };

  if (!latex || latex.trim().length === 0) {
    result.errors.push('LaTeX input is empty.');
    return result;
  }

  // Utility: extract value from command
  const extract = (pattern, text, group = 1) => {
    const m = text.match(pattern);
    return m ? m[group].trim() : null;
  };

  // Personal info
  result.personalInfo.firstName =
    extract(/\\firstname\s*\{([^}]+)\}/, latex) ||
    extract(/\\name\s*\{([^}]+)\}\s*\{[^}]*\}/, latex) || '';

  result.personalInfo.lastName =
    extract(/\\familyname\s*\{([^}]+)\}/, latex) ||
    extract(/\\name\s*\{[^}]*\}\s*\{([^}]+)\}/, latex) || '';

  if (!result.personalInfo.firstName && !result.personalInfo.lastName) {
    // Try \author{First Last}
    const author = extract(/\\author\s*\{([^}]+)\}/, latex);
    if (author) {
      const parts = author.split(' ');
      result.personalInfo.firstName = parts[0] || '';
      result.personalInfo.lastName = parts.slice(1).join(' ') || '';
    }
  }

  result.personalInfo.email =
    extract(/\\email\s*\{([^}]+)\}/, latex) ||
    extract(/\\href\{mailto:([^}]+)\}/, latex) || '';

  result.personalInfo.phone =
    extract(/\\phone(?:\[mobile\])?\s*\{([^}]+)\}/, latex) ||
    extract(/\\mobile\s*\{([^}]+)\}/, latex) || '';

  result.personalInfo.title =
    extract(/\\position\s*\{([^}]+)\}/, latex) ||
    extract(/\\title\s*\{([^}]+)\}/, latex) || '';

  result.personalInfo.website =
    extract(/\\homepage\s*\{([^}]+)\}/, latex) ||
    extract(/\\href\{https?:\/\/([^}]+)\}/, latex) || '';

  result.personalInfo.linkedin =
    extract(/\\linkedin\s*\{([^}]+)\}/, latex) ||
    extract(/linkedin\.com\/in\/([^\s,}]+)/, latex) || '';

  result.personalInfo.github =
    extract(/\\github\s*\{([^}]+)\}/, latex) ||
    extract(/github\.com\/([^\s,}]+)/, latex) || '';

  // Address
  result.personalInfo.city =
    extract(/\\address\s*\{([^}]+)\}/, latex) || '';

  // Summary / profile
  const summaryMatch = latex.match(/\\section\s*\{(?:Summary|Profile|About|Objective)[^}]*\}([\s\S]*?)(?=\\section|\\end\{document\})/i);
  if (summaryMatch) {
    result.personalInfo.summary = summaryMatch[1]
      .replace(/\\[a-z]+\{[^}]*\}/g, '')
      .replace(/\\[a-z]+/g, '')
      .replace(/[{}]/g, '')
      .replace(/\n\s*\n/g, ' ')
      .trim()
      .substring(0, 500);
  }

  // Experience: \cventry or \cvjob blocks
  const experienceSection = latex.match(/\\section\s*\{(?:Experience|Work Experience|Employment)[^}]*\}([\s\S]*?)(?=\\section|\\end\{document\})/i);
  if (experienceSection) {
    const sectionText = experienceSection[1];
    // moderncv \cventry{dates}{title}{company}{location}{grade}{description}
    const cvEntries = [...sectionText.matchAll(/\\cventry\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}/g)];
    cvEntries.forEach((m, idx) => {
      const [, dates, title, company, location, , desc] = m;
      const [start, end] = dates.includes('--') ? dates.split('--').map(s => s.trim()) : [dates, 'Present'];
      result.experience.push({
        id: Date.now() + idx,
        position: title.trim(),
        company: company.trim(),
        location: location.trim(),
        startDate: start,
        endDate: end,
        description: desc.replace(/\\item\s*/g, '• ').replace(/\\[a-z]+\{[^}]*\}/g, '').replace(/[{}\\]/g, '').trim(),
      });
    });

    if (cvEntries.length === 0) {
      // Try itemize-based format
      const items = [...sectionText.matchAll(/\\item\s*(.+)/g)];
      if (items.length > 0) {
        result.warnings.push('Experience parsed in simplified mode — review the output.');
        items.slice(0, 5).forEach((m, idx) => {
          result.experience.push({
            id: Date.now() + idx + 1000,
            position: m[1].replace(/\\[a-z]+\{[^}]*\}/g, '').replace(/[{}]/g, '').trim().substring(0, 80),
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            description: '',
          });
        });
      }
    }
  }

  // Education
  const educationSection = latex.match(/\\section\s*\{(?:Education|Academic)[^}]*\}([\s\S]*?)(?=\\section|\\end\{document\})/i);
  if (educationSection) {
    const sectionText = educationSection[1];
    const cvEntries = [...sectionText.matchAll(/\\cventry\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}/g)];
    cvEntries.forEach((m, idx) => {
      const [, dates, degree, school, location, , desc] = m;
      const [start, end] = dates.includes('--') ? dates.split('--').map(s => s.trim()) : [dates, ''];
      result.education.push({
        id: Date.now() + idx + 2000,
        school: school.trim(),
        degree: degree.trim(),
        field: '',
        startDate: start,
        endDate: end,
        location: location.trim(),
        description: desc.replace(/[{}\\]/g, '').trim(),
      });
    });

    if (cvEntries.length === 0) {
      const edItems = [...sectionText.matchAll(/\\item\s*(.+)/g)];
      edItems.slice(0, 3).forEach((m, idx) => {
        result.education.push({
          id: Date.now() + idx + 3000,
          school: m[1].replace(/[{}\\]/g, '').trim().substring(0, 80),
          degree: '', field: '', startDate: '', endDate: '', description: '',
        });
      });
    }
  }

  // Skills
  const skillsSection = latex.match(/\\section\s*\{(?:Skills?|Technical Skills?|Competencies)[^}]*\}([\s\S]*?)(?=\\section|\\end\{document\})/i);
  if (skillsSection) {
    const sectionText = skillsSection[1];
    // collect all text, split by common delimiters
    const cleaned = sectionText
      .replace(/\\cvitem\s*\{[^}]*\}\s*\{([^}]*)\}/g, '$1')
      .replace(/\\item\s*/g, '')
      .replace(/\\[a-z]+(\[[^\]]*\])?\{[^}]*\}/g, '')
      .replace(/[{}\\]/g, '')
      .replace(/\n/g, ',');

    const skillNames = cleaned
      .split(/[,;|•]/)
      .map(s => s.trim())
      .filter(s => s.length > 1 && s.length < 40 && !/^\d+$/.test(s));

    skillNames.slice(0, 20).forEach((name, idx) => {
      result.skills.push({ id: Date.now() + idx + 4000, name, level: '', category: '' });
    });
  }

  // Projects
  const projectsSection = latex.match(/\\section\s*\{(?:Projects?|Personal Projects?|Side Projects?)[^}]*\}([\s\S]*?)(?=\\section|\\end\{document\})/i);
  if (projectsSection) {
    const sectionText = projectsSection[1];
    const projEntries = [...sectionText.matchAll(/\\cventry\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}/g)];
    projEntries.forEach((m, idx) => {
      const [, , name, , , , desc] = m;
      result.projects.push({
        id: Date.now() + idx + 5000,
        name: name.trim(),
        description: desc.replace(/[{}\\]/g, '').trim(),
        technologies: '',
        link: '',
      });
    });

    if (projEntries.length === 0) {
      const projItems = [...sectionText.matchAll(/\\item\s*\*?\s*\{?([^}\n]+)/g)];
      projItems.slice(0, 4).forEach((m, idx) => {
        result.projects.push({
          id: Date.now() + idx + 6000,
          name: m[1].replace(/[{}\\]/g, '').trim().substring(0, 60),
          description: '',
          technologies: '',
          link: '',
        });
      });
    }
  }

  if (Object.values(result.personalInfo).every(v => !v)) {
    result.errors.push('Could not detect personal information. Make sure you use \\firstname, \\familyname, or \\author commands.');
  }
  if (result.experience.length === 0 && result.education.length === 0 && result.skills.length === 0) {
    result.errors.push('No sections were parsed. Ensure your LaTeX uses \\section{Experience}, \\section{Education}, etc.');
  }

  return result;
};

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

const LatexImporter = ({ onImported }) => {
  const { loadParsedData } = useResumeStore();
  const [latexInput, setLatexInput] = useState('');
  const [parseResult, setParseResult] = useState(null);
  const [isImported, setIsImported] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const fileInputRef = useRef(null);

  const handleParse = () => {
    if (!latexInput.trim()) return;
    const result = parseLatex(latexInput);
    setParseResult(result);
    setIsImported(false);
  };

  const handleImport = () => {
    if (!parseResult) return;
    loadParsedData(parseResult);
    setIsImported(true);
    if (onImported) onImported();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.name.endsWith('.tex')) {
      alert('Please upload a .tex file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setLatexInput(ev.target.result);
      setParseResult(null);
      setIsImported(false);
    };
    reader.readAsText(file);
  };

  const handleLoadSample = () => {
    setLatexInput(SAMPLE_LATEX);
    setParseResult(null);
    setIsImported(false);
  };

  const hasData = parseResult && (
    Object.values(parseResult.personalInfo).some(v => v) ||
    parseResult.experience.length > 0 ||
    parseResult.education.length > 0 ||
    parseResult.skills.length > 0
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Code2 size={22} className="text-purple-600" />
            Import from LaTeX
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Paste your <code className="bg-gray-100 px-1 rounded text-purple-700">.tex</code> resume code or upload a file to auto-populate all fields.
          </p>
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
        >
          <Upload size={14} />
          Upload .tex File
        </button>
        <input ref={fileInputRef} type="file" accept=".tex" onChange={handleFileUpload} className="hidden" />

        <button
          onClick={handleLoadSample}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          <FileText size={14} />
          Load Sample
        </button>

        <button
          onClick={() => setShowSample(!showSample)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          {showSample ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showSample ? 'Hide' : 'View'} Sample Template
        </button>
      </div>

      {/* Sample Preview */}
      <AnimatePresence>
        {showSample && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-xl overflow-auto max-h-60 font-mono leading-relaxed">
              {SAMPLE_LATEX}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LaTeX Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          LaTeX Code
        </label>
        <textarea
          value={latexInput}
          onChange={(e) => { setLatexInput(e.target.value); setParseResult(null); setIsImported(false); }}
          placeholder="Paste your LaTeX resume code here (moderncv, resumetex, or custom formats supported)..."
          rows={10}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl font-mono text-xs text-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none resize-y bg-gray-50"
          spellCheck={false}
        />
        <p className="text-xs text-gray-400 mt-1">
          Supports: <code>moderncv</code>, <code>\\cventry</code>, <code>\\section{'{}'}</code>, standard itemize blocks
        </p>
      </div>

      {/* Parse Button */}
      <button
        onClick={handleParse}
        disabled={!latexInput.trim()}
        className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        <FileText size={16} />
        Parse LaTeX
      </button>

      {/* Parse Results */}
      <AnimatePresence>
        {parseResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Errors */}
            {parseResult.errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-1">
                {parseResult.errors.map((e, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-red-700">
                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                    {e}
                  </div>
                ))}
              </div>
            )}

            {/* Warnings */}
            {parseResult.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 space-y-1">
                {parseResult.warnings.map((w, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-yellow-700">
                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                    {w}
                  </div>
                ))}
              </div>
            )}

            {/* Success Summary */}
            {hasData && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-3">
                  <CheckCircle2 size={16} />
                  Parsed Successfully
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  {(parseResult.personalInfo.firstName || parseResult.personalInfo.lastName) && (
                    <div className="bg-white rounded-lg px-3 py-2 border border-green-100">
                      <span className="text-xs text-gray-500 block">Name</span>
                      <span className="font-medium">{parseResult.personalInfo.firstName} {parseResult.personalInfo.lastName}</span>
                    </div>
                  )}
                  {parseResult.personalInfo.email && (
                    <div className="bg-white rounded-lg px-3 py-2 border border-green-100">
                      <span className="text-xs text-gray-500 block">Email</span>
                      <span className="font-medium truncate block">{parseResult.personalInfo.email}</span>
                    </div>
                  )}
                  {parseResult.experience.length > 0 && (
                    <div className="bg-white rounded-lg px-3 py-2 border border-green-100">
                      <span className="text-xs text-gray-500 block">Experience</span>
                      <span className="font-medium">{parseResult.experience.length} entries</span>
                    </div>
                  )}
                  {parseResult.education.length > 0 && (
                    <div className="bg-white rounded-lg px-3 py-2 border border-green-100">
                      <span className="text-xs text-gray-500 block">Education</span>
                      <span className="font-medium">{parseResult.education.length} entries</span>
                    </div>
                  )}
                  {parseResult.skills.length > 0 && (
                    <div className="bg-white rounded-lg px-3 py-2 border border-green-100">
                      <span className="text-xs text-gray-500 block">Skills</span>
                      <span className="font-medium">{parseResult.skills.length} items</span>
                    </div>
                  )}
                  {parseResult.projects.length > 0 && (
                    <div className="bg-white rounded-lg px-3 py-2 border border-green-100">
                      <span className="text-xs text-gray-500 block">Projects</span>
                      <span className="font-medium">{parseResult.projects.length} items</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleImport}
                  disabled={isImported}
                  className={`mt-4 w-full py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    isImported
                      ? 'bg-green-600 text-white cursor-default'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isImported ? (
                    <>
                      <CheckCircle2 size={16} />
                      Imported! Check your form
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Import to Resume Builder
                    </>
                  )}
                </button>
              </div>
            )}

            {!hasData && parseResult.errors.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 text-center">
                No recognizable resume content found. Try loading the sample template to see the expected format.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LatexImporter;
