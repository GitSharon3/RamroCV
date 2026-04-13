import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTION_TYPES } from '../constants/AdditionalSectionConstants';

const AdditionalSections = () => {
  const { additionalSections, addAdditionalItem, removeAdditionalItem, updateAdditionalItem } = useResumeStore();

  // UI states for each section sectionId -> input text
  const [addingInput, setAddingInput] = useState({});

  const handleAdd = (secId) => {
    if (addingInput[secId]?.trim()) {
      addAdditionalItem(secId, { name: addingInput[secId] });
      setAddingInput({ ...addingInput, [secId]: '' });
    }
  };

  return (
    <div className="space-y-6 pt-2">
      <p className="text-sm text-gray-500 mb-2">
        Add certifications, languages, awards, or any extra details you want recruiters to see.
      </p>

      {SECTION_TYPES.map(sec => {
        const items = additionalSections[sec.id] || [];
        return (
          <div key={sec.id} className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100">
              <h4 className="font-semibold text-gray-700 text-sm">{sec.label}</h4>
            </div>

            <div className="p-3">
              {items.length > 0 && (
                <ul className="space-y-2 mb-3">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between group bg-white border border-gray-100 rounded-lg p-2 hover:border-blue-200 transition-colors"
                      >
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateAdditionalItem(sec.id, item.id, 'name', e.target.value)}
                          className="flex-1 outline-none bg-transparent text-sm text-gray-700"
                        />
                        <button
                          onClick={() => removeAdditionalItem(sec.id, item.id)}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Add to ${sec.label.toLowerCase()}...`}
                  value={addingInput[sec.id] || ''}
                  onChange={(e) => setAddingInput({ ...addingInput, [sec.id]: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd(sec.id)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50"
                />
                <button
                  onClick={() => handleAdd(sec.id)}
                  disabled={!addingInput[sec.id]?.trim()}
                  className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:hover:bg-blue-50 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdditionalSections;
