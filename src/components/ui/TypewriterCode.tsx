import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TypewriterCodeProps {
  code: string;
  language?: string;
  speed?: number;
  autoStart?: boolean;
}

export function TypewriterCode({
  code,
  language = 'rust',
  speed = 30,
  autoStart = false,
}: TypewriterCodeProps) {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentIndex < code.length) {
      const timer = setTimeout(() => {
        setDisplayedCode((prev) => prev + code[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, currentIndex, code, speed]);

  const reset = () => {
    setDisplayedCode('');
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentIndex >= code.length) {
      reset();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-400 ml-2">{language}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={reset}
            className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code display */}
      <div className="p-4 font-mono text-sm overflow-x-auto min-h-[200px]">
        <pre className="text-gray-300">
          {displayedCode}
          {isPlaying && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-5 bg-rust-500 ml-0.5"
            />
          )}
        </pre>
      </div>

      {/* Progress */}
      <div className="px-4 py-2 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>
            {currentIndex} / {code.length} characters
          </span>
          <div className="w-32 h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-rust-500"
              animate={{ width: `${(currentIndex / code.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
