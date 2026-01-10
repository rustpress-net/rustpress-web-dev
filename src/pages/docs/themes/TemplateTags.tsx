import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'site-tags', title: 'Site Tags', level: 2 },
  { id: 'post-tags', title: 'Post Tags', level: 2 },
  { id: 'loop-tags', title: 'Loop Tags', level: 2 },
  { id: 'conditional-tags', title: 'Conditional Tags', level: 2 },
];

export function TemplateTags() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Theme Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Template Tags</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Use template tags to display dynamic content in your themes.
          </p>
        </div>

        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress uses Tera templating engine syntax. Tags are enclosed in double curly braces.
          </p>
          <CodeBlock code={`{{ variable }}           {# Output a variable #}
{{ variable | filter }} {# Apply a filter #}
{% if condition %}      {# Control flow #}
{% for item in list %}  {# Loops #}`} language="html" showLineNumbers={false} />
        </section>

        <section className="mb-12">
          <h2 id="site-tags" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Site Tags</h2>
          <CodeBlock code={`{{ site.name }}         {# Site name #}
{{ site.url }}          {# Site URL #}
{{ site.description }}  {# Site description #}
{{ theme_url }}         {# Current theme URL #}
{{ year }}              {# Current year #}
{{ now }}               {# Current datetime #}`} language="html" showLineNumbers={false} />
        </section>

        <section className="mb-12">
          <h2 id="post-tags" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Tags</h2>
          <CodeBlock code={`{{ post.title }}                    {# Post title #}
{{ post.content | safe }}           {# Post content (rendered HTML) #}
{{ post.excerpt }}                  {# Post excerpt #}
{{ post.date | date("F j, Y") }}    {# Formatted date #}
{{ post.author.name }}              {# Author name #}
{{ post.url }}                      {# Post permalink #}
{{ post.featured_image }}           {# Featured image URL #}

{# Categories and tags #}
{% for cat in post.categories %}
  {{ cat.name }} - {{ cat.url }}
{% endfor %}`} language="html" />
        </section>

        <section className="mb-12">
          <h2 id="loop-tags" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loop Tags</h2>
          <CodeBlock code={`{% for post in posts %}
  <article>
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <p>{{ post.excerpt }}</p>
  </article>
{% endfor %}

{# Loop variables #}
{{ loop.index }}      {# Current iteration (1-indexed) #}
{{ loop.index0 }}     {# Current iteration (0-indexed) #}
{{ loop.first }}      {# True if first iteration #}
{{ loop.last }}       {# True if last iteration #}`} language="html" />
        </section>

        <section className="mb-12">
          <h2 id="conditional-tags" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conditional Tags</h2>
          <CodeBlock code={`{% if post.featured_image %}
  <img src="{{ post.featured_image }}" alt="{{ post.title }}">
{% endif %}

{% if is_single %}
  {# Single post page #}
{% elif is_archive %}
  {# Archive page #}
{% else %}
  {# Other pages #}
{% endif %}

{% if post.categories | length > 0 %}
  {# Has categories #}
{% endif %}`} language="html" />
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/themes/template-hierarchy" className="text-gray-600 dark:text-gray-400 hover:text-rust-600">← Template Hierarchy</Link>
          <Link to="/docs/themes/theme-json" className="flex items-center gap-2 text-rust-600 dark:text-rust-400">theme.json Configuration <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
