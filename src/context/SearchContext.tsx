import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import type { SearchResult } from '../types';
import { searchDocs } from '../utils/search';

interface SearchContextType {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  recentSearches: string[];
  openSearch: () => void;
  closeSearch: () => void;
  search: (query: string) => void;
  clearSearch: () => void;
  addToRecent: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      const searchResults = searchDocs(searchQuery);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
  }, []);

  const addToRecent = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setRecentSearches(prev => {
      const updated = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <SearchContext.Provider value={{
      isOpen,
      query,
      results,
      recentSearches,
      openSearch,
      closeSearch,
      search,
      clearSearch,
      addToRecent,
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
