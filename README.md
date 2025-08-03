# Blogging Social App - MERN Stack

This project is a full-stack social blogging application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). 
It allows users to register, login, create and manage blog posts, comment, like posts, 
follow other authors, and includes admin controls and JWT authentication. 
The backend exposes RESTful APIs that the React frontend consumes via AJAX requests.

---

## Project Structure


---

## Backend Setup & Description

The backend is built with Node.js, Express.js, and MongoDB using Mongoose ODM. It handles all the application logic and data management.

### Key Features

- **User Authentication:** Secure sign up and login with password hashing via bcrypt and JWT token issuance.
- **Role-Based Authorization:** Differentiate between admin and normal users for protected routes.
- **Blog Posts Management:** Create, update, delete, and get blog posts with categories, tags, likes.
- **Comments & Likes:** Users can comment on posts and like posts.
- **Follow System:** Users can follow other authors.
- **Notifications:** System to notify users about interactions on their posts.
- **RESTful APIs:** Clean, maintainable routes separated by concern (auth, posts, users).

### How to Run Backend

1. Navigate to the backend folder:
