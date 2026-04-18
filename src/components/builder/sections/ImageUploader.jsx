import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, GripVertical, Code2, User, Briefcase, GraduationCap, 
  Wrench, FolderOpen, PlusCircle, FileText, ArrowRight, Mail, Phone, 
  MapPin, Link as LinkIcon, Sparkles, Trash2, Plus, X, Building, 
  Calendar, Info, School, Star, Tag, Folder, Code, ExternalLink, 
  Upload, Camera, Eye, EyeOff, CheckCircle2, Download
} from 'lucide-react';
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor, 
  useSensor, useSensors,
} from '@dnd-kit/core';
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates, 
  verticalListSortingStrategy, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResumeStore } from '../../../store/resumeStore';
import { downloadPDF } from '../../../utils/resumeUtils';
import { parseLatex } from '../../../utils/latexParser';

const SECTION_TYPES = [
  { id: 'languages', label: 'Languages' },
  { id: 'certifications', label: 'Certifications and licenses' },
  { id: 'awards', label: 'Awards and honors' },
  { id: 'websites', label: 'Websites and social media' },
  { id: 'references', label: 'References' },
  { id: 'hobbies', label: 'Hobbies and interests' },
  { id: 'custom', label: 'Custom section' },
];

export const ImageUploader = () => {
  const { personalInfo, setPhoto, toggleShowPhoto } = useResumeStore();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const processFile = (file) => {
    setError('');
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => processFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Profile Photo</h3>
        {personalInfo.photo && (
          <button
            onClick={toggleShowPhoto}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              personalInfo.showPhoto
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {personalInfo.showPhoto ? <Eye size={12} /> : <EyeOff size={12} />}
            {personalInfo.showPhoto ? 'Showing' : 'Hidden'}
          </button>
        )}
      </div>

      {personalInfo.photo ? (
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <img
              src={personalInfo.photo}
              alt="Profile Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 shadow"
            />
            <button
              onClick={() => setPhoto(null)}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow"
            >
              <X size={12} />
            </button>
          </motion.div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">Photo uploaded successfully</p>
            <label className="cursor-pointer text-xs text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2">
              Change photo
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileInput} className="hidden" />
            </label>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
            dragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
          }`}
        >
          <Camera className="mx-auto text-gray-400 mb-2" size={28} />
          <p className="text-sm text-gray-600 mb-1">Drag & drop your photo here</p>
          <p className="text-xs text-gray-400 mb-3">JPG, PNG, WebP · Max 5MB</p>
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Upload size={14} />
            Browse File
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileInput} className="hidden" />
          </label>
        </div>
      )}
    </div>
  );
};

