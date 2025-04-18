import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import DisqusComments from '@/components/DisqusComments';

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
  tags: {
    name: string;
  }[];
}

async function getArticle(slug: string): Promise<Article> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`, {
    next: { revalidate: 60 }, // Revalidate every minute
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center justify-between text-gray-600">
          <span>By {article.author.name}</span>
          <span>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag.name}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </header>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <div className="mt-12">
        <DisqusComments
          identifier={article.id}
          title={article.title}
        />
      </div>
    </article>
  );
} 