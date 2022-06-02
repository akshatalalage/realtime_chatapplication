const socket = io()
let name2;
let textarea= document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do{
    name2 = prompt('Please enter your name: ')
} while(!name2)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Shift') {
        sendMessage(e.target.value)
    }
})
function sendMessage(message){
    let msg = {
        user: name2,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing')

    textarea.value =''

    socket.emit('message', msg)

}

function appendMessage(msg, type){
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


socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
})