import type { SearchResult } from '../types';
import { docsContent } from '../data/docs-content';

function fuzzyMatch(text: string, query: string): boolean {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  // Direct substring match
  if (lowerText.includes(lowerQuery)) return true;

  // Fuzzy character matching
  let queryIndex = 0;
  for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      queryIndex++;
    }
  }
  return queryIndex === lowerQuery.length;
}

function calculateRelevance(title: string, content: string, query: string): number {
  const lowerQuery = query.toLowerCase();
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();

  let score = 0;

  // Exact title match
  if (lowerTitle === lowerQuery) score += 100;
  // Title starts with query
  else if (lowerTitle.startsWith(lowerQuery)) score += 80;
  // Title contains query
  else if (lowerTitle.includes(lowerQuery)) score += 60;

  // Count occurrences in content
  const contentMatches = (lowerContent.match(new RegExp(lowerQuery, 'g')) || []).length;
  score += Math.min(contentMatches * 5, 40);

  return score;
}

function extractExcerpt(content: string, query: string, maxLength: number = 150): string {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();

  const index = lowerContent.indexOf(lowerQuery);

  if (index === -1) {
    return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '');
  }

  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + query.length + 100);

  let excerpt = content.slice(start, end);
  if (start > 0) excerpt = '...' + excerpt;
  if (end < content.length) excerpt = excerpt + '...';

  return excerpt;
}

export function searchDocs(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];

  docsContent.forEach(doc => {
    if (fuzzyMatch(doc.title, query) || fuzzyMatch(doc.content, query)) {
      results.push({
        id: doc.id,
        title: doc.title,
        path: doc.path,
        section: doc.section,
        excerpt: extractExcerpt(doc.content, query),
        relevance: calculateRelevance(doc.title, doc.content, query),
      });
    }
  });

  return results.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
}
