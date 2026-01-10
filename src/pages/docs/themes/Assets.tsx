import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function Assets() {
  return (
    <DocLayout tocItems={[{ id: 'overview', title: 'Overview', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Theme Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Assets Management</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Manage JavaScript, CSS, images, and fonts in your theme.</p>
        </div>
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading Assets</h2>
          <CodeBlock code={`<head>
  <!-- CSS -->
  <link rel="stylesheet" href="{{ theme_url }}/style.css">
  <link rel="stylesheet" href="{{ theme_url }}/assets/css/components.css">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
</head>
<body>
  <!-- Scripts at end of body -->
  <script src="{{ theme_url }}/assets/js/main.js" defer></script>
</body>`} language="html" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/themes/styling" className="text-gray-600 hover:text-rust-600">← Styling</Link>
          <Link to="/docs/themes/hooks" className="flex items-center gap-2 text-rust-600">Theme Hooks <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
