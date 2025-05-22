# Chatty - Real-time Chat Application

A full-stack real-time chat application built with MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO for real-time communication.

![Chat App Screenshot](frontend/src/images/chatIcon.jpg)

## Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure signup and login with JWT
- **User Profiles**: Customize your profile with name and picture
- **Image Sharing**: Send images in your messages
- **Online Status**: See who's online in real-time
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Theme Customization**: Toggle between light and dark modes

## Tech Stack

### Frontend

- React
- Tailwind CSS & DaisyUI
- Socket.IO Client
- Zustand for state management
- React Router for navigation
- Axios for API requests

### Backend

- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Zod for validation
- Cloudinary for image storage

## Project Structure

```
chat-app/
├── frontend/           # React frontend application
├── backend/            # Express.js backend API
├── package.json        # Root package.json for scripts
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
   ```

2. Install dependencies for both frontend and backend:

   ```
   npm install
   ```

   This will install dependencies for both frontend and backend.

### Running the Application

#### Development Mode

1. Start the backend server:

   ```
   cd backend
   npm run start:dev
   ```

2. In a new terminal, start the frontend development server:

   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

#### Production Mode

Build and start the application:

```
npm run build
npm start
```

## Environment Setup

### Backend (.env)

```
PORT=5000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

## Application Screenshots

- Coming soon...

## Deployment

### Frontend

The frontend can be deployed to static hosting services like Vercel, Netlify, or GitHub Pages.

### Backend

The backend can be deployed to platforms like Heroku, Railway, Render, or any VPS provider.

## License

This project is licensed under the MIT License.
