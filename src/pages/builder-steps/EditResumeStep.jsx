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
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      <div className="lg:col-span-5 lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto pb-4 scrollbar-hide">
        <ResumeForm />
      </div>
      <div className="lg:col-span-7 h-full">
        <ResumePreview hideTemplateSwitcher={true} initialZoom={0.85} />
      </div>
    </motion.div>
  );
};

export default EditResumeStep;
