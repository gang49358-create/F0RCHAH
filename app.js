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
getDocs,
collection,
addDoc,
onSnapshot,
query,
orderBy
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// Элементы

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

const usersList = document.getElementById("usersList");




// РЕГИСТРАЦИЯ


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

email: email.value,

created: Date.now()

}

);



alert("Аккаунт создан");


}

catch(e){

error.innerHTML=e.message;

}


};







// ВХОД


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









// ПРОВЕРКА ПОЛЬЗОВАТЕЛЯ


onAuthStateChanged(auth, async(user)=>{


if(user){


authBox.style.display="none";

chat.style.display="block";



const profile = await getDoc(
doc(db,"users",user.uid)
);



if(profile.exists()){


myName.innerHTML =
profile.data().username;


}



loadMessages();


loadUsers();



}

else{


authBox.style.display="block";

chat.style.display="none";


}


});









// ОТПРАВКА СООБЩЕНИЙ


send.onclick = async()=>{


const text = messageInput.value;


if(text.trim()=="") return;



await addDoc(
collection(db,"messages"),
{

text:text,

user:auth.currentUser.uid,

time:Date.now()

}

);



messageInput.value="";


};









// ЗАГРУЗКА СООБЩЕНИЙ


function loadMessages(){



const q =
query(
collection(db,"messages"),
orderBy("time")
);



onSnapshot(q,(snapshot)=>{


messages.innerHTML="";



snapshot.forEach((doc)=>{


const data = doc.data();


const div =
document.createElement("div");


div.className="message";


div.innerHTML =
data.text;


messages.appendChild(div);



});


});


}









// ЗАГРУЗКА КОНТАКТОВ


async function loadUsers(){


usersList.innerHTML="";



const users =
await getDocs(
collection(db,"users")
);




users.forEach((u)=>{


if(u.id !== auth.currentUser.uid){



const data =
u.data();



const div =
document.createElement("div");


div.className="user";


div.innerHTML =
data.username;



usersList.appendChild(div);



}


});


}