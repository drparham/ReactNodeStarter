'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
  author: {
    name: string;
  };
  tags: {
    name: string;
  }[];
}

interface ArticleListProps {
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export default function ArticleList({ selectedTag, onTagSelect }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
        if (selectedTag) {
          url.searchParams.append('tag', selectedTag);
        }
        
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedTag]);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <Link href={`/articles/${article.slug}`}>
              <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">{article.title}</h2>
            </Link>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>By {article.author.name}</span>
              <span>{format(new Date(article.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => onTagSelect(null)}
                className={`px-2 py-1 rounded-full text-sm ${
                  !selectedTag
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {article.tags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => onTagSelect(tag.name)}
                  className={`px-2 py-1 rounded-full text-sm ${
                    selectedTag === tag.name
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 