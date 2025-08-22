# Authentication System

This project includes a simple email-based authentication system with the following features:

## Features

- **Email-based login**: Users enter their email address to start the authentication process
- **Verification code**: A 6-digit verification code is sent to the user's email (mock implementation)
- **Session management**: Authentication state is persisted using localStorage
- **Protected routes**: The Todo page requires authentication
- **Logout functionality**: Users can sign out from the profile menu

## How it works

### 1. Login Flow
1. User clicks on the Todo tab or tries to access protected content
2. Login modal appears with email input field
3. User enters their email address and clicks "Send Verification Code"
4. Modal switches to code verification screen
5. User enters any 6-digit number (for demo purposes)
6. Upon successful verification, user is logged in and can access protected content

### 2. Session Management
- Authentication state is stored in localStorage with keys:
  - `sessionToken`: Mock session token
  - `userData`: User information (email, name, etc.)
- Session persists across browser refreshes
- Logout clears all session data

### 3. Protected Content
- The Todo page is wrapped with `ProtectedRoute` component
- Unauthenticated users see a login prompt
- Authenticated users can access the Todo functionality

## Demo Mode

For demonstration purposes:
- Any valid email format is accepted
- Any 6-digit number is accepted as verification code
- No actual email is sent
- Session tokens are mock values

## Components

- `AuthContext`: Manages authentication state and provides auth methods
- `LoginModal`: Handles email input and code verification
- `ProtectedRoute`: Wraps content that requires authentication
- `ProfileMenu`: Shows user info and logout option

## Usage

1. Start the application
2. Click on the "Todo" tab
3. Enter any email address (e.g., `user@example.com`)
4. Click "Send Verification Code"
5. Enter any 6-digit number (e.g., `123456`)
6. Click "Verify Code"
7. You're now logged in and can use the Todo functionality
8. Use the profile menu to sign out
