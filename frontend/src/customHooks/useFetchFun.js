import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
// custom hook to fetch api  
const useFetchFun = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const useFetch = async (url,notify=true,token,method="GET",payload={}) => {
    let res={}
    try{
    let config = { headers: { 
        "Content-Type": "application/json",
        Authorization: "Bearer " + token } 
    };
    if(method==="GET")
    res = await axios(url, config);
    if(method==="POST")
    res = await axios.post(url,payload, config);
    if(method==="PUT")
    res = await axios.put(url,payload, config);
    const data=res.data
    setdata(data);
    if(notify)
    enqueueSnackbar("Successfully Completed.",{variant:'success'})    
    setloading(false);
    }catch(error){
    // to check errors  console.log('useFetch Error==>',error)
     setloading(false);
     if(notify)
     enqueueSnackbar(error.response.data.message,{variant:'error'})    
    }
    return res.data
  };
 
  return {apiCaller:useFetch,data, loading };
};
export default useFetchFun;
