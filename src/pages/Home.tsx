import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Puzzle, Palette, Book, Code, Rocket, Terminal, Github, Play, ChevronRight, Star, Users, Download } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { TypewriterCode, InteractiveTutorial } from '../components/ui';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Blazing Fast',
    description: 'Built with Rust for maximum performance. Serve thousands of requests per second.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure by Default',
    description: 'Memory-safe language with built-in security best practices.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: <Puzzle className="w-6 h-6" />,
    title: 'Plugin System',
    description: 'Extend functionality with a powerful hook and filter system.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Theme Engine',
    description: 'Create beautiful themes with our flexible template system.',
    color: 'from-pink-500 to-rose-500',
  },
];

const quickLinks = [
  {
    icon: <Book className="w-5 h-5" />,
    title: 'Getting Started',
    description: 'Learn the basics and get up and running in minutes.',
    href: '/docs/getting-started/introduction',
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: 'Theme Development',
    description: 'Create stunning themes for Rustpress sites.',
    href: '/docs/themes/basics',
  },
  {
    icon: <Puzzle className="w-5 h-5" />,
    title: 'Plugin Development',
    description: 'Extend Rustpress with powerful plugins.',
    href: '/docs/plugins/basics',
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: 'API Reference',
    description: 'Complete documentation of all APIs.',
    href: '/docs/api/overview',
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    title: 'CLI Reference',
    description: 'All available command line tools.',
    href: '/docs/getting-started/cli-commands',
  },
  {
    icon: <Play className="w-5 h-5" />,
    title: 'Examples',
    description: 'Real-world code examples and playground.',
    href: '/docs/examples/playground',
  },
];

const installCode = `# Install Rustpress CLI
cargo install rustpress-cli

# Create a new project
rustpress new my-site

# Start development server
cd my-site && rustpress dev

# Open http://localhost:3000`;

const tutorialSteps = [
  {
    title: 'Install Rustpress CLI',
    content: (
      <div>
        <p className="mb-4">First, install the Rustpress CLI using Cargo:</p>
        <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
          cargo install rustpress-cli
        </code>
      </div>
    ),
  },
  {
    title: 'Create Your Project',
    content: (
      <div>
        <p className="mb-4">Create a new Rustpress project with a single command:</p>
        <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
          rustpress new my-awesome-site
        </code>
      </div>
    ),
  },
  {
    title: 'Start Development',
    content: (
      <div>
        <p className="mb-4">Navigate to your project and start the dev server:</p>
        <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
          cd my-awesome-site && rustpress dev
        </code>
      </div>
    ),
  },
  {
    title: 'Build & Deploy',
    content: (
      <div>
        <p className="mb-4">When ready, build for production:</p>
        <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm">
          rustpress build --release
        </code>
      </div>
    ),
  },
];

const stats = [
  { icon: <Star className="w-5 h-5" />, value: '2.5k+', label: 'GitHub Stars' },
  { icon: <Download className="w-5 h-5" />, value: '50k+', label: 'Downloads' },
  { icon: <Users className="w-5 h-5" />, value: '1k+', label: 'Contributors' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-rust-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-rust-950/20" />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(227, 95, 41, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(227, 95, 41, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 80%, rgba(227, 95, 41, 0.2) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(227, 95, 41, 0.2) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rust-100 to-orange-100 dark:from-rust-900/50 dark:to-orange-900/50 text-rust-700 dark:text-rust-400 text-sm font-medium mb-6"
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Rocket className="w-4 h-4" />
                </motion.span>
                Now in Public Beta — v1.0.0
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Build with{' '}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-rust-500 via-orange-500 to-rust-600"
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: '200%' }}
                >
                  Rustpress
                </motion.span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
              >
                Learn how to create themes, plugins, and extend Rustpress — the modern,
                high-performance CMS built with Rust.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link to="/docs/getting-started/introduction">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rust-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-rust-500/30 hover:shadow-xl hover:shadow-rust-500/40 transition-shadow"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/docs/examples/playground">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Play className="w-5 h-5" />
                    Try Playground
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center gap-8 mt-12"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                      <span className="text-rust-500">{stat.icon}</span>
                      {stat.value}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Code Preview with Typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 max-w-2xl mx-auto"
            >
              <TypewriterCode code={installCode} language="bash" speed={25} autoStart={true} />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Developers Choose Rustpress
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A modern CMS that combines performance, security, and developer experience.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10"
                       style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }} />
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 group-hover:border-transparent transition-colors h-full">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg`}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Tutorial Section */}
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Get Started in Minutes
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Follow our interactive tutorial to create your first Rustpress site.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <InteractiveTutorial title="Quick Start Tutorial" steps={tutorialSteps} />
            </motion.div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Explore the Documentation
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Everything you need to build with Rustpress.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={link.href}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-rust-300 dark:hover:border-rust-700 transition-all h-full group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-rust-500 to-orange-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-rust-500/20"
                      >
                        {link.icon}
                      </motion.div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-rust-600 dark:group-hover:text-rust-400 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {link.description}
                      </p>
                      <motion.span
                        className="inline-flex items-center gap-2 text-sm font-semibold text-rust-600 dark:text-rust-400"
                        whileHover={{ x: 5 }}
                      >
                        Learn more
                        <ChevronRight className="w-4 h-4" />
                      </motion.span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-rust-600 via-rust-700 to-orange-700"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Build Something Amazing?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-rust-100 mb-10"
            >
              Join thousands of developers building with Rustpress.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/docs/getting-started/quick-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-rust-700 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-shadow"
                >
                  Quick Start Guide
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <a
                href="https://github.com/rust-press/rustpress"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </motion.button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
