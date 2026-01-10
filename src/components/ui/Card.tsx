import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CardProps {
  title: string;
  description?: string;
  href?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export function Card({ title, description, href, icon, children }: CardProps) {
  const content = (
    <>
      {icon && (
        <div className="w-10 h-10 rounded-lg bg-rust-100 dark:bg-rust-900/50 flex items-center justify-center text-rust-600 dark:text-rust-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {description}
        </p>
      )}
      {children}
      {href && (
        <span className="inline-flex items-center gap-1 text-sm font-medium text-rust-600 dark:text-rust-400 mt-4">
          Learn more
          <ArrowRight className="w-4 h-4" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link to={href} className="card block group hover:border-rust-300 dark:hover:border-rust-700">
        {content}
      </Link>
    );
  }

  return <div className="card">{content}</div>;
}

interface CardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function CardGrid({ children, columns = 3 }: CardGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {children}
    </div>
  );
}
