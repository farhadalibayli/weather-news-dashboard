import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileMenu from './ProfileMenu';
import LoginModal from './LoginModal';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { user, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const tabs = [
    { id: 'weather', label: 'Weather', icon: '🌦' },
    { id: 'todo', label: 'Todo', icon: '✅' },
    { id: 'news', label: 'News', icon: '📰' }
  ];

  const handleSignInClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-content">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Workable Dashboard</h1>
          </div>
          <div className="nav-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="nav-profile">
            <ProfileMenu 
              userEmail={user?.email} 
              onEmailChange={(newEmail) => {
                console.log('Email changed to:', newEmail);
                // Here you would typically update the user's email in your backend
              }}
              onSignInClick={handleSignInClick}
            />
          </div>
        </div>
      </div>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={handleCloseLoginModal} 
      />
    </nav>
  );
};

export default Navigation;
