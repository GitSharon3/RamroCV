import React, { memo } from 'react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/resumeConstants';

/**
 * Astralis Template
 * Features: Classic left-aligned structure with solid dividers.
 * Based on: reference image template7.png
 */
const Astralis = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = '"Times New Roman", Times, serif';

  const SectionHeader = ({ title }) => (
    <div className="w-full mb-3 mt-6">
      <h2 className="uppercase font-bold text-[#1a1a1a] text-[14px] leading-tight mb-1">{title}</h2>
      <div className="w-full border-t border-gray-800"></div>
    </div>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas pt-12 pb-12 px-14" style={{ fontFamily }}>
        {/* Profile Header - Left Aligned as per template7.png */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>
          {personalInfo?.title && (
            <h2 className="text-[14px] font-bold text-gray-800 mb-4 tracking-tight">
              {personalInfo.title}
            </h2>
          )}

          <div className="flex justify-between items-baseline text-[12px] text-gray-800">
            <div className="flex flex-col gap-0.5">
              <span>{[personalInfo?.address, personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
              <span>{personalInfo?.phone}</span>
            </div>
            <div className="flex flex-col items-end gap-0.5 text-right">
              {personalInfo?.email && <span className="resume-break-all">{personalInfo.email}</span>}
              {(personalInfo?.socialLinks || []).map((link, idx) => (
                <span key={idx} className="resume-break-all text-gray-700">
                  {link.url}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {/* Summary */}
          {personalInfo?.summary && (
            <div className="resume-section-spacing">
              <SectionHeader title="Summary" />
              <p className="text-[13px] leading-relaxed text-gray-800 text-justify">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="resume-section-spacing">
              <SectionHeader title="Experience" />
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-[14px] text-gray-900">
                        {exp.position}
                      </span>
                      <span className="text-gray-700 text-[12px] font-medium">
                        {exp.startDate} — {exp.endDate || 'Current'}
                      </span>
                    </div>
                    <div className="text-gray-800 mb-2 font-medium italic text-[13px]">
                      {exp.company}{exp.location ? `, ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <ul className="resume-list !pl-4 list-disc">
                        {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                          <li key={i} className="resume-list-item text-justify">
                            {line.replace(/^[•*-]\s*/, '')}
                          </li>
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
            <div className="resume-section-spacing">
              <SectionHeader title="Education" />
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold text-gray-900 text-[14px]">
                        {edu.school}{edu.location ? `, ${edu.location}` : ''}
                      </span>
                      <span className="text-gray-700 text-[12px] font-medium italic">
                        {edu.startDate} — {edu.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="text-gray-800 text-[13px]">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="resume-section-spacing">
              <SectionHeader title="Skills" />
              <ul className="resume-list !pl-4 list-disc grid grid-cols-1 gap-1">
                {skills.map((skill, idx) => (
                  <li key={idx} className="resume-list-item font-bold">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Sections */}
          {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
            if (!items || items.length === 0) return null;
            return (
              <div key={key} className="resume-section-spacing">
                <SectionHeader title={ADDITIONAL_SECTION_LABELS[key] || key} />
                <ul className="resume-list !pl-4 list-disc">
                  {items.map(item => (
                    <li key={item.id} className="resume-list-item">{item.name}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Astralis;
