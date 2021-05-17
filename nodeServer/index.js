const express = require('express');//express js
const app = express();
const http = require('http').Server(app);//http server
const path  = require('path'); // path module

const io =  require('socket.io')(http,{//socket.io for the websocket
    cors:{
        "origin":"*"//for the cors error
    }
})

// using middleware

app.use(express.static(path.join(__dirname,"./../")));

//socket.io event listener....

io.on("connection",Socket=>{
    
   
    console.log("New User Connected...");

    Socket.on('NewUserJoined',Userinfo =>{

        Socket.name = Userinfo; //this Userinfo is recived form the client Side
        console.log(Socket.name ,"is joined");

        Socket.broadcast.emit("userjoinNotification",JSON.stringify({name : Socket.name ,id : Socket.id}));// this will send the user namet to the client side..


    })

    //when client send any message 
    Socket.on('MessageCame',message=>{
        console.log(Socket.name ," Send : ", message);
        Socket.broadcast.emit('Recivedmessage',JSON.stringify({name : Socket.name, text : message}));//this will send to the client message
    })

    Socket.on('disconnect', ()=>{
            
        Socket.broadcast.emit("disconnectUser",JSON.stringify({name : Socket.name ,id : Socket.id}));
        console.log(Socket.name," left the chat");

       

        //this will send the information to the client side when he disconnect the tab 

    })



})


// code for the routing 


app.get('/',(req,res)=>{

    res.writeHead(200,{"Content-Type":"text/html"});

    res.sendFile(path.join(__dirname,"./../index.html"));


})



// listening the port 8080 

http.listen(8080,()=>{
    console.log("Server is running at the port* 8080");
})