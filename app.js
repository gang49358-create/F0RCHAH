import { auth, db } from "./firebase.js";


import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged
}
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
doc,
setDoc,
getDoc,
collection,
addDoc,
onSnapshot,
query,
orderBy
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// поля

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

const register = document.getElementById("register");
const login = document.getElementById("login");

const authBox = document.getElementById("auth");
const chat = document.getElementById("chat");

const error = document.getElementById("error");

const myName = document.getElementById("myName");

const send = document.getElementById("send");
const messageInput = document.getElementById("messageInput");

const messages = document.getElementById("messages");




// регистрация

register.onclick = async()=>{


try{


const user = await createUserWithEmailAndPassword(
auth,
email.value,
password.value
);



await setDoc(
doc(db,"users",user.user.uid),
{

username: username.value,

email: email.value

}

);



alert("Аккаунт создан");


}

catch(e){

error.innerHTML=e.message;

}


};






// вход


login.onclick = async()=>{


try{


await signInWithEmailAndPassword(
auth,
email.value,
password.value
);



}

catch(e){

error.innerHTML=e.message;

}


};






// проверка входа


onAuthStateChanged(auth, async(user)=>{


if(user){


authBox.style.display="none";

chat.style.display="block";



let profile = await getDoc(
doc(db,"users",user.uid)
);



if(profile.exists()){

myName.innerHTML =
profile.data().username;

}



loadMessages();



}

else{


authBox.style.display="block";

chat.style.display="none";


}


});







// отправка сообщений


send.onclick = async()=>{


let text =
messageInput.value;


if(text.trim()=="") return;



await addDoc(
collection(db,"messages"),
{


text:text,

user:
auth.currentUser.uid,

time:
Date.now()


});


messageInput.value="";


};






// загрузка сообщений


function loadMessages(){


const q =
query(
collection(db,"messages"),
orderBy("time")
);



onSnapshot(q,(snap)=>{


messages.innerHTML="";



snap.forEach((doc)=>{


let m=doc.data();



let div =
document.createElement("div");


div.className="message";


div.innerHTML =
m.text;



messages.appendChild(div);



});



});


}