import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Book, Palette, Puzzle, Code, Layers } from 'lucide-react';
import { navigation } from '../../data/navigation';

const sectionIcons: Record<string, React.ReactNode> = {
  'getting-started': <Book className="w-4 h-4" />,
  'themes': <Palette className="w-4 h-4" />,
  'plugins': <Puzzle className="w-4 h-4" />,
  'api': <Code className="w-4 h-4" />,
  'examples': <Layers className="w-4 h-4" />,
};

export function Sidebar() {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>(() => {
    // Open the section that contains the current page
    const currentSection = navigation.find(section =>
      section.items.some(item => item.path === location.pathname)
    );
    return currentSection ? [currentSection.id] : ['getting-started'];
  });

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-10 pr-4">
        <nav className="space-y-6">
          {navigation.map(section => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="text-rust-500 dark:text-rust-400">
                    {sectionIcons[section.id]}
                  </span>
                  {section.title}
                </span>
                {openSections.includes(section.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {openSections.includes(section.id) && (
                <ul className="mt-1 ml-4 border-l border-gray-200 dark:border-gray-800 space-y-1">
                  {section.items.map(item => (
                    <li key={item.id}>
                      <Link
                        to={item.path}
                        className={`block pl-4 pr-3 py-1.5 text-sm transition-colors border-l-2 -ml-px ${
                          location.pathname === item.path
                            ? 'border-rust-500 text-rust-600 dark:text-rust-400 font-medium bg-rust-50 dark:bg-rust-950/30'
                            : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Version Badge */}
        <div className="mt-8 px-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium">
              v1.0.0
            </span>
            <span>Latest</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
