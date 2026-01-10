import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function FiltersReference() {
  return (
    <DocLayout tocItems={[{ id: 'filters', title: 'Filters', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Filters Reference</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Complete list of available filter hooks.</p>
        </div>
        <section className="mb-12">
          <h2 id="filters" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Available Filters</h2>
          <CodeBlock code={`// Content filters
the_title              // Modify post title
the_content            // Modify post content
the_excerpt            // Modify post excerpt
the_permalink          // Modify post URL

// Template filters
body_class             // Add body CSS classes
post_class             // Add post CSS classes

// Query filters
posts_query            // Modify posts query
search_query           // Modify search query

// Output filters
the_meta               // Modify meta tags
script_loader_tag      // Modify script tags
style_loader_tag       // Modify style tags`} language="text" showLineNumbers={false} />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/api/hooks" className="text-gray-600 hover:text-rust-600">← Hooks Reference</Link>
          <Link to="/docs/api/database" className="flex items-center gap-2 text-rust-600">Database API <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
