
# Thought - Blog Web App - (Backend)

Thought  blog web application that allows users to create posts, authenticate. It is built using Next.js 14 for the frontend and Node.js, Express, and MongoDB for the backend. 

## Features

- **User Authentication** 
- **Create Posts** 
- **Responsive Design**
- **Image Uploads** 
- **Secure Storage** 

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB**
- **TypeScript**.
- **bcrypt** 
- **JWT (JSON Web Tokens)**
- **Cloudinary** 


### Backend API Endpoints

- **POST /api/auth/signup:** Register a new user.
- **POST /api/auth/signin:** Authenticate an existing user.
- **GET /api/posts:** Retrieve all posts.
- **GET /api/posts/:postId:** Retrieve a specific post by ID.
- **POST /api/post:** Create a new post.

## Installation

### Frontend

Follow these steps to set up the frontend locally:

1. **Clone the repository:**

```bash
git clone https://github.com/harshyadavone/thoughts-backend.git
cd thoughts-backend
```

```bash
npm install
```

## Environment variables


```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
