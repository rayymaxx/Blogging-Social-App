import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect,} from 'react';
import { useState, createContext, useContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import BlogPostPage from './pages/BlogPostPage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import NotificationPage from './pages/NotificationPage';
import Chatbot from './components/Chatbot';
import Alert from './components/Alert';
import axios from 'axios';

// Context for sidebar state
export const SidebarContext = createContext();
export const AuthContext = createContext();
export const AlertContext = createContext();
export const ThemeContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [msg, setMsg] = useState('');

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
   useEffect(() => {
  axios.get('/api/hello')
    .then(res => {
      setMsg(res.data.message);
    })
    .catch(err => {
      console.error("❌ Axios API Error:", err);
    });
}, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
        <AlertContext.Provider value={{ showAlert }}>
          <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <Router>
              <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
                <Header />
                <Sidebar />
                
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/post/:id" element={<BlogPostPage />} />
                    <Route path="/create-post" element={<CreatePostPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/notifications" element={<NotificationPage />} />
                  </Routes>
                </main>
                <p className="text-center text-green-600 font-medium mt-4">{msg}</p>

                <Chatbot />
                {alert && <Alert message={alert.message} type={alert.type} />}
              </div>
            </Router>
          </ThemeContext.Provider>
        </AlertContext.Provider>
      </SidebarContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
