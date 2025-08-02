import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
const Room = () => {
  const [roomID, setRoomID] = useState("");
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
 
  const joinRoom= ()=>{
    if(!roomID || !username) 
    {
      toast.error("Username and Room ID required")
      return
    }
    //react router gives feature to share the states from one route to other
    navigate(`/editor/${roomID}`, {
      state:{
        username,
      }
    })
  }

  const handleKeyPress = (e) =>{
    if(e.code === 'Enter')
    joinRoom()
  }

  //generating random room id
  const createRoomId = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomID(id);
    toast.success("Room ID created successfully");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative">
      <form
        action=""
        className="flex flex-col gap-4 px-10 py-2 justify-center items-center sm:bg-gray-950  text-gray-200  h-100 w-100 rounded-lg "
      >
        <h2 className="text-start text-3xl text-yellow-300 font-bold mb-8 ">
          {" "}
          Welcome to Codev
        </h2>
        <input
          type="text"
          placeholder="Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          className="w-[99%] px-1 outline-none border-b-2 py-2"
          onKeyDown={handleKeyPress}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="w-[99%] px-1 outline-none border-b-2 py-2"
          onKeyDown={handleKeyPress}
        />
        <button
          type="button"
          className="w-[80%] bg-yellow-300 mt-7 text-black px-8 py-1 rounded-lg hover:bg-yellow-400 cursor-pointer"
          onClick={joinRoom}
        >
          Join
        </button>
        <label className="flex items-center justify-center gap-3 ">
          <p>Dont have a Room ID ? </p>
          <a
            href=""
            className="text-yellow-300 hover:text-yellow-400 cursor-pointer "
            onClick={createRoomId}
          >
            Generate Room ID
          </a>
        </label>
      </form>
      <footer className="absolute bottom-10">
        <p className="text-yellow-300   font-bold">Made with ❤️ by Sahil</p>
      </footer>
    </div>
  );
};

export default Room;
