import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SearchProvider } from './context/SearchContext';
import { SearchModal } from './components/search';
import { ToastProvider, ScrollProgress, KeyboardShortcutsModal } from './components/ui';

// Pages
import { Home } from './pages/Home';

// Getting Started
import {
  Introduction,
  Installation,
  QuickStart,
  ProjectStructure,
  Configuration,
  CliCommands,
} from './pages/docs/getting-started';

// Theme Development
import {
  ThemeBasics,
  ThemeStructure,
  TemplateHierarchy,
  TemplateTags,
  ThemeJson,
  Styling,
  Assets,
  ThemeHooks,
  ResponsiveDesign,
  ThemeTesting,
  ThemePublishing,
} from './pages/docs/themes';

// Plugin Development
import {
  PluginBasics,
  PluginStructure,
  HooksActions,
  Filters,
  Database,
  RestApi,
  AdminPages,
  SettingsApi,
  Security,
  PluginTesting,
  PluginPublishing,
} from './pages/docs/plugins';

// API Reference
import {
  ApiOverview,
  CoreFunctions,
  HooksReference,
  FiltersReference,
  DatabaseApi,
  RestEndpoints,
  GraphQL,
  Webhooks,
  SDKs,
  RateLimiting,
  Authentication,
  ErrorHandling,
  Types,
} from './pages/docs/api';

// Examples
import {
  ThemeExamples,
  PluginExamples,
  ApiExamples,
  Playground,
} from './pages/docs/examples';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SearchProvider>
          {/* Global interactive components */}
          <ScrollProgress />
          <KeyboardShortcutsModal />
          <ToastProvider />

          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Getting Started */}
            <Route path="/docs" element={<Navigate to="/docs/getting-started/introduction" replace />} />
            <Route path="/docs/getting-started" element={<Navigate to="/docs/getting-started/introduction" replace />} />
            <Route path="/docs/getting-started/introduction" element={<Introduction />} />
            <Route path="/docs/getting-started/installation" element={<Installation />} />
            <Route path="/docs/getting-started/quick-start" element={<QuickStart />} />
            <Route path="/docs/getting-started/project-structure" element={<ProjectStructure />} />
            <Route path="/docs/getting-started/configuration" element={<Configuration />} />
            <Route path="/docs/getting-started/cli-commands" element={<CliCommands />} />

            {/* Theme Development */}
            <Route path="/docs/themes" element={<Navigate to="/docs/themes/basics" replace />} />
            <Route path="/docs/themes/basics" element={<ThemeBasics />} />
            <Route path="/docs/themes/structure" element={<ThemeStructure />} />
            <Route path="/docs/themes/template-hierarchy" element={<TemplateHierarchy />} />
            <Route path="/docs/themes/template-tags" element={<TemplateTags />} />
            <Route path="/docs/themes/theme-json" element={<ThemeJson />} />
            <Route path="/docs/themes/styling" element={<Styling />} />
            <Route path="/docs/themes/assets" element={<Assets />} />
            <Route path="/docs/themes/hooks" element={<ThemeHooks />} />
            <Route path="/docs/themes/responsive-design" element={<ResponsiveDesign />} />
            <Route path="/docs/themes/testing" element={<ThemeTesting />} />
            <Route path="/docs/themes/publishing" element={<ThemePublishing />} />

            {/* Plugin Development */}
            <Route path="/docs/plugins" element={<Navigate to="/docs/plugins/basics" replace />} />
            <Route path="/docs/plugins/basics" element={<PluginBasics />} />
            <Route path="/docs/plugins/structure" element={<PluginStructure />} />
            <Route path="/docs/plugins/hooks-actions" element={<HooksActions />} />
            <Route path="/docs/plugins/filters" element={<Filters />} />
            <Route path="/docs/plugins/database" element={<Database />} />
            <Route path="/docs/plugins/rest-api" element={<RestApi />} />
            <Route path="/docs/plugins/admin-pages" element={<AdminPages />} />
            <Route path="/docs/plugins/settings-api" element={<SettingsApi />} />
            <Route path="/docs/plugins/security" element={<Security />} />
            <Route path="/docs/plugins/testing" element={<PluginTesting />} />
            <Route path="/docs/plugins/publishing" element={<PluginPublishing />} />

            {/* API Reference */}
            <Route path="/docs/api" element={<Navigate to="/docs/api/overview" replace />} />
            <Route path="/docs/api/overview" element={<ApiOverview />} />
            <Route path="/docs/api/core-functions" element={<CoreFunctions />} />
            <Route path="/docs/api/hooks" element={<HooksReference />} />
            <Route path="/docs/api/filters" element={<FiltersReference />} />
            <Route path="/docs/api/database" element={<DatabaseApi />} />
            <Route path="/docs/api/rest-endpoints" element={<RestEndpoints />} />
            <Route path="/docs/api/graphql" element={<GraphQL />} />
            <Route path="/docs/api/webhooks" element={<Webhooks />} />
            <Route path="/docs/api/sdks" element={<SDKs />} />
            <Route path="/docs/api/rate-limiting" element={<RateLimiting />} />
            <Route path="/docs/api/authentication" element={<Authentication />} />
            <Route path="/docs/api/error-handling" element={<ErrorHandling />} />
            <Route path="/docs/api/types" element={<Types />} />

            {/* Examples */}
            <Route path="/docs/examples" element={<Navigate to="/docs/examples/themes" replace />} />
            <Route path="/docs/examples/themes" element={<ThemeExamples />} />
            <Route path="/docs/examples/plugins" element={<PluginExamples />} />
            <Route path="/docs/examples/api" element={<ApiExamples />} />
            <Route path="/docs/examples/playground" element={<Playground />} />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <SearchModal />
        </SearchProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
