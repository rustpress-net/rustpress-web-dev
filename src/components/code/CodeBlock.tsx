import { useState, useEffect } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

const languageLabels: Record<string, string> = {
  rust: 'Rust',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  javascript: 'JavaScript',
  js: 'JavaScript',
  bash: 'Bash',
  shell: 'Shell',
  json: 'JSON',
  toml: 'TOML',
  css: 'CSS',
  html: 'HTML',
  markup: 'HTML',
};

export function CodeBlock({
  code,
  language,
  title,
  showLineNumbers = true,
  highlightLines = [],
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    const lang = language === 'ts' ? 'typescript' : language === 'js' ? 'javascript' : language;
    const grammar = Prism.languages[lang] || Prism.languages.plaintext;
    const highlighted = Prism.highlight(code, grammar, lang);
    setHighlightedCode(highlighted);
  }, [code, language]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = highlightedCode.split('\n');

  return (
    <div className="code-block group">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-gray-400" />
          {title ? (
            <span className="text-sm text-gray-300">{title}</span>
          ) : (
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {languageLabels[language] || language}
            </span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors opacity-0 group-hover:opacity-100"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              <table className="border-collapse w-full">
                <tbody>
                  {lines.map((line, index) => (
                    <tr
                      key={index}
                      className={highlightLines.includes(index + 1) ? 'bg-rust-500/10' : ''}
                    >
                      <td className="select-none text-right pr-4 text-gray-600 w-8">
                        {index + 1}
                      </td>
                      <td
                        className="whitespace-pre"
                        dangerouslySetInnerHTML={{ __html: line || ' ' }}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
