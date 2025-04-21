export interface Tag {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  tags: Tag[];
  createdAt: string;
} 