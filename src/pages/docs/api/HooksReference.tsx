import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, FileText, Puzzle, Shield, Database, Server, Bell } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem, Callout } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'hook-types', title: 'Hook Types', level: 2 },
  { id: 'content-hooks', title: 'Content Hooks', level: 2 },
  { id: 'user-hooks', title: 'User Hooks', level: 2 },
  { id: 'plugin-hooks', title: 'Plugin Lifecycle', level: 2 },
  { id: 'theme-hooks', title: 'Theme Hooks', level: 2 },
  { id: 'system-hooks', title: 'System Hooks', level: 2 },
  { id: 'security-hooks', title: 'Security Hooks', level: 2 },
  { id: 'database-hooks', title: 'Database Hooks', level: 2 },
  { id: 'domain-events', title: 'Domain Events', level: 2 },
  { id: 'registration', title: 'Registration', level: 2 },
];

interface HookItemProps {
  name: string;
  description: string;
  params?: string;
}

function HookItem({ name, description, params }: HookItemProps) {
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 py-3 last:border-0">
      <div className="flex items-start gap-3">
        <code className="text-sm font-mono text-rust-600 dark:text-rust-400 whitespace-nowrap">{name}</code>
        <span className="text-sm text-gray-600 dark:text-gray-400">{description}</span>
      </div>
      {params && (
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 ml-0 pl-0">
          Params: <code className="text-xs">{params}</code>
        </p>
      )}
    </div>
  );
}

function HookSection({
  id,
  title,
  icon,
  description,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-rust-500/10 dark:bg-rust-500/20 flex items-center justify-center text-rust-500">
          {icon}
        </div>
        <div>
          <h2 id={id} className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
        {children}
      </div>
    </section>
  );
}

export function HooksReference() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Hooks Reference</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete reference for all action hooks available in Rustpress.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress provides a powerful hook system that allows plugins and themes to extend core functionality.
            The system supports both traditional action hooks and modern domain events.
          </p>

          <Callout type="info" title="Async-First Design">
            All hooks in Rustpress are async-first with <code>.await</code> support.
            Hooks execute in priority order (higher priority runs first).
          </Callout>
        </section>

        {/* Hook Types */}
        <section className="mb-10">
          <h2 id="hook-types" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hook Types</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Action Hooks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Trigger side effects at specific points. Use <code>do_action()</code> to fire.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Filter Hooks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Modify data passing through. Use <code>apply_filter()</code> to transform.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Domain Events</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Publish/subscribe pattern for domain-driven events with correlation tracking.
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lifecycle Hooks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Plugin lifecycle callbacks for activation, deactivation, and upgrades.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Priority Levels</h3>
            <CodeBlock
              code={`// Hook priority constants
LOWEST   = -100   // Run last
LOW      = -50    // Low priority
NORMAL   = 0      // Default priority
HIGH     = 50     // High priority
HIGHEST  = 100    // Run first`}
              language="rust"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Content Hooks */}
        <HookSection
          id="content-hooks"
          title="Content Hooks"
          icon={<FileText className="w-5 h-5" />}
          description="Hooks for posts, pages, comments, and media"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium uppercase">Post Actions</p>
          <HookItem name="post_created" description="Called when a new post is created" params="Post" />
          <HookItem name="pre_post_save" description="Called before a post is saved (create or update)" params="Post, SaveContext" />
          <HookItem name="post_saved" description="Called after a post is successfully saved" params="Post" />
          <HookItem name="pre_post_delete" description="Called before a post is deleted" params="PostId" />
          <HookItem name="post_deleted" description="Called after a post is deleted" params="PostId" />
          <HookItem name="post_published" description="Called when a post is published" params="Post" />
          <HookItem name="post_unpublished" description="Called when a post is unpublished" params="Post" />
          <HookItem name="post_trashed" description="Called when a post is moved to trash" params="PostId" />
          <HookItem name="post_restored" description="Called when a post is restored from trash" params="Post" />

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 mt-6 font-medium uppercase">Page Actions</p>
          <HookItem name="page_created" description="Called when a new page is created" params="Page" />
          <HookItem name="page_updated" description="Called when a page is updated" params="Page" />
          <HookItem name="page_deleted" description="Called when a page is deleted" params="PageId" />
          <HookItem name="page_published" description="Called when a page is published" params="Page" />

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 mt-6 font-medium uppercase">Comment Actions</p>
          <HookItem name="comment_created" description="Called when a new comment is submitted" params="Comment" />
          <HookItem name="comment_updated" description="Called when a comment is edited" params="Comment" />
          <HookItem name="comment_deleted" description="Called when a comment is deleted" params="CommentId" />
          <HookItem name="pre_comment_approve" description="Called before a comment is approved" params="Comment" />
          <HookItem name="comment_approved" description="Called when a comment is approved" params="Comment" />
          <HookItem name="comment_marked_spam" description="Called when a comment is marked as spam" params="CommentId" />

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 mt-6 font-medium uppercase">Media Actions</p>
          <HookItem name="media_uploaded" description="Called when a file is uploaded" params="Media" />
          <HookItem name="media_updated" description="Called when media metadata is updated" params="Media" />
          <HookItem name="media_deleted" description="Called when media is deleted" params="MediaId" />
        </HookSection>

        {/* User Hooks */}
        <HookSection
          id="user-hooks"
          title="User Hooks"
          icon={<Users className="w-5 h-5" />}
          description="Hooks for user authentication and management"
        >
          <HookItem name="user_created" description="Called when a new user account is created" params="User" />
          <HookItem name="user_updated" description="Called when a user profile is updated" params="User" />
          <HookItem name="user_deleted" description="Called when a user account is deleted" params="UserId" />
          <HookItem name="user_logged_in" description="Called on successful authentication" params="User, Session" />
          <HookItem name="user_logged_out" description="Called when user session is terminated" params="UserId" />
          <HookItem name="user_password_changed" description="Called when password is changed" params="UserId" />
          <HookItem name="user_email_verified" description="Called when email verification completes" params="UserId" />
          <HookItem name="user_role_changed" description="Called when user role is modified" params="UserId, OldRole, NewRole" />
        </HookSection>

        {/* Plugin Lifecycle Hooks */}
        <HookSection
          id="plugin-hooks"
          title="Plugin Lifecycle"
          icon={<Puzzle className="w-5 h-5" />}
          description="Hooks for plugin lifecycle events"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium uppercase">Lifecycle Trait Methods</p>
          <HookItem name="on_activate" description="Called when plugin is activated" params="ActivationContext" />
          <HookItem name="on_deactivate" description="Called when plugin is deactivated" params="DeactivationContext" />
          <HookItem name="on_upgrade" description="Called when plugin is upgraded" params="UpgradeContext" />
          <HookItem name="on_uninstall" description="Called when plugin is uninstalled" params="UninstallContext" />
          <HookItem name="on_init" description="Called during plugin initialization" params="InitContext" />
          <HookItem name="on_load" description="Called when plugin is loaded" params="LoadContext" />
          <HookItem name="on_shutdown" description="Called during application shutdown" params="ShutdownContext" />

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 mt-6 font-medium uppercase">Lifecycle Events</p>
          <HookItem name="plugin_discovered" description="A new plugin is found in filesystem" params="PluginId, Path" />
          <HookItem name="plugin_loaded" description="Plugin loaded into memory" params="PluginId" />
          <HookItem name="plugin_activated" description="Plugin successfully activated" params="PluginId" />
          <HookItem name="plugin_activation_failed" description="Plugin activation failed" params="PluginId, Error" />
          <HookItem name="plugin_deactivated" description="Plugin deactivated" params="PluginId" />
          <HookItem name="plugin_upgraded" description="Plugin upgrade completed" params="PluginId, FromVersion, ToVersion" />
          <HookItem name="plugin_uninstalled" description="Plugin removed" params="PluginId" />
          <HookItem name="plugin_error" description="Plugin error occurred" params="PluginId, Error" />
        </HookSection>

        {/* Theme Hooks */}
        <HookSection
          id="theme-hooks"
          title="Theme Hooks"
          icon={<Zap className="w-5 h-5" />}
          description="Hooks for theme activation and rendering"
        >
          <HookItem name="theme_activated" description="Called when a theme is activated" params="ThemeId" />
          <HookItem name="theme_deactivated" description="Called when a theme is deactivated" params="ThemeId" />
          <HookItem name="before_render" description="Called before template rendering" params="TemplateContext" />
          <HookItem name="after_render" description="Called after template rendering" params="RenderedContent" />
          <HookItem name="head" description="Called in HTML head section" params="HeadContext" />
          <HookItem name="footer" description="Called before closing body tag" params="FooterContext" />
          <HookItem name="widget_render" description="Called when rendering a widget" params="Widget, WidgetArea" />
          <HookItem name="menu_render" description="Called when rendering a menu" params="Menu, MenuLocation" />
        </HookSection>

        {/* System Hooks */}
        <HookSection
          id="system-hooks"
          title="System Hooks"
          icon={<Server className="w-5 h-5" />}
          description="Core system and initialization hooks"
        >
          <HookItem name="init" description="Called after Rustpress initializes" params="AppContext" />
          <HookItem name="plugins_loaded" description="Called after all plugins are loaded" params="PluginRegistry" />
          <HookItem name="theme_loaded" description="Called after the active theme loads" params="ThemeContext" />
          <HookItem name="system_startup" description="Application startup complete" params="StartupContext" />
          <HookItem name="system_shutdown" description="Application shutting down" params="ShutdownContext" />
          <HookItem name="cache_cleared" description="Cache has been invalidated" params="CacheType" />
          <HookItem name="settings_updated" description="Settings have been changed" params="SettingsGroup" />
          <HookItem name="cron_run" description="Scheduled task executed" params="CronJob" />
        </HookSection>

        {/* Security Hooks */}
        <HookSection
          id="security-hooks"
          title="Security Hooks"
          icon={<Shield className="w-5 h-5" />}
          description="Security monitoring and audit hooks"
        >
          <HookItem name="blocked_request" description="Request blocked by security policy" params="Reason, Pattern" />
          <HookItem name="authentication_failure" description="Failed authentication attempt" params="Username, Method, Reason" />
          <HookItem name="authorization_denied" description="Permission denied for action" params="UserId, Resource, Action" />
          <HookItem name="rate_limit_exceeded" description="Rate limit triggered" params="Limit, WindowSeconds" />
          <HookItem name="suspicious_pattern" description="Unusual activity detected" params="PatternType, Details" />
          <HookItem name="bot_detected" description="Bot behavior identified" params="Score, Signals" />
          <HookItem name="brute_force_attempt" description="Brute force attack detected" params="Target, AttemptCount" />
          <HookItem name="session_anomaly" description="Unexpected session behavior" params="SessionId, AnomalyType" />
          <HookItem name="ip_blocked" description="IP address blocked" params="Ip, Reason" />
          <HookItem name="csrf_failure" description="CSRF token validation failed" params="Reason" />
        </HookSection>

        {/* Database Hooks */}
        <HookSection
          id="database-hooks"
          title="Database Hooks"
          icon={<Database className="w-5 h-5" />}
          description="Database query and modification hooks"
        >
          <HookItem name="before_query" description="Before query execution" params="Query, UserId" />
          <HookItem name="after_query" description="After query execution" params="Query, Success, ExecutionTimeMs, RowCount" />
          <HookItem name="before_table_modify" description="Before INSERT/UPDATE/DELETE" params="TableName, Operation, UserId" />
          <HookItem name="after_table_modify" description="After modification" params="TableName, Operation, Success, AffectedRows" />
        </HookSection>

        {/* Domain Events */}
        <HookSection
          id="domain-events"
          title="Domain Events"
          icon={<Bell className="w-5 h-5" />}
          description="Publish/subscribe events with dot notation"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Domain events use a hierarchical naming convention (e.g., <code>user.created</code>, <code>post.published</code>).
            They support correlation tracking for request tracing and multitenancy.
          </p>

          <Accordion>
            <AccordionItem title="User Events">
              <CodeBlock
                code={`user.created         # User account created
user.updated         # User profile updated
user.deleted         # User account deleted
user.logged_in       # Successful authentication
user.logged_out      # Session terminated
user.password_changed # Password changed
user.email_verified  # Email verification complete`}
                language="yaml"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Content Events">
              <CodeBlock
                code={`post.created         # Post created
post.updated         # Post updated
post.deleted         # Post deleted
post.published       # Post published
post.unpublished     # Post unpublished
post.trashed         # Post moved to trash
post.restored        # Post restored from trash

page.created         # Page created
page.updated         # Page updated
page.deleted         # Page deleted
page.published       # Page published

comment.created      # Comment submitted
comment.updated      # Comment edited
comment.deleted      # Comment removed
comment.approved     # Comment approved
comment.marked_spam  # Comment flagged as spam

media.uploaded       # File uploaded
media.updated        # Media metadata updated
media.deleted        # Media deleted`}
                language="yaml"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Plugin & Theme Events">
              <CodeBlock
                code={`plugin.activated     # Plugin enabled
plugin.deactivated   # Plugin disabled
plugin.installed     # Plugin installed
plugin.uninstalled   # Plugin removed

theme.activated      # Theme switched to
theme.deactivated    # Theme removed from active`}
                language="yaml"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="System Events">
              <CodeBlock
                code={`system.startup       # Application started
system.shutdown      # Application shutting down
cache.cleared        # Cache invalidated
settings.updated     # Settings changed

tenant.created       # Tenant created (multitenancy)
tenant.updated       # Tenant settings changed
tenant.suspended     # Tenant access suspended
tenant.activated     # Tenant access restored`}
                language="yaml"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </HookSection>

        {/* Registration */}
        <section className="mb-10">
          <h2 id="registration" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hook Registration</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Registering Action Hooks</h3>
              <CodeBlock
                code={`use rustpress_core::hook::{HookRegistry, Priority};

// Register an action hook
registry.add_action(
    "post_saved",
    |post: Post| async move {
        // Send notification, update cache, etc.
        notify_subscribers(&post).await;
        Ok(())
    },
    Priority::NORMAL,
    Some("my-plugin"),
).await;

// Fire an action hook
registry.do_action("post_saved", post).await?;`}
                language="rust"
                showLineNumbers={false}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Registering Filter Hooks</h3>
              <CodeBlock
                code={`// Register a filter hook
registry.add_filter(
    "filter_post_content",
    |content: String| async move {
        // Modify content
        let modified = add_syntax_highlighting(&content);
        Ok(modified)
    },
    Priority::HIGH,
    Some("my-plugin"),
).await;

// Apply a filter
let content = registry.apply_filter("filter_post_content", raw_content).await?;`}
                language="rust"
                showLineNumbers={false}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Subscribing to Domain Events</h3>
              <CodeBlock
                code={`use rustpress_events::{EventBus, Subscriber};

// Subscribe to domain events
event_bus.subscribe(
    Subscriber::new("post.published")
        .with_handler(|event| async move {
            // Handle the event
            invalidate_cache(&event.entity_id).await;
            send_webhooks(&event).await;
            Ok(())
        })
        .with_priority(50)
        .with_retry(3, 1000), // 3 retries, 1s delay
).await;

// Publish an event
event_bus.publish(DomainEvent::new("post.published", post_id)).await?;`}
                language="rust"
                showLineNumbers={false}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Plugin Lifecycle Implementation</h3>
              <CodeBlock
                code={`use rustpress_plugins::lifecycle::LifecycleHook;

impl LifecycleHook for MyPlugin {
    async fn on_activate(&self, ctx: ActivationContext) -> Result<(), HookError> {
        // Create database tables, register settings, etc.
        self.create_tables(&ctx.db).await?;
        Ok(())
    }

    async fn on_deactivate(&self, ctx: DeactivationContext) -> Result<(), HookError> {
        // Cleanup resources
        Ok(())
    }

    async fn on_upgrade(&self, ctx: UpgradeContext) -> Result<(), HookError> {
        // Run migrations between versions
        self.run_migrations(ctx.from_version, ctx.to_version).await?;
        Ok(())
    }
}`}
                language="rust"
                showLineNumbers={false}
              />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/api/core-functions" className="text-gray-600 hover:text-rust-600">← Core Functions</Link>
          <Link to="/docs/api/filters" className="flex items-center gap-2 text-rust-600">
            Filters Reference <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
