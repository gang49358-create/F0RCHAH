import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// РЕГИСТРАЦИЯ FIREBASE

window.register = async function(){


let name =
document.getElementById("name").value;


let username =
document.getElementById("username").value;


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



if(!name || !username || !email || !password){

alert("Заполни все поля");

return;

}



if(!username.startsWith("@")){

username="@"+username;

}



try{


let userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);



let user =
userCredential.user;



await setDoc(
doc(db,"users",user.uid),
{

name:name,

username:username,

email:email,

status:"online"

}

);



alert("Аккаунт создан");


window.location.href="chats.html";


}

catch(error){

alert(error.message);

}


};





// ВХОД FIREBASE


window.login = async function(){


let email =
document.getElementById("email").value;


let password =
document.getElementById("password").value;



try{


await signInWithEmailAndPassword(
auth,
email,
password
);



window.location.href="chats.html";


}


catch(error){


alert(error.message);


}


};





// ВЫХОД


window.logout=function(){

auth.signOut();

window.location.href="index.html";

};





// ПЕРЕХОДЫ


window.openChat=function(){

window.location.href="chat.html";

}


window.openProfile=function(){

window.location.href="profile.html";

}


window.openChats=function(){

window.location.href="chats.html";

}


window.openContacts=function(){

window.location.href="contacts.html";

}


window.openSettings=function(){

window.location.href="settings.html";

}