// render chat templates to the DOM
//  clear the list of chats(when the room changes);

class ChatUI {
    constructor(list){
        this.list = list;
    }
    clear(){
        // 换房间后 清除 
        this.list.innerHTML = '';
    }

    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.create_at.toDate(),
            // addsuffix is xxx 'ago'
            { addSuffix: true}
        )
        const html = `
          <li class="list-group-item">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>
            
          </li>
        `;
        // 加进去 UI , list 是来之app.js getChats 是一个 chat的cb
        this.list.innerHTML += html;
    }
}
