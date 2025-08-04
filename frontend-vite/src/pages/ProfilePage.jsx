import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { AuthContext, AlertContext } from '../App';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    username: 'user346',
    email: 'user346@gmail.com'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      showAlert('Profile updated successfully!', 'success');
      setIsEditing(false);
    } catch (error) {
      showAlert('Failed to update profile.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsAuthenticated(false);
      setUser(null);
      showAlert('Account deleted successfully', 'success');
      navigate('/');
    }
  };

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      setIsAuthenticated(false);
      setUser(null);
      showAlert('Signed out successfully', 'success');
      navigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Profile Picture */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon className="h-12 w-12 text-gray-400" />
            </div>
            <button className="absolute bottom-4 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="input-field disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 pt-6">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={isLoading}
                  className="btn-primary"
                >
                  {isLoading ? 'Updating...' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>

        {/* Account Actions */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={handleDeleteAccount}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
            >
              <TrashIcon className="h-5 w-5" />
              <span>Delete Account</span>
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
            >
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Follow us on</p>
          <div className="flex space-x-4">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-blue-500 font-bold">f</span>
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-blue-400 font-bold">𝕏</span>
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-gray-900 font-bold">🍎</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 