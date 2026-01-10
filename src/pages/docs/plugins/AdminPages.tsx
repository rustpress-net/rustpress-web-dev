import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function AdminPages() {
  return (
    <DocLayout tocItems={[{ id: 'admin', title: 'Admin Pages', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Admin Pages</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Create admin interface pages for your plugin.</p>
        </div>
        <section className="mb-12">
          <h2 id="admin" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Register Admin Menu</h2>
          <CodeBlock code={`use rustpress::prelude::*;

// Add menu item
app.add_admin_menu(AdminMenu {
    title: "My Plugin",
    slug: "my-plugin",
    icon: "settings",
    capability: "manage_options",
    position: 20,
});

// Register admin page handler
app.add_admin_page("my-plugin", |ctx| {
    render_template("admin/settings.html", ctx)
});`} language="rust" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/rest-api" className="text-gray-600 hover:text-rust-600">← REST API</Link>
          <Link to="/docs/plugins/settings-api" className="flex items-center gap-2 text-rust-600">Settings API <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
