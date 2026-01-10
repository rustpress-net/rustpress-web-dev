import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Callout, Steps, Step } from '../../../components/ui';

const tocItems = [
  { id: 'create-project', title: 'Create a New Project', level: 2 },
  { id: 'project-overview', title: 'Project Overview', level: 2 },
  { id: 'start-server', title: 'Start Development Server', level: 2 },
  { id: 'create-content', title: 'Create Your First Post', level: 2 },
  { id: 'whats-next', title: "What's Next", level: 2 },
];

export function QuickStart() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">
            Getting Started
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Start
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get up and running with Rustpress in under 5 minutes.
          </p>
        </div>

        <Callout type="info" title="Prerequisites">
          Make sure you have completed the <Link to="/docs/getting-started/installation" className="text-rust-600 hover:underline">installation steps</Link> before proceeding.
        </Callout>

        <section className="mb-12">
          <h2 id="create-project" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Create a New Project
          </h2>

          <Steps>
            <Step number={1} title="Create a new Rustpress site">
              <p className="mb-4">Use the CLI to scaffold a new project:</p>
              <CodeBlock
                code={`rustpress new my-awesome-site`}
                language="bash"
                showLineNumbers={false}
              />
              <p className="mt-4 text-sm">
                This creates a new directory with all the necessary files.
              </p>
            </Step>

            <Step number={2} title="Navigate to your project">
              <CodeBlock
                code={`cd my-awesome-site`}
                language="bash"
                showLineNumbers={false}
              />
            </Step>

            <Step number={3} title="Initialize the database">
              <CodeBlock
                code={`rustpress db:migrate`}
                language="bash"
                showLineNumbers={false}
              />
            </Step>
          </Steps>
        </section>

        <section className="mb-12">
          <h2 id="project-overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your new project has the following structure:
          </p>

          <CodeBlock
            code={`my-awesome-site/
├── rustpress.toml      # Main configuration file
├── content/            # Your content (posts, pages)
│   └── posts/
├── themes/             # Theme files
│   └── developer/      # Default theme
├── plugins/            # Plugin directory
├── public/             # Static assets
└── data/               # Database files (SQLite)`}
            language="bash"
            title="Project Structure"
            showLineNumbers={false}
          />
        </section>

        <section className="mb-12">
          <h2 id="start-server" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Start Development Server
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start the development server with hot reload:
          </p>

          <CodeBlock
            code={`rustpress dev`}
            language="bash"
            showLineNumbers={false}
          />

          <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-medium mb-2">
              <CheckCircle className="w-5 h-5" />
              Server Running!
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your site is now available at{' '}
              <code className="prose-code">http://localhost:3000</code>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Admin dashboard at{' '}
              <code className="prose-code">http://localhost:3000/admin</code>
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="create-content" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your First Post
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create a new post using the CLI or create a Markdown file:
          </p>

          <CodeBlock
            code={`# Using CLI
rustpress content:create post "My First Post"

# Or create a file manually
# content/posts/my-first-post.md`}
            language="bash"
            showLineNumbers={false}
          />

          <p className="text-gray-600 dark:text-gray-400 mt-4 mb-4">
            Edit your post with frontmatter and content:
          </p>

          <CodeBlock
            code={`---
title: "My First Post"
date: 2024-01-15
author: "Your Name"
tags: ["welcome", "rustpress"]
---

# Welcome to Rustpress!

This is my first post powered by **Rustpress**.

## Features I'm excited about

- Blazing fast performance
- Easy theming
- Powerful plugin system

Let's build something amazing!`}
            language="markdown"
            title="content/posts/my-first-post.md"
          />
        </section>

        <section className="mb-12">
          <h2 id="whats-next" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What's Next?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Now that your site is running, explore these next steps:
          </p>

          <div className="grid gap-4">
            <Link
              to="/docs/getting-started/project-structure"
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-rust-300 dark:hover:border-rust-700 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Understand the Project Structure</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn about the files and directories in your project</p>
              </div>
              <ArrowRight className="w-5 h-5 text-rust-500" />
            </Link>
            <Link
              to="/docs/themes/basics"
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-rust-300 dark:hover:border-rust-700 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Customize Your Theme</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Make your site look exactly how you want</p>
              </div>
              <ArrowRight className="w-5 h-5 text-rust-500" />
            </Link>
            <Link
              to="/docs/plugins/basics"
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-rust-300 dark:hover:border-rust-700 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Add Plugins</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Extend your site with powerful plugins</p>
              </div>
              <ArrowRight className="w-5 h-5 text-rust-500" />
            </Link>
          </div>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/docs/getting-started/installation"
            className="text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400"
          >
            ← Installation
          </Link>
          <Link
            to="/docs/getting-started/project-structure"
            className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700"
          >
            Project Structure
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
