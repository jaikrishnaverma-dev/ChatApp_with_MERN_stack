import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../myContext/MyContext";

// custom hook to check authenticated or not if not then redirect to login
const Authenticate = () => {
    const navigate=useNavigate()
    const { state } = useContext(MyContext);
    useEffect(() => {
      if (!state.session) {
        navigate("/login");
      }
    },[state.session]);
  }
  export default Authenticate