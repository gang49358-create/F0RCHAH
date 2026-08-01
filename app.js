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


alert(
"Аккаунт создан: "+name
);


}


function login(){


let user =
localStorage.getItem("user");


if(user){

alert(
"Добро пожаловать "+user
);


}else{


alert(
"Сначала зарегистрируйтесь"
);


}


}