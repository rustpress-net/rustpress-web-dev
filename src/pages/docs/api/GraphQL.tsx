import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Zap, FileText, Users, Image, Tag, FolderOpen, MessageSquare, Settings, BarChart3 } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'authentication', title: 'Authentication', level: 2 },
  { id: 'queries', title: 'Queries', level: 2 },
  { id: 'mutations', title: 'Mutations', level: 2 },
  { id: 'subscriptions', title: 'Subscriptions', level: 2 },
  { id: 'types', title: 'Type Definitions', level: 2 },
  { id: 'errors', title: 'Error Handling', level: 2 },
  { id: 'examples', title: 'Examples', level: 2 },
];

interface OperationProps {
  name: string;
  type: 'query' | 'mutation' | 'subscription';
  description: string;
  args?: { name: string; type: string; required?: boolean; description: string }[];
  returns: string;
  example?: string;
}

function Operation({ name, type, description, args, returns, example }: OperationProps) {
  const typeColors = {
    query: 'bg-green-500',
    mutation: 'bg-blue-500',
    subscription: 'bg-purple-500',
  };

  const typeLabels = {
    query: 'QUERY',
    mutation: 'MUTATION',
    subscription: 'SUBSCRIPTION',
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden mb-4">
      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900">
        <span className={`px-2.5 py-1 text-xs font-bold text-white rounded ${typeColors[type]}`}>
          {typeLabels[type]}
        </span>
        <code className="font-mono text-sm text-gray-800 dark:text-gray-200">{name}</code>
        <span className="ml-auto flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
          <Lock className="w-3 h-3" />
          Auth Required
        </span>
      </div>
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{description}</p>

        {args && args.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Arguments</p>
            <div className="space-y-1">
              {args.map((arg) => (
                <div key={arg.name} className="flex items-baseline gap-2 text-sm">
                  <code className="text-rust-600 dark:text-rust-400">{arg.name}</code>
                  <span className="text-gray-400">
                    ({arg.type}){arg.required && <span className="text-red-500">*</span>}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">- {arg.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Returns</p>
          <code className="text-sm text-green-600 dark:text-green-400">{returns}</code>
        </div>

        {example && (
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Example</p>
            <CodeBlock code={example} language="graphql" showLineNumbers={false} />
          </div>
        )}
      </div>
    </div>
  );
}

function OperationSection({
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

export function GraphQL() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">GraphQL API</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete reference for the Rustpress GraphQL API with queries, mutations, and subscriptions.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The Rustpress GraphQL API provides a flexible and efficient way to query and mutate your site's data.
            All operations <strong>require authentication</strong> via JWT Bearer token.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Endpoint</p>
              <code className="text-rust-600 dark:text-rust-400">https://your-site.com/graphql</code>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Method</p>
              <code className="text-rust-600 dark:text-rust-400">POST (application/json)</code>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <Zap className="w-6 h-6 text-yellow-500 mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Efficient</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Request only the fields you need</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <Lock className="w-6 h-6 text-green-500 mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Secure</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">JWT authentication on all operations</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <FileText className="w-6 h-6 text-blue-500 mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Typed</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Full type safety with introspection</p>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="mb-12">
          <h2 id="authentication" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All GraphQL operations require a valid JWT token in the Authorization header.
          </p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Request Format</p>
            <CodeBlock
              code={`// GraphQL request with authentication
const response = await fetch('https://your-site.com/graphql', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <your_jwt_token>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: \`
      query GetPosts {
        posts(first: 10) {
          nodes {
            id
            title
            slug
          }
        }
      }
    \`,
    variables: {}
  })
});

const data = await response.json();`}
              language="javascript"
              showLineNumbers={false}
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
              <strong>Rate Limiting:</strong> GraphQL requests are rate limited to protect server resources.
            </p>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• <strong>1000 requests/hour</strong> for authenticated users</li>
              <li>• Query complexity is limited to prevent abuse</li>
              <li>• Maximum query depth: 10 levels</li>
            </ul>
          </div>
        </section>

        {/* Queries */}
        <OperationSection
          id="queries"
          title="Queries"
          icon={<FileText className="w-5 h-5" />}
          description="Read operations to fetch data from your site"
        >
          {/* Posts Queries */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Posts
          </h3>
          <Operation
            name="posts"
            type="query"
            description="Retrieve a paginated list of posts with optional filtering."
            args={[
              { name: 'first', type: 'Int', description: 'Number of posts to return' },
              { name: 'after', type: 'String', description: 'Cursor for pagination' },
              { name: 'where', type: 'PostWhereInput', description: 'Filter conditions' },
              { name: 'orderBy', type: 'PostOrderByInput', description: 'Sort order' },
            ]}
            returns="PostConnection!"
            example={`query GetPosts {
  posts(first: 10, where: { status: PUBLISHED }) {
    nodes {
      id
      title
      slug
      excerpt
      featuredImage {
        url
        alt
      }
      author {
        name
        avatar
      }
      categories {
        name
        slug
      }
      createdAt
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`}
          />
          <Operation
            name="post"
            type="query"
            description="Retrieve a single post by ID or slug."
            args={[
              { name: 'id', type: 'ID', description: 'Post ID' },
              { name: 'slug', type: 'String', description: 'Post slug' },
            ]}
            returns="Post"
            example={`query GetPost {
  post(slug: "getting-started-with-rustpress") {
    id
    title
    content
    author {
      name
    }
    tags {
      name
    }
  }
}`}
          />

          {/* Users Queries */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <Users className="w-4 h-4" /> Users
          </h3>
          <Operation
            name="users"
            type="query"
            description="Retrieve a list of users."
            args={[
              { name: 'first', type: 'Int', description: 'Number of users to return' },
              { name: 'where', type: 'UserWhereInput', description: 'Filter conditions' },
            ]}
            returns="UserConnection!"
          />
          <Operation
            name="user"
            type="query"
            description="Retrieve a single user by ID."
            args={[
              { name: 'id', type: 'ID', required: true, description: 'User ID' },
            ]}
            returns="User"
          />
          <Operation
            name="me"
            type="query"
            description="Get the currently authenticated user's profile."
            returns="User!"
            example={`query GetCurrentUser {
  me {
    id
    username
    email
    role
    avatar
    createdAt
  }
}`}
          />

          {/* Media Queries */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <Image className="w-4 h-4" /> Media
          </h3>
          <Operation
            name="mediaItems"
            type="query"
            description="Retrieve a list of media files."
            args={[
              { name: 'first', type: 'Int', description: 'Number of items to return' },
              { name: 'where', type: 'MediaWhereInput', description: 'Filter by type, search, etc.' },
            ]}
            returns="MediaConnection!"
          />
          <Operation
            name="mediaItem"
            type="query"
            description="Retrieve a single media item by ID."
            args={[
              { name: 'id', type: 'ID', required: true, description: 'Media item ID' },
            ]}
            returns="MediaItem"
          />

          {/* Categories & Tags */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <FolderOpen className="w-4 h-4" /> Categories & Tags
          </h3>
          <Operation
            name="categories"
            type="query"
            description="Retrieve all categories."
            args={[
              { name: 'first', type: 'Int', description: 'Number of categories' },
            ]}
            returns="CategoryConnection!"
          />
          <Operation
            name="tags"
            type="query"
            description="Retrieve all tags."
            args={[
              { name: 'first', type: 'Int', description: 'Number of tags' },
            ]}
            returns="TagConnection!"
          />

          {/* Comments */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Comments
          </h3>
          <Operation
            name="comments"
            type="query"
            description="Retrieve comments with optional filtering."
            args={[
              { name: 'first', type: 'Int', description: 'Number of comments' },
              { name: 'where', type: 'CommentWhereInput', description: 'Filter by post, status, etc.' },
            ]}
            returns="CommentConnection!"
          />

          {/* Settings */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Settings
          </h3>
          <Operation
            name="settings"
            type="query"
            description="Retrieve site settings."
            returns="Settings!"
            example={`query GetSettings {
  settings {
    siteTitle
    siteDescription
    siteUrl
    timezone
    dateFormat
    postsPerPage
  }
}`}
          />

          {/* Analytics */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> Analytics
          </h3>
          <Operation
            name="analytics"
            type="query"
            description="Retrieve site analytics data."
            args={[
              { name: 'period', type: 'AnalyticsPeriod', description: 'Time period: DAY_7, DAY_30, DAY_90, YEAR_1' },
            ]}
            returns="Analytics!"
          />
        </OperationSection>

        {/* Mutations */}
        <OperationSection
          id="mutations"
          title="Mutations"
          icon={<Zap className="w-5 h-5" />}
          description="Write operations to create, update, and delete data"
        >
          {/* Post Mutations */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Posts
          </h3>
          <Operation
            name="createPost"
            type="mutation"
            description="Create a new post."
            args={[
              { name: 'input', type: 'CreatePostInput!', required: true, description: 'Post data' },
            ]}
            returns="Post!"
            example={`mutation CreatePost {
  createPost(input: {
    title: "My New Post"
    content: "Post content here..."
    status: DRAFT
    categoryIds: ["cat_1"]
    tagIds: ["tag_1", "tag_2"]
  }) {
    id
    title
    slug
    status
  }
}`}
          />
          <Operation
            name="updatePost"
            type="mutation"
            description="Update an existing post."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'Post ID' },
              { name: 'input', type: 'UpdatePostInput!', required: true, description: 'Updated fields' },
            ]}
            returns="Post!"
          />
          <Operation
            name="deletePost"
            type="mutation"
            description="Delete a post."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'Post ID' },
            ]}
            returns="DeleteResult!"
          />
          <Operation
            name="publishPost"
            type="mutation"
            description="Publish a draft post."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'Post ID' },
            ]}
            returns="Post!"
          />

          {/* User Mutations */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <Users className="w-4 h-4" /> Users
          </h3>
          <Operation
            name="createUser"
            type="mutation"
            description="Create a new user (admin only)."
            args={[
              { name: 'input', type: 'CreateUserInput!', required: true, description: 'User data' },
            ]}
            returns="User!"
          />
          <Operation
            name="updateUser"
            type="mutation"
            description="Update a user."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'User ID' },
              { name: 'input', type: 'UpdateUserInput!', required: true, description: 'Updated fields' },
            ]}
            returns="User!"
          />
          <Operation
            name="deleteUser"
            type="mutation"
            description="Delete a user (admin only)."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'User ID' },
            ]}
            returns="DeleteResult!"
          />
          <Operation
            name="updateProfile"
            type="mutation"
            description="Update the authenticated user's profile."
            args={[
              { name: 'input', type: 'UpdateProfileInput!', required: true, description: 'Profile data' },
            ]}
            returns="User!"
          />

          {/* Media Mutations */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <Image className="w-4 h-4" /> Media
          </h3>
          <Operation
            name="uploadMedia"
            type="mutation"
            description="Upload a new media file."
            args={[
              { name: 'file', type: 'Upload!', required: true, description: 'File to upload' },
              { name: 'input', type: 'MediaInput', description: 'Alt text, caption, etc.' },
            ]}
            returns="MediaItem!"
          />
          <Operation
            name="updateMedia"
            type="mutation"
            description="Update media metadata."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'Media ID' },
              { name: 'input', type: 'UpdateMediaInput!', required: true, description: 'Updated fields' },
            ]}
            returns="MediaItem!"
          />
          <Operation
            name="deleteMedia"
            type="mutation"
            description="Delete a media file."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'Media ID' },
            ]}
            returns="DeleteResult!"
          />

          {/* Category & Tag Mutations */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <Tag className="w-4 h-4" /> Categories & Tags
          </h3>
          <Operation
            name="createCategory"
            type="mutation"
            description="Create a new category."
            args={[
              { name: 'input', type: 'CreateCategoryInput!', required: true, description: 'Category data' },
            ]}
            returns="Category!"
          />
          <Operation
            name="updateCategory"
            type="mutation"
            description="Update a category."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'Category ID' },
              { name: 'input', type: 'UpdateCategoryInput!', required: true, description: 'Updated fields' },
            ]}
            returns="Category!"
          />
          <Operation
            name="deleteCategory"
            type="mutation"
            description="Delete a category."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'Category ID' },
            ]}
            returns="DeleteResult!"
          />
          <Operation
            name="createTag"
            type="mutation"
            description="Create a new tag."
            args={[
              { name: 'input', type: 'CreateTagInput!', required: true, description: 'Tag data' },
            ]}
            returns="Tag!"
          />
          <Operation
            name="deleteTag"
            type="mutation"
            description="Delete a tag."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'Tag ID' },
            ]}
            returns="DeleteResult!"
          />

          {/* Comment Mutations */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Comments
          </h3>
          <Operation
            name="createComment"
            type="mutation"
            description="Add a comment to a post."
            args={[
              { name: 'postId', type: 'ID!', required: true, description: 'Post ID' },
              { name: 'input', type: 'CreateCommentInput!', required: true, description: 'Comment data' },
            ]}
            returns="Comment!"
          />
          <Operation
            name="approveComment"
            type="mutation"
            description="Approve a pending comment."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'Comment ID' },
            ]}
            returns="Comment!"
          />
          <Operation
            name="deleteComment"
            type="mutation"
            description="Delete a comment."
            args={[
              { name: 'id', type: 'ID!', required: true, description: 'Comment ID' },
            ]}
            returns="DeleteResult!"
          />

          {/* Settings Mutations */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Settings
          </h3>
          <Operation
            name="updateSettings"
            type="mutation"
            description="Update site settings."
            args={[
              { name: 'input', type: 'UpdateSettingsInput!', required: true, description: 'Settings to update' },
            ]}
            returns="Settings!"
            example={`mutation UpdateSettings {
  updateSettings(input: {
    siteTitle: "My Rustpress Site"
    siteDescription: "A blazing fast CMS"
    postsPerPage: 15
  }) {
    siteTitle
    siteDescription
    postsPerPage
  }
}`}
          />

          {/* Auth Mutations */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-8 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Authentication
          </h3>
          <Operation
            name="login"
            type="mutation"
            description="Authenticate and receive JWT tokens."
            args={[
              { name: 'username', type: 'String!', required: true, description: 'Username or email' },
              { name: 'password', type: 'String!', required: true, description: 'Password' },
            ]}
            returns="AuthPayload!"
            example={`mutation Login {
  login(username: "admin", password: "secure123") {
    accessToken
    refreshToken
    expiresIn
    user {
      id
      username
      role
    }
  }
}`}
          />
          <Operation
            name="refreshToken"
            type="mutation"
            description="Refresh an expired access token."
            args={[
              { name: 'refreshToken', type: 'String!', required: true, description: 'Refresh token' },
            ]}
            returns="AuthPayload!"
          />
          <Operation
            name="logout"
            type="mutation"
            description="Invalidate the current tokens."
            returns="Boolean!"
          />
        </OperationSection>

        {/* Subscriptions */}
        <OperationSection
          id="subscriptions"
          title="Subscriptions"
          icon={<Zap className="w-5 h-5" />}
          description="Real-time updates via WebSocket connections"
        >
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <strong>WebSocket Endpoint:</strong>
            </p>
            <code className="text-rust-600 dark:text-rust-400">wss://your-site.com/graphql</code>
          </div>

          <Operation
            name="postCreated"
            type="subscription"
            description="Subscribe to new post creation events."
            returns="Post!"
            example={`subscription OnPostCreated {
  postCreated {
    id
    title
    slug
    author {
      name
    }
    createdAt
  }
}`}
          />
          <Operation
            name="postUpdated"
            type="subscription"
            description="Subscribe to post update events."
            args={[
              { name: 'id', type: 'ID', description: 'Optional: specific post ID' },
            ]}
            returns="Post!"
          />
          <Operation
            name="commentAdded"
            type="subscription"
            description="Subscribe to new comments on a post."
            args={[
              { name: 'postId', type: 'ID!', required: true, description: 'Post to watch' },
            ]}
            returns="Comment!"
          />
          <Operation
            name="analyticsUpdated"
            type="subscription"
            description="Subscribe to real-time analytics updates."
            returns="AnalyticsUpdate!"
          />
        </OperationSection>

        {/* Type Definitions */}
        <section className="mb-12">
          <h2 id="types" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Type Definitions</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Core GraphQL types used throughout the API. Use introspection to explore the full schema.
          </p>

          <Accordion>
            <AccordionItem title="Post Type">
              <CodeBlock
                code={`type Post {
  id: ID!
  title: String!
  slug: String!
  content: String!
  excerpt: String
  status: PostStatus!
  featuredImage: MediaItem
  author: User!
  categories: [Category!]!
  tags: [Tag!]!
  comments(first: Int, after: String): CommentConnection!
  viewCount: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  publishedAt: DateTime
}

enum PostStatus {
  DRAFT
  PENDING
  PUBLISHED
  PRIVATE
}`}
                language="graphql"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="User Type">
              <CodeBlock
                code={`type User {
  id: ID!
  username: String!
  email: String!
  displayName: String
  avatar: String
  bio: String
  role: UserRole!
  posts(first: Int): PostConnection!
  createdAt: DateTime!
}

enum UserRole {
  ADMINISTRATOR
  EDITOR
  AUTHOR
  CONTRIBUTOR
  SUBSCRIBER
}`}
                language="graphql"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="MediaItem Type">
              <CodeBlock
                code={`type MediaItem {
  id: ID!
  url: String!
  filename: String!
  mimeType: String!
  fileSize: Int!
  width: Int
  height: Int
  alt: String
  caption: String
  uploadedBy: User!
  createdAt: DateTime!
}

enum MediaType {
  IMAGE
  VIDEO
  AUDIO
  DOCUMENT
}`}
                language="graphql"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Connection Types">
              <CodeBlock
                code={`# Relay-style pagination
type PostConnection {
  nodes: [Post!]!
  edges: [PostEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type PostEdge {
  node: Post!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}`}
                language="graphql"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Input Types">
              <CodeBlock
                code={`input CreatePostInput {
  title: String!
  content: String!
  excerpt: String
  status: PostStatus
  featuredImageId: ID
  categoryIds: [ID!]
  tagIds: [ID!]
}

input UpdatePostInput {
  title: String
  content: String
  excerpt: String
  status: PostStatus
  featuredImageId: ID
  categoryIds: [ID!]
  tagIds: [ID!]
}

input PostWhereInput {
  status: PostStatus
  authorId: ID
  categoryId: ID
  tagId: ID
  search: String
  createdAfter: DateTime
  createdBefore: DateTime
}`}
                language="graphql"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Error Handling */}
        <section className="mb-12">
          <h2 id="errors" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Handling</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            GraphQL errors are returned in a standard format with error codes and messages.
          </p>

          <CodeBlock
            code={`{
  "data": null,
  "errors": [
    {
      "message": "Authentication required",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["posts"],
      "extensions": {
        "code": "UNAUTHENTICATED",
        "http": { "status": 401 }
      }
    }
  ]
}`}
            language="json"
            showLineNumbers={false}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <code className="text-red-600 dark:text-red-400 text-sm font-bold">UNAUTHENTICATED</code>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">Missing or invalid auth token</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <code className="text-red-600 dark:text-red-400 text-sm font-bold">FORBIDDEN</code>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">Insufficient permissions</p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <code className="text-yellow-600 dark:text-yellow-400 text-sm font-bold">BAD_USER_INPUT</code>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">Invalid input data</p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <code className="text-yellow-600 dark:text-yellow-400 text-sm font-bold">NOT_FOUND</code>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">Resource not found</p>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <code className="text-orange-600 dark:text-orange-400 text-sm font-bold">RATE_LIMITED</code>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">Too many requests</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <code className="text-red-600 dark:text-red-400 text-sm font-bold">INTERNAL_ERROR</code>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">Server error</p>
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="mb-12">
          <h2 id="examples" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Complete Examples</h2>

          <Accordion>
            <AccordionItem title="Fetch Posts with Pagination" defaultOpen>
              <CodeBlock
                code={`// Fetch paginated posts with full details
const POSTS_QUERY = \`
  query GetPosts($first: Int!, $after: String, $status: PostStatus) {
    posts(first: $first, after: $after, where: { status: $status }) {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          url
          alt
        }
        author {
          name
          avatar
        }
        categories {
          name
          slug
        }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
\`;

const response = await fetch('https://your-site.com/graphql', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: POSTS_QUERY,
    variables: {
      first: 10,
      after: null,
      status: 'PUBLISHED'
    }
  })
});

const { data } = await response.json();
console.log(data.posts.nodes);`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Create and Publish a Post">
              <CodeBlock
                code={`// Create a draft post
const CREATE_POST = \`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      slug
      status
    }
  }
\`;

const createResponse = await fetch('https://your-site.com/graphql', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: CREATE_POST,
    variables: {
      input: {
        title: 'My GraphQL Post',
        content: '<p>Created via GraphQL API!</p>',
        status: 'DRAFT',
        categoryIds: ['cat_tutorials']
      }
    }
  })
});

const { data: createData } = await createResponse.json();
const postId = createData.createPost.id;

// Publish the post
const PUBLISH_POST = \`
  mutation PublishPost($id: ID!) {
    publishPost(id: $id) {
      id
      status
      publishedAt
    }
  }
\`;

const publishResponse = await fetch('https://your-site.com/graphql', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <token>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: PUBLISH_POST,
    variables: { id: postId }
  })
});`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Real-time Subscriptions">
              <CodeBlock
                code={`// Using graphql-ws for subscriptions
import { createClient } from 'graphql-ws';

const client = createClient({
  url: 'wss://your-site.com/graphql',
  connectionParams: {
    authToken: '<your_jwt_token>'
  }
});

// Subscribe to new posts
const unsubscribe = client.subscribe(
  {
    query: \`
      subscription OnPostCreated {
        postCreated {
          id
          title
          author {
            name
          }
        }
      }
    \`
  },
  {
    next: (data) => {
      console.log('New post:', data.data.postCreated);
    },
    error: (err) => {
      console.error('Subscription error:', err);
    },
    complete: () => {
      console.log('Subscription completed');
    }
  }
);

// Later: unsubscribe when done
unsubscribe();`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Using Apollo Client">
              <CodeBlock
                code={`import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://your-site.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    'Authorization': 'Bearer <token>'
  }
});

// Query
const { data } = await client.query({
  query: gql\`
    query GetPosts {
      posts(first: 10) {
        nodes {
          id
          title
        }
      }
    }
  \`
});

// Mutation
const { data: mutationData } = await client.mutate({
  mutation: gql\`
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        id
        title
      }
    }
  \`,
  variables: {
    input: {
      title: 'New Post',
      content: 'Content here'
    }
  }
});`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/api/rest-endpoints" className="text-gray-600 hover:text-rust-600">
            ← REST Endpoints
          </Link>
          <Link to="/docs/api/authentication" className="flex items-center gap-2 text-rust-600">
            Authentication <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
