import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rust-500 via-orange-500 to-rust-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [timeToRead, setTimeToRead] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const percentage = Math.round((scrolled / documentHeight) * 100);
      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    const estimateReadTime = () => {
      const text = document.body.innerText;
      const words = text.split(/\s+/).length;
      const minutes = Math.ceil(words / 200);
      setTimeToRead(minutes);
    };

    calculateProgress();
    estimateReadTime();
    window.addEventListener('scroll', calculateProgress);
    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-3 flex items-center gap-3"
      >
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 transform -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${progress * 1.256} 125.6`}
              className="text-rust-500 transition-all duration-300"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900 dark:text-white">
            {progress}%
          </span>
        </div>
        <div className="pr-2 hidden sm:block">
          <p className="text-xs text-gray-500 dark:text-gray-400">Reading</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{timeToRead} min</p>
        </div>
      </motion.div>
    </div>
  );
}
