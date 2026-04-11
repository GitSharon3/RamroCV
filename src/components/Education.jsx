import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { Plus, Trash2, GraduationCap, School, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Education = () => {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
  });

  const handleAdd = () => {
    if (newEducation.school && newEducation.degree) {
      addEducation(newEducation);
      setNewEducation({
        school: '',
        degree: '',
        field: '',
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

      <AnimatePresence mode="popLayout">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.school}</h3>
                  <p className="text-sm text-gray-600">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                </div>
              </div>
              <button
                onClick={() => removeEducation(edu.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="relative">
                <School className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  placeholder="School/University Name"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Degree (e.g., Bachelor of Science)"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div className="relative">
                <School className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                  placeholder="Field of Study"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  placeholder="Location"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
              </div>
              <div className="flex gap-2 md:col-span-2">
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    placeholder="Start Date (e.g., 2018)"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="relative flex-1">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    placeholder="End Date (e.g., 2022)"
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <textarea
              value={edu.description}
              onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
              placeholder="Additional details (GPA, honors, relevant coursework, etc.)"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {isAdding ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border-2 border-dashed border-green-300 rounded-xl p-5"
        >
          <h3 className="font-semibold text-gray-800 mb-4">Add New Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              value={newEducation.school}
              onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
              placeholder="School/University Name *"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            <input
              type="text"
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              placeholder="Degree *"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            <input
              type="text"
              value={newEducation.field}
              onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
              placeholder="Field of Study"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            <input
              type="text"
              value={newEducation.location}
              onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
              placeholder="Location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            <div className="flex gap-2 md:col-span-2">
              <input
                type="text"
                value={newEducation.startDate}
                onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                placeholder="Start Date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <input
                type="text"
                value={newEducation.endDate}
                onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                placeholder="End Date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </div>
          <textarea
            value={newEducation.description}
            onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
            placeholder="Additional details (GPA, honors, relevant coursework, etc.)"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm mb-4"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Add Education
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
          id="add-education-btn"
          className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={15} />
          Add Education
        </button>
      )}
    </div>
  );
};

export default Education;
