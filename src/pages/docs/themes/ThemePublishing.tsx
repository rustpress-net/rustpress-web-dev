import { Link } from 'react-router-dom';
import { ArrowRight, Package, CheckCircle, FileJson, Palette, Layout, Sparkles, Globe } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'theme-structure', title: 'Theme Structure', level: 2 },
  { id: 'theme-json', title: 'theme.json Configuration', level: 2 },
  { id: 'templates', title: 'Template Files', level: 2 },
  { id: 'packaging', title: 'Packaging Your Theme', level: 2 },
  { id: 'publishing', title: 'Publishing', level: 2 },
  { id: 'best-practices', title: 'Best Practices', level: 2 },
];

export function ThemePublishing() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Theme Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Publishing Themes</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Share your theme with the Rustpress community. Learn theme structure, configuration, and publishing best practices.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Rustpress themes are self-contained packages that define your site's appearance and layout.
            They use the Tera templating engine (similar to Jinja2) and are configured via a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">theme.json</code> file.
          </p>

          <div className="not-prose grid md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <FileJson className="w-8 h-8 text-rust-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">JSON Config</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">theme.json manifest</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Layout className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Tera Templates</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Jinja2-like HTML</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Palette className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Custom Styling</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">CSS/SCSS assets</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">AI Features</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Built-in AI tools</p>
            </div>
          </div>
        </section>

        {/* Theme Structure */}
        <section className="mb-12">
          <h2 id="theme-structure" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Theme Structure</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A complete Rustpress theme follows this directory structure:
          </p>

          <CodeBlock
            code={`my-theme/
├── theme.json              # Theme configuration manifest
├── templates/              # Tera template files
│   ├── base.html          # Base layout template
│   ├── index.html         # Homepage template
│   ├── page.html          # Generic page template
│   ├── post.html          # Single post template
│   ├── archive.html       # Post archive/listing
│   ├── category.html      # Category archive
│   ├── tag.html           # Tag archive
│   ├── author.html        # Author archive
│   ├── search.html        # Search results
│   ├── 404.html           # Not found page
│   ├── 500.html           # Server error page
│   └── partials/          # Reusable template parts
│       ├── header.html
│       ├── footer.html
│       ├── sidebar.html
│       ├── navigation.html
│       ├── comments.html
│       └── pagination.html
├── assets/                 # Static assets
│   ├── css/
│   │   ├── style.css      # Main stylesheet
│   │   └── admin.css      # Admin customizations
│   ├── js/
│   │   ├── main.js        # Main JavaScript
│   │   └── theme.js       # Theme-specific scripts
│   ├── images/
│   │   ├── logo.svg
│   │   └── screenshot.png  # Theme preview (1200x900)
│   └── fonts/             # Custom fonts
├── widgets/               # Custom widget templates
│   ├── hero.html
│   ├── features-grid.html
│   ├── testimonials.html
│   └── cta-banner.html
└── languages/             # Translation files
    ├── en.json
    └── es.json`}
            language="text"
            showLineNumbers={false}
          />
        </section>

        {/* theme.json Configuration */}
        <section className="mb-12">
          <h2 id="theme-json" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">theme.json Configuration</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">theme.json</code> file defines your theme's metadata, colors, fonts, features, and capabilities.
          </p>

          <Accordion>
            <AccordionItem title="Complete theme.json Example" defaultOpen>
              <CodeBlock
                code={`{
  "name": "My Awesome Theme",
  "version": "1.0.0",
  "description": "A beautiful, responsive theme for Rustpress with modern design and AI features.",
  "author": "Your Name",
  "license": "MIT",

  "colors": {
    "primary": "#6366F1",
    "primary_light": "#818CF8",
    "primary_dark": "#4F46E5",
    "secondary": "#06B6D4",
    "secondary_light": "#22D3EE",
    "secondary_dark": "#0891B2",
    "accent": "#F59E0B",
    "accent_light": "#FBBF24",
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#EF4444",
    "background": "#0F0F1A",
    "surface": "#1A1A2E",
    "surface_light": "#252542",
    "text": "#F8FAFC",
    "text_muted": "#94A3B8",
    "border": "#2D2D4A",
    "gradient_start": "#6366F1",
    "gradient_end": "#06B6D4",
    "glow": "rgba(99, 102, 241, 0.4)"
  },

  "fonts": {
    "heading": "Space Grotesk",
    "body": "Inter",
    "mono": "JetBrains Mono"
  },

  "features": {
    "darkMode": true,
    "glassmorphism": true,
    "megaMenu": true,
    "stickyHeader": true,
    "backToTop": true,
    "smoothScroll": true,
    "particleBackground": false,
    "cursorEffects": false,
    "scrollProgress": true,
    "lazyLoading": true,
    "animatedCounters": true,
    "parallaxSections": true,
    "magneticButtons": false,
    "typewriterEffect": false,
    "3dCards": false,
    "glowEffects": true,
    "gradientText": true,
    "morphingShapes": false,
    "codeHighlighting": true,
    "interactiveDemo": false
  },

  "rustpress_features": {
    "ai_enhancement_tools": [
      "title_generator",
      "content_summarizer",
      "seo_optimizer",
      "grammar_fixer",
      "image_generator",
      "alt_text_generator"
    ],
    "content_formats": ["blocks", "markdown", "html"],
    "admin_editable": true,
    "block_editor": true,
    "revision_history": true,
    "scheduled_publishing": true,
    "custom_templates": true
  },

  "pages": [
    "home",
    "about",
    "contact",
    "blog",
    "post",
    "privacy",
    "terms",
    "404",
    "500"
  ],

  "widgets": [
    "hero",
    "features-grid",
    "testimonials-carousel",
    "stats-counter",
    "cta-banner",
    "team-grid",
    "faq-accordion"
  ],

  "animations": {
    "fadeUp": true,
    "fadeIn": true,
    "scaleIn": true,
    "slideInLeft": true,
    "slideInRight": true,
    "staggerChildren": true,
    "floatingElements": false,
    "pulseGlow": true
  }
}`}
                language="json"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="Colors Configuration">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Define your theme's color palette. These values are available in templates via CSS custom properties.
              </p>
              <CodeBlock
                code={`"colors": {
  // Primary brand colors
  "primary": "#6366F1",          // Main brand color
  "primary_light": "#818CF8",    // Lighter variant
  "primary_dark": "#4F46E5",     // Darker variant

  // Secondary colors
  "secondary": "#06B6D4",

  // Semantic colors
  "success": "#10B981",          // Success states
  "warning": "#F59E0B",          // Warning states
  "error": "#EF4444",            // Error states

  // Surface colors
  "background": "#0F0F1A",       // Page background
  "surface": "#1A1A2E",          // Card/component background
  "surface_light": "#252542",    // Elevated surface

  // Text colors
  "text": "#F8FAFC",             // Primary text
  "text_muted": "#94A3B8",       // Secondary text

  // Effects
  "gradient_start": "#6366F1",
  "gradient_end": "#06B6D4",
  "glow": "rgba(99, 102, 241, 0.4)"
}`}
                language="json"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="Features Configuration">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Enable or disable theme features. Only enable features your theme actually implements.
              </p>
              <CodeBlock
                code={`"features": {
  // Core features
  "darkMode": true,              // Dark/light mode toggle
  "stickyHeader": true,          // Fixed navigation
  "backToTop": true,             // Scroll to top button
  "smoothScroll": true,          // Smooth scrolling
  "lazyLoading": true,           // Lazy load images

  // Visual effects
  "glassmorphism": true,         // Glass-like transparency
  "glowEffects": true,           // Glow/shadow effects
  "gradientText": true,          // Gradient text styles
  "scrollProgress": true,        // Reading progress bar

  // Advanced effects (use sparingly)
  "particleBackground": false,   // Animated particles
  "cursorEffects": false,        // Custom cursor
  "magneticButtons": false,      // Magnetic hover effect
  "3dCards": false,              // 3D card transforms
  "morphingShapes": false,       // Animated blob shapes

  // Content features
  "codeHighlighting": true,      // Syntax highlighting
  "animatedCounters": true,      // Number animations
  "parallaxSections": true       // Parallax scrolling
}`}
                language="json"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="Rustpress Features">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Configure Rustpress-specific features your theme supports.
              </p>
              <CodeBlock
                code={`"rustpress_features": {
  // AI enhancement tools supported
  "ai_enhancement_tools": [
    "title_generator",           // AI-generated titles
    "content_summarizer",        // Content summaries
    "seo_optimizer",             // SEO suggestions
    "plagiarism_checker",        // Plagiarism detection
    "tone_adjuster",             // Tone adjustment
    "grammar_fixer",             // Grammar correction
    "image_generator",           // AI image generation
    "alt_text_generator",        // Alt text for images
    "schema_generator",          // Schema.org markup
    "related_posts_suggester"    // Related content
  ],

  // Content formats supported
  "content_formats": [
    "blocks",                    // Block editor
    "markdown",                  // Markdown
    "html"                       // Raw HTML
  ],

  // Editor features
  "admin_editable": true,        // Admin page editing
  "block_editor": true,          // Block-based editor
  "revision_history": true,      // Content revisions
  "scheduled_publishing": true,  // Schedule posts
  "custom_templates": true       // Custom page templates
}`}
                language="json"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Templates */}
        <section className="mb-12">
          <h2 id="templates" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Template Files</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress uses the Tera templating engine, which has a syntax similar to Jinja2.
          </p>

          <Accordion>
            <AccordionItem title="base.html - Base Layout" defaultOpen>
              <CodeBlock
                code={`<!DOCTYPE html>
<html lang="{{ site.language }}" class="{% if theme.features.darkMode %}dark{% endif %}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{% block title %}{{ page.title }} | {{ site.name }}{% endblock %}</title>

  <!-- SEO Meta Tags -->
  <meta name="description" content="{{ page.meta_description | default(value=site.description) }}">
  {% if page.canonical_url %}
  <link rel="canonical" href="{{ page.canonical_url }}">
  {% endif %}

  <!-- Theme Colors from theme.json -->
  <style>
    :root {
      --color-primary: {{ theme.colors.primary }};
      --color-primary-light: {{ theme.colors.primary_light }};
      --color-primary-dark: {{ theme.colors.primary_dark }};
      --color-secondary: {{ theme.colors.secondary }};
      --color-background: {{ theme.colors.background }};
      --color-surface: {{ theme.colors.surface }};
      --color-text: {{ theme.colors.text }};
      --color-text-muted: {{ theme.colors.text_muted }};
      --font-heading: {{ theme.fonts.heading }}, sans-serif;
      --font-body: {{ theme.fonts.body }}, sans-serif;
      --font-mono: {{ theme.fonts.mono }}, monospace;
    }
  </style>

  <!-- Theme Stylesheets -->
  <link rel="stylesheet" href="{{ theme_url }}/assets/css/style.css">
  {% block head %}{% endblock %}
</head>
<body class="bg-[var(--color-background)] text-[var(--color-text)]">
  {% include "partials/header.html" %}

  <main>
    {% block content %}{% endblock %}
  </main>

  {% include "partials/footer.html" %}

  <!-- Theme Scripts -->
  <script src="{{ theme_url }}/assets/js/main.js"></script>
  {% block scripts %}{% endblock %}
</body>
</html>`}
                language="html"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="post.html - Single Post Template">
              <CodeBlock
                code={`{% extends "base.html" %}

{% block title %}{{ post.title }} | {{ site.name }}{% endblock %}

{% block content %}
<article class="max-w-4xl mx-auto px-4 py-12">
  <header class="mb-8">
    <h1 class="text-4xl font-bold font-[var(--font-heading)] mb-4">
      {{ post.title }}
    </h1>

    <div class="flex items-center gap-4 text-[var(--color-text-muted)]">
      <span>By {{ post.author.name }}</span>
      <span>•</span>
      <time datetime="{{ post.published_at | date(format='%Y-%m-%d') }}">
        {{ post.published_at | date(format='%B %d, %Y') }}
      </time>
      <span>•</span>
      <span>{{ post.reading_time }} min read</span>
    </div>

    {% if post.categories %}
    <div class="flex gap-2 mt-4">
      {% for category in post.categories %}
      <a href="/category/{{ category.slug }}"
         class="px-3 py-1 bg-[var(--color-surface)] rounded-full text-sm">
        {{ category.name }}
      </a>
      {% endfor %}
    </div>
    {% endif %}
  </header>

  {% if post.featured_image %}
  <img src="{{ post.featured_image }}"
       alt="{{ post.featured_image_alt }}"
       class="w-full rounded-xl mb-8">
  {% endif %}

  <div class="prose prose-lg dark:prose-invert max-w-none">
    {{ post.content | safe }}
  </div>

  {% if post.tags %}
  <div class="mt-12 pt-8 border-t border-[var(--color-border)]">
    <h3 class="text-lg font-semibold mb-4">Tags</h3>
    <div class="flex flex-wrap gap-2">
      {% for tag in post.tags %}
      <a href="/tag/{{ tag.slug }}"
         class="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm">
        {{ tag.name }}
      </a>
      {% endfor %}
    </div>
  </div>
  {% endif %}

  {% include "partials/comments.html" %}
</article>
{% endblock %}`}
                language="html"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="partials/header.html - Header Partial">
              <CodeBlock
                code={`<header class="{% if theme.features.stickyHeader %}sticky top-0 z-50{% endif %}
               bg-[var(--color-surface)] border-b border-[var(--color-border)]">
  <nav class="max-w-7xl mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2">
        <img src="{{ theme_url }}/assets/images/logo.svg"
             alt="{{ site.name }}"
             class="h-8 w-auto">
        <span class="font-bold text-xl font-[var(--font-heading)]">
          {{ site.name }}
        </span>
      </a>

      <!-- Navigation -->
      <ul class="hidden md:flex items-center gap-6">
        {% for item in navigation.primary %}
        <li>
          <a href="{{ item.url }}"
             class="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
            {{ item.label }}
          </a>
        </li>
        {% endfor %}
      </ul>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        {% if theme.features.darkMode %}
        <button id="theme-toggle" class="p-2 rounded-lg hover:bg-[var(--color-surface-light)]">
          <span class="dark:hidden">🌙</span>
          <span class="hidden dark:inline">☀️</span>
        </button>
        {% endif %}

        <a href="/contact"
           class="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg">
          Contact
        </a>
      </div>
    </div>
  </nav>
</header>`}
                language="html"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="widgets/hero.html - Hero Widget">
              <CodeBlock
                code={`{# Hero Section Widget #}
{# Available variables: widget.title, widget.subtitle, widget.cta_text, widget.cta_url, widget.background_image #}

<section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
  {% if widget.background_image %}
  <div class="absolute inset-0">
    <img src="{{ widget.background_image }}"
         alt=""
         class="w-full h-full object-cover opacity-20">
  </div>
  {% endif %}

  {% if theme.features.particleBackground %}
  <div id="particles" class="absolute inset-0"></div>
  {% endif %}

  <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
    <h1 class="text-5xl md:text-7xl font-bold font-[var(--font-heading)] mb-6
               {% if theme.features.gradientText %}
               bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)]
               bg-clip-text text-transparent
               {% endif %}">
      {{ widget.title }}
    </h1>

    <p class="text-xl md:text-2xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
      {{ widget.subtitle }}
    </p>

    {% if widget.cta_text %}
    <a href="{{ widget.cta_url }}"
       class="inline-flex items-center gap-2 px-8 py-4
              bg-[var(--color-primary)] text-white rounded-xl
              font-semibold text-lg
              {% if theme.features.glowEffects %}
              shadow-lg shadow-[var(--color-glow)]
              {% endif %}
              hover:bg-[var(--color-primary-light)] transition-all">
      {{ widget.cta_text }}
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </a>
    {% endif %}
  </div>
</section>`}
                language="html"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Packaging */}
        <section className="mb-12">
          <h2 id="packaging" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Packaging Your Theme</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Use the Rustpress CLI to package your theme for distribution.
          </p>

          <CodeBlock
            code={`# Validate theme structure and theme.json
rustpress theme:validate my-theme

# Run theme tests
rustpress theme:test my-theme

# Generate theme screenshot (1200x900)
rustpress theme:screenshot my-theme

# Package theme for distribution
rustpress theme:package my-theme

# Output: my-theme-1.0.0.zip`}
            language="bash"
            showLineNumbers={false}
          />

          <div className="not-prose mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Package Contents</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              The generated package includes:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">theme.json manifest</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">All template files</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Compiled and minified assets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Theme screenshot preview</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Language files</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Publishing */}
        <section className="mb-12">
          <h2 id="publishing" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Publishing</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Share your theme through the Rustpress Theme Directory or distribute via GitHub.
          </p>

          <Accordion>
            <AccordionItem title="Rustpress Theme Directory" defaultOpen>
              <CodeBlock
                code={`# Submit your theme for review
rustpress theme:submit my-theme

# Check submission status
rustpress theme:status my-theme

# After approval, publish updates
rustpress theme:publish my-theme --version 1.1.0

# Unpublish a theme
rustpress theme:unpublish my-theme`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="GitHub Distribution">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Host your theme on GitHub for direct installation:
              </p>
              <CodeBlock
                code={`# Users can install directly from GitHub
rustpress theme:install github:username/my-awesome-theme

# Or from a specific release
rustpress theme:install github:username/my-awesome-theme@v1.0.0`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="GitHub Actions Release Workflow">
              <CodeBlock
                code={`# .github/workflows/release.yml
name: Release Theme

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Rustpress CLI
        run: cargo install rustpress-cli

      - name: Validate Theme
        run: rustpress theme:validate .

      - name: Run Tests
        run: rustpress theme:test .

      - name: Package Theme
        run: rustpress theme:package . --output dist/

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: dist/*.zip
          generate_release_notes: true`}
                language="yaml"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 id="best-practices" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Best Practices</h2>

          <div className="not-prose grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Do</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Include a high-quality screenshot (1200x900)</li>
                <li>Write clear documentation in README.md</li>
                <li>Use semantic versioning for releases</li>
                <li>Test on multiple screen sizes</li>
                <li>Support both dark and light modes</li>
                <li>Optimize images and assets for performance</li>
                <li>Include translation-ready strings</li>
                <li>Follow Rustpress naming conventions</li>
              </ul>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Package className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Don't</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>Include development files (.git, node_modules)</li>
                <li>Hard-code URLs or site-specific content</li>
                <li>Overwrite core Rustpress templates</li>
                <li>Include large unoptimized media files</li>
                <li>Use inline styles for theme colors</li>
                <li>Forget to test with sample content</li>
                <li>Ship without testing AI features</li>
                <li>Ignore accessibility (WCAG) guidelines</li>
              </ul>
            </div>
          </div>

          <div className="not-prose mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Theme Directory Guidelines</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Themes submitted to the Rustpress Theme Directory must pass automated validation,
                  include proper licensing, and meet accessibility standards. Review times typically
                  take 2-5 business days. Premium themes with extended support are welcome.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/themes/testing" className="text-gray-600 hover:text-rust-600">
            ← Testing Themes
          </Link>
          <Link to="/docs/plugins/basics" className="flex items-center gap-2 text-rust-600">
            Plugin Development <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
