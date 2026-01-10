import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Callout, FileTree } from '../../../components/ui';
import type { FileTreeItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'root-files', title: 'Root Files', level: 2 },
  { id: 'content-directory', title: 'Content Directory', level: 2 },
  { id: 'themes-directory', title: 'Themes Directory', level: 2 },
  { id: 'plugins-directory', title: 'Plugins Directory', level: 2 },
  { id: 'public-directory', title: 'Public Directory', level: 2 },
];

const projectStructure: FileTreeItem[] = [
  {
    name: 'my-site',
    type: 'folder',
    children: [
      { name: 'rustpress.toml', type: 'file', highlight: true },
      { name: 'Cargo.toml', type: 'file' },
      {
        name: 'content',
        type: 'folder',
        children: [
          {
            name: 'posts',
            type: 'folder',
            children: [
              { name: 'hello-world.md', type: 'file' },
            ],
          },
          {
            name: 'pages',
            type: 'folder',
            children: [
              { name: 'about.md', type: 'file' },
              { name: 'contact.md', type: 'file' },
            ],
          },
        ],
      },
      {
        name: 'themes',
        type: 'folder',
        children: [
          {
            name: 'developer',
            type: 'folder',
            highlight: true,
            children: [
              { name: 'theme.json', type: 'file' },
              { name: 'index.html', type: 'file' },
              { name: 'style.css', type: 'file' },
              {
                name: 'templates',
                type: 'folder',
                children: [
                  { name: 'single.html', type: 'file' },
                  { name: 'archive.html', type: 'file' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'plugins',
        type: 'folder',
        children: [
          { name: '.gitkeep', type: 'file' },
        ],
      },
      {
        name: 'public',
        type: 'folder',
        children: [
          { name: 'favicon.ico', type: 'file' },
          {
            name: 'images',
            type: 'folder',
            children: [],
          },
        ],
      },
      {
        name: 'data',
        type: 'folder',
        children: [
          { name: 'rustpress.db', type: 'file' },
        ],
      },
    ],
  },
];

export function ProjectStructure() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">
            Getting Started
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Project Structure
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Understanding the files and directories in your Rustpress project.
          </p>
        </div>

        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A typical Rustpress project has the following structure:
          </p>

          <FileTree items={projectStructure} title="Project Structure" />
        </section>

        <section className="mb-12">
          <h2 id="root-files" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Root Files
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                rustpress.toml
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The main configuration file for your Rustpress site:
              </p>
              <CodeBlock
                code={`[site]
name = "My Awesome Site"
url = "https://mysite.com"
description = "A site built with Rustpress"

[database]
url = "sqlite://./data/rustpress.db"

[server]
host = "0.0.0.0"
port = 3000

[theme]
active = "developer"`}
                language="toml"
                title="rustpress.toml"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Cargo.toml
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rust package manifest for custom plugins or extensions written in Rust.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="content-directory" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Content Directory
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The <code className="prose-code">content/</code> directory stores all your Markdown content:
          </p>

          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li><strong>posts/</strong> - Blog posts and articles</li>
            <li><strong>pages/</strong> - Static pages like About, Contact</li>
            <li><strong>drafts/</strong> - Unpublished content (optional)</li>
          </ul>

          <Callout type="tip" title="Content Organization">
            You can organize content in subdirectories. Rustpress will use the directory structure to create categories.
          </Callout>
        </section>

        <section className="mb-12">
          <h2 id="themes-directory" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Themes Directory
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The <code className="prose-code">themes/</code> directory contains all installed themes.
            Each theme lives in its own subdirectory.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            See <Link to="/docs/themes/structure" className="text-rust-600 hover:underline">Theme Structure</Link> for details on theme files.
          </p>
        </section>

        <section className="mb-12">
          <h2 id="plugins-directory" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Plugins Directory
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The <code className="prose-code">plugins/</code> directory contains installed plugins.
            Plugins extend Rustpress functionality.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            See <Link to="/docs/plugins/structure" className="text-rust-600 hover:underline">Plugin Structure</Link> for details.
          </p>
        </section>

        <section className="mb-12">
          <h2 id="public-directory" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Public Directory
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The <code className="prose-code">public/</code> directory contains static assets that are
            served directly. Files here are accessible at the root URL.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            For example, <code className="prose-code">public/favicon.ico</code> is available at <code className="prose-code">/favicon.ico</code>.
          </p>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/docs/getting-started/quick-start"
            className="text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400"
          >
            ← Quick Start
          </Link>
          <Link
            to="/docs/getting-started/configuration"
            className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700"
          >
            Configuration
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
