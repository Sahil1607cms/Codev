import React from "react";
import Aside from "../components/Aside.jsx";
import Editor from "../components/Editor.jsx";
import { useState } from "react";
const Interface = () => {
     const [clients, setClients] = useState([]);
  
  return (
    <div className="h-screen flex  bg-gray-950">
      <Aside users={clients}/>
      <Editor setClients={setClients}/>
    </div>
  );
};

export default Interface;
