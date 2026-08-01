const chatBox =
document.getElementById("chats");



function renderChats(){


chatBox.innerHTML="";


chats.forEach(chat=>{


let div =
document.createElement("div");


div.className="chat-item";


div.innerHTML=`

<div class="avatar">
${chat.avatar}
</div>


<div>

<b>${chat.name}</b>

<br>

<small>
${chat.last}
</small>

</div>

`;



div.onclick=()=>{

openChat(chat.id);

};



chatBox.appendChild(div);



});


}



renderChats();





// отправка сообщений


document
.getElementById("send")
.onclick=function(){


let input =
document.getElementById("messageInput");



let text =
input.value.trim();



if(text){


sendMessage(text);


input.value="";


}


};





// Enter для отправки


document
.getElementById("messageInput")
.addEventListener(
"keypress",
function(e){


if(e.key==="Enter"){


document
.getElementById("send")
.click();


}


});





// Premium


document
.getElementById("premium")
.onclick=function(){


alert(
"⭐ Dark Premium активирован!"
);


};