import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function ThemeHooks() {
  return (
    <DocLayout tocItems={[{ id: 'hooks', title: 'Theme Hooks', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Theme Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Theme Hooks</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Extend theme functionality with hooks and filters.</p>
        </div>
        <section className="mb-12">
          <h2 id="hooks" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Using Hooks in Templates</h2>
          <CodeBlock code={`{# Action hooks - insert content #}
{% do_action 'before_header' %}
<header>...</header>
{% do_action 'after_header' %}

{# Filter hooks - modify content #}
{{ post.title | apply_filter('the_title') }}
{{ post.content | apply_filter('the_content') | safe }}`} language="html" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/themes/assets" className="text-gray-600 hover:text-rust-600">← Assets</Link>
          <Link to="/docs/themes/responsive" className="flex items-center gap-2 text-rust-600">Responsive Design <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
