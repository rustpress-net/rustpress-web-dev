import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Callout, Tabs } from '../../../components/ui';

const tocItems = [
  { id: 'config-file', title: 'Configuration File', level: 2 },
  { id: 'site-settings', title: 'Site Settings', level: 2 },
  { id: 'database-config', title: 'Database Configuration', level: 2 },
  { id: 'server-config', title: 'Server Configuration', level: 2 },
  { id: 'theme-config', title: 'Theme Configuration', level: 2 },
  { id: 'env-variables', title: 'Environment Variables', level: 2 },
];

export function Configuration() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">
            Getting Started
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Configuration
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Configure your Rustpress site using rustpress.toml and environment variables.
          </p>
        </div>

        <section className="mb-12">
          <h2 id="config-file" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Configuration File
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All configuration lives in <code className="prose-code">rustpress.toml</code> at the project root:
          </p>

          <CodeBlock
            code={`[site]
name = "My Rustpress Site"
url = "https://example.com"
description = "A blazing fast site built with Rustpress"
language = "en"
timezone = "UTC"

[database]
url = "sqlite://./data/rustpress.db"
max_connections = 10

[server]
host = "0.0.0.0"
port = 3000
workers = 4

[theme]
active = "developer"

[cache]
enabled = true
ttl = 3600

[media]
upload_dir = "./uploads"
max_file_size = "10MB"
allowed_types = ["image/jpeg", "image/png", "image/gif", "image/webp"]

[security]
secret_key = "your-secret-key-here"
session_lifetime = 86400`}
            language="toml"
            title="rustpress.toml"
          />
        </section>

        <section className="mb-12">
          <h2 id="site-settings" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Site Settings
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 pr-4 font-semibold text-gray-900 dark:text-white">Option</th>
                  <th className="text-left py-3 pr-4 font-semibold text-gray-900 dark:text-white">Type</th>
                  <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4"><code className="prose-code">name</code></td>
                  <td className="py-3 pr-4">String</td>
                  <td className="py-3">Site title displayed in browser and templates</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4"><code className="prose-code">url</code></td>
                  <td className="py-3 pr-4">String</td>
                  <td className="py-3">Full URL of your site (used for SEO)</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4"><code className="prose-code">description</code></td>
                  <td className="py-3 pr-4">String</td>
                  <td className="py-3">Site meta description</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4"><code className="prose-code">language</code></td>
                  <td className="py-3 pr-4">String</td>
                  <td className="py-3">Default language code (e.g., "en", "es")</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4"><code className="prose-code">timezone</code></td>
                  <td className="py-3 pr-4">String</td>
                  <td className="py-3">Timezone for date/time display</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="database-config" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Database Configuration
          </h2>

          <Tabs
            tabs={[
              {
                id: 'sqlite',
                label: 'SQLite',
                content: (
                  <CodeBlock
                    code={`[database]
url = "sqlite://./data/rustpress.db"
max_connections = 5`}
                    language="toml"
                    showLineNumbers={false}
                  />
                ),
              },
              {
                id: 'postgres',
                label: 'PostgreSQL',
                content: (
                  <CodeBlock
                    code={`[database]
url = "postgres://user:password@localhost:5432/rustpress"
max_connections = 20
ssl_mode = "prefer"`}
                    language="toml"
                    showLineNumbers={false}
                  />
                ),
              },
              {
                id: 'mysql',
                label: 'MySQL',
                content: (
                  <CodeBlock
                    code={`[database]
url = "mysql://user:password@localhost:3306/rustpress"
max_connections = 20`}
                    language="toml"
                    showLineNumbers={false}
                  />
                ),
              },
            ]}
          />
        </section>

        <section className="mb-12">
          <h2 id="server-config" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Server Configuration
          </h2>

          <CodeBlock
            code={`[server]
host = "0.0.0.0"           # Listen on all interfaces
port = 3000                # Port number
workers = 4                # Number of worker threads (0 = auto)
keep_alive = 75            # Keep-alive timeout in seconds
max_request_size = "16MB"  # Maximum request body size`}
            language="toml"
            showLineNumbers={false}
          />

          <Callout type="info" title="Production Tip">
            In production, set <code className="prose-code">workers</code> to 0 to let Rustpress automatically
            detect the optimal number based on available CPU cores.
          </Callout>
        </section>

        <section className="mb-12">
          <h2 id="theme-config" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Theme Configuration
          </h2>

          <CodeBlock
            code={`[theme]
active = "developer"       # Active theme name

[theme.settings]           # Theme-specific settings
primary_color = "#e35f29"
show_sidebar = true
posts_per_page = 10`}
            language="toml"
            showLineNumbers={false}
          />
        </section>

        <section className="mb-12">
          <h2 id="env-variables" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Environment Variables
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Override configuration with environment variables (useful for production):
          </p>

          <CodeBlock
            code={`# Database
RUSTPRESS_DATABASE_URL=postgres://user:pass@host/db

# Server
RUSTPRESS_SERVER_PORT=8080

# Security
RUSTPRESS_SECRET_KEY=your-production-secret

# Debug mode
RUSTPRESS_DEBUG=false`}
            language="bash"
            title=".env"
          />

          <Callout type="warning" title="Security">
            Never commit secrets to version control. Use environment variables for sensitive configuration.
          </Callout>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/docs/getting-started/project-structure"
            className="text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400"
          >
            ← Project Structure
          </Link>
          <Link
            to="/docs/getting-started/cli-commands"
            className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700"
          >
            CLI Commands
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
