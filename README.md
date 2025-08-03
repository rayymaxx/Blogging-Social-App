# Blogging Social App - MERN Stack

This project is a full-stack social blogging application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). 
It allows users to register, login, create and manage blog posts, comment, like posts, 
follow other authors, and includes admin controls and JWT authentication. 
The backend exposes RESTful APIs that the React frontend consumes via AJAX requests.

---

## Project Structure

BLOGGING-SOCIAL-APP
├── back-end/                  # Backend server (Node.js, Express APIs)
│   ├── Controllers/           # Request handlers (MVC pattern)
│   │   ├── authController.js  # Authentication logic (signup, login)
│   │   ├── userController.js  # User related logic
│   │   └── ...                # Other controllers
│   ├── middleware/            # Middleware functions
│   │   └── authMiddleware.js  # Auth & role-based access control
│   ├── models/                # MongoDB models (Mongoose schemas)
│   │   ├── User.js            # User schema with password hashing
│   │   ├── Post.js            # Blog post schema
│   │   ├── Comment.js         # Comment schema
│   │   └── ...                # Additional models (notifications, etc.)
│   ├── Routes/                # Express.js route definitions
│   │   ├── authRoutes.js      # Signup, login routes
│   │   ├── userRoutes.js      # User data, update routes
│   │   ├── postRoutes.js      # CRUD for blog posts
│   │   └── ...                # More routes (comments, admin, etc.)
│   ├── app.js or index.js     # Express server setup and config
│   ├── package.json           # Backend dependencies
│   └── .env                  # Environment variables (Mongo URI, JWT secret)
├── frontend/                  # React frontend folder
│   ├── src/                   # React source code (components, pages, services)
│   ├── public/                # Static files (index.html, icons)
│   ├── package.json           # Frontend dependencies and scripts
│   ├── .gitignore             # Frontend-specific gitignore
│   └── README.md              # Optional frontend README
├── .gitignore                 # Global gitignore for the repo
└── README.md                  # Main project README
