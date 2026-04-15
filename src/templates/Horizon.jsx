import React, { memo } from 'react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/resumeConstants';

/**
 * Horizon Template
 * Features: Geometric left sidebar with a framed header box.
 * Based on: reference image template5.png
 */
const Horizon = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const SectionHeader = ({ title }) => (
    <h2 className="uppercase font-bold text-[13px] tracking-widest mb-4 border-b-[2px] border-black pb-1 text-gray-900">
      {title}
    </h2>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas flex bg-white" style={{ fontFamily }}>

        {/* Left Sidebar - Details & Skills */}
        <aside className="w-[32%] bg-[#efeff1] pt-32 pb-10 px-8 flex flex-col gap-10">
          <div>
            <SectionHeader title="Details" />
            <div className="space-y-5 text-[12px] tabular-nums">
              <div>
                <h3 className="font-bold text-gray-900 mb-1 leading-none uppercase tracking-tighter">Address</h3>
                <p className="text-gray-700 font-medium">{[personalInfo?.address, personalInfo?.city, personalInfo?.country]
                  .filter(Boolean).join(', ')}</p>
              </div>
              {personalInfo?.phone && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 leading-none uppercase tracking-tighter">Phone</h3>
                  <p className="text-gray-700 font-medium">{personalInfo.phone}</p>
                </div>
              )}
              {personalInfo?.email && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 leading-none uppercase tracking-tighter">Email</h3>
                  <p className="resume-break-all text-gray-700 font-medium">{personalInfo.email}</p>
                </div>
              )}
              {(personalInfo?.socialLinks || []).map((link, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-gray-900 mb-1 leading-none uppercase tracking-tighter">{link.platform || 'Social'}</h3>
                  <p className="resume-break-all text-gray-700 font-medium">{link.url}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Skills */}
          {skills && skills.length > 0 && (
            <div>
              <SectionHeader title="Skills" />
              <ul className="space-y-2 text-[12px] font-medium text-gray-700">
                {skills.map((skill, idx) => (
                  <li key={idx} className="leading-tight">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Main Content */}
        <main className="w-[68%] bg-white pt-16 pb-10 px-10 relative">

          {/* Centered Framed Name Box as per template5.png */}
          <div className="border-[1.5px] border-black p-8 mb-10 text-center mx-auto max-w-[340px] absolute top-16 left-10 right-10 bg-white z-10">
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight mb-2">
              {personalInfo?.firstName} {personalInfo?.lastName}
            </h1>
            {personalInfo?.title && (
              <h2 className="text-[13px] font-bold text-gray-600 uppercase tracking-widest pt-2">
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
                <p className="text-[13px] leading-relaxed text-gray-800 text-justify font-medium">
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
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[14px] font-bold text-gray-900 uppercase tracking-tight">{exp.position}, {exp.company}</span>
                        <span className="text-gray-900 text-[11px] font-bold ml-4 whitespace-nowrap">{exp.location}</span>
                      </div>
                      <div className="text-gray-700 font-bold text-[12px] mb-3">
                        {exp.startDate} — {exp.endDate || 'Present'}
                      </div>
                      {exp.description && (
                        <ul className="space-y-1.5 list-disc pl-5">
                          {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                            <li key={i} className="text-[12px] text-gray-800 leading-snug">
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

            {/* Academic Journey */}
            {education && education.length > 0 && (
              <div>
                <SectionHeader title="Education" />
                <div className="space-y-6">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[13px] font-bold text-gray-900 uppercase tracking-tight">{edu.school}</span>
                        <span className="text-gray-900 text-[11px] font-bold ml-4 whitespace-nowrap">{edu.location}</span>
                      </div>
                      <div className="text-gray-800 font-bold text-[12px]">
                         {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                      </div>
                      <div className="text-gray-700 text-[11px] font-bold mt-0.5">
                        {edu.startDate} — {edu.endDate || 'Present'}
                      </div>
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
                  <ul className="list-disc pl-5 space-y-1">
                    {items.map(item => (
                      <li key={item.id} className="text-[12px] text-gray-800 font-medium">{item.name}</li>
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
