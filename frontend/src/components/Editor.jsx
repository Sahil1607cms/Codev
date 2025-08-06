import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/vibrant-ink.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { initSocket } from "../socket.js";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Editor = ({ setClients }) => {
  const socketRef = useRef(null);
  const location = useLocation();
  const { roomID } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const codeRef = useRef(null);

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

      //listening for joined event sent from server
      socketRef.current.on("joined", ({ clients, username, socketID }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room`);
          console.log(`${username} joined`);
        }
        setClients(clients);
        //send the previous stored code to new members for syncing
        if (codeRef.current && codeRef.current.trim() !== "") {
          socketRef.current.emit("sync-code", {
            code: codeRef.current,
            socketID,
          });
        }
      });
      //listening for disconnecting event sent from server
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
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("join");
      socketRef.current.off("disconnected");
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
      // console.log("working")
      const { origin } = changes;
      const code = instance.getValue();
      codeRef.current = code;
      if (origin != "setValue") {
        // console.log("Emitting ")
        socketRef.current.emit("code-change", {
          roomID,
          code,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("code-change", ({ code }) => {
        // console.log("receivng data" , code)
        if (code !== null) editorRef.current.setValue(code);
      });
    }
    return () => {
      socketRef.current.off("code-change");
    };
  }, [socketRef.current]);

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
