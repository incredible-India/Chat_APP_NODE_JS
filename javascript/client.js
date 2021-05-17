


let textbox =  document.getElementsByClassName("message")[0];
// let onLine = document.getElementsByClassName("online")[0];
// let offline = document.getElementsByClassName("offline")[0];
let formMessage =  document.forms[0];
let alert = document.getElementsByClassName('alert')[0];

//alertbox initilly it will be hide...



//this function will append the data in specific html tag
function appendThings(classname,id,dataToFill)
{
   
    document.getElementsByClassName(classname)[0].innerHTML += `
      <h5 class="${id}"> ${dataToFill} </h5> 
    `
}
//this function will remove the data in specific html tag




function toRemove(cname)
{
    document.getElementsByClassName(cname)[0].remove();
}



if('WebSocket' in window)
{
    const  ws = io('http://localhost:8080');
    alert.style.display ="none";
    const UserName =  prompt('Enter Your Name...');


    ws.emit("NewUserJoined",UserName); //this will send the the username to the server

    //on recieving the the new user joined mesage
    ws.on("userjoinNotification",Notification=>{
        //this notification came from the server side this is object return username and userid
       let  UserInfo = JSON.parse(Notification);

        appendThings('online',UserInfo.id,UserInfo.name);
    })


    //if user left the chat
    ws.on("disconnectUser",nameUser=>{
        //on disconnecting the client side server will send the user information
        let UserData = JSON.parse(nameUser);
        appendThings('offline',UserData.id,UserData.name);
        toRemove(UserData.id)
    })

//when server is closed..
    ws.on('disconnect',()=>{
        alert.innerHTML = "Server Connection Has been lost"
        alert.style.display = "block";
    })

//now on seding the Message from the client side
formMessage.onsubmit = (e)=>{
    e.preventDefault();
    let textMessage = textbox.value;
  
    appendThings('mine',"sampleMessage",`You : ${textMessage}`);
    ws.emit("MessageCame",textMessage);// this will send the message to the server
    textbox.value = ""
}
//when a text message recieved from the server

ws.on('Recivedmessage',dataFromServer=>{

    let FinalData = JSON.parse(dataFromServer);//data from the server

    appendThings('other',"sammpleMessage",`${FinalData.name} : ${FinalData.text}`)

})
    
}else
{
    
    alert.innerHTML = "Your Browser Does not Support the WebSocket"
    alert.style.display = "block";
}