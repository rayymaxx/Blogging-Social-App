import { useState } from 'react';
import { MagnifyingGlassIcon, SparklesIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import BlogCard from '../components/BlogCard';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock data for categories
  const categories = ['All', 'Fiction', 'Anime', 'Music', 'Games', 'Books', 'Technology', 'Travel'];

  // Mock data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: 'Cultural Obsession: The Global Fascination with Anime',
      summary: 'Explore how anime has captivated audiences worldwide, influencing fashion, identity, and social connections, and why this Japanese art form resonates so deeply across cultures.',
      author: {
        name: 'Yara Samson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
      },
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      publishedAt: '1 day ago',
      readTime: '4 min read',
      likes: 94,
      comments: 12
    },
    {
      id: 2,
      title: 'The Dark Side of Totoro: Unearthing the Hidden Shadows',
      summary: 'Explore the unsettling fan theories behind My Neighbor Totoro - from whispers that Totoro is a death god linked to the Sayama murder, to graveyard-bound Cat-bus signs and grief disguised as magic.',
      author: {
        name: 'Cassy Adams',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      category: 'Anime',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop',
      publishedAt: '5 hours ago',
      readTime: '9 min read',
      likes: 94,
      comments: 12
    },
    {
      id: 3,
      title: 'The Future of Music in the Digital Age',
      summary: 'How streaming platforms are reshaping the music industry and what it means for artists and listeners alike.',
      author: {
        name: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      },
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
      publishedAt: '2 days ago',
      readTime: '6 min read',
      likes: 156,
      comments: 23
    },
    {
      id: 4,
      title: 'The Rise of Indie Games: A New Era of Creativity',
      summary: 'Discover how independent game developers are revolutionizing the gaming industry with innovative ideas and unique storytelling.',
      author: {
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
      },
      category: 'Games',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop',
      publishedAt: '3 days ago',
      readTime: '8 min read',
      likes: 203,
      comments: 31
    },
    {
      id: 5,
      title: 'Sustainable Travel: Exploring the World Responsibly',
      summary: 'Learn how to travel the world while minimizing your environmental impact and supporting local communities.',
      author: {
        name: 'Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
      },
      category: 'Travel',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
      publishedAt: '1 week ago',
      readTime: '12 min read',
      likes: 89,
      comments: 15
    },
    {
      id: 6,
      title: 'The Art of Mindful Reading in the Digital Age',
      summary: 'Rediscover the joy of deep reading and learn techniques to maintain focus in our fast-paced digital world.',
      author: {
        name: 'Emma Davis',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
      },
      category: 'Books',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      publishedAt: '1 week ago',
      readTime: '7 min read',
      likes: 127,
      comments: 19
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen atmospheric-bg">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop")'
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <SparklesIcon className="h-12 w-12 text-amber-400 animate-pulse" />
            </div>
            
            {/* Animated Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 overflow-hidden">
              <span className="inline-block animate-slide-in">
                Welcome to Blog
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Explore thought-provoking articles, share your insights, and connect with a community of passionate writers and readers.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for stories, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-100 border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 bg-gray-800  placeholder-gray-400"
                />
              </div>
            </div>

            {/* Trending Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-full px-6 py-2 border border-gray-600">
              <ArrowTrendingUpIcon className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-medium text-gray-300">Trending: Anime & Technology</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="py-8 bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-md border border-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-100 mb-4">No posts found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn-primary"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-100 mb-2">
                {selectedCategory === 'All' ? 'Latest Stories' : `${selectedCategory} Stories`}
              </h2>
              <p className="text-gray-400">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'} found
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage; 