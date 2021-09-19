class WebRTC {
  constructor() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false
      })
      .then((stream) => {
        video.srcObject = stream
        video.play()
      })
      .catch((err) => {
        console.log(`An error occured! ${err}`)
      })
  }
}

export default WebRTC
