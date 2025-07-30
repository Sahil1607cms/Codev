import React, { useState } from "react";

const CodeEditor = () => {
  const [users, setUsers] = useState([
    {
      socketId: 1,
      username: "kratos",
    },
    {
      socketId: 2,
      username: "odin",
    },
    {
      socketId: 3,
      username: "kratos",
    },
    {
      socketId: 4,
      username: "thor",
    },
    {
      socketId: 5,
      username: "loki",
    },
    {
      socketId: 6,
      username: "odin",
    },
  ]);
  const getColorFromUsername = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 60%)`; 
    return color;
  };
  return (
    <div className="h-screen  bg-gray-950">
      <aside className=" text-white border-r-1 border-gray-700 w-50 h-screen">
        <h2 className="text-center border-b-1 border-gray-700 text-4xl font-bold py-3  ">
          &lt; Codev /&gt;
        </h2>
        <h4 className="text-green-300 text-center py-2">Connected Users</h4>
        <div className="flex flex-wrap justify-center ">
          {users.map((user, id) => (
            <div key={id} className=" m-2">
              <div
                className="h-[70px] w-[70px]  flex items-center justify-center text-black rounded-lg text-2xl font-bold "
                style={{ backgroundColor: getColorFromUsername(user.username) }}
              >
                {user.username[0]}
              </div>
              <div className="text-white font-semibold text-center">{user.username}</div>
            </div>
          ))}
        </div>
      </aside>
      <div></div>
    </div>
  );
};

export default CodeEditor;
