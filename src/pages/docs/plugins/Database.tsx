import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function Database() {
  return (
    <DocLayout tocItems={[{ id: 'database', title: 'Database', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Database Access</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Access and manipulate the database from plugins.</p>
        </div>
        <section className="mb-12">
          <h2 id="database" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Database Queries</h2>
          <CodeBlock code={`use rustpress::prelude::*;

// Query posts
let posts = db.query::<Post>()
    .filter("status", "published")
    .order_by("created_at", Desc)
    .limit(10)
    .all()?;

// Insert data
db.insert(&MyModel { name: "Test".into() })?;

// Custom table
db.execute("CREATE TABLE IF NOT EXISTS my_table (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
)")?;`} language="rust" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/filters" className="text-gray-600 hover:text-rust-600">← Filters</Link>
          <Link to="/docs/plugins/rest-api" className="flex items-center gap-2 text-rust-600">REST API Extensions <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
