import React, { memo } from 'react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/resumeConstants';

/**
 * ATS Classic Template
 * Features: High machine readability, standard serif font, logical structure.
 * Based on: reference image template4.png
 */
const ATSClassic = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = '"Times New Roman", Times, serif';

  const SectionHeader = ({ title }) => (
    <div className="mt-6 mb-2">
      <h2 className="uppercase font-bold text-[14px] text-gray-900 tracking-wider border-none">
        {title}
      </h2>
    </div>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas px-14 py-12" style={{ fontFamily }}>
        {/* Header - Centered as per template4.png */}
        <div className="mb-6 text-center">
          {personalInfo?.title && (
            <h2 className="text-[13px] font-medium text-gray-700 mb-1 italic">
              {personalInfo.title}
            </h2>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>

          <div className="text-[12px] text-gray-800 space-y-0.5">
            <div className="flex justify-center gap-1">
              <span>{[personalInfo?.address, personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
            </div>
            <div className="flex justify-center gap-4">
              {personalInfo?.email && <span className="resume-break-all">{personalInfo.email}</span>}
              {personalInfo?.phone && <span>{personalInfo.phone}</span>}
            </div>
            <div className="flex justify-center gap-3">
              {(personalInfo?.socialLinks || []).map((link, idx) => (
                <span key={idx} className="resume-break-all text-gray-700">
                  {link.url}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dashed horizontal divider under header */}
        <div className="border-t border-dashed border-gray-300 mb-6"></div>

        {/* Professional Summary (SUMMARY) */}
        {personalInfo?.summary && (
          <div className="resume-section-spacing">
            <SectionHeader title="SUMMARY" />
            <p className="text-[13px] leading-relaxed text-gray-800 text-justify">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience Section (EXPERIENCE) */}
        {experience && experience.length > 0 && (
          <div className="resume-section-spacing">
            <SectionHeader title="EXPERIENCE" />
            <div className="space-y-5">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-[14px] text-gray-900 uppercase">
                      {exp.position} | <span className="font-normal normal-case text-gray-700 italic">{exp.startDate} — {exp.endDate || 'Current'}</span>
                    </span>
                  </div>
                  <div className="mb-1 text-gray-800 text-[13px]">
                    {exp.company}{exp.location ? ` - ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <ul className="resume-list !pl-4">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="resume-list-item text-justify">{line.replace(/^[•*-]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section (EDUCATION) */}
        {education && education.length > 0 && (
          <div className="resume-section-spacing">
            <SectionHeader title="EDUCATION" />
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="font-bold text-gray-900 text-[14px]">
                      {edu.school}{edu.location ? ` - ${edu.location}` : ''} | <span className="font-normal italic text-gray-700 text-[13px]">{edu.degree}</span>
                    </span>
                  </div>
                  <div className="text-gray-800 text-[13px] italic">
                    {edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ''}
                    {edu.field ? ` · ${edu.field}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section (SKILLS) - Two column list as per image */}
        {skills && skills.length > 0 && (
          <div className="resume-section-spacing">
            <SectionHeader title="SKILLS" />
            <div className="grid grid-cols-2 gap-x-8 mt-1">
              <ul className="resume-list !pl-4 list-disc">
                {skills.slice(0, Math.ceil(skills.length / 2)).map((skill, idx) => (
                  <li key={idx} className="resume-list-item">{skill.name}</li>
                ))}
              </ul>
              <ul className="resume-list !pl-4 list-disc">
                {skills.slice(Math.ceil(skills.length / 2)).map((skill, idx) => (
                  <li key={idx} className="resume-list-item">{skill.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Custom Additional Sections */}
        {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
          if (!items || items.length === 0) return null;
          return (
            <div key={key} className="resume-section-spacing">
              <SectionHeader title={ADDITIONAL_SECTION_LABELS[key]?.toUpperCase() || key.toUpperCase()} />
              <ul className="resume-list !pl-4">
                {items.map(item => (
                  <li key={item.id} className="resume-list-item">{item.name}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ATSClassic;
