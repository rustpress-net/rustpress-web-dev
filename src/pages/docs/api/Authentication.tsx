import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Key, Shield, Lock, RefreshCw, AlertTriangle, CheckCircle, Fingerprint, Smartphone, Globe } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'jwt-authentication', title: 'JWT Authentication', level: 2 },
  { id: 'api-keys', title: 'API Keys', level: 2 },
  { id: 'oauth2', title: 'OAuth 2.0', level: 2 },
  { id: 'social-login', title: 'Social Login', level: 2 },
  { id: 'session-authentication', title: 'Session Authentication', level: 2 },
  { id: 'two-factor-auth', title: 'Two-Factor Authentication', level: 2 },
  { id: 'webauthn', title: 'WebAuthn / Passkeys', level: 2 },
  { id: 'token-lifecycle', title: 'Token Lifecycle', level: 2 },
  { id: 'scopes-permissions', title: 'Scopes & Permissions', level: 2 },
  { id: 'security-best-practices', title: 'Security Best Practices', level: 2 },
  { id: 'examples', title: 'Examples', level: 2 },
];

interface AuthMethodCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  recommended?: boolean;
  useCase: string;
}

function AuthMethodCard({ icon, title, description, recommended, useCase }: AuthMethodCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-6 rounded-xl border ${
        recommended
          ? 'border-rust-500 bg-rust-50 dark:bg-rust-900/20'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          recommended
            ? 'bg-rust-100 dark:bg-rust-800 text-rust-600 dark:text-rust-400'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
            {recommended && (
              <span className="px-2 py-0.5 text-xs font-medium bg-rust-100 dark:bg-rust-800 text-rust-700 dark:text-rust-300 rounded-full">
                Recommended
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{description}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            <strong>Best for:</strong> {useCase}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface ScopeRowProps {
  scope: string;
  description: string;
  endpoints: string;
}

function ScopeRow({ scope, description, endpoints }: ScopeRowProps) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <td className="py-3 px-4">
        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-rust-600 dark:text-rust-400">
          {scope}
        </code>
      </td>
      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{description}</td>
      <td className="py-3 px-4 text-gray-500 dark:text-gray-500 text-sm">{endpoints}</td>
    </tr>
  );
}

export function Authentication() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        {/* Header */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Authentication</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Secure your API requests with JWT tokens, API keys, or OAuth 2.0. All API endpoints require authentication.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>

          <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Authentication Required</p>
                <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                  All Rustpress API endpoints require authentication. Unauthenticated requests will receive a <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">401 Unauthorized</code> response.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Rustpress supports multiple authentication methods to accommodate different use cases:
          </p>

          <div className="not-prose grid gap-4">
            <AuthMethodCard
              icon={<Key className="w-5 h-5" />}
              title="JWT Authentication"
              description="JSON Web Tokens for stateless authentication. Tokens contain user claims and expire after a configurable period."
              recommended
              useCase="Web applications, mobile apps, SPAs"
            />
            <AuthMethodCard
              icon={<Fingerprint className="w-5 h-5" />}
              title="API Keys"
              description="Long-lived keys for server-to-server communication. Can be scoped to specific permissions."
              useCase="Backend services, CI/CD pipelines, automation"
            />
            <AuthMethodCard
              icon={<Shield className="w-5 h-5" />}
              title="OAuth 2.0"
              description="Industry-standard authorization framework for third-party applications."
              useCase="Third-party integrations, external applications"
            />
            <AuthMethodCard
              icon={<Lock className="w-5 h-5" />}
              title="Session Authentication"
              description="Cookie-based sessions for browser applications with built-in CSRF protection."
              useCase="Admin dashboard, browser-based tools"
            />
          </div>
        </section>

        {/* JWT Authentication */}
        <section className="mb-12">
          <h2 id="jwt-authentication" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">JWT Authentication</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            JWT (JSON Web Token) is the recommended authentication method for most applications. It provides stateless,
            secure authentication with configurable expiration.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Login & Get Token</h3>

          <CodeBlock
            code={`POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-secure-password"
}

// Response
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "expires_at": "2024-01-15T12:00:00Z",
    "user": {
      "id": "usr_123abc",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "admin"
    }
  }
}`}
            language="json"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Using the Token</h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Include the access token in the <code>Authorization</code> header of all API requests:
          </p>

          <CodeBlock
            code={`// Include token in all authenticated requests
const response = await fetch('https://api.example.com/api/v1/posts', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'Content-Type': 'application/json'
  }
});

// Or using the Rustpress SDK
import { RustpressClient } from '@rustpress/sdk';

const client = new RustpressClient({
  baseUrl: 'https://api.example.com',
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
});

const posts = await client.posts.list();`}
            language="javascript"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Token Structure</h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress JWT tokens contain the following claims:
          </p>

          <CodeBlock
            code={`// Decoded JWT payload
{
  "sub": "usr_123abc",           // User ID
  "email": "user@example.com",   // User email
  "role": "admin",               // User role
  "scopes": [                    // Granted permissions
    "posts:read",
    "posts:write",
    "users:read"
  ],
  "iat": 1705312800,             // Issued at (Unix timestamp)
  "exp": 1705316400,             // Expires at (Unix timestamp)
  "iss": "rustpress",            // Issuer
  "aud": "rustpress-api"         // Audience
}`}
            language="json"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Refresh Token</h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            When your access token expires, use the refresh token to obtain a new access token without re-authenticating:
          </p>

          <CodeBlock
            code={`POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Response
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "expires_at": "2024-01-15T13:00:00Z"
  }
}`}
            language="json"
          />
        </section>

        {/* API Keys */}
        <section className="mb-12">
          <h2 id="api-keys" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Keys</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            API keys are ideal for server-to-server communication, automation scripts, and CI/CD pipelines.
            They don't expire but can be revoked at any time.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Creating an API Key</h3>

          <CodeBlock
            code={`POST /api/v1/auth/api-keys
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Production Server",
  "scopes": ["posts:read", "posts:write", "media:read"],
  "expires_at": "2025-01-01T00:00:00Z",  // Optional
  "allowed_ips": ["192.168.1.0/24"]      // Optional IP whitelist
}

// Response
{
  "success": true,
  "data": {
    "id": "key_abc123",
    "name": "Production Server",
    "key": "rp_live_sk_1234567890abcdef...",  // Only shown once!
    "prefix": "rp_live_sk_1234",
    "scopes": ["posts:read", "posts:write", "media:read"],
    "created_at": "2024-01-15T10:00:00Z",
    "expires_at": "2025-01-01T00:00:00Z"
  }
}`}
            language="json"
          />

          <div className="not-prose bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 my-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800 dark:text-red-200">Store Your API Key Securely</p>
                <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                  The full API key is only displayed once upon creation. Store it securely - you won't be able to retrieve it later.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Using API Keys</h3>

          <CodeBlock
            code={`// Using X-API-Key header (recommended)
curl -X GET "https://api.example.com/api/v1/posts" \\
  -H "X-API-Key: rp_live_sk_1234567890abcdef..."

// Or using Authorization header
curl -X GET "https://api.example.com/api/v1/posts" \\
  -H "Authorization: ApiKey rp_live_sk_1234567890abcdef..."`}
            language="bash"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Managing API Keys</h3>

          <CodeBlock
            code={`// List all API keys
GET /api/v1/auth/api-keys

// Get specific API key
GET /api/v1/auth/api-keys/:id

// Update API key
PATCH /api/v1/auth/api-keys/:id
{
  "name": "Updated Name",
  "scopes": ["posts:read"]
}

// Revoke API key
DELETE /api/v1/auth/api-keys/:id

// Rotate API key (generates new key, invalidates old)
POST /api/v1/auth/api-keys/:id/rotate`}
            language="bash"
          />
        </section>

        {/* OAuth 2.0 */}
        <section className="mb-12">
          <h2 id="oauth2" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">OAuth 2.0</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Rustpress supports OAuth 2.0 for third-party application authorization. Use this for building
            integrations that access user data on their behalf.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Register Your Application</h3>

          <CodeBlock
            code={`POST /api/v1/oauth/applications
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "My Integration App",
  "description": "Syncs content with external service",
  "redirect_uris": [
    "https://myapp.com/callback",
    "https://myapp.com/oauth/callback"
  ],
  "scopes": ["posts:read", "posts:write", "users:read"]
}

// Response
{
  "success": true,
  "data": {
    "client_id": "oa_client_abc123",
    "client_secret": "oa_secret_xyz789...",  // Store securely!
    "name": "My Integration App",
    "redirect_uris": ["https://myapp.com/callback"],
    "scopes": ["posts:read", "posts:write", "users:read"]
  }
}`}
            language="json"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Authorization Code Flow</h3>

          <div className="not-prose mb-6">
            <div className="flex items-center gap-4 overflow-x-auto pb-4">
              {['Redirect User', 'User Authorizes', 'Exchange Code', 'Get Token'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 whitespace-nowrap">
                    <span className="w-6 h-6 rounded-full bg-rust-600 text-white text-sm flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{step}</span>
                  </div>
                  {index < 3 && <ArrowRight className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            code={`// Step 1: Redirect user to authorization URL
const authUrl = new URL('https://example.com/oauth/authorize');
authUrl.searchParams.set('client_id', 'oa_client_abc123');
authUrl.searchParams.set('redirect_uri', 'https://myapp.com/callback');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', 'posts:read posts:write');
authUrl.searchParams.set('state', 'random_state_string');  // CSRF protection

window.location.href = authUrl.toString();

// Step 2: User authorizes your app (handled by Rustpress)

// Step 3: Exchange authorization code for tokens
// User is redirected to: https://myapp.com/callback?code=abc123&state=random_state_string

const response = await fetch('https://example.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'authorization_code',
    client_id: 'oa_client_abc123',
    client_secret: 'oa_secret_xyz789...',
    code: 'abc123',
    redirect_uri: 'https://myapp.com/callback'
  })
});

// Step 4: Receive tokens
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "posts:read posts:write"
}`}
            language="javascript"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">PKCE Extension</h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            For public clients (mobile apps, SPAs), use PKCE (Proof Key for Code Exchange) for enhanced security:
          </p>

          <CodeBlock
            code={`import crypto from 'crypto';

// Generate code verifier and challenge
function generatePKCE() {
  const verifier = crypto.randomBytes(32).toString('base64url');
  const challenge = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');

  return { verifier, challenge };
}

const { verifier, challenge } = generatePKCE();

// Include challenge in authorization request
const authUrl = new URL('https://example.com/oauth/authorize');
authUrl.searchParams.set('client_id', 'oa_client_abc123');
authUrl.searchParams.set('redirect_uri', 'https://myapp.com/callback');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', 'posts:read');
authUrl.searchParams.set('code_challenge', challenge);
authUrl.searchParams.set('code_challenge_method', 'S256');

// Include verifier in token exchange
const tokenResponse = await fetch('https://example.com/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'authorization_code',
    client_id: 'oa_client_abc123',
    code: authorizationCode,
    redirect_uri: 'https://myapp.com/callback',
    code_verifier: verifier  // Proves you initiated the request
  })
});`}
            language="javascript"
          />
        </section>

        {/* Social Login */}
        <section className="mb-12">
          <h2 id="social-login" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Social Login</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Rustpress supports authentication via popular social providers. Users can sign in with their existing
            accounts without creating a new password.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Supported Providers</h3>

          <div className="not-prose grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {['Google', 'GitHub', 'Facebook', 'Discord', 'Microsoft'].map((provider) => (
              <div key={provider} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{provider}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Configuration</h3>

          <CodeBlock
            code={`# Environment variables for social providers
# Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Facebook
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# Discord
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret

# Microsoft
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret`}
            language="bash"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Initiating Social Login</h3>

          <CodeBlock
            code={`// Redirect user to social provider
const provider = 'google'; // google, github, facebook, discord, microsoft
const loginUrl = \`https://example.com/api/v1/auth/social/\${provider}\`;

// Add optional parameters
const params = new URLSearchParams({
  redirect_uri: 'https://myapp.com/auth/callback',
  state: generateRandomState()  // CSRF protection
});

window.location.href = \`\${loginUrl}?\${params}\`;

// Handle callback
// User is redirected to: https://myapp.com/auth/callback?code=abc123&state=...

// Exchange code for tokens
const response = await fetch('https://example.com/api/v1/auth/social/callback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    provider: 'google',
    code: 'abc123',
    redirect_uri: 'https://myapp.com/auth/callback'
  })
});

// Response includes JWT tokens
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "usr_123abc",
      "email": "user@gmail.com",
      "name": "John Doe",
      "avatar": "https://...",
      "provider": "google"
    },
    "is_new_user": false
  }
}`}
            language="javascript"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Linking Accounts</h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Users can link multiple social providers to a single account:
          </p>

          <CodeBlock
            code={`// Link additional provider to existing account
POST /api/v1/auth/social/link
Authorization: Bearer <access_token>

{
  "provider": "github",
  "code": "authorization_code_from_github",
  "redirect_uri": "https://myapp.com/auth/link-callback"
}

// List linked providers
GET /api/v1/auth/social/providers
Authorization: Bearer <access_token>

// Response
{
  "providers": [
    { "provider": "google", "linked_at": "2024-01-15T10:00:00Z" },
    { "provider": "github", "linked_at": "2024-01-16T14:00:00Z" }
  ]
}

// Unlink provider
DELETE /api/v1/auth/social/providers/github
Authorization: Bearer <access_token>`}
            language="bash"
          />
        </section>

        {/* Session Authentication */}
        <section className="mb-12">
          <h2 id="session-authentication" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Session Authentication</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Cookie-based session authentication is used for the admin dashboard and browser-based applications.
            It includes built-in CSRF protection.
          </p>

          <CodeBlock
            code={`// Login and establish session
const response = await fetch('https://example.com/api/v1/auth/session/login', {
  method: 'POST',
  credentials: 'include',  // Important: include cookies
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password',
    remember_me: true
  })
});

// Session cookie is automatically set
// Set-Cookie: rustpress_session=abc123...; HttpOnly; Secure; SameSite=Strict

// Subsequent requests include cookies automatically
const posts = await fetch('https://example.com/api/v1/posts', {
  credentials: 'include',
  headers: {
    'X-CSRF-Token': getCsrfToken()  // Include CSRF token
  }
});

// Logout
await fetch('https://example.com/api/v1/auth/session/logout', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'X-CSRF-Token': getCsrfToken()
  }
});`}
            language="javascript"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">CSRF Protection</h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All mutating requests (POST, PUT, PATCH, DELETE) require a CSRF token:
          </p>

          <CodeBlock
            code={`// Get CSRF token from meta tag (rendered by Rustpress)
function getCsrfToken() {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
}

// Or fetch it from the API
const { csrf_token } = await fetch('/api/v1/auth/csrf', {
  credentials: 'include'
}).then(r => r.json());

// Include in all mutating requests
fetch('/api/v1/posts', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrf_token
  },
  body: JSON.stringify({ title: 'New Post' })
});`}
            language="javascript"
          />
        </section>

        {/* Two-Factor Authentication */}
        <section className="mb-12">
          <h2 id="two-factor-auth" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Two-Factor Authentication</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Rustpress supports Time-based One-Time Passwords (TOTP) for two-factor authentication.
            Compatible with authenticator apps like Google Authenticator, Authy, and 1Password.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Enable 2FA</h3>

          <CodeBlock
            code={`// Step 1: Generate 2FA secret
POST /api/v1/auth/2fa/setup
Authorization: Bearer <access_token>

// Response includes QR code and secret
{
  "success": true,
  "data": {
    "secret": "JBSWY3DPEHPK3PXP",
    "qr_code": "data:image/png;base64,iVBORw0KGgo...",
    "backup_codes": [
      "a1b2c3d4",
      "e5f6g7h8",
      "i9j0k1l2",
      "m3n4o5p6",
      "q7r8s9t0",
      "u1v2w3x4",
      "y5z6a7b8",
      "c9d0e1f2"
    ]
  }
}

// Step 2: Verify and activate 2FA
POST /api/v1/auth/2fa/verify
Authorization: Bearer <access_token>

{
  "code": "123456"  // Code from authenticator app
}

// Response
{
  "success": true,
  "message": "Two-factor authentication enabled"
}`}
            language="json"
          />

          <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Store Backup Codes Securely</p>
                <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
                  Backup codes are only shown once. Store them in a secure location - they're your only way to recover access if you lose your authenticator device.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Login with 2FA</h3>

          <CodeBlock
            code={`// Step 1: Initial login
POST /api/v1/auth/login

{
  "email": "user@example.com",
  "password": "password"
}

// Response indicates 2FA required
{
  "success": true,
  "data": {
    "requires_2fa": true,
    "session_token": "temp_session_abc123..."  // Temporary token for 2FA
  }
}

// Step 2: Submit 2FA code
POST /api/v1/auth/2fa/authenticate

{
  "session_token": "temp_session_abc123...",
  "code": "123456"
}

// Or use backup code
{
  "session_token": "temp_session_abc123...",
  "backup_code": "a1b2c3d4"
}

// Response with full tokens
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { ... }
  }
}`}
            language="json"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Managing 2FA</h3>

          <CodeBlock
            code={`// Check 2FA status
GET /api/v1/auth/2fa/status
Authorization: Bearer <access_token>

// Response
{
  "enabled": true,
  "backup_codes_remaining": 6,
  "last_used": "2024-01-15T10:00:00Z"
}

// Regenerate backup codes
POST /api/v1/auth/2fa/backup-codes
Authorization: Bearer <access_token>

{
  "code": "123456"  // Current 2FA code required
}

// Disable 2FA
DELETE /api/v1/auth/2fa
Authorization: Bearer <access_token>

{
  "code": "123456",  // Current 2FA code required
  "password": "your-password"  // Password confirmation
}`}
            language="bash"
          />
        </section>

        {/* WebAuthn / Passkeys */}
        <section className="mb-12">
          <h2 id="webauthn" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">WebAuthn / Passkeys</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Rustpress supports WebAuthn for passwordless authentication using hardware security keys (YubiKey, etc.)
            or platform authenticators (Touch ID, Face ID, Windows Hello).
          </p>

          <div className="not-prose grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Fingerprint className="w-5 h-5 text-rust-500" />
                <span className="font-medium text-gray-900 dark:text-white">Security Keys</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">YubiKey, Titan Key, SoloKey</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-rust-500" />
                <span className="font-medium text-gray-900 dark:text-white">Platform Auth</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Touch ID, Face ID, Windows Hello</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Register a Passkey</h3>

          <CodeBlock
            code={`// Step 1: Get registration options
POST /api/v1/auth/webauthn/register/options
Authorization: Bearer <access_token>

{
  "device_name": "MacBook Pro"  // Optional friendly name
}

// Response with WebAuthn options
{
  "success": true,
  "data": {
    "challenge": "base64-encoded-challenge",
    "rp": {
      "name": "My Rustpress Site",
      "id": "example.com"
    },
    "user": {
      "id": "base64-encoded-user-id",
      "name": "user@example.com",
      "displayName": "John Doe"
    },
    "pubKeyCredParams": [...],
    "timeout": 60000,
    "attestation": "none",
    "authenticatorSelection": {
      "residentKey": "preferred",
      "userVerification": "preferred"
    }
  }
}

// Step 2: Create credential using browser API
const credential = await navigator.credentials.create({
  publicKey: registrationOptions
});

// Step 3: Complete registration
POST /api/v1/auth/webauthn/register/complete
Authorization: Bearer <access_token>

{
  "id": "credential-id",
  "rawId": "base64-encoded-raw-id",
  "response": {
    "clientDataJSON": "base64-encoded-client-data",
    "attestationObject": "base64-encoded-attestation"
  },
  "type": "public-key",
  "device_name": "MacBook Pro"
}`}
            language="javascript"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Login with Passkey</h3>

          <CodeBlock
            code={`// Step 1: Get authentication options
POST /api/v1/auth/webauthn/login/options

{
  "email": "user@example.com"  // Optional for resident keys
}

// Response
{
  "success": true,
  "data": {
    "challenge": "base64-encoded-challenge",
    "timeout": 60000,
    "rpId": "example.com",
    "allowCredentials": [
      {
        "type": "public-key",
        "id": "base64-credential-id"
      }
    ],
    "userVerification": "preferred"
  }
}

// Step 2: Get assertion using browser API
const assertion = await navigator.credentials.get({
  publicKey: authenticationOptions
});

// Step 3: Complete authentication
POST /api/v1/auth/webauthn/login/complete

{
  "id": "credential-id",
  "rawId": "base64-encoded-raw-id",
  "response": {
    "clientDataJSON": "base64-encoded-client-data",
    "authenticatorData": "base64-encoded-auth-data",
    "signature": "base64-encoded-signature"
  },
  "type": "public-key"
}

// Response with tokens
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "user": { ... }
  }
}`}
            language="javascript"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Managing Passkeys</h3>

          <CodeBlock
            code={`// List registered passkeys
GET /api/v1/auth/webauthn/credentials
Authorization: Bearer <access_token>

// Response
{
  "credentials": [
    {
      "id": "cred_abc123",
      "device_name": "MacBook Pro",
      "created_at": "2024-01-15T10:00:00Z",
      "last_used": "2024-01-20T14:00:00Z"
    },
    {
      "id": "cred_def456",
      "device_name": "YubiKey 5",
      "created_at": "2024-01-16T12:00:00Z",
      "last_used": "2024-01-18T09:00:00Z"
    }
  ]
}

// Delete a passkey
DELETE /api/v1/auth/webauthn/credentials/:id
Authorization: Bearer <access_token>`}
            language="bash"
          />
        </section>

        {/* Token Lifecycle */}
        <section className="mb-12">
          <h2 id="token-lifecycle" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Token Lifecycle</h2>

          <div className="not-prose overflow-x-auto mb-6">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Token Type</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Default Lifetime</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Max Lifetime</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Renewable</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Access Token</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1 hour</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">24 hours</td>
                  <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500" /></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Refresh Token</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">7 days</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">30 days</td>
                  <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500" /></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">API Key</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">No expiry</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Configurable</td>
                  <td className="py-3 px-4"><RefreshCw className="w-4 h-4 text-blue-500" /></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Session</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">24 hours</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">30 days (remember me)</td>
                  <td className="py-3 px-4"><CheckCircle className="w-4 h-4 text-green-500" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Token Revocation</h3>

          <CodeBlock
            code={`// Revoke current access token (logout)
POST /api/v1/auth/logout
Authorization: Bearer <access_token>

// Revoke all tokens for current user
POST /api/v1/auth/logout-all
Authorization: Bearer <access_token>

// Revoke specific refresh token
POST /api/v1/auth/revoke
{
  "token": "refresh_token_here",
  "token_type_hint": "refresh_token"
}

// Admin: Revoke all tokens for a user
POST /api/v1/admin/users/:id/revoke-tokens
Authorization: Bearer <admin_token>`}
            language="bash"
          />
        </section>

        {/* Scopes & Permissions */}
        <section className="mb-12">
          <h2 id="scopes-permissions" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Scopes & Permissions</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Scopes define what actions a token can perform. Request only the scopes your application needs.
          </p>

          <div className="not-prose overflow-x-auto mb-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Scope</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Description</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Endpoints</th>
                </tr>
              </thead>
              <tbody>
                <ScopeRow scope="posts:read" description="Read posts and pages" endpoints="GET /posts, GET /pages" />
                <ScopeRow scope="posts:write" description="Create, update, delete posts" endpoints="POST, PUT, DELETE /posts" />
                <ScopeRow scope="users:read" description="Read user profiles" endpoints="GET /users" />
                <ScopeRow scope="users:write" description="Manage users" endpoints="POST, PUT, DELETE /users" />
                <ScopeRow scope="media:read" description="Read media files" endpoints="GET /media" />
                <ScopeRow scope="media:write" description="Upload and manage media" endpoints="POST, DELETE /media" />
                <ScopeRow scope="comments:read" description="Read comments" endpoints="GET /comments" />
                <ScopeRow scope="comments:write" description="Moderate comments" endpoints="POST, PUT, DELETE /comments" />
                <ScopeRow scope="settings:read" description="Read site settings" endpoints="GET /settings" />
                <ScopeRow scope="settings:write" description="Modify site settings" endpoints="PUT /settings" />
                <ScopeRow scope="admin" description="Full administrative access" endpoints="All endpoints" />
              </tbody>
            </table>
          </div>

          <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">Principle of Least Privilege</p>
                <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                  Request only the scopes your application actually needs. This limits potential damage if a token is compromised.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Best Practices */}
        <section className="mb-12">
          <h2 id="security-best-practices" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Security Best Practices</h2>

          <div className="not-prose grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-green-800 dark:text-green-200">Do</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>Store tokens securely (never in localStorage for sensitive apps)</li>
                <li>Use HTTPS for all API requests</li>
                <li>Implement token refresh before expiration</li>
                <li>Use short-lived access tokens</li>
                <li>Rotate API keys periodically</li>
                <li>Validate JWT signatures on your server</li>
                <li>Use PKCE for public clients</li>
                <li>Log authentication events</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h3 className="font-semibold text-red-800 dark:text-red-200">Don't</h3>
              </div>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                <li>Expose tokens in URLs or logs</li>
                <li>Store secrets in client-side code</li>
                <li>Use long-lived tokens without refresh</li>
                <li>Share API keys between environments</li>
                <li>Disable HTTPS in production</li>
                <li>Trust client-provided user IDs</li>
                <li>Skip CSRF validation</li>
                <li>Use weak passwords for service accounts</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Secure Token Storage</h3>

          <CodeBlock
            code={`// Browser: Use httpOnly cookies (set by server)
// Server sets: Set-Cookie: access_token=...; HttpOnly; Secure; SameSite=Strict

// React Native / Mobile: Use secure storage
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('access_token', token);
const token = await SecureStore.getItemAsync('access_token');

// Node.js: Use environment variables
const apiKey = process.env.RUSTPRESS_API_KEY;

// Never do this:
// localStorage.setItem('token', accessToken);  // XSS vulnerable
// const API_KEY = 'rp_live_sk_...';            // Exposed in code`}
            language="javascript"
          />
        </section>

        {/* Examples */}
        <section className="mb-12">
          <h2 id="examples" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Examples</h2>

          <Accordion>
            <AccordionItem title="JavaScript/TypeScript" defaultOpen>
              <CodeBlock
                code={`import { RustpressClient } from '@rustpress/sdk';

// Initialize with JWT
const client = new RustpressClient({
  baseUrl: 'https://api.example.com'
});

// Login and store token
const auth = await client.auth.login({
  email: 'user@example.com',
  password: 'password'
});

// Client automatically handles token refresh
client.setAccessToken(auth.access_token);
client.setRefreshToken(auth.refresh_token);

// Make authenticated requests
const posts = await client.posts.list();

// Or use API key
const apiClient = new RustpressClient({
  baseUrl: 'https://api.example.com',
  apiKey: process.env.RUSTPRESS_API_KEY
});`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Python">
              <CodeBlock
                code={`from rustpress import RustpressClient

# Initialize client
client = RustpressClient(base_url="https://api.example.com")

# Login
auth = client.auth.login(
    email="user@example.com",
    password="password"
)

# Set tokens
client.set_access_token(auth.access_token)
client.set_refresh_token(auth.refresh_token)

# Make requests
posts = client.posts.list()

# Or use API key
api_client = RustpressClient(
    base_url="https://api.example.com",
    api_key=os.environ["RUSTPRESS_API_KEY"]
)`}
                language="python"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`use rustpress_sdk::{Client, Auth};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Create client
    let mut client = Client::new("https://api.example.com");

    // Login
    let auth = client.auth().login(
        "user@example.com",
        "password"
    ).await?;

    // Set tokens
    client.set_access_token(&auth.access_token);
    client.set_refresh_token(&auth.refresh_token);

    // Make requests
    let posts = client.posts().list().await?;

    // Or use API key
    let api_client = Client::new("https://api.example.com")
        .with_api_key(std::env::var("RUSTPRESS_API_KEY")?);

    Ok(())
}`}
                language="rust"
              />
            </AccordionItem>

            <AccordionItem title="cURL">
              <CodeBlock
                code={`# Login and get token
TOKEN=$(curl -s -X POST "https://api.example.com/api/v1/auth/login" \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@example.com","password":"password"}' \\
  | jq -r '.data.access_token')

# Use token in requests
curl -X GET "https://api.example.com/api/v1/posts" \\
  -H "Authorization: Bearer $TOKEN"

# Or use API key
curl -X GET "https://api.example.com/api/v1/posts" \\
  -H "X-API-Key: rp_live_sk_1234567890abcdef..."`}
                language="bash"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Error Responses */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Error Responses</h2>

          <div className="not-prose overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Status</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Error Code</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">401</code></td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">invalid_token</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Token is invalid or expired</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">401</code></td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">missing_token</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">No authentication provided</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">401</code></td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">invalid_credentials</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Email or password is incorrect</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">403</code></td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">insufficient_scope</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Token lacks required permissions</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">403</code></td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">ip_not_allowed</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Request from non-whitelisted IP</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">429</code></td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">too_many_attempts</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Too many failed login attempts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/docs/api/rate-limiting"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Rate Limiting
          </Link>
          <Link
            to="/docs/api/error-handling"
            className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700 dark:hover:text-rust-300 transition-colors"
          >
            Error Handling
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
