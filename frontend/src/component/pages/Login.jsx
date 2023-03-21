import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlreadyLogged from "../../customHooks/AlreadyLogged";
import { MyContext } from "../../myContext/MyContext";
import { useSnackbar } from "notistack";
const Login = () => {
  const { setState } = useContext(MyContext);
  const [login, setlogin] = useState({
    email: "",
    password: "",
    loading: false,
  });
  // sneakbar for notifications
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  // customHook to check user already logged in or not if loggedin redrect to root
  AlreadyLogged();
  //message submit handler
  const submitHandler = async () => {
    const { email, password } = login;
    setlogin({ ...login, loading: true });
    if (!email || !password) {
      setlogin({ ...login, loading: false });
      enqueueSnackbar("Please Fill all Fields.", { variant: "warning" });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      setlogin({
        email: "",
        password: "",
        loading: false,
      });
      enqueueSnackbar("Logged In SuccessFully.", { variant: "success" });
      setState({ session: data });
      localStorage.setItem("userInfo", JSON.stringify({ session: data }));
      navigate("/");
    } catch (error) {
      // error notification
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setlogin({ ...login, loading: false });
    }
  };
  return (
    <section className="auth-container vh-100 d-flex flex-column align-items-center justify-content-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
        className="auth-form"
      >
        <p className="m-4 logo-icon text-center">
          <i className="bi bi-chat-right-quote-fill"></i>
        </p>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-1">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={login.email}
            onChange={(e) => setlogin({ ...login, email: e.target.value })}
          />
          <label for="floatingInput">Email or Mobile no.</label>
        </div>
        <div className="form-floating mb-1 position-relative">
          <input
            type={login.show ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            value={login.password}
            onChange={(e) => setlogin({ ...login, password: e.target.value })}
            placeholder="Password"
            required
          />
          <p
            className="position-absolute fs-4 mb-0 text-secondary"
            onClick={() => setlogin({ ...login, show: !login.show })}
            style={{ zIndex: 1000, top: "10px", right: "15px" }}
          >
            <i
              className={`bi bi-eye-${login.show ? "fill" : "slash-fill"}`}
            ></i>
          </p>
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button
          className={`w-100 btn btn-lg btn-mine mb-3 ${
            login.loading ? "p-0" : ""
          }`}
          type="submit"
        >
          {login.loading ? (
            <img
              style={{ width: "50px" }}
              className=" end-0 top-0"
              src="Spinner-0.6s-200px.gif"
              alt=""
            />
          ) : (
            "Sign in"
          )}
        </button>
        <small>
          {" "}
          <Link to={"/Signup"}>Create new Account?</Link>
        </small>
        <p className="mt-5 text-muted">© 2023–2030 jai.corp</p>
      </form>
    </section>
  );
};

export default Login;
