import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, UserIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { SidebarContext, AuthContext, ThemeContext } from '../App';

const Header = () => {
  const { setIsSidebarOpen } = useContext(SidebarContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 vintage-header shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Hamburger menu and Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-300 hover:text-amber-400 hover:bg-gray-700 transition-all duration-200"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold vintage-text">
                BLOG
              </span>
            </Link>
          </div>

          {/* Right side - Navigation buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-300 hover:text-amber-400 hover:bg-gray-700 transition-all duration-200"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {/* Authentication buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-200 border border-gray-600"
                >
                  <UserIcon className="h-5 w-5 text-gray-300" />
                </Link>
                {user && (
                  <span className="text-sm text-gray-300 hidden sm:block">
                    Welcome, {user.name}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-amber-400 font-medium transition-all duration-200"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 