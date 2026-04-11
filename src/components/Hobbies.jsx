import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { Plus, Trash2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Hobbies = () => {
  const { hobbies, addHobby, removeHobby } = useResumeStore();
  const [newHobby, setNewHobby] = useState('');

  const handleAdd = () => {
    if (newHobby.trim()) {
      addHobby({ name: newHobby.trim() });
      setNewHobby('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Hobbies & Interests</h2>
        <p className="text-gray-600 mt-1">Add personal interests to show your personality</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {hobbies.map((hobby) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition-colors"
            >
              <Heart size={14} />
              <span className="font-medium">{hobby.name}</span>
              <button
                onClick={() => removeHobby(hobby.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-pink-300 rounded-full transition-all"
              >
                <Trash2 size={12} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Heart className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a hobby (e.g., Photography, Hiking, Chess)"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          />
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      <div className="bg-pink-50 rounded-lg p-4 text-sm text-pink-800">
        <p className="font-medium mb-1">💡 Why add hobbies?</p>
        <p>Sharing your interests helps employers see you as a well-rounded person and can be great conversation starters during interviews. Choose hobbies that reflect positively on your character or relate to skills valuable in your field.</p>
      </div>
    </div>
  );
};

export default Hobbies;
