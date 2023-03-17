import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AlreadyLogged from "../../customHooks/AlreadyLogged";
import { MyContext } from "../../myContext/MyContext";
import { useSnackbar } from "notistack";
const Login = () => {
  AlreadyLogged()
  const {user,setUser}=useContext(MyContext)
  const [state, setState] = useState({
    email: "",
    password: "",
    loading: false,
  });
  const { enqueueSnackbar } = useSnackbar();
  const submitHandler = async () => {
    const { email, password } = state;
    setState({ ...state, loading: true });
    if (!email || !password) {
      setState({ ...state, loading: false });
       enqueueSnackbar("Please Fill all Fields.",{variant:'warning'});
      return;
    }

    // console.log(email, password);
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
    
      setState({
        email: "",
        password: "",
        loading: false,
      });
        enqueueSnackbar("Logged In SuccessFully.",{variant:'success'});
      setUser(data)
      localStorage.setItem("userInfo", JSON.stringify(data));
      // history.push("/chats");
    } catch (error) {
      enqueueSnackbar(error.response.data.message,{variant:'error'});
      setState({ ...state, loading: false });
    }
  };
  console.log(state);
  return (
    <section className="auth-container vh-100 d-flex flex-column align-items-center justify-content-center">
      <form onSubmit={(e)=>{e.preventDefault();submitHandler()}} className="auth-form">
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
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <label for="floatingInput">Email or Mobile no.</label>
        </div>
        <div className="form-floating mb-1 position-relative">
          <input
            type={state.show ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            placeholder="Password"
            required
          />
          <p
            className="position-absolute fs-4 mb-0 text-secondary"
            onClick={() => setState({ ...state, show: !state.show })}
            style={{ zIndex: 1000, top: "10px", right: "15px" }}
          >
            <i
              className={`bi bi-eye-${state.show ? "fill" : "slash-fill"}`}
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
            state.loading ? "p-0" : ""
          }`}
          type="submit"
        >
          {state.loading ? (
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
