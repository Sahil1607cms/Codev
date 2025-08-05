import React from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast"
const Aside = ({users}) => {
  
  const { roomID } = useParams();
  const navigate=useNavigate()
  const getColorFromUsername = (username) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 60%)`;
    return color;
  };
  const copyID =()=>{
    navigator.clipboard.writeText(roomID)
    .then(() => toast.success("RoomID copied"))
    .catch((err) => toast.error(err));
  }
  return (
    <div>
      <aside className=" text-white border-r-1 border-gray-700 w-50 h-screen relative">
        <h2 className="text-center border-b-1 border-gray-700 text-4xl font-bold py-3  ">
          &lt; Codev /&gt;
        </h2>
        <h4 className="text-green-300  text-center py-2">Connected Users</h4>
        <div className="flex flex-wrap justify-center  cursor-pointer ">
          {users.map((user, id) => (
            <div key={id} className=" m-2 ">
              <div
                className="h-[70px] w-[70px]  flex items-center justify-center text-black rounded-lg text-2xl font-bold "
                style={{ backgroundColor: getColorFromUsername(user.username) }}
              >
                {user.username[0]}
              </div>
              <div className="text-white font-semibold text-center">
                {user.username}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col absolute items-center w-full gap-4 mb-4 bottom-0 font-bold">
          <button className="bg-green-600 hover:bg-green-700 px-4 py-2  rounded-lg cursor-pointer" onClick={copyID}>
            Copy Room ID
          </button>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2  rounded-lg cursor-pointer" onClick={()=>{navigate("/")}}>
            Leave Room
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
