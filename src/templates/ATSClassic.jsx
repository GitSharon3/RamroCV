import React, { memo } from 'react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/AdditionalSectionConstants';

/**
 * ATS Classic Template
 * Features: High machine readability, standard sans-serif font, logical structure.
 * Best for: Standard corporate applications and legacy portal uploads.
 */
const ATSClassic = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = "Arial, Helvetica, sans-serif";

  const SectionHeader = ({ title }) => (
    <div className="mb-3 border-b border-gray-400 pb-1 mt-5">
      <h2 className="uppercase font-bold text-[16px] text-gray-900 tracking-wide">
        {title}
      </h2>
    </div>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas px-14 py-12" style={{ fontFamily }}>
        {/* Header - Centered for Classic Look */}
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-1 uppercase">
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>
          {personalInfo?.title && (
            <h2 className="text-[14px] font-bold text-gray-800 mb-2">
              {personalInfo.title}
            </h2>
          )}

          <div className="resume-contact-info justify-center border-t border-gray-100 pt-2">
            <span>{[personalInfo?.address, personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
            {personalInfo?.email && (
              <>
                <span className="text-gray-300">|</span>
                <span className="resume-break-all">{personalInfo.email}</span>
              </>
            )}
            {personalInfo?.phone && (
              <>
                <span className="text-gray-300">|</span>
                <span>{personalInfo.phone}</span>
              </>
            )}
            {(personalInfo?.socialLinks || []).map((link, idx) => (
              <React.Fragment key={idx}>
                <span className="text-gray-300">|</span>
                <span className="resume-break-all text-blue-800">{link.url}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Professional Summary */}
        {personalInfo?.summary && (
          <div className="resume-section-spacing">
            <SectionHeader title="Professional Summary" />
            <p className="text-[13px] leading-relaxed text-gray-800">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <div className="resume-section-spacing">
            <SectionHeader title="Professional Experience" />
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="resume-flex-between">
                    <span className="font-bold text-[14px] text-gray-900">
                      {exp.position}
                    </span>
                    <span className="text-gray-700 text-[12px] italic">
                      {exp.startDate} — {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <div className="mb-1 text-gray-800 font-bold text-[13px]">
                    {exp.company}{exp.location ? `, ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <ul className="resume-list">
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

        {/* Education Section */}
        {education && education.length > 0 && (
          <div className="resume-section-spacing">
            <SectionHeader title="Education" />
            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="resume-flex-between">
                    <span className="font-bold text-gray-900 text-[14px]">
                      {edu.school}{edu.location ? `, ${edu.location}` : ''}
                    </span>
                    <span className="text-gray-700 text-[12px] italic">
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

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <div className="resume-section-spacing">
            <SectionHeader title="Skills" />
            <div className="text-[13px] mt-2 text-gray-800">
              <span className="font-bold uppercase tracking-tighter">Core Competencies: </span>
              {skills.map((skill, idx) => (
                <span key={idx}>
                  {skill.name}{idx < skills.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Custom Additional Sections */}
        {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
          if (!items || items.length === 0) return null;
          return (
            <div key={key} className="resume-section-spacing">
              <SectionHeader title={ADDITIONAL_SECTION_LABELS[key] || key} />
              <ul className="resume-list">
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
