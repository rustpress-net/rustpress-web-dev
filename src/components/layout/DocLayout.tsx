import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { TableOfContents } from './TableOfContents';
import { MobileNav } from './MobileNav';

interface DocLayoutProps {
  children: ReactNode;
  showToc?: boolean;
  tocItems?: { id: string; title: string; level: number }[];
}

export function DocLayout({ children, showToc = true, tocItems = [] }: DocLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>

          {/* Right TOC Sidebar */}
          {showToc && tocItems.length > 0 && (
            <TableOfContents items={tocItems} />
          )}
        </div>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
