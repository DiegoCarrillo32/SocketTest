class Sockets {

    constructor(io){
        this.io = io;
        this.setSocketEvents();
    }
    setSocketEvents(){
        this.io.on('connection', (socket) => {
            
            socket.emit('message', {
                text: 'Welcome to the chat app',
                createdAt: new Date()
            });
            // Listening
            socket.on('sendMessage', (data) => {
              console.log(data);
              this.io.emit('newMessage', {
                text: data.text,
                nick: data.nick,
              })
            })
        })
    }


}

module.exports = Sockets;