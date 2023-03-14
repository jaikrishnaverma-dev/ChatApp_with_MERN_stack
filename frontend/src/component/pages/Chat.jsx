import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Chat = () => {
const [state,setState]=useState({
    chats:[]
})

const fetchChats= async ()=>{
const { data }=await axios.get('/api/chat');
setState({...state,chats:data})
}
useEffect(()=>{
    fetchChats()
},[])
console.log(state)
  return (
<>
{
    state.chats.map(x=><p>{x.chatName}</p>)
}
</>
  )
}

export default Chat