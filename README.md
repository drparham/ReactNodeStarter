# Modern Blog Website

A full-stack blogging platform built with React, Node.js, and TypeScript.

## Features

- **Home Page**
  - View all articles
  - Sort articles by tags
- **Article Page**
  - SEO-friendly slug URLs
  - Disqus comments integration
  - Like and share functionality
- **Admin Dashboard**
  - Auth0 authentication
  - Article management
  - Draft mode for articles
  - Tag management

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth0
- **Comments**: Disqus
- **Deployment**: Docker (optional)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend packages
   - Fill in the required environment variables
4. Start the development servers:
   ```bash
   npm run dev
   ```

## Project Structure

```
.
├── packages/
│   ├── frontend/     # Next.js frontend application
│   └── backend/      # Node.js backend API
├── package.json      # Root package.json
└── README.md        # This file
```

## Development

- Frontend runs on: http://localhost:3000
- Backend runs on: http://localhost:4000

## License

MIT 