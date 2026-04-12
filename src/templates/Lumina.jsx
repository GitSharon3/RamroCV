import React from 'react';

const Lumina = ({ personalInfo, education, experience, skills, projects }) => {
  const fontFamily = "'Times New Roman', Times, serif";
  
  const SectionHeader = ({ title }) => (
    <h2 className="uppercase font-bold text-[14px] tracking-wider mb-3 border-b-[1.5px] border-black pb-1">
      {title}
    </h2>
  );

  return (
    <div className="w-full h-full flex justify-center bg-[#f8f9fb]">
      <div className="bg-white w-full h-full min-h-[297mm] text-[#1a1a1a] shadow-sm max-w-[210mm]" style={{ fontFamily }}>
        {/* Top Banner */}
        <div className="bg-[#e9dfd4] px-10 py-8 flex items-center gap-8">
          {personalInfo?.showPhoto && personalInfo?.photo ? (
            <div className="w-32 h-32 flex-shrink-0">
              <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover shadow-sm border-2 border-[#e9dfd4]" />
            </div>
          ) : (
            personalInfo?.showPhoto && (
              <div className="w-32 h-32 flex-shrink-0 bg-gray-300 opacity-50 flex items-center justify-center text-xs text-gray-500">
                Photo
              </div>
            )
          )}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-[34px] font-bold mb-1 text-gray-900 leading-tight">
              {personalInfo?.firstName} {personalInfo?.lastName}
            </h1>
            {personalInfo?.title && <h2 className="text-[16px] font-bold mb-3 text-gray-800 tracking-wide">{personalInfo.title}</h2>}
            <div className="space-y-1 text-[13px] text-gray-800">
              <div>
                {[personalInfo?.address, personalInfo?.city, personalInfo?.state, personalInfo?.zip]
                  .filter(Boolean).join(', ')}
              </div>
              <div>{personalInfo?.email}</div>
              <div>{personalInfo?.phone}</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex px-10 pt-8 pb-10 gap-8 h-full">
          {/* Left Column */}
          <div className="w-[32%] flex flex-col gap-6">
            {personalInfo?.summary && (
              <div>
                <SectionHeader title="Summary" />
                <p className="text-[13px] leading-relaxed text-justify">
                  {personalInfo.summary}
                </p>
              </div>
            )}

            {skills && skills.length > 0 && (
              <div>
                <SectionHeader title="Skills" />
                <ul className="space-y-1.5 mt-2 text-[13px] list-disc pl-4">
                  {skills.map((skill, idx) => (
                    <li key={idx}>
                       <span className="font-medium">{skill.name}</span>
                       {skill.level && <span className="italic text-gray-600"> - {skill.level}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Vertical divider */}
          <div className="w-[1px] bg-gray-200"></div>

          {/* Right Column */}
          <div className="w-[64%] flex flex-col gap-6">
            {experience && experience.length > 0 && (
              <div>
                <SectionHeader title="Experience" />
                <div className="space-y-5 text-[13px] mt-2">
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="font-bold italic text-[14px]">{exp.position}</span>
                        <span className="font-bold italic text-sm text-gray-700 whitespace-nowrap">{exp.startDate} — {exp.endDate || 'Current'}</span>
                      </div>
                      <div className="mb-2 text-gray-800">
                        {exp.company}{exp.location ? ` - ${exp.location}` : ''}
                      </div>
                      {exp.description && (
                        <ul className="list-disc pl-4 space-y-1 mt-1.5">
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
                      <div className="flex justify-between items-baseline font-bold mb-1 italic">
                        <span className="text-[14px] font-bold non-italic">{edu.school}</span>
                        <span className="font-bold whitespace-nowrap">{edu.startDate} — {edu.endDate || 'Current'}</span>
                      </div>
                      <div className="text-gray-800">
                        {edu.location ? `${edu.location} | ` : ''}
                        {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
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
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-[14px]">{proj.name}</span>
                      </div>
                      {proj.technologies && <div className="italic text-xs mb-1 text-gray-600">{proj.technologies}</div>}
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
export default Lumina;
