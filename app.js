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