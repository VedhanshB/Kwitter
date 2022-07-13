
//ADD YOUR FIREBASE LINKS

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBsqO0GBQ-dUde0wHWUN9T4fJWgTycVq74",
  authDomain: "kwitter-aec8a.firebaseapp.com",
  databaseURL: "https://kwitter-aec8a-default-rtdb.firebaseio.com",
  projectId: "kwitter-aec8a",
  storageBucket: "kwitter-aec8a.appspot.com",
  messagingSenderId: "324419053018",
  appId: "1:324419053018:web:eac5e28173918f973fcce3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";
 

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room_name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#" +Room_names+ "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";


  getData();
}

function redirectToRoomName(name) {
  console.log(name)
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
