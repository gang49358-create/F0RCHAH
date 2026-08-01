// РЕГИСТРАЦИЯ

function register(){

let name = document.getElementById("name").value;
let username = document.getElementById("username").value;


if(name === "" || username === ""){

alert("Заполните все поля");

return;

}


if(!username.startsWith("@")){

username = "@" + username;

}


localStorage.setItem("name", name);

localStorage.setItem("username", username);

localStorage.setItem("status","online");


window.location.href="chats.html";

}



// ВХОД

function login(){

let user = localStorage.getItem("name");


if(user){

localStorage.setItem("status","online");

window.location.href="chats.html";

}

else{

alert("Сначала зарегистрируйтесь");

}

}




// ВЫХОД

function logout(){

localStorage.setItem("status","offline");

window.location.href="index.html";

}



// ОТКРЫТЬ ЧАТ

function openChat(){

window.location.href="chat.html";

}



// НАЗАД

function back(){

window.location.href="chats.html";

}



// ОТКРЫТЬ ПРОФИЛЬ

function openProfile(){

window.location.href="profile.html";

}



// ОТПРАВКА СООБЩЕНИЯ

function sendMessage(){

let input =
document.getElementById("messageInput");


let text=input.value;


if(text==="") return;


let box =
document.getElementById("messages");


let message =
document.createElement("div");


message.className="message";

message.innerText=text;


box.appendChild(message);


input.value="";

}



// ЗАГРУЗКА ПРОФИЛЯ

function loadProfile(){


let name =
localStorage.getItem("name");


let username =
localStorage.getItem("username");


let bio =
localStorage.getItem("bio");


let avatar =
localStorage.getItem("avatar");



if(document.getElementById("name")){

document.getElementById("name").innerText=name;

}


if(document.getElementById("username")){

document.getElementById("username").innerText=username;

}


if(document.getElementById("bio")){

document.getElementById("bio").innerText =
bio || "Описание отсутствует";

}


if(document.getElementById("avatar") && avatar){

document.getElementById("avatar").src=avatar;

}


}



window.onload=loadProfile;