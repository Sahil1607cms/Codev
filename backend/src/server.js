import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5001;

//storing socketID and username
const userSocketMap = {};

//fetch all connected users
const getAllUsers = (roomID) => {
  //io.sockets.adapter.rooms.get(roomID) returns a map (which we are converting to array )
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
  //fetching join emit from frontend
  socket.on("join", ({ roomID, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomID);
    const clients = getAllUsers(roomID);
    // sending the updated client info to the frontend
    clients.forEach(({ socketID }) => {
      io.to(socketID).emit("joined", {
        clients,
        username,
        socketID: socket.id,
      });
    });
  });

  socket.on("code-change", ({ roomID, code }) => {
    // console.log("receiving ", code);
    //sending code to all connected alients
    //io.to sends the code to all client including the one typing the code hence it overrides the code but we dont want that 
    socket.in(roomID).emit("code-change", { code });
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
