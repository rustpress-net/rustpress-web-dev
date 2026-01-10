import { Link } from 'react-router-dom';
import { ArrowRight, Clock, AlertTriangle, Shield, Zap, RefreshCw, CheckCircle, XCircle, Settings, Server } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'configuration', title: 'Configuration', level: 2 },
  { id: 'default-limits', title: 'Default Limits', level: 2 },
  { id: 'headers', title: 'Response Headers', level: 2 },
  { id: 'handling', title: 'Handling Rate Limits', level: 2 },
  { id: 'strategies', title: 'Best Practices', level: 2 },
  { id: 'endpoints', title: 'Endpoint-Specific Limits', level: 2 },
  { id: 'customization', title: 'Advanced Customization', level: 2 },
];

export function RateLimiting() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Rate Limiting</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Configure and manage rate limiting for your self-hosted Rustpress installation to protect your API.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rate limiting protects your Rustpress installation from abuse and ensures stable performance.
            Since Rustpress is self-hosted, you have complete control over rate limiting configuration.
          </p>

          <div className="not-prose grid md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Protection</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Prevents API abuse</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Performance</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ensures fast responses</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Settings className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Configurable</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Full control over limits</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Sliding Window</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Rolling time periods</p>
            </div>
          </div>

          <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Server className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">Self-Hosted Freedom</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Rustpress is completely free and self-hosted. You control your own rate limits based on your
                  server capacity and requirements. There are no artificial restrictions or paid tiers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration */}
        <section className="mb-12">
          <h2 id="configuration" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Configuration</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Configure rate limiting using environment variables. Rustpress uses environment-based configuration
            for flexibility across different deployment environments.
          </p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Core Configuration</p>
            <CodeBlock
              code={`# Enable or disable rate limiting (default: true)
RUSTPRESS_RATE_LIMIT_ENABLED=true

# Algorithm: "sliding_window" or "token_bucket"
RUSTPRESS_RATE_LIMIT_ALGORITHM=sliding_window

# Storage backend: "memory" or "redis"
RUSTPRESS_RATE_LIMIT_STORAGE=memory

# Redis connection (required if storage is redis)
RUSTPRESS_RATE_LIMIT_REDIS_URL=redis://localhost:6379`}
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Global Limits</p>
            <CodeBlock
              code={`# Global limits (applied to all endpoints unless overridden)
RUSTPRESS_RATE_LIMIT_REQUESTS_PER_MINUTE=60
RUSTPRESS_RATE_LIMIT_REQUESTS_PER_HOUR=1000
RUSTPRESS_RATE_LIMIT_BURST_LIMIT=20

# Anonymous (unauthenticated) request limits
RUSTPRESS_RATE_LIMIT_ANON_PER_MINUTE=20
RUSTPRESS_RATE_LIMIT_ANON_PER_HOUR=200
RUSTPRESS_RATE_LIMIT_ANON_BURST=10

# Authenticated user limits
RUSTPRESS_RATE_LIMIT_AUTH_PER_MINUTE=120
RUSTPRESS_RATE_LIMIT_AUTH_PER_HOUR=3000
RUSTPRESS_RATE_LIMIT_AUTH_BURST=50`}
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">IP Filtering</p>
            <CodeBlock
              code={`# IP whitelist (comma-separated, bypasses rate limiting)
RUSTPRESS_RATE_LIMIT_WHITELIST=127.0.0.1,::1,192.168.1.0/24

# IP blacklist (comma-separated, always blocked)
RUSTPRESS_RATE_LIMIT_BLACKLIST=`}
              language="bash"
              showLineNumbers={false}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Example .env File</p>
            <CodeBlock
              code={`# .env - Rate Limiting Configuration
RUSTPRESS_RATE_LIMIT_ENABLED=true
RUSTPRESS_RATE_LIMIT_ALGORITHM=sliding_window
RUSTPRESS_RATE_LIMIT_STORAGE=memory

# Limits
RUSTPRESS_RATE_LIMIT_REQUESTS_PER_MINUTE=60
RUSTPRESS_RATE_LIMIT_REQUESTS_PER_HOUR=1000
RUSTPRESS_RATE_LIMIT_BURST_LIMIT=20

# Anonymous limits (stricter for security)
RUSTPRESS_RATE_LIMIT_ANON_PER_MINUTE=20
RUSTPRESS_RATE_LIMIT_ANON_PER_HOUR=200

# Authenticated limits (more generous)
RUSTPRESS_RATE_LIMIT_AUTH_PER_MINUTE=120
RUSTPRESS_RATE_LIMIT_AUTH_PER_HOUR=3000

# Whitelist local development
RUSTPRESS_RATE_LIMIT_WHITELIST=127.0.0.1,::1`}
              language="bash"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Default Limits */}
        <section className="mb-12">
          <h2 id="default-limits" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Default Limits</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Out of the box, Rustpress applies sensible default rate limits. These can be customized to match your server's capacity.
          </p>

          <div className="not-prose overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Limit Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Anonymous</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Authenticated</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Per Minute</td>
                  <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">20</td>
                  <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">120</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Requests allowed per minute</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Per Hour</td>
                  <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">200</td>
                  <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">3,000</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Requests allowed per hour</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Burst</td>
                  <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">10</td>
                  <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">50</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Max concurrent requests</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="not-prose mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Understanding Rate Limit Types</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Per-Minute Limit</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Prevents rapid bursts of requests. Uses a sliding window to track requests
                  over the last 60 seconds.
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Per-Hour Limit</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The primary rate limit that applies to all requests. Resets on a rolling 60-minute window.
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Burst Limit</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Maximum concurrent requests allowed at any instant. Prevents overwhelming the server
                  with simultaneous connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Response Headers */}
        <section className="mb-12">
          <h2 id="headers" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Response Headers</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Every API response includes headers with information about your current rate limit status.
          </p>

          <div className="not-prose mb-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Rate Limit Headers</p>
              </div>
              <div className="p-4 font-mono text-sm space-y-2">
                <div className="flex flex-wrap gap-x-4">
                  <span className="text-purple-600 dark:text-purple-400">X-RateLimit-Limit:</span>
                  <span className="text-gray-700 dark:text-gray-300">1000</span>
                </div>
                <div className="flex flex-wrap gap-x-4">
                  <span className="text-purple-600 dark:text-purple-400">X-RateLimit-Remaining:</span>
                  <span className="text-gray-700 dark:text-gray-300">950</span>
                </div>
                <div className="flex flex-wrap gap-x-4">
                  <span className="text-purple-600 dark:text-purple-400">X-RateLimit-Reset:</span>
                  <span className="text-gray-700 dark:text-gray-300">1705320000</span>
                </div>
                <div className="flex flex-wrap gap-x-4">
                  <span className="text-purple-600 dark:text-purple-400">X-RateLimit-Reset-After:</span>
                  <span className="text-gray-700 dark:text-gray-300">3542</span>
                </div>
              </div>
            </div>
          </div>

          <div className="not-prose overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Header</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">X-RateLimit-Limit</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    Maximum requests allowed in the current window
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">X-RateLimit-Remaining</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    Requests remaining in the current window
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">X-RateLimit-Reset</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    Unix timestamp when the rate limit resets
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">X-RateLimit-Reset-After</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    Seconds until the rate limit resets
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">Retry-After</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    Seconds to wait before retrying (only on 429 responses)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Handling Rate Limits */}
        <section className="mb-12">
          <h2 id="handling" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Handling Rate Limits</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            When you exceed a rate limit, the API returns a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">429 Too Many Requests</code> response.
          </p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">429 Response Example</p>
            <CodeBlock
              code={`HTTP/1.1 429 Too Many Requests
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1705320000
Retry-After: 3542

{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Rate limit exceeded. Please retry after 3542 seconds.",
    "details": {
      "limit": 1000,
      "remaining": 0,
      "reset_at": "2024-01-15T12:00:00Z",
      "retry_after": 3542
    }
  }
}`}
              language="http"
              showLineNumbers={false}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">JavaScript - Handling Rate Limits</p>
            <CodeBlock
              code={`async function fetchWithRateLimit(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': 'Bearer <token>',
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  // Track rate limit info
  const rateLimit = {
    limit: parseInt(response.headers.get('X-RateLimit-Limit')),
    remaining: parseInt(response.headers.get('X-RateLimit-Remaining')),
    reset: parseInt(response.headers.get('X-RateLimit-Reset')),
    resetAfter: parseInt(response.headers.get('X-RateLimit-Reset-After'))
  };

  console.log(\`Rate limit: \${rateLimit.remaining}/\${rateLimit.limit}\`);

  // Handle rate limiting
  if (response.status === 429) {
    const retryAfter = parseInt(response.headers.get('Retry-After')) || 60;
    console.log(\`Rate limited. Retrying after \${retryAfter} seconds...\`);

    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    return fetchWithRateLimit(url, options);
  }

  return response;
}`}
              language="javascript"
              showLineNumbers={false}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Rust - Handling Rate Limits</p>
            <CodeBlock
              code={`use std::time::Duration;
use tokio::time::sleep;

async fn fetch_with_rate_limit(
    client: &reqwest::Client,
    url: &str,
    max_retries: u32,
) -> Result<reqwest::Response, reqwest::Error> {
    for attempt in 0..max_retries {
        let response = client
            .get(url)
            .header("Authorization", "Bearer <token>")
            .send()
            .await?;

        // Log rate limit info
        if let Some(remaining) = response.headers().get("X-RateLimit-Remaining") {
            if let Some(limit) = response.headers().get("X-RateLimit-Limit") {
                println!("Rate limit: {}/{}",
                    remaining.to_str().unwrap_or("?"),
                    limit.to_str().unwrap_or("?")
                );
            }
        }

        if response.status() == 429 {
            let retry_after = response
                .headers()
                .get("Retry-After")
                .and_then(|v| v.to_str().ok())
                .and_then(|v| v.parse::<u64>().ok())
                .unwrap_or(60);

            println!("Rate limited. Retrying after {}s...", retry_after);
            sleep(Duration::from_secs(retry_after)).await;
            continue;
        }

        return Ok(response);
    }

    panic!("Max retries exceeded");
}`}
              language="rust"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 id="strategies" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Best Practices</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Follow these strategies to efficiently work within rate limits and build reliable applications.
          </p>

          <div className="not-prose grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-semibold text-green-800 dark:text-green-200">Do</span>
              </div>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                <li>Implement exponential backoff</li>
                <li>Cache responses when possible</li>
                <li>Use bulk endpoints for batch operations</li>
                <li>Monitor rate limit headers</li>
                <li>Queue requests during high load</li>
                <li>Use webhooks for real-time updates</li>
              </ul>
            </div>
            <div className="p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="font-semibold text-red-800 dark:text-red-200">Don't</span>
              </div>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-2">
                <li>Make requests in tight loops</li>
                <li>Ignore rate limit headers</li>
                <li>Retry immediately on 429 errors</li>
                <li>Poll frequently for changes</li>
                <li>Make redundant API calls</li>
                <li>Disable rate limiting in production</li>
              </ul>
            </div>
          </div>

          <Accordion>
            <AccordionItem title="Exponential Backoff" defaultOpen>
              <CodeBlock
                code={`// Exponential backoff with jitter
async function fetchWithBackoff(url, options = {}, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429) {
        // Calculate backoff with jitter
        const baseDelay = Math.pow(2, attempt) * 1000;
        const jitter = Math.random() * 1000;
        const delay = baseDelay + jitter;

        console.log(\`Attempt \${attempt + 1}: Rate limited. Waiting \${delay}ms...\`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      return response;
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;

      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error('Max retries exceeded');
}`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Request Queuing">
              <CodeBlock
                code={`class RequestQueue {
  constructor(requestsPerSecond = 10) {
    this.queue = [];
    this.processing = false;
    this.interval = 1000 / requestsPerSecond;
  }

  async add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const { requestFn, resolve, reject } = this.queue.shift();

      try {
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        reject(error);
      }

      // Wait before next request
      await new Promise(r => setTimeout(r, this.interval));
    }

    this.processing = false;
  }
}

// Usage
const queue = new RequestQueue(10); // 10 requests per second
const results = await Promise.all([
  queue.add(() => fetch('/api/posts/1')),
  queue.add(() => fetch('/api/posts/2')),
  queue.add(() => fetch('/api/posts/3')),
]);`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Response Caching">
              <CodeBlock
                code={`class CachedApiClient {
  constructor(baseUrl, token, cacheTTL = 60000) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.cache = new Map();
    this.cacheTTL = cacheTTL;
  }

  getCacheKey(endpoint, params) {
    return \`\${endpoint}:\${JSON.stringify(params)}\`;
  }

  async get(endpoint, params = {}) {
    const cacheKey = this.getCacheKey(endpoint, params);
    const cached = this.cache.get(cacheKey);

    // Return cached data if still valid
    if (cached && Date.now() < cached.expires) {
      console.log('Cache hit:', cacheKey);
      return cached.data;
    }

    // Fetch fresh data
    console.log('Cache miss:', cacheKey);
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      headers: { 'Authorization': \`Bearer \${this.token}\` }
    });

    const data = await response.json();

    // Cache the response
    this.cache.set(cacheKey, {
      data,
      expires: Date.now() + this.cacheTTL
    });

    return data;
  }
}`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Endpoint-Specific Limits */}
        <section className="mb-12">
          <h2 id="endpoints" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Endpoint-Specific Limits</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Some endpoints have stricter default limits due to their resource-intensive nature or security concerns.
            These can all be customized in your configuration.
          </p>

          <div className="not-prose overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Endpoint</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Default Limit</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Window</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">POST /auth/login</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">5 requests</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">15 minutes</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Prevents brute force attacks</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">POST /auth/register</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">3 requests</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1 hour</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Prevents mass registration</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">POST /media</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">50 requests</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1 hour</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Upload limit</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">POST /comments</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">10 requests</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1 minute</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Anti-spam protection</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">GET /search</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">30 requests</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1 minute</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Computationally expensive</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <code className="text-rust-600 dark:text-rust-400">POST /graphql</code>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">100 requests</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">1 minute</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Query complexity also limited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Advanced Customization */}
        <section className="mb-12">
          <h2 id="customization" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced Customization</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            For high-traffic installations, you can use Redis for distributed rate limiting or implement custom rate limiting logic.
          </p>

          <Accordion>
            <AccordionItem title="Redis-Based Rate Limiting" defaultOpen>
              <CodeBlock
                code={`# Environment variables for Redis-based distributed rate limiting

# Enable Redis storage for distributed rate limiting
RUSTPRESS_RATE_LIMIT_STORAGE=redis
RUSTPRESS_RATE_LIMIT_REDIS_URL=redis://localhost:6379

# Redis key prefix (default: "rustpress:ratelimit:")
RUSTPRESS_RATE_LIMIT_REDIS_PREFIX=rustpress:ratelimit:

# Connection pool size (default: 10)
RUSTPRESS_RATE_LIMIT_REDIS_POOL_SIZE=10

# For Redis Cluster (comma-separated URLs)
RUSTPRESS_RATE_LIMIT_REDIS_CLUSTER_URLS=redis://node1:6379,redis://node2:6379

# For Redis Sentinel high availability
RUSTPRESS_RATE_LIMIT_REDIS_SENTINEL_MASTER=mymaster
RUSTPRESS_RATE_LIMIT_REDIS_SENTINEL_URLS=redis://sentinel1:26379,redis://sentinel2:26379`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Custom Rate Limiter Plugin">
              <CodeBlock
                code={`// plugins/custom-rate-limiter/src/lib.rs
use rustpress_core::prelude::*;

#[rustpress_plugin]
pub struct CustomRateLimiter {
    limits: HashMap<String, RateLimit>,
}

impl Plugin for CustomRateLimiter {
    fn name(&self) -> &str {
        "custom-rate-limiter"
    }

    fn on_request(&self, ctx: &mut RequestContext) -> Result<()> {
        let user_id = ctx.user().map(|u| u.id.to_string())
            .unwrap_or_else(|| ctx.client_ip().to_string());

        let endpoint = ctx.path();

        // Check custom rate limit logic
        if let Some(limit) = self.limits.get(endpoint) {
            if !self.check_limit(&user_id, limit) {
                return Err(RateLimitError::Exceeded {
                    limit: limit.max_requests,
                    reset_at: limit.reset_time(),
                }.into());
            }
        }

        Ok(())
    }
}

impl CustomRateLimiter {
    fn check_limit(&self, key: &str, limit: &RateLimit) -> bool {
        // Implement custom rate limiting logic
        // Could use Redis, database, or in-memory storage
        true
    }
}`}
                language="rust"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Disabling Rate Limiting (Development Only)">
              <CodeBlock
                code={`# For development only - NEVER disable in production!
RUSTPRESS_RATE_LIMIT_ENABLED=false

# Better approach: whitelist your development IPs
RUSTPRESS_RATE_LIMIT_ENABLED=true
RUSTPRESS_RATE_LIMIT_WHITELIST=127.0.0.1,::1,192.168.1.0/24`}
                language="bash"
                showLineNumbers={false}
              />
              <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">Warning</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      Never disable rate limiting in production. It exposes your server to denial-of-service
                      attacks and API abuse. Use IP whitelisting for trusted clients instead.
                    </p>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Monitoring */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Monitoring Rate Limits</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Monitor rate limit usage through the admin API or built-in metrics.
          </p>

          <CodeBlock
            code={`// GET /api/v1/admin/rate-limits/status
// Requires admin authentication

const response = await fetch('https://your-site.com/api/v1/admin/rate-limits/status', {
  headers: { 'Authorization': 'Bearer <admin_token>' }
});

const status = await response.json();
console.log(status);

// Response:
{
  "data": {
    "enabled": true,
    "algorithm": "sliding_window",
    "storage": "redis",
    "stats": {
      "total_requests_hour": 15420,
      "rate_limited_requests": 23,
      "top_consumers": [
        { "identifier": "192.168.1.50", "requests": 1200 },
        { "identifier": "user_123", "requests": 890 }
      ],
      "endpoints": [
        { "path": "/api/v1/posts", "requests": 5000 },
        { "path": "/api/v1/media", "requests": 2300 }
      ]
    }
  }
}`}
            language="javascript"
            showLineNumbers={false}
          />
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/api/sdks" className="text-gray-600 hover:text-rust-600">
            ← SDKs & Libraries
          </Link>
          <Link to="/docs/api/authentication" className="flex items-center gap-2 text-rust-600">
            Authentication <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
