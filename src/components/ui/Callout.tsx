import type { ReactNode } from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutStyles: Record<CalloutType, { icon: ReactNode; bg: string; border: string; title: string }> = {
  info: {
    icon: <Info className="w-5 h-5" />,
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    title: 'text-blue-800 dark:text-blue-300',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5" />,
    bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    border: 'border-yellow-200 dark:border-yellow-800',
    title: 'text-yellow-800 dark:text-yellow-300',
  },
  error: {
    icon: <AlertCircle className="w-5 h-5" />,
    bg: 'bg-red-50 dark:bg-red-950/30',
    border: 'border-red-200 dark:border-red-800',
    title: 'text-red-800 dark:text-red-300',
  },
  success: {
    icon: <CheckCircle className="w-5 h-5" />,
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-800',
    title: 'text-green-800 dark:text-green-300',
  },
  tip: {
    icon: <Lightbulb className="w-5 h-5" />,
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    title: 'text-purple-800 dark:text-purple-300',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = calloutStyles[type];

  return (
    <div className={`rounded-xl border p-4 ${styles.bg} ${styles.border}`}>
      <div className="flex gap-3">
        <div className={`flex-shrink-0 ${styles.title}`}>
          {styles.icon}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-semibold mb-1 ${styles.title}`}>{title}</h4>
          )}
          <div className="text-sm text-gray-700 dark:text-gray-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
