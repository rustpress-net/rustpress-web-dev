import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, XCircle, Info, Bug, RefreshCw, CheckCircle, Zap } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'error-format', title: 'Error Response Format', level: 2 },
  { id: 'http-status-codes', title: 'HTTP Status Codes', level: 2 },
  { id: 'error-codes', title: 'Error Codes Reference', level: 2 },
  { id: 'validation-errors', title: 'Validation Errors', level: 2 },
  { id: 'handling-errors', title: 'Handling Errors', level: 2 },
  { id: 'retry-strategies', title: 'Retry Strategies', level: 2 },
  { id: 'debugging', title: 'Debugging', level: 2 },
];

interface StatusCodeCardProps {
  code: string;
  name: string;
  description: string;
  color: 'green' | 'yellow' | 'red' | 'blue';
}

function StatusCodeCard({ code, name, description, color }: StatusCodeCardProps) {
  const colors = {
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    yellow: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
    red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
  };

  const codeColors = {
    green: 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300',
    yellow: 'bg-amber-100 dark:bg-amber-800 text-amber-700 dark:text-amber-300',
    red: 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300',
    blue: 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300',
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <div className="flex items-center gap-3">
        <span className={`px-2 py-1 rounded font-mono font-bold text-sm ${codeColors[color]}`}>
          {code}
        </span>
        <span className="font-semibold">{name}</span>
      </div>
      <p className="mt-2 text-sm opacity-80">{description}</p>
    </div>
  );
}

interface ErrorCodeRowProps {
  code: string;
  httpStatus: string;
  description: string;
  retryable: boolean;
}

function ErrorCodeRow({ code, httpStatus, description, retryable }: ErrorCodeRowProps) {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <td className="py-3 px-4">
        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-rust-600 dark:text-rust-400">
          {code}
        </code>
      </td>
      <td className="py-3 px-4 text-gray-600 dark:text-gray-400 font-mono text-sm">{httpStatus}</td>
      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{description}</td>
      <td className="py-3 px-4">
        {retryable ? (
          <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
            <RefreshCw className="w-3 h-3" /> Yes
          </span>
        ) : (
          <span className="text-gray-400 dark:text-gray-500 text-sm">No</span>
        )}
      </td>
    </tr>
  );
}

export function ErrorHandling() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        {/* Header */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Error Handling</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Understand error responses and implement robust error handling in your Rustpress integrations.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Rustpress uses conventional HTTP response codes to indicate the success or failure of an API request.
            In general: codes in the 2xx range indicate success, codes in the 4xx range indicate an error from
            the client side, and codes in the 5xx range indicate an error on Rustpress servers.
          </p>

          <div className="not-prose grid md:grid-cols-3 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
            >
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <span className="font-mono font-bold text-green-700 dark:text-green-300">2xx</span>
              </div>
              <p className="text-green-800 dark:text-green-200 font-semibold mb-1">Success</p>
              <p className="text-green-700 dark:text-green-300 text-sm">Request completed successfully</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
            >
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300">4xx</span>
              </div>
              <p className="text-amber-800 dark:text-amber-200 font-semibold mb-1">Client Error</p>
              <p className="text-amber-700 dark:text-amber-300 text-sm">Issue with the request</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
            >
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                <span className="font-mono font-bold text-red-700 dark:text-red-300">5xx</span>
              </div>
              <p className="text-red-800 dark:text-red-200 font-semibold mb-1">Server Error</p>
              <p className="text-red-700 dark:text-red-300 text-sm">Something went wrong on our end</p>
            </motion.div>
          </div>
        </section>

        {/* Error Response Format */}
        <section className="mb-12">
          <h2 id="error-format" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Error Response Format</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            All error responses follow a consistent JSON format, making it easy to handle errors programmatically:
          </p>

          <CodeBlock
            code={`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request body contains invalid data",
    "status": 422,
    "request_id": "req_abc123xyz",
    "timestamp": "2024-01-15T10:30:00Z",
    "details": {
      "fields": [
        {
          "field": "email",
          "message": "Invalid email format",
          "code": "INVALID_FORMAT"
        },
        {
          "field": "password",
          "message": "Password must be at least 8 characters",
          "code": "TOO_SHORT",
          "min": 8
        }
      ]
    },
    "documentation_url": "https://docs.rustpress.net/api/errors#VALIDATION_ERROR"
  }
}`}
            language="json"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Response Fields</h3>

          <div className="not-prose overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Field</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Type</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">success</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Always <code>false</code> for errors</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">error.code</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Machine-readable error code</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">error.message</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Human-readable error message</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">error.status</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">number</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">HTTP status code</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">error.request_id</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Unique request identifier for debugging</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">error.details</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">object</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Additional error context (optional)</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">error.documentation_url</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Link to relevant documentation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* HTTP Status Codes */}
        <section className="mb-12">
          <h2 id="http-status-codes" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">HTTP Status Codes</h2>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Success Codes</h3>
          <div className="not-prose grid gap-3 mb-8">
            <StatusCodeCard code="200" name="OK" description="Request succeeded. Response contains requested data." color="green" />
            <StatusCodeCard code="201" name="Created" description="Resource was successfully created." color="green" />
            <StatusCodeCard code="204" name="No Content" description="Request succeeded with no response body (e.g., DELETE)." color="green" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Client Error Codes</h3>
          <div className="not-prose grid gap-3 mb-8">
            <StatusCodeCard code="400" name="Bad Request" description="The request was malformed or contains invalid syntax." color="yellow" />
            <StatusCodeCard code="401" name="Unauthorized" description="Authentication is required or has failed." color="yellow" />
            <StatusCodeCard code="403" name="Forbidden" description="You don't have permission to access this resource." color="yellow" />
            <StatusCodeCard code="404" name="Not Found" description="The requested resource doesn't exist." color="yellow" />
            <StatusCodeCard code="409" name="Conflict" description="Request conflicts with current state (e.g., duplicate)." color="yellow" />
            <StatusCodeCard code="422" name="Unprocessable Entity" description="Request body failed validation." color="yellow" />
            <StatusCodeCard code="429" name="Too Many Requests" description="Rate limit exceeded. Slow down and retry." color="yellow" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Server Error Codes</h3>
          <div className="not-prose grid gap-3">
            <StatusCodeCard code="500" name="Internal Server Error" description="Something went wrong on our servers. We've been notified." color="red" />
            <StatusCodeCard code="502" name="Bad Gateway" description="Invalid response from upstream server." color="red" />
            <StatusCodeCard code="503" name="Service Unavailable" description="Server is temporarily unavailable. Please retry." color="red" />
            <StatusCodeCard code="504" name="Gateway Timeout" description="Request timed out. Try again or reduce payload." color="red" />
          </div>
        </section>

        {/* Error Codes Reference */}
        <section className="mb-12">
          <h2 id="error-codes" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Error Codes Reference</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Each error includes a machine-readable code that you can use for programmatic error handling:
          </p>

          <div className="not-prose overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Error Code</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">HTTP</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Description</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Retry</th>
                </tr>
              </thead>
              <tbody>
                <ErrorCodeRow code="BAD_REQUEST" httpStatus="400" description="Request body is malformed or missing required fields" retryable={false} />
                <ErrorCodeRow code="INVALID_JSON" httpStatus="400" description="Request body contains invalid JSON" retryable={false} />
                <ErrorCodeRow code="MISSING_PARAMETER" httpStatus="400" description="Required parameter is missing" retryable={false} />
                <ErrorCodeRow code="INVALID_PARAMETER" httpStatus="400" description="Parameter value is invalid" retryable={false} />
                <ErrorCodeRow code="UNAUTHORIZED" httpStatus="401" description="No valid authentication provided" retryable={false} />
                <ErrorCodeRow code="INVALID_TOKEN" httpStatus="401" description="Authentication token is invalid or expired" retryable={false} />
                <ErrorCodeRow code="TOKEN_EXPIRED" httpStatus="401" description="Authentication token has expired" retryable={false} />
                <ErrorCodeRow code="FORBIDDEN" httpStatus="403" description="Insufficient permissions for this action" retryable={false} />
                <ErrorCodeRow code="INSUFFICIENT_SCOPE" httpStatus="403" description="Token lacks required scope" retryable={false} />
                <ErrorCodeRow code="IP_FORBIDDEN" httpStatus="403" description="Request from unauthorized IP address" retryable={false} />
                <ErrorCodeRow code="NOT_FOUND" httpStatus="404" description="Requested resource does not exist" retryable={false} />
                <ErrorCodeRow code="METHOD_NOT_ALLOWED" httpStatus="405" description="HTTP method not supported for this endpoint" retryable={false} />
                <ErrorCodeRow code="CONFLICT" httpStatus="409" description="Resource already exists or state conflict" retryable={false} />
                <ErrorCodeRow code="DUPLICATE_ENTRY" httpStatus="409" description="A resource with this identifier already exists" retryable={false} />
                <ErrorCodeRow code="VALIDATION_ERROR" httpStatus="422" description="Request body failed validation" retryable={false} />
                <ErrorCodeRow code="RATE_LIMITED" httpStatus="429" description="Too many requests, rate limit exceeded" retryable={true} />
                <ErrorCodeRow code="INTERNAL_ERROR" httpStatus="500" description="Unexpected server error occurred" retryable={true} />
                <ErrorCodeRow code="DATABASE_ERROR" httpStatus="500" description="Database operation failed" retryable={true} />
                <ErrorCodeRow code="SERVICE_UNAVAILABLE" httpStatus="503" description="Service temporarily unavailable" retryable={true} />
                <ErrorCodeRow code="TIMEOUT" httpStatus="504" description="Request processing timed out" retryable={true} />
              </tbody>
            </table>
          </div>
        </section>

        {/* Validation Errors */}
        <section className="mb-12">
          <h2 id="validation-errors" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Validation Errors</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Validation errors (422) include detailed information about which fields failed and why:
          </p>

          <CodeBlock
            code={`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "status": 422,
    "request_id": "req_xyz789",
    "details": {
      "fields": [
        {
          "field": "title",
          "message": "Title is required",
          "code": "REQUIRED"
        },
        {
          "field": "email",
          "message": "Must be a valid email address",
          "code": "INVALID_FORMAT",
          "value": "not-an-email"
        },
        {
          "field": "tags",
          "message": "Must have at least 1 item",
          "code": "MIN_ITEMS",
          "min": 1,
          "actual": 0
        },
        {
          "field": "content",
          "message": "Must be at most 50000 characters",
          "code": "MAX_LENGTH",
          "max": 50000,
          "actual": 52341
        }
      ]
    }
  }
}`}
            language="json"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Validation Error Codes</h3>

          <div className="not-prose overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Code</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Description</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Extra Fields</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">REQUIRED</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Field is required but missing</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500">-</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">INVALID_FORMAT</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Value doesn't match expected format</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500"><code>pattern</code></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">INVALID_TYPE</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Value is wrong type</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500"><code>expected</code>, <code>actual</code></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">MIN_LENGTH</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">String is too short</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500"><code>min</code>, <code>actual</code></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">MAX_LENGTH</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">String is too long</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500"><code>max</code>, <code>actual</code></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">MIN_VALUE</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Number is below minimum</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500"><code>min</code>, <code>actual</code></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">MAX_VALUE</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Number exceeds maximum</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500"><code>max</code>, <code>actual</code></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">MIN_ITEMS</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Array has too few items</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500"><code>min</code>, <code>actual</code></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">MAX_ITEMS</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Array has too many items</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500"><code>max</code>, <code>actual</code></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">INVALID_ENUM</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Value not in allowed list</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500"><code>allowed</code></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4"><code className="text-rust-600 dark:text-rust-400">UNIQUE</code></td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Value must be unique but already exists</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-500">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Handling Errors */}
        <section className="mb-12">
          <h2 id="handling-errors" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Handling Errors</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Here's how to properly handle errors in your application:
          </p>

          <Accordion>
            <AccordionItem title="JavaScript / TypeScript" defaultOpen>
              <CodeBlock
                code={`import { RustpressClient, RustpressError } from '@rustpress/sdk';

const client = new RustpressClient({ baseUrl: 'https://api.example.com' });

async function createPost(data) {
  try {
    const post = await client.posts.create(data);
    return post;
  } catch (error) {
    if (error instanceof RustpressError) {
      // Handle specific error codes
      switch (error.code) {
        case 'VALIDATION_ERROR':
          // Display field-specific errors
          error.details.fields.forEach(field => {
            console.error(\`\${field.field}: \${field.message}\`);
          });
          break;

        case 'UNAUTHORIZED':
        case 'TOKEN_EXPIRED':
          // Redirect to login
          await refreshTokenOrRedirect();
          break;

        case 'RATE_LIMITED':
          // Wait and retry
          const retryAfter = error.headers['retry-after'] || 60;
          await sleep(retryAfter * 1000);
          return createPost(data);

        case 'NOT_FOUND':
          console.error('Resource not found');
          break;

        default:
          // Log unexpected errors
          console.error(\`Error [\${error.code}]: \${error.message}\`);
          console.error(\`Request ID: \${error.requestId}\`);
      }
    }
    throw error;
  }
}

// Generic error handler with retry logic
async function withRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof RustpressError && error.isRetryable && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Python">
              <CodeBlock
                code={`from rustpress import RustpressClient, RustpressError, ValidationError
import time

client = RustpressClient(base_url="https://api.example.com")

def create_post(data):
    try:
        return client.posts.create(**data)

    except ValidationError as e:
        # Handle validation errors
        for field_error in e.details["fields"]:
            print(f"{field_error['field']}: {field_error['message']}")
        raise

    except RustpressError as e:
        if e.code == "UNAUTHORIZED" or e.code == "TOKEN_EXPIRED":
            # Refresh token and retry
            refresh_token()
            return create_post(data)

        elif e.code == "RATE_LIMITED":
            # Wait and retry
            retry_after = int(e.headers.get("retry-after", 60))
            time.sleep(retry_after)
            return create_post(data)

        elif e.code == "NOT_FOUND":
            print("Resource not found")
            return None

        else:
            # Log error details for debugging
            print(f"Error [{e.code}]: {e.message}")
            print(f"Request ID: {e.request_id}")
            raise

# Decorator for automatic retry
def with_retry(max_retries=3):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_retries + 1):
                try:
                    return fn(*args, **kwargs)
                except RustpressError as e:
                    if e.is_retryable and attempt < max_retries:
                        delay = 2 ** attempt
                        time.sleep(delay)
                        continue
                    raise
        return wrapper
    return decorator

@with_retry(max_retries=3)
def fetch_posts():
    return client.posts.list()`}
                language="python"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`use rustpress_sdk::{Client, Error, ErrorCode};
use std::time::Duration;
use tokio::time::sleep;

async fn create_post(client: &Client, data: CreatePostData) -> Result<Post, Error> {
    match client.posts().create(data.clone()).await {
        Ok(post) => Ok(post),
        Err(error) => {
            match error.code() {
                ErrorCode::ValidationError => {
                    // Handle validation errors
                    if let Some(details) = error.details() {
                        for field in details.fields() {
                            eprintln!("{}: {}", field.name, field.message);
                        }
                    }
                    Err(error)
                }

                ErrorCode::Unauthorized | ErrorCode::TokenExpired => {
                    // Refresh token and retry
                    client.refresh_token().await?;
                    client.posts().create(data).await
                }

                ErrorCode::RateLimited => {
                    // Wait and retry
                    let retry_after = error
                        .headers()
                        .get("retry-after")
                        .and_then(|v| v.parse().ok())
                        .unwrap_or(60);

                    sleep(Duration::from_secs(retry_after)).await;
                    client.posts().create(data).await
                }

                ErrorCode::NotFound => {
                    eprintln!("Resource not found");
                    Err(error)
                }

                _ => {
                    eprintln!("Error [{}]: {}", error.code(), error.message());
                    eprintln!("Request ID: {}", error.request_id());
                    Err(error)
                }
            }
        }
    }
}

// Generic retry wrapper
async fn with_retry<T, F, Fut>(f: F, max_retries: u32) -> Result<T, Error>
where
    F: Fn() -> Fut,
    Fut: std::future::Future<Output = Result<T, Error>>,
{
    let mut attempt = 1;
    loop {
        match f().await {
            Ok(result) => return Ok(result),
            Err(error) if error.is_retryable() && attempt < max_retries => {
                let delay = Duration::from_secs(2_u64.pow(attempt));
                sleep(delay).await;
                attempt += 1;
            }
            Err(error) => return Err(error),
        }
    }
}`}
                language="rust"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Retry Strategies */}
        <section className="mb-12">
          <h2 id="retry-strategies" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Retry Strategies</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Some errors are transient and can be resolved by retrying. Here are best practices:
          </p>

          <div className="not-prose grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-green-800 dark:text-green-200">Retryable Errors</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>429 Too Many Requests</li>
                <li>500 Internal Server Error</li>
                <li>502 Bad Gateway</li>
                <li>503 Service Unavailable</li>
                <li>504 Gateway Timeout</li>
                <li>Network connection errors</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h3 className="font-semibold text-red-800 dark:text-red-200">Non-Retryable Errors</h3>
              </div>
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                <li>400 Bad Request</li>
                <li>401 Unauthorized</li>
                <li>403 Forbidden</li>
                <li>404 Not Found</li>
                <li>409 Conflict</li>
                <li>422 Validation Error</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Exponential Backoff</h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Always use exponential backoff with jitter when retrying:
          </p>

          <CodeBlock
            code={`// Exponential backoff with jitter
function calculateDelay(attempt, baseDelay = 1000, maxDelay = 30000) {
  // Exponential: 1s, 2s, 4s, 8s, 16s...
  const exponentialDelay = baseDelay * Math.pow(2, attempt - 1);

  // Cap at maximum delay
  const cappedDelay = Math.min(exponentialDelay, maxDelay);

  // Add jitter (0-25% random variation)
  const jitter = cappedDelay * 0.25 * Math.random();

  return cappedDelay + jitter;
}

// Usage
async function fetchWithRetry(fn, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (!isRetryable(error) || attempt === maxRetries) {
        throw error;
      }

      const delay = calculateDelay(attempt);
      console.log(\`Retry \${attempt}/\${maxRetries} after \${delay}ms\`);
      await sleep(delay);
    }
  }
}

// Respect Retry-After header for rate limits
function getRetryDelay(error) {
  const retryAfter = error.headers?.['retry-after'];
  if (retryAfter) {
    // Could be seconds or HTTP date
    const seconds = parseInt(retryAfter, 10);
    if (!isNaN(seconds)) {
      return seconds * 1000;
    }
    // Parse HTTP date
    const date = new Date(retryAfter);
    return Math.max(0, date.getTime() - Date.now());
  }
  return null;
}`}
            language="javascript"
          />
        </section>

        {/* Debugging */}
        <section className="mb-12">
          <h2 id="debugging" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Debugging</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            When troubleshooting errors, use these tools and techniques:
          </p>

          <div className="not-prose space-y-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Request ID</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Every response includes a <code>request_id</code>. Include this when contacting support
                    for faster resolution.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                  <Bug className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Debug Mode</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Enable debug mode in SDKs to log full request/response details.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">API Logs</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    View detailed API logs in your Rustpress dashboard under Settings &gt; API &gt; Logs.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Enable SDK Debug Mode</h3>

          <CodeBlock
            code={`// JavaScript
const client = new RustpressClient({
  baseUrl: 'https://api.example.com',
  debug: true,  // Logs all requests and responses
  logger: console  // Custom logger
});

# Python
client = RustpressClient(
    base_url="https://api.example.com",
    debug=True,
    logger=logging.getLogger("rustpress")
)

// Rust
let client = Client::builder()
    .base_url("https://api.example.com")
    .debug(true)
    .logger(tracing::info_span!("rustpress"))
    .build()?;`}
            language="javascript"
          />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-8">Common Issues & Solutions</h3>

          <div className="not-prose overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Issue</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Possible Cause</th>
                  <th className="py-3 px-4 text-gray-900 dark:text-white font-semibold">Solution</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">401 on every request</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Missing or malformed Authorization header</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Check header format: <code>Bearer &lt;token&gt;</code></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">403 with valid token</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Token lacks required scope</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Request additional scopes during auth</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">429 errors frequently</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Hitting rate limits</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Implement caching, batch requests</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Intermittent 500 errors</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Transient server issues</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Implement retry with exponential backoff</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">CORS errors in browser</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Origin not whitelisted</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Add origin to allowed list in settings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/docs/api/authentication"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Authentication
          </Link>
          <Link
            to="/docs/api/types"
            className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700 dark:hover:text-rust-300 transition-colors"
          >
            Type Definitions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
