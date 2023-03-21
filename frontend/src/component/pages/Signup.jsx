import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AlreadyLogged from "../../customHooks/AlreadyLogged";
import { MyContext } from "../../myContext/MyContext";
const initialsignup = {
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
  const { setState } = useContext(MyContext);
  // customHook to check user already logged in or not if loggedin redrect to root
  AlreadyLogged();
  const { enqueueSnackbar } = useSnackbar();
  const [signup, setsignup] = useState(initialsignup);
  // function to manage image upload on cloudinary
  const postDetails = (pics) => {
    setsignup({ ...signup, loading: true });
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
          setsignup({ ...signup, pic: re.url.toString(), loading: false });
        })
        .catch((err) => {
          enqueueSnackbar("Image not uploaded successfully", {
            variant: "error",
          });
          setsignup({ ...signup, loading: false });
        });
    } else {
      enqueueSnackbar("Please select Image.", { variant: "warning" });
    }
  };
  //sign up form submit handler with validation
  const submitHandler = async () => {
    const { name, email, password, confirmpassword, mobile, pic } = signup;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      enqueueSnackbar("wrong email address.", { variant: "error" });
    } else if (
      !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)
    ) {
      enqueueSnackbar(
        "Password should be min 8 letter password, with at least a symbol, upper and lower case letters and a number. ",
        { variant: "error" }
      );
    } else {
      setsignup({ ...signup, loading: true });
      if (!name || !email || !password || !confirmpassword || !mobile) {
        enqueueSnackbar("Please Fill All Fields.", { variant: "warning" });
        setsignup({ ...signup, loading: false });
        return;
      }
      if (password !== confirmpassword) {
        enqueueSnackbar("Password do not matched.", { variant: "error" });
        setsignup({ ...signup, loading: false });
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
        localStorage.setItem("userInfo", JSON.stringify({ session: data }));
        setState({session:data})
        setsignup(initialsignup);
      } catch (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        setsignup({ ...signup, loading: false });
      }
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
            value={signup.name}
            onChange={(e) => setsignup({ ...signup, name: e.target.value })}
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
            value={signup.mobile}
            onChange={(e) => setsignup({ ...signup, mobile: e.target.value })}
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
            value={signup.email}
            onChange={(e) => setsignup({ ...signup, email: e.target.value })}
            id="floatingInput"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-1 position-relative">
          <input
            type={signup.show ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            value={signup.password}
            onChange={(e) => setsignup({ ...signup, password: e.target.value })}
            placeholder="Password"
            required
          />
          <p
            className="position-absolute fs-4 mb-0 text-secondary"
            onClick={() => setsignup({ ...signup, show: !signup.show })}
            style={{ zIndex: 1000, top: "10px", right: "15px" }}
          >
            <i
              className={`bi bi-eye-${signup.show ? "fill" : "slash-fill"}`}
            ></i>
          </p>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type={signup.show ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            value={signup.confirmpassword}
            onChange={(e) =>
              setsignup({ ...signup, confirmpassword: e.target.value })
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
            signup.loading ? "p-0" : ""
          }`}
          type="submit"
        >
          {signup.loading ? (
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
        <p className="mt-3 text-muted">© 2023-2030 jai.corp</p>
      </form>
    </section>
  );
};

export default Signup;
