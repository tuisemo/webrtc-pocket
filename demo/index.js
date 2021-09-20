import WebRTC from '../src/main'
function init() {
  const videoEle = document.getElementById('video')
  const ins = new WebRTC({
    video: videoEle
  })
  const EVENT_MAP = {
    capture: (e) => {
      ins.capture()
    },
    mirror: (e) => {
      ins.mirrorMode()
    },
    'save-pic': (e) => {}
  }
  // 事件捕获
  document.addEventListener('click', function (e) {
    console.log(
      '🚀 ~ file: index.js ~ line 8 ~ document.addEventListener ~ e',
      e
    )
    const {
      dataset: { event = '' }
    } = e.target
    const fn = EVENT_MAP[event]
    fn && fn.apply(this, e)
  })
}
init()
