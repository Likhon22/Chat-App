# Chat App Backend

A robust Node.js backend for a real-time chat application built with Express, Socket.IO, and MongoDB.

## Features

- **User Authentication**: Secure signup and login using JWT
- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Profiles**: Support for user profiles with profile pictures
- **Image Sharing**: Send images in messages using Cloudinary for storage
- **Online Status Tracking**: Real-time user online/offline status

## Tech Stack

- **Node.js**: JavaScript runtime for the server
- **Express**: Web framework for Node.js
- **TypeScript**: Typed JavaScript for better development experience
- **MongoDB**: NoSQL database for storing user data and messages
- **Socket.IO**: Real-time bidirectional event-based communication
- **JWT**: JSON Web Tokens for authentication
- **Zod**: Schema validation
- **Cloudinary**: Cloud storage for image uploads
- **Bcrypt**: Password hashing

## Project Structure

```
backend/
├── src/
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Server entry point
│   └── app/
│       ├── config/           # App configuration
│       ├── errors/           # Error handling
│       ├── interface/        # TypeScript interfaces
│       ├── lib/              # Libraries (Socket.IO setup)
│       ├── middleware/       # Express middleware
│       ├── modules/          # Feature modules
│       │   ├── auth/         # Authentication
│       │   ├── message/      # Messaging
│       │   └── user/         # User management
│       ├── routes/           # API routes
│       └── utils/            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   PORT=5000
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

### Running the Server

- For development:
  ```
  npm run start:dev
  ```
- For production:
  ```
  npm run build
  npm run start:prod
  ```

## API Endpoints

- **Auth**

  - `POST /api/auth/signup` - Register a new user
  - `POST /api/auth/login` - Login an existing user

- **Messages**

  - `GET /api/messages/users` - Get users for sidebar
  - `GET /api/messages/:userId` - Get messages with a specific user
  - `POST /api/messages/send/:userId` - Send a message to a user

- **User**
  - `GET /api/users/profile` - Get current user profile
  - `PATCH /api/users/profile` - Update user profile

## Socket Events

- `connection` - Client connects
- `setup` - Initialize user in socket
- `getOnlineUsers` - Get list of online users
- `newMessage` - Receive new message
- `disconnect` - Client disconnects
