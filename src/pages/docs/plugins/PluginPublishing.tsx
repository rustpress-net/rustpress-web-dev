import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package, FileCode, FolderTree, CheckCircle, Github, Tag, BookOpen, AlertTriangle, Terminal, Upload } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'plugin-structure', title: 'Plugin Structure', level: 2 },
  { id: 'plugin-manifest', title: 'Plugin Manifest', level: 2 },
  { id: 'example-plugin', title: 'Example Plugin', level: 2 },
  { id: 'preparing', title: 'Preparing for Release', level: 2 },
  { id: 'publishing', title: 'Publishing', level: 2 },
  { id: 'versioning', title: 'Versioning', level: 2 },
  { id: 'best-practices', title: 'Best Practices', level: 2 },
];

export function PluginPublishing() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Publishing Plugins</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Share your plugin with the Rustpress community. Learn how to structure, package, and publish your plugins.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Rustpress plugins extend the core functionality of your CMS. Once you've built a plugin, you can share it
            with the community through the Rustpress Plugin Directory or distribute it via GitHub.
          </p>

          <div className="not-prose grid md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center"
            >
              <Package className="w-8 h-8 text-rust-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Package</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Bundle your plugin</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center"
            >
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Validate</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ensure quality</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center"
            >
              <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Publish</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Share with community</p>
            </motion.div>
          </div>
        </section>

        {/* Plugin Structure */}
        <section className="mb-12">
          <h2 id="plugin-structure" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Plugin Structure</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            A well-organized plugin follows this directory structure:
          </p>

          <div className="not-prose mb-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                <FolderTree className="w-5 h-5 text-rust-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">Plugin Directory Structure</span>
              </div>
              <pre className="text-sm text-gray-600 dark:text-gray-400 font-mono whitespace-pre">
{`my-awesome-plugin/
├── Cargo.toml              # Rust package manifest
├── plugin.toml             # Rustpress plugin manifest
├── README.md               # Documentation
├── LICENSE                 # License file
├── CHANGELOG.md            # Version history
├── src/
│   ├── lib.rs              # Plugin entry point
│   ├── hooks.rs            # Hook implementations
│   ├── filters.rs          # Filter implementations
│   ├── admin.rs            # Admin panel pages (optional)
│   ├── api.rs              # REST API endpoints (optional)
│   └── models.rs           # Database models (optional)
├── assets/
│   ├── css/
│   │   └── admin.css       # Admin styles
│   ├── js/
│   │   └── admin.js        # Admin scripts
│   └── images/
│       └── icon.svg        # Plugin icon
├── templates/
│   └── admin/
│       └── settings.html   # Admin templates
├── migrations/
│   └── 001_create_tables.sql  # Database migrations
└── tests/
    ├── integration_test.rs
    └── unit_test.rs`}
              </pre>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Cargo.toml</p>
            <CodeBlock
              code={`[package]
name = "my-awesome-plugin"
version = "1.0.0"
edition = "2021"
authors = ["Your Name <you@example.com>"]
description = "A brief description of what your plugin does"
license = "MIT"
repository = "https://github.com/yourusername/my-awesome-plugin"
keywords = ["rustpress", "plugin", "cms"]
categories = ["web-programming"]

[lib]
crate-type = ["cdylib"]

[dependencies]
rustpress-core = "0.5"
rustpress-macros = "0.5"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1.0", features = ["full"] }
tracing = "0.1"

[dev-dependencies]
rustpress-testing = "0.5"
tokio-test = "0.4"`}
              language="toml"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Plugin Manifest */}
        <section className="mb-12">
          <h2 id="plugin-manifest" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Plugin Manifest</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">plugin.toml</code> file contains metadata about your plugin:
          </p>

          <div className="mb-6">
            <CodeBlock
              code={`# plugin.toml - Rustpress Plugin Manifest

[plugin]
# Unique identifier (lowercase, hyphens allowed)
id = "my-awesome-plugin"

# Display name shown in admin panel
name = "My Awesome Plugin"

# Plugin version (semver)
version = "1.0.0"

# Brief description
description = "Adds awesome functionality to your Rustpress site"

# Author information
author = "Your Name"
author_uri = "https://yourwebsite.com"

# Plugin URLs
plugin_uri = "https://github.com/yourusername/my-awesome-plugin"

# License
license = "MIT"
license_uri = "https://opensource.org/licenses/MIT"

# Rustpress version requirements
min_rustpress_version = "1.0.0"

# Internationalization
text_domain = "my-awesome-plugin"
domain_path = "/languages"

# Multisite support
network = false

# Plugin capabilities (what the plugin can do)
[plugin.capabilities]
manage_options = true
add_shortcodes = false
add_widgets = true
add_admin_pages = true
add_rest_api = true
add_dashboard_widgets = true
manage_settings = true

# Admin pages configuration
[plugin.admin_pages]
[[plugin.admin_pages.pages]]
id = "my-plugin-dashboard"
title = "My Plugin Dashboard"
menu_title = "My Plugin"
capability = "manage_options"
icon = "chart-bar"
position = 30

[[plugin.admin_pages.pages]]
id = "my-plugin-settings"
title = "Settings"
menu_title = "Settings"
capability = "manage_options"
parent = "my-plugin-dashboard"

# Dashboard widgets
[plugin.dashboard_widgets]
[[plugin.dashboard_widgets.widgets]]
id = "my-plugin-stats-widget"
title = "My Plugin Stats"
description = "Quick overview of plugin statistics"
position = "normal"
priority = "high"

# Plugin settings (default values)
[plugin.settings]
enabled = true
cache_duration_minutes = 15
max_items = 100

# Hooks and filters
[plugin.hooks]
actions = [
    "init",
    "wp_head",
    "admin_enqueue_scripts",
    "template_redirect"
]
filters = [
    "the_content",
    "the_title"
]

# REST API configuration
[plugin.rest_api]
namespace = "my-plugin/v1"
endpoints = [
    "GET /stats",
    "GET /items",
    "POST /settings",
    "DELETE /cache"
]

# Scheduled tasks
[plugin.cron]
[[plugin.cron.jobs]]
hook = "my_plugin_daily_task"
schedule = "daily"
callback = "run_daily_task"

[[plugin.cron.jobs]]
hook = "my_plugin_cleanup"
schedule = "weekly"
callback = "cleanup_old_data"

# Database tables
[plugin.database]
tables = [
    "my_plugin_data",
    "my_plugin_cache",
    "my_plugin_logs"
]

# Asset files
[plugin.assets]
[[plugin.assets.scripts]]
handle = "my-plugin-admin"
src = "assets/js/admin.js"
deps = ["react"]
version = "1.0.0"
in_footer = true
enqueue = "admin"

[[plugin.assets.styles]]
handle = "my-plugin-admin-style"
src = "assets/css/admin.css"
deps = []
version = "1.0.0"
enqueue = "admin"

# Dependencies on other plugins (optional)
[dependencies]
other-plugin = { version = ">=1.0.0", optional = true }`}
              language="toml"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Example Plugin */}
        <section className="mb-12">
          <h2 id="example-plugin" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Example Plugin</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Here's a complete example of a simple analytics plugin:
          </p>

          <Accordion>
            <AccordionItem title="src/lib.rs - Plugin Entry Point" defaultOpen>
              <CodeBlock
                code={`//! Simple Analytics Plugin for Rustpress
//!
//! Tracks page views and provides basic analytics dashboard.

use rustpress_core::prelude::*;
use rustpress_macros::rustpress_plugin;

mod hooks;
mod admin;
mod api;
mod models;

/// Plugin state and configuration
pub struct SimpleAnalytics {
    config: AnalyticsConfig,
    db: Database,
}

#[derive(Debug, Clone, Deserialize)]
pub struct AnalyticsConfig {
    /// Enable tracking (default: true)
    pub enabled: bool,
    /// Exclude admin users from tracking
    pub exclude_admins: bool,
    /// IP addresses to exclude
    pub excluded_ips: Vec<String>,
    /// Data retention days (0 = forever)
    pub retention_days: u32,
}

impl Default for AnalyticsConfig {
    fn default() -> Self {
        Self {
            enabled: true,
            exclude_admins: true,
            excluded_ips: vec![],
            retention_days: 90,
        }
    }
}

#[rustpress_plugin]
impl Plugin for SimpleAnalytics {
    fn name(&self) -> &str {
        "simple-analytics"
    }

    fn version(&self) -> &str {
        env!("CARGO_PKG_VERSION")
    }

    fn description(&self) -> &str {
        "Simple page view analytics for Rustpress"
    }

    /// Called when plugin is activated
    async fn on_activate(&mut self, ctx: &PluginContext) -> Result<()> {
        // Run database migrations
        self.db.migrate(include_str!("../migrations/001_create_tables.sql")).await?;

        // Load configuration
        self.config = ctx.settings().get("simple-analytics")
            .unwrap_or_default();

        tracing::info!("Simple Analytics plugin activated");
        Ok(())
    }

    /// Called when plugin is deactivated
    async fn on_deactivate(&mut self, _ctx: &PluginContext) -> Result<()> {
        tracing::info!("Simple Analytics plugin deactivated");
        Ok(())
    }

    /// Register hooks
    fn register_hooks(&self, registry: &mut HookRegistry) {
        registry.add_action("request:after", hooks::track_pageview);
        registry.add_action("admin:dashboard_widgets", hooks::render_analytics_widget);
        registry.add_action("cron:daily", hooks::cleanup_old_data);
    }

    /// Register admin pages
    fn register_admin_pages(&self, admin: &mut AdminRegistry) {
        admin.add_page(AdminPage {
            path: "/analytics",
            title: "Analytics",
            icon: "chart-bar",
            component: admin::AnalyticsDashboard,
            capability: "manage_options",
        });

        admin.add_page(AdminPage {
            path: "/analytics/settings",
            title: "Analytics Settings",
            parent: Some("/analytics"),
            component: admin::AnalyticsSettings,
            capability: "manage_options",
        });
    }

    /// Register REST API endpoints
    fn register_api_routes(&self, router: &mut ApiRouter) {
        router.get("/analytics/stats", api::get_stats);
        router.get("/analytics/pageviews", api::get_pageviews);
        router.get("/analytics/popular", api::get_popular_pages);
        router.post("/analytics/settings", api::update_settings);
    }
}

/// Initialize the plugin
#[no_mangle]
pub extern "C" fn rustpress_plugin_init() -> Box<dyn Plugin> {
    Box::new(SimpleAnalytics {
        config: AnalyticsConfig::default(),
        db: Database::new(),
    })
}`}
                language="rust"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="src/hooks.rs - Hook Implementations">
              <CodeBlock
                code={`//! Hook implementations for Simple Analytics

use rustpress_core::prelude::*;
use crate::models::PageView;

/// Track page view after each request
pub async fn track_pageview(ctx: &RequestContext) -> Result<()> {
    let plugin = ctx.plugin::<SimpleAnalytics>()?;

    // Skip if tracking is disabled
    if !plugin.config.enabled {
        return Ok(());
    }

    // Skip admin users if configured
    if plugin.config.exclude_admins {
        if let Some(user) = ctx.user() {
            if user.has_capability("manage_options") {
                return Ok(());
            }
        }
    }

    // Skip excluded IPs
    let client_ip = ctx.client_ip().to_string();
    if plugin.config.excluded_ips.contains(&client_ip) {
        return Ok(());
    }

    // Skip non-GET requests and admin pages
    if ctx.method() != "GET" || ctx.path().starts_with("/admin") {
        return Ok(());
    }

    // Record the page view
    let pageview = PageView {
        path: ctx.path().to_string(),
        referrer: ctx.header("Referer").map(String::from),
        user_agent: ctx.header("User-Agent").map(String::from),
        ip_hash: hash_ip(&client_ip),  // Privacy: hash the IP
        user_id: ctx.user().map(|u| u.id),
        timestamp: chrono::Utc::now(),
    };

    plugin.db.insert("page_views", &pageview).await?;

    Ok(())
}

/// Render analytics widget on admin dashboard
pub async fn render_analytics_widget(ctx: &AdminContext) -> Result<Widget> {
    let plugin = ctx.plugin::<SimpleAnalytics>()?;

    // Get today's stats
    let today = chrono::Utc::now().date_naive();
    let stats = plugin.db.query::<Stats>(
        "SELECT COUNT(*) as views, COUNT(DISTINCT ip_hash) as visitors
         FROM page_views WHERE DATE(timestamp) = ?",
        &[&today]
    ).await?;

    Ok(Widget {
        id: "simple-analytics",
        title: "Today's Analytics",
        content: html! {
            <div class="analytics-widget">
                <div class="stat">
                    <span class="value">{stats.views}</span>
                    <span class="label">"Page Views"</span>
                </div>
                <div class="stat">
                    <span class="value">{stats.visitors}</span>
                    <span class="label">"Unique Visitors"</span>
                </div>
                <a href="/admin/analytics" class="view-all">
                    "View Full Analytics →"
                </a>
            </div>
        },
        priority: 10,
    })
}

/// Clean up old analytics data (runs daily via cron)
pub async fn cleanup_old_data(ctx: &CronContext) -> Result<()> {
    let plugin = ctx.plugin::<SimpleAnalytics>()?;

    if plugin.config.retention_days == 0 {
        return Ok(()); // Keep forever
    }

    let cutoff = chrono::Utc::now() - chrono::Duration::days(
        plugin.config.retention_days as i64
    );

    let deleted = plugin.db.execute(
        "DELETE FROM page_views WHERE timestamp < ?",
        &[&cutoff]
    ).await?;

    tracing::info!("Cleaned up {} old analytics records", deleted);

    Ok(())
}

fn hash_ip(ip: &str) -> String {
    use sha2::{Sha256, Digest};
    let mut hasher = Sha256::new();
    hasher.update(ip.as_bytes());
    format!("{:x}", hasher.finalize())[..16].to_string()
}`}
                language="rust"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="src/models.rs - Database Models">
              <CodeBlock
                code={`//! Database models for Simple Analytics

use rustpress_core::prelude::*;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Model)]
#[table("page_views")]
pub struct PageView {
    #[primary_key]
    pub id: Option<i64>,

    #[index]
    pub path: String,

    pub referrer: Option<String>,
    pub user_agent: Option<String>,

    #[index]
    pub ip_hash: String,

    pub user_id: Option<i64>,

    #[index]
    pub timestamp: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Stats {
    pub views: i64,
    pub visitors: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PopularPage {
    pub path: String,
    pub views: i64,
    pub unique_visitors: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DailyStats {
    pub date: String,
    pub views: i64,
    pub visitors: i64,
}

impl PageView {
    pub fn new(path: String) -> Self {
        Self {
            id: None,
            path,
            referrer: None,
            user_agent: None,
            ip_hash: String::new(),
            user_id: None,
            timestamp: Utc::now(),
        }
    }
}`}
                language="rust"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="migrations/001_create_tables.sql">
              <CodeBlock
                code={`-- Migration: Create analytics tables
-- Version: 1.0.0

CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    ip_hash TEXT NOT NULL,
    user_id INTEGER,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Indexes for common queries
    INDEX idx_path (path),
    INDEX idx_timestamp (timestamp),
    INDEX idx_ip_hash (ip_hash),

    -- Foreign key to users table (optional)
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Aggregated daily stats for faster queries
CREATE TABLE IF NOT EXISTS analytics_daily (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL UNIQUE,
    total_views INTEGER NOT NULL DEFAULT 0,
    unique_visitors INTEGER NOT NULL DEFAULT 0,
    top_pages JSON,
    top_referrers JSON,

    INDEX idx_date (date)
);

-- Settings storage
CREATE TABLE IF NOT EXISTS analytics_settings (
    key TEXT PRIMARY KEY,
    value JSON NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);`}
                language="sql"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Preparing for Release */}
        <section className="mb-12">
          <h2 id="preparing" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Preparing for Release</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Before publishing, ensure your plugin meets these requirements:
          </p>

          <div className="not-prose grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-green-800 dark:text-green-200">Required</span>
              </div>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                <li>Valid plugin.toml manifest</li>
                <li>README.md with usage instructions</li>
                <li>LICENSE file (MIT, Apache 2.0, etc.)</li>
                <li>All tests passing</li>
                <li>No compiler warnings</li>
                <li>Semantic versioning</li>
              </ul>
            </div>
            <div className="p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="font-semibold text-blue-800 dark:text-blue-200">Recommended</span>
              </div>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <li>CHANGELOG.md with version history</li>
                <li>Screenshots for admin pages</li>
                <li>Example configuration</li>
                <li>Integration tests</li>
                <li>CI/CD pipeline</li>
                <li>Documentation site</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Pre-release Checklist</p>
            <CodeBlock
              code={`# Run these commands before publishing

# 1. Format code
cargo fmt --check

# 2. Run linter
cargo clippy -- -D warnings

# 3. Run tests
cargo test

# 4. Build in release mode
cargo build --release

# 5. Validate plugin manifest
rustpress plugin:validate

# 6. Package the plugin
rustpress plugin:package

# 7. Test installation locally
rustpress plugin:install ./target/release/my-awesome-plugin.rpp`}
              language="bash"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Publishing */}
        <section className="mb-12">
          <h2 id="publishing" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Publishing</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You can publish your plugin to the Rustpress Plugin Directory or distribute it via GitHub.
          </p>

          <Accordion>
            <AccordionItem title="Rustpress Plugin Directory" defaultOpen>
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  The official plugin directory is free and makes your plugin discoverable to all Rustpress users.
                </p>
              </div>
              <CodeBlock
                code={`# Package your plugin
rustpress plugin:package my-awesome-plugin

# Submit to the plugin directory
rustpress plugin:submit my-awesome-plugin

# This will:
# 1. Validate your plugin manifest
# 2. Run security checks
# 3. Build the plugin
# 4. Upload to the directory
# 5. Create a review request

# Check submission status
rustpress plugin:status my-awesome-plugin

# After approval, publish updates
rustpress plugin:publish my-awesome-plugin --version 1.1.0`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="GitHub Distribution">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Distribute via GitHub releases for direct installation.
                </p>
              </div>
              <CodeBlock
                code={`# Build release artifacts
cargo build --release

# Create plugin package
rustpress plugin:package --output ./dist/

# Create GitHub release with GitHub CLI
gh release create v1.0.0 \\
  ./dist/my-awesome-plugin-1.0.0.rpp \\
  --title "v1.0.0" \\
  --notes "Initial release"

# Users can then install directly from GitHub:
rustpress plugin:install https://github.com/user/my-awesome-plugin/releases/download/v1.0.0/my-awesome-plugin-1.0.0.rpp

# Or add to their rustpress.toml:
# [plugins]
# my-awesome-plugin = { git = "https://github.com/user/my-awesome-plugin", tag = "v1.0.0" }`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>

            <AccordionItem title="GitHub Actions CI/CD">
              <CodeBlock
                code={`# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Rust
        uses: dtolnay/rust-action@stable

      - name: Install Rustpress CLI
        run: cargo install rustpress-cli

      - name: Run tests
        run: cargo test

      - name: Build plugin
        run: cargo build --release

      - name: Package plugin
        run: rustpress plugin:package --output ./dist/

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: ./dist/*.rpp
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: Publish to Plugin Directory
        if: github.event_name == 'push'
        run: rustpress plugin:publish
        env:
          RUSTPRESS_API_KEY: \${{ secrets.RUSTPRESS_API_KEY }}`}
                language="yaml"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Versioning */}
        <section className="mb-12">
          <h2 id="versioning" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Versioning</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Follow semantic versioning (SemVer) for your plugin releases:
          </p>

          <div className="not-prose overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Version</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">When to Bump</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-mono text-rust-600 dark:text-rust-400">MAJOR (X.0.0)</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Breaking changes, incompatible API changes</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1.0.0 → 2.0.0</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-mono text-rust-600 dark:text-rust-400">MINOR (0.X.0)</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">New features, backwards compatible</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1.0.0 → 1.1.0</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-rust-600 dark:text-rust-400">PATCH (0.0.X)</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Bug fixes, minor improvements</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1.0.0 → 1.0.1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">CHANGELOG.md Example</p>
            <CodeBlock
              code={`# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2024-01-15

### Added
- Real-time analytics dashboard with live updates
- Export functionality for CSV and JSON formats
- Custom date range selector

### Changed
- Improved database query performance by 40%
- Updated admin UI to match Rustpress 0.6 design

### Fixed
- Fixed timezone handling in date filters
- Resolved memory leak in long-running instances

## [1.0.1] - 2024-01-10

### Fixed
- Fixed compatibility issue with Rustpress 0.5.2
- Corrected IP hashing algorithm

## [1.0.0] - 2024-01-01

### Added
- Initial release
- Page view tracking
- Basic analytics dashboard
- Admin settings page
- Data retention configuration`}
              language="markdown"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 id="best-practices" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Best Practices</h2>

          <div className="not-prose space-y-4 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-start gap-3">
                <Terminal className="w-5 h-5 text-rust-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Use Descriptive Names</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose a clear, unique plugin ID. Avoid generic names like "utils" or "helper".
                    Good: "seo-optimizer", "social-sharing", "contact-form"
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-start gap-3">
                <FileCode className="w-5 h-5 text-rust-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Document Everything</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Include comprehensive README with installation, configuration, and usage examples.
                    Add inline code comments for complex logic.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-rust-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Version Responsibly</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Follow semantic versioning strictly. Document breaking changes clearly in CHANGELOG.
                    Provide migration guides for major version updates.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="flex items-start gap-3">
                <Github className="w-5 h-5 text-rust-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Engage with Users</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Respond to issues and pull requests. Create a CONTRIBUTING.md for community contributions.
                    Consider a discussion forum or Discord channel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Security Reminder</p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Always validate user input, escape output, and use parameterized queries. Never store
                  sensitive data in plain text. Follow the security guidelines in our plugin security documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/testing" className="text-gray-600 hover:text-rust-600">← Testing Plugins</Link>
          <Link to="/docs/api/overview" className="flex items-center gap-2 text-rust-600">API Reference <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
