function register(){

let name = document.getElementById("username").value;

if(name === ""){
alert("Введите имя");
return;
}

localStorage.setItem("user", name);

window.location.href = "chats.html";

}



function login(){

let user = localStorage.getItem("user");


if(user){

localStorage.setItem(
"status",
"online"
);


window.location.href="chats.html";


}else{

alert("Сначала зарегистрируйтесь");

}

}



function logout(){

localStorage.setItem(
"status",
"offline"
);


localStorage.removeItem("user");


window.location.href="index.html";

}



function openChat(){

window.location.href = "chat.html";

}



function back(){

window.location.href = "chats.html";

}



function sendMessage(){

let input = document.getElementById("messageInput");

let text = input.value;


if(text === ""){
return;
}


let messages = document.getElementById("messages");


let message = document.createElement("div");


message.className = "message";


message.innerText = text;


messages.appendChild(message);


input.value = "";

}
function sendMessage(){

let input = document.getElementById("messageInput");

let text = input.value;


if(text.trim() === ""){
return;
}


let messages = document.getElementById("messages");


let message = document.createElement("div");


message.className = "message";


message.innerText = text;


messages.appendChild(message);


input.value = "";


}



function back(){

window.location.href="chats.html";

}