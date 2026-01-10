import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function Filters() {
  return (
    <DocLayout tocItems={[{ id: 'filters', title: 'Filters', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Filters</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Modify data using filter hooks.</p>
        </div>
        <section className="mb-12">
          <h2 id="filters" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Using Filters</h2>
          <CodeBlock code={`use rustpress::prelude::*;

// Modify post title
app.add_filter("the_title", |title: String| {
    format!("{} - My Site", title)
});

// Modify post content
app.add_filter("the_content", |content: String| {
    // Add a signature to all posts
    format!("{}\n\n---\nPowered by Rustpress", content)
});

// Filter with context
app.add_filter("the_excerpt", |excerpt: String, ctx: &Context| {
    if ctx.get("is_home").unwrap_or(false) {
        excerpt.chars().take(100).collect::<String>() + "..."
    } else {
        excerpt
    }
});`} language="rust" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/hooks-actions" className="text-gray-600 hover:text-rust-600">← Hooks & Actions</Link>
          <Link to="/docs/plugins/database" className="flex items-center gap-2 text-rust-600">Database Access <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
