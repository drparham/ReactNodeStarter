# Blog Interview Project

A full-stack blog application built with Node.js, React, TypeScript, and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm (v9 or higher)

## Project Structure

```
.
├── packages/
│   ├── backend/     # Node.js backend
│   └── frontend/    # React frontend
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Set up the database:
   - Create a PostgreSQL database named `blog_db`
   - Update the database connection settings in `packages/backend/.env`

4. Start the development servers:
   ```bash
   npm run dev
   ```

This will start both the frontend and backend servers in development mode.

## Development

- Frontend runs on: http://localhost:3000
- Backend runs on: http://localhost:4000

## Features

- Home page with blog article listing and tag filtering
- Individual article pages
- Admin dashboard for article management
- Draft mode for articles 


Next steps would be to:
Set up the database schema and migrations
Create the backend API endpoints
Set up the frontend routing and basic components
Implement the admin dashboard