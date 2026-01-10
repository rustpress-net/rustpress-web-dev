import { Link } from 'react-router-dom';
import { ArrowRight, Server, Database, Users, FileText, Image, Palette, Puzzle, Settings, Clock, HardDrive, Shield } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem, Callout } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'global-options', title: 'Global Options', level: 2 },
  { id: 'auth', title: 'Authentication', level: 2 },
  { id: 'server', title: 'Server', level: 2 },
  { id: 'database', title: 'Database', level: 2 },
  { id: 'users', title: 'Users', level: 2 },
  { id: 'posts', title: 'Posts & Pages', level: 2 },
  { id: 'media', title: 'Media', level: 2 },
  { id: 'themes', title: 'Themes', level: 2 },
  { id: 'plugins', title: 'Plugins', level: 2 },
  { id: 'cache', title: 'Cache', level: 2 },
  { id: 'backup', title: 'Backup', level: 2 },
  { id: 'settings', title: 'Settings', level: 2 },
  { id: 'cron', title: 'Scheduled Tasks', level: 2 },
  { id: 'import-export', title: 'Import/Export', level: 2 },
];

function CommandSection({ id, title, icon, children }: { id: string; title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-rust-500/10 dark:bg-rust-500/20 flex items-center justify-center text-rust-500">
          {icon}
        </div>
        <h2 id={id} className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function CliCommands() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">Getting Started</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">CLI Commands</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete reference for the Rustpress command-line interface.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The Rustpress CLI provides comprehensive control over your installation. Get help on any command:
          </p>
          <CodeBlock
            code={`# General help
rustpress --help

# Command-specific help
rustpress server --help
rustpress db --help

# Show system information
rustpress info`}
            language="bash"
            showLineNumbers={false}
          />
        </section>

        {/* Global Options */}
        <section className="mb-12">
          <h2 id="global-options" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Global Options</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            These options are available for all commands:
          </p>
          <CodeBlock
            code={`-o, --output <FORMAT>   Output format: table, json, yaml (default: table)
-q, --quiet             Suppress non-essential output
-v, --verbose           Increase verbosity (-v, -vv, -vvv)
--no-color              Disable colored output
-c, --config <PATH>     Configuration file path (env: RUSTPRESS_CONFIG)`}
            language="text"
            showLineNumbers={false}
          />
        </section>

        {/* Authentication */}
        <CommandSection id="auth" title="Authentication" icon={<Shield className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Manage authentication and credentials for CLI operations.
          </p>
          <CodeBlock
            code={`# Login to Rustpress
rustpress auth login -e admin@example.com -p password
rustpress auth login --server https://your-site.com

# Show current logged-in user
rustpress auth whoami

# Display or refresh tokens
rustpress auth token --show
rustpress auth token --refresh

# Logout
rustpress auth logout

# Configure authentication settings
rustpress auth config --server https://your-site.com`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Server */}
        <CommandSection id="server" title="Server" icon={<Server className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Control the Rustpress server.
          </p>
          <CodeBlock
            code={`# Start the server
rustpress server start
rustpress server start --host 0.0.0.0 --port 8080
rustpress server start --workers 4 --foreground

# Stop the server
rustpress server stop
rustpress server stop --force

# Check server status
rustpress server status

# Health check
rustpress server health
rustpress server health --url https://your-site.com`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Database */}
        <CommandSection id="database" title="Database" icon={<Database className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Database operations and management.
          </p>
          <Accordion>
            <AccordionItem title="Migrations" defaultOpen>
              <CodeBlock
                code={`# Run pending migrations
rustpress db migrate

# Show migration status
rustpress db migrate --status

# Dry run (show what would be executed)
rustpress db migrate --dry-run

# Rollback last N migrations
rustpress db migrate --rollback 1`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Backup & Restore">
              <CodeBlock
                code={`# Create database backup
rustpress db backup -o backup.sql
rustpress db backup --include-media

# Restore from backup
rustpress db restore backup.sql
rustpress db restore backup.sql --yes  # Skip confirmation`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Queries & Utilities">
              <CodeBlock
                code={`# Check database status
rustpress db status

# List tables
rustpress db tables
rustpress db tables --verbose

# Execute SQL query
rustpress db query "SELECT COUNT(*) FROM posts"
rustpress db query "SELECT * FROM users" --limit 10

# Export table data
rustpress db export posts -f csv -o posts.csv
rustpress db export users -f json --where "role = 'admin'"

# Import data
rustpress db import data.csv -t posts

# Optimize tables
rustpress db optimize
rustpress db optimize -t posts`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
          <Callout type="warning" title="Caution">
            Database operations can be destructive. Always backup before running migrations or restore operations.
          </Callout>
        </CommandSection>

        {/* Users */}
        <CommandSection id="users" title="Users" icon={<Users className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            User management operations.
          </p>
          <CodeBlock
            code={`# List users
rustpress users list
rustpress users list --role admin --limit 50

# Create a new user
rustpress users create -e user@example.com -p password -n "John Doe" -r subscriber

# Create an admin user
rustpress users create-admin -e admin@example.com -p password -n "Admin"

# Get user details
rustpress users get admin@example.com

# Update user
rustpress users update admin@example.com -r editor --status active

# Reset password
rustpress users reset-password admin@example.com -p newpassword
rustpress users reset-password admin@example.com --generate

# Delete user
rustpress users delete admin@example.com
rustpress users delete 123 --force`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Posts & Pages */}
        <CommandSection id="posts" title="Posts & Pages" icon={<FileText className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Manage posts and pages from the command line.
          </p>
          <Accordion>
            <AccordionItem title="Posts" defaultOpen>
              <CodeBlock
                code={`# List posts
rustpress posts list
rustpress posts list --status draft --author 1 --limit 20

# Create a post
rustpress posts create -t "My New Post" --content "Post content..."
rustpress posts create -t "From File" -f content.md --status draft

# Get post details
rustpress posts get 123
rustpress posts get my-post-slug

# Update post
rustpress posts update 123 -t "Updated Title" --status published

# Delete post
rustpress posts delete 123
rustpress posts delete 123 --force  # Permanently delete`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
            <AccordionItem title="Pages">
              <CodeBlock
                code={`# List pages
rustpress pages list
rustpress pages list --status published --parent 5

# Create a page
rustpress pages create -t "About Us" --content "..." --template full-width

# Get page details
rustpress pages get about-us

# Update page
rustpress pages update about-us --template sidebar

# Delete page
rustpress pages delete about-us`}
                language="bash"
                showLineNumbers={false}
              />
            </AccordionItem>
          </Accordion>
        </CommandSection>

        {/* Media */}
        <CommandSection id="media" title="Media" icon={<Image className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Media file management.
          </p>
          <CodeBlock
            code={`# List media files
rustpress media list
rustpress media list --type image --limit 50

# Upload a file
rustpress media upload ./image.jpg
rustpress media upload ./photo.png -t "My Photo" -a "Alt text"

# Get media details
rustpress media get 123

# Delete media
rustpress media delete 123
rustpress media delete 123 --delete-file  # Also remove file

# Optimize media
rustpress media optimize --all
rustpress media optimize 123

# Regenerate thumbnails
rustpress media regenerate-thumbnails --all`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Themes */}
        <CommandSection id="themes" title="Themes" icon={<Palette className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Theme management operations.
          </p>
          <CodeBlock
            code={`# List installed themes
rustpress themes list
rustpress themes list --status active

# Get theme details
rustpress themes get developer-developer

# Activate a theme
rustpress themes activate developer-developer

# Install a theme
rustpress themes install ./my-theme.zip
rustpress themes install github:username/my-theme

# Export a theme
rustpress themes export developer-developer -o theme.zip

# Delete a theme
rustpress themes delete my-old-theme

# Scan for new themes
rustpress themes scan`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Plugins */}
        <CommandSection id="plugins" title="Plugins" icon={<Puzzle className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Plugin management operations.
          </p>
          <CodeBlock
            code={`# List plugins
rustpress plugins list
rustpress plugins list --status active

# Get plugin details
rustpress plugins get rustanalytics

# Activate a plugin
rustpress plugins activate rustanalytics

# Deactivate a plugin
rustpress plugins deactivate rustanalytics

# Install a plugin
rustpress plugins install ./my-plugin.rpp
rustpress plugins install github:username/my-plugin

# Uninstall a plugin
rustpress plugins uninstall my-plugin
rustpress plugins uninstall my-plugin --force

# Check for updates
rustpress plugins check-updates`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Cache */}
        <CommandSection id="cache" title="Cache" icon={<HardDrive className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Cache management operations.
          </p>
          <CodeBlock
            code={`# Show cache statistics
rustpress cache stats

# Clear all cache
rustpress cache clear

# Clear specific cache type
rustpress cache clear -t page
rustpress cache clear -t object
rustpress cache clear -t query

# Warm the cache
rustpress cache warm --pages --posts

# Get/set cache configuration
rustpress cache config --get max_capacity
rustpress cache config --set max_capacity=20000`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Backup */}
        <CommandSection id="backup" title="Backup" icon={<HardDrive className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Backup and restore operations.
          </p>
          <CodeBlock
            code={`# Create a backup
rustpress backup create
rustpress backup create --include-media -o ./backups/

# List backups
rustpress backup list

# Restore from backup
rustpress backup restore backup-2024-01-15
rustpress backup restore backup-2024-01-15 --yes

# Delete a backup
rustpress backup delete backup-2024-01-15

# Download backup
rustpress backup download backup-2024-01-15 -o ./backup.zip

# Manage backup schedules
rustpress backup schedule list
rustpress backup schedule create --cron "0 0 * * *" --type full
rustpress backup schedule delete 1`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Settings */}
        <CommandSection id="settings" title="Settings" icon={<Settings className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Site settings management.
          </p>
          <CodeBlock
            code={`# List all settings
rustpress settings list
rustpress settings list -g general

# Get a setting
rustpress settings get site_title

# Set a setting
rustpress settings set site_title "My Awesome Site"

# Export settings
rustpress settings export -o settings.json

# Import settings
rustpress settings import settings.json`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Cron */}
        <CommandSection id="cron" title="Scheduled Tasks" icon={<Clock className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Manage scheduled tasks (cron jobs).
          </p>
          <CodeBlock
            code={`# List scheduled tasks
rustpress cron list

# Get task details
rustpress cron get daily_cleanup

# Run a task immediately
rustpress cron run daily_cleanup

# Enable/disable a task
rustpress cron enable daily_cleanup
rustpress cron disable daily_cleanup

# View task history
rustpress cron history
rustpress cron history daily_cleanup --limit 20

# Create a new task
rustpress cron create -n "my_task" --schedule "0 * * * *" --command "cleanup"

# Delete a task
rustpress cron delete my_task`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Import/Export */}
        <CommandSection id="import-export" title="Import/Export" icon={<FileText className="w-5 h-5" />}>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Import from WordPress or export your content.
          </p>
          <CodeBlock
            code={`# Import from WordPress WXR file
rustpress wp import ./wordpress-export.xml
rustpress wp import ./export.xml --posts --pages --media --users
rustpress wp import ./export.xml --dry-run

# Export to WordPress WXR format
rustpress wp export -o export.xml
rustpress wp export --posts --pages --published-only

# Analyze a WXR file
rustpress wp analyze ./wordpress-export.xml`}
            language="bash"
            showLineNumbers={false}
          />
        </CommandSection>

        {/* Shell Completions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Shell Completions</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Generate shell completion scripts for your terminal:
          </p>
          <CodeBlock
            code={`# Bash
rustpress completion bash > /etc/bash_completion.d/rustpress

# Zsh
rustpress completion zsh > ~/.zsh/completions/_rustpress

# Fish
rustpress completion fish > ~/.config/fish/completions/rustpress.fish

# PowerShell
rustpress completion powershell > rustpress.ps1`}
            language="bash"
            showLineNumbers={false}
          />
        </section>

        {/* Interactive Mode */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Interactive Mode</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start an interactive REPL shell for running multiple commands:
          </p>
          <CodeBlock
            code={`# Start interactive shell
rustpress interactive
rustpress shell  # alias

# In the shell, run commands without the 'rustpress' prefix:
> posts list
> users get admin@example.com
> cache clear
> exit`}
            language="bash"
            showLineNumbers={false}
          />
        </section>

        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link to="/docs/getting-started/configuration" className="text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400">
            ← Configuration
          </Link>
          <Link to="/docs/themes/basics" className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700">
            Theme Development <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
