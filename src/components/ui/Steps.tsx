import type { ReactNode } from 'react';

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="relative pl-12 pb-8 last:pb-0">
      {/* Vertical line */}
      <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200 dark:bg-gray-800 last:hidden" />

      {/* Step number */}
      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-rust-600 dark:bg-rust-500 text-white font-semibold text-sm flex items-center justify-center">
        {number}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <div className="text-gray-600 dark:text-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
}

interface StepsProps {
  children: ReactNode;
}

export function Steps({ children }: StepsProps) {
  return <div className="my-8">{children}</div>;
}
