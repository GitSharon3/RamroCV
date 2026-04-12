import React from 'react';

const Zenith = ({ personalInfo, education, experience, skills, projects }) => {
  const fontFamily = "'Times New Roman', Times, serif"; // Serif font
  
  const SectionHeader = ({ title }) => (
    <h2 className="uppercase font-bold text-[14px] tracking-widest mb-4 mt-6">
      {title}
    </h2>
  );

  return (
    <div className="w-full h-full flex justify-center bg-[#f8f9fb]">
      <div className="bg-white w-full h-full min-h-[297mm] text-[#1a1a1a] shadow-sm max-w-[210mm] px-14 py-12" style={{ fontFamily }}>
        {/* Header */}
        <div className="text-center mb-6">
          {personalInfo?.title && <h2 className="text-[14px] font-bold mb-2 tracking-wide text-gray-800">{personalInfo.title}</h2>}
          <h1 className="text-4xl font-normal mb-3 text-gray-900" style={{ letterSpacing: '1px' }}>
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>
          <div className="text-[13px] mb-1.5 text-gray-800">
            {[personalInfo?.address, personalInfo?.city, personalInfo?.state, personalInfo?.zip]
              .filter(Boolean).join(', ')}
          </div>
          <div className="text-[13px] flex justify-center gap-4 text-gray-800">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          </div>
        </div>

        <div className="w-full border-b-[1.5px] border-dotted border-gray-400 mb-6"></div>

        {/* Content */}
        {personalInfo?.summary && (
          <div>
            <SectionHeader title="Summary" />
            <p className="text-[13px] leading-relaxed pl-4 text-justify">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {experience && experience.length > 0 && (
          <div>
            <SectionHeader title="Experience" />
            <div className="space-y-5 pl-4 text-[13px]">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="mb-1">
                    <span className="font-bold text-[14px] uppercase">{exp.position}</span>
                    <span className="mx-2">|</span>
                    <span className="text-gray-800">{exp.startDate} — {exp.endDate || 'Current'}</span>
                  </div>
                  <div className="mb-2 text-gray-800">
                    {exp.company}{exp.location ? ` - ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <ul className="list-disc pl-4 space-y-1">
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
            <div className="space-y-4 pl-4 text-[13px]">
              {education.map((edu, idx) => (
                <div key={idx} className="mb-2">
                  <div className="mb-1">
                    <span className="font-bold text-[14px]">{edu.school}</span>
                    {edu.location && <span className="font-bold text-[14px]"> - {edu.location}</span>}
                    <span className="mx-2 font-bold text-[14px]">|</span>
                    <span className="font-bold text-[14px]">{edu.degree}{edu.field ? ` of ${edu.field}` : ''}</span>
                  </div>
                  <div className="text-gray-800">
                    {edu.field || 'General'} | {edu.startDate} - {edu.endDate || 'Current'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projects && projects.length > 0 && (
          <div>
            <SectionHeader title="Projects" />
            <div className="space-y-4 pl-4 text-[13px]">
              {projects.map((proj, idx) => (
                <div key={idx} className="mb-2">
                  <div className="mb-1">
                    <span className="font-bold text-[14px] uppercase">{proj.name}</span>
                  </div>
                  {proj.technologies && <div className="text-gray-800 mb-1">Technologies: {proj.technologies}</div>}
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
            <div className="grid grid-cols-2 gap-y-2.5 pl-4 text-[13px]">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-center before:content-['•'] before:mr-2 before:font-bold">
                  {skill.name}{skill.level ? ` (${skill.level})` : ''}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Zenith;
