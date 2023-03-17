import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AlreadyLogged from "../../customHooks/AlreadyLogged";
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
  mobile: "",
  pic: "",
  loading: false,
  show: false,
};
const Signup = () => {
  AlreadyLogged();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState(initialState);
  const postDetails = (pics) => {
    setState({ ...state, loading: true });
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "drwxjase6");
      fetch("https://api.cloudinary.com/v1_1/drwxjase6/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((re) => {
          setState({ ...state, pic: re.url.toString(), loading: false });
        })
        .catch((err) => {
          console.log(err);
          setState({ ...state, loading: false });
        });
    } else {
      enqueueSnackbar("Please select Image.", { variant: "warning" });
    }
  };

  const submitHandler = async () => {
    const { name, email, password, confirmpassword, mobile, pic } = state;
    setState({ ...state, loading: true });
    if (!name || !email || !password || !confirmpassword || !mobile) {
      enqueueSnackbar("Please Fill All Fields.", { variant: "warning" });
      setState({ ...state, loading: false });
      return;
    }
    if (password !== confirmpassword) {
      enqueueSnackbar("Password do not matched.", { variant: "error" });
      setState({ ...state, loading: false });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          mobile,
          password,
          pic,
        },
        config
      );

      enqueueSnackbar("Registerd Successfully.", { variant: "success" });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setState(initialState);
      // history.push("/chats");
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      setState({ ...state, loading: false });
    }
  };
  return (
    <section className="auth-container vh-100 d-flex flex-column align-items-center justify-content-center">
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <div className="d-md-flex mt-md-4 align-items-center justify-content-between">
          <p className="m-0 p-0 logo-icon text-center">
            <i className="bi bi-chat-right-quote-fill"></i>
          </p>
          <h4 className=" mb-3 fw-normal">Create new account</h4>
        </div>

        <div className="form-floating mb-1">
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="text"
            className="form-control"
            value={state.mobile}
            onChange={(e) => setState({ ...state, mobile: e.target.value })}
            id="floatingInput"
            placeholder="+91 8787878787"
            required
          />
          <label htmlFor="floatingInput">Mobile no.</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="email"
            className="form-control"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            id="floatingInput"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Email address</label>
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
        <div className="form-floating mb-1">
          <input
            type={state.show ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            value={state.confirmpassword}
            onChange={(e) =>
              setState({ ...state, confirmpassword: e.target.value })
            }
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Confirm Password</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="file"
            className="form-control py-3 ps-4"
            id="floatingFile"
            accept="image/*"
            required
            onChange={(e) => postDetails(e.target.files[0])}
          />
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
            "Sign up"
          )}
        </button>
        <small>
          {" "}
          <Link to={"/login"}>Already have an Account?</Link>
        </small>
        <p className="mt-3 text-muted">© 2023–2030 jai.corp</p>
      </form>
    </section>
  );
};

export default Signup;
