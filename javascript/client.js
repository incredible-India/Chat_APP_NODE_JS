// const io = require("socket.io-client");
// const io = require("socket.io-client");


const socket =  io("http://localhost:8000")
// const socket = io('http://127.0.0.1:8080');

// socket.emit("")
socket.emit("userJoined","himanhi")



socket.emit('userJoined','Username'); 
