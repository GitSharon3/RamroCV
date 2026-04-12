import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Celestial = ({ personalInfo, education, experience, skills, projects, hobbies, sectionOrder }) => {
  const { firstName, lastName, title, summary, email, phone, address, city, state, zip, country, website } = personalInfo;

  return (
    <div className="flex bg-white min-h-[297mm] font-pt-serif overflow-hidden shadow-lg border border-gray-200">
      {/* ─── Left Sidebar (Refined Beige Tone) ─── */}
      <aside className="w-[32%] bg-[#f7f5f0] p-10 flex flex-col gap-10 border-r border-[#e8e4d8]">
        {/* Name & Title */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 leading-tight uppercase tracking-tight font-playfair">
              {firstName} <br />
              <span className="text-[#8c7e6a]">{lastName}</span>
            </h1>
            <div className="h-1 w-12 bg-[#8c7e6a]" />
          </div>
          <p className="text-sm font-bold text-gray-600 uppercase tracking-[0.15em] font-sans">
            {title}
          </p>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          <h2 className="text-xs font-black text-[#8c7e6a] uppercase tracking-[0.2em] border-b border-[#e8e4d8] pb-2 font-sans text-left w-full">
            Details
          </h2>
          <div className="space-y-4 text-[11px] text-gray-700 font-sans leading-relaxed">
            {email && (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#e8e4d8] flex-shrink-0">
                  <Mail size={12} className="text-[#8c7e6a]" />
                </div>
                <span className="break-all">{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#e8e4d8] flex-shrink-0">
                  <Phone size={12} className="text-[#8c7e6a]" />
                </div>
                <span>{phone}</span>
              </div>
            )}
            {(address || city) && (
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#e8e4d8] mt-0.5 flex-shrink-0">
                  <MapPin size={12} className="text-[#8c7e6a]" />
                </div>
                <span>
                  {address}<br />
                  {city}, {state} {zip}<br />
                  {country}
                </span>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#e8e4d8] flex-shrink-0">
                  <Globe size={12} className="text-[#8c7e6a]" />
                </div>
                <span>{website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xs font-black text-[#8c7e6a] uppercase tracking-[0.2em] border-b border-[#e8e4d8] pb-2 font-sans text-left w-full">
              Expertise
            </h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-gray-800 font-sans">
                    <span>{skill.name}</span>
                  </div>
                  <div className="h-0.5 w-full bg-white">
                    <div 
                      className="h-full bg-[#8c7e6a]" 
                      style={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '80%' : skill.level === 'Intermediate' ? '60%' : '40%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* ─── Main Content (Pure White) ─── */}
      <main className="flex-1 p-12 bg-white flex flex-col gap-12 overflow-hidden">
        {/* Profile Summary */}
        {summary && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-[0.1em] font-playfair">
                Profile
              </h2>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
            <p className="text-[13px] text-gray-600 leading-relaxed font-pt-serif italic text-justify">
              {summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-[0.1em] font-playfair flex-shrink-0">
                Experience
              </h2>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
            <div className="space-y-10">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-3 relative group">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-black text-gray-800 font-sans tracking-tight">
                      {exp.position}
                    </h3>
                    <span className="text-[11px] font-bold text-[#8c7e6a] uppercase tracking-wider font-sans whitespace-nowrap ml-4">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[12px] font-bold text-gray-500 uppercase tracking-widest font-sans flex items-center justify-between">
                    <span>{exp.company}</span>
                    <span className="text-[10px] lowercase italic font-normal text-gray-400 font-serif">{exp.location}</span>
                  </div>
                  <div className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-line font-pt-serif pr-4">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-[0.1em] font-playfair flex-shrink-0">
                Education
              </h2>
              <div className="h-px flex-1 bg-gray-100" />
            </div>
            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-black text-gray-800 font-sans tracking-tight">
                       {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                    </h3>
                     <span className="text-[11px] font-bold text-[#8c7e6a] uppercase tracking-wider font-sans whitespace-nowrap ml-4">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  </div>
                  <div className="text-[12px] font-bold text-gray-500 uppercase tracking-widest font-sans">
                    {edu.school}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Celestial;
