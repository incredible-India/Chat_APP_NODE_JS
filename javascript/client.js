if('WebSocket' in window)
{
    const  ws = io('http://localhost:8080');

    const UserName =  prompt('Enter Your Name...');


    ws.emit("NewUserJoined",UserName); //this will send the the username to the server

    //on recieving the the new user joined mesage
    ws.on("userjoinNotification",Notification=>{
        //this notification came from the server side
        console.log("New User",Notification,"joined");
    })


    //if user left the chat
    ws.on("disconnectUser",nameUser=>{
        console.log(nameUser,"left the chat");
    })


    ws.on('disconnect',()=>{
        console.log("Server Connection lost");
    })
}