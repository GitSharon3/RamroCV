import { useResumeStore } from '../store/resumeStore';

const ProfessionalSummary = () => {
  const { personalInfo, updatePersonalInfo } = useResumeStore();

  return (
    <div className="space-y-4 pt-2">
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          Professional Summary
        </label>
        <textarea
          value={personalInfo.summary || ''}
          onChange={(e) => updatePersonalInfo('summary', e.target.value)}
          placeholder="Brief 2-4 sentence overview of your professional background, key skills, and career goals..."
          rows={5}
          className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none text-sm bg-white"
        />
        <p className="text-xs text-gray-400 mt-2">
          💡 Tip: Lead with your years of experience, core expertise, and biggest achievement. Keep it brief and impactful.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
