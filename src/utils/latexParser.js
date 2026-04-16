/**
 * A robust utility to parse LaTeX resume strings (such as moderncv or article class) into structured JS objects.
 * Designed to capture exceptions internally and prevent application crashes.
 */
export const parseLatex = (latex) => {
  const result = {
    personalInfo: {},
    experience: [],
    education: [],
    skills: [],
    projects: [],
    errors: [],
    warnings: [],
  };

  if (!latex || typeof latex !== 'string' || latex.trim().length === 0) {
    result.errors.push('LaTeX input is empty or invalid.');
    return result;
  }

  try {
    // Helper to extract a single pattern
    const extract = (pattern, text, group = 1) => {
      try {
        const m = text.match(pattern);
        return m ? m[group].trim() : null;
      } catch (e) {
        return null;
      }
    };

    // --- Personal Info ---
    // Try moderncv format first
    result.personalInfo.firstName =
      extract(/\\firstname\s*\{([^}]+)\}/, latex) ||
      extract(/\\name\s*\{([^}]+)\}\s*\{[^}]*\}/, latex) || '';

    result.personalInfo.lastName =
      extract(/\\familyname\s*\{([^}]+)\}/, latex) ||
      extract(/\\name\s*\{[^}]*\}\s*\{([^}]+)\}/, latex) || '';

    // Try article class format with \textbf in center environment
    if (!result.personalInfo.firstName) {
      const nameMatch = latex.match(/\\begin\{center\}[\s\S]*?\\textbf\{([^}]+)\}/);
      if (nameMatch) {
        const fullName = nameMatch[1].trim();
        const nameParts = fullName.split(/\s+/);
        result.personalInfo.firstName = nameParts[0] || '';
        result.personalInfo.lastName = nameParts.slice(1).join(' ') || '';
      }
    }

    if (!result.personalInfo.firstName && !result.personalInfo.lastName) {
      const author = extract(/\\author\s*\{([^}]+)\}/, latex);
      if (author) {
        const parts = author.split(' ');
        result.personalInfo.firstName = parts[0] || '';
        result.personalInfo.lastName = parts.slice(1).join(' ') || '';
      }
    }

    result.personalInfo.email =
      extract(/\\email\s*\{([^}]+)\}/, latex) ||
      extract(/\\href\{mailto:([^}]+)\}/, latex) ||
      extract(/mailto:([^\s}]+)/, latex) || '';

    result.personalInfo.phone =
      extract(/\\phone(?:\[mobile\])?\s*\{([^}]+)\}/, latex) ||
      extract(/\\mobile\s*\{([^}]+)\}/, latex) ||
      extract(/tel:([^\s}]+)/, latex) || '';

    result.personalInfo.title =
      extract(/\\position\s*\{([^}]+)\}/, latex) ||
      extract(/\\title\s*\{([^}]+)\}/, latex) || '';

    result.personalInfo.website =
      extract(/\\homepage\s*\{([^}]+)\}/, latex) ||
      extract(/\\href\{https?:\/\/([^}]+)\}/, latex) || '';

    result.personalInfo.linkedin =
      extract(/\\linkedin\s*\{([^}]+)\}/, latex) ||
      extract(/linkedin\.com\/in\/([^\s,}]+)/, latex) || '';

    result.personalInfo.github =
      extract(/\\github\s*\{([^}]+)\}/, latex) ||
      extract(/github\.com\/([^\s,}]+)/, latex) || '';

    result.personalInfo.city = extract(/\\address\s*\{([^}]+)\}/, latex) || '';

    // Summary
    const summaryMatch = latex.match(/\\section\*?\s*\{(?:Summary|Profile|About|Objective)[^}]*\}([\s\S]*?)(?=\\section|\\end\{document\})/i);
    if (summaryMatch) {
      result.personalInfo.summary = summaryMatch[1]
        .replace(/\\[a-z]+\{[^}]*\}/g, '')
        .replace(/\\[a-z]+/g, '')
        .replace(/[{}]/g, '')
        .replace(/\n\s*\n/g, ' ')
        .trim()
        .substring(0, 500);
    }

    // --- Experience ---
    const experienceSection = latex.match(/\\section\*?\s*\{(?:Experience|Work Experience|Employment)[^}]*\}([\s\S]*?)(?=\\section|\\end\{document\})/i);
    if (experienceSection) {
      const sectionText = experienceSection[1];
      
      // Try moderncv \cventry format
      const cvEntries = [...sectionText.matchAll(/\\cventry\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}/g)];
      
      cvEntries.forEach((m, idx) => {
        const [, dates, title, company, location, , desc] = m;
        const [start, end] = dates.includes('--') ? dates.split('--').map(s => s.trim()) : [dates, 'Present'];
        result.experience.push({
          id: Date.now() + idx,
          position: (title || '').trim(),
          company: (company || '').trim(),
          location: (location || '').trim(),
          startDate: (start || '').trim(),
          endDate: (end || '').trim(),
          description: (desc || '').replace(/\\item\s*/g, '• ').replace(/\\[a-z]+\{[^}]*\}/g, '').replace(/[{}\\]/g, '').trim(),
        });
      });

      // Try article class format: \textbf{Position} \hfill Dates \\ \textit{Company}
      if (cvEntries.length === 0) {
        const articleEntries = [...sectionText.matchAll(/\\textbf\{([^}]+)\}\s*\\hfill\s*([^\\]+)(?:\\+\\)?[\s\S]*?\\textit\{([^}]+)\}([\s\S]*?)(?=\\textbf|\\section|\\end\{document\}|\Z)/g)];
        
        if (articleEntries.length === 0) {
          // Simpler format: \textbf{Position} \hfill Dates \\ Company
          const simpleEntries = [...sectionText.matchAll(/\\textbf\{([^}]+)\}\s*\\hfill\s*([^\\]+)\\+\\([^\n]+)([\s\S]*?)(?=\\textbf|\\section|\\end\{document\}|\Z)/g)];
          simpleEntries.forEach((m, idx) => {
            const [, position, dates, company, rest] = m;
            const [start, end] = dates.includes('--') ? dates.split('--').map(s => s.trim()) : [dates.trim(), 'Present'];
            
            // Extract description from itemize if present
            let description = '';
            const itemizeMatch = rest.match(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/);
            if (itemizeMatch) {
              description = itemizeMatch[1]
                .replace(/\\item\s*/g, '• ')
                .replace(/\\[a-z]+\{[^}]*\}/g, '')
                .replace(/[{}\\]/g, '')
                .trim();
            }
            
            result.experience.push({
              id: Date.now() + idx,
              position: position.trim(),
              company: company.replace(/\\textit\{/, '').replace(/\}/, '').trim(),
              location: '',
              startDate: start,
              endDate: end,
              description: description,
            });
          });
        } else {
          articleEntries.forEach((m, idx) => {
            const [, position, dates, company, rest] = m;
            const [start, end] = dates.includes('--') ? dates.split('--').map(s => s.trim()) : [dates.trim(), 'Present'];
            
            let description = '';
            const itemizeMatch = rest.match(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/);
            if (itemizeMatch) {
              description = itemizeMatch[1]
                .replace(/\\item\s*/g, '• ')
                .replace(/\\[a-z]+\{[^}]*\}/g, '')
                .replace(/[{}\\]/g, '')
                .trim();
            }
            
            result.experience.push({
              id: Date.now() + idx,
              position: position.trim(),
              company: company.trim(),
              location: '',
              startDate: start,
              endDate: end,
              description: description,
            });
          });
        }

        // Last resort: try to find any items
        if (result.experience.length === 0) {
          const items = [...sectionText.matchAll(/\\item\s*(.+)/g)];
          if (items.length > 0) {
            result.warnings.push('Experience parsed in simplified mode — review the output.');
            items.slice(0, 8).forEach((m, idx) => {
              const block = m[1].replace(/\\[a-z]+\{[^}]*\}/g, '').replace(/[{}]/g, '').trim();
              result.experience.push({
                id: Date.now() + idx + 1000,
                position: block.substring(0, 80),
                company: '', location: '', startDate: '', endDate: '', description: block.substring(80) || '',
              });
            });
          }
        }
      }
    }

    // --- Education ---
    const educationSection = latex.match(/\\section\*?\s*\{(?:Education|Academic)[^}]*\}([\s\S]*?)(?=\\section|\\end\{document\})/i);
    if (educationSection) {
      const sectionText = educationSection[1];
      
      // Try moderncv \cventry format
      const cvEntries = [...sectionText.matchAll(/\\cventry\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}/g)];
      
      cvEntries.forEach((m, idx) => {
        const [, dates, degree, school, location, , desc] = m;
        const [start, end] = dates.includes('--') ? dates.split('--').map(s => s.trim()) : [dates, ''];
        result.education.push({
          id: Date.now() + idx + 2000,
          school: (school || '').trim(),
          degree: (degree || '').trim(),
          field: '',
          startDate: (start || '').trim(),
          endDate: (end || '').trim(),
          location: (location || '').trim(),
          description: (desc || '').replace(/[{}\\]/g, '').trim(),
        });
      });

      // Try article class format: \textbf{School} \hfill Dates \\ Degree
      if (cvEntries.length === 0) {
        const articleEntries = [...sectionText.matchAll(/\\textbf\{([^}]+)\}\s*\\hfill\s*([^\\]+)\\+\\([^\n]+)/g)];
        
        articleEntries.forEach((m, idx) => {
          const [, school, dates, degree] = m;
          const [start, end] = dates.includes('--') ? dates.split('--').map(s => s.trim()) : [dates.trim(), ''];
          
          result.education.push({
            id: Date.now() + idx + 2000,
            school: school.trim(),
            degree: degree.replace(/\\textit\{/, '').replace(/\}/, '').trim(),
            field: '',
            startDate: start,
            endDate: end,
            location: '',
            description: '',
          });
        });

        // Try alternate format: School \\ Degree \\ Dates
        if (articleEntries.length === 0) {
          const altEntries = [...sectionText.matchAll(/([^\\\n]+)\\+\\([^\n]+)\\+\\hfill\s*([^\n]+)/g)];
          altEntries.forEach((m, idx) => {
            const [, school, degree, dates] = m;
            const [start, end] = dates.includes('--') ? dates.split('--').map(s => s.trim()) : [dates.trim(), ''];
            
            result.education.push({
              id: Date.now() + idx + 2500,
              school: school.trim(),
              degree: degree.trim(),
              field: '',
              startDate: start,
              endDate: end,
              location: '',
              description: '',
            });
          });
        }

        if (result.education.length === 0) {
          const edItems = [...sectionText.matchAll(/\\item\s*(.+)/g)];
          edItems.slice(0, 5).forEach((m, idx) => {
            result.education.push({
              id: Date.now() + idx + 3000,
              school: m[1].replace(/[{}\\]/g, '').trim().substring(0, 80),
              degree: '', field: '', startDate: '', endDate: '', description: '',
            });
          });
        }
      }
    }

    // --- Skills ---
    const skillsSection = latex.match(/\\section\*?\s*\{(?:Skills?|Technical Skills?|Competencies)[^}]*\}([\s\S]*?)(?=\\section|\\end\{document\})/i);
    if (skillsSection) {
      const sectionText = skillsSection[1];
      
      // Clean \cvitem and other latex formatting
      const cleaned = sectionText
        .replace(/\\cvitem\s*\{[^}]*\}\s*\{([^}]*)\}/g, '$1')
        .replace(/\\item\s*/g, '')
        .replace(/\\[a-z]+(\[[^\]]*\])?\{[^}]*\}/g, '')
        .replace(/[{}\\]/g, '')
        .replace(/\n/g, ',');
        
      const skillNames = cleaned.split(/[,;|•]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 40 && !/^\d+$/.test(s));
      
      // Deduplicate skill names
      const uniqueSkills = [...new Set(skillNames)];
      
      uniqueSkills.slice(0, 20).forEach((name, idx) => {
        result.skills.push({ id: Date.now() + idx + 4000, name, level: '', category: '' });
      });
    }

    // --- Projects ---
    const projectsSection = latex.match(/\\section\*?\s*\{(?:Projects?|Personal Projects?|Side Projects?)[^}]*\}([\s\S]*?)(?=\\section|\\end\{document\})/i);
    if (projectsSection) {
      const sectionText = projectsSection[1];
      
      // Try moderncv \cventry format
      const projEntries = [...sectionText.matchAll(/\\cventry\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}\s*\{([^}]*)\}/g)];
      
      projEntries.forEach((m, idx) => {
        const [, dates, name, , , , desc] = m;
        result.projects.push({ 
          id: Date.now() + idx + 5000, 
          name: (name || '').trim(), 
          description: (desc || '').replace(/[{}\\]/g, '').trim(), 
          technologies: '', 
          link: '' 
        });
      });

      // Try article class format: \textbf{Project Name} \hfill Year \\ \textit{Technologies} with itemize
      if (projEntries.length === 0) {
        const articleProjects = [...sectionText.matchAll(/\\textbf\{([^}]+)\}(?:\s*\\hfill\s*([^\\]+))?\\+\\\\textit\{([^}]+)\}([\s\S]*?)(?=\\vspace|\\textbf|\\section|\\end\{document\}|\Z)/g)];
        
        articleProjects.forEach((m, idx) => {
          const [, name, year, technologies, rest] = m;
          
          let description = '';
          const itemizeMatch = rest.match(/\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/);
          if (itemizeMatch) {
            description = itemizeMatch[1]
              .replace(/\\item\[?[^\]]*\]?\s*/g, '• ')
              .replace(/\\label[^}]*\}/g, '')
              .replace(/\\textendash/g, '-')
              .replace(/\\[a-z]+\{[^}]*\}/g, '')
              .replace(/[{}\\]/g, '')
              .trim();
          }
          
          result.projects.push({
            id: Date.now() + idx + 5000,
            name: name.trim(),
            description: description,
            technologies: technologies.replace(/\\textit\{/, '').replace(/\}/, '').trim(),
            link: '',
          });
        });
      }
    }

    // Final checks
    const hasPersonalDetails = Object.values(result.personalInfo).some((val) => val && val.length > 0);
    if (!hasPersonalDetails) {
      result.warnings.push('Could not neatly detect personal information. Make sure your LaTeX includes your name.');
    }

  } catch (err) {
    console.error("Error gracefully parsing LaTeX:", err);
    result.errors.push('A catastrophic parsing error occurred: ' + err.message);
  }

  return result;
};
