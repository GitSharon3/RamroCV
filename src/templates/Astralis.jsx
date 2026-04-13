import React, { memo } from 'react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/AdditionalSectionConstants';

/**
 * Astralis Template
 * Features: Clean, modern structure with center-aligned headers and dotted dividers.
 * Best for: Professional general-purpose resumes.
 */
const Astralis = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = "'Times New Roman', Times, serif";

  const renderSectionDivider = (title) => (
    <div className="w-full bg-gray-50 py-1 mb-4 mt-6 text-center border-y border-gray-100">
      <h2 className="uppercase font-bold tracking-widest text-[#1a1a1a] text-[13px]">{title}</h2>
    </div>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas pt-16 pb-12 px-14" style={{ fontFamily }}>
        {/* Profile Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2 text-gray-900 leading-none">
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>
          {personalInfo?.title && <h2 className="text-[16px] font-medium mb-4 text-gray-600 tracking-wide underline underline-offset-4 decoration-gray-200">{personalInfo.title}</h2>}

          <div className="resume-contact-info justify-center text-[12px] opacity-90">
            <span>{[personalInfo?.address, personalInfo?.city, personalInfo?.country].filter(Boolean).join(', ')}</span>
            {personalInfo?.email && (
              <>
                <div className="w-1 h-1 rounded-full bg-gray-300 mx-1"></div>
                <span className="resume-break-all font-medium text-blue-900">{personalInfo.email}</span>
              </>
            )}
            {personalInfo?.phone && (
              <>
                <div className="w-1 h-1 rounded-full bg-gray-300 mx-1"></div>
                <span className="font-medium">{personalInfo.phone}</span>
              </>
            )}
            {(personalInfo?.socialLinks || []).map((link, idx) => (
              <React.Fragment key={idx}>
                <div className="w-1 h-1 rounded-full bg-gray-300 mx-1"></div>
                <span className="resume-break-all font-medium text-gray-700">{link.url}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          {/* Summary */}
          {personalInfo?.summary && (
            <div className="mb-6">
              {renderSectionDivider('Profile')}
              <p className="text-[13px] leading-relaxed text-gray-800 text-justify px-2">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="mb-6">
              {renderSectionDivider('Experience')}
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx} className="px-2">
                    <div className="resume-flex-between font-bold text-gray-900">
                      <span className="text-[14px] uppercase">{exp.position}</span>
                      <span className="text-[12px] tabular-nums">{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    <div className="italic text-gray-700 mb-2 font-medium">
                      {exp.company}{exp.location ? `, ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <ul className="resume-list px-1">
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
            <div className="mb-6">
              {renderSectionDivider('Education')}
              <div className="space-y-4 px-2 text-[13px]">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="resume-flex-between font-bold">
                      <span className="text-[#1a1a1a] uppercase">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</span>
                      <span className="text-gray-600 font-normal italic">{edu.startDate} - {edu.endDate || 'Present'}</span>
                    </div>
                    <div className="text-gray-700 italic font-medium">{edu.school}{edu.location ? `, ${edu.location}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="mb-6">
              {renderSectionDivider('Projects')}
              <div className="space-y-5 px-2">
                {projects.map((proj, idx) => (
                  <div key={idx}>
                    <div className="resume-flex-between font-bold text-gray-900">
                      <span className="uppercase text-[13px]">{proj.name}</span>
                    </div>
                    {proj.technologies && <div className="text-[11px] font-bold text-blue-800 mb-1 opacity-80">{proj.technologies}</div>}
                    {proj.description && (
                      <p className="text-[13px] leading-relaxed text-gray-700">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills with dotted lines */}
          {skills && skills.length > 0 && (
            <div className="mb-6">
              {renderSectionDivider('Skills')}
              <div className="grid grid-cols-2 gap-x-12 gap-y-3 px-2 text-[13px]">
                {skills.map((skill, idx) => (
                  <div key={idx} className="flex items-baseline w-full opacity-90">
                    <span className="whitespace-nowrap pr-2 font-bold text-gray-800 uppercase tracking-tighter text-[11px]">{skill.name}</span>
                    <div className="flex-grow border-b-[1px] border-dotted border-gray-400"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Sections */}
          {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
            if (!items || items.length === 0) return null;
            return (
              <div key={key} className="mb-6">
                {renderSectionDivider(ADDITIONAL_SECTION_LABELS[key] || key)}
                <div className="grid grid-cols-2 gap-x-12 gap-y-2 px-2 text-[13px]">
                  {items.map(item => (
                    <div key={item.id} className="flex items-baseline w-full">
                      <span className="whitespace-nowrap pr-2 font-medium">{item.name}</span>
                      <div className="flex-grow border-b-[0.5px] border-dotted border-gray-300"></div>
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

export default Astralis;
