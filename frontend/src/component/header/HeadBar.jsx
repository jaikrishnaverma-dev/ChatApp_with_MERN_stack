import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MyContext } from "../../myContext/MyContext";
const HeadBar = () => {
  const { setState } = useContext(MyContext);
  const [search, setSearch] = useState(false);
  return (
    <>
      <header>
        <nav className="navbar sticky-top navbar-dark">
          {search ? (
            <div className="d-flex m-3 mb-4 align-items-center col-11">
              <i
                className="bi bi-arrow-left fs-1 me-4"
                onClick={() => setSearch(false)}
              ></i>
              
              <TextField
                id="standard-basic"
                className="searchInput"
                label="Search Users"
                variant="standard"
              />
            </div>
          ) : (
            <>
              <div className="container-fluid mb-4 d-flex justify-content-between align-items-center mb-1">
                <p className="navbar-brand fw-bold fs-4 max50 mx-1">Whatsapp</p>
                <div className="max50 text-white fs-4">
                  <i
                    className="bi bi-search mx-3"
                    onClick={() => setSearch((prev) => !prev)}
                  ></i>
                  <i
                    onClick={() => {
                      setState({ session: false });
                      localStorage.removeItem("userInfo");
                    }}
                    className="bi bi-box-arrow-left mx-2"
                  ></i>
                  <i className="bi bi-three-dots-vertical"></i>
                </div>
              </div>
              <div className="container-fluid d-flex justify-content-between align-items-center ">
                <NavLink
                  to={"/users"}
                  className="navlinks col-1 text-center fs-6 "
                >
                  <i className="bi bi-people-fill"></i>
                </NavLink>
                <NavLink
                  to={"/"}
                  className="col-3 navlinks text-center fs- fw-bold"
                >
                  CHATS
                </NavLink>
                <NavLink
                  to={"/status"}
                  className="col-3 navlinks text-center fs-6 fw-bold"
                >
                  STATUS
                </NavLink>
                <NavLink
                  to={"/calls"}
                  className="col-3 navlinks text-center fs-6 fw-bold"
                >
                  CALLS
                </NavLink>
              </div>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HeadBar;
