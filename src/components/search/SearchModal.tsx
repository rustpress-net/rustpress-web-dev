import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, ArrowRight, Clock } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

export function SearchModal() {
  const {
    isOpen,
    query,
    results,
    recentSearches,
    closeSearch,
    search,
    clearSearch,
    addToRecent,
  } = useSearch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          closeSearch();
        } else {
          search('');
        }
      }

      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          closeSearch();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex].path);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, closeSearch, search]);

  const handleSelect = (path: string) => {
    addToRecent(query);
    closeSearch();
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeSearch}
      />

      {/* Modal */}
      <div className="relative max-w-2xl mx-auto mt-20 mx-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Search Input */}
          <div className="flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => search(e.target.value)}
              placeholder="Search documentation..."
              className="flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={closeSearch}
              className="ml-2 px-2 py-1 text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 rounded"
            >
              ESC
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query ? (
              results.length > 0 ? (
                <ul className="p-2">
                  {results.map((result, index) => (
                    <li key={result.id}>
                      <button
                        onClick={() => handleSelect(result.path)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${
                          selectedIndex === index
                            ? 'bg-rust-50 dark:bg-rust-950/50'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <FileText className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          selectedIndex === index
                            ? 'text-rust-500'
                            : 'text-gray-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${
                              selectedIndex === index
                                ? 'text-rust-600 dark:text-rust-400'
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {result.title}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                              {result.section}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {result.excerpt}
                          </p>
                        </div>
                        <ArrowRight className={`w-4 h-4 flex-shrink-0 mt-1 ${
                          selectedIndex === index
                            ? 'text-rust-500'
                            : 'text-gray-300 dark:text-gray-600'
                        }`} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No results found for "{query}"
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Try searching for something else
                  </p>
                </div>
              )
            ) : recentSearches.length > 0 ? (
              <div className="p-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Recent Searches
                </p>
                <ul className="space-y-1">
                  {recentSearches.map((recentQuery, index) => (
                    <li key={index}>
                      <button
                        onClick={() => search(recentQuery)}
                        className="w-full flex items-center gap-2 p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Clock className="w-4 h-4" />
                        {recentQuery}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <p>Start typing to search...</p>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">↵</kbd>
                    to select
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
