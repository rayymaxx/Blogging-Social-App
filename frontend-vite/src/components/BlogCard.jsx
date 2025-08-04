import { Link } from 'react-router-dom';
import { HeartIcon, ChatBubbleLeftIcon, ClockIcon } from '@heroicons/react/24/outline';

const BlogCard = ({ post }) => {
  return (
    <div className="card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2">
          <span className="bg-amber-600 text-white px-2 py-1 rounded text-xs font-medium">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-200">{post.author.name}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>{post.publishedAt}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title and Summary */}
        <h3 className="text-lg font-semibold text-gray-100 mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {post.summary}
        </p>

        {/* Engagement Metrics */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <HeartIcon className="h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChatBubbleLeftIcon className="h-4 w-4" />
              <span>{post.comments}</span>
            </div>
          </div>
          
          <Link
            to={`/post/${post.id}`}
            className="text-amber-500 hover:text-amber-400 font-medium text-sm transition-all duration-200"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 