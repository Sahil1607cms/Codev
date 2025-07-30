import React from "react";
import { Route, Routes } from "react-router";
import Room from "./Pages/Room.jsx";
import { Toaster } from "react-hot-toast";
import CodeEditor from "./Pages/CodeEditor.jsx";
const App = () => {
  return (
    <div className="bg-gray-950">
      <Routes>
        <Route path="/" element={<Room />} />
        <Route path="/editor/:roomID" element={<CodeEditor/>} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
