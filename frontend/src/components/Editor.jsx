import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { initSocket } from "../socket.js";
import {
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

const Editor = ({ setClients }) => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomID } = useParams();
  const navigate = useNavigate();

  console.log(roomID);
  useEffect(() => {
    const init = async () => {
      //initialize the socket as soon as the page loads
      socketRef.current = await initSocket();
      
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));
      
      //sending connected user info to backend
      socketRef.current.emit("join", {
        roomID,
        username: location.state?.username,
      });
      //listening for join event
      socketRef.current.on("joined", ({ clients, username, socketID }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
          console.log(`${username} joined`);
        }
        setClients(clients);
      });
      //listening for disconnecting event
      socketRef.current.on("disconnected", ({ socketID, username }) => {
        toast.error(`${username} left the room !`);
        setClients((prev) => {
          return prev.filter((client) => client.socketID !== socketID);
        });
      });
    };
    init();
    //always clear the listeners
    //cleaning funcion
    return ()=>{
      socketRef.current.disconnect();
      socketRef.current.off('join')
      socketRef.current.off('disconnected')
    }
  }, []);

  //getting the code editor on page load
  useEffect(() => {
    async function intitalize() {
      Codemirror.fromTextArea(document.getElementById("code"), {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
      });
    }
    intitalize();
  }, []);

  //navigate to home page in case of any error 
  const handleError = (e) => {
    console.log("Socker error :", e);
    toast.error("Failed to connect socket ");
    navigate("/");
  };
  if (!location.state) {
    navigate("/");
  }

  //main area for writing the code
  return (
    <textarea
      id="code"
      className="text-white w-full outline-none text-xl"
    ></textarea>
  );
};

export default Editor;
