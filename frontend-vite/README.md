# Social Blogging App - Frontend

A modern, responsive social blogging application built with React.js and Tailwind CSS, featuring user authentication, blog management, and AI chatbot integration.

## 🚀 Features

### ✅ Implemented Features

1. **Responsive Header (Navbar)**
   - Logo and navigation
   - Authentication state management
   - Light/Dark mode toggle
   - Profile dropdown for authenticated users

2. **User Authentication**
   - Login page with form validation
   - Signup page with password confirmation
   - Forgot password functionality
   - Social login options (UI only)
   - Success/error message alerts

3. **Collapsible Sidebar**
   - Hamburger menu toggle
   - Navigation links (Home, All Posts, Dashboard, Create Post, My Posts)
   - User-specific sections for authenticated users
   - Sign out functionality

4. **Blog Feed Section**
   - Search functionality
   - Category filters
   - Responsive grid layout
   - Blog post cards with author info and engagement metrics

5. **Single Blog Post Page**
   - Full post content display
   - Author information and social sharing
   - Comments section with add comment functionality
   - Like and view tracking

6. **Create/Edit/Delete Blog Posts**
   - Create new post form with rich text editor
   - Category selection and tags
   - Draft saving functionality
   - Publish and save as draft options

7. **User Dashboard**
   - Analytics overview (views, likes, posts)
   - Published and draft posts management
   - Edit and delete post functionality
   - Performance tracking

8. **AI Chatbot Integration**
   - Floating chat button
   - Real-time chat interface
   - Message history
   - Clear chat functionality

9. **Profile Management**
   - User profile editing
   - Account settings
   - Delete account functionality
   - Social media links

## 🛠️ Technical Stack

- **Frontend Framework**: React.js 19.1.0
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Build Tool**: Vite
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header
│   ├── Sidebar.jsx         # Collapsible sidebar
│   ├── Alert.jsx           # Success/error alerts
│   ├── Chatbot.jsx         # AI chatbot interface
│   └── BlogCard.jsx        # Blog post card component
├── pages/
│   ├── HomePage.jsx        # Main blog feed
│   ├── LoginPage.jsx       # User login
│   ├── SignupPage.jsx      # User registration
│   ├── ForgotPasswordPage.jsx # Password reset
│   ├── BlogPostPage.jsx    # Single post view
│   ├── CreatePostPage.jsx  # Create new post
│   ├── ProfilePage.jsx     # User profile
│   └── DashboardPage.jsx   # User dashboard
├── App.jsx                 # Main app component
├── main.jsx               # App entry point
└── index.css              # Global styles
```

## 🎨 Design System

Based on the provided Figma designs, the app features:

- **Color Palette**: Primary green (#22c55e) with gray scale
- **Typography**: Inter font family
- **Components**: Cards, buttons, forms, and alerts
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, accessible, and user-friendly interface

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔐 Authentication Flow

1. **Guest Users**: Can browse posts, view single posts, and access login/signup
2. **Authenticated Users**: Full access to dashboard, create posts, comment, and manage profile
3. **Protected Routes**: Dashboard, create post, and profile pages require authentication

## 🤖 AI Chatbot Features

- Floating chat button on all pages
- Real-time message interface
- Message history persistence
- Clear chat functionality
- Responsive chat window

## 🎯 Key Features Implemented

### Frontend Requirements ✅
- [x] Responsive navbar with logo and authentication buttons
- [x] Light/Dark mode toggle
- [x] Three separate authentication pages (Login, Signup, Forgot Password)
- [x] React Router navigation
- [x] Success and error message popups
- [x] Collapsible sidebar with navigation
- [x] Blog feed with search and category filters
- [x] Single blog post page with comments
- [x] Create/Edit/Delete blog posts functionality
- [x] User dashboard with analytics
- [x] AI chatbot integration (frontend ready for API connection)

## 🔄 State Management

The app uses React Context for global state management:
- **AuthContext**: User authentication state
- **SidebarContext**: Sidebar open/close state
- **AlertContext**: Success/error message management

## 🎨 UI/UX Features

- **Loading States**: Skeleton loaders and loading spinners
- **Form Validation**: Real-time validation with error messages
- **Responsive Images**: Optimized image handling
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: ARIA labels and keyboard navigation

## 📊 Mock Data

The application includes comprehensive mock data for:
- Blog posts with images and metadata
- User profiles and authentication
- Comments and engagement metrics
- Dashboard analytics

## 🔗 API Integration Ready

The frontend is structured to easily integrate with backend APIs:
- RESTful API patterns
- JWT token handling
- Error handling and loading states
- Form submission and validation

## 🚀 Deployment Ready

The application is ready for deployment with:
- Optimized build process
- Static asset handling
- Environment variable support
- Production-ready code structure

---

**Note**: This is the frontend implementation of the Social Blogging App. The backend integration points are prepared and ready for connection to Node.js/Express.js/MongoDB backend services.
