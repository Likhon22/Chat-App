# Chat App Frontend

A modern React-based frontend for a real-time chat application, featuring a clean UI built with Tailwind CSS and DaisyUI.

## Features

- **Real-time Messaging**: Instantly send and receive messages
- **User Authentication**: Secure signup and login flows
- **Image Sharing**: Send images in your chat messages
- **User Profiles**: View and edit your profile
- **Online Status**: See who's currently online
- **Theme Customization**: Choose between light and dark modes
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **React**: UI library
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library for Tailwind CSS
- **Socket.IO Client**: Real-time communication with the backend
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Zustand**: State management
- **React Hot Toast**: Toast notifications

## Project Structure

```
frontend/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   └── skeletons/     # Loading skeletons
│   ├── constants/         # Application constants
│   ├── images/            # Image assets
│   ├── layout/            # Layout components
│   ├── lib/               # Utilities and libraries
│   ├── pages/             # Application pages
│   ├── routes/            # Route definitions
│   ├── store/             # State management
│   ├── App.jsx            # Root component
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14+)

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```

### Running the App

- For development:
  ```
  npm run dev
  ```
- For production:
  ```
  npm run build
  npm run preview
  ```

## Environment Configuration

Create a `.env` file in the root of the frontend directory:

```
VITE_API_URL=http://localhost:5000/api
```

## Features In Detail

### Authentication

The app provides user registration and login functionality with form validation and secure token storage.

### Chat Interface

- **Sidebar**: Displays a list of available users to chat with
- **Chat Container**: Shows the conversation with the selected user
- **Message Input**: Allows sending text messages and images

### Profile Management

Users can view and update their profile information and profile picture.

### Settings

Change application theme and appearance settings.

## Deployment

The frontend is built with Vite, which generates optimized static assets for deployment.

1. Build the application:

   ```
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your web server or hosting service of choice.
