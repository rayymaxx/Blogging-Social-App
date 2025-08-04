import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XMarkIcon, HomeIcon, DocumentTextIcon, PlusIcon, UserIcon, BellIcon } from '@heroicons/react/24/outline';
import { SidebarContext, AuthContext } from '../App';

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsSidebarOpen(false);
    navigate('/');
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-xl font-bold text-primary-600">BLOG</span>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <Link
                to="/"
                onClick={closeSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <HomeIcon className="h-5 w-5" />
                <span>Home</span>
              </Link>

              <Link
                to="/"
                onClick={closeSidebar}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <DocumentTextIcon className="h-5 w-5" />
                <span>All Posts</span>
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeSidebar}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    to="/create-post"
                    onClick={closeSidebar}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Create Post</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={closeSidebar}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <DocumentTextIcon className="h-5 w-5" />
                    <span>My Posts</span>
                  </Link>

                  <Link
                    to="/notifications"
                    onClick={closeSidebar}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  >
                    <BellIcon className="h-5 w-5" />
                    <span>Notifications</span>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <span>Sign Out</span>
              </button>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={closeSidebar}
                  className="block w-full text-center p-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={closeSidebar}
                  className="block w-full text-center p-3 rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 