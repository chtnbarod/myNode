// DOM elements.
const roomSelectionContainer = document.getElementById('room-selection-container')
const roomInput = document.getElementById('room-input')
const connectButton = document.getElementById('connect-button')

const videoChatContainer = document.getElementById('video-chat-container')
const localVideoComponent = document.getElementById('local-video')
const remoteVideoComponent = document.getElementById('remote-video')

// Variables.
const socket = io()
const mediaConstraints = {
  audio: true,
  video: { width: 1280, height: 720 },
}
let localStream
let remoteStream
let isRoomCreator
let rtcPeerConnection // Connection between the local device and the remote peer.
let roomId

// Free public STUN servers provided by Google.
const iceServers = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
  ],
}

// BUTTON LISTENER ============================================================
connectButton.addEventListener('click', () => {
  joinRoom(roomInput.value)
})

// SOCKET EVENT CALLBACKS =====================================================
socket.on('room_created', async () => {
  console.log('room created')

  await setLocalStream(mediaConstraints)
  isRoomCreator = true
})

socket.on('room_joined', async () => {
  console.log('room joined')
  // for currant user to other user
  await setLocalStream(mediaConstraints)
  socket.emit('start_call', roomId)
})

socket.on('full_room', () => {
  console.log('full room')

  alert('The room is full, please try another one')
})

// FUNCTIONS ==================================================================
function joinRoom(room) {
  // for to both user
  if (room === '') {
    alert('Please type a room ID')
  } else {
    roomId = room
    socket.emit('join', room)
    showVideoConference()
  }
}

function showVideoConference() {
  roomSelectionContainer.style = 'display: none'
  videoChatContainer.style = 'display: block'
}

async function setLocalStream(mediaConstraints) {
  let stream
  try {
    stream = await navigator.mediaDevices.getUserMedia(mediaConstraints) 
  } catch (error) {
    console.log(error)
  }

  localStream = stream
  localVideoComponent.srcObject = stream
}

// SOCKET EVENT

// SOCKET EVENT CALLBACKS =====================================================
socket.on('start_call', async () => {
  if (isRoomCreator) {
    try {
      console.log('start call isRoomCreator '.isRoomCreator)
      // call for index.js for currant user
    rtcPeerConnection = new RTCPeerConnection(iceServers)
    addLocalTracks(rtcPeerConnection)
    rtcPeerConnection.ontrack = setRemoteStream
    rtcPeerConnection.onicecandidate = sendIceCandidate 
    await createOffer(rtcPeerConnection)
    } catch (error) {
      console.log(error)
    }
  }
})

socket.on('webrtc_offer', async (event) => {
  console.log(`webrtc_answer room ${event}`)
  if (!isRoomCreator) {
     // call for index.js form other user
     try {
      rtcPeerConnection = new RTCPeerConnection(iceServers)
      addLocalTracks(rtcPeerConnection)
      rtcPeerConnection.ontrack = setRemoteStream
      rtcPeerConnection.onicecandidate = sendIceCandidate
      rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
      await createAnswer(rtcPeerConnection)
     } catch (error) {
      console.log(error)
     }
  }
})

socket.on('webrtc_answer', (event) => {
  console.log(`webrtc_answer room ${event}`)

// call for index.js for currant user
    try{
      rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(event))
    }catch (error) {
      console.log(error)
    }
})

socket.on('webrtc_ice_candidate', (event) => {
  console.log(`webrtc_ice_candidate event: ${event}`)

  // call for index.js for both user
  // ICE candidate configuration.
  try{
  var candidate = new RTCIceCandidate({
    sdpMid: event.sdpMid,
    sdpMLineIndex: event.label,
    candidate: event.candidate,
  })
    rtcPeerConnection.addIceCandidate(candidate)
  }catch (error) {
    console.log("error :: ".error)
  }
})

// FUNCTIONS ==================================================================
function addLocalTracks(rtcPeerConnection) {
  // for both user
  localStream.getTracks().forEach((track) => {
    rtcPeerConnection.addTrack(track, localStream)
  })
}

async function createOffer(rtcPeerConnection) {
  let sessionDescription
  try {
      // create offer to currant user for other user 
    sessionDescription = await rtcPeerConnection.createOffer()
    rtcPeerConnection.setLocalDescription(sessionDescription)
  } catch (error) {
    console.log("error :: ".error)
  }

  // call for index.js for other user
  socket.emit('webrtc_offer', {
    type: 'offer',
    sdp: sessionDescription,
    roomId,
  })
}

async function createAnswer(rtcPeerConnection) {
  let sessionDescription
  try {
    // create answer for other user to currant user 
    sessionDescription = await rtcPeerConnection.createAnswer()
    rtcPeerConnection.setLocalDescription(sessionDescription)
  } catch (error) {
    console.log("error :: ".error)
  }
// call for index.js
  socket.emit('webrtc_answer', {
    type: 'answer',
    sdp: sessionDescription,
    roomId,
  })
}

function setRemoteStream(event) {
  // set for other user stream for window
  try {
    remoteVideoComponent.srcObject = event.streams[0]
    remoteStream = event.stream
  } catch (error) {
    console.log("error :: ".error)
  }
  
}

function sendIceCandidate(event) {
  // call for index.js for both user sdpMid
  // console.log(`sendIceCandidate sdpMid: ${event.candidate.sdpMid}`)
  // console.log(`sendIceCandidate sdpMid2: ${JSON.stringify(event.candidate, null, 2)}`)
  if (event.candidate) {
    socket.emit('webrtc_ice_candidate', {
      roomId,
      label: event.candidate.sdpMLineIndex,
      sdpMid: event.candidate.sdpMid,
      candidate: event.candidate.candidate,
    })
  }
}

