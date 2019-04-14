// adding new chat documents
// setting up a real0time listener to get new chats
// updating the username
// updating the room

class Chatroom {
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        // format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            create_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save the chat document 
        const response = await this.chats.add(chat)
        return response;
    }
    getChats(cb){
        // db 里面的 room == 这个room
        // 然后 它就只会显示 chatroom('x')的罢了 被过滤了
        this.unsub = this.chats
          .where('room', '==', this.room) 
          .orderBy('create_at')
        // snapshot method is firebase
          .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    // update to UI
                    cb(change.doc.data());
                }
            })
        })
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room = room;
        console.log('room updated')
        if(this.unsub){
            // 这个是 让它换 room了 就不再收到之前那个room的信息
            this.unsub();
        }
    }
}