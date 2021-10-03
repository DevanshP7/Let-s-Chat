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
room_name = localStorage["room_name"];

document.getElementById("room_name_display").innerHTML = room_name;

function  send() {

    msg = document.getElementById("message_input").value;
    firebase.database().ref(room_name).push({

        name:user_name,
        message:msg,
        like:0

    });
    document.getElementById("message_input").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
    
    console.log(firebase_message_id);
    console.log(message_data);

    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];

    name_with_tag = `<h4>${name}<img src='tick.png' class='user_tick'></h4>`;
    message_with_tag = `<h5 class='message-h5'>${message}</h5>`;
    like_button = `<button class='btn btn-info' id='${firebase_message_id}' value='${like}' onclick='add_like(this.id)'>`;
    span_with_tag = `<span class='glyphicon glyphicon-thumbs-up'> Likes: ${like}</span></button><hr>`;

    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;

//End code
            }  

        });

    }); 

}

getData();

function add_like(message_id) {

    console.log(`Clicked on Like Button: ${message_id}`);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({

        like: updated_likes

    });

}

function back() {

    window.location.replace("Kwitter_room.html");

}