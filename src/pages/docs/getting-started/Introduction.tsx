import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Puzzle, Heart } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Callout, Card, CardGrid } from '../../../components/ui';

const tocItems = [
  { id: 'what-is-rustpress', title: 'What is Rustpress?', level: 2 },
  { id: 'why-rustpress', title: 'Why Rustpress?', level: 2 },
  { id: 'key-features', title: 'Key Features', level: 2 },
  { id: 'architecture', title: 'Architecture Overview', level: 2 },
  { id: 'next-steps', title: 'Next Steps', level: 2 },
];

const helloWorldCode = `use rustpress::prelude::*;

fn main() {
    let app = Rustpress::new()
        .with_theme("developer")
        .with_database("sqlite://data.db")
        .build();

    app.run("0.0.0.0:3000").unwrap();
}`;

export function Introduction() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        {/* Page Header */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">
            Getting Started
          </p>
          <h1 id="introduction" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Introduction to Rustpress
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Learn about Rustpress, a modern content management system built with Rust,
            designed for performance, security, and developer experience.
          </p>
        </div>

        {/* What is Rustpress */}
        <section className="mb-12">
          <h2 id="what-is-rustpress" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What is Rustpress?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress is a next-generation content management system (CMS) built entirely in Rust.
            It combines the reliability and performance of Rust with an intuitive developer experience
            inspired by popular CMS platforms like WordPress.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Whether you're building a personal blog, a corporate website, or a complex web application,
            Rustpress provides the foundation you need with its flexible theme and plugin architecture.
          </p>

          <CodeBlock code={helloWorldCode} language="rust" title="main.rs" />
        </section>

        {/* Why Rustpress */}
        <section className="mb-12">
          <h2 id="why-rustpress" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Rustpress?
          </h2>

          <CardGrid columns={2}>
            <Card
              icon={<Zap className="w-5 h-5" />}
              title="Performance"
              description="Rust's zero-cost abstractions and memory safety give Rustpress exceptional performance. Handle thousands of concurrent requests with minimal resource usage."
            />
            <Card
              icon={<Shield className="w-5 h-5" />}
              title="Security"
              description="Built with Rust's memory safety guarantees. No buffer overflows, no null pointer dereferences, no data races."
            />
            <Card
              icon={<Puzzle className="w-5 h-5" />}
              title="Extensibility"
              description="A powerful hook and filter system allows you to modify any aspect of Rustpress without touching core code."
            />
            <Card
              icon={<Heart className="w-5 h-5" />}
              title="Developer Experience"
              description="Familiar patterns, excellent documentation, and a thriving community make Rustpress a joy to work with."
            />
          </CardGrid>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <h2 id="key-features" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Key Features
          </h2>

          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rust-500 mt-2 flex-shrink-0" />
              <span><strong className="text-gray-900 dark:text-white">Theme System</strong> - Create beautiful, responsive themes with our template engine</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rust-500 mt-2 flex-shrink-0" />
              <span><strong className="text-gray-900 dark:text-white">Plugin Architecture</strong> - Extend functionality with hooks, filters, and actions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rust-500 mt-2 flex-shrink-0" />
              <span><strong className="text-gray-900 dark:text-white">REST API</strong> - Full-featured REST API for headless CMS usage</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rust-500 mt-2 flex-shrink-0" />
              <span><strong className="text-gray-900 dark:text-white">Database Flexibility</strong> - Support for PostgreSQL, MySQL, and SQLite</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rust-500 mt-2 flex-shrink-0" />
              <span><strong className="text-gray-900 dark:text-white">Admin Dashboard</strong> - Intuitive admin interface for content management</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-rust-500 mt-2 flex-shrink-0" />
              <span><strong className="text-gray-900 dark:text-white">CLI Tools</strong> - Powerful command-line tools for development and deployment</span>
            </li>
          </ul>
        </section>

        {/* Architecture */}
        <section className="mb-12">
          <h2 id="architecture" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Architecture Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress follows a modular architecture that separates concerns and allows for easy extension:
          </p>

          <Callout type="info" title="Core Components">
            <ul className="mt-2 space-y-1">
              <li><strong>Core</strong> - The heart of Rustpress, handling routing, requests, and responses</li>
              <li><strong>Database</strong> - Abstraction layer for database operations</li>
              <li><strong>Themes</strong> - Template rendering and asset management</li>
              <li><strong>Plugins</strong> - Extension system with hooks and filters</li>
              <li><strong>Admin</strong> - Administrative dashboard and API</li>
            </ul>
          </Callout>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <h2 id="next-steps" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Next Steps
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to get started? Here's where to go next:
          </p>

          <div className="grid gap-4">
            <Link
              to="/docs/getting-started/installation"
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-rust-300 dark:hover:border-rust-700 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Installation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Install Rustpress and set up your development environment</p>
              </div>
              <ArrowRight className="w-5 h-5 text-rust-500" />
            </Link>
            <Link
              to="/docs/getting-started/quick-start"
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-rust-300 dark:hover:border-rust-700 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Quick Start</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Create your first Rustpress site in under 5 minutes</p>
              </div>
              <ArrowRight className="w-5 h-5 text-rust-500" />
            </Link>
          </div>
        </section>
      </article>
    </DocLayout>
  );
}
