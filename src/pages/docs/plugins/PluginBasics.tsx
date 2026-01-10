import { Link } from 'react-router-dom';
import { ArrowRight, Puzzle, Zap, Shield, Code } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Card, CardGrid, Steps, Step } from '../../../components/ui';

const tocItems = [
  { id: 'what-is-plugin', title: 'What is a Plugin?', level: 2 },
  { id: 'first-plugin', title: 'Your First Plugin', level: 2 },
  { id: 'plugin-lifecycle', title: 'Plugin Lifecycle', level: 2 },
];

export function PluginBasics() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Plugin Development</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Plugin Basics</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Learn how to extend Rustpress with custom plugins.</p>
        </div>

        <section className="mb-12">
          <h2 id="what-is-plugin" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What is a Plugin?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Plugins extend Rustpress functionality without modifying core code. They can add features, modify behavior, and integrate with external services.
          </p>
          <CardGrid columns={2}>
            <Card icon={<Puzzle className="w-5 h-5" />} title="Modular" description="Add or remove features independently" />
            <Card icon={<Zap className="w-5 h-5" />} title="Performant" description="Native Rust performance" />
            <Card icon={<Shield className="w-5 h-5" />} title="Secure" description="Sandboxed execution" />
            <Card icon={<Code className="w-5 h-5" />} title="Flexible" description="Hook into any part of Rustpress" />
          </CardGrid>
        </section>

        <section className="mb-12">
          <h2 id="first-plugin" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your First Plugin</h2>
          <Steps>
            <Step number={1} title="Create a new plugin">
              <CodeBlock code="rustpress plugin:create hello-world" language="bash" showLineNumbers={false} />
            </Step>
            <Step number={2} title="Edit the main plugin file">
              <CodeBlock code={`// plugins/hello-world/src/lib.rs
use rustpress::prelude::*;

#[plugin]
pub struct HelloWorld;

impl Plugin for HelloWorld {
    fn name(&self) -> &str { "Hello World" }
    fn version(&self) -> &str { "1.0.0" }

    fn init(&self, app: &mut App) {
        app.add_action("after_header", |_| {
            println!("Hello from plugin!");
        });
    }
}`} language="rust" title="plugins/hello-world/src/lib.rs" />
            </Step>
            <Step number={3} title="Enable the plugin">
              <CodeBlock code="rustpress plugin:enable hello-world" language="bash" showLineNumbers={false} />
            </Step>
          </Steps>
        </section>

        <section className="mb-12">
          <h2 id="plugin-lifecycle" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Plugin Lifecycle</h2>
          <CodeBlock code={`1. load()      - Plugin is loaded into memory
2. init()      - Plugin initializes (register hooks)
3. activate()  - Plugin is enabled
4. deactivate() - Plugin is disabled
5. unload()    - Plugin is removed from memory`} language="text" showLineNumbers={false} />
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/themes/publishing" className="text-gray-600 hover:text-rust-600">← Publishing Themes</Link>
          <Link to="/docs/plugins/structure" className="flex items-center gap-2 text-rust-600">Plugin Structure <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </article>
    </DocLayout>
  );
}
