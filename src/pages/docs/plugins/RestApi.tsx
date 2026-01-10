import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function RestApi() {
  return (
    <DocLayout tocItems={[{ id: 'rest', title: 'REST API', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">REST API Extensions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Add custom REST API endpoints to Rustpress.</p>
        </div>
        <section className="mb-12">
          <h2 id="rest" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Custom Endpoints</h2>
          <CodeBlock code={`use rustpress::prelude::*;

// Register a custom endpoint
app.register_route("/api/my-plugin/data", Method::GET, |req| {
    let data = get_my_data()?;
    Ok(json!({ "data": data }))
});

// POST endpoint with body
app.register_route("/api/my-plugin/submit", Method::POST, |req| {
    let body: MyRequest = req.json()?;
    process_data(body)?;
    Ok(json!({ "success": true }))
});`} language="rust" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/database" className="text-gray-600 hover:text-rust-600">← Database</Link>
          <Link to="/docs/plugins/admin-pages" className="flex items-center gap-2 text-rust-600">Admin Pages <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
