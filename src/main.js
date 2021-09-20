import 'webrtc-adapter'
class WebRTC {
  constructor({ video, constraints }) {
    this.video = video
    this.constraints = constraints || {
      video: true,
      audio: false
    }
    this.getUserMedia = navigator.mediaDevices.getUserMedia
    this.mediaRecorder = null
  }
  // 开始采集数据流
  capture() {
    this.getUserMedia(this.constraints)
      .then((stream) => {
        this.video.srcObject = stream
        console.log("🚀 ~ file: main.js ~ line 17 ~ WebRTC ~ .then ~ stream", stream)
        this.video.play()
      })
      .catch((err) => {
        console.log(`An error occured! ${err}`)
      })
    return this
  }
  // 切换前/后置摄像头
  changeFaceMode() {
    // 切换前置
    this.constraints.video.facingMode = 'user'
    // 切换后置
    this.constraints.video.facingMode = { exact: 'environment' }
    return this
  }
  /**
   * 视频镜像翻转
   * [这里采取css的镜像旋转方法去实现，并没有对数据流进行处理]
   */
  mirrorMode() {
    this.video.style.transform = 'rotateY(180deg)'
    return this
  }
  /**
   * 媒体录制初始化
   * @returns
   */
  recordInit() {
    // let buffer = [] // 定义数组
    var options = {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      mimeType: 'video/mp4'
    }
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      // 判断录制的视频 mimeType 格式浏览器是否支持
      console.error(`${options.mimeType} is not supported!`)
      return
    }
    try {
      // 防止录制异常
      // 先在上面定义全局对象mediaRecorder，以便于后面停止录制的时候可以用到
      this.mediaRecorder = new MediaRecorder(window.stream, options) // 调用录制API // window.stream在gotMediaStream中获取
    } catch (e) {
      console.error('Failed to create MediaRecorder:', e)
      return
    }
    // 录制开始监听
    this.mediaRecorder.onstart = () => {}

    // 录制过程监听
    this.mediaRecorder.ondataavailable = ()=>{}

    // 录制暂停监听
    this.mediaRecorder.onpause = () => {}
    // 录制结束监听
    this.mediaRecorder.onstop = () => {}
    // 开始录制
    this.mediaRecorder.start(10) // start方法里面传入一个时间片，每隔一个 时间片存储 一块数据
  }
}

export default WebRTC
