import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import WeatherLocation from './components/WeatherLocation';
import TodoList from './components/TodoList';
import NewsFeed from './components/NewsFeed';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<string>('weather');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'weather':
        return <WeatherLocation />;
      case 'todo':
        return (
          <ProtectedRoute>
            <TodoList />
          </ProtectedRoute>
        );
      case 'news':
        return <NewsFeed />;
      default:
        return <WeatherLocation />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        <main className="py-6 md:py-8">
          {renderContent()}
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
