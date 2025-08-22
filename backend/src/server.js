import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.head("/uptime", (req, res) => {
  res.sendStatus(200);  // just returns 200 OK, no body
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST","HEAD"]
  }
});
const PORT = process.env.PORT || 5001;

//storing socketID and username
const userSocketMap = {};

//storing code for each room
const roomCodeMap = {};

//fetch all connected users
const getAllUsers = (roomID) => {
  //io.sockets.adapter.rooms is a Map object that Socket.IO maintains
  //io.sockets.adapter.rooms.get(roomID) returns a set (which we are converting to array )
  const room = io.sockets.adapter.rooms.get(roomID);
  if (!room) return [];
  return Array.from(room).map((socketID) => {
    return {
      socketID,
      username: userSocketMap[socketID],
    };
  });
};

io.on("connection", (socket) => {
  console.log("Socket is connectedd ", socket.id);
  
  //fetching join emit from frontend, and sending updated clients list to frontend
  socket.on("join", ({ roomID, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomID);
    const clients = getAllUsers(roomID);
    
    // Initialize room code if it doesn't exist
    if (!roomCodeMap[roomID]) {
      roomCodeMap[roomID] = "";
    }
    
    // sending the updated client info to the frontend
    clients.forEach(({ socketID }) => {
      io.to(socketID).emit("joined", {
        clients,
        username,
        socketID: socket.id,
      });
    });
    
    // Send existing code to the newly joined user
    if (roomCodeMap[roomID] && roomCodeMap[roomID].trim() !== "") {
      socket.emit("code-change", { code: roomCodeMap[roomID] });
    }
  });

  socket.on("code-change", ({ roomID, code }) => {
    // Store the code for this room
    roomCodeMap[roomID] = code;
    
    //sending code to all connected clients except the sender
    socket.in(roomID).emit("code-change", { code });
  });

  socket.on("sync-code", ({ socketID, code }) => {
  io.to(socketID).emit("code-change", { code });
});

  //before disconnecting, fetch all the rooms, select room with roomID, and send the disconnecting user info to frontend
  socket.on("disconnecting", () => {
    //other way of converting map to array
    const rooms = [...socket.rooms];
    rooms.forEach((roomID) => {
      // emit expects a data {} and not callback function ()=>{}
      socket.in(roomID).emit("disconnected", {
        socketID: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

server.listen(PORT, () => {
  console.log("Server connected to port ", PORT);
});
