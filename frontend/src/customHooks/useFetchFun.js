import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
const useFetchFun = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const useFetch = async (url,token,method="GET",payload={}) => {
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
    console.log('useFetch er==>',res)
    seterror(data.error);
    setdata(data);
    enqueueSnackbar("Successfully Completed.",{variant:'success'})    
    setloading(false);
    }catch(error){
     console.log('useFetch Error==>',error)
     enqueueSnackbar(error.response.data.message,{variant:'error'})    
     seterror(error);
    }
  };
 
  return {apiCaller:useFetch,data, loading, error };
};
export default useFetchFun;
