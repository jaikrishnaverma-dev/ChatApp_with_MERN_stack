import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../myContext/MyContext";

// custom hook to check authenticated or not if not then redirect to login
const AlreadyLogged = () => {
    const navigate=useNavigate()
    const { state } = useContext(MyContext);
    useEffect(() => {
        if(Object.keys(state.session).length!==0)
        navigate("/");
    },[state]);
  }
  export default AlreadyLogged