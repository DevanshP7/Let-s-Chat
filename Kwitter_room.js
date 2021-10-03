// Your web app's Firebase configuration
var firebaseConfig = {

    apiKey: "AIzaSyBPEmjZjmbD-cEXHJRF36UGxz1UCQDlGuw",
    authDomain: "let-s-chat-web-app-fb089.firebaseapp.com",
    databaseURL: "https://let-s-chat-web-app-fb089-default-rtdb.firebaseio.com",
    projectId: "let-s-chat-web-app-fb089",
    storageBucket: "let-s-chat-web-app-fb089.appspot.com",
    messagingSenderId: "525122036260",
    appId: "1:525122036260:web:a50b464442ac8828552eb1"

};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage["user_name"];
document.getElementById("user_name_display").innerHTML = `Welcome ${user_name}!`;

function add_room() {

    room_name = document.getElementById("room_name_input").value;
    
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "Kwitter_page.html";

}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
    
    Room_names = childKey;
    
    console.log(`room name : ${Room_names}`);

    row = `<div class="room_name" id=${Room_names} onclick="redirectToKwitterRoom(this.id)">${Room_names}</div><hr>`;
    document.getElementById("output").innerHTML += row;

        });

    });

}

getData();

function redirectToKwitterRoom(name) {

    console.log(name);

    localStorage.setItem("room_name", name);

    window.location = "Kwitter_page.html";

}

function logout(){

localStorage.removeItem('room_name');
localStorage.removeItem('user_name');

window.location = "index.html";

}