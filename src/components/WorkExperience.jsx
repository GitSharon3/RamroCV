import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { Plus, Trash2, Briefcase, Building, MapPin, Calendar, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WorkExperience = () => {
  const { experience, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
  });

  const handleAdd = () => {
    if (newExperience.company && newExperience.position) {
      addExperience(newExperience);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
      });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-start gap-2 bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-700">
        <Info size={13} className="mt-0.5 flex-shrink-0" />
        <span>Start each bullet with an <strong>action verb</strong> (Led, Built, Reduced…). Use <code className="bg-indigo-100 px-1 rounded">• bullet</code> or <code className="bg-indigo-100 px-1 rounded">- dash</code> lines — they render as list items on your resume.</span>
      </div>

      <AnimatePresence mode="popLayout">
        {experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                </div>
              </div>
              <button
                onClick={() => removeExperience(exp.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Company Name"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder="Job Title"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  placeholder="Location (City, State)"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    placeholder="Start Date"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    placeholder="End Date"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <textarea
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              placeholder={`• Led re-architecture of payment service, boosting throughput by 3×\n• Built real-time dashboard serving 50k concurrent users\n• Reduced deploy cycle from 2 weeks to 2 days`}
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm font-mono"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {isAdding ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl p-5"
        >
          <h3 className="font-semibold text-gray-800 mb-4">Add New Position</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              placeholder="Company Name *"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            <input
              type="text"
              value={newExperience.position}
              onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
              placeholder="Job Title *"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            <input
              type="text"
              value={newExperience.location}
              onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
              placeholder="Location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                placeholder="Start Date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <input
                type="text"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                placeholder="End Date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </div>
          <textarea
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            placeholder={`• Led re-architecture of payment service, boosting throughput by 3×\n• Built real-time dashboard serving 50k concurrent users`}
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm font-mono mb-4"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Add Experience
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
          id="add-experience-btn"
          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={16} />
          Add Work Experience
        </button>
      )}
    </div>
  );
};

export default WorkExperience;
