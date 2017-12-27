# 添加空格键暂停功能

到 youtube.com 上，点一下视频，点空格键是可以控制播放和暂停的，点一下其他区域，空格键变成其他功能了。这集咱们把这个添加到项目中。

VjsPlayer.js

```js
import { options } from '../constants/VjsConfig'
import { initSpacePause } from '../utils/spacePause'

export default class VjsPlayer extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, options)
    initSpacePause(this.player)
  }
```

spacePause.js

```js
export const initSpacePause = player => {
  const playerEl = player.el()
  player.on('play', () => {
    playerEl.focus()
    playerEl.onkeydown = event => {
      if (event.code === 'Space') {
        event.preventDefault()
        if(!player.paused()) {
          player.pause()
        } else {
          player.play()
        }
      }
    }
  })
}
```


到 VjsPlayer 文件中，把空格暂停相关的功能封装在 initSpacePause 函数中，定义在另外一个文件 utils/spacePause.js 中。

创建 src/utils/spacePause.js 文件。导出 initSpacePause 函数，通过执行 player.el ，可以获得包裹 video 标签那个 div 对应的元素。那这个 player 元素到手之后干嘛呢？开始播放的时候，把焦点设置到 player 元素上，这样这个元素上就可以接收 keydown ，也就是”按键按下“事件了。参数中拿到事件对象 event ，判断如果 event.code 是 Space ，也就是被按下的是空格键。那首先 preventDefault() 阻止一下默认行为。通过 player.paused() 接口可以判断是否正在播放，如果正在播放，就用 pause 接口暂停，如果当前处于暂停，就用 play 接口让播放器开始播放。

回到 VjsPlayer.js 文件， player 初始化以后执行一下 initSpacePause 把 player 作为参数传递进入。

到浏览器中，点播放按钮，这样焦点会设置到 player 元素上，点空格可以暂停或者继续播放。鼠标点一下播放器之外其他地方，player 元素失去焦点，space 键就不再控制视频的暂停和播放了，再点一下屏幕，空格键会继续生效。
