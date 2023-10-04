const firebaseConfig = {
      apiKey: "AIzaSyABYkn7gep6UQuvR22_t2EBc03FCjS6Gyk",
      authDomain: "kwiter-2d6cf.firebaseapp.com",
      databaseURL:"https://kwiter-2d6cf-default-rtdb.firebaseio.com",
      projectId: "kwiter-2d6cf",
      storageBucket: "kwiter-2d6cf.appspot.com",
      messagingSenderId: "854616532142",
      appId: "1:854616532142:web:00ffd56bcd971017f2793f"
    };
    firebase.initializeApp(firebaseConfig);
    
    var userName = localStorage.getItem("userName");
    var roomName = localStorage.getItem("roomName");

function getData() { firebase.database().ref("/"+roomName).on('value', 
function(snapshot)
 { document.getElementById("output").innerHTML = "";
  snapshot.forEach (function(childSnapshot) 
  { childKey  = childSnapshot.key;
       childData = childSnapshot.val();
        if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;
//Início do código
      console.log(firebaseMessageId);
      console.log(messageData);
      name = messageData["name"];
      menssage = messageData["message"];
      like = messageData["like"];
      nameWithtag = "<h4> "+ name + "<img class='user_tick' src='tick.png'> </h4>";
      messageWithtag = "<h4 class='message_h4'>" + message + "</h4>";
      likeButton = "<button class='btn btn-warning' id='"+ firebaseMessageId + "' value = "+ like + "onclick='updateLike(this.id)'>";
      spanWithtag = "<span class='glythicon glythicon-thubs-up'> like: "+ like + "</span> </button> <hr>";
      row = nameWithtag + messageWithtag + likeButton + spanWithtag;
      document.getElementById("output").innerHTML += row


//Fim do código
      } });  }); }
getData();

function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
            name:userName,
            message:msg,
            like:0
      });
      document.getElementById("msg").value = "";

}

function logOut(){
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
      window.location = "index.html";
    }

function updateLike(messageId){
      console.log("botão like presionado"+ messageId);
      buttonId = messageId;
      likes = document.getElementById(buttonId).value;
      updatedLike = Number(likes)+ 1;
      console.log(updatedLike);
      firebase.database().ref(roomName).child(messageId).update({
            like: updatedLike
      });

}