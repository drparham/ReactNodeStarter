import { AppDataSource } from './config';
import { Article } from '../entities/Article';
import { Tag } from '../entities/Tag';

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const seedData = async () => {
  try {
    await AppDataSource.initialize();
    
    const tagRepository = AppDataSource.getRepository(Tag);
    const articleRepository = AppDataSource.getRepository(Article);

    // Create tags
    const tags = await tagRepository.save([
      { name: 'Technology' },
      { name: 'Programming' },
      { name: 'Web Development' },
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'TypeScript' },
    ]);

    // Create articles
    const articles = [
      {
        title: 'Getting Started with React and TypeScript',
        content: `React and TypeScript are a powerful combination for building modern web applications. 
        TypeScript provides static typing, which helps catch errors early and improves code quality.
        In this article, we'll explore how to set up a React project with TypeScript and some best practices.`,
        published: true,
        tags: [tags[0], tags[1], tags[2], tags[3], tags[5]],
      },
      {
        title: 'Building a RESTful API with Node.js and Express',
        content: `Node.js and Express make it easy to build robust RESTful APIs. 
        In this tutorial, we'll walk through creating a complete API with proper error handling,
        authentication, and database integration.`,
        published: true,
        tags: [tags[0], tags[1], tags[2], tags[4]],
      },
      {
        title: 'The Power of TypeScript in Modern Web Development',
        content: `TypeScript has become an essential tool in modern web development.
        Its type system helps developers write more maintainable and scalable code.
        Let's explore some advanced TypeScript features and patterns.`,
        published: true,
        tags: [tags[0], tags[1], tags[5]],
      },
    ];

    // Save articles with their tags
    for (const articleData of articles) {
      const article = new Article();
      article.title = articleData.title;
      article.slug = generateSlug(articleData.title);
      article.content = articleData.content;
      article.published = articleData.published;
      article.tags = articleData.tags;
      await articleRepository.save(article);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

seedData(); 