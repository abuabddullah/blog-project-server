# Blog Backend API

A robust TypeScript-based blog backend with role-based access control, built using Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Role-based access control (Admin/User)
- Blog CRUD operations
- Admin capabilities (block users, delete any blog)
- Search, sort, and filter functionalities for blogs
- Rate limiting and security features

## Technology Stack

- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Zod for validation
- Express Rate Limit for API protection
- Helmet for security headers

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your-secure-jwt-secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   MONGODB_URI=mongodb://localhost:27017/blog-app
   ```

4. Build the project:

   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

For development:

```bash
npm run dev
```

## API Documentation

### Authentication Endpoints

#### Register User

- **POST** `/api/auth/register`
- Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

#### Login User

- **POST** `/api/auth/login`
- Body:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

### Blog Endpoints

#### Create Blog

- **POST** `/api/blogs`
- Auth: Required
- Body:
  ```json
  {
    "title": "Blog Title",
    "content": "Blog content here"
  }
  ```

#### Update Blog

- **PATCH** `/api/blogs/:id`
- Auth: Required
- Body:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content"
  }
  ```

#### Delete Blog

- **DELETE** `/api/blogs/:id`
- Auth: Required

#### Get All Blogs

- **GET** `/api/blogs`
- Query Parameters:
  - search: Search in title and content
  - sortBy: Field to sort by
  - sortOrder: 'asc' or 'desc'
  - filter: Filter by author ID

### Admin Endpoints

#### Block User

- **PATCH** `/api/admin/users/:userId/block`
- Auth: Admin only

## Admin Credentials

```
Email: admin@example.com
Password: admin123
```

## Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": {},
  "stack": "Error stack trace (development only)"
}
```

## Security Features

- JWT authentication
- Password hashing
- Rate limiting
- Security headers with Helmet
- CORS enabled
- Request validation

## License

MIT

## Author

[Your Name]
