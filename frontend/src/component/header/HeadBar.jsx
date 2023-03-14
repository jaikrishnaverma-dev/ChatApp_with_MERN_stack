import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const HeadBar = () => {
  return (
    <>
    <header>
      <nav className="navbar sticky-top navbar-dark">
        <div className="container-fluid d-flex justify-content-between align-items-center mb-3">
          <a className="navbar-brand fw-bold fs-4 max50" href="#">
            Whatsapp
          </a>
          <div className="max50 text-white fs-4">
            <i className="bi bi-search mx-3"></i>
            <i className="bi bi-three-dots-vertical"></i>
          </div>
        </div>
        <div className="container-fluid d-flex justify-content-between align-items-center mt-2 ">
          <NavLink to={'/groups'} className="navlinks col-1 text-center fs-6 ">
            <i className="bi bi-people-fill"></i>
          </NavLink>
          <NavLink to={'/'} className="col-3 navlinks text-center fs- fw-bold">CHATS</NavLink>
          <NavLink to={'/status'} className="col-3 navlinks text-center fs-6 fw-bold">STATUS</NavLink>
          <NavLink to={'/calls'} className="col-3 navlinks text-center fs-6 fw-bold">CALLS</NavLink>
        </div>
      </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  );
};

export default HeadBar;
