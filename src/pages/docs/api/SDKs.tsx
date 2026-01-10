import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Github, Book, Zap } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'javascript', title: 'JavaScript / TypeScript', level: 2 },
  { id: 'python', title: 'Python', level: 2 },
  { id: 'rust', title: 'Rust', level: 2 },
  { id: 'php', title: 'PHP', level: 2 },
  { id: 'go', title: 'Go', level: 2 },
  { id: 'ruby', title: 'Ruby', level: 2 },
  { id: 'community', title: 'Community SDKs', level: 2 },
];

interface SDKCardProps {
  name: string;
  language: string;
  icon: string;
  version: string;
  packageName: string;
  installCommand: string;
  color: string;
  features: string[];
}

function SDKCard({ name, language, icon, version, packageName, installCommand, color, features }: SDKCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
    >
      <div className={`bg-gradient-to-r ${color} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            <div>
              <h3 className="text-lg font-bold text-white">{name}</h3>
              <p className="text-sm text-white/80">{language}</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-white/20 text-white text-xs font-medium rounded">
            v{version}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Package</p>
          <code className="text-sm text-rust-600 dark:text-rust-400">{packageName}</code>
        </div>
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-1">Install</p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2 font-mono text-sm text-gray-700 dark:text-gray-300">
            {installCommand}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">Features</p>
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SDKSection({
  id,
  title,
  icon,
  color,
  version,
  packageName,
  installCommands,
  description,
  children
}: {
  id: string;
  title: string;
  icon: string;
  color: string;
  version: string;
  packageName: string;
  installCommands: { manager: string; command: string }[];
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <div>
          <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {title}
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400 rounded">
              v{version}
            </span>
          </h2>
          <code className="text-sm text-rust-600 dark:text-rust-400">{packageName}</code>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>

      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Installation</p>
        <div className="grid gap-2">
          {installCommands.map((cmd) => (
            <div key={cmd.manager} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase w-16">{cmd.manager}</span>
              <code className="text-sm text-gray-700 dark:text-gray-300 font-mono">{cmd.command}</code>
            </div>
          ))}
        </div>
      </div>

      {children}
    </motion.section>
  );
}

export function SDKs() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">SDKs & Client Libraries</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Official and community SDKs for integrating Rustpress into your applications.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Rustpress provides official SDKs for popular programming languages, making it easy to integrate
            with your applications. All SDKs require authentication and provide full access to the REST and GraphQL APIs.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Type Safe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Full type definitions included</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Lock className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Secure</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Built-in auth handling</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Book className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Documented</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Comprehensive guides</p>
            </div>
          </div>

          {/* Quick Overview Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SDKCard
              name="rustpress-js"
              language="JavaScript / TypeScript"
              icon="📦"
              version="2.1.0"
              packageName="@rustpress/sdk"
              installCommand="npm install @rustpress/sdk"
              color="from-yellow-500 to-orange-500"
              features={['TypeScript', 'REST', 'GraphQL', 'Webhooks']}
            />
            <SDKCard
              name="rustpress-py"
              language="Python"
              icon="🐍"
              version="1.8.0"
              packageName="rustpress"
              installCommand="pip install rustpress"
              color="from-blue-500 to-cyan-500"
              features={['Async', 'Type Hints', 'REST', 'GraphQL']}
            />
            <SDKCard
              name="rustpress-rs"
              language="Rust"
              icon="🦀"
              version="0.9.0"
              packageName="rustpress-client"
              installCommand="cargo add rustpress-client"
              color="from-orange-500 to-red-500"
              features={['Async', 'Typed', 'REST', 'GraphQL']}
            />
            <SDKCard
              name="rustpress-php"
              language="PHP"
              icon="🐘"
              version="1.5.0"
              packageName="rustpress/sdk"
              installCommand="composer require rustpress/sdk"
              color="from-indigo-500 to-purple-500"
              features={['PSR-18', 'REST', 'GraphQL', 'Laravel']}
            />
            <SDKCard
              name="rustpress-go"
              language="Go"
              icon="🐹"
              version="1.2.0"
              packageName="github.com/rustpress/go-sdk"
              installCommand="go get github.com/rustpress/go-sdk"
              color="from-cyan-500 to-blue-500"
              features={['Context', 'REST', 'GraphQL', 'Typed']}
            />
            <SDKCard
              name="rustpress-rb"
              language="Ruby"
              icon="💎"
              version="1.3.0"
              packageName="rustpress"
              installCommand="gem install rustpress"
              color="from-red-500 to-pink-500"
              features={['REST', 'GraphQL', 'Rails', 'Async']}
            />
          </div>
        </section>

        {/* JavaScript / TypeScript */}
        <SDKSection
          id="javascript"
          title="JavaScript / TypeScript"
          icon="📦"
          color="from-yellow-500 to-orange-500"
          version="2.1.0"
          packageName="@rustpress/sdk"
          installCommands={[
            { manager: 'npm', command: 'npm install @rustpress/sdk' },
            { manager: 'yarn', command: 'yarn add @rustpress/sdk' },
            { manager: 'pnpm', command: 'pnpm add @rustpress/sdk' },
            { manager: 'bun', command: 'bun add @rustpress/sdk' },
          ]}
          description="The official JavaScript/TypeScript SDK with full type definitions, supporting both Node.js and browser environments."
        >
          <Accordion>
            <AccordionItem title="Quick Start" defaultOpen>
              <CodeBlock
                code={`import { RustpressClient } from '@rustpress/sdk';

// Initialize the client
const client = new RustpressClient({
  baseUrl: 'https://your-site.com',
  auth: {
    token: 'your_jwt_token'
  }
});

// Fetch posts
const posts = await client.posts.list({
  status: 'published',
  perPage: 10
});

console.log(posts.data);

// Create a new post
const newPost = await client.posts.create({
  title: 'Hello from SDK',
  content: '<p>This post was created using the SDK!</p>',
  status: 'draft'
});

console.log('Created post:', newPost.id);`}
                language="typescript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Authentication">
              <CodeBlock
                code={`import { RustpressClient } from '@rustpress/sdk';

// Option 1: Initialize with token
const client = new RustpressClient({
  baseUrl: 'https://your-site.com',
  auth: { token: 'your_jwt_token' }
});

// Option 2: Login to get token
const client = new RustpressClient({
  baseUrl: 'https://your-site.com'
});

const auth = await client.auth.login({
  username: 'admin',
  password: 'secure_password'
});

console.log('Access token:', auth.accessToken);
console.log('Refresh token:', auth.refreshToken);

// Token is automatically used for subsequent requests
const me = await client.users.me();

// Refresh token when expired
await client.auth.refresh();

// Logout
await client.auth.logout();`}
                language="typescript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Working with Posts">
              <CodeBlock
                code={`// List posts with filtering
const posts = await client.posts.list({
  status: 'published',
  category: 'tutorials',
  orderBy: 'date',
  order: 'desc',
  perPage: 20,
  page: 1
});

// Get single post by ID or slug
const post = await client.posts.get(123);
const postBySlug = await client.posts.getBySlug('hello-world');

// Create post
const newPost = await client.posts.create({
  title: 'My New Post',
  content: '<p>Post content here...</p>',
  excerpt: 'A brief summary',
  status: 'draft',
  categories: [1, 2],
  tags: [3, 4],
  featuredImage: 'https://...'
});

// Update post
const updated = await client.posts.update(123, {
  title: 'Updated Title',
  status: 'published'
});

// Delete post
await client.posts.delete(123);

// Bulk operations
await client.posts.bulkDelete([1, 2, 3]);
await client.posts.bulkUpdate([1, 2, 3], { status: 'draft' });`}
                language="typescript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="GraphQL Support">
              <CodeBlock
                code={`// Execute raw GraphQL queries
const result = await client.graphql.query(\`
  query GetPosts($first: Int!) {
    posts(first: $first) {
      nodes {
        id
        title
        slug
        author {
          name
        }
      }
    }
  }
\`, { first: 10 });

// Execute mutations
const mutation = await client.graphql.mutate(\`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      slug
    }
  }
\`, {
  input: {
    title: 'GraphQL Post',
    content: 'Created via GraphQL'
  }
});

// Use typed query builders
import { gql } from '@rustpress/sdk';

const POSTS_QUERY = gql\`
  query GetPosts {
    posts(first: 10) {
      nodes { id title }
    }
  }
\`;

const data = await client.graphql.execute(POSTS_QUERY);`}
                language="typescript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Media Uploads">
              <CodeBlock
                code={`// Upload from file path (Node.js)
import fs from 'fs';

const file = fs.readFileSync('./image.jpg');
const media = await client.media.upload({
  file: new Blob([file]),
  filename: 'image.jpg',
  alt: 'My image',
  caption: 'Image caption'
});

// Upload from File object (Browser)
const input = document.querySelector('input[type="file"]');
const file = input.files[0];

const media = await client.media.upload({
  file,
  alt: 'Uploaded image'
});

console.log('Uploaded:', media.url);

// List media
const mediaList = await client.media.list({
  type: 'image',
  perPage: 20
});

// Update media metadata
await client.media.update(media.id, {
  alt: 'Updated alt text',
  caption: 'New caption'
});

// Delete media
await client.media.delete(media.id);`}
                language="typescript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Webhook Handling">
              <CodeBlock
                code={`import { RustpressWebhook } from '@rustpress/sdk';

// Verify webhook signatures
const webhook = new RustpressWebhook({
  secret: process.env.WEBHOOK_SECRET
});

// Express middleware
app.post('/webhooks/rustpress', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-rustpress-signature'];
  const timestamp = req.headers['x-rustpress-timestamp'];

  try {
    const payload = webhook.verify(req.body, signature, timestamp);

    // Handle events
    switch (payload.event) {
      case 'post.published':
        console.log('New post:', payload.data.title);
        break;
      case 'comment.created':
        console.log('New comment on post:', payload.data.post_id);
        break;
    }

    res.status(200).json({ received: true });
  } catch (error) {
    res.status(401).json({ error: 'Invalid signature' });
  }
});

// Register a new webhook
const hook = await client.webhooks.create({
  url: 'https://your-app.com/webhooks',
  events: ['post.published', 'comment.created'],
  secret: 'your_webhook_secret'
});`}
                language="typescript"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </SDKSection>

        {/* Python */}
        <SDKSection
          id="python"
          title="Python"
          icon="🐍"
          color="from-blue-500 to-cyan-500"
          version="1.8.0"
          packageName="rustpress"
          installCommands={[
            { manager: 'pip', command: 'pip install rustpress' },
            { manager: 'poetry', command: 'poetry add rustpress' },
            { manager: 'pipenv', command: 'pipenv install rustpress' },
          ]}
          description="Python SDK with async support, type hints, and compatibility with popular frameworks like Django and FastAPI."
        >
          <Accordion>
            <AccordionItem title="Quick Start" defaultOpen>
              <CodeBlock
                code={`from rustpress import RustpressClient

# Initialize client
client = RustpressClient(
    base_url="https://your-site.com",
    token="your_jwt_token"
)

# Fetch posts
posts = client.posts.list(status="published", per_page=10)
for post in posts.data:
    print(f"{post.title} - {post.slug}")

# Create a new post
new_post = client.posts.create(
    title="Hello from Python",
    content="<p>Created with the Python SDK!</p>",
    status="draft"
)
print(f"Created post: {new_post.id}")`}
                language="python"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Async Support">
              <CodeBlock
                code={`import asyncio
from rustpress import AsyncRustpressClient

async def main():
    # Initialize async client
    async with AsyncRustpressClient(
        base_url="https://your-site.com",
        token="your_jwt_token"
    ) as client:
        # Concurrent requests
        posts, users, media = await asyncio.gather(
            client.posts.list(per_page=10),
            client.users.list(),
            client.media.list(type="image")
        )

        print(f"Posts: {len(posts.data)}")
        print(f"Users: {len(users.data)}")
        print(f"Media: {len(media.data)}")

        # Async iteration
        async for post in client.posts.iterate(status="published"):
            print(post.title)

asyncio.run(main())`}
                language="python"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Django Integration">
              <CodeBlock
                code={`# settings.py
RUSTPRESS_BASE_URL = "https://your-site.com"
RUSTPRESS_TOKEN = "your_jwt_token"

# views.py
from django.conf import settings
from rustpress import RustpressClient
from django.http import JsonResponse

def get_client():
    return RustpressClient(
        base_url=settings.RUSTPRESS_BASE_URL,
        token=settings.RUSTPRESS_TOKEN
    )

def blog_list(request):
    client = get_client()
    page = int(request.GET.get('page', 1))

    posts = client.posts.list(
        status="published",
        per_page=10,
        page=page
    )

    return JsonResponse({
        "posts": [p.to_dict() for p in posts.data],
        "total": posts.meta.total,
        "pages": posts.meta.last_page
    })

def blog_detail(request, slug):
    client = get_client()
    post = client.posts.get_by_slug(slug)

    if not post:
        raise Http404("Post not found")

    return JsonResponse(post.to_dict())`}
                language="python"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="FastAPI Integration">
              <CodeBlock
                code={`from fastapi import FastAPI, Depends, HTTPException
from rustpress import AsyncRustpressClient
from contextlib import asynccontextmanager

app = FastAPI()

@asynccontextmanager
async def get_client():
    async with AsyncRustpressClient(
        base_url="https://your-site.com",
        token="your_jwt_token"
    ) as client:
        yield client

@app.get("/posts")
async def list_posts(page: int = 1, per_page: int = 10):
    async with get_client() as client:
        posts = await client.posts.list(
            status="published",
            page=page,
            per_page=per_page
        )
        return {
            "data": [p.to_dict() for p in posts.data],
            "meta": posts.meta.to_dict()
        }

@app.get("/posts/{slug}")
async def get_post(slug: str):
    async with get_client() as client:
        post = await client.posts.get_by_slug(slug)
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        return post.to_dict()

@app.post("/posts")
async def create_post(title: str, content: str):
    async with get_client() as client:
        post = await client.posts.create(
            title=title,
            content=content,
            status="draft"
        )
        return post.to_dict()`}
                language="python"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="GraphQL Queries">
              <CodeBlock
                code={`from rustpress import RustpressClient

client = RustpressClient(
    base_url="https://your-site.com",
    token="your_jwt_token"
)

# Execute GraphQL query
result = client.graphql.query("""
    query GetPosts($first: Int!) {
        posts(first: $first) {
            nodes {
                id
                title
                slug
                author {
                    name
                }
            }
        }
    }
""", variables={"first": 10})

for post in result["posts"]["nodes"]:
    print(f"{post['title']} by {post['author']['name']}")

# Execute mutation
result = client.graphql.mutate("""
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            title
            slug
        }
    }
""", variables={
    "input": {
        "title": "GraphQL Post",
        "content": "Created via GraphQL",
        "status": "DRAFT"
    }
})

print(f"Created: {result['createPost']['title']}")`}
                language="python"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </SDKSection>

        {/* Rust */}
        <SDKSection
          id="rust"
          title="Rust"
          icon="🦀"
          color="from-orange-500 to-red-500"
          version="0.9.0"
          packageName="rustpress-client"
          installCommands={[
            { manager: 'cargo', command: 'cargo add rustpress-client' },
          ]}
          description="Native Rust SDK with full async support, strong typing, and zero-cost abstractions."
        >
          <Accordion>
            <AccordionItem title="Quick Start" defaultOpen>
              <CodeBlock
                code={`use rustpress_client::{RustpressClient, Config};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize client
    let client = RustpressClient::new(Config {
        base_url: "https://your-site.com".to_string(),
        token: Some("your_jwt_token".to_string()),
        ..Default::default()
    })?;

    // Fetch posts
    let posts = client.posts()
        .list()
        .status("published")
        .per_page(10)
        .send()
        .await?;

    for post in posts.data {
        println!("{} - {}", post.title, post.slug);
    }

    // Create a new post
    let new_post = client.posts()
        .create()
        .title("Hello from Rust")
        .content("<p>Created with the Rust SDK!</p>")
        .status("draft")
        .send()
        .await?;

    println!("Created post: {}", new_post.id);

    Ok(())
}`}
                language="rust"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Authentication">
              <CodeBlock
                code={`use rustpress_client::{RustpressClient, Config, AuthCredentials};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize without token
    let mut client = RustpressClient::new(Config {
        base_url: "https://your-site.com".to_string(),
        ..Default::default()
    })?;

    // Login
    let auth = client.auth()
        .login(AuthCredentials {
            username: "admin".to_string(),
            password: "secure_password".to_string(),
        })
        .await?;

    println!("Access token: {}", auth.access_token);

    // Get current user
    let me = client.users().me().await?;
    println!("Logged in as: {}", me.username);

    // Refresh token
    client.auth().refresh().await?;

    // Logout
    client.auth().logout().await?;

    Ok(())
}`}
                language="rust"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Working with Posts">
              <CodeBlock
                code={`use rustpress_client::{RustpressClient, PostStatus, CreatePostInput};

async fn post_operations(client: &RustpressClient) -> Result<(), Box<dyn std::error::Error>> {
    // List with builder pattern
    let posts = client.posts()
        .list()
        .status("published")
        .category("tutorials")
        .order_by("date")
        .order("desc")
        .per_page(20)
        .send()
        .await?;

    // Get by ID
    let post = client.posts().get(123).await?;

    // Get by slug
    let post = client.posts().get_by_slug("hello-world").await?;

    // Create post
    let new_post = client.posts()
        .create()
        .title("My Rust Post")
        .content("<p>Content here...</p>")
        .excerpt("A brief summary")
        .status("draft")
        .categories(vec![1, 2])
        .tags(vec![3, 4])
        .send()
        .await?;

    // Update post
    let updated = client.posts()
        .update(123)
        .title("Updated Title")
        .status("published")
        .send()
        .await?;

    // Delete post
    client.posts().delete(123).await?;

    Ok(())
}`}
                language="rust"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Error Handling">
              <CodeBlock
                code={`use rustpress_client::{RustpressClient, Error, ApiError};

async fn handle_errors(client: &RustpressClient) {
    match client.posts().get(999).await {
        Ok(post) => {
            println!("Found post: {}", post.title);
        }
        Err(Error::Api(ApiError { code, message, .. })) => {
            match code.as_str() {
                "NOT_FOUND" => println!("Post not found"),
                "UNAUTHORIZED" => println!("Please login first"),
                "FORBIDDEN" => println!("Access denied"),
                _ => println!("API error: {}", message),
            }
        }
        Err(Error::Network(e)) => {
            println!("Network error: {}", e);
        }
        Err(Error::Parse(e)) => {
            println!("Parse error: {}", e);
        }
        Err(e) => {
            println!("Unknown error: {}", e);
        }
    }
}`}
                language="rust"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </SDKSection>

        {/* PHP */}
        <SDKSection
          id="php"
          title="PHP"
          icon="🐘"
          color="from-indigo-500 to-purple-500"
          version="1.5.0"
          packageName="rustpress/sdk"
          installCommands={[
            { manager: 'composer', command: 'composer require rustpress/sdk' },
          ]}
          description="PHP SDK compatible with PSR-18 HTTP clients, with Laravel and Symfony integrations."
        >
          <Accordion>
            <AccordionItem title="Quick Start" defaultOpen>
              <CodeBlock
                code={`<?php

use Rustpress\\Client;

// Initialize client
$client = new Client([
    'base_url' => 'https://your-site.com',
    'token' => 'your_jwt_token'
]);

// Fetch posts
$posts = $client->posts()->list([
    'status' => 'published',
    'per_page' => 10
]);

foreach ($posts->data as $post) {
    echo "{$post->title} - {$post->slug}\\n";
}

// Create a new post
$newPost = $client->posts()->create([
    'title' => 'Hello from PHP',
    'content' => '<p>Created with the PHP SDK!</p>',
    'status' => 'draft'
]);

echo "Created post: {$newPost->id}\\n";`}
                language="php"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Laravel Integration">
              <CodeBlock
                code={`<?php

// config/rustpress.php
return [
    'base_url' => env('RUSTPRESS_URL'),
    'token' => env('RUSTPRESS_TOKEN'),
];

// app/Providers/RustpressServiceProvider.php
namespace App\\Providers;

use Illuminate\\Support\\ServiceProvider;
use Rustpress\\Client;

class RustpressServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(Client::class, function ($app) {
            return new Client([
                'base_url' => config('rustpress.base_url'),
                'token' => config('rustpress.token')
            ]);
        });
    }
}

// app/Http/Controllers/BlogController.php
namespace App\\Http\\Controllers;

use Rustpress\\Client;

class BlogController extends Controller
{
    public function __construct(
        private Client $rustpress
    ) {}

    public function index()
    {
        $posts = $this->rustpress->posts()->list([
            'status' => 'published',
            'per_page' => 10,
            'page' => request('page', 1)
        ]);

        return view('blog.index', ['posts' => $posts]);
    }

    public function show(string $slug)
    {
        $post = $this->rustpress->posts()->getBySlug($slug);

        if (!$post) {
            abort(404);
        }

        return view('blog.show', ['post' => $post]);
    }
}`}
                language="php"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Authentication">
              <CodeBlock
                code={`<?php

use Rustpress\\Client;

// Initialize without token
$client = new Client([
    'base_url' => 'https://your-site.com'
]);

// Login
$auth = $client->auth()->login([
    'username' => 'admin',
    'password' => 'secure_password'
]);

echo "Access token: {$auth->accessToken}\\n";
echo "Refresh token: {$auth->refreshToken}\\n";

// Get current user
$me = $client->users()->me();
echo "Logged in as: {$me->username}\\n";

// Refresh token
$client->auth()->refresh();

// Logout
$client->auth()->logout();`}
                language="php"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </SDKSection>

        {/* Go */}
        <SDKSection
          id="go"
          title="Go"
          icon="🐹"
          color="from-cyan-500 to-blue-500"
          version="1.2.0"
          packageName="github.com/rustpress/go-sdk"
          installCommands={[
            { manager: 'go', command: 'go get github.com/rustpress/go-sdk' },
          ]}
          description="Go SDK with context support, automatic retries, and connection pooling."
        >
          <Accordion>
            <AccordionItem title="Quick Start" defaultOpen>
              <CodeBlock
                code={`package main

import (
    "context"
    "fmt"
    "log"

    "github.com/rustpress/go-sdk"
)

func main() {
    // Initialize client
    client, err := rustpress.NewClient(&rustpress.Config{
        BaseURL: "https://your-site.com",
        Token:   "your_jwt_token",
    })
    if err != nil {
        log.Fatal(err)
    }

    ctx := context.Background()

    // Fetch posts
    posts, err := client.Posts.List(ctx, &rustpress.PostListOptions{
        Status:  "published",
        PerPage: 10,
    })
    if err != nil {
        log.Fatal(err)
    }

    for _, post := range posts.Data {
        fmt.Printf("%s - %s\\n", post.Title, post.Slug)
    }

    // Create a new post
    newPost, err := client.Posts.Create(ctx, &rustpress.CreatePostInput{
        Title:   "Hello from Go",
        Content: "<p>Created with the Go SDK!</p>",
        Status:  "draft",
    })
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Created post: %d\\n", newPost.ID)
}`}
                language="go"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Authentication">
              <CodeBlock
                code={`package main

import (
    "context"
    "fmt"
    "log"

    "github.com/rustpress/go-sdk"
)

func main() {
    ctx := context.Background()

    // Initialize without token
    client, _ := rustpress.NewClient(&rustpress.Config{
        BaseURL: "https://your-site.com",
    })

    // Login
    auth, err := client.Auth.Login(ctx, &rustpress.LoginInput{
        Username: "admin",
        Password: "secure_password",
    })
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Access token: %s\\n", auth.AccessToken)

    // Get current user
    me, err := client.Users.Me(ctx)
    if err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Logged in as: %s\\n", me.Username)

    // Refresh token
    if err := client.Auth.Refresh(ctx); err != nil {
        log.Fatal(err)
    }

    // Logout
    if err := client.Auth.Logout(ctx); err != nil {
        log.Fatal(err)
    }
}`}
                language="go"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Error Handling">
              <CodeBlock
                code={`package main

import (
    "context"
    "errors"
    "fmt"

    "github.com/rustpress/go-sdk"
)

func main() {
    ctx := context.Background()
    client, _ := rustpress.NewClient(&rustpress.Config{
        BaseURL: "https://your-site.com",
        Token:   "your_jwt_token",
    })

    post, err := client.Posts.Get(ctx, 999)
    if err != nil {
        var apiErr *rustpress.APIError
        if errors.As(err, &apiErr) {
            switch apiErr.Code {
            case "NOT_FOUND":
                fmt.Println("Post not found")
            case "UNAUTHORIZED":
                fmt.Println("Please login first")
            case "FORBIDDEN":
                fmt.Println("Access denied")
            default:
                fmt.Printf("API error: %s\\n", apiErr.Message)
            }
        } else {
            fmt.Printf("Error: %v\\n", err)
        }
        return
    }

    fmt.Printf("Found post: %s\\n", post.Title)
}`}
                language="go"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </SDKSection>

        {/* Ruby */}
        <SDKSection
          id="ruby"
          title="Ruby"
          icon="💎"
          color="from-red-500 to-pink-500"
          version="1.3.0"
          packageName="rustpress"
          installCommands={[
            { manager: 'gem', command: 'gem install rustpress' },
            { manager: 'bundler', command: "gem 'rustpress', '~> 1.3'" },
          ]}
          description="Ruby SDK with Rails integration, async support via concurrent-ruby, and ActiveRecord-like syntax."
        >
          <Accordion>
            <AccordionItem title="Quick Start" defaultOpen>
              <CodeBlock
                code={`require 'rustpress'

# Initialize client
client = Rustpress::Client.new(
  base_url: 'https://your-site.com',
  token: 'your_jwt_token'
)

# Fetch posts
posts = client.posts.list(status: 'published', per_page: 10)

posts.data.each do |post|
  puts "#{post.title} - #{post.slug}"
end

# Create a new post
new_post = client.posts.create(
  title: 'Hello from Ruby',
  content: '<p>Created with the Ruby SDK!</p>',
  status: 'draft'
)

puts "Created post: #{new_post.id}"`}
                language="ruby"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Rails Integration">
              <CodeBlock
                code={`# config/initializers/rustpress.rb
Rustpress.configure do |config|
  config.base_url = ENV['RUSTPRESS_URL']
  config.token = ENV['RUSTPRESS_TOKEN']
end

# app/controllers/blog_controller.rb
class BlogController < ApplicationController
  def index
    @posts = rustpress.posts.list(
      status: 'published',
      per_page: 10,
      page: params[:page] || 1
    )
  end

  def show
    @post = rustpress.posts.find_by_slug(params[:slug])
    raise ActiveRecord::RecordNotFound unless @post
  end

  private

  def rustpress
    @rustpress ||= Rustpress::Client.new
  end
end

# app/views/blog/index.html.erb
<% @posts.data.each do |post| %>
  <article>
    <h2><%= link_to post.title, blog_post_path(post.slug) %></h2>
    <p><%= post.excerpt %></p>
  </article>
<% end %>

<%= paginate @posts %>`}
                language="ruby"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="ActiveRecord-like Syntax">
              <CodeBlock
                code={`require 'rustpress'

client = Rustpress::Client.new(
  base_url: 'https://your-site.com',
  token: 'your_jwt_token'
)

# Chained queries
posts = client.posts
  .where(status: 'published')
  .where(category: 'tutorials')
  .order(date: :desc)
  .limit(20)
  .all

# Find methods
post = client.posts.find(123)
post = client.posts.find_by(slug: 'hello-world')
post = client.posts.find_by!(slug: 'hello-world')  # raises if not found

# First and last
latest = client.posts.where(status: 'published').order(date: :desc).first
oldest = client.posts.where(status: 'published').order(date: :asc).first

# Create, update, destroy
post = client.posts.create!(
  title: 'New Post',
  content: 'Content here'
)

post.update!(title: 'Updated Title')
post.destroy!

# Associations
post = client.posts.find(123)
comments = post.comments.all
author = post.author`}
                language="ruby"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </SDKSection>

        {/* Community SDKs */}
        <section className="mb-12">
          <h2 id="community" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Community SDKs</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Community-maintained SDKs for additional languages. These are not officially supported but are well-maintained
            by the community.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'rustpress-swift', language: 'Swift / iOS', author: 'swiftdev', stars: 234, icon: '🍎' },
              { name: 'rustpress-kotlin', language: 'Kotlin / Android', author: 'kotlindev', stars: 189, icon: '🤖' },
              { name: 'rustpress-dotnet', language: 'C# / .NET', author: 'dotnetdev', stars: 156, icon: '🔷' },
              { name: 'rustpress-elixir', language: 'Elixir', author: 'elixirdev', stars: 98, icon: '💧' },
              { name: 'rustpress-dart', language: 'Dart / Flutter', author: 'flutterdev', stars: 145, icon: '🎯' },
              { name: 'rustpress-java', language: 'Java', author: 'javadev', stars: 112, icon: '☕' },
            ].map((sdk) => (
              <motion.div
                key={sdk.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-rust-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{sdk.icon}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{sdk.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Github className="w-4 h-4" />
                    {sdk.stars}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{sdk.language}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">by @{sdk.author}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Want to contribute?</strong> If you've built an SDK for a language not listed here,
              we'd love to feature it! Submit a PR to our{' '}
              <a href="#" className="text-rust-600 hover:underline">awesome-rustpress</a> repository.
            </p>
          </div>
        </section>

        {/* Common Patterns */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Common Patterns</h2>
          <Accordion>
            <AccordionItem title="Pagination" defaultOpen>
              <CodeBlock
                code={`// JavaScript - Iterate through all pages
async function* getAllPosts(client) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await client.posts.list({
      page,
      perPage: 100,
      status: 'published'
    });

    for (const post of response.data) {
      yield post;
    }

    hasMore = response.meta.currentPage < response.meta.lastPage;
    page++;
  }
}

// Usage
for await (const post of getAllPosts(client)) {
  console.log(post.title);
}`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Caching">
              <CodeBlock
                code={`// JavaScript with simple cache
class CachedClient {
  constructor(client, ttl = 60000) {
    this.client = client;
    this.cache = new Map();
    this.ttl = ttl;
  }

  async getPost(id) {
    const key = \`post:\${id}\`;
    const cached = this.cache.get(key);

    if (cached && Date.now() < cached.expires) {
      return cached.data;
    }

    const post = await this.client.posts.get(id);
    this.cache.set(key, {
      data: post,
      expires: Date.now() + this.ttl
    });

    return post;
  }

  invalidate(pattern) {
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Rate Limiting">
              <CodeBlock
                code={`// JavaScript with rate limiting
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck({
  maxConcurrent: 5,
  minTime: 100 // 10 requests per second
});

// Wrap client methods
const rateLimitedClient = {
  posts: {
    list: (options) => limiter.schedule(() =>
      client.posts.list(options)
    ),
    get: (id) => limiter.schedule(() =>
      client.posts.get(id)
    ),
    create: (data) => limiter.schedule(() =>
      client.posts.create(data)
    )
  }
};

// Usage
const posts = await rateLimitedClient.posts.list({ perPage: 100 });`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Retry Logic">
              <CodeBlock
                code={`// JavaScript with exponential backoff
async function withRetry(fn, maxRetries = 3) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry client errors (4xx)
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Usage
const post = await withRetry(() =>
  client.posts.get(123)
);`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/api/webhooks" className="text-gray-600 hover:text-rust-600">
            ← Webhooks
          </Link>
          <Link to="/docs/api/authentication" className="flex items-center gap-2 text-rust-600">
            Authentication <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
