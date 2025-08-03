import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PlayIcon, DocumentIcon } from '@heroicons/react/24/outline';
import { AuthContext, AlertContext } from '../App';

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    category: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { isAuthenticated } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const categories = ['Anime', 'Music', 'Technology', 'Travel', 'Food', 'Books', 'Games', 'Fiction'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      if (!formData.title.trim() || !formData.content.trim()) {
        showAlert('Please fill in all required fields', 'error');
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showAlert('Post created successfully!', 'success');
      navigate('/dashboard');
    } catch (error) {
      showAlert('Failed to create post. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      showAlert('Draft saved successfully!', 'success');
    } catch (error) {
      showAlert('Failed to save draft.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to create posts</h2>
        <p className="text-gray-600 mb-6">You need to be authenticated to create new blog posts.</p>
        <button
          onClick={() => navigate('/login')}
          className="btn-primary"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600">
          Share your thoughts and ideas with the community
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Post Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Post Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter your post title..."
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="input-field"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={formData.content}
            onChange={handleInputChange}
            className="input-field min-h-[300px] resize-none"
            placeholder="Write your post content here..."
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter tags separated by commas..."
          />
          <p className="text-sm text-gray-500 mt-1">
            Separate tags with commas (e.g., technology, programming, web development)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 btn-primary"
          >
            <PlayIcon className="h-5 w-5" />
            <span>{isLoading ? 'Publishing...' : 'Publish Post'}</span>
          </button>
          
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isLoading}
            className="flex items-center space-x-2 btn-secondary"
          >
            <DocumentIcon className="h-5 w-5" />
            <span>{isLoading ? 'Saving...' : 'Save as Draft'}</span>
          </button>
        </div>
      </form>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">Writing Tips:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Write a compelling title that grabs attention</li>
          <li>• Use clear, concise language</li>
          <li>• Include relevant tags to help others find your post</li>
          <li>• Proofread before publishing</li>
        </ul>
      </div>
    </div>
  );
};

export default CreatePostPage; 