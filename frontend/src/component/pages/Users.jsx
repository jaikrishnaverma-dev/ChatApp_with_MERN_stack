import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchFun from "../../customHooks/useFetchFun";
import { MyContext } from "../../myContext/MyContext";
import AddGroup from "../mui_comp/AddGroup";

const Users = () => {
  const { state, setState } = useContext(MyContext);
  const [users, setUsers] = useState({
    users: [],
    toasts: [],
    left: false,
  });
  // custom hook to fetch data from api
  const { apiCaller, data, loading } = useFetchFun();
  // fetch user on every session change or reload page
  useEffect(() => {
    apiCaller(`api/user`, false, state.session ? state.session.token : "");
  }, [state.session]);

  // whenever data change user is aklso changed 
  useEffect(() => {
    setUsers({ users: data });
  }, [data]);
  const navigate = useNavigate();

  // responsible for redirect to message chat page to given user
  const divert = async (x) => {
    const res = await apiCaller(
      `api/chat`,
      false,
      state.session ? state.session.token : "",
      "POST",
      {
        userId: x._id,
      }
    );
    localStorage.setItem("userInfo", JSON.stringify({...state,tempChat:res}));
    setState({ ...state, tempChat: res });
    navigate(`/chat/${res._id}`);
  };

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );

  return (
    <div
      className="col-12 bg-white "
      style={{ height: "84.2vh", overflowY: "scroll" }}
    >
      <div className="mb-3 p-2 rounded container">
        <AddGroup users={users} setusers={setUsers}>
          <div
            onClick={() =>
              setUsers((prev) => {
                return { ...prev, left: !prev.left };
              })
            }
            className="d-flex align-items-center justify-content-center add-group p-3 my-3 text-white bg-purple rounded shadow-sm"
          >
            <img
              className="mx-3 rounded-circle"
              src="ui-1536_512.gif"
              alt=""
              width="50"
              height="50"
            />
            <div className="lh-1">
              <h1 className="h3 mb-0 text-white lh-1">CREATE GROUP</h1>
            </div>
          </div>
        </AddGroup>
        <div className="d-flex align-items-center p-3 my-3 text-white bg-mine rounded shadow-sm">
        <div className="input-group bg-mine">
          <input
            type="text"
            className="form-control "
            placeholder="Search Users"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e)=>apiCaller(`/api/user?search=${e.target.value}`, false, state.session ? state.session.token : "")}
          />
          <span className="input-group-text" id="basic-addon2">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
        <h6 className="border-bottom pb-2 mb-0">Users</h6>
        {users.users &&
          users.users.map((x) => (
            <div key={x._id} className="d-flex text-muted pt-3" onClick={() => divert(x)}>
              <img
                className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                width="35"
                height="35"
                alt={x.name}
                src={x.pic}
              
              />
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">{x.name}</strong>
                  {/* <a href="#">Follow</a> */}
                </div>
                <span className="d-block">{x.mobile}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
