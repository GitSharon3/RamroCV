import React, { memo } from 'react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/AdditionalSectionConstants';

/**
 * Lumina Template
 * Features: Modern asymmetric two-column design with a distinct sidebar.
 * Best for: Highlighting skills and contact info alongside professional experience.
 */
const Lumina = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = "'Times New Roman', Times, serif";

  const SectionHeader = ({ title }) => (
    <h2 className="uppercase font-bold text-[13px] tracking-widest mb-3 border-b-[1.5px] border-black pb-1">
      {title}
    </h2>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas flex" style={{ fontFamily }}>

        {/* Left Sidebar - Information & Skills */}
        <aside className="w-[32%] bg-[#1a1a1a] text-white pt-16 pb-10 px-8 flex flex-col gap-10">
          {/* Photo handling if existed else compact info */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-black uppercase tracking-tighter leading-none border-b border-gray-700 pb-3 italic">
              {personalInfo?.firstName}<br />{personalInfo?.lastName}
            </h1>
            <div className="space-y-2 text-[11px] text-gray-300 font-medium tracking-wide">
              <p className="resume-break-all">{personalInfo?.email}</p>
              <p>{personalInfo?.phone}</p>
              <p className="opacity-70 mt-4 leading-relaxed">
                {[personalInfo?.address, personalInfo?.city, personalInfo?.country]
                  .filter(Boolean).join(', ')}
              </p>
              <div className="pt-2 space-y-1">
                {(personalInfo?.socialLinks || []).map((link, idx) => (
                  <p key={idx} className="resume-break-all text-blue-400 opacity-90">{link.url}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Hard Skills */}
          {skills && skills.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="uppercase font-bold text-[12px] tracking-widest border-b border-gray-700 pb-1 text-gray-400">Skills</h2>
              <ul className="space-y-1.5 text-[12px]">
                {skills.map((skill, idx) => (
                  <li key={idx} className="font-medium tracking-tight">• {skill.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Sidebar Additional Sections */}
          {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
            if (!items || items.length === 0) return null;
            return (
              <div key={key} className="flex flex-col gap-4">
                <h2 className="uppercase font-bold text-[12px] tracking-widest border-b border-gray-700 pb-1 text-gray-400">
                  {ADDITIONAL_SECTION_LABELS[key] || key}
                </h2>
                <ul className="space-y-1.5 text-[12px]">
                  {items.map(item => (
                    <li key={item.id} className="font-medium opacity-90 leading-tight">› {item.name}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </aside>

        {/* Right Content - Main Narrative */}
        <main className="w-[68%] p-12 bg-white">
          <div className="flex flex-col gap-10">
            {/* Summary */}
            {personalInfo?.summary && (
              <div>
                <SectionHeader title="Profile" />
                <p className="text-[13px] leading-relaxed text-gray-800 text-justify">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
              <div>
                <SectionHeader title="Experience" />
                <div className="space-y-6">
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="resume-flex-between">
                        <span className="font-black text-[14px] text-gray-900 uppercase">
                          {exp.position}
                        </span>
                        <span className="text-gray-500 text-[11px] font-bold">
                          {exp.startDate} — {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <div className="mb-3 text-gray-600 font-bold text-[12px] italic">
                        {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                      </div>
                      {exp.description && (
                        <ul className="resume-list pl-4">
                          {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                            <li key={i} className="resume-list-item">{line.replace(/^[•*-]\s*/, '')}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div>
                <SectionHeader title="Education" />
                <div className="space-y-5">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="resume-flex-between">
                        <span className="font-black text-[13px] text-gray-900 uppercase">
                          {edu.school}
                        </span>
                        <span className="text-gray-500 text-[11px] font-bold">
                          {edu.startDate} — {edu.endDate || 'Present'}
                        </span>
                      </div>
                      <div className="text-gray-600 text-[12px] font-medium italic">
                        {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
              <div>
                <SectionHeader title="Projects" />
                <div className="space-y-5">
                  {projects.map((proj, idx) => (
                    <div key={idx}>
                      <div className="font-black text-[13px] text-gray-900 uppercase mb-1">
                        {proj.name}
                      </div>
                      <div className="text-blue-900 text-[11px] font-bold mb-2 opacity-70 tracking-tighter">
                        {proj.technologies}
                      </div>
                      {proj.description && (
                        <p className="text-[12px] leading-relaxed text-gray-700 italic border-l-2 border-gray-100 pl-3">
                          {proj.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
});

export default Lumina;
