import React, { memo } from 'react';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';
import './template.css';
import { ADDITIONAL_SECTION_LABELS } from '../constants/AdditionalSectionConstants';

/**
 * Nova Template
 * Features: High-impact two-column design with a profile photo and bold header.
 * Best for: Professional CVs that want to balance visuals with structured data.
 */
const Nova = memo(({ personalInfo, education, experience, skills, projects, additionalSections }) => {
  const fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";

  const SectionHeader = ({ title }) => (
    <h2 className="uppercase font-bold text-[14px] mb-4 text-gray-900 tracking-[0.1em] border-l-4 border-gray-900 pl-4">
      {title}
    </h2>
  );

  return (
    <div className="resume-page-wrapper">
      <div className="resume-a4-canvas flex" style={{ fontFamily }}>

        {/* Left Side Column - Multimedia & Secondary Info */}
        <aside className="w-[34%] bg-[#eef0f3] py-12 flex flex-col items-center">
          {/* Profile Photo - Integrated in this specific design */}
          {(personalInfo?.showPhoto && personalInfo?.photo) && (
            <div className="w-44 h-44 rounded-full overflow-hidden mb-12 border-[6px] border-white shadow-xl relative z-10">
              <img src={personalInfo.photo} className="w-full h-full object-cover" alt="Profile" />
            </div>
          )}
          {(!personalInfo?.photo && personalInfo?.showPhoto) && (
            <div className="w-44 h-44 rounded-full bg-gray-200 mb-12 flex items-center justify-center border-[6px] border-white shadow-xl">
              <span className="text-gray-400 font-bold uppercase tracking-tighter">No Photo</span>
            </div>
          )}

          <div className="w-full px-8 flex flex-col gap-10">
            {/* Core Skills List */}
            <div className="border-t border-gray-300 w-full pt-6">
              <SectionHeader title="Skills" />
              {skills && skills.length > 0 && (
                <ul className="space-y-4 text-[13px] list-none">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-medium text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-900 opacity-50"></div>
                      {skill.name} {skill.level ? <span className="text-[10px] opacity-60 uppercase">({skill.level})</span> : ''}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Portfolio Highlights */}
            {projects && projects.length > 0 && (
              <div className="border-t border-gray-300 w-full pt-6">
                <SectionHeader title="Projects" />
                <div className="space-y-5 text-[13px]">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="flex flex-col gap-1 group">
                      <span className="font-bold text-gray-900 leading-tight border-b border-transparent group-hover:border-gray-400 transition-all">{proj.name}</span>
                      <div className="text-[11px] text-gray-500 font-bold uppercase tracking-tighter">{proj.technologies}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Iterative Additional Sidebar Sections */}
            {additionalSections && Object.entries(additionalSections).map(([key, items]) => {
              if (!items || items.length === 0) return null;
              return (
                <div key={key} className="border-t border-gray-300 w-full pt-6">
                  <SectionHeader title={ADDITIONAL_SECTION_LABELS[key] || key} />
                  <div className="space-y-4 text-[13px] text-gray-700 italic font-medium">
                    {items.map(item => (
                      <div key={item.id} className="flex items-start gap-2">
                        <span>›</span>
                        <span className="leading-tight">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Main Column - Contact & Narratives */}
        <div className="w-[66%] bg-white py-14 px-12">
          {/* Name & Contact Block */}
          <header className="mb-12 border-b-[3px] border-gray-900 pb-10">
            <h1 className="text-5xl font-black text-[#0f172a] uppercase tracking-[-0.05em] mb-4">
              {personalInfo?.firstName}<br />
              <span className="text-gray-400">{personalInfo?.lastName}</span>
            </h1>
            {personalInfo?.title && (
              <h2 className="text-[16px] font-bold text-gray-600 mb-8 uppercase tracking-widest italic">
                {personalInfo.title}
              </h2>
            )}

            <div className="space-y-3 mt-6">
              {personalInfo?.email && (
                <div className="resume-contact-info">
                  <Mail size={14} className="text-gray-900" />
                  <span className="resume-break-all font-bold">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.address && (
                <div className="resume-contact-info">
                  <MapPin size={14} className="text-gray-900" />
                  <span className="font-medium opacity-80">{[personalInfo.address, personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="resume-contact-info">
                  <Phone size={14} className="text-gray-900" />
                  <span className="font-bold">{personalInfo.phone}</span>
                </div>
              )}
              {/* Dynamic Social Links Iteration */}
              {(personalInfo.socialLinks || []).map((link, idx) => (
                <div key={idx} className="resume-contact-info">
                  <Globe size={14} className="text-gray-900" />
                  <span className="resume-break-all text-blue-900 font-bold decoration-blue-100 underline underline-offset-4">{link.url}</span>
                </div>
              ))}
            </div>
          </header>

          <div className="flex flex-col gap-12">
            {/* Executive Summary */}
            {personalInfo?.summary && (
              <div className="resume-section-spacing">
                <SectionHeader title="Profile Summary" />
                <p className="text-[14px] leading-relaxed text-gray-800 text-justify font-medium mt-4">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {/* Experience Timeline */}
            {experience && experience.length > 0 && (
              <div className="border-t border-gray-100 pt-8">
                <SectionHeader title="Career Experience" />
                <div className="space-y-8 mt-6">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-black text-gray-900 text-[15px] uppercase tracking-tight">
                          {exp.position}
                        </h3>
                        <span className="text-[11px] font-bold text-gray-400 tabular-nums uppercase border border-gray-100 px-2 py-0.5 rounded">
                          {exp.startDate} — {exp.endDate || 'Present'}
                        </span>
                      </div>
                      <div className="mb-4 text-gray-500 font-bold text-[13px] italic">
                        {exp.company} <span className="opacity-50">•</span> {exp.location}
                      </div>
                      {exp.description && (
                        <ul className="resume-list pl-4 border-l-2 border-gray-900">
                          {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                            <li key={i} className="resume-list-item font-medium">{line.replace(/^[•*-]\s*/, '')}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Educational History */}
            {education && education.length > 0 && (
              <div className="border-t border-gray-100 pt-8">
                <SectionHeader title="Education" />
                <div className="space-y-6 mt-6">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-black text-gray-900 text-[14px] uppercase tracking-tighter">
                          {edu.degree} {edu.field ? <span className="text-gray-400 font-bold">/ {edu.field}</span> : ''}
                        </span>
                        <span className="text-gray-400 font-bold text-[11px] tabular-nums">
                          {edu.startDate} — {edu.endDate || 'Present'}
                        </span>
                      </div>
                      <div className="text-gray-600 font-bold text-[12px] italic uppercase tracking-widest">
                        {edu.school}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Nova;
