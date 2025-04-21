# Backend API

## Environment Configuration

Create a `.env` file in the root of the backend directory with the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=blog_db

# Optional: Database SSL Configuration (uncomment if needed)
# DB_SSL=true
# DB_SSL_CA=/path/to/ca.pem
# DB_SSL_CERT=/path/to/cert.pem
# DB_SSL_KEY=/path/to/key.pem

# Optional: Database Pool Configuration
# DB_POOL_MAX=10
# DB_POOL_MIN=2
# DB_POOL_IDLE=10000
# DB_POOL_ACQUIRE=30000
```

### Required Variables
- `PORT`: The port number the server will run on (default: 3001)
- `NODE_ENV`: The environment mode (development/production)
- `DB_HOST`: PostgreSQL host address
- `DB_PORT`: PostgreSQL port number
- `DB_USER`: PostgreSQL username
- `DB_PASSWORD`: PostgreSQL password
- `DB_NAME`: PostgreSQL database name

### Optional Variables
- Database SSL configuration for secure connections
- Database pool configuration for connection management

## Getting Started

1. Copy the environment variables above into a new `.env` file
2. Update the values according to your PostgreSQL setup
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server

## API Endpoints

### Articles
- `POST /api/articles` - Create a new article
- `GET /api/articles` - Get all articles
- `GET /api/articles/:id` - Get a specific article
- `PUT /api/articles/:id` - Update an article
- `DELETE /api/articles/:id` - Delete an article

### Tags
- `POST /api/tags` - Create a new tag
- `GET /api/tags` - Get all tags
- `GET /api/tags/:id` - Get a specific tag
- `PUT /api/tags/:id` - Update a tag
- `DELETE /api/tags/:id` - Delete a tag 