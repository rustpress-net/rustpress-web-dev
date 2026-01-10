import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface AnimatedCardProps {
  title: string;
  description?: string;
  href?: string;
  icon?: ReactNode;
  children?: ReactNode;
  delay?: number;
  gradient?: boolean;
}

export function AnimatedCard({
  title,
  description,
  href,
  icon,
  children,
  delay = 0,
  gradient = false,
}: AnimatedCardProps) {
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative group rounded-2xl p-6 ${
        gradient
          ? 'bg-gradient-to-br from-rust-500/10 via-orange-500/10 to-amber-500/10 dark:from-rust-500/20 dark:via-orange-500/20 dark:to-amber-500/20'
          : 'bg-white dark:bg-gray-900'
      } border border-gray-200 dark:border-gray-800 hover:border-rust-300 dark:hover:border-rust-700 transition-all duration-300 hover:shadow-xl hover:shadow-rust-500/10`}
    >
      {/* Animated border gradient on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rust-500 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />

      {icon && (
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-rust-500 to-orange-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-rust-500/30"
        >
          {icon}
        </motion.div>
      )}

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-rust-600 dark:group-hover:text-rust-400 transition-colors">
        {title}
      </h3>

      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      )}

      {children}

      {href && (
        <motion.span
          className="inline-flex items-center gap-2 text-sm font-semibold text-rust-600 dark:text-rust-400 mt-4"
          whileHover={{ x: 5 }}
        >
          Learn more
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      )}
    </motion.div>
  );

  if (href) {
    return <Link to={href}>{cardContent}</Link>;
  }

  return cardContent;
}

interface AnimatedCardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function AnimatedCardGrid({ children, columns = 3 }: AnimatedCardGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={`grid gap-6 ${gridCols[columns]}`}
    >
      {children}
    </motion.div>
  );
}
