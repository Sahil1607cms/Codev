# 🚀 Codev - Real-Time Collaborative Code Editor

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-orange.svg)](https://socket.io/)
[![Express](https://img.shields.io/badge/Express-5.1.0-black.svg)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

> A modern, real-time collaborative code editor that enables multiple developers to code together simultaneously. Perfect for pair programming, code reviews, and remote collaboration.

## 🌟 Live Demo

**[🚀 Try Codev Live](https://codev-collaborative-editor.onrender.com/)**

## ✨ Features

- **🔗 Real-time Collaboration** - Multiple users can edit code simultaneously with instant synchronization
- **🏠 Room-based Sessions** - Create or join rooms using unique room IDs for organized collaboration
- **👥 User Management** - See who's currently in the room with live user presence
- **💻 Professional Editor** - CodeMirror integration with syntax highlighting for multiple languages
- **🎨 Modern UI** - Clean, dark-themed interface with responsive design
- **🔔 Instant Notifications** - Toast notifications for user join/leave events
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **⚡ Fast Performance** - Built with Vite for optimized development and production builds

## 🛠️ Tech Stack

### Frontend
- **[React 19](https://reactjs.org/)** - Modern React with hooks and functional components
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[CodeMirror](https://codemirror.net/)** - Professional code editor with syntax highlighting
- **[Socket.IO Client](https://socket.io/)** - Real-time bidirectional communication
- **[React Router](https://reactrouter.com/)** - Client-side routing for SPA navigation
- **[React Hot Toast](https://react-hot-toast.com/)** - Elegant toast notifications
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment
- **[Express.js](https://expressjs.com/)** - Fast, unopinionated web framework
- **[Socket.IO](https://socket.io/)** - Real-time bidirectional event-based communication
- **[Nodemon](https://nodemon.io/)** - Development server with automatic restart

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

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
   ```bash
   cd ../backend
   echo "PORT=5001" > .env
   ```

### Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will start on `http://localhost:5001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will start on `http://localhost:5173`

#### Production Mode

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
   - Enter your username
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
├── README.md
└── RENDER_DEPLOYMENT.md       # Deployment guide
```

## 🔧 API Documentation

The application uses Socket.IO for real-time communication. Key events:

| Event | Description |
|-------|-------------|
| `join` | Join a room with username |
| `code-change` | Broadcast code changes to all users |
| `sync-code` | Sync code with newly joined users |
| `joined` | Notify when a user joins |
| `disconnected` | Notify when a user leaves |

## 🚀 Deployment

This project is deployed on **Render**. Check out the [deployment guide](RENDER_DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sahil** - Full Stack Developer

- GitHub: [@Sahil1607cms](https://github.com/Sahil1607cms)
- Made with ❤️ and ☕

## 🙏 Acknowledgments

- [CodeMirror](https://codemirror.net/) for the excellent code editor
- [Socket.IO](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling
- [React](https://reactjs.org/) for the amazing frontend framework
- [Render](https://render.com/) for hosting the application

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Sahil1607cms/Codev?style=social)
![GitHub forks](https://img.shields.io/github/forks/Sahil1607cms/Codev?style=social)
![GitHub issues](https://img.shields.io/github/issues/Sahil1607cms/Codev)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Sahil1607cms/Codev)

---

⭐ **If you find this project helpful, please give it a star!** ⭐