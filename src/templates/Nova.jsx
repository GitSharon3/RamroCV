import React, { memo } from 'react';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/resumeConstants';

/**
 * Nova Template
 * Features: High-impact two-column design with a distinct profile photo and bold contact info.
 * Based on: reference image template6.png
 */
const Nova = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const SectionHeader = ({ title }) => (
    <div className="w-full mb-4 mt-6">
      <h2 className="uppercase font-bold text-gray-900 text-[14px] leading-tight tracking-[0.1em] mb-1">{title}</h2>
      <div className="w-full border-t border-gray-200"></div>
    </div>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas flex bg-white" style={{ fontFamily }}>

        {/* Left Side Sidebar - Photo & Secondary Info */}
        <aside className="w-[34%] bg-[#efeff1] py-12 flex flex-col items-center">
          {/* Circular Profile Photo Area */}
          {(personalInfo?.showPhoto) && (
            <div className="w-48 h-48 rounded-full overflow-hidden mb-12 border-[6px] border-white shadow-sm bg-white flex items-center justify-center">
              {personalInfo.photo ? (
                <img src={personalInfo.photo} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="text-gray-300 text-[10px] font-bold uppercase p-4 text-center italic">Photo Space</div>
              )}
            </div>
          )}

          <div className="w-full px-8 flex flex-col gap-10">
            {/* Skills */}
            {skills && skills.length > 0 && (
              <div>
                <SectionHeader title="Skills" />
                <ul className="space-y-4 text-[13px] font-medium text-gray-700 mt-2">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-900 opacity-50"></div>
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Iterative Languages / Additional Sidebar Sections */}
            {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
              if (!items || items.length === 0) return null;
              return (
                <div key={key}>
                  <SectionHeader title={ADDITIONAL_SECTION_LABELS[key]?.toUpperCase() || key.toUpperCase()} />
                  <ul className="space-y-3 text-[13px] text-gray-700 font-medium mt-2">
                    {items.map(item => (
                      <li key={item.id} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-900 opacity-30"></div>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Side Main - Contact & Details */}
        <main className="w-[66%] bg-white py-14 px-12">
          {/* Header Block with Name & Title */}
          <header className="mb-10">
            <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tight mb-2">
               {personalInfo?.firstName} <br />
               {personalInfo?.lastName}
            </h1>
            {personalInfo?.title && (
              <h2 className="text-[14px] font-bold text-gray-600 mb-8 uppercase tracking-widest leading-tight">
                {personalInfo.title}
              </h2>
            )}

            {/* Contact Info Stack with Icons */}
            <div className="space-y-3 mt-4 border-t border-gray-100 pt-6">
              {personalInfo?.email && (
                <div className="flex items-center gap-3 text-[13px] font-medium text-gray-800">
                  <Mail size={14} className="text-gray-900" />
                  <span className="resume-break-all font-bold">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.address && (
                <div className="flex items-center gap-3 text-[13px] font-medium text-gray-700">
                  <MapPin size={14} className="text-gray-900" />
                  <span>{[personalInfo.address, personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center gap-3 text-[13px] font-medium text-gray-800">
                  <Phone size={14} className="text-gray-900" />
                  <span className="font-bold">{personalInfo.phone}</span>
                </div>
              )}
              {(personalInfo.socialLinks || []).map((link, idx) => (
                <div key={idx} className="flex items-center gap-3 text-[13px] font-medium text-gray-900">
                  <Globe size={14} className="text-gray-900" />
                  <span className="font-bold underline decoration-gray-100 underline-offset-4">{link.url}</span>
                </div>
              ))}
            </div>
          </header>

          <div className="flex flex-col gap-10">
            {/* Summary */}
            {personalInfo?.summary && (
              <div>
                <SectionHeader title="Summary" />
                <p className="text-[14px] leading-relaxed text-gray-800 font-medium">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
              <div>
                <SectionHeader title="Experience" />
                <div className="space-y-8 mt-4">
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                       <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-black text-gray-900 text-[15px] uppercase tracking-tight">
                            {exp.position}, {exp.company}
                          </h3>
                       </div>
                       <div className="text-[12px] font-bold text-gray-500 italic mb-2">
                         {exp.startDate} — {exp.endDate || 'Present'} | {exp.location}
                       </div>
                       {exp.description && (
                        <ul className="space-y-1.5 list-disc pl-5">
                          {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                            <li key={i} className="text-[13px] text-gray-700 leading-snug">
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
                <SectionHeader title="Education" />
                <div className="space-y-6 mt-4">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                       <div className="font-black text-gray-900 text-[14px] uppercase mb-0.5">
                          {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                       </div>
                       <div className="text-gray-600 font-bold text-[12px] italic">
                         {edu.school} | {edu.startDate} — {edu.endDate || 'Present'}
                       </div>
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

export default Nova;
