import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create some tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: 'Technology' },
      update: {},
      create: { name: 'Technology' },
    }),
    prisma.tag.upsert({
      where: { name: 'Programming' },
      update: {},
      create: { name: 'Programming' },
    }),
    prisma.tag.upsert({
      where: { name: 'Web Development' },
      update: {},
      create: { name: 'Web Development' },
    }),
    prisma.tag.upsert({
      where: { name: 'React' },
      update: {},
      create: { name: 'React' },
    }),
    prisma.tag.upsert({
      where: { name: 'Node.js' },
      update: {},
      create: { name: 'Node.js' },
    }),
  ]);

  // Create some articles
  await prisma.article.upsert({
    where: { slug: 'getting-started-with-react' },
    update: {},
    create: {
      title: 'Getting Started with React',
      slug: 'getting-started-with-react',
      content: `
React is a popular JavaScript library for building user interfaces. Here's how to get started:

1. Create a new React app
2. Learn about components
3. Understand state and props
4. Build your first application

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
      `.trim(),
      excerpt: 'Learn the basics of React and start building modern web applications.',
      published: true,
      authorId: adminUser.id,
      tags: {
        connect: [
          { name: 'Programming' },
          { name: 'Web Development' },
          { name: 'React' },
        ],
      },
    },
  });

  await prisma.article.upsert({
    where: { slug: 'building-apis-with-node' },
    update: {},
    create: {
      title: 'Building APIs with Node.js',
      slug: 'building-apis-with-node',
      content: `
Node.js is perfect for building fast and scalable network applications. In this guide, we'll cover:

1. Setting up a Node.js project
2. Creating RESTful endpoints
3. Connecting to a database
4. Handling authentication
5. Testing your API

Node.js's event-driven, non-blocking I/O model makes it lightweight and efficient, perfect for data-intensive real-time applications.
      `.trim(),
      excerpt: 'Learn how to build robust APIs using Node.js and Express.',
      published: true,
      authorId: adminUser.id,
      tags: {
        connect: [
          { name: 'Programming' },
          { name: 'Web Development' },
          { name: 'Node.js' },
        ],
      },
    },
  });

  await prisma.article.upsert({
    where: { slug: 'future-of-technology' },
    update: {},
    create: {
      title: 'The Future of Technology',
      slug: 'future-of-technology',
      content: `
Technology is evolving at an unprecedented rate. Here are some trends to watch:

1. Artificial Intelligence and Machine Learning
2. Quantum Computing
3. Edge Computing
4. Internet of Things (IoT)
5. Extended Reality (XR)

These technologies are reshaping how we live, work, and interact with the world around us.
      `.trim(),
      excerpt: 'Exploring emerging technologies and their potential impact on our future.',
      published: true,
      authorId: adminUser.id,
      tags: {
        connect: [
          { name: 'Technology' },
        ],
      },
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 