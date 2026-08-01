import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { getAuth } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import { getFirestore } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const firebaseConfig = {

apiKey: "AIzaSyASNOjPhKOw3WWo1xew6oa09pbIkjzbqeE",

authDomain: "darkweb-8acc4.firebaseapp.com",

projectId: "darkweb-8acc4",

storageBucket: "darkweb-8acc4.firebasestorage.app",

messagingSenderId: "957568283427",

appId: "1:957568283427:web:157087de0403e69dcb5296"

};



const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);


export const db = getFirestore(app);