'use client';

import { Suspense, useState } from 'react';
import ArticleList from '@/components/ArticleList';
import TagFilter from '@/components/TagFilter';

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Blog</h1>
      
      <div className="mb-8">
        <TagFilter selectedTag={selectedTag} onTagSelect={setSelectedTag} />
      </div>

      <ArticleList selectedTag={selectedTag} onTagSelect={setSelectedTag} />
    </main>
  );
}
