import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Bell, Shield, Zap, CheckCircle, XCircle, Clock, RotateCcw, FileText, Users, Image, MessageSquare, Settings } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'setup', title: 'Setting Up Webhooks', level: 2 },
  { id: 'events', title: 'Webhook Events', level: 2 },
  { id: 'payloads', title: 'Payload Structure', level: 2 },
  { id: 'security', title: 'Security & Verification', level: 2 },
  { id: 'retry', title: 'Retry Policy', level: 2 },
  { id: 'management', title: 'Webhook Management', level: 2 },
  { id: 'examples', title: 'Examples', level: 2 },
];

interface WebhookEventProps {
  name: string;
  description: string;
  category: string;
  payload?: string;
}

function WebhookEvent({ name, description, category, payload }: WebhookEventProps) {
  const categoryColors: Record<string, string> = {
    posts: 'bg-blue-500',
    pages: 'bg-indigo-500',
    users: 'bg-green-500',
    media: 'bg-purple-500',
    comments: 'bg-yellow-500',
    settings: 'bg-gray-500',
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden mb-4">
      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900">
        <span className={`px-2.5 py-1 text-xs font-bold text-white rounded ${categoryColors[category] || 'bg-rust-500'}`}>
          {category.toUpperCase()}
        </span>
        <code className="font-mono text-sm text-gray-800 dark:text-gray-200">{name}</code>
        <span className="ml-auto flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
          <Lock className="w-3 h-3" />
          Auth Required
        </span>
      </div>
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{description}</p>
        {payload && (
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Example Payload</p>
            <CodeBlock code={payload} language="json" showLineNumbers={false} />
          </div>
        )}
      </div>
    </div>
  );
}

function EventCategory({
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-rust-500/10 dark:bg-rust-500/20 flex items-center justify-center text-rust-500">
          {icon}
        </div>
        <div>
          <h3 id={id} className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export function Webhooks() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Webhooks</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Real-time event notifications for your Rustpress site. Receive instant updates when content changes.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Webhooks allow your application to receive real-time HTTP notifications when events occur in your Rustpress site.
            All webhook endpoints <strong>require authentication</strong> to manage, and all payloads are signed for security.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Real-time</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Instant notifications</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Secure</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">HMAC-SHA256 signed</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <RotateCcw className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Reliable</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Auto-retry on failure</p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <Bell className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="font-semibold text-gray-700 dark:text-gray-300">Flexible</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Subscribe to any event</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Webhook Management Endpoint</p>
            <code className="text-rust-600 dark:text-rust-400">https://your-site.com/api/v1/webhooks</code>
          </div>
        </section>

        {/* Setting Up Webhooks */}
        <section className="mb-12">
          <h2 id="setup" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Setting Up Webhooks</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create a webhook subscription to start receiving events. All webhook management requires authentication.
          </p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">1. Create a Webhook</p>
            <CodeBlock
              code={`// Register a new webhook endpoint
const response = await fetch('https://your-site.com/api/v1/webhooks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <your_jwt_token>',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-app.com/webhooks/rustpress',
    events: ['post.created', 'post.updated', 'post.deleted'],
    secret: 'your_webhook_secret_key',
    active: true,
    description: 'Production webhook for blog updates'
  })
});

const webhook = await response.json();
console.log('Webhook ID:', webhook.data.id);`}
              language="javascript"
              showLineNumbers={false}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">2. Webhook Response</p>
            <CodeBlock
              code={`{
  "data": {
    "id": "whk_abc123def456",
    "url": "https://your-app.com/webhooks/rustpress",
    "events": ["post.created", "post.updated", "post.deleted"],
    "active": true,
    "description": "Production webhook for blog updates",
    "created_at": "2024-01-15T10:00:00Z",
    "last_triggered_at": null,
    "failure_count": 0
  }
}`}
              language="json"
              showLineNumbers={false}
            />
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">Important Security Note</p>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• Store your webhook secret securely - it's used to verify payload signatures</li>
              <li>• Use HTTPS endpoints only - HTTP endpoints will be rejected</li>
              <li>• The secret is only shown once during creation</li>
            </ul>
          </div>
        </section>

        {/* Webhook Events */}
        <section className="mb-12">
          <h2 id="events" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Webhook Events</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Subscribe to specific events to receive notifications. Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">*</code> to subscribe to all events.
          </p>

          <EventCategory
            id="post-events"
            title="Post Events"
            icon={<FileText className="w-4 h-4" />}
            description="Triggered when posts are created, updated, or deleted"
          >
            <WebhookEvent
              name="post.created"
              category="posts"
              description="Fired when a new post is created (draft or published)."
              payload={`{
  "event": "post.created",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "id": 123,
    "title": "New Blog Post",
    "slug": "new-blog-post",
    "status": "draft",
    "author_id": 1,
    "created_at": "2024-01-15T10:00:00Z"
  }
}`}
            />
            <WebhookEvent
              name="post.updated"
              category="posts"
              description="Fired when an existing post is modified."
            />
            <WebhookEvent
              name="post.deleted"
              category="posts"
              description="Fired when a post is permanently deleted."
            />
            <WebhookEvent
              name="post.published"
              category="posts"
              description="Fired when a post status changes to published."
              payload={`{
  "event": "post.published",
  "timestamp": "2024-01-15T12:00:00Z",
  "data": {
    "id": 123,
    "title": "New Blog Post",
    "slug": "new-blog-post",
    "status": "published",
    "published_at": "2024-01-15T12:00:00Z",
    "url": "https://your-site.com/blog/new-blog-post"
  }
}`}
            />
            <WebhookEvent
              name="post.unpublished"
              category="posts"
              description="Fired when a published post is reverted to draft."
            />
          </EventCategory>

          <EventCategory
            id="page-events"
            title="Page Events"
            icon={<FileText className="w-4 h-4" />}
            description="Triggered when pages are created, updated, or deleted"
          >
            <WebhookEvent
              name="page.created"
              category="pages"
              description="Fired when a new page is created."
            />
            <WebhookEvent
              name="page.updated"
              category="pages"
              description="Fired when an existing page is modified."
            />
            <WebhookEvent
              name="page.deleted"
              category="pages"
              description="Fired when a page is permanently deleted."
            />
            <WebhookEvent
              name="page.published"
              category="pages"
              description="Fired when a page status changes to published."
            />
          </EventCategory>

          <EventCategory
            id="user-events"
            title="User Events"
            icon={<Users className="w-4 h-4" />}
            description="Triggered when users are created, updated, or deleted"
          >
            <WebhookEvent
              name="user.created"
              category="users"
              description="Fired when a new user is registered."
              payload={`{
  "event": "user.created",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "id": 42,
    "username": "newuser",
    "email": "newuser@example.com",
    "role": "subscriber",
    "created_at": "2024-01-15T10:00:00Z"
  }
}`}
            />
            <WebhookEvent
              name="user.updated"
              category="users"
              description="Fired when a user profile is modified."
            />
            <WebhookEvent
              name="user.deleted"
              category="users"
              description="Fired when a user is permanently deleted."
            />
            <WebhookEvent
              name="user.role_changed"
              category="users"
              description="Fired when a user's role is changed."
            />
            <WebhookEvent
              name="user.login"
              category="users"
              description="Fired when a user successfully logs in."
            />
            <WebhookEvent
              name="user.logout"
              category="users"
              description="Fired when a user logs out."
            />
          </EventCategory>

          <EventCategory
            id="media-events"
            title="Media Events"
            icon={<Image className="w-4 h-4" />}
            description="Triggered when media files are uploaded or deleted"
          >
            <WebhookEvent
              name="media.uploaded"
              category="media"
              description="Fired when a new media file is uploaded."
              payload={`{
  "event": "media.uploaded",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "id": 456,
    "filename": "hero-image.jpg",
    "mime_type": "image/jpeg",
    "file_size": 245000,
    "url": "https://your-site.com/uploads/hero-image.jpg",
    "uploaded_by": 1
  }
}`}
            />
            <WebhookEvent
              name="media.updated"
              category="media"
              description="Fired when media metadata is updated."
            />
            <WebhookEvent
              name="media.deleted"
              category="media"
              description="Fired when a media file is deleted."
            />
          </EventCategory>

          <EventCategory
            id="comment-events"
            title="Comment Events"
            icon={<MessageSquare className="w-4 h-4" />}
            description="Triggered when comments are submitted or moderated"
          >
            <WebhookEvent
              name="comment.created"
              category="comments"
              description="Fired when a new comment is submitted."
              payload={`{
  "event": "comment.created",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "id": 789,
    "post_id": 123,
    "author_name": "John Doe",
    "author_email": "john@example.com",
    "content": "Great article!",
    "status": "pending",
    "created_at": "2024-01-15T10:00:00Z"
  }
}`}
            />
            <WebhookEvent
              name="comment.approved"
              category="comments"
              description="Fired when a comment is approved."
            />
            <WebhookEvent
              name="comment.spam"
              category="comments"
              description="Fired when a comment is marked as spam."
            />
            <WebhookEvent
              name="comment.deleted"
              category="comments"
              description="Fired when a comment is deleted."
            />
          </EventCategory>

          <EventCategory
            id="settings-events"
            title="Settings Events"
            icon={<Settings className="w-4 h-4" />}
            description="Triggered when site settings are changed"
          >
            <WebhookEvent
              name="settings.updated"
              category="settings"
              description="Fired when any site setting is changed."
              payload={`{
  "event": "settings.updated",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "changed_fields": ["site_title", "site_description"],
    "updated_by": 1
  }
}`}
            />
            <WebhookEvent
              name="theme.activated"
              category="settings"
              description="Fired when a theme is activated."
            />
            <WebhookEvent
              name="plugin.activated"
              category="settings"
              description="Fired when a plugin is activated."
            />
            <WebhookEvent
              name="plugin.deactivated"
              category="settings"
              description="Fired when a plugin is deactivated."
            />
          </EventCategory>
        </section>

        {/* Payload Structure */}
        <section className="mb-12">
          <h2 id="payloads" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Payload Structure</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All webhook payloads follow a consistent structure with metadata and event-specific data.
          </p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Standard Payload Format</p>
            <CodeBlock
              code={`{
  "id": "evt_abc123def456",
  "event": "post.published",
  "timestamp": "2024-01-15T10:00:00Z",
  "webhook_id": "whk_abc123def456",
  "api_version": "v1",
  "data": {
    // Event-specific data
  },
  "meta": {
    "site_url": "https://your-site.com",
    "site_name": "My Rustpress Site",
    "delivery_attempt": 1
  }
}`}
              language="json"
              showLineNumbers={false}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">HTTP Headers</p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <div className="space-y-2 font-mono text-sm">
                <div className="flex gap-4">
                  <span className="text-gray-500 dark:text-gray-400 w-48">Content-Type:</span>
                  <span className="text-gray-700 dark:text-gray-300">application/json</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-500 dark:text-gray-400 w-48">X-Rustpress-Event:</span>
                  <span className="text-gray-700 dark:text-gray-300">post.published</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-500 dark:text-gray-400 w-48">X-Rustpress-Delivery:</span>
                  <span className="text-gray-700 dark:text-gray-300">evt_abc123def456</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-500 dark:text-gray-400 w-48">X-Rustpress-Signature:</span>
                  <span className="text-gray-700 dark:text-gray-300">sha256=abc123...</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-500 dark:text-gray-400 w-48">X-Rustpress-Timestamp:</span>
                  <span className="text-gray-700 dark:text-gray-300">1705312800</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Verification */}
        <section className="mb-12">
          <h2 id="security" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Security & Verification</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Always verify webhook signatures to ensure payloads are authentic and haven't been tampered with.
          </p>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Signature Verification (Node.js)</p>
            <CodeBlock
              code={`const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, timestamp, secret) {
  // Prevent replay attacks - reject if older than 5 minutes
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime - parseInt(timestamp) > 300) {
    throw new Error('Webhook timestamp too old');
  }

  // Create the signed payload string
  const signedPayload = \`\${timestamp}.\${JSON.stringify(payload)}\`;

  // Calculate expected signature
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  // Compare signatures using timing-safe comparison
  const providedSig = signature.replace('sha256=', '');
  if (!crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(providedSig)
  )) {
    throw new Error('Invalid webhook signature');
  }

  return true;
}

// Express middleware example
app.post('/webhooks/rustpress', express.json(), (req, res) => {
  const signature = req.headers['x-rustpress-signature'];
  const timestamp = req.headers['x-rustpress-timestamp'];

  try {
    verifyWebhookSignature(req.body, signature, timestamp, process.env.WEBHOOK_SECRET);

    // Process the webhook
    const event = req.body.event;
    console.log('Received event:', event);

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook verification failed:', error.message);
    res.status(401).json({ error: 'Invalid signature' });
  }
});`}
              language="javascript"
              showLineNumbers={false}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Signature Verification (Python)</p>
            <CodeBlock
              code={`import hmac
import hashlib
import time
from flask import Flask, request, jsonify

app = Flask(__name__)

def verify_webhook_signature(payload, signature, timestamp, secret):
    # Prevent replay attacks
    current_time = int(time.time())
    if current_time - int(timestamp) > 300:
        raise ValueError('Webhook timestamp too old')

    # Create signed payload
    signed_payload = f"{timestamp}.{payload}"

    # Calculate expected signature
    expected_sig = hmac.new(
        secret.encode(),
        signed_payload.encode(),
        hashlib.sha256
    ).hexdigest()

    # Compare signatures
    provided_sig = signature.replace('sha256=', '')
    if not hmac.compare_digest(expected_sig, provided_sig):
        raise ValueError('Invalid webhook signature')

    return True

@app.route('/webhooks/rustpress', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-Rustpress-Signature')
    timestamp = request.headers.get('X-Rustpress-Timestamp')

    try:
        verify_webhook_signature(
            request.get_data(as_text=True),
            signature,
            timestamp,
            os.environ['WEBHOOK_SECRET']
        )

        event = request.json.get('event')
        print(f'Received event: {event}')

        return jsonify({'received': True}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 401`}
              language="python"
              showLineNumbers={false}
            />
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Signature Verification (Rust)</p>
            <CodeBlock
              code={`use hmac::{Hmac, Mac};
use sha2::Sha256;
use std::time::{SystemTime, UNIX_EPOCH};

type HmacSha256 = Hmac<Sha256>;

fn verify_webhook_signature(
    payload: &str,
    signature: &str,
    timestamp: &str,
    secret: &str,
) -> Result<(), &'static str> {
    // Prevent replay attacks
    let current_time = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();
    let webhook_time: u64 = timestamp.parse().map_err(|_| "Invalid timestamp")?;

    if current_time - webhook_time > 300 {
        return Err("Webhook timestamp too old");
    }

    // Create signed payload
    let signed_payload = format!("{}.{}", timestamp, payload);

    // Calculate expected signature
    let mut mac = HmacSha256::new_from_slice(secret.as_bytes())
        .map_err(|_| "Invalid secret key")?;
    mac.update(signed_payload.as_bytes());
    let expected_sig = hex::encode(mac.finalize().into_bytes());

    // Compare signatures
    let provided_sig = signature.strip_prefix("sha256=").unwrap_or(signature);
    if expected_sig != provided_sig {
        return Err("Invalid webhook signature");
    }

    Ok(())
}`}
              language="rust"
              showLineNumbers={false}
            />
          </div>
        </section>

        {/* Retry Policy */}
        <section className="mb-12">
          <h2 id="retry" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Retry Policy</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Rustpress automatically retries failed webhook deliveries with exponential backoff.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Successful Delivery
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• HTTP status 2xx (200-299)</li>
                <li>• Response within 30 seconds</li>
                <li>• No further retries needed</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Failed Delivery
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• HTTP status 4xx, 5xx</li>
                <li>• Connection timeout</li>
                <li>• DNS resolution failure</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Retry Schedule</p>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <div className="flex items-center gap-4 flex-wrap">
                {[
                  { attempt: 1, delay: 'Immediate' },
                  { attempt: 2, delay: '1 minute' },
                  { attempt: 3, delay: '5 minutes' },
                  { attempt: 4, delay: '30 minutes' },
                  { attempt: 5, delay: '2 hours' },
                  { attempt: 6, delay: '8 hours' },
                ].map((retry, index) => (
                  <div key={retry.attempt} className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        #{retry.attempt}: {retry.delay}
                      </span>
                    </div>
                    {index < 5 && <ArrowRight className="w-4 h-4 text-gray-400" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Automatic Disabling:</strong> After 6 consecutive failures, the webhook will be automatically disabled.
              You'll receive an email notification and can re-enable it from the admin panel after fixing the endpoint.
            </p>
          </div>
        </section>

        {/* Webhook Management */}
        <section className="mb-12">
          <h2 id="management" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Webhook Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Use the REST API to manage your webhook subscriptions. All endpoints require authentication.
          </p>

          <Accordion>
            <AccordionItem title="List All Webhooks" defaultOpen>
              <CodeBlock
                code={`// GET /api/v1/webhooks
const response = await fetch('https://your-site.com/api/v1/webhooks', {
  headers: {
    'Authorization': 'Bearer <your_jwt_token>'
  }
});

const { data } = await response.json();
// Returns array of webhook objects`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Get Webhook Details">
              <CodeBlock
                code={`// GET /api/v1/webhooks/:id
const response = await fetch('https://your-site.com/api/v1/webhooks/whk_abc123', {
  headers: {
    'Authorization': 'Bearer <your_jwt_token>'
  }
});

const { data } = await response.json();
// Returns webhook object with delivery history`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Update Webhook">
              <CodeBlock
                code={`// PUT /api/v1/webhooks/:id
const response = await fetch('https://your-site.com/api/v1/webhooks/whk_abc123', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer <your_jwt_token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    events: ['post.created', 'post.updated', 'comment.created'],
    active: true
  })
});`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Delete Webhook">
              <CodeBlock
                code={`// DELETE /api/v1/webhooks/:id
const response = await fetch('https://your-site.com/api/v1/webhooks/whk_abc123', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer <your_jwt_token>'
  }
});`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Test Webhook">
              <CodeBlock
                code={`// POST /api/v1/webhooks/:id/test
// Sends a test payload to your endpoint
const response = await fetch('https://your-site.com/api/v1/webhooks/whk_abc123/test', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <your_jwt_token>'
  }
});

// Returns test delivery result
const { data } = await response.json();
console.log('Test status:', data.success);
console.log('Response time:', data.response_time_ms);`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="View Delivery History">
              <CodeBlock
                code={`// GET /api/v1/webhooks/:id/deliveries
const response = await fetch(
  'https://your-site.com/api/v1/webhooks/whk_abc123/deliveries?limit=10',
  {
    headers: {
      'Authorization': 'Bearer <your_jwt_token>'
    }
  }
);

const { data } = await response.json();
// Returns array of delivery attempts with status, response, timing`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Examples */}
        <section className="mb-12">
          <h2 id="examples" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Complete Examples</h2>

          <Accordion>
            <AccordionItem title="Express.js Webhook Handler" defaultOpen>
              <CodeBlock
                code={`const express = require('express');
const crypto = require('crypto');

const app = express();

// Important: Use raw body for signature verification
app.use('/webhooks', express.raw({ type: 'application/json' }));

app.post('/webhooks/rustpress', (req, res) => {
  const signature = req.headers['x-rustpress-signature'];
  const timestamp = req.headers['x-rustpress-timestamp'];
  const event = req.headers['x-rustpress-event'];

  // Verify signature
  const payload = req.body.toString();
  const signedPayload = \`\${timestamp}.\${payload}\`;
  const expectedSig = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(signedPayload)
    .digest('hex');

  if (\`sha256=\${expectedSig}\` !== signature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Parse and handle the event
  const data = JSON.parse(payload);

  switch (event) {
    case 'post.published':
      console.log('New post published:', data.data.title);
      // Notify subscribers, update cache, etc.
      break;
    case 'comment.created':
      console.log('New comment on post:', data.data.post_id);
      // Send notification to author
      break;
    case 'user.created':
      console.log('New user registered:', data.data.username);
      // Welcome email, CRM sync, etc.
      break;
    default:
      console.log('Unhandled event:', event);
  }

  res.status(200).json({ received: true });
});

app.listen(3000);`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Next.js API Route">
              <CodeBlock
                code={`// pages/api/webhooks/rustpress.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for raw body access
  },
};

async function getRawBody(req: NextApiRequest): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['x-rustpress-signature'] as string;
  const timestamp = req.headers['x-rustpress-timestamp'] as string;

  const rawBody = await getRawBody(req);

  // Verify signature
  const signedPayload = \`\${timestamp}.\${rawBody}\`;
  const expectedSig = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET!)
    .update(signedPayload)
    .digest('hex');

  if (\`sha256=\${expectedSig}\` !== signature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const payload = JSON.parse(rawBody);

  // Handle different events
  switch (payload.event) {
    case 'post.published':
      // Revalidate the blog page
      await res.revalidate('/blog');
      await res.revalidate(\`/blog/\${payload.data.slug}\`);
      break;
    case 'post.deleted':
      await res.revalidate('/blog');
      break;
  }

  return res.status(200).json({ received: true });
}`}
                language="typescript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Slack Notification Integration">
              <CodeBlock
                code={`// Notify Slack when new posts are published
const express = require('express');
const crypto = require('crypto');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

app.post('/webhooks/rustpress', async (req, res) => {
  // Verify signature (simplified for example)
  const signature = req.headers['x-rustpress-signature'];
  // ... verification code ...

  const { event, data } = req.body;

  if (event === 'post.published') {
    // Send Slack notification
    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: 'New Post Published!'
            }
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: \`*\${data.title}*\\n\${data.excerpt || 'No excerpt available'}\`
            }
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: { type: 'plain_text', text: 'View Post' },
                url: data.url
              }
            ]
          }
        ]
      })
    });
  }

  res.status(200).json({ received: true });
});`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="GitHub Actions Trigger">
              <CodeBlock
                code={`// Trigger GitHub Actions workflow on content changes
const express = require('express');
const { Octokit } = require('@octokit/rest');

const app = express();
app.use(express.json());

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

app.post('/webhooks/rustpress', async (req, res) => {
  const { event, data } = req.body;

  // Trigger rebuild on any content change
  if (['post.published', 'post.updated', 'page.published'].includes(event)) {
    await octokit.actions.createWorkflowDispatch({
      owner: 'your-org',
      repo: 'your-site',
      workflow_id: 'deploy.yml',
      ref: 'main',
      inputs: {
        trigger: event,
        content_id: data.id.toString(),
        content_type: event.split('.')[0]
      }
    });

    console.log(\`Triggered rebuild for \${event}\`);
  }

  res.status(200).json({ received: true });
});`}
                language="javascript"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* All Events Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Events Reference</h2>
          <Accordion>
            <AccordionItem title="Complete Event List">
              <CodeBlock
                code={`# Post Events
post.created          # New post created (any status)
post.updated          # Post content or metadata changed
post.deleted          # Post permanently deleted
post.published        # Post status changed to published
post.unpublished      # Published post reverted to draft
post.trashed          # Post moved to trash

# Page Events
page.created          # New page created
page.updated          # Page content or metadata changed
page.deleted          # Page permanently deleted
page.published        # Page status changed to published

# User Events
user.created          # New user registered
user.updated          # User profile updated
user.deleted          # User account deleted
user.role_changed     # User role modified
user.login            # Successful login
user.logout           # User logged out
user.password_reset   # Password was reset

# Media Events
media.uploaded        # New file uploaded
media.updated         # Media metadata changed
media.deleted         # Media file deleted

# Comment Events
comment.created       # New comment submitted
comment.approved      # Comment approved
comment.spam          # Comment marked as spam
comment.deleted       # Comment deleted
comment.replied       # Reply to comment

# Taxonomy Events
category.created      # New category created
category.updated      # Category modified
category.deleted      # Category deleted
tag.created           # New tag created
tag.deleted           # Tag deleted

# Settings Events
settings.updated      # Site settings changed
theme.activated       # Theme activated
theme.updated         # Theme settings changed
plugin.activated      # Plugin activated
plugin.deactivated    # Plugin deactivated
plugin.updated        # Plugin settings changed

# Special Events
*                     # Subscribe to ALL events
content.*             # All content events (posts, pages)
user.*                # All user events`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/api/graphql" className="text-gray-600 hover:text-rust-600">
            ← GraphQL API
          </Link>
          <Link to="/docs/api/authentication" className="flex items-center gap-2 text-rust-600">
            Authentication <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
