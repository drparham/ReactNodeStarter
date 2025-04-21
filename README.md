# React Node Starter

A full-stack blog application built with React, Node.js, and TypeScript, using a monorepo structure.

## Project Structure

```
.
├── packages/
│   ├── backend/          # Node.js backend with Express and TypeORM
│   └── frontend/         # React frontend with Material-UI
├── package.json          # Root package.json for monorepo management
└── README.md            # This file
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-node-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Create a PostgreSQL database
   - Create a `.env` file in the `packages/backend` directory with the following content:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     DB_NAME=your_database_name
     PORT=4000
     ```

4. **Run database migrations and seeds**
   ```bash
   cd packages/backend
   npm run migrate
   npm run seed
   ```

5. **Start the development servers**
   From the root directory:
   ```bash
   npm run dev
   ```
   This will start both the backend and frontend servers concurrently.

   Alternatively, you can start them separately:
   ```bash
   # Start backend
   cd packages/backend
   npm run dev

   # Start frontend (in a new terminal)
   cd packages/frontend
   npm run dev
   ```

## Available Scripts

### Root Directory
- `npm install` - Install all dependencies
- `npm run dev` - Start both backend and frontend in development mode
- `npm run build` - Build all packages
- `npm run start` - Start the backend server

### Backend (`packages/backend`)
- `npm run dev` - Start the backend server in development mode
- `npm run build` - Build the TypeScript code
- `npm run start` - Start the production server
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed the database with initial data

### Frontend (`packages/frontend`)
- `npm run dev` - Start the development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build

## Features

- **Backend**
  - RESTful API with Express
  - TypeORM for database management
  - PostgreSQL database
  - TypeScript support
  - Database migrations and seeding

- **Frontend**
  - React with TypeScript
  - Material-UI components
  - Responsive design
  - Client-side routing
  - Article management
  - Tag system

## API Endpoints

- `GET /api/articles` - Get all articles
- `GET /api/articles/:slug` - Get a specific article
- `POST /api/articles` - Create a new article
- `PUT /api/articles/:slug` - Update an article
- `DELETE /api/articles/:slug` - Delete an article

## Development

### Adding New Features

1. Create a new branch for your feature
2. Make your changes
3. Run tests
4. Submit a pull request

### Running Tests

```bash
# Run backend tests
cd packages/backend
npm test

# Run frontend tests
cd packages/frontend
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.