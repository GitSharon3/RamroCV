import React from 'react';

const ATSClassic = ({ personalInfo, education, experience, skills, projects, hobbies, sectionOrder }) => {
  const contactLine = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.city && personalInfo.state ? `${personalInfo.city}, ${personalInfo.state}` : personalInfo.city || personalInfo.state,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean).join(' | ');

  const renderBullets = (text) => {
    if (!text) return null;
    const lines = text.split('\n').filter((l) => l.trim());
    return (
      <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px' }}>
        {lines.map((line, i) => {
          const clean = line.replace(/^[•\-*]\s*/, '');
          return (
            <li key={i} style={{ fontSize: '10.5pt', lineHeight: '1.5', marginBottom: '2px', color: '#000' }}>
              {clean}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'personalInfo':
        return (
          <div key="personalInfo" style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '22pt', fontWeight: 'bold', color: '#000', letterSpacing: '0.5px' }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </div>
            {personalInfo.title && (
              <div style={{ fontSize: '11pt', color: '#000', marginTop: '3px' }}>
                {personalInfo.title}
              </div>
            )}
            {contactLine && (
              <div style={{ fontSize: '9.5pt', color: '#000', marginTop: '5px' }}>
                {contactLine}
              </div>
            )}
            {personalInfo.github && (
              <div style={{ fontSize: '9.5pt', color: '#000', marginTop: '2px' }}>
                GitHub: {personalInfo.github}
              </div>
            )}
          </div>
        );

      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" style={{ marginBottom: '10px' }}>
            <hr style={{ borderTop: '1.5px solid #000', margin: '8px 0 6px 0' }} />
            <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Professional Experience
            </div>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#000' }}>{exp.position}</div>
                  <div style={{ fontSize: '9.5pt', color: '#000', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {exp.startDate} – {exp.endDate}
                  </div>
                </div>
                <div style={{ fontSize: '10.5pt', color: '#000', fontStyle: 'italic', marginTop: '1px' }}>
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </div>
                {exp.description && renderBullets(exp.description)}
              </div>
            ))}
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" style={{ marginBottom: '10px' }}>
            <hr style={{ borderTop: '1.5px solid #000', margin: '8px 0 6px 0' }} />
            <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Education
            </div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#000' }}>{edu.school}</div>
                  <div style={{ fontSize: '9.5pt', color: '#000', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {edu.startDate} – {edu.endDate}
                  </div>
                </div>
                <div style={{ fontSize: '10.5pt', color: '#000', fontStyle: 'italic', marginTop: '1px' }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}{edu.location ? ` | ${edu.location}` : ''}
                </div>
                {edu.description && (
                  <div style={{ fontSize: '10pt', color: '#000', marginTop: '2px' }}>{edu.description}</div>
                )}
              </div>
            ))}
          </div>
        );

      case 'skills':
        if (!skills || skills.length === 0) return null;
        return (
          <div key="skills" style={{ marginBottom: '10px' }}>
            <hr style={{ borderTop: '1.5px solid #000', margin: '8px 0 6px 0' }} />
            <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              Skills
            </div>
            <div style={{ fontSize: '10.5pt', color: '#000', lineHeight: '1.6' }}>
              {skills.map((s) => s.name).join(', ')}
            </div>
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" style={{ marginBottom: '10px' }}>
            <hr style={{ borderTop: '1.5px solid #000', margin: '8px 0 6px 0' }} />
            <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              Projects
            </div>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '10.5pt', fontWeight: 'bold', color: '#000' }}>{proj.name}</div>
                  {proj.link && (
                    <div style={{ fontSize: '9.5pt', color: '#000', marginLeft: '8px' }}>{proj.link}</div>
                  )}
                </div>
                {proj.description && (
                  <div style={{ fontSize: '10pt', color: '#000', marginTop: '2px', lineHeight: '1.5' }}>{proj.description}</div>
                )}
                {proj.technologies && (
                  <div style={{ fontSize: '10pt', color: '#000', marginTop: '2px' }}>
                    <span style={{ fontWeight: 'bold' }}>Technologies:</span> {proj.technologies}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'hobbies':
        if (!hobbies || hobbies.length === 0) return null;
        return (
          <div key="hobbies" style={{ marginBottom: '10px' }}>
            <hr style={{ borderTop: '1.5px solid #000', margin: '8px 0 6px 0' }} />
            <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#000', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              Interests
            </div>
            <div style={{ fontSize: '10.5pt', color: '#000' }}>
              {hobbies.map((h) => h.name).join(', ')}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      id="resume-preview"
      style={{
        fontFamily: 'Arial, "Times New Roman", Calibri, sans-serif',
        backgroundColor: '#ffffff',
        color: '#000000',
        width: '210mm',
        minHeight: '297mm',
        padding: '16mm 18mm',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      {sectionOrder.map((id) => renderSection(id))}
    </div>
  );
};

export default ATSClassic;
