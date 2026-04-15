import React, { memo } from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/resumeConstants';

/**
 * Celestial Template
 * Features: Clean, modern sans-serif layout with a professional grey sidebar.
 * Based on: reference image template1.png
 */
const Celestial = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const { firstName, lastName, title, summary, email, phone, address, city, country, socialLinks = [] } = personalInfo;

  const fontFamily = "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const SectionHeader = ({ title }) => (
    <div className="w-full mb-4 mt-6">
      <h2 className="uppercase font-bold text-gray-800 text-[14px] leading-tight tracking-widest mb-1">{title}</h2>
      <div className="w-full border-t border-gray-300"></div>
    </div>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas flex bg-white" style={{ fontFamily }}>
        {/* Left Sidebar - Light Grey as per template1.png */}
        <aside className="w-[34%] bg-[#ededf0] p-10 flex flex-col gap-10">
          {/* Branding */}
          <div>
            <h1 className="text-3xl font-bold text-[#374151] leading-tight uppercase tracking-tight mb-1">
              {firstName} <br />
              {lastName}
            </h1>
            <p className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">
              {title}
            </p>
          </div>

          {/* Details */}
          <div>
            <h2 className="uppercase font-bold text-gray-800 text-[14px] leading-tight tracking-widest mb-4 border-b border-gray-300 pb-1">Details</h2>
            <div className="space-y-4 text-[12px] text-gray-800">
              {email && (
                <div className="flex items-center gap-3">
                   <Mail size={14} className="text-gray-900" />
                   <span className="resume-break-all">{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-3">
                   <Phone size={14} className="text-gray-900" />
                   <span>{phone}</span>
                </div>
              )}
              {(address || city) && (
                <div className="flex items-start gap-3">
                   <MapPin size={14} className="text-gray-900 mt-0.5" />
                   <span className="leading-snug">
                     {address}{address ? ', ' : ''}{city}{city && country ? ', ' : ''}{country}
                   </span>
                </div>
              )}
              {socialLinks.map((link, idx) => (
                <div key={idx} className="flex items-center gap-3">
                   <Globe size={14} className="text-gray-900" />
                   <span className="resume-break-all">{link.url}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="uppercase font-bold text-gray-800 text-[14px] leading-tight tracking-widest mb-4 border-b border-gray-300 pb-1">Skills</h2>
              <ul className="space-y-2 text-[12px] font-medium text-gray-800">
                {skills.map((skill, idx) => (
                  <li key={idx} className="flex items-baseline gap-2">
                    <span className="text-[10px]">•</span>
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sidebar Additional Sections */}
          {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
            if (!items || items.length === 0) return null;
            return (
              <div key={key}>
                <h2 className="uppercase font-bold text-gray-800 text-[14px] leading-tight tracking-widest mb-4 border-b border-gray-300 pb-1">
                  {ADDITIONAL_SECTION_LABELS[key] || key}
                </h2>
                <ul className="space-y-2 text-[12px] text-gray-700">
                  {items.map(item => (
                    <li key={item.id} className="flex items-baseline gap-2">
                      <span className="text-[10px]">-</span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-12 bg-white flex flex-col gap-8">
          {/* Summary */}
          {summary && (
            <div>
              <SectionHeader title="Summary" />
              <p className="text-[14px] text-gray-700 leading-relaxed text-left">
                {summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <SectionHeader title="Experience" />
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="text-[12px] font-bold text-gray-500 mb-1">
                      {exp.startDate} — {exp.endDate || 'Current'}
                    </div>
                    <h3 className="text-[15px] font-bold text-gray-900 uppercase tracking-tight mb-1">
                      {exp.position}
                    </h3>
                    <div className="text-[13px] font-bold text-gray-700 mb-3 italic">
                      {exp.company}, {exp.location}
                    </div>
                    {exp.description && (
                      <ul className="space-y-2 text-[13px] text-gray-700">
                        {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                           <li key={i} className="flex gap-2">
                             <span className="flex-shrink-0">•</span>
                             <span className="text-justify">{line.replace(/^[•*-]\s*/, '')}</span>
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
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="text-[12px] font-bold text-gray-500 mb-1">
                      {edu.startDate} — {edu.endDate || 'Present'}
                    </div>
                    <h3 className="text-[14px] font-bold text-gray-900 uppercase mb-1">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </h3>
                    <div className="text-[13px] font-bold text-gray-700 italic">
                      {edu.school}, {edu.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
});

export default Celestial;
