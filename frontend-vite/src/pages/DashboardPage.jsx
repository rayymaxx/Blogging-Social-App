import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { AuthContext, AlertContext } from '../App';

const DashboardPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Blog Post',
      summary: 'This is a sample blog post that I created to test the platform.',
      category: 'Technology',
      status: 'published',
      publishedAt: '2025-01-15',
      views: 156,
      likes: 23,
      comments: 5
    },
    {
      id: 2,
      title: 'Draft: Thoughts on Web Development',
      summary: 'A draft post about modern web development practices and tools.',
      category: 'Technology',
      status: 'draft',
      createdAt: '2025-01-10',
      views: 0,
      likes: 0,
      comments: 0
    }
  ]);
  
  const { isAuthenticated, user } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
      showAlert('Post deleted successfully', 'success');
    }
  };

  const handleEditPost = (postId) => {
    // Navigate to edit page (for now, just show alert)
    showAlert('Edit functionality coming soon!', 'info');
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your dashboard</h2>
        <p className="text-gray-600 mb-6">You need to be authenticated to view your dashboard.</p>
        <Link to="/login" className="btn-primary">
          Go to Login
        </Link>
      </div>
    );
  }

  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');
  const totalViews = publishedPosts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = publishedPosts.reduce((sum, post) => sum + post.likes, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {user?.name}! Manage your blog posts and track your performance.
            </p>
          </div>
          <Link
            to="/create-post"
            className="flex items-center space-x-2 btn-primary"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create Post</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <EyeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <HeartIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Likes</p>
              <p className="text-2xl font-bold text-gray-900">{totalLikes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChatBubbleLeftIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published Posts</p>
              <p className="text-2xl font-bold text-gray-900">{publishedPosts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <PencilIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Draft Posts</p>
              <p className="text-2xl font-bold text-gray-900">{draftPosts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Published Posts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Published Posts</h2>
        {publishedPosts.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">No published posts yet.</p>
            <Link to="/create-post" className="text-primary-600 hover:text-primary-700 font-medium">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {publishedPosts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-3">{post.summary}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                        {post.category}
                      </span>
                      <span>Published {post.publishedAt}</span>
                      <span>{post.views} views</span>
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Draft Posts */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Draft Posts</h2>
        {draftPosts.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">No draft posts.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {draftPosts.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-3">{post.summary}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        Draft
                      </span>
                      <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                        {post.category}
                      </span>
                      <span>Created {post.createdAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 