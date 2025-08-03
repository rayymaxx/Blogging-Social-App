import { useState, useContext } from 'react';
import { BellIcon, CheckIcon, XMarkIcon, HeartIcon, ChatBubbleLeftIcon, UserPlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import { AuthContext, AlertContext } from '../App';

const NotificationPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      title: 'New like on your post',
      message: 'Sarah Johnson liked your post "The Future of Web Development"',
      time: '2 minutes ago',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'comment',
      title: 'New comment on your post',
      message: 'Mike Chen commented: "Great insights! This really helped me understand the concepts better."',
      time: '15 minutes ago',
      read: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      type: 'follow',
      title: 'New follower',
      message: 'Alex Thompson started following you',
      time: '1 hour ago',
      read: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      type: 'view',
      title: 'Post milestone reached',
      message: 'Your post "Getting Started with React" reached 100 views!',
      time: '2 hours ago',
      read: true,
      avatar: null
    },
    {
      id: 5,
      type: 'like',
      title: 'New like on your post',
      message: 'Emma Wilson liked your post "CSS Grid Layout Guide"',
      time: '3 hours ago',
      read: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
  ]);

  const { isAuthenticated } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <HeartIcon className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <ChatBubbleLeftIcon className="h-5 w-5 text-blue-500" />;
      case 'follow':
        return <UserPlusIcon className="h-5 w-5 text-green-500" />;
      case 'view':
        return <EyeIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'like':
        return 'bg-red-900/20 border-red-700';
      case 'comment':
        return 'bg-blue-900/20 border-blue-700';
      case 'follow':
        return 'bg-green-900/20 border-green-700';
      case 'view':
        return 'bg-purple-900/20 border-purple-700';
      default:
        return 'bg-gray-800 border-gray-700';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
    showAlert('Marked as read', 'success');
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    showAlert('Notification deleted', 'success');
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    showAlert('All notifications marked as read', 'success');
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return !notification.read;
    return notification.type === activeFilter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="card p-8">
          <BellIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-4">No Notifications</h2>
          <p className="text-gray-400 mb-6">
            Please log in to view your notifications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Notifications</h1>
          <p className="text-gray-400">
            Stay updated with your latest activities and interactions
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="btn-secondary"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All', count: notifications.length },
            { key: 'unread', label: 'Unread', count: unreadCount },
            { key: 'like', label: 'Likes', count: notifications.filter(n => n.type === 'like').length },
            { key: 'comment', label: 'Comments', count: notifications.filter(n => n.type === 'comment').length },
            { key: 'follow', label: 'Follows', count: notifications.filter(n => n.type === 'follow').length },
            { key: 'view', label: 'Views', count: notifications.filter(n => n.type === 'view').length }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeFilter === filter.key
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <BellIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-100 mb-2">No notifications</h3>
            <p className="text-gray-400">
              {activeFilter === 'all' 
                ? "You're all caught up! Check back later for new notifications."
                : `No ${activeFilter} notifications found.`
              }
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-xl ${
                notification.read 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-gray-800 border-amber-600 shadow-lg'
              } ${getNotificationColor(notification.type)}`}
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {notification.avatar ? (
                    <img
                      src={notification.avatar}
                      alt="User avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getNotificationIcon(notification.type)}
                      <h3 className="text-sm font-medium text-gray-200">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-green-500 transition-all duration-200"
                        title="Mark as read"
                      >
                        <CheckIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
                        title="Delete notification"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage; 