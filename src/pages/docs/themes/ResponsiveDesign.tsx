import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function ResponsiveDesign() {
  return (
    <DocLayout tocItems={[{ id: 'responsive', title: 'Responsive Design', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Theme Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Responsive Design</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Build themes that work beautifully on all devices.</p>
        </div>
        <section className="mb-12">
          <h2 id="responsive" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mobile-First Approach</h2>
          <CodeBlock code={`/* Mobile first */
.container { padding: 1rem; }

/* Tablet */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
}`} language="css" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/themes/hooks" className="text-gray-600 hover:text-rust-600">← Theme Hooks</Link>
          <Link to="/docs/themes/testing" className="flex items-center gap-2 text-rust-600">Testing Themes <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
