import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileCode, Users, Image, MessageSquare, Tag, Settings } from 'lucide-react';
import { DocLayout } from '../../../components/layout';
import { CodeBlock } from '../../../components/code';
import { Accordion, AccordionItem } from '../../../components/ui';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'posts', title: 'Posts & Pages', level: 2 },
  { id: 'users', title: 'Users', level: 2 },
  { id: 'media', title: 'Media', level: 2 },
  { id: 'comments', title: 'Comments', level: 2 },
  { id: 'taxonomies', title: 'Taxonomies', level: 2 },
  { id: 'settings', title: 'Settings', level: 2 },
  { id: 'api-responses', title: 'API Responses', level: 2 },
  { id: 'enums', title: 'Enums', level: 2 },
  { id: 'utilities', title: 'Utility Types', level: 2 },
];

interface TypeCategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  types: string[];
}

function TypeCategoryCard({ icon, title, description, types }: TypeCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-rust-100 dark:bg-rust-900 text-rust-600 dark:text-rust-400">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <code
                key={type}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-rust-600 dark:text-rust-400 px-2 py-1 rounded"
              >
                {type}
              </code>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Types() {
  return (
    <DocLayout tocItems={tocItems}>
      <article className="prose dark:prose-invert max-w-none">
        {/* Header */}
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <p className="text-sm text-rust-600 dark:text-rust-400 font-medium mb-2">API Reference</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Type Definitions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Complete type definitions for all Rustpress API resources in TypeScript, Rust, and Python.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 id="overview" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Rustpress provides comprehensive type definitions for all API resources. These types are available
            in the official SDKs and can be used to ensure type safety in your integrations.
          </p>

          <div className="not-prose grid md:grid-cols-2 gap-4 mb-6">
            <TypeCategoryCard
              icon={<FileCode className="w-5 h-5" />}
              title="Content"
              description="Posts, pages, and revisions"
              types={['Post', 'Page', 'Revision', 'Block']}
            />
            <TypeCategoryCard
              icon={<Users className="w-5 h-5" />}
              title="Users"
              description="User accounts and authentication"
              types={['User', 'UserRole', 'Session', 'Token']}
            />
            <TypeCategoryCard
              icon={<Image className="w-5 h-5" />}
              title="Media"
              description="Files, images, and attachments"
              types={['Media', 'MediaSize', 'Upload']}
            />
            <TypeCategoryCard
              icon={<MessageSquare className="w-5 h-5" />}
              title="Comments"
              description="User comments and discussions"
              types={['Comment', 'CommentStatus']}
            />
            <TypeCategoryCard
              icon={<Tag className="w-5 h-5" />}
              title="Taxonomies"
              description="Categories, tags, and custom taxonomies"
              types={['Category', 'Tag', 'Taxonomy', 'Term']}
            />
            <TypeCategoryCard
              icon={<Settings className="w-5 h-5" />}
              title="Settings"
              description="Site configuration and options"
              types={['SiteSettings', 'Option', 'Theme']}
            />
          </div>

          <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FileCode className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">SDK Type Packages</p>
                <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                  Install <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">@rustpress/types</code> for
                  TypeScript or use the built-in types in the Rust and Python SDKs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Posts & Pages */}
        <section className="mb-12">
          <h2 id="posts" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Posts & Pages</h2>

          <Accordion>
            <AccordionItem title="TypeScript" defaultOpen>
              <CodeBlock
                code={`interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: PostStatus;
  visibility: Visibility;
  author: User;
  author_id: string;
  featured_media: Media | null;
  featured_media_id: string | null;
  categories: Category[];
  tags: Tag[];
  meta: Record<string, unknown>;
  template: string | null;
  format: PostFormat;
  sticky: boolean;
  password: string | null;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: PostStatus;
  visibility: Visibility;
  author: User;
  author_id: string;
  featured_media: Media | null;
  featured_media_id: string | null;
  parent: Page | null;
  parent_id: string | null;
  menu_order: number;
  template: string | null;
  meta: Record<string, unknown>;
  comment_status: 'open' | 'closed';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Revision {
  id: string;
  post_id: string;
  author_id: string;
  title: string;
  content: string;
  excerpt: string | null;
  created_at: string;
}

interface Block {
  name: string;
  attributes: Record<string, unknown>;
  innerBlocks: Block[];
  innerHTML: string;
}`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Post {
    pub id: String,
    pub title: String,
    pub slug: String,
    pub content: String,
    pub excerpt: Option<String>,
    pub status: PostStatus,
    pub visibility: Visibility,
    pub author: User,
    pub author_id: String,
    pub featured_media: Option<Media>,
    pub featured_media_id: Option<String>,
    pub categories: Vec<Category>,
    pub tags: Vec<Tag>,
    pub meta: HashMap<String, Value>,
    pub template: Option<String>,
    pub format: PostFormat,
    pub sticky: bool,
    pub password: Option<String>,
    pub comment_status: CommentStatus,
    pub ping_status: PingStatus,
    pub published_at: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Page {
    pub id: String,
    pub title: String,
    pub slug: String,
    pub content: String,
    pub excerpt: Option<String>,
    pub status: PostStatus,
    pub visibility: Visibility,
    pub author: User,
    pub author_id: String,
    pub featured_media: Option<Media>,
    pub featured_media_id: Option<String>,
    pub parent: Option<Box<Page>>,
    pub parent_id: Option<String>,
    pub menu_order: i32,
    pub template: Option<String>,
    pub meta: HashMap<String, Value>,
    pub comment_status: CommentStatus,
    pub published_at: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}`}
                language="rust"
              />
            </AccordionItem>

            <AccordionItem title="Python">
              <CodeBlock
                code={`from dataclasses import dataclass
from datetime import datetime
from typing import Optional, List, Dict, Any

@dataclass
class Post:
    id: str
    title: str
    slug: str
    content: str
    excerpt: Optional[str]
    status: PostStatus
    visibility: Visibility
    author: User
    author_id: str
    featured_media: Optional[Media]
    featured_media_id: Optional[str]
    categories: List[Category]
    tags: List[Tag]
    meta: Dict[str, Any]
    template: Optional[str]
    format: PostFormat
    sticky: bool
    password: Optional[str]
    comment_status: Literal["open", "closed"]
    ping_status: Literal["open", "closed"]
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

@dataclass
class Page:
    id: str
    title: str
    slug: str
    content: str
    excerpt: Optional[str]
    status: PostStatus
    visibility: Visibility
    author: User
    author_id: str
    featured_media: Optional[Media]
    featured_media_id: Optional[str]
    parent: Optional["Page"]
    parent_id: Optional[str]
    menu_order: int
    template: Optional[str]
    meta: Dict[str, Any]
    comment_status: Literal["open", "closed"]
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime`}
                language="python"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Users */}
        <section className="mb-12">
          <h2 id="users" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Users</h2>

          <Accordion>
            <AccordionItem title="TypeScript" defaultOpen>
              <CodeBlock
                code={`interface User {
  id: string;
  username: string;
  email: string;
  display_name: string;
  first_name: string | null;
  last_name: string | null;
  nickname: string | null;
  description: string | null;
  avatar_url: string | null;
  url: string | null;
  role: UserRole;
  capabilities: string[];
  locale: string;
  registered_at: string;
  last_login_at: string | null;
  meta: Record<string, unknown>;
}

interface UserCreate {
  username: string;
  email: string;
  password: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  role?: UserRole;
  locale?: string;
  meta?: Record<string, unknown>;
}

interface UserUpdate {
  email?: string;
  display_name?: string;
  first_name?: string;
  last_name?: string;
  nickname?: string;
  description?: string;
  url?: string;
  role?: UserRole;
  locale?: string;
  meta?: Record<string, unknown>;
}

interface Session {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: string;
  last_activity: string;
  created_at: string;
  expires_at: string;
}

interface AuthToken {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
  expires_in: number;
  expires_at: string;
  scopes: string[];
}`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: String,
    pub username: String,
    pub email: String,
    pub display_name: String,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub nickname: Option<String>,
    pub description: Option<String>,
    pub avatar_url: Option<String>,
    pub url: Option<String>,
    pub role: UserRole,
    pub capabilities: Vec<String>,
    pub locale: String,
    pub registered_at: DateTime<Utc>,
    pub last_login_at: Option<DateTime<Utc>>,
    pub meta: HashMap<String, Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserCreate {
    pub username: String,
    pub email: String,
    pub password: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub display_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub first_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub last_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub role: Option<UserRole>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuthToken {
    pub access_token: String,
    pub refresh_token: String,
    pub token_type: String,
    pub expires_in: i64,
    pub expires_at: DateTime<Utc>,
    pub scopes: Vec<String>,
}`}
                language="rust"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Media */}
        <section className="mb-12">
          <h2 id="media" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Media</h2>

          <Accordion>
            <AccordionItem title="TypeScript" defaultOpen>
              <CodeBlock
                code={`interface Media {
  id: string;
  title: string;
  alt_text: string | null;
  caption: string | null;
  description: string | null;
  filename: string;
  mime_type: string;
  file_size: number;
  url: string;
  width: number | null;
  height: number | null;
  duration: number | null;  // For audio/video
  sizes: MediaSize[];
  author: User;
  author_id: string;
  post_id: string | null;  // Attached to post
  meta: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface MediaSize {
  name: string;           // 'thumbnail', 'medium', 'large', 'full'
  width: number;
  height: number;
  url: string;
  file_size: number;
}

interface MediaUpload {
  file: File | Buffer | ReadableStream;
  filename?: string;
  title?: string;
  alt_text?: string;
  caption?: string;
  description?: string;
  post_id?: string;
  meta?: Record<string, unknown>;
}

interface MediaUpdate {
  title?: string;
  alt_text?: string;
  caption?: string;
  description?: string;
  post_id?: string | null;
  meta?: Record<string, unknown>;
}

// Image processing options
interface ImageOptions {
  width?: number;
  height?: number;
  fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  format?: 'jpeg' | 'png' | 'webp' | 'avif';
  quality?: number;  // 1-100
}`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Media {
    pub id: String,
    pub title: String,
    pub alt_text: Option<String>,
    pub caption: Option<String>,
    pub description: Option<String>,
    pub filename: String,
    pub mime_type: String,
    pub file_size: u64,
    pub url: String,
    pub width: Option<u32>,
    pub height: Option<u32>,
    pub duration: Option<f64>,
    pub sizes: Vec<MediaSize>,
    pub author: User,
    pub author_id: String,
    pub post_id: Option<String>,
    pub meta: HashMap<String, Value>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MediaSize {
    pub name: String,
    pub width: u32,
    pub height: u32,
    pub url: String,
    pub file_size: u64,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ImageFit {
    Contain,
    Cover,
    Fill,
    Inside,
    Outside,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ImageFormat {
    Jpeg,
    Png,
    Webp,
    Avif,
}`}
                language="rust"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Comments */}
        <section className="mb-12">
          <h2 id="comments" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments</h2>

          <Accordion>
            <AccordionItem title="TypeScript" defaultOpen>
              <CodeBlock
                code={`interface Comment {
  id: string;
  post_id: string;
  parent_id: string | null;
  author: User | null;         // null for guest comments
  author_id: string | null;
  author_name: string;
  author_email: string;
  author_url: string | null;
  author_ip: string;
  author_user_agent: string;
  content: string;
  status: CommentStatus;
  type: CommentType;
  karma: number;
  children: Comment[];
  created_at: string;
  updated_at: string;
}

interface CommentCreate {
  post_id: string;
  parent_id?: string;
  content: string;
  author_name?: string;   // Required for guests
  author_email?: string;  // Required for guests
  author_url?: string;
}

interface CommentUpdate {
  content?: string;
  status?: CommentStatus;
  author_name?: string;
  author_email?: string;
  author_url?: string;
}

type CommentStatus = 'approved' | 'pending' | 'spam' | 'trash';

type CommentType = 'comment' | 'pingback' | 'trackback';`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Comment {
    pub id: String,
    pub post_id: String,
    pub parent_id: Option<String>,
    pub author: Option<User>,
    pub author_id: Option<String>,
    pub author_name: String,
    pub author_email: String,
    pub author_url: Option<String>,
    pub author_ip: String,
    pub author_user_agent: String,
    pub content: String,
    pub status: CommentStatus,
    pub comment_type: CommentType,
    pub karma: i32,
    pub children: Vec<Comment>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum CommentStatus {
    Approved,
    Pending,
    Spam,
    Trash,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum CommentType {
    Comment,
    Pingback,
    Trackback,
}`}
                language="rust"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Taxonomies */}
        <section className="mb-12">
          <h2 id="taxonomies" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Taxonomies</h2>

          <Accordion>
            <AccordionItem title="TypeScript" defaultOpen>
              <CodeBlock
                code={`interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent: Category | null;
  parent_id: string | null;
  count: number;
  meta: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  count: number;
  meta: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

interface Taxonomy {
  name: string;
  slug: string;
  description: string | null;
  labels: TaxonomyLabels;
  public: boolean;
  hierarchical: boolean;
  show_in_menu: boolean;
  show_in_rest: boolean;
  rest_base: string;
  capabilities: TaxonomyCapabilities;
}

interface TaxonomyLabels {
  name: string;
  singular_name: string;
  search_items: string;
  all_items: string;
  parent_item: string | null;
  edit_item: string;
  view_item: string;
  update_item: string;
  add_new_item: string;
  new_item_name: string;
  not_found: string;
}

interface Term {
  id: string;
  taxonomy: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  count: number;
  meta: Record<string, unknown>;
}

interface TermCreate {
  name: string;
  slug?: string;
  description?: string;
  parent_id?: string;
  meta?: Record<string, unknown>;
}

interface TermUpdate {
  name?: string;
  slug?: string;
  description?: string;
  parent_id?: string | null;
  meta?: Record<string, unknown>;
}`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Category {
    pub id: String,
    pub name: String,
    pub slug: String,
    pub description: Option<String>,
    pub parent: Option<Box<Category>>,
    pub parent_id: Option<String>,
    pub count: u32,
    pub meta: HashMap<String, Value>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Tag {
    pub id: String,
    pub name: String,
    pub slug: String,
    pub description: Option<String>,
    pub count: u32,
    pub meta: HashMap<String, Value>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Term {
    pub id: String,
    pub taxonomy: String,
    pub name: String,
    pub slug: String,
    pub description: Option<String>,
    pub parent_id: Option<String>,
    pub count: u32,
    pub meta: HashMap<String, Value>,
}`}
                language="rust"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Settings */}
        <section className="mb-12">
          <h2 id="settings" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>

          <Accordion>
            <AccordionItem title="TypeScript" defaultOpen>
              <CodeBlock
                code={`interface SiteSettings {
  // General
  title: string;
  tagline: string;
  url: string;
  admin_email: string;
  timezone: string;
  date_format: string;
  time_format: string;
  language: string;

  // Reading
  posts_per_page: number;
  show_on_front: 'posts' | 'page';
  page_on_front: string | null;
  page_for_posts: string | null;

  // Discussion
  default_comment_status: 'open' | 'closed';
  default_ping_status: 'open' | 'closed';
  comment_registration: boolean;
  comments_notify: boolean;
  moderation_notify: boolean;
  comment_moderation: boolean;
  require_name_email: boolean;

  // Media
  thumbnail_size_w: number;
  thumbnail_size_h: number;
  medium_size_w: number;
  medium_size_h: number;
  large_size_w: number;
  large_size_h: number;
  uploads_use_yearmonth_folders: boolean;

  // Permalinks
  permalink_structure: string;
  category_base: string;
  tag_base: string;
}

interface Option {
  name: string;
  value: unknown;
  autoload: boolean;
}

interface Theme {
  name: string;
  slug: string;
  version: string;
  description: string | null;
  author: string;
  author_url: string | null;
  screenshot_url: string | null;
  active: boolean;
  parent: string | null;
  tags: string[];
  supports: ThemeSupports;
}

interface ThemeSupports {
  custom_logo: boolean;
  custom_header: boolean;
  custom_background: boolean;
  menus: boolean;
  widgets: boolean;
  post_thumbnails: boolean | string[];
  post_formats: string[];
  html5: string[];
  block_templates: boolean;
  block_styles: boolean;
}`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SiteSettings {
    // General
    pub title: String,
    pub tagline: String,
    pub url: String,
    pub admin_email: String,
    pub timezone: String,
    pub date_format: String,
    pub time_format: String,
    pub language: String,

    // Reading
    pub posts_per_page: u32,
    pub show_on_front: ShowOnFront,
    pub page_on_front: Option<String>,
    pub page_for_posts: Option<String>,

    // Discussion
    pub default_comment_status: CommentStatus,
    pub default_ping_status: PingStatus,
    pub comment_registration: bool,
    pub comments_notify: bool,
    pub moderation_notify: bool,
    pub comment_moderation: bool,
    pub require_name_email: bool,

    // Permalinks
    pub permalink_structure: String,
    pub category_base: String,
    pub tag_base: String,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ShowOnFront {
    Posts,
    Page,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Theme {
    pub name: String,
    pub slug: String,
    pub version: String,
    pub description: Option<String>,
    pub author: String,
    pub author_url: Option<String>,
    pub screenshot_url: Option<String>,
    pub active: bool,
    pub parent: Option<String>,
    pub tags: Vec<String>,
    pub supports: ThemeSupports,
}`}
                language="rust"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* API Responses */}
        <section className="mb-12">
          <h2 id="api-responses" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Responses</h2>

          <Accordion>
            <AccordionItem title="TypeScript" defaultOpen>
              <CodeBlock
                code={`// Success response wrapper
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: ResponseMeta;
}

// Error response wrapper
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    status: number;
    request_id: string;
    timestamp: string;
    details?: Record<string, unknown>;
    documentation_url?: string;
  };
}

// Paginated list response
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    total_pages: number;
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
  };
}

// Response metadata
interface ResponseMeta {
  request_id: string;
  processing_time_ms: number;
  rate_limit: {
    limit: number;
    remaining: number;
    reset: number;
  };
}

// Batch operation response
interface BatchResponse<T> {
  success: true;
  data: {
    succeeded: Array<{ id: string; result: T }>;
    failed: Array<{ id: string; error: ApiError['error'] }>;
  };
  meta: {
    total: number;
    succeeded_count: number;
    failed_count: number;
  };
}`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "success")]
pub enum ApiResult<T> {
    #[serde(rename = "true")]
    Success {
        data: T,
        #[serde(skip_serializing_if = "Option::is_none")]
        meta: Option<ResponseMeta>,
    },
    #[serde(rename = "false")]
    Error {
        error: ApiError,
    },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApiError {
    pub code: String,
    pub message: String,
    pub status: u16,
    pub request_id: String,
    pub timestamp: DateTime<Utc>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub details: Option<HashMap<String, Value>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub documentation_url: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PaginatedResponse<T> {
    pub data: Vec<T>,
    pub meta: PaginationMeta,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PaginationMeta {
    pub total: u64,
    pub count: u64,
    pub per_page: u64,
    pub current_page: u64,
    pub total_pages: u64,
    pub links: PaginationLinks,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PaginationLinks {
    pub first: String,
    pub last: String,
    pub prev: Option<String>,
    pub next: Option<String>,
}`}
                language="rust"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Enums */}
        <section className="mb-12">
          <h2 id="enums" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Enums</h2>

          <Accordion>
            <AccordionItem title="TypeScript" defaultOpen>
              <CodeBlock
                code={`// Post status
type PostStatus = 'draft' | 'pending' | 'publish' | 'future' | 'private' | 'trash';

// Post visibility
type Visibility = 'public' | 'private' | 'password';

// Post format
type PostFormat =
  | 'standard'
  | 'aside'
  | 'chat'
  | 'gallery'
  | 'link'
  | 'image'
  | 'quote'
  | 'status'
  | 'video'
  | 'audio';

// User roles
type UserRole =
  | 'administrator'
  | 'editor'
  | 'author'
  | 'contributor'
  | 'subscriber';

// Comment status
type CommentStatus = 'approved' | 'pending' | 'spam' | 'trash';

// Media type
type MediaType =
  | 'image'
  | 'video'
  | 'audio'
  | 'application'
  | 'text';

// Order direction
type OrderDirection = 'asc' | 'desc';

// Post order by
type PostOrderBy =
  | 'date'
  | 'modified'
  | 'title'
  | 'slug'
  | 'author'
  | 'comment_count'
  | 'menu_order'
  | 'id'
  | 'relevance';

// Webhook events
type WebhookEvent =
  | 'post.created'
  | 'post.updated'
  | 'post.deleted'
  | 'post.published'
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'comment.created'
  | 'comment.updated'
  | 'comment.approved'
  | 'media.uploaded'
  | 'media.deleted';`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum PostStatus {
    Draft,
    Pending,
    Publish,
    Future,
    Private,
    Trash,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Visibility {
    Public,
    Private,
    Password,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum PostFormat {
    Standard,
    Aside,
    Chat,
    Gallery,
    Link,
    Image,
    Quote,
    Status,
    Video,
    Audio,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum UserRole {
    Administrator,
    Editor,
    Author,
    Contributor,
    Subscriber,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum OrderDirection {
    Asc,
    Desc,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum PostOrderBy {
    Date,
    Modified,
    Title,
    Slug,
    Author,
    CommentCount,
    MenuOrder,
    Id,
    Relevance,
}`}
                language="rust"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Utility Types */}
        <section className="mb-12">
          <h2 id="utilities" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Utility Types</h2>

          <Accordion>
            <AccordionItem title="TypeScript" defaultOpen>
              <CodeBlock
                code={`// Pagination parameters
interface PaginationParams {
  page?: number;
  per_page?: number;
  offset?: number;
}

// Filter parameters for posts
interface PostFilters extends PaginationParams {
  status?: PostStatus | PostStatus[];
  author?: string | string[];
  category?: string | string[];
  tag?: string | string[];
  search?: string;
  before?: string;  // ISO date
  after?: string;   // ISO date
  order?: OrderDirection;
  orderby?: PostOrderBy;
  include?: string[];
  exclude?: string[];
  sticky?: boolean;
}

// Filter parameters for users
interface UserFilters extends PaginationParams {
  role?: UserRole | UserRole[];
  search?: string;
  include?: string[];
  exclude?: string[];
  order?: OrderDirection;
  orderby?: 'id' | 'name' | 'email' | 'registered_date';
}

// Date range filter
interface DateRange {
  after?: string;   // ISO 8601 date
  before?: string;  // ISO 8601 date
}

// Partial update type helper
type PartialUpdate<T> = {
  [P in keyof T]?: T[P];
};

// ID reference
interface IdRef {
  id: string;
}

// Embedded vs referenced
type Embed<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: T[P] extends string | null
    ? T[P] extends null ? T[P] | null : T[P]
    : T[P];
};

// Context for responses
type Context = 'view' | 'edit' | 'embed';

// Webhook payload
interface WebhookPayload<T = unknown> {
  event: WebhookEvent;
  timestamp: string;
  data: T;
  previous?: T;  // For update events
}`}
                language="typescript"
              />
            </AccordionItem>

            <AccordionItem title="Rust">
              <CodeBlock
                code={`#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct PaginationParams {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub page: Option<u64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub per_page: Option<u64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub offset: Option<u64>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct PostFilters {
    #[serde(flatten)]
    pub pagination: PaginationParams,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub status: Option<Vec<PostStatus>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub author: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub category: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tag: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub search: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub before: Option<DateTime<Utc>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub after: Option<DateTime<Utc>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub order: Option<OrderDirection>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub orderby: Option<PostOrderBy>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub include: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub exclude: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub sticky: Option<bool>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Context {
    View,
    Edit,
    Embed,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WebhookPayload<T> {
    pub event: String,
    pub timestamp: DateTime<Utc>,
    pub data: T,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub previous: Option<T>,
}`}
                language="rust"
              />
            </AccordionItem>
          </Accordion>
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            to="/docs/api/error-handling"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-rust-600 dark:hover:text-rust-400 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Error Handling
          </Link>
          <Link
            to="/docs/examples/themes"
            className="flex items-center gap-2 text-rust-600 dark:text-rust-400 hover:text-rust-700 dark:hover:text-rust-300 transition-colors"
          >
            Theme Examples
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </DocLayout>
  );
}
