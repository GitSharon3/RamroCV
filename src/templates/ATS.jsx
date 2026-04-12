import React from 'react';

const ATS = ({ personalInfo, education, experience, skills, projects }) => {
  const fontFamily = "'Times New Roman', Times, serif"; // Serif font for classic ATS feel

  const SectionHeader = ({ title }) => (
    <div className="mb-3 border-b-[3.5px] border-double border-gray-900 pb-0.5 mt-5">
      <h2 className="capitalize font-bold text-[16px] text-gray-900 tracking-wide">
        {title}
      </h2>
    </div>
  );

  return (
    <div className="w-full h-full flex justify-center bg-[#f8f9fb]">
      <div className="bg-white w-full h-full min-h-[297mm] text-[#1a1a1a] shadow-sm max-w-[210mm] px-14 py-12" style={{ fontFamily }}>
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>
          {personalInfo?.title && (
            <h2 className="text-[14px] font-bold text-gray-900 mb-2">
              {personalInfo.title}
            </h2>
          )}
          
          <div className="text-[13px] text-gray-800 flex justify-between items-baseline mb-0.5">
            <span>{[personalInfo?.address, personalInfo?.city, personalInfo?.state, personalInfo?.zip, personalInfo?.country].filter(Boolean).join(', ')}</span>
            <span>{personalInfo?.email}</span>
          </div>
          {personalInfo?.phone && (
            <div className="text-[13px] text-gray-800">
              {personalInfo.phone}
            </div>
          )}
        </div>

        {/* Content */}
        {personalInfo?.summary && (
          <div>
            <SectionHeader title="Summary" />
            <p className="text-[13px] leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {experience && experience.length > 0 && (
          <div>
            <SectionHeader title="Experience" />
            <div className="space-y-4 text-[13px]">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="font-bold text-[14px] text-gray-900 mb-0.5">
                    {exp.position}
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="italic text-gray-800">
                      {exp.company}{exp.location ? `, ${exp.location}` : ''}
                    </span>
                    <span className="italic text-gray-800 whitespace-nowrap">
                      {exp.startDate} — {exp.endDate || 'Current'}
                    </span>
                  </div>
                  {exp.description && (
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                      {exp.description.split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i} className="leading-relaxed">{line.replace(/^[•*-]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {education && education.length > 0 && (
          <div>
            <SectionHeader title="Education" />
            <div className="space-y-3 text-[13px]">
              {education.map((edu, idx) => (
                <div key={idx} className="mb-2">
                  <div className="flex justify-between items-baseline mb-0.5 mt-2">
                     <span>
                        {edu.degree}{edu.field ? `, ${edu.field}` : ''}{edu.location ? `, ${edu.location}` : ''}
                     </span>
                     <span className="whitespace-nowrap">
                        {edu.startDate} — {edu.endDate || 'Current'}
                     </span>
                  </div>
                  <div className="text-gray-900">
                    {edu.school}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div>
            <SectionHeader title="Projects" />
            <div className="space-y-4 text-[13px]">
              {projects.map((proj, idx) => (
                <div key={idx}>
                  <div className="font-bold text-[14px] text-gray-900 mb-0.5">
                    {proj.name}
                  </div>
                  {proj.technologies && <div className="italic text-gray-800 mb-1">{proj.technologies}</div>}
                  {proj.description && (
                     <p className="leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {skills && skills.length > 0 && (
          <div>
            <SectionHeader title="Skills" />
            <ul className="text-[13px] list-disc pl-5 space-y-1.5 mt-2 font-bold">
              {skills.map((skill, idx) => (
                <li key={idx}>
                  {skill.name} {skill.level ? `(${skill.level})` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default ATS;
