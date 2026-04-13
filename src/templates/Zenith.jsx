import React, { memo } from 'react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/AdditionalSectionConstants';

/**
 * Zenith Template
 * Features: Elegant single-column layout with centered header and wide margins.
 * Best for: High-level executives and academics wanting a sophisticated look.
 */
const Zenith = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = "'Times New Roman', Times, serif"; // Classic serif font

  const SectionHeader = ({ title }) => (
    <div className="flex flex-col items-center mb-6 mt-8">
      <h2 className="uppercase font-bold text-[14px] tracking-[0.3em] text-gray-900 leading-none">
        {title}
      </h2>
      <div className="h-[0.5px] w-12 bg-gray-300 mt-2.5"></div>
    </div>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas px-16 py-14" style={{ fontFamily }}>

        {/* Centered Profile Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-normal mb-3 text-gray-900 uppercase tracking-[0.15em] leading-tight">
            {personalInfo?.firstName} <span className="font-bold">{personalInfo?.lastName}</span>
          </h1>
          {personalInfo?.title && (
            <h2 className="text-[13px] font-bold mb-4 tracking-[0.2em] text-gray-500 uppercase">
              {personalInfo.title}
            </h2>
          )}

          <div className="resume-contact-info justify-center text-[11px] gap-6 uppercase tracking-wider opacity-80 border-y border-gray-50 py-3 mt-4">
            {personalInfo?.email && <span className="resume-break-all">{personalInfo.email}</span>}
            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
            {(personalInfo?.socialLinks || []).map((link, idx) => (
              <span key={idx} className="resume-break-all font-bold text-gray-900 border-b border-gray-200">{link.url}</span>
            ))}
          </div>
          <div className="text-[11px] mt-2 text-gray-400 italic">
            {[personalInfo?.address, personalInfo?.city, personalInfo?.country].filter(Boolean).join(' • ')}
          </div>
        </div>

        {/* Narrative Split */}
        <div className="flex flex-col gap-10">
          {/* Professional Narrative (Summary) */}
          {personalInfo?.summary && (
            <div className="px-4">
              <SectionHeader title="Narrative" />
              <p className="text-[13px] leading-relaxed text-gray-800 text-center italic font-serif opacity-90 px-6">
                "{personalInfo.summary}"
              </p>
            </div>
          )}

          {/* Core Experience */}
          {experience && experience.length > 0 && (
            <div>
              <SectionHeader title="Experience" />
              <div className="space-y-10 px-4">
                {experience.map((exp, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="mb-1">
                      <span className="font-bold text-[15px] uppercase tracking-tight text-gray-900">{exp.position}</span>
                    </div>
                    <div className="text-gray-500 text-[12px] uppercase tracking-widest font-bold mb-1">
                      {exp.company}{exp.location ? ` / ${exp.location}` : ''}
                    </div>
                    <div className="text-[11px] font-bold text-gray-400 mb-4 tracking-tighter tabular-nums underline decoration-gray-100 underline-offset-4">
                      {exp.startDate} — {exp.endDate || 'Present'}
                    </div>
                    {exp.description && (
                      <ul className="space-y-2 max-w-lg">
                        {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                          <li key={i} className="text-[13px] leading-relaxed text-gray-700">{line.replace(/^[•*-]\s*/, '')}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic Background */}
          {education && education.length > 0 && (
            <div>
              <SectionHeader title="Education" />
              <div className="space-y-8 px-4 text-center">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="font-bold text-[14px] uppercase text-gray-900 mb-1">{edu.school}</div>
                    <div className="text-gray-600 text-[12px] italic">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1">
                      {edu.startDate} — {edu.endDate || 'Present'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Proficiencies */}
          {skills && skills.length > 0 && (
            <div>
              <SectionHeader title="Proficiencies" />
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 px-8 text-[12px] uppercase tracking-widest text-gray-700 font-bold">
                {skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Sections */}
          {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
            if (!items || items.length === 0) return null;
            return (
              <div key={key}>
                <SectionHeader title={ADDITIONAL_SECTION_LABELS[key] || key} />
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-8 text-[12px] text-gray-600 italic">
                  {items.map(item => (
                    <div key={item.id} className="border-b border-gray-100 pb-0.5">{item.name}</div>
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
