import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Callout } from '../../../components/ui';

const tocItems = [
  { id: 'css-organization', title: 'CSS Organization', level: 2 },
  { id: 'custom-properties', title: 'CSS Custom Properties', level: 2 },
  { id: 'dark-mode', title: 'Dark Mode Support', level: 2 },
  { id: 'best-practices', title: 'Best Practices', level: 2 },
];

export function Styling() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Theme Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Styling & CSS</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Best practices for styling Rustpress themes.</p>
        </div>

        <section className="mb-12">
          <h2 id="css-organization" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">CSS Organization</h2>
          <CodeBlock code={`/* style.css - Main stylesheet */

/* 1. Reset & Base */
@import 'assets/css/reset.css';

/* 2. Variables */
:root {
  --color-primary: #e35f29;
  --color-text: #1a1a2e;
  --color-bg: #ffffff;
  --font-sans: system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* 3. Typography */
body { font-family: var(--font-sans); }
h1, h2, h3 { font-weight: 700; }

/* 4. Layout */
.container { max-width: 1200px; margin: 0 auto; }

/* 5. Components */
.btn { /* button styles */ }
.card { /* card styles */ }

/* 6. Utilities */
.text-center { text-align: center; }`} language="css" title="style.css" />
        </section>

        <section className="mb-12">
          <h2 id="custom-properties" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">CSS Custom Properties</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Use CSS variables to make themes customizable:</p>
          <CodeBlock code={`:root {
  --color-primary: {{ settings.primary_color | default('#e35f29') }};
  --color-secondary: {{ settings.secondary_color | default('#1a1a2e') }};
  --font-size-base: {{ settings.font_size | default('16px') }};
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}`} language="css" />
        </section>

        <section className="mb-12">
          <h2 id="dark-mode" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Dark Mode Support</h2>
          <CodeBlock code={`:root {
  --color-bg: #ffffff;
  --color-text: #1a1a2e;
}

[data-theme="dark"] {
  --color-bg: #1a1a2e;
  --color-text: #f5f5f5;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #1a1a2e;
    --color-text: #f5f5f5;
  }
}`} language="css" />
          <Callout type="tip" title="Dark Mode Toggle">Add a toggle button in your theme to switch between modes using JavaScript.</Callout>
        </section>

        <section className="mb-12">
          <h2 id="best-practices" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Best Practices</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>Use CSS custom properties for theming</li>
            <li>Mobile-first responsive design</li>
            <li>Minimize specificity conflicts</li>
            <li>Use logical properties (margin-inline, padding-block)</li>
            <li>Optimize for performance (minimize repaints)</li>
          </ul>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/themes/theme-json" className="text-gray-600 dark:text-gray-400 hover:text-rust-600">← theme.json</Link>
          <Link to="/docs/themes/assets" className="flex items-center gap-2 text-rust-600 dark:text-rust-400">Assets Management <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
