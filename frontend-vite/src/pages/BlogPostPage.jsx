import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, HeartIcon, ChatBubbleLeftIcon, ClockIcon, ShareIcon } from '@heroicons/react/24/outline';
import { AuthContext, AlertContext } from '../App';

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { isAuthenticated, user } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  // Mock data for the blog post
  useEffect(() => {
    const mockPost = {
      id: parseInt(id),
      title: 'The Dark Side of Totoro: Exploring the Chilling Fan Theory',
      content: `
        <p>Introduction</p>
        <p>My Neighbor Totoro, the beloved 1988 Studio Ghibli film directed by Hayao Miyazaki, is often celebrated for its whimsical charm and heartwarming story about two sisters who discover magical forest spirits. However, beneath its seemingly innocent surface lies a dark and unsettling fan theory that has captivated audiences for decades.</p>
        
        <p>The theory suggests that Totoro is actually a death god, and the film is a metaphor for the grieving process. This interpretation is based on several key elements within the film, including the Sayama murder case that occurred in Japan in 1963, which some believe inspired the story.</p>
        
        <p>According to this theory, the girls' mother is actually dead, and the magical adventures they experience are coping mechanisms for dealing with their loss. The Catbus, with its graveyard-bound signs, represents the journey between life and death, while Totoro himself serves as a guide through the grieving process.</p>
        
        <p>Studio Ghibli has officially denied these interpretations, stating that the film was intended as a simple, joyful story about childhood and imagination. However, the theory persists, adding a layer of complexity to what many consider a children's classic.</p>
        
        <p>Whether you believe in the death god theory or prefer to see Totoro as a simple tale of friendship and wonder, there's no denying the film's lasting impact on animation and storytelling.</p>
      `,
      author: {
        name: 'Cassy Adams',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
      publishedAt: '01 August 2025',
      readTime: '10 min read',
      likes: 156,
      comments: 23,
      views: 1247
    };

    const mockComments = [
      {
        id: 1,
        author: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        content: 'This theory has always fascinated me. The symbolism is so subtle yet powerful.',
        timestamp: '2 hours ago'
      },
      {
        id: 2,
        author: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        content: 'I never noticed the graveyard signs before! This adds a whole new layer to the film.',
        timestamp: '5 hours ago'
      }
    ];

    setPost(mockPost);
    setComments(mockComments);
    setIsLoading(false);
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: user?.name || 'Anonymous',
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      content: newComment,
      timestamp: 'Just now'
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    showAlert('Comment added successfully!', 'success');
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      showAlert('Please log in to like posts', 'error');
      return;
    }
    // Handle like functionality
    showAlert('Post liked!', 'success');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
        <Link to="/" className="text-primary-600 hover:text-primary-700">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to posts
        </Link>
      </div>

      {/* Post Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900">{post.author.name}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{post.publishedAt}</span>
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="flex items-center space-x-4 mb-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <ShareIcon className="h-5 w-5" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
      </div>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Engagement */}
      <div className="flex items-center justify-between py-6 border-t border-gray-200">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <HeartIcon className="h-5 w-5" />
            <span>{post.likes}</span>
          </button>
          <div className="flex items-center space-x-2 text-gray-600">
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <span>{comments.length}</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {post.views} views
        </div>
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Comments ({comments.length})</h3>

        {/* Add Comment */}
        {isAuthenticated && (
          <form onSubmit={handleAddComment} className="mb-8">
            <div className="flex space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows="3"
                />
                <button
                  type="submit"
                  className="mt-2 btn-primary"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{comment.author}</span>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage; 