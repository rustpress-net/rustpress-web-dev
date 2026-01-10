import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { FileTree, Callout } from '../../../components/ui';
import type { FileTreeItem } from '../../../components/ui';

const tocItems = [
  { id: 'required-files', title: 'Required Files', level: 2 },
  { id: 'templates', title: 'Templates Directory', level: 2 },
  { id: 'partials', title: 'Partials', level: 2 },
  { id: 'assets', title: 'Assets Directory', level: 2 },
  { id: 'full-example', title: 'Full Example', level: 2 },
];

const themeStructure: FileTreeItem[] = [
  {
    name: 'my-theme',
    type: 'folder',
    children: [
      { name: 'theme.json', type: 'file', highlight: true },
      { name: 'index.html', type: 'file', highlight: true },
      { name: 'style.css', type: 'file', highlight: true },
      { name: 'screenshot.png', type: 'file' },
      {
        name: 'templates',
        type: 'folder',
        children: [
          { name: 'single.html', type: 'file' },
          { name: 'archive.html', type: 'file' },
          { name: 'page.html', type: 'file' },
          { name: 'category.html', type: 'file' },
          { name: '404.html', type: 'file' },
        ],
      },
      {
        name: 'partials',
        type: 'folder',
        children: [
          { name: 'header.html', type: 'file' },
          { name: 'footer.html', type: 'file' },
          { name: 'sidebar.html', type: 'file' },
          { name: 'post-card.html', type: 'file' },
        ],
      },
      {
        name: 'assets',
        type: 'folder',
        children: [
          {
            name: 'css',
            type: 'folder',
            children: [
              { name: 'components.css', type: 'file' },
            ],
          },
          {
            name: 'js',
            type: 'folder',
            children: [
              { name: 'main.js', type: 'file' },
            ],
          },
          {
            name: 'images',
            type: 'folder',
            children: [],
          },
          {
            name: 'fonts',
            type: 'folder',
            children: [],
          },
        ],
      },
    ],
  },
];

export function ThemeStructure() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">
            Theme Development
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Theme Structure
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Understanding the files and directories in a Rustpress theme.
          </p>
        </div>

        <section className="mb-12">
          <h2 id="required-files" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Required Files
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Every theme must have these files:
          </p>

          <FileTree items={themeStructure} title="Theme Directory Structure" />

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">theme.json</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Theme metadata including name, version, and configuration options.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">index.html</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                The base layout template that other templates extend.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">style.css</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Main stylesheet for the theme.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="templates" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Templates Directory
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The <code className="prose-code">templates/</code> directory contains page-specific templates:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 pr-4 font-semibold text-gray-900 dark:text-white">File</th>
                  <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">Used For</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4"><code className="prose-code">single.html</code></td>
                  <td className="py-3">Individual blog posts</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4"><code className="prose-code">page.html</code></td>
                  <td className="py-3">Static pages (About, Contact)</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4"><code className="prose-code">archive.html</code></td>
                  <td className="py-3">Blog listing / archive pages</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4"><code className="prose-code">category.html</code></td>
                  <td className="py-3">Category archive pages</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4"><code className="prose-code">tag.html</code></td>
                  <td className="py-3">Tag archive pages</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4"><code className="prose-code">search.html</code></td>
                  <td className="py-3">Search results page</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4"><code className="prose-code">404.html</code></td>
                  <td className="py-3">Not found error page</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="partials" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Partials
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Partials are reusable template fragments. Include them with:
          </p>

          <CodeBlock
            code={`{% include "partials/header.html" %}

<main>
  {% block content %}{% endblock %}
</main>

{% include "partials/footer.html" %}`}
            language="html"
          />

          <Callout type="tip" title="Best Practice">
            Use partials for repeated elements like headers, footers, sidebars, and post cards to keep your code DRY.
          </Callout>
        </section>

        <section className="mb-12">
          <h2 id="assets" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Assets Directory
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The <code className="prose-code">assets/</code> directory contains static files:
          </p>

          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li><strong>css/</strong> - Additional stylesheets</li>
            <li><strong>js/</strong> - JavaScript files</li>
            <li><strong>images/</strong> - Theme images</li>
            <li><strong>fonts/</strong> - Custom fonts</li>
          </ul>

          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Reference assets in templates using <code className="prose-code">{"{{ theme_url }}"}</code>:
          </p>

          <CodeBlock
            code={`<link rel="stylesheet" href="{{ theme_url }}/assets/css/components.css">
<script src="{{ theme_url }}/assets/js/main.js"></script>
<img src="{{ theme_url }}/assets/images/logo.png" alt="Logo">`}
            language="html"
          />
        </section>

        <section className="mb-12">
          <h2 id="full-example" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Full Example
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Here's a complete theme.json configuration:
          </p>

          <CodeBlock
            code={`{
  "name": "Developer Theme",
  "version": "1.0.0",
  "author": "Rustpress Team",
  "author_url": "https://rustpress.net",
  "description": "A clean, developer-focused theme",
  "license": "MIT",
  "screenshot": "screenshot.png",

  "requires": {
    "rustpress": ">=1.0.0"
  },

  "supports": [
    "dark-mode",
    "custom-colors",
    "responsive-images",
    "syntax-highlighting"
  ],

  "settings": {
    "primary_color": {
      "type": "color",
      "default": "#e35f29",
      "label": "Primary Color"
    },
    "show_sidebar": {
      "type": "boolean",
      "default": true,
      "label": "Show Sidebar"
    },
    "posts_per_page": {
      "type": "number",
      "default": 10,
      "label": "Posts Per Page"
    }
  }
}`}
            language="json"
            title="theme.json"
          />
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/docs/themes/basics"
            className="text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400"
          >
            ← Theme Basics
          </Link>
          <Link
            to="/docs/themes/template-hierarchy"
            className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700"
          >
            Template Hierarchy
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
