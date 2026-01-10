import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';

export function PluginTesting() {
  return (
    <DocLayout tocItems={[{ id: 'testing', title: 'Testing', level: 2 }]}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Testing Plugins</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Write tests for your Rustpress plugins.</p>
        </div>
        <section className="mb-12">
          <h2 id="testing" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Unit Tests</h2>
          <CodeBlock code={`#[cfg(test)]
mod tests {
    use super::*;
    use rustpress::testing::*;

    #[test]
    fn test_filter_modifies_content() {
        let mut app = TestApp::new();
        app.load_plugin::<MyPlugin>();

        let result = app.apply_filter("the_content", "Hello");
        assert!(result.contains("Hello"));
    }
}

// Run tests
// cargo test --package my-plugin`} language="rust" />
        </section>
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/plugins/security" className="text-gray-600 hover:text-rust-600">← Security</Link>
          <Link to="/docs/plugins/publishing" className="flex items-center gap-2 text-rust-600">Publishing Plugins <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
