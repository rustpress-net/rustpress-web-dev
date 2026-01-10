import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Puzzle, Search, BarChart3, Bell, Zap } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodePlayground } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const seoPluginCode = `use rustpress::prelude::*;

#[plugin]
pub struct SeoPlugin {
    default_title_template: String,
    site_name: String,
}

impl Plugin for SeoPlugin {
    fn name(&self) -> &str { "SEO Optimizer" }
    fn version(&self) -> &str { "1.0.0" }

    fn init(&self, app: &mut App) {
        // Add meta tags to document head
        app.add_action("head", |ctx| {
            let post = ctx.get::<Post>("post");
            let site = ctx.get::<Site>("site").unwrap();

            if let Some(post) = post {
                // Open Graph tags
                println!(r#"<meta property="og:title" content="{}">"#, post.title);
                println!(r#"<meta property="og:description" content="{}">"#,
                    post.excerpt.as_deref().unwrap_or(""));
                println!(r#"<meta property="og:type" content="article">"#);
                println!(r#"<meta property="og:url" content="{}{}">"#,
                    site.url, post.slug);

                if let Some(image) = &post.featured_image {
                    println!(r#"<meta property="og:image" content="{}">"#, image);
                }

                // Twitter Card
                println!(r#"<meta name="twitter:card" content="summary_large_image">"#);
                println!(r#"<meta name="twitter:title" content="{}">"#, post.title);

                // Schema.org JSON-LD
                let schema = serde_json::json!({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": post.title,
                    "datePublished": post.created_at,
                    "author": {
                        "@type": "Person",
                        "name": post.author.name
                    }
                });
                println!(r#"<script type="application/ld+json">{}</script>"#,
                    serde_json::to_string(&schema).unwrap());
            }
        });

        // Generate sitemap.xml
        app.register_route("/sitemap.xml", Method::GET, |_req| {
            let posts = Post::query()
                .status(PostStatus::Published)
                .order_by("created_at", "desc")
                .all()?;

            let mut xml = String::from(r#"<?xml version="1.0" encoding="UTF-8"?>"#);
            xml.push_str(r#"<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">"#);

            for post in posts {
                xml.push_str(&format!(r#"
                    <url>
                        <loc>{}</loc>
                        <lastmod>{}</lastmod>
                        <changefreq>weekly</changefreq>
                    </url>"#, post.url, post.updated_at));
            }
            xml.push_str("</urlset>");

            Ok(Response::xml(xml))
        });

        // Generate robots.txt
        app.register_route("/robots.txt", Method::GET, |_req| {
            Ok(Response::text(
                "User-agent: *\\nAllow: /\\nSitemap: /sitemap.xml"
            ))
        });
    }
}`;

const analyticsPluginCode = `use rustpress::prelude::*;
use std::collections::HashMap;

#[plugin]
pub struct AnalyticsPlugin {
    tracking_id: String,
    anonymize_ip: bool,
}

impl Plugin for AnalyticsPlugin {
    fn name(&self) -> &str { "Analytics Dashboard" }
    fn version(&self) -> &str { "2.0.0" }

    fn init(&self, app: &mut App) {
        // Create analytics database table
        app.add_action("install", |_ctx| {
            db::create_table("analytics_pageviews", |table| {
                table.id();
                table.string("path", 255);
                table.string("referrer", 255).nullable();
                table.string("user_agent", 255).nullable();
                table.string("ip_hash", 64);
                table.string("country", 2).nullable();
                table.timestamp("created_at");
            })?;
            Ok(())
        });

        // Track page views
        app.add_action("page_view", |ctx| {
            let request = ctx.get::<Request>("request").unwrap();

            let ip_hash = if self.anonymize_ip {
                hash_ip(&request.ip())
            } else {
                request.ip().to_string()
            };

            db::insert("analytics_pageviews", HashMap::from([
                ("path", request.path()),
                ("referrer", request.header("Referer").unwrap_or("")),
                ("user_agent", request.header("User-Agent").unwrap_or("")),
                ("ip_hash", &ip_hash),
                ("country", &get_country_from_ip(&request.ip())),
            ]))?;

            Ok(())
        });

        // Add admin dashboard page
        app.add_admin_page("Analytics", "/admin/analytics", |_req| {
            let stats = get_analytics_stats()?;

            render("admin/analytics", context! {
                total_views: stats.total_views,
                unique_visitors: stats.unique_visitors,
                top_pages: stats.top_pages,
                referrers: stats.top_referrers,
                countries: stats.countries,
            })
        });

        // API endpoint for charts
        app.register_route("/api/v1/analytics/chart", Method::GET, |req| {
            req.require_capability("view_analytics")?;

            let period = req.query("period").unwrap_or("7d");
            let data = get_chart_data(period)?;

            Ok(Json(data))
        });
    }
}

fn get_analytics_stats() -> Result<AnalyticsStats, Error> {
    // Query aggregated statistics
    let total_views = db::count("analytics_pageviews")?;

    let unique_visitors = db::query(
        "SELECT COUNT(DISTINCT ip_hash) FROM analytics_pageviews"
    )?.first()?;

    let top_pages = db::query(
        "SELECT path, COUNT(*) as views FROM analytics_pageviews
         GROUP BY path ORDER BY views DESC LIMIT 10"
    )?.all()?;

    Ok(AnalyticsStats { total_views, unique_visitors, top_pages, .. })
}`;

const cachePluginCode = `use rustpress::prelude::*;
use std::time::Duration;

#[plugin]
pub struct CachePlugin {
    driver: CacheDriver,
    default_ttl: Duration,
}

#[derive(Clone)]
pub enum CacheDriver {
    Memory,
    Redis { url: String },
    File { path: String },
}

impl Plugin for CachePlugin {
    fn name(&self) -> &str { "Advanced Cache" }
    fn version(&self) -> &str { "1.5.0" }

    fn init(&self, app: &mut App) {
        let cache = match &self.driver {
            CacheDriver::Memory => MemoryCache::new(),
            CacheDriver::Redis { url } => RedisCache::connect(url),
            CacheDriver::File { path } => FileCache::new(path),
        };

        // Register cache instance globally
        app.singleton(cache);

        // Cache full page responses
        app.add_filter("response", |response: Response, ctx| {
            let request = ctx.get::<Request>("request").unwrap();

            // Only cache GET requests
            if request.method() != Method::GET {
                return response;
            }

            // Don't cache admin pages
            if request.path().starts_with("/admin") {
                return response;
            }

            let cache_key = format!("page:{}", request.path());
            let cache = ctx.get::<Cache>("cache").unwrap();

            cache.set(&cache_key, &response, self.default_ttl)?;

            // Add cache headers
            response.header("X-Cache", "MISS")
                   .header("Cache-Control", "public, max-age=3600")
        });

        // Check cache before processing request
        app.add_filter("request", |request: Request, ctx| {
            if request.method() != Method::GET {
                return Ok(request);
            }

            let cache_key = format!("page:{}", request.path());
            let cache = ctx.get::<Cache>("cache").unwrap();

            if let Some(cached) = cache.get::<Response>(&cache_key)? {
                return Err(EarlyResponse(
                    cached.header("X-Cache", "HIT")
                ));
            }

            Ok(request)
        });

        // Clear cache on content updates
        app.add_action("post_saved", |ctx| {
            let post = ctx.get::<Post>("post").unwrap();
            let cache = ctx.get::<Cache>("cache").unwrap();

            // Clear specific post cache
            cache.delete(&format!("page:{}", post.url))?;

            // Clear listing pages
            cache.delete_pattern("page:/blog*")?;
            cache.delete_pattern("page:/category*")?;

            Ok(())
        });

        // Admin cache controls
        app.add_admin_page("Cache", "/admin/cache", |req| {
            if req.method() == Method::POST {
                let cache = req.get::<Cache>("cache").unwrap();
                cache.flush()?;
                return redirect("/admin/cache?cleared=1");
            }

            let cache = req.get::<Cache>("cache").unwrap();
            render("admin/cache", context! {
                stats: cache.stats()?,
                keys: cache.keys("page:*")?,
            })
        });
    }
}`;

const notificationPluginCode = `use rustpress::prelude::*;

#[plugin]
pub struct NotificationPlugin {
    smtp_config: SmtpConfig,
    telegram_token: Option<String>,
    slack_webhook: Option<String>,
}

impl Plugin for NotificationPlugin {
    fn name(&self) -> &str { "Multi-Channel Notifications" }
    fn version(&self) -> &str { "1.0.0" }

    fn init(&self, app: &mut App) {
        // Notify on new comments
        app.add_action("comment_created", |ctx| {
            let comment = ctx.get::<Comment>("comment").unwrap();
            let post = Post::find(comment.post_id)?;

            // Email the post author
            self.send_email(
                &post.author.email,
                &format!("New comment on: {}", post.title),
                &format!(
                    "{} commented:\\n\\n{}\\n\\nView: {}",
                    comment.author_name,
                    comment.content,
                    post.admin_url()
                ),
            )?;

            // Telegram notification
            if let Some(token) = &self.telegram_token {
                self.send_telegram(
                    token,
                    &format!("💬 New comment on *{}*", post.title),
                )?;
            }

            // Slack notification
            if let Some(webhook) = &self.slack_webhook {
                self.send_slack(webhook, SlackMessage {
                    text: format!("New comment on {}", post.title),
                    attachments: vec![
                        SlackAttachment {
                            color: "#36a64f",
                            author_name: comment.author_name.clone(),
                            text: comment.content.clone(),
                            footer: format!("View comment: {}", comment.admin_url()),
                        }
                    ],
                })?;
            }

            Ok(())
        });

        // Notify admins on new user registration
        app.add_action("user_registered", |ctx| {
            let user = ctx.get::<User>("user").unwrap();
            let admins = User::query().role("administrator").all()?;

            for admin in admins {
                self.send_email(
                    &admin.email,
                    "New User Registration",
                    &format!(
                        "A new user has registered:\\n\\n\
                         Username: {}\\n\
                         Email: {}\\n\\n\
                         View users: /admin/users",
                        user.username, user.email
                    ),
                )?;
            }

            Ok(())
        });

        // Weekly digest
        app.add_cron("0 9 * * MON", |_ctx| {
            let stats = get_weekly_stats()?;
            let admins = User::query().role("administrator").all()?;

            for admin in admins {
                self.send_email(
                    &admin.email,
                    "Weekly Site Report",
                    &render_template("emails/weekly-digest", &stats)?,
                )?;
            }

            Ok(())
        });
    }

    fn send_email(&self, to: &str, subject: &str, body: &str) -> Result<(), Error> {
        let mailer = SmtpTransport::relay(&self.smtp_config.host)?
            .credentials(self.smtp_config.credentials())
            .build();

        let email = Message::builder()
            .from(self.smtp_config.from.parse()?)
            .to(to.parse()?)
            .subject(subject)
            .body(body.to_string())?;

        mailer.send(&email)?;
        Ok(())
    }
}`;

const tocItems = [
  { id: 'available-plugins', title: 'Available Plugins', level: 2 },
  { id: 'seo-plugin', title: 'SEO Plugin', level: 2 },
  { id: 'analytics-plugin', title: 'Analytics Plugin', level: 2 },
  { id: 'more-plugins', title: 'More Plugins', level: 2 },
];

const pluginCards = [
  {
    title: 'SEO Optimizer',
    description: 'Automatically adds meta tags, Open Graph, Twitter Cards, and generates sitemaps.',
    icon: <Search className="w-6 h-6" />,
    features: ['Meta Tags', 'Open Graph', 'Sitemap', 'Schema.org'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track page views, visitors, and get insights with a beautiful admin dashboard.',
    icon: <BarChart3 className="w-6 h-6" />,
    features: ['Page Views', 'Visitors', 'Charts', 'Export'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Advanced Cache',
    description: 'Speed up your site with intelligent caching using Redis, Memcached, or file cache.',
    icon: <Zap className="w-6 h-6" />,
    features: ['Page Cache', 'Redis', 'Auto-Invalidate', 'Admin UI'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Notifications',
    description: 'Multi-channel notifications via Email, Slack, Telegram, and Discord.',
    icon: <Bell className="w-6 h-6" />,
    features: ['Email', 'Slack', 'Telegram', 'Webhooks'],
    color: 'from-purple-500 to-pink-500',
  },
];

export function PluginExamples() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Examples</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Plugin Examples</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Production-ready plugin examples with complete source code. Learn by example and build your own.
          </p>
        </div>

        {/* Available Plugins Grid */}
        <section className="mb-12">
          <h2 id="available-plugins" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Available Plugins
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pluginCards.map((plugin, index) => (
              <motion.div
                key={plugin.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${plugin.color}`} />

                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plugin.color} flex items-center justify-center text-white`}>
                      {plugin.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plugin.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{plugin.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {plugin.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r ${plugin.color} text-white font-medium transition-all hover:shadow-lg`}
                    >
                      <Download className="w-4 h-4" />
                      Install Plugin
                    </motion.button>
                    <motion.a
                      href="https://github.com/rust-press/plugins"
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

        {/* SEO Plugin Example */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="seo-plugin" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              SEO Optimizer Plugin
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              A complete SEO plugin that adds meta tags, Open Graph tags, Twitter Cards, and generates sitemaps automatically.
            </p>
            <CodePlayground
              initialCode={seoPluginCode}
              language="rust"
              title="plugins/seo-optimizer/src/lib.rs"
              description="SEO plugin with meta tags and sitemap generation"
            />
          </motion.div>
        </section>

        {/* Analytics Plugin Example */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="analytics-plugin" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Analytics Dashboard Plugin
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Track page views, unique visitors, and view analytics in a beautiful admin dashboard.
            </p>
            <CodePlayground
              initialCode={analyticsPluginCode}
              language="rust"
              title="plugins/analytics/src/lib.rs"
              description="Analytics plugin with dashboard"
            />
          </motion.div>
        </section>

        {/* More Plugins Accordion */}
        <section className="mb-12">
          <h2 id="more-plugins" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            More Plugin Examples
          </h2>
          <Accordion>
            <AccordionItem
              title="Advanced Cache Plugin"
              icon={<Zap className="w-5 h-5" />}
            >
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Speed up your site with intelligent page caching. Supports Redis, file cache, and auto-invalidation on content updates.
              </p>
              <CodePlayground
                initialCode={cachePluginCode}
                language="rust"
                title="plugins/cache/src/lib.rs"
                description="Advanced caching plugin"
              />
            </AccordionItem>

            <AccordionItem
              title="Multi-Channel Notifications"
              icon={<Bell className="w-5 h-5" />}
            >
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Send notifications via Email, Slack, Telegram when important events happen on your site.
              </p>
              <CodePlayground
                initialCode={notificationPluginCode}
                language="rust"
                title="plugins/notifications/src/lib.rs"
                description="Multi-channel notification plugin"
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
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-8 text-white"
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Puzzle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Ready to Build Your Plugin?</h3>
                  <p className="text-white/80">Extend Rustpress with your own functionality</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 max-w-xl">
                Learn how to create plugins that add new features, integrate with external services,
                and customize every aspect of your Rustpress site.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/docs/plugins/basics"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Start Building
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://github.com/rust-press/plugins"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  Browse Plugins
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/examples/themes" className="text-gray-600 hover:text-rust-600">← Theme Examples</Link>
          <Link to="/docs/examples/api" className="flex items-center gap-2 text-rust-600">
            API Examples <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
