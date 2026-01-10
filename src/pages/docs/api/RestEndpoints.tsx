import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Users, Image, Settings, Tag, MessageSquare, Lock, BarChart3, Activity, Palette, Puzzle, Search, HardDrive, Globe, Zap, Mail, Key, Menu, LayoutGrid } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'health', title: 'Health & System', level: 2 },
  { id: 'auth', title: 'Authentication', level: 2 },
  { id: 'users', title: 'Users', level: 2 },
  { id: 'posts', title: 'Posts', level: 2 },
  { id: 'pages', title: 'Pages', level: 2 },
  { id: 'media', title: 'Media', level: 2 },
  { id: 'taxonomies', title: 'Taxonomies', level: 2 },
  { id: 'comments', title: 'Comments', level: 2 },
  { id: 'menus', title: 'Menus', level: 2 },
  { id: 'widgets', title: 'Widgets', level: 2 },
  { id: 'themes', title: 'Themes', level: 2 },
  { id: 'plugins', title: 'Plugins', level: 2 },
  { id: 'settings', title: 'Settings', level: 2 },
  { id: 'search', title: 'Search', level: 2 },
  { id: 'backup', title: 'Backup', level: 2 },
  { id: 'seo', title: 'SEO', level: 2 },
  { id: 'cache', title: 'Cache', level: 2 },
  { id: 'cdn', title: 'CDN', level: 2 },
  { id: 'stats', title: 'Stats & Dashboard', level: 2 },
  { id: 'email', title: 'Email', level: 2 },
  { id: 'credentials', title: 'Credentials', level: 2 },
];

interface EndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  auth?: boolean;
  params?: { name: string; type: string; description: string }[];
  response?: string;
}

function Endpoint({ method, path, description, auth, params, response }: EndpointProps) {
  const methodColors = {
    GET: 'bg-green-500',
    POST: 'bg-blue-500',
    PUT: 'bg-yellow-500',
    PATCH: 'bg-orange-500',
    DELETE: 'bg-red-500',
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden mb-4">
      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900">
        <span className={`px-2.5 py-1 text-xs font-bold text-white rounded ${methodColors[method]}`}>
          {method}
        </span>
        <code className="font-mono text-sm text-gray-800 dark:text-gray-200">{path}</code>
        {auth && (
          <span className="ml-auto flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
            <Lock className="w-3 h-3" />
            Auth Required
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{description}</p>
        {params && params.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Parameters</p>
            <div className="space-y-1">
              {params.map((param) => (
                <div key={param.name} className="flex items-baseline gap-2 text-sm">
                  <code className="text-rust-600 dark:text-rust-400">{param.name}</code>
                  <span className="text-gray-400">({param.type})</span>
                  <span className="text-gray-600 dark:text-gray-400">- {param.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {response && (
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Response</p>
            <CodeBlock code={response} language="json" showLineNumbers={false} />
          </div>
        )}
      </div>
    </div>
  );
}

function EndpointSection({
  id,
  title,
  icon,
  description,
  children
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
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
        <div className="w-10 h-10 rounded-xl bg-rust-500/10 dark:bg-rust-500/20 flex items-center justify-center text-rust-500">
          {icon}
        </div>
        <div>
          <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

export function RestEndpoints() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">REST API Endpoints</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete reference for all Rustpress REST API endpoints with parameters and response examples.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The Rustpress REST API provides programmatic access to your site's content and settings.
            All endpoints return JSON, use standard HTTP methods, and <strong>require authentication</strong>.
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Base URL</p>
            <code className="text-rust-600 dark:text-rust-400">https://your-site.com/api/v1</code>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Content-Type</p>
              <code className="text-sm text-gray-600 dark:text-gray-400">application/json</code>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Authentication</p>
              <code className="text-sm text-gray-600 dark:text-gray-400">Bearer Token (JWT) - Required for all endpoints</code>
            </div>
          </div>

          {/* Authentication Header */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Authentication Header (Required)</p>
            <CodeBlock
              code={`// All API requests must include the Authorization header
fetch('https://your-site.com/api/v1/posts', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'Content-Type': 'application/json'
  }
});`}
              language="javascript"
              showLineNumbers={false}
            />
          </div>

          {/* Rate Limiting */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Rate Limiting</p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
                API requests are rate limited to protect server resources:
              </p>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>• <strong>1000 requests/hour</strong> for authenticated users</li>
                <li>• <strong>100 requests/hour</strong> for unauthenticated requests</li>
                <li>• Rate limit headers: <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">X-RateLimit-Limit</code>, <code className="bg-amber-100 dark:bg-amber-900 px-1 rounded">X-RateLimit-Remaining</code></li>
              </ul>
            </div>
          </div>

          {/* HTTP Status Codes */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">HTTP Status Codes</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded">200</span>
                <span className="text-sm text-green-700 dark:text-green-300">OK - Request successful</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded">201</span>
                <span className="text-sm text-green-700 dark:text-green-300">Created - Resource created</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-bold rounded">400</span>
                <span className="text-sm text-yellow-700 dark:text-yellow-300">Bad Request - Invalid parameters</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">401</span>
                <span className="text-sm text-red-700 dark:text-red-300">Unauthorized - Invalid or missing token</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">403</span>
                <span className="text-sm text-red-700 dark:text-red-300">Forbidden - Insufficient permissions</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">404</span>
                <span className="text-sm text-red-700 dark:text-red-300">Not Found - Resource not found</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded">429</span>
                <span className="text-sm text-orange-700 dark:text-orange-300">Too Many Requests - Rate limited</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">500</span>
                <span className="text-sm text-red-700 dark:text-red-300">Server Error - Internal error</span>
              </div>
            </div>
          </div>

          {/* Error Response Format */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Error Response Format</p>
            <CodeBlock
              code={`{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired authentication token",
    "details": {
      "field": "Authorization",
      "reason": "Token has expired. Please refresh your token."
    }
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2024-01-15T10:00:00Z"
  }
}`}
              language="json"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Health & System */}
        <EndpointSection
          id="health"
          title="Health & System"
          icon={<Activity className="w-5 h-5" />}
          description="Health checks and system monitoring"
        >
          <Endpoint method="GET" path="/health" description="Basic health check status." />
          <Endpoint method="GET" path="/health/live" description="Liveness probe - confirms the server is running." />
          <Endpoint method="GET" path="/health/ready" description="Readiness probe - confirms database and dependencies are available." />
          <Endpoint method="GET" path="/metrics" description="Prometheus-format metrics endpoint." />
        </EndpointSection>

        {/* Authentication - moved earlier */}
        <EndpointSection
          id="auth"
          title="Authentication"
          icon={<Lock className="w-5 h-5" />}
          description="User authentication endpoints"
        >
          <Endpoint
            method="POST"
            path="/api/v1/auth/login"
            description="Authenticate and receive JWT tokens."
            params={[
              { name: 'username', type: 'string', description: 'Username or email' },
              { name: 'password', type: 'string', description: 'Password' },
            ]}
            response={`{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "dGhpcyBpcyBhIHJlZnJl...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@example.com",
      "role": "administrator"
    }
  }
}`}
          />
          <Endpoint method="POST" path="/api/v1/auth/logout" description="Invalidate sessions and logout." auth />
          <Endpoint
            method="POST"
            path="/api/v1/auth/refresh"
            description="Refresh an expired access token."
            params={[{ name: 'refresh_token', type: 'string', description: 'The refresh token' }]}
          />
          <Endpoint
            method="POST"
            path="/api/v1/auth/register"
            description="Register a new user (if registration is enabled)."
            params={[
              { name: 'username', type: 'string', description: 'Desired username' },
              { name: 'email', type: 'string', description: 'Email address' },
              { name: 'password', type: 'string', description: 'Password (min 8 characters)' },
            ]}
          />
          <Endpoint
            method="POST"
            path="/api/v1/auth/forgot-password"
            description="Request a password reset token."
            params={[{ name: 'email', type: 'string', description: 'Account email address' }]}
          />
          <Endpoint
            method="POST"
            path="/api/v1/auth/reset-password"
            description="Reset password using a token."
            params={[
              { name: 'token', type: 'string', description: 'Reset token from email' },
              { name: 'password', type: 'string', description: 'New password' },
            ]}
          />
          <Endpoint method="GET" path="/api/v1/auth/me" description="Get current authenticated user." auth />
        </EndpointSection>

        {/* Users */}
        <EndpointSection
          id="users"
          title="Users"
          icon={<Users className="w-5 h-5" />}
          description="User management endpoints"
        >
          <Endpoint
            method="GET"
            path="/api/v1/users"
            description="List all users (paginated). Requires list_users capability."
            auth
            params={[
              { name: 'page', type: 'number', description: 'Page number' },
              { name: 'per_page', type: 'number', description: 'Items per page' },
              { name: 'role', type: 'string', description: 'Filter by role' },
              { name: 'search', type: 'string', description: 'Search by name or email' },
            ]}
          />
          <Endpoint method="POST" path="/api/v1/users" description="Create a new user (admin only)." auth />
          <Endpoint method="GET" path="/api/v1/users/:id" description="Get a user's profile." auth />
          <Endpoint method="PUT" path="/api/v1/users/:id" description="Update user details." auth />
          <Endpoint method="DELETE" path="/api/v1/users/:id" description="Delete a user (admin only)." auth />
          <Endpoint method="PUT" path="/api/v1/users/:id/roles" description="Update user roles." auth />
        </EndpointSection>

        {/* Posts */}
        <EndpointSection
          id="posts"
          title="Posts"
          icon={<FileText className="w-5 h-5" />}
          description="Create, read, update, and delete blog posts"
        >
          <Endpoint
            method="GET"
            path="/api/v1/posts"
            description="Retrieve a paginated list of posts with optional filtering and search."
            auth
            params={[
              { name: 'page', type: 'number', description: 'Page number (default: 1)' },
              { name: 'per_page', type: 'number', description: 'Items per page (default: 10, max: 100)' },
              { name: 'status', type: 'string', description: 'Filter by status: published, draft, pending' },
              { name: 'category', type: 'string', description: 'Filter by category slug' },
              { name: 'tag', type: 'string', description: 'Filter by tag slug' },
              { name: 'author', type: 'number', description: 'Filter by author ID' },
              { name: 'search', type: 'string', description: 'Search in title and content' },
              { name: 'order_by', type: 'string', description: 'Sort field: date, title, views' },
              { name: 'order', type: 'string', description: 'Sort order: asc, desc' },
            ]}
            response={`{
  "data": [
    {
      "id": 1,
      "title": "Getting Started with Rustpress",
      "slug": "getting-started-with-rustpress",
      "excerpt": "Learn how to build your first site...",
      "content": "Full post content...",
      "status": "published",
      "featured_image": "https://...",
      "author": { "id": 1, "name": "Admin" },
      "categories": [{ "id": 1, "name": "Tutorials" }],
      "tags": [{ "id": 1, "name": "rust" }],
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 10,
    "total": 48
  }
}`}
          />
          <Endpoint
            method="GET"
            path="/api/v1/posts/:id"
            description="Retrieve a single post by ID or slug."
            auth
            params={[
              { name: 'id', type: 'number|string', description: 'Post ID or slug' },
            ]}
          />
          <Endpoint
            method="POST"
            path="/api/v1/posts"
            description="Create a new post. Requires authentication and create_posts capability."
            auth
            params={[
              { name: 'title', type: 'string', description: 'Post title (required)' },
              { name: 'content', type: 'string', description: 'Post content (required)' },
              { name: 'excerpt', type: 'string', description: 'Post excerpt (optional)' },
              { name: 'status', type: 'string', description: 'Status: draft, published, pending' },
              { name: 'featured_image', type: 'string', description: 'Featured image URL' },
              { name: 'categories', type: 'number[]', description: 'Array of category IDs' },
              { name: 'tags', type: 'number[]', description: 'Array of tag IDs' },
              { name: 'meta', type: 'object', description: 'Custom meta fields' },
            ]}
          />
          <Endpoint
            method="PUT"
            path="/api/v1/posts/:id"
            description="Update an existing post. Requires authentication and edit_posts capability."
            auth
            params={[
              { name: 'title', type: 'string', description: 'Updated title' },
              { name: 'content', type: 'string', description: 'Updated content' },
              { name: 'status', type: 'string', description: 'Updated status' },
            ]}
          />
          <Endpoint
            method="DELETE"
            path="/api/v1/posts/:id"
            description="Delete a post. Requires authentication and delete_posts capability."
            auth
          />
          <Endpoint method="POST" path="/api/v1/posts/bulk-delete" description="Bulk delete multiple posts by IDs." auth />
          <Endpoint method="POST" path="/api/v1/posts/:id/publish" description="Publish a draft post." auth />
          <Endpoint method="POST" path="/api/v1/posts/:id/unpublish" description="Unpublish a post back to draft." auth />
          <Endpoint method="POST" path="/api/v1/posts/:id/duplicate" description="Create a duplicate copy of a post." auth />
        </EndpointSection>

        {/* Pages */}
        <EndpointSection
          id="pages"
          title="Pages"
          icon={<FileText className="w-5 h-5" />}
          description="Manage static pages"
        >
          <Endpoint method="GET" path="/api/v1/pages" description="List all pages with optional filtering." auth />
          <Endpoint method="GET" path="/api/v1/pages/:id" description="Get a single page by ID or slug." auth />
          <Endpoint method="POST" path="/api/v1/pages" description="Create a new page." auth />
          <Endpoint method="PUT" path="/api/v1/pages/:id" description="Update an existing page." auth />
          <Endpoint method="DELETE" path="/api/v1/pages/:id" description="Delete a page." auth />
        </EndpointSection>

        {/* Media */}
        <EndpointSection
          id="media"
          title="Media"
          icon={<Image className="w-5 h-5" />}
          description="Upload and manage media files"
        >
          <Endpoint
            method="GET"
            path="/api/v1/media"
            description="List all media files."
            auth
            params={[
              { name: 'type', type: 'string', description: 'Filter by type: image, video, audio, document' },
              { name: 'search', type: 'string', description: 'Search by filename or alt text' },
            ]}
          />
          <Endpoint method="GET" path="/api/v1/media/:id" description="Get media file details." auth />
          <Endpoint
            method="POST"
            path="/api/v1/media"
            description="Upload a new media file. Use multipart/form-data."
            auth
            params={[
              { name: 'file', type: 'file', description: 'The file to upload (required)' },
              { name: 'alt_text', type: 'string', description: 'Alt text for accessibility' },
              { name: 'caption', type: 'string', description: 'Media caption' },
            ]}
          />
          <Endpoint method="PUT" path="/api/v1/media/:id" description="Update media metadata." auth />
          <Endpoint method="DELETE" path="/api/v1/media/:id" description="Delete a media file." auth />
        </EndpointSection>

        {/* Taxonomies (Categories & Tags) */}
        <EndpointSection
          id="taxonomies"
          title="Taxonomies"
          icon={<Tag className="w-5 h-5" />}
          description="Manage categories and tags"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">Categories</p>
          <Endpoint method="GET" path="/api/v1/taxonomies/categories" description="List all categories." auth />
          <Endpoint method="POST" path="/api/v1/taxonomies/categories" description="Create a new category." auth />
          <Endpoint method="GET" path="/api/v1/taxonomies/categories/:id" description="Get category details." auth />
          <Endpoint method="PUT" path="/api/v1/taxonomies/categories/:id" description="Update a category." auth />
          <Endpoint method="DELETE" path="/api/v1/taxonomies/categories/:id" description="Delete a category." auth />
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 mt-6 font-medium">Tags</p>
          <Endpoint method="GET" path="/api/v1/taxonomies/tags" description="List all tags." auth />
          <Endpoint method="POST" path="/api/v1/taxonomies/tags" description="Create a new tag." auth />
          <Endpoint method="GET" path="/api/v1/taxonomies/tags/:id" description="Get tag details." auth />
          <Endpoint method="PUT" path="/api/v1/taxonomies/tags/:id" description="Update a tag." auth />
          <Endpoint method="DELETE" path="/api/v1/taxonomies/tags/:id" description="Delete a tag." auth />
        </EndpointSection>

        {/* Comments */}
        <EndpointSection
          id="comments"
          title="Comments"
          icon={<MessageSquare className="w-5 h-5" />}
          description="Manage comments on posts"
        >
          <Endpoint method="GET" path="/api/v1/comments" description="List all comments (paginated, with filtering)." auth />
          <Endpoint method="POST" path="/api/v1/comments" description="Create/submit a new comment." auth />
          <Endpoint method="POST" path="/api/v1/comments/batch" description="Batch moderate multiple comments." auth />
          <Endpoint method="GET" path="/api/v1/comments/counts" description="Get comment counts by status." auth />
          <Endpoint method="GET" path="/api/v1/comments/:id" description="Get a specific comment." auth />
          <Endpoint method="PUT" path="/api/v1/comments/:id" description="Update a comment." auth />
          <Endpoint method="DELETE" path="/api/v1/comments/:id" description="Delete a comment." auth />
          <Endpoint method="POST" path="/api/v1/comments/:id/approve" description="Approve a pending comment." auth />
          <Endpoint method="POST" path="/api/v1/comments/:id/spam" description="Mark a comment as spam." auth />
          <Endpoint method="POST" path="/api/v1/comments/:id/trash" description="Move comment to trash." auth />
          <Endpoint method="POST" path="/api/v1/comments/:id/like" description="Toggle like on a comment." auth />
        </EndpointSection>

        {/* Menus */}
        <EndpointSection
          id="menus"
          title="Menus"
          icon={<Menu className="w-5 h-5" />}
          description="Navigation menu management"
        >
          <Endpoint method="GET" path="/api/v1/menus" description="List all menus." auth />
          <Endpoint method="POST" path="/api/v1/menus" description="Create a new menu." auth />
          <Endpoint method="GET" path="/api/v1/menus/:id" description="Get menu details." auth />
          <Endpoint method="PUT" path="/api/v1/menus/:id" description="Update a menu." auth />
          <Endpoint method="DELETE" path="/api/v1/menus/:id" description="Delete a menu." auth />
          <Endpoint method="GET" path="/api/v1/menus/:id/items" description="Get menu items in hierarchy." auth />
          <Endpoint method="PUT" path="/api/v1/menus/:id/items" description="Update all menu items (reorder/modify)." auth />
        </EndpointSection>

        {/* Widgets */}
        <EndpointSection
          id="widgets"
          title="Widgets"
          icon={<LayoutGrid className="w-5 h-5" />}
          description="Widget and sidebar management"
        >
          <Endpoint method="GET" path="/api/v1/widgets" description="List available widget types." auth />
          <Endpoint method="GET" path="/api/v1/widgets/areas" description="List widget areas/sidebars." auth />
          <Endpoint method="GET" path="/api/v1/widgets/areas/:area_id" description="Get widget area with its widgets." auth />
          <Endpoint method="PUT" path="/api/v1/widgets/areas/:area_id" description="Update widget area (reorder widgets)." auth />
          <Endpoint method="GET" path="/api/v1/widgets/:id" description="Get widget details." auth />
          <Endpoint method="PUT" path="/api/v1/widgets/:id" description="Update widget settings." auth />
          <Endpoint method="DELETE" path="/api/v1/widgets/:id" description="Delete a widget." auth />
        </EndpointSection>

        {/* Themes */}
        <EndpointSection
          id="themes"
          title="Themes"
          icon={<Palette className="w-5 h-5" />}
          description="Theme management and customization"
        >
          <Endpoint method="GET" path="/api/v1/themes" description="List all installed themes." auth />
          <Endpoint method="POST" path="/api/v1/themes" description="Scan for new/updated themes." auth />
          <Endpoint method="POST" path="/api/v1/themes/upload" description="Upload and install theme from ZIP." auth />
          <Endpoint method="POST" path="/api/v1/themes/validate" description="Validate theme ZIP without installing." auth />
          <Endpoint method="GET" path="/api/v1/themes/available" description="Get available default themes." auth />
          <Endpoint method="GET" path="/api/v1/themes/active" description="Get currently active theme." auth />
          <Endpoint method="GET" path="/api/v1/themes/:theme_id" description="Get specific theme details." auth />
          <Endpoint method="DELETE" path="/api/v1/themes/:theme_id" description="Delete/uninstall a theme." auth />
          <Endpoint method="POST" path="/api/v1/themes/:theme_id/activate" description="Activate a theme." auth />
          <Endpoint method="POST" path="/api/v1/themes/:theme_id/update" description="Update theme from ZIP." auth />
          <Endpoint method="GET" path="/api/v1/themes/:theme_id/export" description="Export theme as ZIP." auth />
          <Endpoint method="GET" path="/api/v1/themes/:theme_id/settings" description="Get theme settings/customizer schema." auth />
          <Endpoint method="PUT" path="/api/v1/themes/:theme_id/settings" description="Update theme settings." auth />
          <Endpoint method="GET" path="/api/v1/themes/:theme_id/menus" description="Get theme menu assignments." auth />
          <Endpoint method="PUT" path="/api/v1/themes/:theme_id/menus" description="Update theme menu assignments." auth />
          <Endpoint method="GET" path="/api/v1/themes/:theme_id/widgets" description="Get theme widget assignments." auth />
          <Endpoint method="PUT" path="/api/v1/themes/:theme_id/widgets" description="Update theme widget assignments." auth />
          <Endpoint method="POST" path="/api/v1/themes/:theme_id/preview" description="Create theme preview session." auth />
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 mt-6 font-medium">Theme Registry</p>
          <Endpoint method="GET" path="/api/v1/themes/registry" description="List all themes from registry sources." auth />
          <Endpoint method="GET" path="/api/v1/themes/registry/search" description="Search registry themes." auth />
          <Endpoint method="GET" path="/api/v1/themes/registry/:source/:theme_id" description="Get registry theme details." auth />
          <Endpoint method="POST" path="/api/v1/themes/registry/:source/:theme_id/install" description="Install from registry." auth />
          <Endpoint method="POST" path="/api/v1/themes/install/github" description="Install theme from GitHub URL." auth />
        </EndpointSection>

        {/* Plugins */}
        <EndpointSection
          id="plugins"
          title="Plugins"
          icon={<Puzzle className="w-5 h-5" />}
          description="Plugin management"
        >
          <Endpoint method="GET" path="/api/v1/plugins" description="List all installed plugins." auth />
          <Endpoint method="POST" path="/api/v1/plugins" description="Install a new plugin." auth />
          <Endpoint method="GET" path="/api/v1/plugins/:id" description="Get plugin details." auth />
          <Endpoint method="DELETE" path="/api/v1/plugins/:id" description="Uninstall a plugin." auth />
          <Endpoint method="POST" path="/api/v1/plugins/:id/activate" description="Activate a plugin." auth />
          <Endpoint method="POST" path="/api/v1/plugins/:id/deactivate" description="Deactivate a plugin." auth />
        </EndpointSection>

        {/* Settings */}
        <EndpointSection
          id="settings"
          title="Settings"
          icon={<Settings className="w-5 h-5" />}
          description="Site configuration endpoints"
        >
          <Endpoint method="GET" path="/api/v1/settings" description="List all settings (grouped)." auth />
          <Endpoint method="PUT" path="/api/v1/settings/batch" description="Batch update multiple settings." auth />
          <Endpoint method="GET" path="/api/v1/settings/groups/:group" description="Get settings by group name." auth />
          <Endpoint method="GET" path="/api/v1/settings/:key" description="Get single setting by key." auth />
          <Endpoint method="PUT" path="/api/v1/settings/:key" description="Update single setting." auth />
        </EndpointSection>

        {/* Search */}
        <EndpointSection
          id="search"
          title="Search"
          icon={<Search className="w-5 h-5" />}
          description="Full-text search functionality"
        >
          <Endpoint method="GET" path="/api/v1/search" description="Full-text search posts and pages." auth />
          <Endpoint method="GET" path="/api/v1/search/suggest" description="Get search suggestions (autocomplete)." auth />
          <Endpoint method="POST" path="/api/v1/search/reindex" description="Trigger search index rebuild." auth />
          <Endpoint method="GET" path="/api/v1/search/stats" description="Get search statistics." auth />
        </EndpointSection>

        {/* Backup */}
        <EndpointSection
          id="backup"
          title="Backup"
          icon={<HardDrive className="w-5 h-5" />}
          description="Backup and restore functionality"
        >
          <Endpoint method="GET" path="/api/v1/backups" description="List all backups (paginated)." auth />
          <Endpoint method="POST" path="/api/v1/backups" description="Create a new backup." auth />
          <Endpoint method="GET" path="/api/v1/backups/storage" description="Get backup storage usage." auth />
          <Endpoint method="GET" path="/api/v1/backups/:id" description="Get backup details." auth />
          <Endpoint method="DELETE" path="/api/v1/backups/:id" description="Delete a backup." auth />
          <Endpoint method="GET" path="/api/v1/backups/:id/download" description="Download backup file." auth />
          <Endpoint method="POST" path="/api/v1/backups/:id/restore" description="Restore from backup." auth />
          <Endpoint method="GET" path="/api/v1/backups/restore/:job_id" description="Get restore job progress." auth />
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 mt-6 font-medium">Backup Schedules</p>
          <Endpoint method="GET" path="/api/v1/backups/schedules" description="List backup schedules." auth />
          <Endpoint method="POST" path="/api/v1/backups/schedules" description="Create backup schedule." auth />
          <Endpoint method="GET" path="/api/v1/backups/schedules/:id" description="Get schedule details." auth />
          <Endpoint method="PUT" path="/api/v1/backups/schedules/:id" description="Update schedule." auth />
          <Endpoint method="DELETE" path="/api/v1/backups/schedules/:id" description="Delete schedule." auth />
        </EndpointSection>

        {/* SEO */}
        <EndpointSection
          id="seo"
          title="SEO"
          icon={<Globe className="w-5 h-5" />}
          description="Search engine optimization tools"
        >
          <Endpoint method="GET" path="/api/v1/seo/settings" description="Get SEO settings." auth />
          <Endpoint method="PUT" path="/api/v1/seo/settings" description="Update SEO settings." auth />
          <Endpoint method="GET" path="/api/v1/seo/sitemap" description="Get sitemap status." auth />
          <Endpoint method="POST" path="/api/v1/seo/sitemap/generate" description="Generate/regenerate sitemap." auth />
          <Endpoint method="GET" path="/api/v1/seo/robots" description="Get robots.txt content." auth />
          <Endpoint method="PUT" path="/api/v1/seo/robots" description="Update robots.txt." auth />
          <Endpoint method="POST" path="/api/v1/seo/analyze" description="Analyze content for SEO score." auth />
          <Endpoint method="POST" path="/api/v1/seo/bulk-analyze" description="Bulk analyze multiple content items." auth />
          <Endpoint method="GET" path="/api/v1/seo/dashboard" description="Get SEO dashboard statistics." auth />
          <Endpoint method="GET" path="/api/v1/seo/:content_type/:id" description="Get SEO metadata for content." auth />
          <Endpoint method="PUT" path="/api/v1/seo/:content_type/:id" description="Update SEO metadata for content." auth />
        </EndpointSection>

        {/* Cache */}
        <EndpointSection
          id="cache"
          title="Cache"
          icon={<Zap className="w-5 h-5" />}
          description="Cache management"
        >
          <Endpoint method="GET" path="/api/v1/cache/stats" description="Get cache statistics and hit rate." auth />
          <Endpoint method="POST" path="/api/v1/cache/clear" description="Clear all cache." auth />
          <Endpoint method="POST" path="/api/v1/cache/clear/:cache_type" description="Clear specific cache type." auth />
          <Endpoint method="POST" path="/api/v1/cache/clear/tag" description="Clear cache by tag." auth />
          <Endpoint method="POST" path="/api/v1/cache/clear/:content_type/:id" description="Clear cache for specific content." auth />
          <Endpoint method="GET" path="/api/v1/cache/entries" description="List cache entries with pagination." auth />
          <Endpoint method="GET" path="/api/v1/cache/config" description="Get cache configuration." auth />
          <Endpoint method="PUT" path="/api/v1/cache/config" description="Update cache configuration." auth />
          <Endpoint method="POST" path="/api/v1/cache/warm" description="Warm up cache." auth />
          <Endpoint method="GET" path="/api/v1/cache/health" description="Get cache health status." auth />
        </EndpointSection>

        {/* CDN */}
        <EndpointSection
          id="cdn"
          title="CDN"
          icon={<Globe className="w-5 h-5" />}
          description="Content Delivery Network integration"
        >
          <Endpoint method="GET" path="/api/v1/cdn/status" description="Get CDN status and enabled providers." auth />
          <Endpoint method="GET" path="/api/v1/cdn/config" description="Get CDN configuration." auth />
          <Endpoint method="PUT" path="/api/v1/cdn/config" description="Update CDN configuration." auth />
          <Endpoint method="POST" path="/api/v1/cdn/purge/all" description="Purge all CDN cache." auth />
          <Endpoint method="POST" path="/api/v1/cdn/purge/urls" description="Purge specific URLs from CDN." auth />
          <Endpoint method="POST" path="/api/v1/cdn/purge/tags" description="Purge by cache tags." auth />
          <Endpoint method="GET" path="/api/v1/cdn/stats" description="Get CDN statistics." auth />
          <Endpoint method="GET" path="/api/v1/cdn/health" description="CDN health check." auth />
        </EndpointSection>

        {/* Stats & Dashboard */}
        <EndpointSection
          id="stats"
          title="Stats & Dashboard"
          icon={<BarChart3 className="w-5 h-5" />}
          description="Dashboard statistics and analytics"
        >
          <Endpoint method="GET" path="/api/v1/stats" description="Get dashboard statistics (posts, pages, comments, users, media counts)." auth />
          <Endpoint method="GET" path="/api/v1/stats/overview" description="Get overview stats (views, referrers, top posts)." auth />
          <Endpoint method="GET" path="/api/v1/stats/content" description="Get content statistics (published vs drafts)." auth />
          <Endpoint method="GET" path="/api/v1/stats/activity" description="Get activity statistics (recent posts, comments, users)." auth />
        </EndpointSection>

        {/* Email */}
        <EndpointSection
          id="email"
          title="Email"
          icon={<Mail className="w-5 h-5" />}
          description="Email configuration and sending"
        >
          <Endpoint method="GET" path="/api/v1/email/config" description="Get email configuration (admin only)." auth />
          <Endpoint method="PUT" path="/api/v1/email/config" description="Update email configuration (admin only)." auth />
          <Endpoint method="POST" path="/api/v1/email/test" description="Send test email (admin only)." auth />
          <Endpoint method="GET" path="/api/v1/email/templates" description="List available email templates." auth />
          <Endpoint method="POST" path="/api/v1/email/send" description="Send email using template." auth />
        </EndpointSection>

        {/* Credentials */}
        <EndpointSection
          id="credentials"
          title="Credentials"
          icon={<Key className="w-5 h-5" />}
          description="Secure credential storage"
        >
          <Endpoint method="GET" path="/api/v1/credentials" description="List all stored credentials (without sensitive data)." auth />
          <Endpoint method="POST" path="/api/v1/credentials" description="Add new credential." auth />
          <Endpoint method="GET" path="/api/v1/credentials/:id" description="Get credential details." auth />
          <Endpoint method="DELETE" path="/api/v1/credentials/:id" description="Delete credential." auth />
          <Endpoint method="POST" path="/api/v1/credentials/:id/test" description="Test credential validity." auth />
        </EndpointSection>

        {/* Quick Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Reference</h2>
          <Accordion>
            <AccordionItem title="All Endpoints Summary" defaultOpen>
              <CodeBlock
                code={`# All endpoints require authentication via Bearer token
# Include header: Authorization: Bearer <your_jwt_token>

# Posts
GET    /api/v1/posts              # List posts (auth required)
GET    /api/v1/posts/:id          # Get single post (auth required)
POST   /api/v1/posts              # Create post (auth required)
PUT    /api/v1/posts/:id          # Update post (auth required)
DELETE /api/v1/posts/:id          # Delete post (auth required)

# Pages
GET    /api/v1/pages              # List pages (auth required)
GET    /api/v1/pages/:id          # Get single page (auth required)
POST   /api/v1/pages              # Create page (auth required)
PUT    /api/v1/pages/:id          # Update page (auth required)
DELETE /api/v1/pages/:id          # Delete page (auth required)

# Users
GET    /api/v1/users              # List users (auth required)
GET    /api/v1/users/:id          # Get user profile (auth required)
GET    /api/v1/users/me           # Get current user (auth required)
PUT    /api/v1/users/me           # Update current user (auth required)
POST   /api/v1/users              # Create user (auth required, admin)
DELETE /api/v1/users/:id          # Delete user (auth required, admin)

# Media
GET    /api/v1/media              # List media (auth required)
GET    /api/v1/media/:id          # Get media details (auth required)
POST   /api/v1/media              # Upload media (auth required)
PUT    /api/v1/media/:id          # Update media (auth required)
DELETE /api/v1/media/:id          # Delete media (auth required)

# Categories
GET    /api/v1/categories         # List categories (auth required)
GET    /api/v1/categories/:id     # Get category (auth required)
POST   /api/v1/categories         # Create category (auth required)
PUT    /api/v1/categories/:id     # Update category (auth required)
DELETE /api/v1/categories/:id     # Delete category (auth required)

# Tags
GET    /api/v1/tags               # List tags (auth required)
GET    /api/v1/tags/:id           # Get tag (auth required)
POST   /api/v1/tags               # Create tag (auth required)
PUT    /api/v1/tags/:id           # Update tag (auth required)
DELETE /api/v1/tags/:id           # Delete tag (auth required)

# Comments
GET    /api/v1/comments           # List comments (auth required)
GET    /api/v1/posts/:id/comments # Get post comments (auth required)
POST   /api/v1/posts/:id/comments # Add comment (auth required)
PUT    /api/v1/comments/:id       # Update comment (auth required)
DELETE /api/v1/comments/:id       # Delete comment (auth required)
POST   /api/v1/comments/:id/approve # Approve comment (auth required)
POST   /api/v1/comments/:id/spam    # Mark as spam (auth required)

# Authentication
POST   /api/v1/auth/login         # Login (auth required)
POST   /api/v1/auth/refresh       # Refresh token (auth required)
POST   /api/v1/auth/logout        # Logout (auth required)
POST   /api/v1/auth/register      # Register (auth required)
POST   /api/v1/auth/forgot-password  # Request password reset (auth required)
POST   /api/v1/auth/reset-password   # Reset password (auth required)

# Settings
GET    /api/v1/settings           # Get settings (auth required)
GET    /api/v1/settings/all       # Get all settings (auth required)
PUT    /api/v1/settings           # Update settings (auth required)

# Webhooks
GET    /api/v1/webhooks           # List webhooks (auth required)
POST   /api/v1/webhooks           # Create webhook (auth required)
DELETE /api/v1/webhooks/:id       # Delete webhook (auth required)

# Analytics
GET    /api/v1/analytics/overview  # Overview stats (auth required)
GET    /api/v1/analytics/posts     # Post stats (auth required)
GET    /api/v1/analytics/referrers # Referrer stats (auth required)
GET    /api/v1/analytics/pages     # Page stats (auth required)`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/api/database" className="text-gray-600 hover:text-rust-600">← Database API</Link>
          <Link to="/docs/api/authentication" className="flex items-center gap-2 text-rust-600">
            Authentication <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
