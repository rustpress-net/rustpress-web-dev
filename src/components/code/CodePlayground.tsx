import { useState } from 'react';
import { Play, RotateCcw, Download, Copy, Check, Maximize2, Minimize2 } from 'lucide-react';

interface CodePlaygroundProps {
  initialCode: string;
  language: string;
  title?: string;
  description?: string;
}

export function CodePlayground({
  initialCode,
  language,
  title,
  description,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // In a real implementation, this would send to a backend
      setOutput(`// Code executed successfully!\n// Output would appear here in a real environment.\n\n// Your code:\n${code}`);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }

    setIsRunning(false);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rustpress-example.${language === 'rust' ? 'rs' : language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`bg-gray-900 rounded-xl overflow-hidden border border-gray-800 ${
        isFullscreen ? 'fixed inset-4 z-50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div>
          {title && <h3 className="text-sm font-medium text-white">{title}</h3>}
          {description && (
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run'}
          </button>
          <button
            onClick={resetCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Reset code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={copyCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={downloadCode}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Download code"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className={`grid ${output ? 'grid-cols-2' : 'grid-cols-1'} divide-x divide-gray-700`}>
        {/* Editor */}
        <div className="relative">
          <div className="absolute top-2 left-4 text-xs text-gray-500 uppercase tracking-wider">
            Editor
          </div>
          <textarea
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full h-80 p-4 pt-8 bg-transparent text-gray-100 font-mono text-sm resize-none outline-none"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        {output && (
          <div className="relative">
            <div className="absolute top-2 left-4 text-xs text-gray-500 uppercase tracking-wider">
              Output
            </div>
            <pre className="w-full h-80 p-4 pt-8 overflow-auto text-sm font-mono text-green-400">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
