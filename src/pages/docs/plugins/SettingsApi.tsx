import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function SettingsApi() {
  return (
    <DocLayout tocItems={[{ id: 'settings', title: 'Settings API', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Settings API</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Store and retrieve plugin settings.</p>
        </div>
        <section className="mb-12">
          <h2 id="settings" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Using Settings</h2>
          <CodeBlock code={`use rustpress::prelude::*;

// Register settings
app.register_setting("my_plugin_option", SettingConfig {
    default: "default_value".into(),
    sanitize: |v| v.trim().to_string(),
});

// Get a setting
let value = settings.get("my_plugin_option")?;

// Update a setting
settings.set("my_plugin_option", "new_value")?;`} language="rust" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/admin-pages" className="text-gray-600 hover:text-rust-600">← Admin Pages</Link>
          <Link to="/docs/plugins/security" className="flex items-center gap-2 text-rust-600">Security <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
