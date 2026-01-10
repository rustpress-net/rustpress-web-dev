import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Check, ChevronDown, Loader2 } from 'lucide-react';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  sampleBody?: string;
}

const endpoints: Endpoint[] = [
  { method: 'GET', path: '/api/v1/posts', description: 'Get all posts' },
  { method: 'GET', path: '/api/v1/posts/:id', description: 'Get single post' },
  { method: 'POST', path: '/api/v1/posts', description: 'Create a post', sampleBody: '{\n  "title": "My Post",\n  "content": "Post content...",\n  "status": "published"\n}' },
  { method: 'PUT', path: '/api/v1/posts/:id', description: 'Update a post', sampleBody: '{\n  "title": "Updated Title"\n}' },
  { method: 'DELETE', path: '/api/v1/posts/:id', description: 'Delete a post' },
  { method: 'GET', path: '/api/v1/users', description: 'Get all users' },
  { method: 'GET', path: '/api/v1/categories', description: 'Get all categories' },
  { method: 'GET', path: '/api/v1/tags', description: 'Get all tags' },
];

const methodColors = {
  GET: 'bg-green-500',
  POST: 'bg-blue-500',
  PUT: 'bg-yellow-500',
  DELETE: 'bg-red-500',
};

export function LiveApiTester() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint>(endpoints[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const sendRequest = async () => {
    setIsLoading(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate mock response based on endpoint
    const mockResponses: Record<string, object> = {
      '/api/v1/posts': {
        data: [
          { id: 1, title: 'Getting Started with Rustpress', status: 'published', created_at: '2024-01-15' },
          { id: 2, title: 'Building Your First Theme', status: 'published', created_at: '2024-01-14' },
          { id: 3, title: 'Plugin Development Guide', status: 'draft', created_at: '2024-01-13' },
        ],
        meta: { total: 3, page: 1, per_page: 10 },
      },
      '/api/v1/posts/:id': {
        data: { id: 1, title: 'Getting Started with Rustpress', content: 'Full post content...', status: 'published' },
      },
      '/api/v1/users': {
        data: [
          { id: 1, username: 'admin', email: 'admin@example.com', role: 'administrator' },
          { id: 2, username: 'editor', email: 'editor@example.com', role: 'editor' },
        ],
      },
      '/api/v1/categories': {
        data: [
          { id: 1, name: 'Technology', slug: 'technology', count: 15 },
          { id: 2, name: 'Tutorials', slug: 'tutorials', count: 23 },
        ],
      },
      '/api/v1/tags': {
        data: [
          { id: 1, name: 'rust', slug: 'rust', count: 8 },
          { id: 2, name: 'web', slug: 'web', count: 12 },
        ],
      },
    };

    const key = selectedEndpoint.path.includes(':id')
      ? selectedEndpoint.path
      : selectedEndpoint.path;

    const mockResponse = mockResponses[key] || { message: 'Success', status: 200 };
    setResponse(JSON.stringify(mockResponse, null, 2));
    setIsLoading(false);
  };

  const copyResponse = async () => {
    if (response) {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500">
        <h3 className="text-lg font-bold text-white">API Playground</h3>
        <p className="text-white/80 text-sm">Test Rustpress REST API endpoints</p>
      </div>

      {/* Endpoint selector */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Endpoint
        </label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 text-xs font-bold text-white rounded ${methodColors[selectedEndpoint.method]}`}>
                {selectedEndpoint.method}
              </span>
              <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                {selectedEndpoint.path}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-10 max-h-64 overflow-y-auto"
              >
                {endpoints.map((endpoint, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedEndpoint(endpoint);
                      setRequestBody(endpoint.sampleBody || '');
                      setIsDropdownOpen(false);
                      setResponse(null);
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    <span className={`px-2 py-1 text-xs font-bold text-white rounded ${methodColors[endpoint.method]}`}>
                      {endpoint.method}
                    </span>
                    <div className="text-left">
                      <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                        {endpoint.path}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {endpoint.description}
                      </p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Request body (for POST/PUT) */}
      {(selectedEndpoint.method === 'POST' || selectedEndpoint.method === 'PUT') && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Request Body (JSON)
          </label>
          <textarea
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            placeholder="Enter JSON body..."
            className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rust-500"
          />
        </div>
      )}

      {/* Send button */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={sendRequest}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-rust-500 to-orange-500 hover:from-rust-600 hover:to-orange-600 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Request
            </>
          )}
        </button>
      </div>

      {/* Response */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-800">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Response</span>
              <button
                onClick={copyResponse}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-6 bg-gray-900 text-green-400 font-mono text-sm overflow-x-auto max-h-64">
              {response}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
