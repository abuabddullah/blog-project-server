# Blog Backend API

Welcome to the Blog Backend API! This project provides a robust backend service for a blogging platform, with features like user authentication, role-based access control, blog management, and admin tools.

---

## 🌟 Features

- **User-Friendly Authentication**: Secure user registration and login using JWT.
- **Role-Based Access Control**: Admins have special powers to manage users and blogs.
- **Blog Management**: Create, read, update, and delete (CRUD) blogs with ease.
- **Search & Filter Blogs**: Find blogs quickly using search, sorting, and filtering options.
- **Admin Privileges**: Block users and delete any blog effortlessly.
- **Security First**: Includes password hashing, and security headers to ensure safe usage.

---

## 🌐 Live URL

🚀 Live Link: [Live Url](https://blog-project-server-gules.vercel.app/)<br>
🚀 Github Link: [Blog Backend Server](https://github.com/abuabddullah/blog-project-server.git)

---

## ⚙️ Technology Stack

This project is built using modern and reliable technologies:

- **Language**: TypeScript
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB (managed with Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod library
- **Other**: CORS support, custom error handling

---

## 📋 Prerequisites

Before begining, these following must have to be installed:

1. **Node.js** (version 14 or above)
2. **MongoDB** (running locally or hosted)
3. A package manager like `npm` or `yarn`

---

## 🔧 Installation and Setup

Follow these steps to get the project running on local machine:

1. **Clone the Repository**  
   Download the code from the GitHub repository:

   ```bash
   git clone https://github.com/abuabddullah/blog-project-server.git
   cd blog-project-server
   ```

2. **Install Dependencies**  
   Install the required packages:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file in the root directory with the following variables:

   ```
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your-secure-jwt-secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin123
   MONGODB_URI=mongodb://localhost:27017/blog-app
   ```

4. **For running in development mode**:

   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`.

---

## 📚 API Documentation

### **Authentication**

- **Register User**  
  `POST /api/auth/register`  
  Request Body:

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

- **Login User**  
  `POST /api/auth/login`  
  Request Body:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

### **Blog Management**

- **Create a Blog**  
  `POST /api/blogs`  
  Auth Required: Yes

  ```json
  {
    "title": "Your Blog Title",
    "content": "Your blog content here"
  }
  ```

- **View All Blogs**  
  `GET /api/blogs`  
  Query Parameters: `search`, `sortBy`, `sortOrder`, `filter`

- **Update a Blog**  
  `PATCH /api/blogs/:id`  
  Auth Required: Yes

- **Delete a Blog**  
  `DELETE /api/blogs/:id`  
  Auth Required: Yes

### **Admin-Specific Features**

- **Block a User**  
  `PATCH /api/admin/users/:userId/block`  
  Auth Required: Admin Only

---

## 🔒 Security Features

- **JWT Authentication**: Ensures secure API access.
- **Password Hashing**: Protects user credentials.
- **CORS**: Handles cross-origin resource sharing safely.

---

## 🛠 Error Handling

This API uses a consistent error format for better debugging:

```json
{
  "success": false,
  "message": "Detailed error message",
  "statusCode": 400,
  "error": {},
  "stack": "Visible only in development mode"
}
```

---

## 👨‍💻 Admin Credentials

You can log in as an admin using the default credentials:  
**Email**: admin@example.com  
**Password**: admin123

---

## 🎉 Author

Developed with ❤️ by ASIF A OWADUD  
Feel free to connect with me for any queries or suggestions!
