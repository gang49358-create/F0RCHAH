let currentChat = null;


function openChat(id){

currentChat = chats.find(
chat => chat.id === id
);


document.getElementById("chatName").innerText =
currentChat.name;


document.getElementById("messages").innerHTML="";


loadMessages();

}



function loadMessages(){

let box =
document.getElementById("messages");


let saved =
JSON.parse(
localStorage.getItem(
"chat_"+currentChat.id
)
) || [];



saved.forEach(msg=>{


let div=document.createElement("div");


div.className =
"message " +
(msg.me ? "my-message":"");


div.innerText=msg.text;


box.appendChild(div);



});


box.scrollTop =
box.scrollHeight;


}



function sendMessage(text){


if(!currentChat)return;



let data =
JSON.parse(
localStorage.getItem(
"chat_"+currentChat.id
)
) || [];



data.push({

text:text,
me:true

});



localStorage.setItem(

"chat_"+currentChat.id,

JSON.stringify(data)

);



loadMessages();


}