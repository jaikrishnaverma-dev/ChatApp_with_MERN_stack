import { createContext, useEffect, useState } from "react";
export const MyContext = createContext();


const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      console.log("userInfo=>",userInfo)
      setUser(userInfo)
    }
  },[])
  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

export default ChatProvider;
