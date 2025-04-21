# React Node Starter

A full-stack blog application designed for pair programming interviews. This codebase provides a realistic starting point for technical interviews, featuring a modern tech stack and common development patterns.

## Interview Setup

This codebase is structured to facilitate pair programming interviews with the following features:

- **Real-world Complexity**: A complete full-stack application with frontend and backend components
- **Modern Tech Stack**: React, Node.js, TypeScript, and PostgreSQL
- **Common Patterns**: RESTful API, database migrations, testing, and more
- **Extensible Design**: Easy to add new features or modify existing ones

### Interview Scenarios

Candidates can be asked to:
1. Add new features to the blog system
2. Fix bugs or improve existing functionality
3. Implement new API endpoints
4. Add frontend components or improve the UI
5. Write tests for existing or new features
6. Optimize database queries or application performance

### Getting Started for Interviews

1. **Interviewer Setup**:
   - Clone the repository
   - Set up the development environment
   - Prepare specific tasks or features for the candidate

2. **Candidate Experience**:
   - Clear project structure and documentation
   - Working development environment out of the box
   - Focus on problem-solving rather than setup

A full-stack blog application built with React, Node.js, and TypeScript. This monorepo contains both frontend and backend packages, managed with npm workspaces.

## Features

- Modern React frontend with Material-UI
- TypeScript backend with Express and TypeORM
- Article management with tags
- Responsive design
- End-to-end testing with Cypress
- Unit testing with Jest

## Prerequisites

- Node.js (v20 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher)

## Project Structure

```
.
├── packages/
│   ├── frontend/     # React frontend application
│   └── backend/      # Node.js backend application
├── package.json      # Root package.json with workspaces
└── README.md         # This file
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-node-starter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend packages
   - Update the database connection details in `packages/backend/.env`

4. Start PostgreSQL and create a database:
   ```bash
   createdb react_node_starter
   ```

## Database Setup

1. Run migrations:
   ```bash
   cd packages/backend
   npm run migration:run
   ```

2. Seed the database with initial data:
   ```bash
   npm run seed
   ```

## Development

1. Start both frontend and backend in development mode:
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend on http://localhost:4000

2. For individual development:
   ```bash
   # Frontend only
   cd packages/frontend
   npm run dev

   # Backend only
   cd packages/backend
   npm run dev
   ```

## Testing

### Frontend Tests

1. Run Cypress E2E tests:
   ```bash
   cd packages/frontend
   npm run cypress:run
   ```

2. Run Cypress in interactive mode:
   ```bash
   npm run cypress:open
   ```

### Backend Tests

1. Run Jest tests:
   ```bash
   cd packages/backend
   npm test
   ```

2. Run tests with coverage:
   ```bash
   npm run test:coverage
   ```

## Building for Production

1. Build both packages:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm run start
   ```

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=react_node_starter
PORT=4000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:4000/api
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests
4. Submit a pull request

## License

MIT