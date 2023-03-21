import { createContext, useEffect, useState } from "react";
export const MyContext = createContext();


const ChatProvider = ({ children }) => {
  const [state, setState] = useState({
    session:{},
    loading:true,
  });
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setState({...userInfo})
    }
  },[])
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

export default ChatProvider;
