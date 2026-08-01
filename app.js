function register(){

let name =
document.getElementById("name").value;


let username =
document.getElementById("username").value;


if(name=="" || username==""){

alert("Заполните все поля");

return;

}


if(!username.startsWith("@")){

username = "@" + username;

}


localStorage.setItem(
"name",
name
);


localStorage.setItem(
"username",
username
);


localStorage.setItem(
"status",
"online"
);


window.location.href="chats.html";


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
window.onload=function(){

let name =
localStorage.getItem("name");


let username =
localStorage.getItem("username");


if(document.getElementById("profileName")){

document.getElementById("profileName").innerText=name;

}


if(document.getElementById("profileUsername")){

document.getElementById("profileUsername").innerText=username;

}

}
let photo =
document.getElementById("photo");


if(photo){

photo.onchange=function(){

let reader=new FileReader();


reader.onload=function(){

localStorage.setItem(
"avatar",
reader.result
);


document.getElementById("avatar").src=
reader.result;

}


reader.readAsDataURL(
photo.files[0]
);


}

}



function saveProfile(){

let bio =
document.getElementById("bioInput").value;


localStorage.setItem(
"bio",
bio
);


loadProfile();


alert("Профиль сохранён");

}




function loadProfile(){

let name =
localStorage.getItem("name");


let username =
localStorage.getItem("username");


let bio =
localStorage.getItem("bio");


let avatar =
localStorage.getItem("avatar");



if(document.getElementById("name"))
document.getElementById("name").innerText=name;


if(document.getElementById("username"))
document.getElementById("username").innerText=username;


if(document.getElementById("bio"))
document.getElementById("bio").innerText=bio || "Описание отсутствует";


if(document.getElementById("avatar") && avatar)
document.getElementById("avatar").src=avatar;

}



window.onload=loadProfile;
function openProfile(){

window.location.href="profile.html";

}