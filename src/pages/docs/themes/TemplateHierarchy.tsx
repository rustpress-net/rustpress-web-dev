import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Callout } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'hierarchy-chart', title: 'Hierarchy Chart', level: 2 },
  { id: 'single-templates', title: 'Single Templates', level: 2 },
  { id: 'archive-templates', title: 'Archive Templates', level: 2 },
  { id: 'custom-templates', title: 'Custom Templates', level: 2 },
];

export function TemplateHierarchy() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">
            Theme Development
          </p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Template Hierarchy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Understand which template files are used for different types of content.
          </p>
        </div>

        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress uses a template hierarchy to determine which template to use for each request.
            It looks for templates from most specific to most general.
          </p>
        </section>

        <section className="mb-12">
          <h2 id="hierarchy-chart" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Template Hierarchy
          </h2>

          <CodeBlock
            code={`Single Post:
  single-{slug}.html → single-{category}.html → single.html → index.html

Static Page:
  page-{slug}.html → page.html → index.html

Category Archive:
  category-{slug}.html → category.html → archive.html → index.html

Tag Archive:
  tag-{slug}.html → tag.html → archive.html → index.html

Author Archive:
  author-{username}.html → author.html → archive.html → index.html

Date Archive:
  date.html → archive.html → index.html

Search Results:
  search.html → archive.html → index.html

404 Error:
  404.html → index.html

Home Page:
  home.html → index.html`}
            language="text"
            title="Template Lookup Order"
            showLineNumbers={false}
          />
        </section>

        <section className="mb-12">
          <h2 id="single-templates" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Single Templates
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            For a post with slug "hello-world" in category "tutorials":
          </p>

          <ol className="space-y-2 text-gray-600 dark:text-gray-400 list-decimal list-inside mb-4">
            <li>First tries <code className="prose-code">single-hello-world.html</code></li>
            <li>Then <code className="prose-code">single-tutorials.html</code></li>
            <li>Then <code className="prose-code">single.html</code></li>
            <li>Falls back to <code className="prose-code">index.html</code></li>
          </ol>

          <CodeBlock
            code={`{% extends "index.html" %}

{% block content %}
<article class="post">
  <header>
    <h1>{{ post.title }}</h1>
    <time datetime="{{ post.date | date('Y-m-d') }}">
      {{ post.date | date('F j, Y') }}
    </time>
  </header>

  <div class="content">
    {{ post.content | safe }}
  </div>

  <footer>
    <p>Posted in:
      {% for category in post.categories %}
        <a href="{{ category.url }}">{{ category.name }}</a>
      {% endfor %}
    </p>
  </footer>
</article>
{% endblock %}`}
            language="html"
            title="templates/single.html"
          />
        </section>

        <section className="mb-12">
          <h2 id="archive-templates" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Archive Templates
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Archive templates display lists of posts:
          </p>

          <CodeBlock
            code={`{% extends "index.html" %}

{% block content %}
<div class="archive">
  <h1>{{ archive.title }}</h1>

  <div class="posts">
    {% for post in posts %}
      {% include "partials/post-card.html" %}
    {% endfor %}
  </div>

  {% include "partials/pagination.html" %}
</div>
{% endblock %}`}
            language="html"
            title="templates/archive.html"
          />
        </section>

        <section className="mb-12">
          <h2 id="custom-templates" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Custom Templates
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create custom templates for specific content by matching the slug:
          </p>

          <Callout type="tip" title="Example">
            For a landing page at /pricing, create <code className="prose-code">page-pricing.html</code>
            with a completely custom layout.
          </Callout>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/docs/themes/structure"
            className="text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400"
          >
            ← Theme Structure
          </Link>
          <Link
            to="/docs/themes/template-tags"
            className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700"
          >
            Template Tags
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
