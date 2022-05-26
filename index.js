const http = require("./app-router")

// socket
const io = require('socket.io')(http)


io.on('connection', (socket) => {
    console.log("connection..")
  
    // io.sockets.adapter.on("leave-room", (room, id) => {
      // https://socket.io/docs/v3/rooms/index.html
    //   console.log(`socket ${id} has leave room ${room}`);
    // });
  
    socket.on('join', (roomId) => {
      if(io.sockets.adapter.rooms.has(roomId)){
        clients = io.sockets.adapter.rooms.get(roomId);
        const numClients = clients ? clients.size : 0;
        console.log(`numClients room ${numClients}`)
        if(numClients <= 1){
          console.log(`Joining room ${roomId} and emitting room_joined socket event`)
          socket.join(roomId)
          socket.emit('room_joined', roomId)
        }else{
          console.log(`Can't join room ${roomId}, emitting full_room socket event`)
          socket.emit('full_room', roomId)  
        }
      }else{
        console.log(`Creating room ${roomId} and emitting room_created socket event`)
        socket.join(roomId)
        socket.emit('room_created', roomId)
      }   
    })
  
    //These events are emitted to all the sockets connected to the same room except the sender.
    socket.on('start_call', (roomId) => {
      // call for client.js when room joined
      console.log(`Broadcasting start_call event to peers in room ${roomId}`)
      socket.broadcast.to(roomId).emit('start_call')
    })
    socket.on('webrtc_offer', (event) => {
      // call for client.js when start_call event
      console.log(`Broadcasting webrtc_offer event to peers in room ${event.roomId}`)
      socket.broadcast.to(event.roomId).emit('webrtc_offer', event.sdp)
    })
    socket.on('webrtc_answer', (event) => {
      // call for clinet.js
      console.log(`Broadcasting webrtc_answer event to peers in room ${event.roomId}`)
      socket.broadcast.to(event.roomId).emit('webrtc_answer', event.sdp)
    })
    socket.on('webrtc_ice_candidate', (event) => {
      // call for clinet.js
      console.log(`Broadcasting webrtc_ice_candidate event to peers in room ${event.roomId}`)
      socket.broadcast.to(event.roomId).emit('webrtc_ice_candidate', event)
    })
  })





