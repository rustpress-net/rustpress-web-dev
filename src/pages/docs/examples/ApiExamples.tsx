import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Code, Database, Lock, Webhook, FileJson, Terminal } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodePlayground } from '../../../components/code';
import { Accordion, AccordionItem, LiveApiTester } from '../../../components/ui';

const fetchPostsCode = `// Fetch all published posts with pagination
async function getPosts(page = 1, perPage = 10) {
  const response = await fetch(
    \`/api/v1/posts?page=\${page}&per_page=\${perPage}&status=published\`
  );

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  const { data, meta } = await response.json();

  return {
    posts: data,
    pagination: {
      currentPage: meta.current_page,
      totalPages: meta.last_page,
      totalPosts: meta.total,
      hasMore: meta.current_page < meta.last_page,
    },
  };
}

// Fetch a single post by slug
async function getPostBySlug(slug) {
  const response = await fetch(\`/api/v1/posts/slug/\${slug}\`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  const { data } = await response.json();
  return data;
}

// Search posts
async function searchPosts(query, options = {}) {
  const params = new URLSearchParams({
    search: query,
    per_page: options.limit || 10,
    ...(options.category && { category: options.category }),
    ...(options.tag && { tag: options.tag }),
  });

  const response = await fetch(\`/api/v1/posts?\${params}\`);
  const { data } = await response.json();
  return data;
}`;

const createPostCode = `// Create a new post (requires authentication)
async function createPost(postData, authToken) {
  const response = await fetch('/api/v1/posts', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${authToken}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: postData.title,
      content: postData.content,
      excerpt: postData.excerpt,
      status: postData.status || 'draft',
      featured_image: postData.featuredImage,
      categories: postData.categories, // Array of category IDs
      tags: postData.tags,             // Array of tag IDs
      meta: {
        seo_title: postData.seoTitle,
        seo_description: postData.seoDescription,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create post');
  }

  const { data } = await response.json();
  return data;
}

// Update an existing post
async function updatePost(postId, updates, authToken) {
  const response = await fetch(\`/api/v1/posts/\${postId}\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${authToken}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update post');
  }

  const { data } = await response.json();
  return data;
}

// Delete a post
async function deletePost(postId, authToken) {
  const response = await fetch(\`/api/v1/posts/\${postId}\`, {
    method: 'DELETE',
    headers: {
      'Authorization': \`Bearer \${authToken}\`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete post');
  }

  return true;
}`;

const authenticationCode = `// Login and get authentication token
async function login(username, password) {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  const { data } = await response.json();

  return {
    token: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: new Date(Date.now() + data.expires_in * 1000),
    user: data.user,
  };
}

// Refresh token before expiry
async function refreshToken(refreshToken) {
  const response = await fetch('/api/v1/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Token refresh failed');
  }

  const { data } = await response.json();
  return {
    token: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: new Date(Date.now() + data.expires_in * 1000),
  };
}

// Get current user
async function getCurrentUser(authToken) {
  const response = await fetch('/api/v1/auth/me', {
    headers: {
      'Authorization': \`Bearer \${authToken}\`,
    },
  });

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  const { data } = await response.json();
  return data;
}

// Logout
async function logout(authToken) {
  await fetch('/api/v1/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${authToken}\`,
    },
  });
}`;

const reactHookCode = `import { useState, useEffect, useCallback } from 'react';

// Custom hook for fetching posts
function usePosts(options = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  const fetchPosts = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        per_page: (options.perPage || 10).toString(),
        ...(options.category && { category: options.category }),
        ...(options.status && { status: options.status }),
      });

      const response = await fetch(\`/api/v1/posts?\${params}\`);
      const { data, meta } = await response.json();

      setPosts(data);
      setPagination({
        currentPage: meta.current_page,
        totalPages: meta.last_page,
        total: meta.total,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [options.perPage, options.category, options.status]);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  return { posts, loading, error, pagination, refetch: fetchPosts };
}

// Usage in a component
function BlogPage() {
  const { posts, loading, error, pagination, refetch } = usePosts({
    perPage: 12,
    status: 'published',
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="posts-grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={refetch}
      />
    </div>
  );
}`;

const webhookCode = `// Setting up webhooks for real-time updates
const WEBHOOK_SECRET = process.env.RUSTPRESS_WEBHOOK_SECRET;

// Express.js webhook handler
app.post('/webhooks/rustpress', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-rustpress-signature'];
  const payload = req.body;

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== \`sha256=\${expectedSignature}\`) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(payload);

  switch (event.type) {
    case 'post.created':
      console.log('New post created:', event.data.title);
      // Trigger rebuild, notify subscribers, etc.
      break;

    case 'post.updated':
      console.log('Post updated:', event.data.id);
      // Invalidate cache, reindex search, etc.
      break;

    case 'post.deleted':
      console.log('Post deleted:', event.data.id);
      // Clean up related resources
      break;

    case 'comment.created':
      console.log('New comment on post:', event.data.post_id);
      // Send notification to post author
      break;

    case 'user.registered':
      console.log('New user:', event.data.email);
      // Send welcome email
      break;

    default:
      console.log('Unknown event type:', event.type);
  }

  res.json({ received: true });
});

// Register webhook in Rustpress admin
// POST /api/v1/webhooks
const registerWebhook = async (authToken) => {
  await fetch('/api/v1/webhooks', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${authToken}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: 'https://your-site.com/webhooks/rustpress',
      events: ['post.created', 'post.updated', 'post.deleted'],
      secret: WEBHOOK_SECRET,
    }),
  });
};`;

const curlExamplesCode = `# List all posts
curl -X GET "https://your-site.com/api/v1/posts" \\
  -H "Accept: application/json"

# Get a specific post
curl -X GET "https://your-site.com/api/v1/posts/123" \\
  -H "Accept: application/json"

# Search posts
curl -X GET "https://your-site.com/api/v1/posts?search=rustpress&category=tutorials" \\
  -H "Accept: application/json"

# Login and get token
curl -X POST "https://your-site.com/api/v1/auth/login" \\
  -H "Content-Type: application/json" \\
  -d '{"username": "admin", "password": "secret"}'

# Create a new post (authenticated)
curl -X POST "https://your-site.com/api/v1/posts" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My New Post",
    "content": "Post content here...",
    "status": "published"
  }'

# Update a post
curl -X PUT "https://your-site.com/api/v1/posts/123" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Updated Title"}'

# Delete a post
curl -X DELETE "https://your-site.com/api/v1/posts/123" \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Upload media
curl -X POST "https://your-site.com/api/v1/media" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -F "file=@/path/to/image.jpg" \\
  -F "alt_text=My Image"`;

const tocItems = [
  { id: 'try-api', title: 'Try the API', level: 2 },
  { id: 'fetch-posts', title: 'Fetching Posts', level: 2 },
  { id: 'create-posts', title: 'Creating Content', level: 2 },
  { id: 'authentication', title: 'Authentication', level: 2 },
  { id: 'more-examples', title: 'More Examples', level: 2 },
];

const apiFeatures = [
  {
    title: 'RESTful Design',
    description: 'Clean, predictable endpoints following REST best practices.',
    icon: <FileJson className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'JWT Authentication',
    description: 'Secure token-based authentication with refresh tokens.',
    icon: <Lock className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Webhooks',
    description: 'Real-time notifications for content and user events.',
    icon: <Webhook className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Full CRUD',
    description: 'Complete Create, Read, Update, Delete operations.',
    icon: <Database className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500',
  },
];

export function ApiExamples() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Examples</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">API Usage Examples</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete code examples for integrating with the Rustpress REST API. Copy, paste, and customize.
          </p>
        </div>

        {/* API Features Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {apiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Live API Tester */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="try-api" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Try the API
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Experiment with the Rustpress API directly in your browser. Select an endpoint and see the response.
            </p>
            <LiveApiTester />
          </motion.div>
        </section>

        {/* Fetching Posts */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="fetch-posts" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Fetching Posts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get posts with pagination, search, and filtering. These examples use the Fetch API but work with any HTTP client.
            </p>
            <CodePlayground
              initialCode={fetchPostsCode}
              language="javascript"
              title="api/posts.js"
              description="Functions for fetching and searching posts"
            />
          </motion.div>
        </section>

        {/* Creating Content */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="create-posts" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Creating & Managing Content
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create, update, and delete posts programmatically. All write operations require authentication.
            </p>
            <CodePlayground
              initialCode={createPostCode}
              language="javascript"
              title="api/content.js"
              description="CRUD operations for posts"
            />
          </motion.div>
        </section>

        {/* Authentication */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="authentication" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Authenticate users and manage tokens. The API uses JWT tokens with refresh token rotation.
            </p>
            <CodePlayground
              initialCode={authenticationCode}
              language="javascript"
              title="api/auth.js"
              description="Authentication and token management"
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
              title="React Hooks Integration"
              icon={<Code className="w-5 h-5" />}
              defaultOpen
            >
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Custom React hooks for fetching data with loading states, error handling, and pagination.
              </p>
              <CodePlayground
                initialCode={reactHookCode}
                language="jsx"
                title="hooks/usePosts.js"
                description="React hooks for Rustpress API"
              />
            </AccordionItem>

            <AccordionItem
              title="Webhook Integration"
              icon={<Webhook className="w-5 h-5" />}
            >
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Set up webhooks to receive real-time notifications when content changes.
              </p>
              <CodePlayground
                initialCode={webhookCode}
                language="javascript"
                title="webhooks/handler.js"
                description="Webhook handler for real-time updates"
              />
            </AccordionItem>

            <AccordionItem
              title="cURL Examples"
              icon={<Terminal className="w-5 h-5" />}
            >
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Quick cURL commands for testing the API from your terminal.
              </p>
              <CodePlayground
                initialCode={curlExamplesCode}
                language="bash"
                title="Terminal"
                description="cURL commands for API testing"
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
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-8 text-white"
          >
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <FileJson className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Explore the Full API</h3>
                  <p className="text-white/80">Complete endpoint documentation</p>
                </div>
              </div>
              <p className="text-white/80 mb-6 max-w-xl">
                Check out our comprehensive API reference for all available endpoints,
                request parameters, response formats, and error codes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/docs/api/rest-endpoints"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  API Reference
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/docs/examples/playground"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
                >
                  <Code className="w-5 h-5" />
                  Interactive Playground
                </Link>
                <a
                  href="https://github.com/rust-press/api-examples"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  Example Repo
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/examples/plugins" className="text-gray-600 hover:text-rust-600">← Plugin Examples</Link>
          <Link to="/docs/examples/playground" className="flex items-center gap-2 text-rust-600">
            Code Playground <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
