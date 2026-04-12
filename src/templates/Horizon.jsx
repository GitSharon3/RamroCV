import React from 'react';

const Horizon = ({ personalInfo, education, experience, skills, projects }) => {
  const fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif"; // Sans-serif for this template
  
  const SectionHeader = ({ title }) => (
    <h2 className="uppercase font-bold text-[14px] tracking-widest mb-3 border-b-[2px] border-black pb-1 text-gray-900">
      {title}
    </h2>
  );

  return (
    <div className="w-full h-full flex justify-center bg-[#f8f9fb]">
      <div className="w-full h-full min-h-[297mm] flex shadow-sm max-w-[210mm] text-gray-800" style={{ fontFamily }}>
        {/* Left Sidebar */}
        <div className="w-[32%] bg-[#f4f4f5] pt-32 pb-10 px-8 flex flex-col gap-8">
          <div>
            <SectionHeader title="Details" />
            <div className="space-y-4 text-[13px]">
              <div>
                <h3 className="font-bold text-gray-900 mb-0.5">ADDRESS</h3>
                <p>{[personalInfo?.address, personalInfo?.city, personalInfo?.state, personalInfo?.zip]
                  .filter(Boolean).join(', ')}</p>
                {personalInfo?.country && <p>{personalInfo.country}</p>}
              </div>
              {personalInfo?.phone && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-0.5">PHONE</h3>
                  <p>{personalInfo.phone}</p>
                </div>
              )}
              {personalInfo?.email && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-0.5">EMAIL</h3>
                  <p className="break-all">{personalInfo.email}</p>
                </div>
              )}
            </div>
          </div>

          {skills && skills.length > 0 && (
            <div>
              <SectionHeader title="Skills" />
              <div className="space-y-1.5 text-[13px]">
                {skills.map((skill, idx) => (
                  <div key={idx} className="font-medium text-gray-800">
                    {skill.name} {skill.level ? `(${skill.level})` : ''}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="w-[68%] bg-white pt-16 pb-10 px-10 relative">
          
          {/* Name Box */}
          <div className="border border-black p-6 mb-10 text-center mx-auto max-w-sm absolute top-16 left-10 right-10 bg-white">
            <h1 className="text-3xl font-extrabold text-gray-900 uppercase tracking-wide mb-2">
              {personalInfo?.firstName} {personalInfo?.lastName}
            </h1>
            {personalInfo?.title && (
              <h2 className="text-[13px] font-bold text-gray-700 uppercase tracking-widest">
                {personalInfo.title}
              </h2>
            )}
          </div>

          {/* Spacer for Absolute Box */}
          <div className="h-40"></div>

          <div className="flex flex-col gap-6">
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
                <div className="space-y-5 text-[13px] mt-2">
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-gray-900">{exp.position}, {exp.company}</span>
                        <span className="text-gray-600 font-normal">{exp.location}</span>
                      </div>
                      <div className="mb-2 text-gray-600 text-[12px]">
                        {exp.startDate} - {exp.endDate || 'Current'}
                      </div>
                      {exp.description && (
                        <ul className="list-disc pl-4 space-y-1 mt-2">
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
              <div>
                <SectionHeader title="Education" />
                <div className="space-y-4 text-[13px] mt-2">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-gray-900">{edu.school}, {edu.degree}{edu.field ? ` of ${edu.field}` : ''}</span>
                        <span className="text-gray-600 font-normal">{edu.location}</span>
                      </div>
                      <div className="text-gray-600 text-[12px]">
                        {edu.startDate} - {edu.endDate || 'Current'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects && projects.length > 0 && (
              <div>
                <SectionHeader title="Projects" />
                <div className="space-y-4 text-[13px] mt-2">
                  {projects.map((proj, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-gray-900">{proj.name}</span>
                      </div>
                      {proj.technologies && <div className="text-gray-600 text-[12px] mb-1">{proj.technologies}</div>}
                      {proj.description && (
                         <p className="leading-relaxed mt-1">{proj.description}</p>
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
export default Horizon;
