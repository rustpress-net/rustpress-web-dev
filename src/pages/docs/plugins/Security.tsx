import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Callout } from '../../../components/ui';

export function Security() {
  return (
    <DocLayout tocItems={[{ id: 'security', title: 'Security', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Security Best Practices</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Write secure Rustpress plugins.</p>
        </div>
        <section className="mb-12">
          <h2 id="security" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Security Guidelines</h2>
          <Callout type="warning" title="Always Validate Input">Never trust user input. Always sanitize and validate.</Callout>
          <CodeBlock code={`// Sanitize user input
let clean_input = sanitize_html(&user_input);

// Escape output
let safe_output = escape_html(&data);

// Use parameterized queries
db.query("SELECT * FROM posts WHERE id = ?", &[&post_id])?;

// Check capabilities
if !user.can("edit_posts") {
    return Err(Error::Forbidden);
}`} language="rust" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/settings-api" className="text-gray-600 hover:text-rust-600">← Settings API</Link>
          <Link to="/docs/plugins/testing" className="flex items-center gap-2 text-rust-600">Testing Plugins <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
