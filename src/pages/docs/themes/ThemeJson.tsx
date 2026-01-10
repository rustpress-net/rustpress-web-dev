import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'basic-config', title: 'Basic Configuration', level: 2 },
  { id: 'settings', title: 'Theme Settings', level: 2 },
  { id: 'supports', title: 'Feature Support', level: 2 },
];

export function ThemeJson() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Theme Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">theme.json Configuration</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Configure your theme using the theme.json manifest file.</p>
        </div>

        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The theme.json file defines your theme's metadata, settings, and capabilities.
          </p>
        </section>

        <section className="mb-12">
          <h2 id="basic-config" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Basic Configuration</h2>
          <CodeBlock code={`{
  "name": "My Theme",
  "version": "1.0.0",
  "author": "Your Name",
  "author_url": "https://yoursite.com",
  "description": "A beautiful Rustpress theme",
  "license": "MIT",
  "screenshot": "screenshot.png",
  "requires": {
    "rustpress": ">=1.0.0"
  }
}`} language="json" title="theme.json" />
        </section>

        <section className="mb-12">
          <h2 id="settings" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Theme Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Define configurable options for your theme:</p>
          <CodeBlock code={`{
  "settings": {
    "primary_color": {
      "type": "color",
      "default": "#e35f29",
      "label": "Primary Color"
    },
    "font_family": {
      "type": "select",
      "default": "inter",
      "label": "Font Family",
      "options": [
        { "value": "inter", "label": "Inter" },
        { "value": "roboto", "label": "Roboto" },
        { "value": "system", "label": "System" }
      ]
    },
    "show_sidebar": {
      "type": "boolean",
      "default": true,
      "label": "Show Sidebar"
    },
    "posts_per_page": {
      "type": "number",
      "default": 10,
      "min": 1,
      "max": 50,
      "label": "Posts Per Page"
    }
  }
}`} language="json" />
        </section>

        <section className="mb-12">
          <h2 id="supports" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Feature Support</h2>
          <CodeBlock code={`{
  "supports": [
    "dark-mode",
    "custom-colors",
    "responsive-images",
    "syntax-highlighting",
    "featured-images",
    "custom-logo",
    "custom-header",
    "widgets"
  ]
}`} language="json" />
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/themes/template-tags" className="text-gray-600 dark:text-gray-400 hover:text-rust-600">← Template Tags</Link>
          <Link to="/docs/themes/styling" className="flex items-center gap-2 text-rust-600 dark:text-rust-400">Styling & CSS <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
