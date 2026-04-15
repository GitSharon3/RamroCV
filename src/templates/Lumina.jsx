import React, { memo } from 'react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/resumeConstants';

/**
 * Lumina Template
 * Features: Professional asymmetric layout with a distinct tan header and photo area.
 * Based on: reference image template3.png
 */
const Lumina = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = '"Times New Roman", Times, serif';

  const SectionHeader = ({ title }) => (
    <div className="w-full mb-3 mt-6 border-b border-black pb-1">
      <h2 className="uppercase font-bold text-[#1a1a1a] text-[14px] leading-tight tracking-wider">{title}</h2>
    </div>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas bg-white" style={{ fontFamily }}>
        {/* Top Header Section - Beige Background as per template3.png */}
        <div className="bg-[#f2e7db] px-14 py-10 flex items-center gap-10">
          {/* Profile Photo Area */}
          {(personalInfo?.showPhoto) && (
             <div className="w-32 h-32 bg-white flex-shrink-0 overflow-hidden border border-white shadow-sm">
                {personalInfo.photo ? (
                  <img src={personalInfo.photo} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-xs text-center p-4 italic uppercase">
                    Photo Space
                  </div>
                )}
             </div>
          )}

          {/* Name & Contact Info Cluster */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-1 leading-tight">
              {personalInfo?.firstName} {personalInfo?.lastName}
            </h1>
            {personalInfo?.title && (
              <h2 className="text-[14px] font-bold text-gray-800 mb-6 tracking-tight">
                {personalInfo.title}
              </h2>
            )}

            <div className="text-[12px] text-gray-800 space-y-1 mt-1">
              <div>{[personalInfo?.address, personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</div>
              <div className="truncate">{personalInfo?.email}</div>
              <div>{personalInfo?.phone}</div>
              <div className="flex gap-2">
                {(personalInfo?.socialLinks || []).map((link, idx) => (
                  <span key={idx} className="truncate text-gray-700 opacity-80">
                    {link.url}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Body Content Area - Two-Column Layout */}
        <div className="flex px-14 py-4 gap-12">
          {/* Left Column - Summary & Skills (Narrow) */}
          <div className="w-[35%] flex flex-col pt-2">
            {personalInfo?.summary && (
              <div className="mb-8">
                <SectionHeader title="SUMMARY" />
                <p className="text-[13px] leading-relaxed text-gray-800 text-justify">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {skills && skills.length > 0 && (
              <div>
                <SectionHeader title="SKILLS" />
                <ul className="space-y-1.5 text-[13px] text-gray-800 font-medium">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-black">•</span>
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Sidebar Sections */}
            {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
              if (key === 'languages') return null; // Logic to split if needed, otherwise just list
              if (!items || items.length === 0) return null;
              return (
                <div key={key} className="mt-8">
                  <SectionHeader title={ADDITIONAL_SECTION_LABELS[key]?.toUpperCase() || key.toUpperCase()} />
                  <ul className="space-y-1.5 text-[13px] text-gray-800 italic">
                    {items.map(item => (
                      <li key={item.id} className="flex gap-2">
                         <span>-</span>
                         <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Right Column - Experience & Education (Wide) */}
          <div className="w-[65%] flex flex-col pt-2 border-l border-gray-100 pl-8">
            {experience && experience.length > 0 && (
              <div className="mb-6">
                <SectionHeader title="EXPERIENCE" />
                <div className="space-y-6">
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-bold italic text-[14px] text-gray-900 leading-tight">
                          {exp.position}
                        </span>
                        <span className="text-gray-900 text-[12px] font-bold italic flex-shrink-0 ml-2">
                          {exp.startDate} — {exp.endDate || 'Current'}
                        </span>
                      </div>
                      <div className="text-gray-800 mb-3 font-medium text-[13px]">
                        {exp.company}{exp.location ? ` - ${exp.location}` : ''}
                      </div>
                      {exp.description && (
                        <ul className="space-y-2 text-[13px] text-gray-800 text-justify leading-snug">
                          {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="flex-shrink-0">•</span>
                              <span>{line.replace(/^[•*-]\s*/, '')}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education && education.length > 0 && (
              <div className="mt-4">
                <SectionHeader title="EDUCATION" />
                <div className="space-y-5">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-bold italic text-gray-900 text-[14px] leading-tight">
                          {edu.school}
                        </span>
                        <span className="text-gray-900 text-[12px] font-bold italic flex-shrink-0 ml-2">
                          {edu.startDate} — {edu.endDate || 'Present'}
                        </span>
                      </div>
                      <div className="text-gray-800 text-[13px]">
                        {edu.location ? `${edu.location} | ` : ''}{edu.degree}{edu.field ? ` · ${edu.field}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Any loose Additional Sections */}
            {additionalSections?.languages && additionalSections.languages.length > 0 && (
               <div className="mt-8">
                  <SectionHeader title="LANGUAGES" />
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {additionalSections.languages.map(lang => (
                      <div key={lang.id} className="text-[13px] text-gray-800 font-bold">
                        {lang.name}
                      </div>
                    ))}
                  </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Lumina;
