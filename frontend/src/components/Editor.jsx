import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/vibrant-ink.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import initSocket from "../socket.js";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Editor = ({ setClients }) => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomID } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const codeRef = useRef(null);

  //navigate to home page in case of any error
  const handleError = (e) => {
    console.log("Socket error :", e);
    toast.error("Failed to connect socket ");
    navigate("/");
  };

  useEffect(() => {
    const init = async () => {

      //initialize the socket as soon as the page loads
      //preventing socket from getting reset if any component re-renders
      socketRef.current = await initSocket();

      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      //sending connected user info to backend
      socketRef.current.emit("join", {
        roomID,
        username: location.state?.username,
      });

      //listening for joined event sent from server
      socketRef.current.on("joined", ({ clients, username, socketID }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
          console.log(`${username} joined`);
        }
        setClients(clients);
      });
      
      //listening for disconnecting event sent from server
      socketRef.current.on("disconnected", ({ socketID, username }) => {
        toast.error(`${username} left the room !`);
        setClients((prev) => {
          return prev.filter((client) => client.socketID !== socketID);
        });
      });

      //listening for code changes from server
      socketRef.current.on("code-change", ({ code }) => {
        if (code !== null && editorRef.current) {
          editorRef.current.setValue(code);
        }
      });
    };
    
    init();

    //always clear the listeners
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("join");
      socketRef.current.off("disconnected");
      socketRef.current.off("code-change");
      socketRef.current.removeAllListeners();
    };
  }, []);

  //getting the code editor on page load and initializing editorRef
  useEffect(() => {
    async function intitalize() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("code"),
        {
          mode: { name: "javascript", json: true },
          theme: "vibrant-ink",
          lineNumbers: true,
          autoCloseBrackets: true,
          autoCloseTags: true,
        }
      );
      codeRef.current = editorRef.current.getValue();
    }

    intitalize();
    editorRef.current.on("change", (instance, changes) => {
      const { origin } = changes;
      const code = instance.getValue();
      codeRef.current = code;
      if (origin != "setValue") {
        socketRef.current.emit("code-change", {
          roomID,
          code,
        });
      }
    });
  }, []);

  
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
