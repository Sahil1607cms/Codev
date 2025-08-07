import { io } from "socket.io-client";

//returning instance of the socket client
export const initSocket = async () => {
  const options = {
    "force-new-connection": true, //no sharing of different sockets, make new socket for each connection to avoid intermixing
    reconnectionAttempts: Infinity, //handling network interruptions
    timeout: 10000, //try to connect till 10 sec else throw error
    transports: ["websocket"], //preventing fallback to http polling
  };
  // returning a new WebSocket client instance 
  return io(import.meta.env.VITE_BACKEND_URL || "http://localhost:5001", options);
};

export default initSocket;
