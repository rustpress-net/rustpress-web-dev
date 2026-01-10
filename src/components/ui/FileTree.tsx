import { useState } from 'react';
import { Folder, FolderOpen, File, ChevronRight, ChevronDown } from 'lucide-react';

interface FileTreeItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeItem[];
  highlight?: boolean;
}

interface FileTreeNodeProps {
  item: FileTreeItem;
  depth?: number;
}

function FileTreeNode({ item, depth = 0 }: FileTreeNodeProps) {
  const [isOpen, setIsOpen] = useState(true);

  const icon = item.type === 'folder' ? (
    isOpen ? (
      <FolderOpen className="w-4 h-4 text-rust-500" />
    ) : (
      <Folder className="w-4 h-4 text-rust-500" />
    )
  ) : (
    <File className="w-4 h-4 text-gray-400" />
  );

  return (
    <div>
      <div
        className={`flex items-center gap-1 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
          item.highlight ? 'bg-rust-50 dark:bg-rust-950/30' : ''
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {item.type === 'folder' && item.children && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          >
            {isOpen ? (
              <ChevronDown className="w-3 h-3 text-gray-400" />
            ) : (
              <ChevronRight className="w-3 h-3 text-gray-400" />
            )}
          </button>
        )}
        {item.type === 'file' && <span className="w-4" />}
        {icon}
        <span className={`text-sm ${item.highlight ? 'text-rust-600 dark:text-rust-400 font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
          {item.name}
        </span>
      </div>
      {item.type === 'folder' && item.children && isOpen && (
        <div>
          {item.children.map((child, index) => (
            <FileTreeNode key={index} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

interface FileTreeProps {
  items: FileTreeItem[];
  title?: string;
}

export function FileTree({ items, title }: FileTreeProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
      {title && (
        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </span>
        </div>
      )}
      <div className="py-2 font-mono text-sm">
        {items.map((item, index) => (
          <FileTreeNode key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export type { FileTreeItem };
