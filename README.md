# Resume Builder

A modern, user-friendly web application for creating professional resumes. Built with React.js, Tailwind CSS, and Framer Motion.

## Features

- **Intuitive Form Input**: Easy-to-use forms for Personal Info, Education, Work Experience, Skills, Projects, and Hobbies
- **Drag-and-Drop Sections**: Reorder resume sections with simple drag-and-drop
- **Live Preview**: Real-time resume preview as you type
- **Multiple Templates**: 3 modern templates (Modern, Classic, Creative)
- **PDF Download**: Export your resume as a professional PDF
- **Shareable Links**: Generate links to share your resume
- **Responsive Design**: Works perfectly on mobile and desktop
- **Persistent Storage**: Your data is saved locally in the browser

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Usage

1. **Start with Personal Info**: Fill in your basic details and professional summary
2. **Add Work Experience**: Include your job history with descriptions
3. **Add Education**: List your educational background
4. **Add Skills**: Include technical and soft skills with proficiency levels
5. **Add Projects**: Showcase your portfolio projects
6. **Add Hobbies**: Share your interests
7. **Choose a Template**: Select from Modern, Classic, or Creative styles
8. **Preview & Download**: View your resume and download as PDF

### Tips

- Use "Load Sample" to see example data
- Drag sections to reorder them
- All changes are automatically saved
- Your data stays in your browser (local storage)

## Technologies Used

- React 19
- Vite
- Tailwind CSS v4
- Zustand (State Management)
- Framer Motion (Animations)
- jsPDF & html2canvas (PDF Export)
- Lucide React (Icons)
- @dnd-kit (Drag and Drop)

## Project Structure

```
src/
├── components/
│   ├── ResumeForm.jsx      # Main form container with drag-drop
│   ├── PersonalInfo.jsx    # Personal details form
│   ├── WorkExperience.jsx  # Work history form
│   ├── Education.jsx       # Education form
│   ├── Skills.jsx          # Skills form
│   ├── Projects.jsx        # Projects form
│   ├── Hobbies.jsx         # Hobbies form
│   └── ResumePreview.jsx   # Preview & template selector
├── store/
│   └── resumeStore.js      # Zustand state management
├── utils/
│   └── pdfExport.js        # PDF export utilities
├── App.jsx                 # Main app component
├── index.css               # Tailwind styles
└── main.jsx                # Entry point
```

## License

MIT License - feel free to use for personal or commercial projects.
