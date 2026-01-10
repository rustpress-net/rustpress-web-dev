import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Terminal, Palette, Puzzle, Zap } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodePlayground } from '../../../components/code';
import { LiveApiTester, Accordion, AccordionItem, TypewriterCode } from '../../../components/ui';

const exampleCode = `use rustpress::prelude::*;

// Example: Custom filter that adds reading time
fn reading_time_filter(content: String) -> String {
    let words = content.split_whitespace().count();
    let minutes = (words / 200).max(1);
    format!("{} min read", minutes)
}

// Register the filter
app.add_filter("reading_time", reading_time_filter);

// Use in template:
// {{ post.content | reading_time }}`;

const themeExample = `{% extends "index.html" %}

{% block content %}
<article class="post">
  <header class="post-header">
    <h1>{{ post.title }}</h1>
    <time datetime="{{ post.date | date('Y-m-d') }}">
      {{ post.date | date('F j, Y') }}
    </time>
    <span class="reading-time">
      {{ post.content | reading_time }}
    </span>
  </header>

  <div class="post-content">
    {{ post.content | safe }}
  </div>

  {% if post.tags %}
  <footer class="post-tags">
    {% for tag in post.tags %}
    <a href="{{ tag.url }}" class="tag">{{ tag.name }}</a>
    {% endfor %}
  </footer>
  {% endif %}
</article>
{% endblock %}`;

const pluginExample = `use rustpress::prelude::*;

#[plugin]
pub struct AnalyticsPlugin {
    tracking_id: String,
}

impl Plugin for AnalyticsPlugin {
    fn name(&self) -> &str {
        "Analytics"
    }

    fn version(&self) -> &str {
        "1.0.0"
    }

    fn init(&self, app: &mut App) {
        // Inject tracking script in footer
        app.add_action("footer", |ctx| {
            println!(r#"
                <script>
                    window.analytics = window.analytics || [];
                    window.analytics.push(['init', '{}']);
                </script>
            "#, self.tracking_id);
        });

        // Track page views
        app.add_action("page_view", |ctx| {
            let path = ctx.request.path();
            println!("Page view: {}", path);
        });
    }
}`;

const cliExample = `# Create a new Rustpress project
rustpress new my-blog --template blog

# Navigate to the project
cd my-blog

# Start the development server
rustpress dev --port 3000 --open

# Create a new post
rustpress content:create post "My First Post"

# Build for production
rustpress build --release

# Deploy to production
rustpress deploy --target production`;

const tocItems = [
  { id: 'code-playground', title: 'Code Playground', level: 2 },
  { id: 'api-tester', title: 'API Tester', level: 2 },
  { id: 'examples', title: 'Code Examples', level: 2 },
  { id: 'cli-demo', title: 'CLI Demo', level: 2 },
];

export function Playground() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Examples</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Interactive Playground</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Experiment with Rustpress code, test APIs, and explore examples in an interactive environment.
          </p>
        </div>

        {/* Code Playground Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="code-playground" className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Code className="w-6 h-6 text-rust-500" />
              Code Playground
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Edit the code below and click "Run" to see the output. This sandbox environment lets you experiment with Rustpress concepts.
            </p>
            <CodePlayground
              initialCode={exampleCode}
              language="rust"
              title="Rustpress Playground"
              description="Write and test Rustpress code"
            />
          </motion.div>
        </section>

        {/* API Tester Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="api-tester" className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Zap className="w-6 h-6 text-rust-500" />
              API Tester
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Test Rustpress REST API endpoints with our interactive API playground. Select an endpoint, configure parameters, and see the response.
            </p>
            <LiveApiTester />
          </motion.div>
        </section>

        {/* Code Examples Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="examples" className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Puzzle className="w-6 h-6 text-rust-500" />
              Code Examples
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Explore complete code examples for themes, plugins, and more. Click to expand each example.
            </p>

            <Accordion>
              <AccordionItem
                title="Theme Template Example"
                icon={<Palette className="w-5 h-5" />}
                defaultOpen
              >
                <p className="mb-4">A complete blog post template with metadata, content, and tags:</p>
                <CodePlayground
                  initialCode={themeExample}
                  language="html"
                  title="single.html"
                  description="Blog post template"
                />
              </AccordionItem>

              <AccordionItem
                title="Plugin Example"
                icon={<Puzzle className="w-5 h-5" />}
              >
                <p className="mb-4">A complete analytics plugin that tracks page views:</p>
                <CodePlayground
                  initialCode={pluginExample}
                  language="rust"
                  title="analytics/src/lib.rs"
                  description="Analytics plugin implementation"
                />
              </AccordionItem>

              <AccordionItem
                title="Custom Hook Example"
                icon={<Code className="w-5 h-5" />}
              >
                <p className="mb-4">Add custom functionality on specific events:</p>
                <CodePlayground
                  initialCode={`use rustpress::prelude::*;

// Hook into the post save event
app.add_action("post_saved", |ctx| {
    let post = ctx.get::<Post>("post").unwrap();

    // Send notification
    notify_subscribers(&post);

    // Update search index
    search::index_post(&post);

    // Clear caches
    cache::invalidate("posts");
    cache::invalidate(&format!("post:{}", post.id));
});

fn notify_subscribers(post: &Post) {
    let subscribers = get_subscribers();
    for subscriber in subscribers {
        email::send(
            &subscriber.email,
            &format!("New post: {}", post.title),
            &post.excerpt,
        );
    }
}`}
                  language="rust"
                  title="hooks/notifications.rs"
                  description="Post notification hook"
                />
              </AccordionItem>

              <AccordionItem
                title="REST API Handler"
                icon={<Zap className="w-5 h-5" />}
              >
                <p className="mb-4">Create custom API endpoints with authentication:</p>
                <CodePlayground
                  initialCode={`use rustpress::prelude::*;

// Register a custom API endpoint
app.register_route("/api/v1/stats", Method::GET, |req| {
    // Require authentication
    let user = req.require_auth()?;

    // Check permissions
    if !user.can("view_stats") {
        return Err(Error::Forbidden);
    }

    // Fetch statistics
    let stats = Stats {
        total_posts: Post::count()?,
        total_users: User::count()?,
        total_views: Analytics::total_views()?,
        popular_posts: Post::most_viewed(10)?,
    };

    Ok(Json(stats))
});

#[derive(Serialize)]
struct Stats {
    total_posts: u64,
    total_users: u64,
    total_views: u64,
    popular_posts: Vec<Post>,
}`}
                  language="rust"
                  title="api/stats.rs"
                  description="Custom statistics API endpoint"
                />
              </AccordionItem>
            </Accordion>
          </motion.div>
        </section>

        {/* CLI Demo Section */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="cli-demo" className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Terminal className="w-6 h-6 text-rust-500" />
              CLI Demo
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Watch common CLI workflows in action with our animated terminal demo.
            </p>
            <TypewriterCode code={cliExample} language="bash" speed={30} />
          </motion.div>
        </section>

        {/* Quick Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">More Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                to="/docs/themes/basics"
                className="block p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-rust-300 dark:hover:border-rust-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Palette className="w-5 h-5 text-rust-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Theme Development</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Learn how to create beautiful themes</p>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                to="/docs/plugins/basics"
                className="block p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-rust-300 dark:hover:border-rust-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Puzzle className="w-5 h-5 text-rust-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Plugin Development</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Extend Rustpress with plugins</p>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                to="/docs/api/rest-endpoints"
                className="block p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-rust-300 dark:hover:border-rust-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-rust-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">REST API</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Complete API documentation</p>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                to="/docs/getting-started/cli-commands"
                className="block p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-rust-300 dark:hover:border-rust-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Terminal className="w-5 h-5 text-rust-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">CLI Reference</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">All available CLI commands</p>
              </Link>
            </motion.div>
          </div>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/examples/api" className="text-gray-600 hover:text-rust-600">← API Examples</Link>
          <Link to="/docs/getting-started/introduction" className="flex items-center gap-2 text-rust-600">Back to Docs</Link>
        </div>
      </article>
    </DocLayout>
  );
}
