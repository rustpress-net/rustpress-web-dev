import { Link } from 'react-router-dom';
import { ArrowRight, Database, Server, Shield, Zap } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem, Callout } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'connection', title: 'Connection & Pooling', level: 2 },
  { id: 'providers', title: 'Database Providers', level: 2 },
  { id: 'queries', title: 'Queries', level: 2 },
  { id: 'models', title: 'Models', level: 2 },
  { id: 'migrations', title: 'Migrations', level: 2 },
  { id: 'transactions', title: 'Transactions', level: 2 },
];

export function DatabaseApi() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Database API</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Type-safe database access with SQLx and PostgreSQL.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-10">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress uses <strong>SQLx</strong> for compile-time verified, async database operations.
            PostgreSQL 15+ is the primary database, with optional support for MySQL and SQLite.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl flex items-start gap-3">
              <Database className="w-5 h-5 text-rust-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Type-Safe Queries</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Compile-time SQL verification against your database schema.
                </p>
              </div>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl flex items-start gap-3">
              <Zap className="w-5 h-5 text-rust-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Async-First</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Built on Tokio for high-performance async operations.
                </p>
              </div>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl flex items-start gap-3">
              <Server className="w-5 h-5 text-rust-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Connection Pooling</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Efficient connection management with configurable pool sizes.
                </p>
              </div>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-rust-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Multi-Provider</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Support for Supabase, Neon, PlanetScale, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Connection & Pooling */}
        <section className="mb-10">
          <h2 id="connection" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Connection & Pooling</h2>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Environment Configuration</h3>
          <CodeBlock
            code={`# PostgreSQL connection
DATABASE_URL=postgres://user:password@localhost:5432/rustpress

# Connection pool settings
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_CONNECT_TIMEOUT=10
DATABASE_IDLE_TIMEOUT=600
DATABASE_MAX_LIFETIME=1800
DATABASE_STATEMENT_CACHE_SIZE=100

# Auto-run migrations on startup
DATABASE_RUN_MIGRATIONS=true`}
            language="bash"
            showLineNumbers={false}
          />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">Pool Configuration</h3>
          <CodeBlock
            code={`use rustpress_database::pool::DatabasePool;

// Create pool with defaults
let pool = DatabasePool::new(&config.database_url).await?;

// Or with custom configuration
let pool = DatabasePool::builder()
    .url(&config.database_url)
    .min_connections(2)
    .max_connections(10)
    .connect_timeout(Duration::from_secs(10))
    .idle_timeout(Duration::from_secs(600))
    .max_lifetime(Duration::from_secs(1800))
    .statement_cache_size(100)
    .build()
    .await?;

// Health check
pool.health_check().await?;`}
            language="rust"
            showLineNumbers={false}
          />
        </section>

        {/* Database Providers */}
        <section className="mb-10">
          <h2 id="providers" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Database Providers</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress supports multiple database providers for different deployment scenarios.
          </p>

          <Accordion>
            <AccordionItem title="PostgreSQL (Self-hosted)" defaultOpen>
              <CodeBlock
                code={`# Environment variables
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_DB=rustpress
POSTGRES_SSL_MODE=prefer
POSTGRES_POOL_SIZE=10`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Supabase">
              <CodeBlock
                code={`# Supabase configuration
DATABASE_PROVIDER=supabase
SUPABASE_PROJECT_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_DATABASE_PASSWORD=your-password
SUPABASE_USE_POOLER=true
SUPABASE_POOLER_MODE=transaction`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Neon">
              <CodeBlock
                code={`# Neon serverless PostgreSQL
DATABASE_PROVIDER=neon
NEON_PROJECT_ID=your-project-id
NEON_BRANCH=main
NEON_DATABASE=rustpress
NEON_ROLE=your-role
NEON_PASSWORD=your-password`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="PlanetScale (MySQL)">
              <CodeBlock
                code={`# PlanetScale MySQL-compatible
DATABASE_PROVIDER=planetscale
PLANETSCALE_HOST=aws.connect.psdb.cloud
PLANETSCALE_USERNAME=your-username
PLANETSCALE_PASSWORD=your-password
PLANETSCALE_DATABASE=your-database`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="SQLite (Development)">
              <CodeBlock
                code={`# SQLite for local development
DATABASE_PROVIDER=sqlite
SQLITE_PATH=./data/rustpress.db

# In-memory database for testing
SQLITE_PATH=:memory:`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Queries */}
        <section className="mb-10">
          <h2 id="queries" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Queries</h2>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Select Queries</h3>
          <CodeBlock
            code={`use sqlx::FromRow;

// Fetch all posts
let posts: Vec<Post> = sqlx::query_as!(
    Post,
    r#"SELECT id, title, content, status, created_at
       FROM posts
       WHERE status = $1
       ORDER BY created_at DESC
       LIMIT $2"#,
    "published",
    10
)
.fetch_all(&pool)
.await?;

// Fetch single record
let post: Option<Post> = sqlx::query_as!(
    Post,
    "SELECT * FROM posts WHERE id = $1",
    post_id
)
.fetch_optional(&pool)
.await?;

// Fetch with joins
let posts_with_authors: Vec<PostWithAuthor> = sqlx::query_as!(
    PostWithAuthor,
    r#"SELECT p.*, u.username as author_name
       FROM posts p
       JOIN users u ON p.author_id = u.id
       WHERE p.status = 'published'"#
)
.fetch_all(&pool)
.await?;`}
            language="rust"
            showLineNumbers={false}
          />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">Insert Queries</h3>
          <CodeBlock
            code={`// Insert and return the new record
let post: Post = sqlx::query_as!(
    Post,
    r#"INSERT INTO posts (id, title, content, author_id, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *"#,
    Uuid::new_v4(),
    "My New Post",
    "Post content here...",
    author_id,
    "draft"
)
.fetch_one(&pool)
.await?;

// Bulk insert
let mut tx = pool.begin().await?;
for post in posts_to_insert {
    sqlx::query!(
        "INSERT INTO posts (id, title, content) VALUES ($1, $2, $3)",
        post.id, post.title, post.content
    )
    .execute(&mut *tx)
    .await?;
}
tx.commit().await?;`}
            language="rust"
            showLineNumbers={false}
          />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">Update & Delete</h3>
          <CodeBlock
            code={`// Update a record
let result = sqlx::query!(
    r#"UPDATE posts
       SET title = $1, content = $2, updated_at = NOW()
       WHERE id = $3"#,
    new_title,
    new_content,
    post_id
)
.execute(&pool)
.await?;

println!("Updated {} rows", result.rows_affected());

// Soft delete (recommended)
sqlx::query!(
    "UPDATE posts SET deleted_at = NOW() WHERE id = $1",
    post_id
)
.execute(&pool)
.await?;

// Hard delete
sqlx::query!("DELETE FROM posts WHERE id = $1", post_id)
    .execute(&pool)
    .await?;`}
            language="rust"
            showLineNumbers={false}
          />
        </section>

        {/* Models */}
        <section className="mb-10">
          <h2 id="models" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Models</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All models use UUID primary keys, soft deletes, and automatic timestamps.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Core Tables</h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <code className="text-rust-600 dark:text-rust-400">users</code>
                <span className="text-gray-500">User accounts with Argon2 passwords, 2FA, OAuth</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <code className="text-rust-600 dark:text-rust-400">posts</code>
                <span className="text-gray-500">Content with status, visibility, scheduling</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <code className="text-rust-600 dark:text-rust-400">pages</code>
                <span className="text-gray-500">Hierarchical pages with parent relationships</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <code className="text-rust-600 dark:text-rust-400">comments</code>
                <span className="text-gray-500">Threaded comments with moderation</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <code className="text-rust-600 dark:text-rust-400">media</code>
                <span className="text-gray-500">File storage with MIME types and metadata</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <code className="text-rust-600 dark:text-rust-400">taxonomies</code>
                <span className="text-gray-500">Categories, tags, custom taxonomies</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <code className="text-rust-600 dark:text-rust-400">options</code>
                <span className="text-gray-500">Site settings key-value store</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <code className="text-rust-600 dark:text-rust-400">sessions</code>
                <span className="text-gray-500">Server-side session management</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <code className="text-rust-600 dark:text-rust-400">tenants</code>
                <span className="text-gray-500">Multi-tenant support</span>
              </div>
              <div className="flex justify-between">
                <code className="text-rust-600 dark:text-rust-400">audit_logs</code>
                <span className="text-gray-500">Comprehensive audit trail</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Model Definition</h3>
          <CodeBlock
            code={`use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Post {
    pub id: Uuid,
    pub title: String,
    pub slug: String,
    pub content: String,
    pub excerpt: Option<String>,
    pub status: String,           // draft, published, pending, private
    pub visibility: String,       // public, private, password
    pub author_id: Uuid,
    pub featured_image_id: Option<Uuid>,
    pub published_at: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub deleted_at: Option<DateTime<Utc>>,  // Soft delete
    pub tenant_id: Option<Uuid>,            // Multi-tenancy
    pub meta: Option<serde_json::Value>,    // JSONB metadata
}`}
            language="rust"
            showLineNumbers={false}
          />
        </section>

        {/* Migrations */}
        <section className="mb-10">
          <h2 id="migrations" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Migrations</h2>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">CLI Commands</h3>
          <CodeBlock
            code={`# Run pending migrations
rustpress db migrate

# Show migration status
rustpress db migrate --status

# Preview without executing
rustpress db migrate --dry-run

# Rollback last migration
rustpress db migrate --rollback 1

# Reset database (dangerous!)
rustpress db reset --confirm`}
            language="bash"
            showLineNumbers={false}
          />

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-6">Creating Migrations</h3>
          <CodeBlock
            code={`-- migrations/00025_add_views_count.sql
-- Add views tracking to posts table

ALTER TABLE posts ADD COLUMN views_count INTEGER NOT NULL DEFAULT 0;

CREATE INDEX idx_posts_views ON posts(views_count DESC);

-- Create views tracking table
CREATE TABLE post_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    ip_hash VARCHAR(64) NOT NULL,
    user_agent TEXT,
    referrer TEXT,
    viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_post_views_post ON post_views(post_id);
CREATE INDEX idx_post_views_date ON post_views(viewed_at);`}
            language="sql"
            showLineNumbers={false}
          />

          <Callout type="info" title="Migration Tracking">
            Migrations are tracked in the <code>_migrations</code> table with version, name, and applied_at timestamp.
            Each migration runs in a transaction for atomic operations.
          </Callout>
        </section>

        {/* Transactions */}
        <section className="mb-10">
          <h2 id="transactions" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Transactions</h2>
          <CodeBlock
            code={`use sqlx::Acquire;

// Start a transaction
let mut tx = pool.begin().await?;

// Perform multiple operations
let post = sqlx::query_as!(Post,
    "INSERT INTO posts (id, title, content) VALUES ($1, $2, $3) RETURNING *",
    Uuid::new_v4(), title, content
)
.fetch_one(&mut *tx)
.await?;

// Add categories
for category_id in category_ids {
    sqlx::query!(
        "INSERT INTO term_relationships (object_id, term_id) VALUES ($1, $2)",
        post.id, category_id
    )
    .execute(&mut *tx)
    .await?;
}

// Commit or rollback
match validate_post(&post) {
    Ok(_) => tx.commit().await?,
    Err(e) => {
        tx.rollback().await?;
        return Err(e);
    }
}

// Alternative: automatic rollback on error with ? operator
async fn create_post_with_tags(pool: &PgPool, data: CreatePost) -> Result<Post> {
    let mut tx = pool.begin().await?;

    let post = sqlx::query_as!(Post, "INSERT INTO posts ...")
        .fetch_one(&mut *tx)
        .await?;  // Rolls back on error

    for tag in data.tags {
        sqlx::query!("INSERT INTO term_relationships ...")
            .execute(&mut *tx)
            .await?;  // Rolls back on error
    }

    tx.commit().await?;
    Ok(post)
}`}
            language="rust"
            showLineNumbers={false}
          />
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/api/filters" className="text-gray-600 hover:text-rust-600">← Filters Reference</Link>
          <Link to="/docs/api/rest-endpoints" className="flex items-center gap-2 text-rust-600">
            REST Endpoints <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
