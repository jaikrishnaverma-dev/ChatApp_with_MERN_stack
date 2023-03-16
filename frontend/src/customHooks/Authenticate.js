import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../myContext/MyContext";

// custom hook to check authenticated or not if not then redirect to login
const Authenticate = () => {
    const navigate=useNavigate()
    const { user } = useContext(MyContext);
    useEffect(() => {
      if (!user) {
        navigate("/login");
      }
    },[user]);
  }
  export default Authenticate