import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Callout, Tabs } from '../../../components/ui';

const tocItems = [
  { id: 'requirements', title: 'Requirements', level: 2 },
  { id: 'install-rust', title: 'Install Rust', level: 2 },
  { id: 'install-rustpress', title: 'Install Rustpress CLI', level: 2 },
  { id: 'database-setup', title: 'Database Setup', level: 2 },
  { id: 'verify-installation', title: 'Verify Installation', level: 2 },
];

export function Installation() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">
            Getting Started
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Installation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Set up Rustpress on your local machine or server.
          </p>
        </div>

        <section className="mb-12">
          <h2 id="requirements" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            System Requirements
          </h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><strong>Rust:</strong> Version 1.70 or higher</li>
            <li><strong>Operating System:</strong> Linux, macOS, or Windows</li>
            <li><strong>Memory:</strong> Minimum 512MB RAM</li>
            <li><strong>Database:</strong> PostgreSQL 12+, MySQL 8+, or SQLite 3.35+</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 id="install-rust" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Install Rust
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            If you don't have Rust installed, install it using rustup:
          </p>

          <Tabs
            tabs={[
              {
                id: 'unix',
                label: 'Linux / macOS',
                content: (
                  <CodeBlock
                    code={`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`}
                    language="bash"
                    showLineNumbers={false}
                  />
                ),
              },
              {
                id: 'windows',
                label: 'Windows',
                content: (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Download and run the installer from{' '}
                      <a href="https://rustup.rs" className="text-rust-600 hover:underline">rustup.rs</a>
                    </p>
                    <CodeBlock
                      code={`# Or use winget
winget install Rustlang.Rustup`}
                      language="bash"
                      showLineNumbers={false}
                    />
                  </div>
                ),
              },
            ]}
          />

          <Callout type="tip" title="Verify Rust Installation">
            After installation, verify Rust is installed correctly:
            <CodeBlock code="rustc --version" language="bash" showLineNumbers={false} />
          </Callout>
        </section>

        <section className="mb-12">
          <h2 id="install-rustpress" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Install Rustpress CLI
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Install the Rustpress CLI tool using Cargo:
          </p>
          <CodeBlock
            code={`cargo install rustpress-cli`}
            language="bash"
            showLineNumbers={false}
          />
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            This will install the <code className="prose-code">rustpress</code> command globally.
          </p>
        </section>

        <section className="mb-12">
          <h2 id="database-setup" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Database Setup
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress supports multiple databases. Choose your preferred option:
          </p>

          <Tabs
            tabs={[
              {
                id: 'sqlite',
                label: 'SQLite (Easiest)',
                content: (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      SQLite requires no setup. Rustpress will create the database file automatically.
                    </p>
                    <CodeBlock
                      code={`# In your rustpress.toml
[database]
url = "sqlite://./data/rustpress.db"`}
                      language="toml"
                      showLineNumbers={false}
                    />
                  </div>
                ),
              },
              {
                id: 'postgres',
                label: 'PostgreSQL',
                content: (
                  <div>
                    <CodeBlock
                      code={`# Create a database
createdb rustpress

# In your rustpress.toml
[database]
url = "postgres://user:password@localhost/rustpress"`}
                      language="bash"
                      showLineNumbers={false}
                    />
                  </div>
                ),
              },
              {
                id: 'mysql',
                label: 'MySQL',
                content: (
                  <div>
                    <CodeBlock
                      code={`# Create a database
mysql -u root -p -e "CREATE DATABASE rustpress;"

# In your rustpress.toml
[database]
url = "mysql://user:password@localhost/rustpress"`}
                      language="bash"
                      showLineNumbers={false}
                    />
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mb-12">
          <h2 id="verify-installation" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Verify Installation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Verify that Rustpress CLI is installed correctly:
          </p>
          <CodeBlock
            code={`rustpress --version
# Output: rustpress 1.0.0`}
            language="bash"
            showLineNumbers={false}
          />
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/docs/getting-started/introduction"
            className="text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400"
          >
            ← Introduction
          </Link>
          <Link
            to="/docs/getting-started/quick-start"
            className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700"
          >
            Quick Start
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
