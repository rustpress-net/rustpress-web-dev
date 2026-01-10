import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { FileTree } from '../../../components/ui';
import type { FileTreeItem } from '../../../components/ui';

const pluginStructure: FileTreeItem[] = [
  { name: 'my-plugin', type: 'folder', children: [
    { name: 'plugin.toml', type: 'file', highlight: true },
    { name: 'Cargo.toml', type: 'file' },
    { name: 'src', type: 'folder', children: [
      { name: 'lib.rs', type: 'file', highlight: true },
      { name: 'hooks.rs', type: 'file' },
      { name: 'admin.rs', type: 'file' },
    ]},
    { name: 'assets', type: 'folder', children: [
      { name: 'admin.css', type: 'file' },
      { name: 'admin.js', type: 'file' },
    ]},
  ]}
];

export function PluginStructure() {
  return (
    <DocLayout tocItems={[{ id: 'structure', title: 'Plugin Structure', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Plugin Structure</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Understanding the files and directories in a plugin.</p>
        </div>
        <section className="mb-12">
          <h2 id="structure" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Directory Structure</h2>
          <FileTree items={pluginStructure} title="Plugin Directory" />
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">plugin.toml</h2>
          <CodeBlock code={`[plugin]
name = "My Plugin"
version = "1.0.0"
author = "Your Name"
description = "A useful Rustpress plugin"

[dependencies]
rustpress = "1.0"

[admin]
menu_title = "My Plugin"
menu_icon = "settings"`} language="toml" title="plugin.toml" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/basics" className="text-gray-600 hover:text-rust-600">← Plugin Basics</Link>
          <Link to="/docs/plugins/hooks-actions" className="flex items-center gap-2 text-rust-600">Hooks & Actions <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
