import { Box, LinearProgress } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetchFun from "../../../customHooks/useFetchFun";
import { MyContext } from "../../../myContext/MyContext";

const UsersList = () => {
  const { state, setState } = useContext(MyContext);
  const { apiCaller, data, loading } = useFetchFun();
  useEffect(() => {
    apiCaller(`api/chat`, false, state.session ? state.session.token : "");
  }, [state.session]);

  const navigate = useNavigate();
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
    
      <div className="my-3 p-2 rounded container">
        <h6 className="border-bottom pb-2 mb-0">Chat & Groups</h6>
        {data &&
          data.map(
            (x) =>
              x.users.length > 1 && (
                <div
                  key={x._id}
                  className="d-flex text-muted pt-3"
                  onClick={() => {
                    localStorage.setItem(
                      "userInfo",
                      JSON.stringify({ ...state, tempChat: x })
                    );
                    setState({ ...state, tempChat: x });
                    navigate(`/chat/${x._id}`);
                  }}
                >
                  <img
                    className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                    width="35"
                    height="35"
                    alt={x.name}
                    src={
                      x.isGroupChat
                        ? "166258.png"
                        : x.users[0]._id == state.session._id
                        ? x.users[1].pic
                        : x.users[0].pic
                    }
                  />
                  <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div className="d-flex justify-content-between">
                      <strong className="text-gray-dark">
                        {x.isGroupChat
                          ? x.chatName
                          : x.users[0]._id === state.session._id
                          ? x.users[1].name
                          : x.users[0].name}
                      </strong>
                      {/* <a href="#">Follow</a> */}
                    </div>
                    <span className="d-block">{x.mobile}</span>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default UsersList;
