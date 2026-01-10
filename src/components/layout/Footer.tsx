import { Link } from 'react-router-dom';
import { Github, Twitter, MessageCircle } from 'lucide-react';

const footerLinks = {
  documentation: [
    { title: 'Getting Started', path: '/docs/getting-started/introduction' },
    { title: 'Theme Development', path: '/docs/themes/basics' },
    { title: 'Plugin Development', path: '/docs/plugins/basics' },
    { title: 'API Reference', path: '/docs/api/overview' },
  ],
  resources: [
    { title: 'Examples', path: '/docs/examples/themes' },
    { title: 'Code Playground', path: '/docs/examples/playground' },
    { title: 'Changelog', path: '/changelog' },
    { title: 'Roadmap', path: '/roadmap' },
  ],
  community: [
    { title: 'GitHub', href: 'https://github.com/rust-press/rustpress' },
    { title: 'Discord', href: 'https://discord.gg/rustpress' },
    { title: 'Twitter', href: 'https://twitter.com/rustpress' },
    { title: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/rustpress' },
  ],
  legal: [
    { title: 'License', path: '/license' },
    { title: 'Privacy Policy', path: '/privacy' },
    { title: 'Terms of Service', path: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Documentation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Documentation
            </h3>
            <ul className="space-y-2">
              {footerLinks.documentation.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Community
            </h3>
            <ul className="space-y-2">
              {footerLinks.community.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-rust-500 to-rust-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Rustpress Developer Documentation
              </span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/rust-press/rustpress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/rustpress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/rustpress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-500">
              &copy; {new Date().getFullYear()} Rustpress. MIT License.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
