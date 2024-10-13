const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('Express on Vercel');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app; 

// const express = require("express");
// const app = express();
// const handlebars = require("express-handlebars");
// const http = require("http").Server(app);
// const io = require("socket.io")(http);

// //To holding users information
// const socketsStatus = {};

// //config and set handlebars to express
// const customHandlebars = handlebars.create({ layoutsDir: "./views" });
// const port = process.env.PORT || 3000;

// app.engine("handlebars", customHandlebars.engine);
// app.set("view engine", "handlebars");

// //enable user access to public folder
// app.use("/files", express.static("public"));

// app.get("/", (req, res) => res.send("Express on Vercel"));

// app.get("/home" , (req , res)=>{
//     res.render("index", { port });
// });

// io.on("connection", function (socket) {
//     const socketId = socket.id;
//     socketsStatus[socket.id] = {};

//     console.log("connect");

//     socket.on("voice", function (data) {

//       var newData = data.split(";");
//       newData[0] = "data:audio/ogg;";
//       newData = newData[0] + newData[1];

//       for (const id in socketsStatus) {

//         if (id != socketId && !socketsStatus[id].mute && socketsStatus[id].online)
//           socket.broadcast.to(id).emit("send", newData);
//       }

//     });

//     socket.on("userInformation", function (data) {
//       socketsStatus[socketId] = data;

//       io.sockets.emit("usersUpdate",socketsStatus);
//     });

//     socket.on("disconnect", function () {
//       delete socketsStatus[socketId];
//     });

//   });

// http.listen(port, () => {
//   console.log(`server is run on port ${port}`);
// });

// module.exports = app;
