import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useResumeStore = create(
  persist(
    (set, get) => ({
      // Resume Data
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        title: '',
        summary: '',
        website: '',
        linkedin: '',
        github: '',
        photo: null, // base64 image
        showPhoto: true,
      },

      education: [],
      experience: [],
      skills: [],
      projects: [],
      hobbies: [],

      // UI State
      activeTemplate: 'ats-classic',
      sectionOrder: ['personalInfo', 'experience', 'education', 'skills', 'projects', 'hobbies'],

      // Actions
      updatePersonalInfo: (field, value) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, [field]: value },
        })),

      setPhoto: (base64) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, photo: base64 },
        })),

      toggleShowPhoto: () =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, showPhoto: !state.personalInfo.showPhoto },
        })),

      addEducation: (education) =>
        set((state) => ({
          education: [...state.education, { ...education, id: Date.now() }],
        })),

      updateEducation: (id, field, value) =>
        set((state) => ({
          education: state.education.map((edu) =>
            edu.id === id ? { ...edu, [field]: value } : edu
          ),
        })),

      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),

      addExperience: (experience) =>
        set((state) => ({
          experience: [...state.experience, { ...experience, id: Date.now() }],
        })),

      updateExperience: (id, field, value) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === id ? { ...exp, [field]: value } : exp
          ),
        })),

      removeExperience: (id) =>
        set((state) => ({
          experience: state.experience.filter((exp) => exp.id !== id),
        })),

      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, { ...skill, id: Date.now() }],
        })),

      updateSkill: (id, field, value) =>
        set((state) => ({
          skills: state.skills.map((skill) =>
            skill.id === id ? { ...skill, [field]: value } : skill
          ),
        })),

      removeSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((skill) => skill.id !== id),
        })),

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { ...project, id: Date.now() }],
        })),

      updateProject: (id, field, value) =>
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj.id === id ? { ...proj, [field]: value } : proj
          ),
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((proj) => proj.id !== id),
        })),

      addHobby: (hobby) =>
        set((state) => ({
          hobbies: [...state.hobbies, { ...hobby, id: Date.now() }],
        })),

      removeHobby: (id) =>
        set((state) => ({
          hobbies: state.hobbies.filter((hobby) => hobby.id !== id),
        })),

      setActiveTemplate: (template) => set({ activeTemplate: template }),

      reorderSections: (newOrder) => set({ sectionOrder: newOrder }),

      // Load parsed latex data into store
      loadParsedData: (parsed) => {
        set((state) => ({
          personalInfo: {
            ...state.personalInfo,
            ...parsed.personalInfo,
          },
          education: parsed.education || state.education,
          experience: parsed.experience || state.experience,
          skills: parsed.skills || state.skills,
          projects: parsed.projects || state.projects,
        }));
      },

      loadSampleData: () => {
        set({
          personalInfo: {
            firstName: 'Alex',
            lastName: 'Johnson',
            email: 'alex.johnson@email.com',
            phone: '+1 (555) 987-6543',
            address: '456 Oak Avenue',
            city: 'San Francisco',
            state: 'CA',
            zip: '94102',
            country: 'USA',
            title: 'Senior Software Engineer',
            summary: 'Results-driven software engineer with 6+ years of experience building scalable web and mobile applications. Proven track record of delivering high-quality solutions that drive business growth. Expert in React, Node.js, and cloud-native architectures.',
            website: 'alexjohnson.dev',
            linkedin: 'linkedin.com/in/alexjohnson',
            github: 'github.com/alexjohnson',
            photo: null,
            showPhoto: true,
          },
          education: [
            {
              id: 1,
              school: 'University of California, Berkeley',
              degree: 'Bachelor of Science',
              field: 'Computer Science',
              startDate: '2014',
              endDate: '2018',
              location: 'Berkeley, CA',
              description: 'GPA: 3.9/4.0 | Dean\'s List | ACM Member',
            },
          ],
          experience: [
            {
              id: 1,
              company: 'Stripe, Inc.',
              position: 'Senior Software Engineer',
              startDate: 'Jan 2022',
              endDate: 'Present',
              location: 'San Francisco, CA',
              description: '• Led architecture of a high-throughput payment processing microservice handling 10M+ daily transactions\n• Reduced API latency by 42% through Redis caching and query optimization\n• Mentored 4 junior engineers and led bi-weekly code reviews',
            },
            {
              id: 2,
              company: 'Airbnb',
              position: 'Software Engineer',
              startDate: 'Jul 2019',
              endDate: 'Dec 2021',
              location: 'San Francisco, CA',
              description: '• Built React component library adopted by 15 product teams, accelerating development by 30%\n• Implemented real-time availability calendar reducing booking errors by 25%\n• Collaborated with design to ship mobile-first search experience for 150M users',
            },
            {
              id: 3,
              company: 'Startup Labs',
              position: 'Junior Software Engineer',
              startDate: 'Jun 2018',
              endDate: 'Jun 2019',
              location: 'Palo Alto, CA',
              description: '• Developed full-stack features using React and Node.js for SaaS analytics platform\n• Automated deployment pipeline, reducing release cycle from 2 weeks to 2 days',
            },
          ],
          skills: [
            { id: 1, name: 'React', level: 'Expert', category: 'Frontend' },
            { id: 2, name: 'TypeScript', level: 'Expert', category: 'Languages' },
            { id: 3, name: 'Node.js', level: 'Expert', category: 'Backend' },
            { id: 4, name: 'Python', level: 'Advanced', category: 'Languages' },
            { id: 5, name: 'AWS', level: 'Advanced', category: 'Cloud' },
            { id: 6, name: 'Docker', level: 'Advanced', category: 'DevOps' },
            { id: 7, name: 'PostgreSQL', level: 'Advanced', category: 'Database' },
            { id: 8, name: 'GraphQL', level: 'Intermediate', category: 'API' },
          ],
          projects: [
            {
              id: 1,
              name: 'OpenCart — E-commerce Platform',
              description: 'Full-stack multi-vendor marketplace with real-time inventory, Stripe payments, and advanced search powered by Elasticsearch.',
              technologies: 'React, Node.js, PostgreSQL, Elasticsearch, Stripe API',
              link: 'github.com/alexjohnson/opencart',
            },
            {
              id: 2,
              name: 'DevMetrics — Engineering Analytics',
              description: 'SaaS dashboard for engineering teams to track PR cycle time, deploy frequency, and code quality metrics.',
              technologies: 'Next.js, Python, ClickHouse, D3.js',
              link: 'devmetrics.io',
            },
          ],
          hobbies: [
            { id: 1, name: 'Open Source Contributing' },
            { id: 2, name: 'Rock Climbing' },
            { id: 3, name: 'Photography' },
            { id: 4, name: 'Technical Blogging' },
          ],
        });
      },

      clearAllData: () => {
        set({
          personalInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            title: '',
            summary: '',
            website: '',
            linkedin: '',
            github: '',
            photo: null,
            showPhoto: true,
          },
          education: [],
          experience: [],
          skills: [],
          projects: [],
          hobbies: [],
        });
      },
    }),
    {
      name: 'resume-storage-v2',
    }
  )
);
