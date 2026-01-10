import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Layout, Code, Layers } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Callout, Card, CardGrid, Steps, Step } from '../../../components/ui';

const tocItems = [
  { id: 'what-is-theme', title: 'What is a Theme?', level: 2 },
  { id: 'how-themes-work', title: 'How Themes Work', level: 2 },
  { id: 'your-first-theme', title: 'Your First Theme', level: 2 },
  { id: 'theme-concepts', title: 'Key Concepts', level: 2 },
];

export function ThemeBasics() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">
            Theme Development
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Theme Basics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Learn the fundamentals of creating themes for Rustpress.
          </p>
        </div>

        <section className="mb-12">
          <h2 id="what-is-theme" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            What is a Theme?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A theme controls the visual appearance of your Rustpress site. It consists of templates,
            stylesheets, and assets that work together to render your content.
          </p>

          <CardGrid columns={2}>
            <Card
              icon={<Layout className="w-5 h-5" />}
              title="Templates"
              description="HTML templates that define the structure of pages"
            />
            <Card
              icon={<Palette className="w-5 h-5" />}
              title="Styles"
              description="CSS files that control colors, typography, and layout"
            />
            <Card
              icon={<Code className="w-5 h-5" />}
              title="Scripts"
              description="JavaScript for interactivity (optional)"
            />
            <Card
              icon={<Layers className="w-5 h-5" />}
              title="Assets"
              description="Images, fonts, and other static files"
            />
          </CardGrid>
        </section>

        <section className="mb-12">
          <h2 id="how-themes-work" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            How Themes Work
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            When a visitor requests a page, Rustpress:
          </p>

          <ol className="space-y-2 text-gray-600 dark:text-gray-400 list-decimal list-inside mb-6">
            <li>Determines what content to display</li>
            <li>Finds the appropriate template in the active theme</li>
            <li>Passes data to the template engine</li>
            <li>Renders HTML and sends it to the browser</li>
          </ol>

          <CodeBlock
            code={`Request: /blog/my-post
     ↓
Content Lookup: Find "my-post" in database
     ↓
Template Selection: single.html (for single posts)
     ↓
Template Rendering: Inject content into template
     ↓
Response: Complete HTML page`}
            language="text"
            title="Request Flow"
            showLineNumbers={false}
          />
        </section>

        <section className="mb-12">
          <h2 id="your-first-theme" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your First Theme
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Let's create a minimal theme to understand the basics:
          </p>

          <Steps>
            <Step number={1} title="Create the theme directory">
              <CodeBlock
                code={`rustpress theme:create my-first-theme`}
                language="bash"
                showLineNumbers={false}
              />
            </Step>

            <Step number={2} title="Create theme.json">
              <CodeBlock
                code={`{
  "name": "My First Theme",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "A simple Rustpress theme"
}`}
                language="json"
                title="themes/my-first-theme/theme.json"
              />
            </Step>

            <Step number={3} title="Create the index template">
              <CodeBlock
                code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ site.name }}</title>
  <link rel="stylesheet" href="{{ theme_url }}/style.css">
</head>
<body>
  <header>
    <h1>{{ site.name }}</h1>
    <nav>
      {% for item in menu.main %}
        <a href="{{ item.url }}">{{ item.title }}</a>
      {% endfor %}
    </nav>
  </header>

  <main>
    {% block content %}{% endblock %}
  </main>

  <footer>
    <p>&copy; {{ year }} {{ site.name }}</p>
  </footer>
</body>
</html>`}
                language="html"
                title="themes/my-first-theme/index.html"
              />
            </Step>

            <Step number={4} title="Add basic styles">
              <CodeBlock
                code={`* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #333;
}

header {
  background: #1a1a2e;
  color: white;
  padding: 1rem 2rem;
}

main {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

footer {
  text-align: center;
  padding: 2rem;
  color: #666;
}`}
                language="css"
                title="themes/my-first-theme/style.css"
              />
            </Step>

            <Step number={5} title="Activate your theme">
              <CodeBlock
                code={`rustpress theme:activate my-first-theme`}
                language="bash"
                showLineNumbers={false}
              />
            </Step>
          </Steps>
        </section>

        <section className="mb-12">
          <h2 id="theme-concepts" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Key Concepts
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Template Inheritance
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Templates can extend a base layout, reducing code duplication:
              </p>
              <CodeBlock
                code={`{% extends "index.html" %}

{% block content %}
  <article>
    <h1>{{ post.title }}</h1>
    <div>{{ post.content }}</div>
  </article>
{% endblock %}`}
                language="html"
                title="templates/single.html"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Template Variables
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Rustpress provides variables you can use in templates:
              </p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li><code className="prose-code">site</code> - Site information (name, url, description)</li>
                <li><code className="prose-code">post</code> - Current post data (on single pages)</li>
                <li><code className="prose-code">posts</code> - List of posts (on archive pages)</li>
                <li><code className="prose-code">page</code> - Current page data</li>
                <li><code className="prose-code">menu</code> - Navigation menus</li>
              </ul>
            </div>
          </div>
        </section>

        <Callout type="tip" title="Next Steps">
          Now that you understand the basics, learn about <Link to="/docs/themes/structure" className="text-rust-600 hover:underline">Theme Structure</Link> to create more complex themes.
        </Callout>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/docs/getting-started/cli-commands"
            className="text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400"
          >
            ← CLI Commands
          </Link>
          <Link
            to="/docs/themes/structure"
            className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700"
          >
            Theme Structure
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
