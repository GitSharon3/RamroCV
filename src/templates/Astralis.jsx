import React from 'react';

const Astralis = ({ personalInfo, education, experience, skills, projects, sectionOrder }) => {
  const fontFamily = "'Times New Roman', Times, serif";
  
  const renderSectionDivider = (title) => (
    <div className="w-full bg-gray-100 py-1 mb-3 mt-4 text-center">
      <h2 className="uppercase font-bold tracking-widest text-[#1a1a1a] text-[14px]">{title}</h2>
    </div>
  );

  return (
    <div className="bg-[#f8f9fb] p-8 w-full h-full flex justify-center">
      <div className="bg-white p-10 w-full h-full text-[#1a1a1a] shadow-sm max-w-[210mm] min-h-[297mm]" style={{ fontFamily }}>
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold uppercase tracking-wide mb-1" style={{ letterSpacing: '2px' }}>
            {personalInfo?.firstName} {personalInfo?.lastName}
          </h1>
          {personalInfo?.title && <h2 className="text-[17px] font-bold mb-2">{personalInfo.title}</h2>}
          
          <div className="text-[13px] mb-1">
            {[personalInfo?.address, personalInfo?.city, personalInfo?.state, personalInfo?.country, personalInfo?.zip]
              .filter(Boolean)
              .join(', ')}
          </div>
          
          <div className="text-[13px] font-bold">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.email && personalInfo?.phone && <span className="mx-4"></span>}
            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
          </div>
        </div>
        
        <div className="border-b-2 border-gray-300 w-full mb-4 mt-2"></div>

        <div className="space-y-2">
          {/* Summary */}
          {personalInfo?.summary && (
            <div className="mb-4">
              {renderSectionDivider('Summary')}
              <p className="text-[13px] leading-relaxed text-justify px-2">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div className="mb-4">
              {renderSectionDivider('Experience')}
              <div className="space-y-4 px-2">
                {experience.map((exp, idx) => (
                  <div key={idx} className="text-[13px]">
                    <div className="flex items-center w-full mb-1">
                      <div className="font-bold flex items-center whitespace-nowrap">
                        <span className="mr-2 text-lg leading-none">❖</span>
                        {exp.position && `${exp.position},`} {exp.company}
                      </div>
                      <div className="flex-grow border-b-[1.5px] border-dotted border-gray-400 mx-3 relative top-[-4px]"></div>
                      <div className="whitespace-nowrap">
                        {exp.startDate} — {exp.endDate || 'Present'}
                      </div>
                    </div>
                    {exp.location && (
                      <div className="text-right text-xs mb-1 mt-[-4px]">{exp.location}</div>
                    )}
                    {exp.description && (
                      <div className="mt-1 pl-6">
                        <ul className="list-disc list-inside space-y-1">
                          {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                            <li key={i}>{line.replace(/^[•*]\s*/, '')}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div className="mb-4">
              {renderSectionDivider('Education')}
              <div className="space-y-4 px-2">
                {education.map((edu, idx) => (
                  <div key={idx} className="text-[13px]">
                    <div className="flex items-center w-full mb-1">
                      <div className="font-bold flex items-center whitespace-nowrap">
                        <span className="mr-2 text-lg leading-none">❖</span>
                        {edu.school}
                      </div>
                      <div className="flex-grow border-b-[1.5px] border-dotted border-gray-400 mx-3 relative top-[-4px]"></div>
                      <div className="whitespace-nowrap">
                        {edu.startDate} — {edu.endDate || 'Present'}
                      </div>
                    </div>
                    <div className="flex justify-between pl-6 mt-1">
                      <div className="italic">
                        {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                      </div>
                      <div className="text-xs">{edu.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="mb-4">
              {renderSectionDivider('Projects')}
              <div className="space-y-4 px-2">
                {projects.map((proj, idx) => (
                  <div key={idx} className="text-[13px]">
                    <div className="flex items-center w-full mb-1">
                      <div className="font-bold flex items-center whitespace-nowrap">
                        <span className="mr-2 text-lg leading-none">❖</span>
                        {proj.name}
                      </div>
                      <div className="flex-grow border-b-[1.5px] border-dotted border-gray-400 mx-3 relative top-[-4px]"></div>
                      <div className="whitespace-nowrap">
                        {proj.link && <a href={(proj.link.startsWith('http') ? '' : 'https://') + proj.link} className="text-blue-800 underline">{proj.link}</a>}
                      </div>
                    </div>
                    {proj.technologies && (
                      <div className="pl-6 italic text-xs mb-1">Technologies: {proj.technologies}</div>
                    )}
                    {proj.description && (
                      <div className="mt-1 pl-6">
                        <p className="leading-relaxed">{proj.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="mb-4">
              {renderSectionDivider('Skills')}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 px-2 text-[13px]">
                {skills.map((skill, idx) => (
                  <div key={idx} className="flex items-baseline w-full">
                    <span className="whitespace-nowrap pr-2">{skill.name}</span>
                    <div className="flex-grow border-b-[1.5px] border-dotted border-gray-400"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Astralis;
