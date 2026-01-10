import { Link } from 'react-router-dom';
import { ArrowRight, Code, Database, Webhook, Key } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { Card, CardGrid } from '../../../components/ui';

export function ApiOverview() {
  return (
    <DocLayout tocItems={[{ id: 'overview', title: 'Overview', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">API Overview</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Complete reference for the Rustpress API.</p>
        </div>
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Sections</h2>
          <CardGrid columns={2}>
            <Card icon={<Code className="w-5 h-5" />} title="Core Functions" description="Essential functions for content and data manipulation" href="/docs/api/core-functions" />
            <Card icon={<Webhook className="w-5 h-5" />} title="Hooks & Filters" description="Action and filter hooks reference" href="/docs/api/hooks" />
            <Card icon={<Database className="w-5 h-5" />} title="Database API" description="Query builders and data access" href="/docs/api/database" />
            <Card icon={<Key className="w-5 h-5" />} title="REST Endpoints" description="HTTP API endpoints" href="/docs/api/rest-endpoints" />
          </CardGrid>
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/publishing" className="text-gray-600 hover:text-rust-600">← Publishing Plugins</Link>
          <Link to="/docs/api/core-functions" className="flex items-center gap-2 text-rust-600">Core Functions <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
