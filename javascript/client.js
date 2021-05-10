// const io = require("socket.io-client");
// const io = require("socket.io-client");
const socket = new io("http://localhost:8080")
// const socket = io('http://127.0.0.1:8080');





socket.emit('userJoined','Username');
