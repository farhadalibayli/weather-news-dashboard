import React, { useState, useEffect } from 'react';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  category: string;
  publishedAt: string;
  createdAt: string;
}

interface NewsFeedProps {
  news?: NewsItem[];
  onRefresh?: () => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ news: propNews, onRefresh }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const categories = [
    { id: 'all', label: 'All', color: 'gray' },
    { id: 'TECHNOLOGY', label: 'Technology', color: 'blue' },
    { id: 'BUSINESS', label: 'Business', color: 'green' },
    { id: 'SPORTS', label: 'Sports', color: 'orange' },
    { id: 'ENTERTAINMENT', label: 'Entertainment', color: 'purple' },
    { id: 'HEALTH', label: 'Health', color: 'red' },
    { id: 'SCIENCE', label: 'Science', color: 'indigo' },
    { id: 'GENERAL', label: 'General', color: 'gray' }
  ];

  // Real API call to backend
  const fetchNews = async (category: string = 'all', page: number = 0) => {
    setLoading(true);
    setError(null);
    
    try {
      let url = `http://localhost:8080/api/news?page=${page}&size=6`;
      
      if (category !== 'all') {
        url = `http://localhost:8080/api/news/${category.toLowerCase()}?page=${page}&size=6`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (page === 0) {
        setNews(data.content || []);
      } else {
        setNews(prev => [...prev, ...(data.content || [])]);
      }
      
      setHasMore(!data.last);
      setCurrentPage(page);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(selectedCategory, 0);
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0);
    setHasMore(true);
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      fetchNews(selectedCategory, 0);
    }
  };

  const handleLoadMore = () => {
    fetchNews(selectedCategory, currentPage + 1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    if (!cat) return 'category-gray';
    
    switch (cat.color) {
      case 'blue': return 'category-blue';
      case 'green': return 'category-green';
      case 'orange': return 'category-orange';
      case 'purple': return 'category-purple';
      case 'red': return 'category-red';
      case 'indigo': return 'category-indigo';
      default: return 'category-gray';
    }
  };

  return (
    <div className="container">
      <div className="card animate-fade-in">
        {/* Header */}
        <div className="card-header">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">News Feed</h2>
              <p className="text-white opacity-80 mt-1">Stay updated with the latest news</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="refresh-btn"
              title="Refresh news"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Real API Notice */}
        <div className="demo-notice">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Live Data - Connected to NewsAPI</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`category-btn ${selectedCategory === category.id ? 'category-btn-active' : ''} ${getCategoryColor(category.id)}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* News Content */}
        <div className="p-6">
          {error && (
            <div className="error-message">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
              <button
                onClick={handleRefresh}
                className="retry-btn"
              >
                Try Again
              </button>
            </div>
          )}

          {loading && currentPage === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="news-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-description"></div>
                    <div className="skeleton-meta"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-gray-500 mt-4">No news found for this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                  <article key={item.id} className="news-card">
                    <div className="news-card-content">
                      <div className="news-meta">
                        <span className={`news-category ${getCategoryColor(item.category)}`}>
                          {categories.find(c => c.id === item.category)?.label}
                        </span>
                        <span className="news-time">{formatDate(item.publishedAt)}</span>
                      </div>
                      <h3 className="news-title">
                        <a 
                          href={item.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors"
                        >
                          {item.title}
                        </a>
                      </h3>
                      <p className="news-description">{item.description}</p>
                      <div className="news-source">
                        <span className="text-sm text-gray-500">Source: {item.source}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="load-more-btn"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      'Load More News'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
