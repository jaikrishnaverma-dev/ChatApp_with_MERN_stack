import { IconButton, InputAdornment } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../customHooks/useFetch";
import { MyContext } from "../../../myContext/MyContext";
import ChatHeader from "../../mui_comp/ChatHeader";

const ChatList = () => {
  const { user } = useContext(MyContext);
  const { id } = useParams();
  const [state, setState] = useState({
    chats: [],
    toasts: [],
  });

  const { data, loading, error } = useFetch(
    "/api/chat",
    user ? user.token : "",
    "POST",
    {
      userId: id,
    }
  );
  useEffect(() => {
    setState({ chats: data });
  }, [user]);
  return (
    <div className="col-12 " style={{ height: "84.2vh", overflowY: "scroll" }}>
      <ChatHeader />
      <div className="my-3  container">
        {[true, false, true].map((x) => (
          <div
            className={`d-flex my-2 col-12 chat-log ${
              x ? "" : "flex-row-reverse"
            }`}
          >
            <div
              className={`d-flex text-muted p-2 ${
                x ? "chat-left" : "chat-right "
              }`}
              style={{ maxWidth: "65%" }}
            >
              <div className="p-0 m-0">
                <p className="pb-1 mb-0  small lh-sm">
                  <strong className="d-block text-gray-dark"></strong>
                  This user also gets some representative placeholder content.
                  Maybe they did something interesting, and you really want to
                  highlight this in the recent updates.
                </p>
                <p
                  className="pe-2 m-0 p-0 border-bottom"
                  style={{ textAlign: "right", fontSize: "12px" }}
                >
                  {" "}
                  <small>4:05&nbsp;PM</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container"></div>

      {/* input */}
      <div
        className="position-fixed col-12 mb-2"
        style={{ bottom: "0px", margin: "0 auto" }}
      >
        <span className="container d-flex justify-content-between my-1">
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
                style={{ minWidth: "100px", width: "-webkit-fill-available" }}
              />
            </div>
            <div className="d-flex align-items-center text-secondary">
              <i className="bi bi-paperclip mx-1"></i>
              <i class="bi bi-camera-fill mx-1"></i>
            </div>
          </span>
          <button
            className="btn rounded-circle btn-msg mx-1 d-flex align-items-center justify-content-center"
            style={{ width: "50px" }}
          >
            <i className="bi bi-alexa"></i>
          </button>
        </span>
      </div>
    </div>
  );
};

export default ChatList;
