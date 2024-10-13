const express = require('express');
const app = express();
const path = require('path');
const handlebars = require("express-handlebars");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require('cors');

const customHandlebars = handlebars.create({ layoutsDir: path.join(__dirname, 'views') });
const port = process.env.PORT || 3000;
const socketsStatus = {};

app.engine("handlebars", customHandlebars.engine);
app.set("view engine", "handlebars");

app.use(cors({
    origin: /https?:\/\/.*/
}))
app.set('views', path.join(__dirname, 'views'));
app.use("/files", express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/check" , (req , res)=>{
    res.json({ v_port: port, v_url: process.env.VERCEL_URL });
});
app.get("/home" , (req , res)=>{
    return res.render("index", { layout: false, v_port: port, v_url: process.env.VERCEL_URL });
});

io.on("connection", function (socket) {
    const socketId = socket.id;
    socketsStatus[socket.id] = {};

    console.log("connect");

    socket.on("voice", function (data) {

      var newData = data.split(";");
      newData[0] = "data:audio/ogg;";
      newData = newData[0] + newData[1];

      for (const id in socketsStatus) {

        if (id != socketId && !socketsStatus[id].mute && socketsStatus[id].online)
          socket.broadcast.to(id).emit("send", newData);
      }

    });

    socket.on("userInformation", function (data) {
      socketsStatus[socketId] = data;

      io.sockets.emit("usersUpdate",socketsStatus);
    });

    socket.on("disconnect", function () {
      delete socketsStatus[socketId];
    });
});

http.listen(port, () => console.log(`Server ready on port ${port}`));

module.exports = app;
