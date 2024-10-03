const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')
var audio = new Audio('ding-sound-effect_2.mp3')

const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left') {
        audio.play();
    }
}

form.addEventListener(`submit`, (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const name = prompt("Enter your Name to Join")
socket.emit('new-user-joined', name);

const me = document.getElementById('me');
me.innerHTML = name
 
socket.on('user-joined', name =>{
    append(`${name} joined the Chat !`, 'left')
    append1(', '+ `${name}`)
})

socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name} left the Chat !`, 'left')
    delete1(name)
})
const nameContainer = document.querySelector('.online')
const append1 = name =>{
    const nameElement = document.createElement('div');
    nameElement.innerText = name;
    nameElement.classList.add('name');
    nameContainer.append(nameElement);
}