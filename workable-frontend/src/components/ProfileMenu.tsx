import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileMenuProps {
  userEmail?: string;
  onEmailChange?: (newEmail: string) => void;
  onSignInClick?: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ 
  userEmail,
  onEmailChange,
  onSignInClick
}) => {
  const { user, logout, isAuthenticated } = useAuth();
  const displayEmail = userEmail || user?.email || "";
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(displayEmail);
  const [tempEmail, setTempEmail] = useState(displayEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Update email state when user changes
  useEffect(() => {
    const newDisplayEmail = userEmail || user?.email || "";
    setEmail(newDisplayEmail);
    setTempEmail(newDisplayEmail);
  }, [userEmail, user?.email]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTempEmail(email);
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 100);
  };

  const handleSaveEmail = async () => {
    if (!tempEmail.trim() || tempEmail === email) {
      setIsEditing(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempEmail)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Show confirmation dialog first
    setShowConfirmDialog(true);
  };

  const handleConfirmEmailChange = async () => {
    setShowConfirmDialog(false);
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Check if email is available
      const checkResponse = await fetch(`http://localhost:8080/api/auth/check-email?email=${encodeURIComponent(tempEmail)}`);
      const checkData = await checkResponse.json();
      
      if (!checkData.available) {
        setErrorMessage('This email address is already in use. Please choose a different email.');
        setIsLoading(false);
        return;
      }

      // Update email using backend API
      const response = await fetch('http://localhost:8080/api/auth/update-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
        },
        body: JSON.stringify({
          newEmail: tempEmail
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update email');
      }

      const data = await response.json();
      
      // Update local storage with new token and user data
      localStorage.setItem('sessionToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      // Update the email display
      setEmail(tempEmail);
      onEmailChange?.(tempEmail);
      setIsEditing(false);
      setErrorMessage('');
      
      // Show success message
      setErrorMessage('Email updated successfully! Previous email account has been removed.');
      setTimeout(() => setErrorMessage(''), 5000);
      
    } catch (error) {
      console.error('Error updating email:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to update email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmDialog(false);
  };

  const handleCancelEdit = () => {
    setTempEmail(email);
    setIsEditing(false);
    setErrorMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEmail();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        ref={buttonRef}
        onClick={isAuthenticated ? toggleMenu : onSignInClick}
        className={`profile-button ${!isAuthenticated ? 'profile-button-signin' : ''}`}
        aria-label={isAuthenticated ? "Open profile menu" : "Sign in"}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={isAuthenticated ? "Profile menu" : "Sign in"}
      >
        <div className="profile-avatar">
          <span className="profile-initials">
            {isAuthenticated ? (email.charAt(0)?.toUpperCase() || 'U') : '👤'}
          </span>
        </div>
        {isAuthenticated && (
          <svg 
            className={`profile-chevron ${isOpen ? 'rotate-180' : ''}`}
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        )}
      </button>

      {/* Profile Menu Popup */}
      {isOpen && isAuthenticated && (
        <div
          ref={menuRef}
          className="profile-menu"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Email Section */}
          <div className="profile-menu-email-section">
            <div className="profile-menu-avatar">
              <span className="profile-menu-initials">
                {email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="profile-menu-email-content">
              <div className="profile-menu-email-label">Email Address</div>
                {isEditing ? (
                  <div className="profile-menu-email-edit">
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={tempEmail}
                      onChange={(e) => setTempEmail(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading}
                      className="profile-menu-email-input"
                      placeholder="Enter email address"
                    />
                    {errorMessage && (
                      <div className="profile-menu-error">{errorMessage}</div>
                    )}
                    <div className="profile-menu-email-actions">
                      <button 
                        onClick={handleSaveEmail}
                        disabled={isLoading}
                        className="profile-menu-email-save"
                        title="Send Confirmation Code"
                      >
                        {isLoading ? (
                          <div className="profile-menu-loading-spinner"></div>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        )}
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        disabled={isLoading}
                        className="profile-menu-email-cancel"
                        title="Cancel"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="profile-menu-email-display">
                    <span className="profile-menu-email-text">{email}</span>
                    <button 
                      onClick={handleEditClick}
                      className="profile-menu-email-edit-btn"
                      title="Edit email"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
           </div>

           {/* Divider */}
           <div className="profile-menu-divider"></div>

           {/* Sign Out */}
           <div className="profile-menu-items">
             <button 
               onClick={() => {
                 logout();
                 setIsOpen(false);
               }}
               className="profile-menu-item profile-menu-item-danger" 
               role="menuitem"
             >
               <svg className="profile-menu-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                 <polyline points="16,17 21,12 16,7"></polyline>
                 <line x1="21" y1="12" x2="9" y2="12"></line>
               </svg>
               <span>Sign Out</span>
             </button>
           </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Confirm Email Change</h3>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-3">
                  Are you sure you want to change your email from:
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm"><strong>From:</strong> {email}</p>
                  <p className="text-sm"><strong>To:</strong> {tempEmail}</p>
                </div>
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    <strong>Warning:</strong> Your previous email account ({email}) will be permanently deleted. 
                    All your data will be transferred to the new email address.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleConfirmEmailChange}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  Yes, Delete Old Email
                </button>
                <button
                  onClick={handleCancelConfirmation}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
