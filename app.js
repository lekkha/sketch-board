//access
const express = require("express"); 
const socket = require("socket.io"); 

const app = express(); //initilize and server ready

app.use(express.static("public")); 

let port = process.env.PORT || 5000; 
let server = app.listen(port, () => {
    console.log("Listening to port" + port);
})

let io = socket(server)

io.on("connection", (socket) => {
    console.log("Made socket connection");

    //if an event -> beginpath comes - trigger callback data
    //recieved data 
    socket.on("beginPath", (data) => {
        //data from frontend 
        //now transfer data to all connected computers 
        io.sockets.emit("beginPath", data); 
    })

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})