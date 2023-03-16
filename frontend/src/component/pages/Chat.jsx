import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Toasts from "../assests/Toasts";
import { MyContext } from "../../myContext/MyContext";
import ChatList from "./chatPages/ChatList";
import UsersList from "./chatPages/UsersList";
const Chat = () => {
  const { user } = useContext(MyContext);
  const [state, setState] = useState({
    users: [],
    currentChat:'',
    loader:true,
    toasts:[]
  });
  const fetchUsers = async () => {
    let config = { headers: { Authorization: "Bearer " + user.token } };
    const { data } = await axios("/api/user", config);
    setState({ users: data });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className="d-flex flex-wrap">
        <UsersList data={state.users} />
        <ChatList data={state.users} />
      </div>
      {/* <pre>{JSON.stringify(state.users, null, 4)}</pre> */}
      <Toasts
        toasts={[
          {
            msg: "Please fill all fiels!!",
            status: "warning",
          },
        ]}
      />
    </>
  );
};

export default Chat;
