import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function HooksActions() {
  return (
    <DocLayout tocItems={[{ id: 'hooks', title: 'Hooks & Actions', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Hooks & Actions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Use hooks to extend Rustpress functionality.</p>
        </div>
        <section className="mb-12">
          <h2 id="hooks" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Adding Actions</h2>
          <CodeBlock code={`use rustpress::prelude::*;

// Register an action hook
app.add_action("init", |ctx| {
    println!("Rustpress initialized!");
});

// Register with priority (lower = earlier)
app.add_action_with_priority("init", 5, |ctx| {
    println!("This runs first!");
});

// Available hooks:
// - init: After Rustpress initializes
// - before_render: Before template rendering
// - after_render: After template rendering
// - content_saved: When content is saved
// - user_login: When user logs in`} language="rust" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/structure" className="text-gray-600 hover:text-rust-600">← Plugin Structure</Link>
          <Link to="/docs/plugins/filters" className="flex items-center gap-2 text-rust-600">Filters <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
