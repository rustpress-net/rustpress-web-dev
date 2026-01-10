import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function ThemeTesting() {
  return (
    <DocLayout tocItems={[{ id: 'testing', title: 'Testing Themes', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Theme Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Testing Themes</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Ensure quality with comprehensive theme testing.</p>
        </div>
        <section className="mb-12">
          <h2 id="testing" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Testing Commands</h2>
          <CodeBlock code={`# Validate theme structure
rustpress theme:validate my-theme

# Check accessibility
rustpress theme:a11y my-theme

# Performance audit
rustpress theme:perf my-theme

# Cross-browser testing
rustpress theme:test my-theme --browsers=chrome,firefox,safari`} language="bash" showLineNumbers={false} />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/themes/responsive" className="text-gray-600 hover:text-rust-600">← Responsive Design</Link>
          <Link to="/docs/themes/publishing" className="flex items-center gap-2 text-rust-600">Publishing Themes <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
