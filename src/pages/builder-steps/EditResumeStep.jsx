import React from 'react';
import { motion } from 'framer-motion';
import ResumeForm from '../../components/ResumeForm';
import ResumePreview from '../../components/ResumePreview';

const EditResumeStep = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]"
    >
      {/* Left - Resume Form */}
      <div className="xl:w-[420px] w-full flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <ResumeForm />
        </div>
      </div>

      {/* Right - Resume Preview (Fuller view) */}
      <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <ResumePreview hideTemplateSwitcher={true} hideActionBar={true} initialZoom={1.0} />
      </div>
    </motion.div>
  );
};

export default EditResumeStep;
