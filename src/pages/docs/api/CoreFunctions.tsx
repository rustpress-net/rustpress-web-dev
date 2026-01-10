import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function CoreFunctions() {
  return (
    <DocLayout tocItems={[{ id: 'functions', title: 'Core Functions', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Core Functions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Essential functions for Rustpress development.</p>
        </div>
        <section className="mb-12">
          <h2 id="functions" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Content Functions</h2>
          <CodeBlock code={`// Get a single post by ID
let post = get_post(123)?;

// Get posts with query
let posts = get_posts(PostQuery {
    status: Some("published"),
    category: Some("tutorials"),
    limit: Some(10),
    ..Default::default()
})?;

// Get option value
let site_name = get_option("site_name")?;

// Update option
update_option("site_description", "My awesome site")?;

// Get current user
let user = get_current_user()?;`} language="rust" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/api/overview" className="text-gray-600 hover:text-rust-600">← API Overview</Link>
          <Link to="/docs/api/hooks" className="flex items-center gap-2 text-rust-600">Hooks Reference <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
