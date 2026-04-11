import React from 'react';

const BlueModern = ({ personalInfo, education, experience, skills, projects, hobbies, sectionOrder }) => {
  const PRIMARY = '#1e40af';
  const SIDEBAR_BG = '#1e3a8a';
  const ACCENT = '#3b82f6';
  const LIGHT_BLUE = '#dbeafe';

  const showPhoto = personalInfo.showPhoto && personalInfo.photo;

  const renderBullets = (text) => {
    if (!text) return null;
    const lines = text.split('\n').filter((l) => l.trim());
    return (
      <ul style={{ margin: '5px 0 0 0', paddingLeft: '16px' }}>
        {lines.map((line, i) => {
          const clean = line.replace(/^[•\-*]\s*/, '');
          return (
            <li key={i} style={{ fontSize: '10pt', lineHeight: '1.6', marginBottom: '3px', color: '#374151' }}>
              {clean}
            </li>
          );
        })}
      </ul>
    );
  };

  // Sidebar sections
  const SidebarContact = () => (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '9pt', fontWeight: 'bold', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px' }}>
        Contact
      </div>
      {personalInfo.email && (
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '8pt', color: '#93c5fd', marginBottom: '1px' }}>Email</div>
          <div style={{ fontSize: '9.5pt', color: '#fff', wordBreak: 'break-all' }}>{personalInfo.email}</div>
        </div>
      )}
      {personalInfo.phone && (
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '8pt', color: '#93c5fd', marginBottom: '1px' }}>Phone</div>
          <div style={{ fontSize: '9.5pt', color: '#fff' }}>{personalInfo.phone}</div>
        </div>
      )}
      {(personalInfo.city || personalInfo.state) && (
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '8pt', color: '#93c5fd', marginBottom: '1px' }}>Location</div>
          <div style={{ fontSize: '9.5pt', color: '#fff' }}>
            {[personalInfo.city, personalInfo.state].filter(Boolean).join(', ')}
          </div>
        </div>
      )}
      {personalInfo.linkedin && (
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '8pt', color: '#93c5fd', marginBottom: '1px' }}>LinkedIn</div>
          <div style={{ fontSize: '9.5pt', color: '#fff', wordBreak: 'break-all' }}>{personalInfo.linkedin}</div>
        </div>
      )}
      {personalInfo.github && (
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '8pt', color: '#93c5fd', marginBottom: '1px' }}>GitHub</div>
          <div style={{ fontSize: '9.5pt', color: '#fff', wordBreak: 'break-all' }}>{personalInfo.github}</div>
        </div>
      )}
      {personalInfo.website && (
        <div style={{ marginBottom: '6px' }}>
          <div style={{ fontSize: '8pt', color: '#93c5fd', marginBottom: '1px' }}>Website</div>
          <div style={{ fontSize: '9.5pt', color: '#fff', wordBreak: 'break-all' }}>{personalInfo.website}</div>
        </div>
      )}
    </div>
  );

  const SidebarSkills = () => {
    if (!skills || skills.length === 0) return null;
    return (
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '9pt', fontWeight: 'bold', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px' }}>
          Skills
        </div>
        {skills.map((skill) => (
          <div key={skill.id} style={{ marginBottom: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
              <span style={{ fontSize: '9.5pt', color: '#fff' }}>{skill.name}</span>
              {skill.level && (
                <span style={{ fontSize: '8pt', color: '#93c5fd' }}>{skill.level}</span>
              )}
            </div>
            {skill.level && (
              <div style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  borderRadius: '2px',
                  backgroundColor: '#60a5fa',
                  width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '75%' : skill.level === 'Intermediate' ? '55%' : '35%'
                }} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const SidebarHobbies = () => {
    if (!hobbies || hobbies.length === 0) return null;
    return (
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '9pt', fontWeight: 'bold', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '5px' }}>
          Interests
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {hobbies.map((h) => (
            <span key={h.id} style={{ fontSize: '8.5pt', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}>
              {h.name}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Main content sections
  const renderMainSection = (sectionId) => {
    switch (sectionId) {
      case 'experience':
        if (!experience || experience.length === 0) return null;
        return (
          <div key="experience" style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '12pt', fontWeight: 'bold', color: PRIMARY, borderBottom: `2px solid ${LIGHT_BLUE}`, paddingBottom: '5px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Work Experience
            </div>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#111827' }}>{exp.position}</div>
                    <div style={{ fontSize: '10pt', color: ACCENT, fontWeight: '600', marginTop: '1px' }}>{exp.company}</div>
                    {exp.location && (
                      <div style={{ fontSize: '9pt', color: '#6b7280', marginTop: '1px' }}>{exp.location}</div>
                    )}
                  </div>
                  <div style={{ fontSize: '9pt', color: '#6b7280', backgroundColor: LIGHT_BLUE, padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {exp.startDate} – {exp.endDate}
                  </div>
                </div>
                {exp.description && renderBullets(exp.description)}
              </div>
            ))}
          </div>
        );

      case 'education':
        if (!education || education.length === 0) return null;
        return (
          <div key="education" style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '12pt', fontWeight: 'bold', color: PRIMARY, borderBottom: `2px solid ${LIGHT_BLUE}`, paddingBottom: '5px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Education
            </div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#111827' }}>{edu.school}</div>
                    <div style={{ fontSize: '10pt', color: ACCENT, marginTop: '1px' }}>
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </div>
                    {edu.location && (
                      <div style={{ fontSize: '9pt', color: '#6b7280', marginTop: '1px' }}>{edu.location}</div>
                    )}
                  </div>
                  <div style={{ fontSize: '9pt', color: '#6b7280', backgroundColor: LIGHT_BLUE, padding: '2px 8px', borderRadius: '4px', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {edu.startDate} – {edu.endDate}
                  </div>
                </div>
                {edu.description && (
                  <div style={{ fontSize: '9.5pt', color: '#4b5563', marginTop: '4px' }}>{edu.description}</div>
                )}
              </div>
            ))}
          </div>
        );

      case 'projects':
        if (!projects || projects.length === 0) return null;
        return (
          <div key="projects" style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '12pt', fontWeight: 'bold', color: PRIMARY, borderBottom: `2px solid ${LIGHT_BLUE}`, paddingBottom: '5px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Projects
            </div>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontSize: '11pt', fontWeight: 'bold', color: '#111827' }}>{proj.name}</div>
                  {proj.link && (
                    <div style={{ fontSize: '9pt', color: ACCENT, marginLeft: '8px' }}>{proj.link}</div>
                  )}
                </div>
                {proj.description && (
                  <div style={{ fontSize: '10pt', color: '#4b5563', marginTop: '3px', lineHeight: '1.5' }}>{proj.description}</div>
                )}
                {proj.technologies && (
                  <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {proj.technologies.split(',').map((tech, i) => (
                      <span key={i} style={{ fontSize: '8.5pt', backgroundColor: LIGHT_BLUE, color: PRIMARY, padding: '1px 7px', borderRadius: '10px' }}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Only show sidebar sections (skills, hobbies) and main sections (experience, education, projects)
  const sidebarOnlySections = ['skills', 'hobbies'];
  const mainOnlySections = ['experience', 'education', 'projects'];

  return (
    <div
      id="resume-preview"
      style={{
        fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
        backgroundColor: '#ffffff',
        width: '210mm',
        minHeight: '297mm',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      {/* HEADER */}
      <div style={{
        background: `linear-gradient(135deg, ${SIDEBAR_BG} 0%, ${PRIMARY} 60%, ${ACCENT} 100%)`,
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}>
        {showPhoto && (
          <div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.5)',
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: '#fff',
          }}>
            <img
              src={personalInfo.photo}
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '22pt', fontWeight: '800', color: '#fff', lineHeight: '1.1' }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </div>
          {personalInfo.title && (
            <div style={{ fontSize: '12pt', color: '#bfdbfe', marginTop: '4px', fontWeight: '500' }}>
              {personalInfo.title}
            </div>
          )}
          {personalInfo.summary && (
            <div style={{ fontSize: '9.5pt', color: 'rgba(255,255,255,0.85)', marginTop: '8px', lineHeight: '1.6', maxWidth: '480px' }}>
              {personalInfo.summary}
            </div>
          )}
        </div>
      </div>

      {/* BODY: 2 columns */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* LEFT SIDEBAR */}
        <div style={{
          width: '65mm',
          backgroundColor: SIDEBAR_BG,
          padding: '20px 16px',
          flexShrink: 0,
        }}>
          <SidebarContact />
          {/* Render sidebar-eligible sections from sectionOrder */}
          {sectionOrder.filter(id => sidebarOnlySections.includes(id)).map(id => {
            if (id === 'skills') return <SidebarSkills key={id} />;
            if (id === 'hobbies') return <SidebarHobbies key={id} />;
            return null;
          })}
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div style={{ flex: 1, padding: '20px 22px', backgroundColor: '#fff' }}>
          {sectionOrder
            .filter(id => mainOnlySections.includes(id))
            .map(id => renderMainSection(id))}
        </div>
      </div>
    </div>
  );
};

export default BlueModern;
