import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    // Allow closing the modal manually
    setShowModal(false);
  };

  // Show modal initially when user is not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowModal(true);
    }
  }, [isLoading, isAuthenticated]);

  // Reset modal state when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      setShowModal(false);
    }
    // Don't automatically show modal when user is not authenticated
    // Let the user manually open it via the "Sign In" button
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="fixed inset-0 bg-gray-50 flex items-center justify-center overflow-hidden">
          {!showModal && (
            <div className="text-center px-4">
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
                <p className="text-gray-600 mb-6">
                  Please sign in to access this feature.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>
        <LoginModal 
          isOpen={showModal} 
          onClose={handleCloseModal} 
        />
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
