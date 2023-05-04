
const socket = io()
let userName = "Empty";
let textarea = document.querySelector('#textarea')
let btn = document.querySelector('#sendBtn')
let messageArea = document.querySelector('.message__area')
// let textMsg = textarea.value;
socket.on('name', (msg) => {
    userName = msg
})
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})
btn.addEventListener('click', (e)=>{
    sendMessage(textarea.value)
})

function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



