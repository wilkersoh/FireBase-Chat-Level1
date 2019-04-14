// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm =document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = newChatForm.message.value.trim();
    chatroom.addChat(message) 
      .then(() => newChatForm.reset())
      .catch(err => console.log(err));

})

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim();
    // chat.js的updateName
    chatroom.updateName(newName);
    // reset the form after submitted
    newNameForm.reset();

    // show then hide the update message of the update name
    updateMssg.innerText = `Your name was updated to ${newName}`
    setTimeout(() => updateMssg.innerText = '', 3000)
})

// update the chat room
rooms.addEventListener('click', e => {
    console.log(e);
    if(e.target.tagName.toLowerCase() === 'button'){
        chatUI.clear();
        // 清理后 去找被点击的id
        chatroom.updateRoom(e.target.getAttribute('id'))
        // 再去拿cb 的 data 然后 通过UI把 data output出去
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

// check local storage for a name
const username = localStorage.username ? localStorage.username : 'anon'

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats and render it
chatroom.getChats((data) => {

    chatUI.render(data);
}); 