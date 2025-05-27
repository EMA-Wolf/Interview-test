# Blog Application Backend

## Introduction

This is the backend for a Blog Application, built as part of the Backend Developer Intern Test. The application provides a RESTful API for managing blog posts with full CRUD (Create, Read, Update, Delete) functionalities. It is built using **Node.js**, **TypeScript**, **Express.js**, and **MongoDB**.

## Features

- Create, read, update, and delete blog posts.
- RESTful API design.
- MongoDB for database storage with Mongoose for schema modeling.
- JWT-based authentication for securing endpoints (optional).
- Dockerized for easy deployment.

## Technologies Used

- **Node.js**
- **TypeScript**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Docker**

## Endpoints

### 1. Create a Blog Post

- **Endpoint:** `POST /blogs`
- **Request Body:**
  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "author": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "id": "123456",
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "author": "John Doe",
    "createdAt": "2024-03-25T12:00:00Z"
  }
  ```

### 2. Get All Blog Posts

- **Endpoint:** `GET /blogs`
- **Response:**
  ```json
  [
    {
      "id": "123456",
      "title": "My First Blog Post",
      "content": "This is the content of my first blog post.",
      "author": "John Doe",
      "createdAt": "2024-03-25T12:00:00Z"
    }
  ]
  ```

### 3. Get a Single Blog Post

- **Endpoint:** `GET /blogs/:id`
- **Response:**
  ```json
  {
    "id": "123456",
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post.",
    "author": "John Doe",
    "createdAt": "2024-03-25T12:00:00Z"
  }
  ```

### 4. Update a Blog Post

- **Endpoint:** `PUT /blogs/:id`
- **Request Body:**
  ```json
  {
    "title": "Updated Blog Post",
    "content": "This is the updated content of my blog post.",
    "author": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "id": "123456",
    "title": "Updated Blog Post",
    "content": "This is the updated content of my blog post.",
    "author": "John Doe",
    "updatedAt": "2024-03-25T14:00:00Z"
  }
  ```

### 5. Delete a Blog Post

- **Endpoint:** `DELETE /blogs/:id`
- **Response:**
  ```json
  {
    "message": "Blog post deleted successfully"
  }
  ```

## Setup and Installation

### Prerequisites

- Node.js (v20 or later)
- MongoDB (local or cloud instance)
- Docker (optional, for containerization)

### Steps to Run the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the API at `http://localhost:3000`.

### Docker Setup

1. Build the Docker image:
   ```bash
   docker build -t blog-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env blog-backend
   ```

## Folder Structure

```
src/
├── config/             # Configuration files (e.g., environment variables)
├── controllers/        # Route handler logic
├── database/           # Database connection logic
├── middleware/         # Custom middleware (e.g., authentication)
├── models/             # Mongoose models
├── routes/             # API route definitions
└── index.ts            # Entry point of the application
```

## Bonus Features

- JWT authentication for securing endpoints.
- Dockerized for easy deployment.
- TypeScript for type safety and better development experience.

## Future Improvements

- Add user authentication and role-based access control.
- Implement pagination for the `GET /blogs` endpoint.
- Add unit and integration tests.

## License

This project is licensed under the MIT License.