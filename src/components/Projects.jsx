import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { Plus, Trash2, Folder, Code, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: '',
    link: '',
  });

  const handleAdd = () => {
    if (newProject.name.trim()) {
      addProject(newProject);
      setNewProject({
        name: '',
        description: '',
        technologies: '',
        link: '',
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4 pt-2">

      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Folder className="text-orange-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  {project.technologies && (
                    <p className="text-sm text-gray-600">{project.technologies}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeProject(project.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <Folder className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  placeholder="Project Name"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>

              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Describe your project, its purpose, and your role..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                    placeholder="Technologies used (e.g., React, Node.js)"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={project.link}
                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    placeholder="Project Link (GitHub, Demo, etc.)"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {isAdding ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 border-2 border-dashed border-orange-300 rounded-xl p-5"
        >
          <h3 className="font-semibold text-gray-800 mb-4">Add New Project</h3>
          <div className="space-y-3 mb-4">
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              placeholder="Project Name *"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Describe your project, its purpose, and your role..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={newProject.technologies}
                onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                placeholder="Technologies used"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <input
                type="text"
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                placeholder="Project Link"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
            >
              Add Project
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          id="add-project-btn"
          className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={15} />
          Add Project
        </button>
      )}
    </div>
  );
};

export default Projects;
