import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchFun from "../../../customHooks/useFetchFun";
import { MyContext } from "../../../myContext/MyContext";
import ChatHeader from "../../mui_comp/ChatHeader";
import io from 'socket.io-client'
const ENDPOINT="http://localhost:5000";
var socket, selectedChatCompare;
const ChatList = () => {
  const bottom = useRef(null);
  const { state } = useContext(MyContext);
  const { id } = useParams();
  const [fetch, setfetch] = useState(true);
  const { apiCaller, loading } = useFetchFun();
  const [message, setMessage] = useState();
  const [socketConnected,setSocketConnected]=useState(false)
// fetch message using custom hook
  const fetchMessage = async () => {
    const result = await apiCaller(
      `/api/message/${id}`,
      false,
      state.session ? state.session.token : ""
    );
    setMessage([...result]);
  };
  // to render message on each submission
  useEffect(() => {
    if (state.session) fetchMessage();
  }, [state.session, fetch]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const messageSender = async (e) => {
    e.preventDefault();
    apiCaller(
      `/api/message`,
      false,
      state.session ? state.session.token : "",
      "POST",
      {
        content: e.target.message.value,
        chatId: id,
      }
    );
    setfetch((prev) => !prev);
    e.target.reset();
  };

useEffect(()=>{
socket = io(ENDPOINT) 
socket.emit("setup",  state.session);
socket.on("connection",()=>setSocketConnected(true))
},[])

console.log('state',state)
  if (!state.tempChat)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  return (
    <div
      className="col-12 pt-5  mt-5"
      style={{ height: "84.2vh", overflowY: "scroll",}}
    >
      {<ChatHeader loading={loading} />}
      
      <div className="container">
        {!loading &&
          message &&
          message.map((x, i) => (
            <div
              key={x._id}
              className={`d-flex my-2 col-12 chat-log ${
                x.sender._id !== state.session._id ? "" : "flex-row-reverse"
              }`}
            >
              <div
                className={`d-flex  text-muted p-2 ${
                  x.sender._id !== state.session._id
                    ? "chat-left"
                    : "chat-right"
                }`}
                style={{ maxWidth: "65%", minWidth: "20%" }}
              >
                <img
                  src={x.sender.pic}
                  style={{ width: "40px", height: "40px" }}
                  className="rounded-circle me-1"
                  alt=""
                />
                <div className="p-0 m-0">
                  <p className="pb-1 mb-0  small lh-sm">
                    <strong className="d-block text-gray-dark"></strong>
                    {x.content}
                  </p>
                  <p
                    className="pe-2 m-0 p-0 border-bottom"
                    style={{ textAlign: "right", fontSize: "12px" }}
                  >
                    {" "}
                    <span className="fw-bold mx-1 text-primary">
                      {x.sender.name}
                    </span>
                    <small> 4:05&nbsp;PM</small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        <div id="bottom" ref={bottom}></div>
      </div>
      <div className="container"></div>

      {/* input */}
      <div
        className="position-fixed col-12 mb-2"
        style={{ bottom: "0px", margin: "0 auto" }}
      >
        <form
          onSubmit={messageSender}
          className="container d-flex justify-content-between my-1"
        >
          <span
            className="px-3 py-1 bg-white rounded-pill d-flex align-items-center justify-content-between fs-5"
            style={{ width: "calc(96% - 50px)" }}
          >
            <div
              className="d-flex align-items-center text-secondary"
              style={{ minWidth: "75%", width: "-webkit-fill-available" }}
            >
              <i className="bi bi-emoji-laughing me-2"></i>
              <input
                type="dg"
                className="chatInput"
                name="message"
                style={{ minWidth: "100px", width: "-webkit-fill-available" }}
              />
            </div>
            <div className="d-flex align-items-center text-secondary">
              <i className="bi bi-paperclip mx-1"></i>
              <i className="bi bi-camera-fill mx-1"></i>
            </div>
          </span>
          <button
            className="btn  rounded-circle btn-msg mx-1 d-flex align-items-center justify-content-center"
            type="submit"
          >
            <i className="fs-4 bi bi-send-fill"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatList;
