import { auth, db } from "./firebase.js";


import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
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





// Элементы входа

const authBox = document.getElementById("auth");

const username =
document.getElementById("username");

const email =
document.getElementById("email");

const password =
document.getElementById("password");


const register =
document.getElementById("register");


const login =
document.getElementById("login");


const error =
document.getElementById("error");





// Главное окно

const main =
document.getElementById("main");


const myName =
document.getElementById("myName");


const usersList =
document.getElementById("usersList");


const messages =
document.getElementById("messages");


const messageInput =
document.getElementById("messageInput");


const send =
document.getElementById("send");


const chatHeader =
document.getElementById("chatHeader");





// Профиль

const settings =
document.getElementById("settings");


const profileWindow =
document.getElementById("profileWindow");


const newUsername =
document.getElementById("newUsername");


const saveProfile =
document.getElementById("saveProfile");


const profileEmail =
document.getElementById("profileEmail");


const logout =
document.getElementById("logout");


const closeProfile =
document.getElementById("closeProfile");





let currentUserChat = null;









// Регистрация


register.onclick = async()=>{


try{


const user =
await createUserWithEmailAndPassword(
auth,
email.value,
password.value
);



await setDoc(
doc(db,"users",user.user.uid),
{

username:username.value,

email:email.value,

created:Date.now()

}

);



alert("Аккаунт создан");


}

catch(e){

error.innerHTML=e.message;

}


};










// Вход


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









// Проверка пользователя


onAuthStateChanged(auth,async(user)=>{


if(user){


authBox.style.display="none";

main.style.display="flex";



let profile =
await getDoc(
doc(db,"users",user.uid)
);



if(profile.exists()){


myName.innerHTML =
profile.data().username;


}



loadUsers();


}

else{


authBox.style.display="block";

main.style.display="none";


}



});









// Пользователи


async function loadUsers(){


usersList.innerHTML="";


let users =
await getDocs(
collection(db,"users")
);



users.forEach((item)=>{


if(item.id !== auth.currentUser.uid){


let data =
item.data();



let div =
document.createElement("div");



div.className="user";


div.innerHTML =
data.username;



div.onclick=()=>{


currentUserChat=item.id;


chatHeader.innerHTML=
"Чат с "+data.username;


loadMessages();


};



usersList.appendChild(div);



}


});


}









// Отправка сообщения


send.onclick = async()=>{


if(!currentUserChat){

alert("Выберите пользователя");

return;

}



let text =
messageInput.value;



if(text.trim()=="") return;



let chatId =
[
auth.currentUser.uid,
currentUserChat
]
.sort()
.join("_");




await addDoc(

collection(
db,
"chats",
chatId,
"messages"
),

{

text:text,

from:auth.currentUser.uid,

time:Date.now()

}

);



messageInput.value="";


};









// Загрузка сообщений


function loadMessages(){


let chatId =
[
auth.currentUser.uid,
currentUserChat
]
.sort()
.join("_");



let q =
query(

collection(
db,
"chats",
chatId,
"messages"
),

orderBy("time")

);



onSnapshot(q,(snap)=>{


messages.innerHTML="";



snap.forEach((m)=>{


let data =
m.data();



let div =
document.createElement("div");


div.className="message";


div.innerHTML =
data.text;



messages.appendChild(div);



});


});


}










// Настройки


settings.onclick=async()=>{


profileWindow.style.display="block";



let data =
await getDoc(
doc(db,"users",auth.currentUser.uid)
);



if(data.exists()){


newUsername.value=
data.data().username;


profileEmail.innerHTML=
data.data().email;


}



};







saveProfile.onclick=async()=>{


await setDoc(

doc(
db,
"users",
auth.currentUser.uid
),

{

username:newUsername.value,

email:auth.currentUser.email

},

{merge:true}

);



myName.innerHTML=
newUsername.value;


alert("Сохранено");


};






closeProfile.onclick=()=>{


profileWindow.style.display="none";


};







logout.onclick=()=>{


signOut(auth);


};