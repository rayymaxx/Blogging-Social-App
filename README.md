# Blogging Social App - MERN Stack

This project is a full-stack social blogging application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to register, login, create and manage blog posts, comment, like posts, follow other authors, and includes admin controls and JWT authentication. The backend exposes RESTful APIs that the React frontend consumes via AJAX requests.

---

## Project Structure

/BLOGGING-SOCIAL-APP
├── back-end/ # Backend server folder (Node.js, Express.js APIs)
│ ├── Controllers/ # Request handlers for routes (MVC structure)
│ │ ├── authController.js # Authentication logic (signup, login)
│ │ ├── userController.js # User related logic
│ │ └── ... # Other controllers
│ ├── middleware/ # Middleware functions
│ │ └── authMiddleware.js # Authentication & authorization checks
│ ├── models/ # Mongoose models for MongoDB
│ │ ├── User.js # User schema & pre-save password hashing
│ │ ├── Post.js # Blog post schema
│ │ ├── Comment.js # Comment schema
│ │ └── ... # Additional models like notifications, etc.
│ ├── Routes/ # Express route definitions
│ │ ├── authRoutes.js # Routes for signup, login
│ │ ├── userRoutes.js # Routes to get user data, update users
│ │ ├── postRoutes.js # Routes for CRUD operations on posts
│ │ └── ... # Other routes like comments, admin
│ ├── app.js or index.js # App entry point where Express server is configured
│ ├── package.json # Backend dependencies & scripts
│ └── .env # Environment variables file (MongoURI, JWT secrets)
├── frontend/ # React frontend folder
│ ├── src/ # React source code (components, pages, services)
│ ├── public/ # Static files like index.html
│ ├── package.json # Frontend dependencies & scripts
│ ├── .gitignore # Files/folders to ignore in Git for frontend
│ └── README.md # Frontend README (optional)
├── .gitignore # Repo-wide Git ignore file
└── README.md # This project README
