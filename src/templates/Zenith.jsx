import React, { memo } from 'react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/resumeConstants';

/**
 * Zenith Template
 * Features: Highly structured legal/corporate design with grey-bar headers and dotted leaders.
 * Based on: reference image template2.png
 */
const Zenith = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = '"Times New Roman", Times, serif';

  const CloverIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900 mr-2 inline-block -mt-1">
      <path d="M12 2C10.5 2 9 3.5 9 5s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm0 14c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm-7-7c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm14 0c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z"/>
    </svg>
  );

  const SectionHeader = ({ title }) => (
    <div className="w-full bg-[#efeff1] py-1.5 mb-6 mt-8 flex justify-center items-center">
      <h2 className="uppercase font-bold text-[14px] tracking-[0.2em] text-gray-900 leading-none">
        {title}
      </h2>
    </div>
  );

  const DottedLeader = () => (
    <div className="flex-grow mx-2 border-b border-dotted border-gray-400"></div>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas px-14 py-12" style={{ fontFamily }}>
        {/* Header - Centered as per template2.png */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-1 uppercase tracking-wider">
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>
          {personalInfo?.title && (
            <h2 className="text-[14px] font-bold text-gray-800 mb-4 tracking-normal">
              {personalInfo.title}
            </h2>
          )}

          <div className="text-[12px] text-gray-800 space-y-1">
            <div className="flex justify-center">
              <span>{[personalInfo?.address, personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
            </div>
            <div className="flex justify-center gap-6 font-bold">
              {personalInfo?.email && <span className="resume-break-all underline decoration-gray-200">{personalInfo.email}</span>}
              {personalInfo?.phone && <span>{personalInfo.phone}</span>}
            </div>
          </div>
        </div>

        {/* Double divider below header */}
        <div className="w-full border-t border-gray-800 mb-0.5"></div>
        <div className="w-full border-t border-gray-800 mb-6"></div>

        <div className="flex flex-col">
          {/* Summary */}
          {personalInfo?.summary && (
            <div>
              <SectionHeader title="SUMMARY" />
              <p className="text-[13px] leading-relaxed text-gray-800 text-justify">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <SectionHeader title="EXPERIENCE" />
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline w-full">
                      <div className="flex items-baseline flex-shrink-0">
                        <CloverIcon />
                        <span className="font-bold text-[14px] text-gray-900">
                          {exp.position}, {exp.company}
                        </span>
                      </div>
                      <DottedLeader />
                      <span className="text-gray-900 text-[12px] font-medium flex-shrink-0">
                        {exp.startDate} — {exp.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="text-right text-gray-600 text-[12px] italic -mt-0.5 mb-2">
                       {exp.location}
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
            <div>
              <SectionHeader title="EDUCATION" />
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline w-full">
                      <div className="flex items-baseline flex-shrink-0">
                        <CloverIcon />
                        <span className="font-bold text-gray-900 text-[14px]">
                          {edu.school}
                        </span>
                      </div>
                      <DottedLeader />
                      <span className="text-gray-900 text-[12px] font-medium flex-shrink-0">
                        {edu.startDate} — {edu.endDate || 'Present'}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline -mt-0.5">
                       <span className="text-gray-800 text-[13px] italic">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</span>
                       <span className="text-gray-600 text-[12px] italic">{edu.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills - Two Columns with Leaders */}
          {skills && skills.length > 0 && (
            <div>
              <SectionHeader title="SKILLS" />
              <div className="grid grid-cols-2 gap-x-12 gap-y-2 mt-1 px-1">
                {skills.map((skill, idx) => (
                  <div key={idx} className="flex items-baseline w-full">
                    <span className="font-bold text-gray-800 text-[12px] flex-shrink-0 whitespace-nowrap">{skill.name}</span>
                    <DottedLeader />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Sections */}
          {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
            if (!items || items.length === 0) return null;
            return (
              <div key={key}>
                <SectionHeader title={ADDITIONAL_SECTION_LABELS[key]?.toUpperCase() || key.toUpperCase()} />
                <div className="grid grid-cols-2 gap-x-12 gap-y-1">
                  {items.map(item => (
                    <div key={item.id} className="flex items-baseline">
                       <span className="text-gray-800 text-[12px]">{item.name}</span>
                       <DottedLeader />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Zenith;
