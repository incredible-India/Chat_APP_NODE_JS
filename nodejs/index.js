//node server handle all the connection



const io = require("socket.io")(8080)

const users = {};//blank object


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

