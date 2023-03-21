import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import useFetchFun from "../../customHooks/useFetchFun";
import { MyContext } from "../../myContext/MyContext";
import { LinearProgress } from "@mui/material";

export default function ChatHeader({loading}) {
  const navigate = useNavigate();
  const { state } = React.useContext(MyContext);
  // if page refreshed by user and tempChat not available then navigate to root
  if (!state.tempChat) navigate("/");
  // sidebar states to toggle
  const [toggle, settoggle] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  // custom hook to call api
  const { apiCaller } = useFetchFun();

  React.useEffect(() => {
    apiCaller(`api/chat`, false, toggle.session ? toggle.session.token : "");
  }, []);
  // respoinsible for slide sidebar / drawer
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    settoggle({ ...toggle, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ p: 2 }}>
        {state.tempChat.users.map((x, index) => (
          <div
            key={x._id}
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
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <nav className="navbar fixed-top navbar-dark">
        <div className="container-fluid d-flex justify-content-between align-items-center mb-1">
          <div
            className="d-flex align-items-center p-2  bg-purple rounded "
            style={{ maxWidth: "70%" }}
          >
            <i
              onClick={() => navigate("/chat")}
              className="bi bi-arrow-left-short me-3 fs-1"
            ></i>
            <img
              onClick={toggleDrawer("right", true)}
              className="me-3 rounded-circle"
              src={
                state.tempChat.isGroupChat
                  ? "https://cdn-icons-png.flaticon.com/512/166/166258.png"
                  : state.tempChat.users[1]._id === state.session._id
                  ? state.tempChat.users[0].pic
                  : state.tempChat.users[1].pic
              }
              alt=""
              width="48"
              height="48"
            />
            <div className="lh-1" style={{ overflowX: "hidden" }}>
              <h1 className="h3 mb-0 lh-1">
                {state.tempChat.isGroupChat
                  ? state.tempChat.chatName
                  : state.tempChat.users[1]._id === state.session._id
                  ? state.tempChat.users[0].name
                  : state.tempChat.users[1].name}
              </h1>
              {/* <small>Since 2011</small> */}
            </div>
          </div>
          <div className="max50 text-white fs-4">
            <i className="bi me-3 bi-telephone-fill"></i>
            <i
              className="bi bi-info-circle-fill me-2"
              onClick={toggleDrawer("right", true)}
            ></i>
          </div>
        </div>
        <div className="container-fluid d-flex justify-content-between align-items-center "></div>
        {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      </nav>
      <Drawer
        anchor={"right"}
        open={toggle["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
