import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { Plus, Trash2, Wrench, Star, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const levelColors = {
  Expert: 'bg-purple-100 text-purple-700 border border-purple-200',
  Advanced: 'bg-blue-100 text-blue-700 border border-blue-200',
  Intermediate: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  Beginner: 'bg-gray-100 text-gray-700 border border-gray-200',
};

const Skills = () => {
  const { skills, addSkill, updateSkill, removeSkill } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate', category: '' });
  const [bulkInput, setBulkInput] = useState('');
  const [showBulk, setShowBulk] = useState(false);

  const handleAdd = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({ name: '', level: 'Intermediate', category: '' });
    }
  };

  const handleBulkAdd = () => {
    const names = bulkInput.split(/[,;\n]/).map(s => s.trim()).filter(Boolean);
    names.forEach(name => addSkill({ name, level: 'Intermediate', category: '' }));
    setBulkInput('');
    setShowBulk(false);
    setIsAdding(false);
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Skill chips */}
      <div className="flex flex-wrap gap-2 min-h-[40px]">
        <AnimatePresence mode="popLayout">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              layout
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${levelColors[skill.level] || levelColors.Beginner}`}
            >
              <span>{skill.name}</span>
              <select
                value={skill.level}
                onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="bg-transparent text-xs outline-none cursor-pointer"
              >
                {LEVELS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <button
                onClick={() => removeSkill(skill.id)}
                className="opacity-0 group-hover:opacity-100 ml-0.5 hover:text-red-600 transition-all"
              >
                <Trash2 size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {skills.length === 0 && (
          <p className="text-xs text-gray-400 italic">No skills added yet. Add skills below.</p>
        )}
      </div>

      {/* Level Legend */}
      <div className="flex gap-2 flex-wrap text-xs">
        {LEVELS.map(l => (
          <span key={l} className={`px-2 py-0.5 rounded-full ${levelColors[l]}`}>{l}</span>
        ))}
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 space-y-3">
              {!showBulk ? (
                <>
                  {/* Single skill add */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Wrench className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300" size={13} />
                      <input
                        type="text"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        placeholder="Skill name (e.g., React, Python)"
                        className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-sm bg-white"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setIsAdding(false); }}
                        autoFocus
                      />
                    </div>
                    <div className="relative">
                      <Star className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300" size={13} />
                      <select
                        value={newSkill.level}
                        onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                        className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-sm bg-white appearance-none"
                      >
                        {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div className="relative">
                      <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300" size={13} />
                      <input
                        type="text"
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                        placeholder="Category"
                        className="w-28 pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-sm bg-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={handleAdd}
                      className="px-4 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowBulk(true)}
                      className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Bulk add
                    </button>
                    <button
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-1.5 text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Bulk add */}
                  <p className="text-xs text-violet-700 font-medium">Enter skills separated by commas, semicolons, or new lines:</p>
                  <textarea
                    value={bulkInput}
                    onChange={(e) => setBulkInput(e.target.value)}
                    placeholder="React, TypeScript, Node.js, Python, AWS, Docker"
                    rows={3}
                    autoFocus
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-sm bg-white resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleBulkAdd}
                      className="px-4 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
                    >
                      Add All
                    </button>
                    <button
                      onClick={() => setShowBulk(false)}
                      className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      Back
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          id="add-skill-btn"
          className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={15} />
          Add Skill
        </button>
      )}

      <p className="text-xs text-gray-400">
        💡 Tip: Include a mix of technical skills and soft skills. Select your proficiency level honestly.
      </p>
    </div>
  );
};

export default Skills;
