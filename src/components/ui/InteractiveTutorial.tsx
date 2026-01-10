import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, Circle, Play, RotateCcw } from 'lucide-react';
import type { ReactNode } from 'react';

interface TutorialStep {
  title: string;
  content: ReactNode;
  code?: string;
}

interface InteractiveTutorialProps {
  title: string;
  steps: TutorialStep[];
  onComplete?: () => void;
}

export function InteractiveTutorial({ title, steps, onComplete }: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
    }
  };

  const markComplete = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
  };

  const autoPlay = async () => {
    setIsPlaying(true);
    for (let i = currentStep; i < steps.length; i++) {
      setCurrentStep(i);
      setCompletedSteps((prev) => new Set([...prev, i]));
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    setIsPlaying(false);
    if (onComplete) onComplete();
  };

  const progress = ((completedSteps.size) / steps.length) * 100;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-rust-500 to-orange-500">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={autoPlay}
              disabled={isPlaying}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors disabled:opacity-50"
              title="Auto-play tutorial"
            >
              <Play className="w-4 h-4" />
            </button>
            <button
              onClick={reset}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="Reset tutorial"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-white/80 text-sm mt-2">
          Step {currentStep + 1} of {steps.length} • {completedSteps.size} completed
        </p>
      </div>

      {/* Step indicators */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 flex gap-2 overflow-x-auto">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              currentStep === index
                ? 'bg-rust-500 text-white'
                : completedSteps.has(index)
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {completedSteps.has(index) ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
            {step.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {steps[currentStep].title}
            </h4>
            <div className="text-gray-600 dark:text-gray-400">
              {steps[currentStep].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <button
          onClick={() => goToStep(currentStep - 1)}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={markComplete}
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-rust-500 hover:bg-rust-600 text-white font-medium transition-colors"
        >
          {currentStep === steps.length - 1 ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Complete
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
