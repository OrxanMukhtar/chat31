let nickname = '';

function joinChat() {
    const nicknameInput = document.getElementById('nickname').value.trim();

    if (nicknameInput) {
        nickname = nicknameInput;
        document.querySelector('.auth-container').style.display = 'none';
        document.querySelector('.chat-container').style.display = 'block';
        initWebSocket();
    } else {
        alert('Please enter a nickname.');
    }
}

function initWebSocket() {
    const socket = new WebSocket('ws://localhost:3000');

    socket.addEventListener('open', function() {
        console.log('Connected to the chat server');
    });

    socket.addEventListener('message', function(event) {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message received';
        const data = JSON.parse(event.data);
        messageElement.textContent = `${data.nickname}: ${data.text}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    window.sendMessage = function() {
        const input = document.getElementById('message-input');
        const text = input.value.trim();
        if (text) {
            socket.send(JSON.stringify({ nickname, text }));
            input.value = '';

            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            messageElement.textContent = `${nickname}: ${text}`;
            document.getElementById('chat-messages').appendChild(messageElement);
            document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
        }
    }
}
