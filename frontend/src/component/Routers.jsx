import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Secure from "../HOC/Secure";
import HeadBar from "./header/HeadBar";
import Chat from "./pages/Chat";
import ChatList from "./pages/chatPages/ChatList";
import Errors from "./pages/Errors";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Users from "./pages/Users";

const Routers = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Secure Component={HeadBar} />,
      children: [
        {
          path: "/",
          element: <Chat />
        },
        {
          path: "/chat",
          element: <Chat />
        },
        {
          path: "/users",
          element: <Users />,
          children: [],
        },
        {
          path: "/*",
          element: <Errors />,
        },
      ],
    },
    {
            path: "/chat/:id",
            element: <ChatList />
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routers;
