import { auth, db } from "./firebase.js";


import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} 
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
collection,
addDoc,
onSnapshot,
query,
orderBy
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// Элементы

const email = document.getElementById("email");
const password = document.getElementById("password");

const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

const logoutBtn = document.getElementById("logout");

const authBlock = document.getElementById("auth");
const chatBlock = document.getElementById("chat");

const error = document.getElementById("error");

const sendBtn = document.getElementById("send");
const messageInput = document.getElementById("messageInput");

const messages = document.getElementById("messages");



// Регистрация

registerBtn.onclick = async () => {

try {

await createUserWithEmailAndPassword(
auth,
email.value,
password.value
);

error.innerHTML = "Аккаунт создан";

}

catch(e){

error.innerHTML = e.message;

}

};




// Вход

loginBtn.onclick = async () => {

try {

await signInWithEmailAndPassword(
auth,
email.value,
password.value
);


}

catch(e){

error.innerHTML = e.message;

}

};




// Выход

logoutBtn.onclick = () => {

signOut(auth);

};




// Проверка пользователя

onAuthStateChanged(auth,(user)=>{


if(user){

authBlock.style.display="none";

chatBlock.style.display="flex";


loadMessages();


}

else{


authBlock.style.display="block";

chatBlock.style.display="none";


}


});




// Отправка сообщений

sendBtn.onclick = async()=>{


let text = messageInput.value;


if(text.trim()=="") return;


await addDoc(collection(db,"messages"),{

text:text,

uid:auth.currentUser.uid,

time:Date.now()

});


messageInput.value="";


};





// Загрузка сообщений

function loadMessages(){


const q=query(
collection(db,"messages"),
orderBy("time")
);



onSnapshot(q,(snapshot)=>{


messages.innerHTML="";


snapshot.forEach((doc)=>{


let data=doc.data();


let div=document.createElement("div");


div.className="message";


div.innerHTML=data.text;


messages.appendChild(div);


});


});


}