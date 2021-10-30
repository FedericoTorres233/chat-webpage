// conenction
let socket = io();

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');


let enter = document.getElementById("username")
    enter.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === "Enter") {
            socket.emit('chat:username-entered', username.value);
            document.getElementById('modal-login').classList.add("d-none");
        }
});

btn.addEventListener('click', function() {
  socket.emit('chat:message', {
    message: message.value,
    username: username.value
  });
});

message.addEventListener('keypress', function () {
  socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function(data) {
  actions.innerHTML = '';
  output.innerHTML += `<p>
    <strong id="username_chat">${data.username}</strong>: <i id="chat_content">${data.message}</i>
  </p>`
});

socket.on('chat:typing', function(data) {
  actions.innerHTML =  `<p><em>${data} is typing a message...</em></p>`
});

socket.on('chat:username-entered', function(data){
    output.innerHTML += `<p>
    <i id="some1_has_logged_in">${data} has entered</i>
  </p>`
})