const express=require("express");//imported express module
const dotenv=require("dotenv");
const chats = require("./data/data");
const connectDB = require("./config/db");
const colors=require("colors")

const app = express() // creating instance of express variable
dotenv.config()
connectDB()

app.get('/',(req,res)=>{
    res.send("API IS RUNNING SUCCESSFULLY...");
})
app.get('/api/chat',(req,res)=>{
    res.send(chats);
})
app.get('/api/chat/:id',(req,res)=>{
    const singleChat= chats.find(c=>c._id==req.params.id)
   res.send(singleChat)
})
const PORT =process.env.PORT || 5000
app.listen(5000,console.log(`Server started on port ${PORT}`.yellow.bold)) // start on given server
// now type in console => node  backend/server.js 

