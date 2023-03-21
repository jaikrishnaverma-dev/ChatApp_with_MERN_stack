const express = require("express"); //imported express module
const dotenv = require("dotenv");
const chats = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();
const app = express(); // creating instance of express variable
app.use(express.json()); // to access json data
app.get("/", (req, res) => {
  res.send("API IS RUNNING SUCCESSFULLY...");
});
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server started on port ${PORT}`.yellow.bold)); // start on given server
// now type in console => node  backend/server.js
