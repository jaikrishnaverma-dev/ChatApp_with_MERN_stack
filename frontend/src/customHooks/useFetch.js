import axios from "axios";
import { useEffect, useState } from "react";
const useFetch = (url,token,method="GET",payload={}) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const fetchUsers = async () => {
    try{
    let config = { headers: { 
        "Content-Type": "application/json",
        Authorization: "Bearer " + token } 
    };
    let res={}
    
    if(method==="GET")
    res = await axios(url, config);
    if(method==="POST")
    res = await axios.post(url,payload, config);
    if(method==="PUT")
    res = await axios.put(url,payload, config);
    const data=res.data
    console.log('useFetch==>',res)
    seterror(data.error);
    setdata(data);
    setloading(false);
    }catch(error){
     console.log('useFetch Error==>',error)
     seterror(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return { data, loading, error };
};
export default useFetch;
