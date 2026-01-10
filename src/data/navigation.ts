import type { DocSection } from '../types';

export const navigation: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of Rustpress development',
    items: [
      { id: 'introduction', title: 'Introduction', path: '/docs/getting-started/introduction' },
      { id: 'installation', title: 'Installation', path: '/docs/getting-started/installation' },
      { id: 'quick-start', title: 'Quick Start', path: '/docs/getting-started/quick-start' },
      { id: 'project-structure', title: 'Project Structure', path: '/docs/getting-started/project-structure' },
      { id: 'configuration', title: 'Configuration', path: '/docs/getting-started/configuration' },
      { id: 'cli-commands', title: 'CLI Commands', path: '/docs/getting-started/cli-commands' },
    ],
  },
  {
    id: 'themes',
    title: 'Theme Development',
    description: 'Create beautiful themes for Rustpress',
    items: [
      { id: 'theme-basics', title: 'Theme Basics', path: '/docs/themes/basics' },
      { id: 'theme-structure', title: 'Theme Structure', path: '/docs/themes/structure' },
      { id: 'template-hierarchy', title: 'Template Hierarchy', path: '/docs/themes/template-hierarchy' },
      { id: 'template-tags', title: 'Template Tags', path: '/docs/themes/template-tags' },
      { id: 'theme-json', title: 'theme.json Configuration', path: '/docs/themes/theme-json' },
      { id: 'styling', title: 'Styling & CSS', path: '/docs/themes/styling' },
      { id: 'assets', title: 'Assets Management', path: '/docs/themes/assets' },
      { id: 'theme-hooks', title: 'Theme Hooks', path: '/docs/themes/hooks' },
      { id: 'responsive-design', title: 'Responsive Design', path: '/docs/themes/responsive' },
      { id: 'theme-testing', title: 'Testing Themes', path: '/docs/themes/testing' },
      { id: 'publishing', title: 'Publishing Themes', path: '/docs/themes/publishing' },
    ],
  },
  {
    id: 'plugins',
    title: 'Plugin Development',
    description: 'Extend Rustpress with powerful plugins',
    items: [
      { id: 'plugin-basics', title: 'Plugin Basics', path: '/docs/plugins/basics' },
      { id: 'plugin-structure', title: 'Plugin Structure', path: '/docs/plugins/structure' },
      { id: 'hooks-actions', title: 'Hooks & Actions', path: '/docs/plugins/hooks-actions' },
      { id: 'filters', title: 'Filters', path: '/docs/plugins/filters' },
      { id: 'database', title: 'Database Access', path: '/docs/plugins/database' },
      { id: 'rest-api', title: 'REST API Extensions', path: '/docs/plugins/rest-api' },
      { id: 'admin-pages', title: 'Admin Pages', path: '/docs/plugins/admin-pages' },
      { id: 'settings-api', title: 'Settings API', path: '/docs/plugins/settings-api' },
      { id: 'security', title: 'Security Best Practices', path: '/docs/plugins/security' },
      { id: 'plugin-testing', title: 'Testing Plugins', path: '/docs/plugins/testing' },
      { id: 'plugin-publishing', title: 'Publishing Plugins', path: '/docs/plugins/publishing' },
    ],
  },
  {
    id: 'api',
    title: 'API Reference',
    description: 'Complete API documentation',
    items: [
      { id: 'api-overview', title: 'API Overview', path: '/docs/api/overview' },
      { id: 'core-functions', title: 'Core Functions', path: '/docs/api/core-functions' },
      { id: 'hooks-reference', title: 'Hooks Reference', path: '/docs/api/hooks' },
      { id: 'filters-reference', title: 'Filters Reference', path: '/docs/api/filters' },
      { id: 'database-api', title: 'Database API', path: '/docs/api/database' },
      { id: 'rest-endpoints', title: 'REST Endpoints', path: '/docs/api/rest-endpoints' },
      { id: 'graphql', title: 'GraphQL API', path: '/docs/api/graphql' },
      { id: 'webhooks', title: 'Webhooks', path: '/docs/api/webhooks' },
      { id: 'sdks', title: 'SDKs & Libraries', path: '/docs/api/sdks' },
      { id: 'rate-limiting', title: 'Rate Limiting', path: '/docs/api/rate-limiting' },
      { id: 'authentication', title: 'Authentication', path: '/docs/api/authentication' },
      { id: 'error-handling', title: 'Error Handling', path: '/docs/api/error-handling' },
      { id: 'types', title: 'Type Definitions', path: '/docs/api/types' },
    ],
  },
  {
    id: 'examples',
    title: 'Examples',
    description: 'Learn by example with real-world code',
    items: [
      { id: 'theme-examples', title: 'Theme Examples', path: '/docs/examples/themes' },
      { id: 'plugin-examples', title: 'Plugin Examples', path: '/docs/examples/plugins' },
      { id: 'api-examples', title: 'API Usage Examples', path: '/docs/examples/api' },
      { id: 'playground', title: 'Code Playground', path: '/docs/examples/playground' },
    ],
  },
];

export const flattenNavigation = () => {
  const items: { path: string; title: string; section: string }[] = [];
  navigation.forEach(section => {
    section.items.forEach(item => {
      items.push({
        path: item.path,
        title: item.title,
        section: section.title,
      });
    });
  });
  return items;
};
