document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('messageForm');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message');
    const messagesContainer = document.getElementById('messagesContainer');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const message = messageInput.value.trim();
        if (username === '' || message === '') return;
        
        const messageData = {
            username,
            message,
            id: Date.now()
        };

        addMessageToDOM(messageData);
        saveMessageToLocalStorage(messageData);

        usernameInput.value = '';
        messageInput.value = '';
        alert('تم إرسال الرسالة بنجاح!');
    });

    if (messagesContainer) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.forEach(message => addMessageToDOM(message));
    }

    messagesContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const messageId = e.target.parentElement.getAttribute('data-id');
            deleteMessageFromDOM(messageId);
            deleteMessageFromLocalStorage(messageId);
        }
    });

    function addMessageToDOM(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.setAttribute('data-id', message.id);
        messageDiv.innerHTML = `
            <span><strong>${message.username}:</strong> ${message.message}</span>
            <button>حذف</button>
        `;
        messagesContainer.appendChild(messageDiv);
    }

    function saveMessageToLocalStorage(message) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function deleteMessageFromDOM(messageId) {
        const messageDiv = document.querySelector(`.message[data-id='${messageId}']`);
        if (messageDiv) messagesContainer.removeChild(messageDiv);
    }

    function deleteMessageFromLocalStorage(messageId) {
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages = messages.filter(message => message.id != messageId);
        localStorage.setItem('messages', JSON.stringify(messages));
    }
});
