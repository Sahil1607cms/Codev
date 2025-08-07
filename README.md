# Codev - Real-Time Collaborative Code Editor

A modern, real-time collaborative code editor built with React, Socket.IO, and Express. Codev allows multiple developers to code together in real-time, making it perfect for pair programming, code reviews, and remote collaboration.

## ✨ Features

- **Real-time Collaboration**: Multiple users can edit code simultaneously
- **Live Code Synchronization**: Changes are instantly reflected across all connected users
- **Room-based Sessions**: Create or join rooms using unique room IDs
- **User Management**: See who's currently in the room
- **Modern UI**: Clean, dark-themed interface with syntax highlighting
- **CodeMirror Integration**: Professional code editing experience with syntax highlighting
- **Instant Notifications**: Toast notifications for user join/leave events

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **CodeMirror** - Professional code editor component
- **Socket.IO Client** - Real-time communication
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **Nodemon** - Development server with auto-restart

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sahil1607cms/Codev.git
   cd Codev
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the backend directory:
   ```bash
   cd ../backend
   echo "PORT=5001" > .env
   ```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on `http://localhost:5001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

### Production Mode

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

## 🎯 How to Use

1. **Create or Join a Room**
   - Open the application in your browser
   - Enter a username
   - Either enter an existing room ID or generate a new one
   - Click "Join" to enter the collaborative coding session

2. **Start Coding Together**
   - Once in the room, you'll see the code editor
   - Any changes you make will be instantly synchronized with other users
   - See who else is in the room in the sidebar
   - Get notified when users join or leave

3. **Share Your Session**
   - Share the room ID with your collaborators
   - They can join using the same room ID and their username

## 🏗️ Project Structure

```
Codev/
├── backend/
│   ├── src/
│   │   └── server.js          # Express + Socket.IO server
│   ├── package.json
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Aside.jsx      # Sidebar with user list
│   │   │   └── Editor.jsx     # CodeMirror editor component
│   │   ├── Pages/
│   │   │   ├── Interface.jsx  # Main editor interface
│   │   │   └── Room.jsx       # Room creation/joining page
│   │   ├── App.jsx            # Main app component
│   │   └── socket.js          # Socket.IO client setup
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

The application uses Socket.IO for real-time communication. Key events:

- `join` - Join a room with username
- `code-change` - Broadcast code changes to all users
- `sync-code` - Sync code with newly joined users
- `joined` - Notify when a user joins
- `disconnected` - Notify when a user leaves

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Sahil** - Made with ❤️

## 🙏 Acknowledgments

- [CodeMirror](https://codemirror.net/) for the excellent code editor
- [Socket.IO](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling
- [React](https://reactjs.org/) for the amazing frontend framework

---

⭐ If you find this project helpful, please give it a star!