//node server handle all the connection

const express = require('express')
const path = require('path')
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const httpServer = require('http').createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://locahost:8080", "http:/localhost:5500"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: false
  }
});

const users = {};//blank object
app.use(morgan('dev'))
app.use(cors());
app.use(express.static(path.join(__dirname,"./../")))
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin",":")
  res.header("Access-Control-Allow-Methods","GET,PUT,DELETE,POST")
  res.header("Access-Control-Allow-Headers","Content-Type")
  next()

})

app.get('/',(req,res)=>{
  res.header("Access-Control-Allow-Origin",":")
  res.header("Access-Control-Allow-Methods","GET,PUT,DELETE,POST")
  res.header("Access-Control-Allow-Headers","Content-Type")
  res.sendFile(path.join(__dirname,'./../','index.html'))

})
// io.on is a event, parameter function name may be differ we can write anything instead of soket

io.on('connection', sokcet=>{

    socket.on("userJoined",name =>{
        console.log(name);
        //this is coustom event we can write any name...
         users[socket.id] = name;
         socket.broadcast.emit("User-joined",name);//it will send the notification qll users except who joined..

    })

    socket.on("send" ,message=>{
        sokcet.broadcast.emit("received",{message :message,name : users[sokcet.id]});

    })

})

app.listen(80,()=>{
  console.log("server is on hai beta");
})
httpServer.listen(8080);