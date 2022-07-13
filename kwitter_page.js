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
room_name = localStorage.getItem("room_name");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code

                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        n_with_tag = "'<h4> " + name + " <img class='user_tick' src='tick.png'></h4>'";
                        m_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_btn = "<button class='btn btn-warning' id" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        spanwt = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                        row = n_with_tag + m_with_tag + like_btn + spanwt;
                        document.getElementById("output").innerHTML += row;

                        //End code
                  }
            });
      });
}
getData();

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });

      document.getElementById("msg").value = "";
}

function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      console.log(likes);
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}