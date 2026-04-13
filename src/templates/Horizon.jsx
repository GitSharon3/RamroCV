import React, { memo } from 'react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/AdditionalSectionConstants';

/**
 * Horizon Template
 * Features: Geometric left sidebar with a framed header box.
 * Best for: Highlighting contact details and skills in a prominent sidebar.
 */
const Horizon = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";

  const SectionHeader = ({ title }) => (
    <h2 className="uppercase font-bold text-[13px] tracking-widest mb-4 border-b-[2px] border-black pb-1 text-gray-900">
      {title}
    </h2>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas flex shadow-2xl" style={{ fontFamily }}>

        {/* Left Sidebar - Details & Skills */}
        <aside className="w-[32%] bg-[#f4f4f5] pt-32 pb-10 px-8 flex flex-col gap-10">
          <div>
            <SectionHeader title="Details" />
            <div className="space-y-5 text-[12px] tabular-nums">
              <div>
                <h3 className="font-bold text-gray-500 mb-1 leading-none uppercase tracking-tighter">Address</h3>
                <p className="text-gray-900 font-medium">{[personalInfo?.address, personalInfo?.city, personalInfo?.country]
                  .filter(Boolean).join(', ')}</p>
              </div>
              {personalInfo?.phone && (
                <div>
                  <h3 className="font-bold text-gray-500 mb-1 leading-none uppercase tracking-tighter">Phone</h3>
                  <p className="text-gray-900 font-medium">{personalInfo.phone}</p>
                </div>
              )}
              {personalInfo?.email && (
                <div>
                  <h3 className="font-bold text-gray-500 mb-1 leading-none uppercase tracking-tighter">Email</h3>
                  <p className="resume-break-all text-gray-900 font-medium underline decoration-gray-200">{personalInfo.email}</p>
                </div>
              )}
              {/* Iterating through multiple social links */}
              {(personalInfo?.socialLinks || []).map((link, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-500 mb-1 leading-none uppercase tracking-tighter">{link.platform || 'Social'}</h3>
                  <p className="resume-break-all text-blue-800 font-medium italic">{link.url}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Skills */}
          {skills && skills.length > 0 && (
            <div>
              <SectionHeader title="Skills" />
              <div className="space-y-2 text-[12px]">
                {skills.map((skill, idx) => (
                  <div key={idx} className="font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Content */}
        <main className="w-[68%] bg-white pt-16 pb-10 px-10 relative">

          {/* Decorative Floating Name Box */}
          <div className="border-[1.5px] border-black p-8 mb-10 text-center mx-auto max-w-[340px] absolute top-16 left-10 right-10 bg-white shadow-lg z-10">
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">
              {personalInfo?.firstName} {personalInfo?.lastName}
            </h1>
            {personalInfo?.title && (
              <h2 className="text-[12px] font-bold text-gray-500 uppercase tracking-[0.2em] border-t border-gray-100 pt-2">
                {personalInfo.title}
              </h2>
            )}
          </div>

          {/* Placeholder for Absolute Box height */}
          <div className="h-44"></div>

          <div className="flex flex-col gap-10">
            {/* Professional Summary */}
            {personalInfo?.summary && (
              <div>
                <SectionHeader title="Summary" />
                <p className="text-[13px] leading-relaxed text-gray-800 text-justify font-medium opacity-90">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {/* Career Timeline */}
            {experience && experience.length > 0 && (
              <div>
                <SectionHeader title="Experience" />
                <div className="space-y-6">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="group">
                      <div className="resume-flex-between font-black text-gray-900 border-b border-gray-50 pb-1 mb-2">
                        <span className="text-[14px] uppercase">{exp.position}</span>
                        <span className="text-gray-400 text-[11px] tabular-nums tracking-tighter ml-4">{exp.startDate} — {exp.endDate || 'Present'}</span>
                      </div>
                      <div className="mb-2 text-gray-600 font-bold text-[12px] italic uppercase tracking-wider">
                        {exp.company} <span className="text-gray-300 mx-1">/</span> {exp.location}
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

            {/* Academic Journey */}
            {education && education.length > 0 && (
              <div>
                <SectionHeader title="Education" />
                <div className="space-y-6">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="resume-flex-between font-black text-gray-900">
                        <span className="text-[13px] uppercase tracking-tight">{edu.school}</span>
                        <span className="text-gray-400 text-[11px] font-bold tabular-nums ml-4">{edu.startDate} — {edu.endDate || 'Present'}</span>
                      </div>
                      <div className="text-gray-600 font-bold text-[12px] italic border-l-2 border-gray-100 pl-3 mt-1 underline underline-offset-4 decoration-gray-100">
                        {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shared Additional Sections */}
            {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
              if (!items || items.length === 0) return null;
              return (
                <div key={key}>
                  <SectionHeader title={ADDITIONAL_SECTION_LABELS[key] || key} />
                  <ul className="resume-list pl-4 opacity-90">
                    {items.map(item => (
                      <li key={item.id} className="resume-list-item font-medium">{item.name}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
});

export default Horizon;
