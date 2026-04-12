import React from 'react';
import { Check } from 'lucide-react';
import { useResumeStore } from '../store/resumeStore';

const StepIndicator = () => {
  const { wizardStep, setWizardStep } = useResumeStore();

  const steps = [
    { id: 1, name: 'Choose template' },
    { id: 2, name: 'Enter your details' },
    { id: 3, name: 'Download resume' },
  ];

  return (
    <div className="w-full flex justify-center py-6 sm:py-10 bg-white">
      <div className="flex items-center gap-2 sm:gap-4 max-w-2xl w-full px-4">
        {steps.map((step, index) => {
          const isActive = wizardStep === step.id;
          const isCompleted = wizardStep > step.id;

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => isCompleted && setWizardStep(step.id)}
                className="flex items-center gap-2 group outline-none"
                disabled={!isCompleted && !isActive}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-sky-500 text-white ring-4 ring-sky-100 shadow-md scale-110'
                      : isCompleted
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 text-gray-400 border border-gray-200'
                  }`}
                >
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : step.id}
                </div>
                <span
                  className={`text-xs sm:text-sm font-semibold transition-colors duration-300 whitespace-nowrap ${
                    isActive ? 'text-gray-900 font-bold' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
              </button>

              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-gray-200 min-w-[20px] sm:min-w-[40px]">
                  <div
                    className="h-full bg-sky-500 transition-all duration-500"
                    style={{ width: isCompleted ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
