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





// Авторизация


const authPage =
document.getElementById("authPage");


const appPage =
document.getElementById("appPage");


const username =
document.getElementById("username");


const email =
document.getElementById("email");


const password =
document.getElementById("password");


const registerBtn =
document.getElementById("registerBtn");


const loginBtn =
document.getElementById("loginBtn");


const authError =
document.getElementById("authError");







// приложение


const users =
document.getElementById("users");


const messages =
document.getElementById("messages");


const messageText =
document.getElementById("messageText");


const sendBtn =
document.getElementById("sendBtn");


const chatTop =
document.getElementById("chatTop");



const profileName =
document.getElementById("profileName");


const profileBio =
document.getElementById("profileBio");





// профиль


const profilePage =
document.getElementById("profilePage");


const openProfile =
document.getElementById("openProfile");


const backBtn =
document.getElementById("backBtn");


const logoutBtn =
document.getElementById("logoutBtn");


const editName =
document.getElementById("editName");


const editBio =
document.getElementById("editBio");


const saveProfileBtn =
document.getElementById("saveProfileBtn");





let selectedUser = null;








// регистрация


registerBtn.onclick = async()=>{


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

bio:"",

avatar:""

}

);



}

catch(e){

authError.innerHTML=e.message;

}


};









// вход


loginBtn.onclick = async()=>{


try{


await signInWithEmailAndPassword(

auth,

email.value,

password.value

);



}

catch(e){

authError.innerHTML=e.message;

}


};









// проверка входа


onAuthStateChanged(auth,async(user)=>{


if(user){


authPage.style.display="none";

appPage.style.display="flex";



loadProfile();


loadUsers();



}

else{


authPage.style.display="block";

appPage.style.display="none";


}


});









// профиль


async function loadProfile(){


const data =
await getDoc(

doc(
db,
"users",
auth.currentUser.uid
)

);



if(data.exists()){


let p=data.data();



profileName.innerHTML =
p.username;


profileBio.innerHTML =
p.bio || "Описание";



editName.value =
p.username;


editBio.value =
p.bio || "";


}



}









// открыть профиль


openProfile.onclick=()=>{


profilePage.style.display="block";


};






backBtn.onclick=()=>{


profilePage.style.display="none";


};







// сохранить профиль


saveProfileBtn.onclick=async()=>{


await setDoc(

doc(
db,
"users",
auth.currentUser.uid
),

{


username:editName.value,


bio:editBio.value


},

{merge:true}


);



loadProfile();


};









// выход


logoutBtn.onclick=()=>{


signOut(auth);


};









// пользователи


async function loadUsers(){


users.innerHTML="";



const list =
await getDocs(
collection(db,"users")
);



list.forEach((item)=>{


if(item.id !== auth.currentUser.uid){



let data=item.data();



let div=document.createElement("div");


div.className="user";


div.innerHTML=data.username;



div.onclick=()=>{


selectedUser=item.id;


chatTop.innerHTML=
"Чат с "+data.username;


loadMessages();


};



users.appendChild(div);



}


});


}









// отправка


sendBtn.onclick=async()=>{


if(!selectedUser){

alert("Выберите пользователя");

return;

}



let text =
messageText.value;



if(text.trim()=="") return;



let chatId =
[
auth.currentUser.uid,
selectedUser

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



messageText.value="";


};









// сообщения


function loadMessages(){


let chatId =
[
auth.currentUser.uid,
selectedUser

]
.sort()
.join("_");



const q =
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


let data=m.data();



let div=document.createElement("div");


div.className="message";


div.innerHTML=data.text;


messages.appendChild(div);



});


});


}