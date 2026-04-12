import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Nova = ({ personalInfo, education, experience, skills, projects }) => {
  const fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";

  const SectionHeader = ({ title }) => (
    <h2 className="uppercase font-bold text-[14px] mb-3 text-gray-900 tracking-wide">
      {title}
    </h2>
  );

  return (
    <div className="w-full h-full flex justify-center bg-[#f8f9fb]">
      <div className="w-full h-full min-h-[297mm] flex shadow-sm max-w-[210mm] text-gray-800" style={{ fontFamily }}>
        {/* Left Column */}
        <div className="w-[34%] bg-[#eef0f3] py-10 flex flex-col items-center">
          {/* Profile Photo */}
          {(personalInfo?.showPhoto && personalInfo?.photo) && (
            <div className="w-44 h-44 rounded-full overflow-hidden mb-10 border-4 border-white shadow-md">
              <img src={personalInfo.photo} className="w-full h-full object-cover" alt="Profile" />
            </div>
          )}
          {(!personalInfo?.photo && personalInfo?.showPhoto) && (
            <div className="w-44 h-44 rounded-full bg-gray-300 opacity-50 mb-10 flex items-center justify-center border-4 border-white">
               <span className="text-gray-500 text-sm">Photo</span>
            </div>
          )}

          <div className="w-full px-8 flex flex-col gap-8">
            <div className="border-t border-gray-400 w-full pt-4">
              <SectionHeader title="Skills" />
              {skills && skills.length > 0 && (
                <ul className="space-y-4 text-[13px] list-none">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center before:content-['•'] before:mr-2 before:text-lg before:leading-none">
                       {skill.name} {skill.level ? `(${skill.level})` : ''}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* We don't have distinct languages from skills in data model usually, but we could render Projects or something else here if needed. 
                I'll render Projects here if it exists to balance out the columns like the "Languages" section in the image. */}
            {projects && projects.length > 0 && (
               <div className="border-t border-gray-400 w-full pt-4">
                 <SectionHeader title="Projects" />
                 <div className="space-y-4 text-[13px] list-none">
                   {projects.map((proj, idx) => (
                      <div key={idx} className="flex items-start before:content-['•'] before:mr-2 before:text-lg before:leading-none">
                        <div>
                           <span className="font-bold">{proj.name}</span>
                           <div className="text-xs text-gray-600 mt-0.5">{proj.technologies}</div>
                        </div>
                      </div>
                   ))}
                 </div>
               </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[66%] bg-white py-12 px-10">
          {/* Header Info */}
          <div className="mb-10 border-b border-gray-200 pb-8">
            <h1 className="text-4xl font-extrabold text-[#0f172a] uppercase tracking-wider mb-2">
              {personalInfo?.firstName} {personalInfo?.lastName}
            </h1>
            {personalInfo?.title && (
              <h2 className="text-[15px] font-medium text-gray-700 mb-6">
                {personalInfo.title}
              </h2>
            )}

            <div className="space-y-2.5 text-[13px] text-gray-800 font-medium tracking-wide">
              {personalInfo?.email && (
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-gray-700" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.address && (
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-gray-700" />
                  <span>{[personalInfo.address, personalInfo.city, personalInfo.state, personalInfo.zip, personalInfo.country].filter(Boolean).join(', ')}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-gray-700" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8">
            {personalInfo?.summary && (
              <div>
                <SectionHeader title="Summary" />
                <p className="text-[13px] leading-relaxed text-justify">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {experience && experience.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <SectionHeader title="Experience" />
                <div className="space-y-6 text-[13px] mt-2">
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="font-bold text-gray-900 text-[14px] mb-0.5">
                        {exp.position}{exp.company ? `, ${exp.company}` : ''}{exp.location ? `, ${exp.location}` : ''}
                      </div>
                      <div className="mb-2 text-gray-600 font-medium">
                        {exp.startDate} — {exp.endDate || 'Current'}
                      </div>
                      {exp.description && (
                        <ul className="list-disc pl-4 space-y-1.5 mt-2">
                          {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                            <li key={i}>{line.replace(/^[•*-]\s*/, '')}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education && education.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <SectionHeader title="Education" />
                <div className="space-y-5 text-[13px] mt-2">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="font-bold text-gray-900 text-[14px] mb-0.5">
                        {edu.degree}{edu.field ? ` of ${edu.field}` : ''}{edu.school ? `, ${edu.school}` : ''}
                      </div>
                      <div className="text-gray-600 font-medium">
                        {edu.startDate} — {edu.endDate || 'Current'}
                      </div>
                      {edu.description && (
                         <div className="mt-1">{edu.description}</div>
                      )}
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
};
export default Nova;
