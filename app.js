function register(){

let name =
document.getElementById("username").value;


if(name==""){

alert("Введите имя");

return;

}


localStorage.setItem(
"user",
name
);


window.location.href="chats.html";


}



function login(){


let user =
localStorage.getItem("user");


if(user){


window.location.href="chats.html";


}else{


alert(
"Нет аккаунта"
);


}


}



function logout(){


localStorage.removeItem("user");


window.location.href="index.html";


}
function sendMessage(){

let input =
document.getElementById("messageInput");


let text = input.value;


if(text=="") return;


let messages =
document.getElementById("messages");


let div =
document.createElement("div");


div.className="message";


div.innerText=text;


messages.appendChild(div);


input.value="";


}



function openChat(){

window.location.href="chat.html";

}



function back(){

window.location.href="chats.html";

}
