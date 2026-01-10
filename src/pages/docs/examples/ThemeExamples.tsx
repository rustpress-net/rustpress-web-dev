import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Eye, Palette, Layout, Moon, ShoppingCart } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodePlayground } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const blogThemeCode = `{% extends "base.html" %}

{% block content %}
<main class="blog-container">
  <header class="blog-header">
    <h1>{{ site.title }}</h1>
    <nav class="main-nav">
      {% for item in menu.primary %}
        <a href="{{ item.url }}" class="{{ item.active ? 'active' : '' }}">
          {{ item.title }}
        </a>
      {% endfor %}
    </nav>
  </header>

  <div class="posts-grid">
    {% for post in posts %}
    <article class="post-card">
      {% if post.featured_image %}
      <div class="post-image">
        <img src="{{ post.featured_image | resize(400, 300) }}"
             alt="{{ post.title }}"
             loading="lazy">
      </div>
      {% endif %}

      <div class="post-content">
        <div class="post-meta">
          <time datetime="{{ post.date | date('Y-m-d') }}">
            {{ post.date | date("F j, Y") }}
          </time>
          <span class="reading-time">{{ post.content | reading_time }}</span>
        </div>

        <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
        <p class="excerpt">{{ post.excerpt | truncate(150) }}</p>

        <div class="post-tags">
          {% for tag in post.tags %}
          <a href="{{ tag.url }}" class="tag">{{ tag.name }}</a>
          {% endfor %}
        </div>
      </div>
    </article>
    {% endfor %}
  </div>

  {{ pagination() }}
</main>
{% endblock %}`;

const portfolioThemeCode = `{% extends "base.html" %}

{% block content %}
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">
      {{ site.tagline | split(' ') | map(word => '<span>' ~ word ~ '</span>') | join('') | safe }}
    </h1>
    <p class="hero-subtitle">{{ site.description }}</p>
    <div class="hero-cta">
      <a href="#projects" class="btn btn-primary">View My Work</a>
      <a href="/contact" class="btn btn-outline">Get in Touch</a>
    </div>
  </div>
</section>

<section id="projects" class="projects-section">
  <h2>Featured Projects</h2>

  <div class="projects-grid">
    {% for project in posts | filter(p => p.type == 'project') | slice(0, 6) %}
    <article class="project-card" data-category="{{ project.category }}">
      <div class="project-image">
        <img src="{{ project.featured_image }}" alt="{{ project.title }}">
        <div class="project-overlay">
          <a href="{{ project.url }}" class="btn">View Project</a>
        </div>
      </div>
      <div class="project-info">
        <span class="category">{{ project.category }}</span>
        <h3>{{ project.title }}</h3>
        <p>{{ project.excerpt }}</p>
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="skills-section">
  <h2>Technologies I Work With</h2>
  <div class="skills-grid">
    {% for skill in site.skills %}
    <div class="skill-item">
      <img src="{{ skill.icon }}" alt="{{ skill.name }}">
      <span>{{ skill.name }}</span>
    </div>
    {% endfor %}
  </div>
</section>
{% endblock %}`;

const docsThemeCode = `{% extends "base.html" %}

{% block content %}
<div class="docs-layout">
  <!-- Sidebar Navigation -->
  <aside class="docs-sidebar">
    <div class="sidebar-header">
      <a href="/" class="logo">{{ site.title }}</a>
      <button class="theme-toggle" onclick="toggleDarkMode()">
        <span class="icon-sun"></span>
        <span class="icon-moon"></span>
      </button>
    </div>

    <nav class="docs-nav">
      {% for section in docs_menu %}
      <div class="nav-section">
        <h3>{{ section.title }}</h3>
        <ul>
          {% for item in section.items %}
          <li class="{{ current_url == item.url ? 'active' : '' }}">
            <a href="{{ item.url }}">{{ item.title }}</a>
          </li>
          {% endfor %}
        </ul>
      </div>
      {% endfor %}
    </nav>
  </aside>

  <!-- Main Content -->
  <main class="docs-content">
    <article class="prose">
      <nav class="breadcrumb">
        {% for crumb in breadcrumbs %}
        <a href="{{ crumb.url }}">{{ crumb.title }}</a>
        {% if not loop.last %}<span>/</span>{% endif %}
        {% endfor %}
      </nav>

      <h1>{{ post.title }}</h1>

      {{ post.content | safe }}

      <footer class="doc-footer">
        <div class="nav-links">
          {% if prev_doc %}
          <a href="{{ prev_doc.url }}" class="prev">
            <span>Previous</span>
            {{ prev_doc.title }}
          </a>
          {% endif %}
          {% if next_doc %}
          <a href="{{ next_doc.url }}" class="next">
            <span>Next</span>
            {{ next_doc.title }}
          </a>
          {% endif %}
        </div>
      </footer>
    </article>

    <!-- Table of Contents -->
    <aside class="toc">
      <h4>On this page</h4>
      {{ toc(post.content) }}
    </aside>
  </main>
</div>
{% endblock %}`;

const ecommerceThemeCode = `{% extends "base.html" %}

{% block content %}
<div class="shop-container">
  <!-- Product Grid -->
  <section class="products-section">
    <div class="products-header">
      <h1>{{ category.name | default('All Products') }}</h1>

      <div class="filters">
        <select name="sort" onchange="sortProducts(this.value)">
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>

    <div class="products-grid">
      {% for product in products %}
      <article class="product-card">
        <div class="product-image">
          <img src="{{ product.images[0] | resize(300, 300) }}"
               alt="{{ product.name }}">
          {% if product.sale_price %}
          <span class="badge sale">Sale</span>
          {% endif %}

          <div class="quick-actions">
            <button onclick="quickView({{ product.id }})" title="Quick View">
              <svg><!-- eye icon --></svg>
            </button>
            <button onclick="addToWishlist({{ product.id }})" title="Add to Wishlist">
              <svg><!-- heart icon --></svg>
            </button>
          </div>
        </div>

        <div class="product-info">
          <span class="category">{{ product.category }}</span>
          <h3><a href="{{ product.url }}">{{ product.name }}</a></h3>

          <div class="price">
            {% if product.sale_price %}
            <span class="original">\${{ product.price | number_format(2) }}</span>
            <span class="current">\${{ product.sale_price | number_format(2) }}</span>
            {% else %}
            <span class="current">\${{ product.price | number_format(2) }}</span>
            {% endif %}
          </div>

          <button class="add-to-cart" onclick="addToCart({{ product.id }})">
            Add to Cart
          </button>
        </div>
      </article>
      {% endfor %}
    </div>

    {{ pagination() }}
  </section>
</div>
{% endblock %}`;

const tocItems = [
  { id: 'available-themes', title: 'Available Themes', level: 2 },
  { id: 'blog-theme', title: 'Blog Theme', level: 2 },
  { id: 'portfolio-theme', title: 'Portfolio Theme', level: 2 },
  { id: 'more-examples', title: 'More Examples', level: 2 },
];

const themeCards = [
  {
    title: 'Blog Theme',
    description: 'A clean, minimal blog theme with dark mode support, reading time estimates, and responsive design.',
    icon: <Layout className="w-6 h-6" />,
    features: ['Dark Mode', 'Reading Time', 'Responsive', 'SEO Ready'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Portfolio Theme',
    description: 'Showcase your work with this modern portfolio theme featuring smooth animations and project galleries.',
    icon: <Palette className="w-6 h-6" />,
    features: ['Animations', 'Project Gallery', 'Contact Form', 'Skills Grid'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Documentation Theme',
    description: 'Perfect for technical documentation sites with sidebar navigation, search, and syntax highlighting.',
    icon: <Moon className="w-6 h-6" />,
    features: ['Sidebar Nav', 'Search', 'Syntax Highlighting', 'TOC'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'E-commerce Theme',
    description: 'A complete storefront theme with product grids, cart functionality, and checkout flow.',
    icon: <ShoppingCart className="w-6 h-6" />,
    features: ['Product Grid', 'Shopping Cart', 'Filters', 'Quick View'],
    color: 'from-orange-500 to-red-500',
  },
];

export function ThemeExamples() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Examples</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Theme Examples</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Real-world theme examples with complete source code. Download, customize, and use in your projects.
          </p>
        </div>

        {/* Available Themes Grid */}
        <section className="mb-12">
          <h2 id="available-themes" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Available Themes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {themeCards.map((theme, index) => (
              <motion.div
                key={theme.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${theme.color}`} />

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.color} flex items-center justify-center text-white`}>
                      {theme.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{theme.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{theme.description}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {theme.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r ${theme.color} text-white font-medium transition-all hover:shadow-lg`}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </motion.button>
                    <motion.a
                      href="https://github.com/rust-press"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Blog Theme Example */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="blog-theme" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Blog Theme Template
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A complete blog archive template with post cards, pagination, and responsive grid layout.
            </p>
            <CodePlayground
              initialCode={blogThemeCode}
              language="html"
              title="templates/archive.html"
              description="Blog archive template with post grid"
            />
          </motion.div>
        </section>

        {/* Portfolio Theme Example */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="portfolio-theme" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Portfolio Theme Template
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A stunning portfolio layout with hero section, projects grid, and skills showcase.
            </p>
            <CodePlayground
              initialCode={portfolioThemeCode}
              language="html"
              title="templates/home.html"
              description="Portfolio homepage template"
            />
          </motion.div>
        </section>

        {/* More Examples Accordion */}
        <section className="mb-12">
          <h2 id="more-examples" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            More Examples
          </h2>
          <Accordion>
            <AccordionItem
              title="Documentation Theme"
              icon={<Moon className="w-5 h-5" />}
            >
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                A full-featured documentation layout with sidebar navigation, breadcrumbs, and table of contents.
              </p>
              <CodePlayground
                initialCode={docsThemeCode}
                language="html"
                title="templates/docs.html"
                description="Documentation page template"
              />
            </AccordionItem>

            <AccordionItem
              title="E-commerce Theme"
              icon={<ShoppingCart className="w-5 h-5" />}
            >
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                A complete storefront template with product cards, filters, and quick view functionality.
              </p>
              <CodePlayground
                initialCode={ecommerceThemeCode}
                language="html"
                title="templates/shop.html"
                description="E-commerce shop page template"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rust-500 via-orange-500 to-amber-500 p-8 text-white"
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Ready to Build Your Theme?</h3>
              <p className="text-white/80 mb-6 max-w-xl">
                Start with one of our templates or create your own from scratch. Our comprehensive documentation
                will guide you through every step.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/docs/themes/basics"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rust-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Start Building
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://github.com/rust-press/themes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  Browse on GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/api/types" className="text-gray-600 hover:text-rust-600">← Type Definitions</Link>
          <Link to="/docs/examples/plugins" className="flex items-center gap-2 text-rust-600">
            Plugin Examples <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
