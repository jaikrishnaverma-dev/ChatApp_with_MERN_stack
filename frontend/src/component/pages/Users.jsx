import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";
import { MyContext } from "../../myContext/MyContext";
import AddGroup from "../mui_comp/AddGroup";

const Users = () => {
  const { user } = useContext(MyContext);
  const [state, setState] = useState({
    usersAndGroups: [],
    toasts: [],
    left:false
  });
  const { data, loading, error } = useFetch(
    "/api/user",
    user ? user.token : ""
  );
  useEffect(() => {
    setState({ usersAndGroups: data });
 
  }, [data]);
  const navigate = useNavigate();
  console.log('firstfirst',state)
  return (
    <div
      className="col-12 bg-white "
      style={{ height: "84.2vh", overflowY: "scroll" }}
    >
      <div className="mb-3 p-2 rounded container">
        <AddGroup state={state} setState={setState}>
        <div onClick={()=>setState(prev=>{return{...prev,left:!prev.left}})} className="d-flex align-items-center justify-content-center add-group p-3 my-3 text-white bg-purple rounded shadow-sm">
          <img
            className="mx-3 rounded-circle"
            src="ui-1536_512.gif"
            alt=""
            width="50"
            height="50"
          />
          <div className="lh-1" >
            <h1 className="h3 mb-0 text-white lh-1">CREATE GROUP</h1>
          </div>
        </div>
        </AddGroup>
      
        <h6 className="border-bottom pb-2 mb-0">Users & Groups</h6>
        {state.usersAndGroups &&
          state.usersAndGroups.map((x) => (
            <div
              className="d-flex text-muted pt-3"
              onClick={() => navigate(`/chat/${x._id}`)}
            >
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
