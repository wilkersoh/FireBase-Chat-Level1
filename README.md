* udemyNinja的教学
<p>之前从它youtube里的频道学到很多知识</p>
所以支持他推出的课程

### 这是一个Chat app
### 使用一点 FireBase技术
### Class语法

-----------

### getChats(cb){} chat.js
它從dataBase裏面讀取資料然後 利用callback他資料 存在cb裏 等待調取
``` javascript
// app.js
chatroom.getChats((data) => chatUI.render(data));
```
getChats 被call了 然後 被調取的資料用在 *ui.js裏的 render資料去 渲染頁面

### async addChat(message){}
把chat資料存儲在 chats屬性裏， add 是FireBase method
``` javscript 

    const chat = {
        message,
        username: this.username,
        room: this.room,
        create_at: firebase.firestore.Timestamp.fromDate(now)
    };
 
    const response = await this.chats.add(chat)

```
這是一個 async 所以怎樣都return 一個 Promise 
把信息的資料放進這個parameter裏
``` javascript
// app.js
const message = newChatForm.message.value.trim();
chatroom.addChat(message) 
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
```


----------

### updateRoom(){}
這裏使用 capturing模式 去獲取目標,轉換時 清除對話框先
因爲 updateRoom parameter 接收的是一個 room，然後會更改 當前room

``` javascript
    //chat.js
    updateRoom(room){
        this.room = room;
        console.log('room updated')
    }
    // app.js
    if(e.target.tagName.toLowerCase() === 'button'){
        chatUI.clear();
        // 清理后 去找被点击的id
        chatroom.updateRoom(e.target.getAttribute('id'))
        // 再去拿cb 的 data 然后 通过UI把 data output出去
        chatroom.getChats(chat => chatUI.render(chat));
    }
```

* 順便再説下 getChats
``` javascript
    constructor(room, username){
        this.chats = db.collection('chats');
    }
```
在生產實例時 就連接 數據庫了
getchats是去數據庫讀取資料 return callback fn






