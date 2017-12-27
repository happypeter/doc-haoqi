# 添加响应式和播放速度控制

这集要加响应式，播放速度控制还有 Player 组件接口，这几个功能都是通过调整[播放器选项](https://docs.videojs.com/docs/guides/options.html)来实现的。

### 添加响应式

添加响应式相关功能。


VjsConfig.js

```js
  fluid: true,
```

到 VjsConfig 文件中，添加 fluid 也就流体一项为 true 。播放器就会像水装满茶壶一样占满父元素的宽度了。

浏览器中，看到不管如何拖拽，视频都可以适应容器宽度。

### 控制播放速度

接下来实现播放速度的控制。

VjsConfig.js

```js
  playbackRates: [0.75, 1, 1.5, 2],
```

通过 playbackrates 选项添加了几个不同的倍速进来。

浏览器中，刷新，看到右侧的 1X ，点几下，可以看到倍速会不断切换。

### 调整 Player 组件接口

最后调整一下 Player 组件接口。

index.js

```js
      <Player src="http://vjs.zencdn.net/v/oceans.mp4" />
```

VjsPlayer.js

```js
import { getOptions } from '../constants/VjsConfig'
import { initSpacePause } from '../utils/spacePause'

export default class VjsPlayer extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, getOptions(this.props.src))
    initSpacePause(this.player)
  }
```

VjsConfig.js

```js
export const getOptions = src => ({
  controls: true,
  fluid: true,
  playbackRates: [0.75, 1, 1.5, 2],
  sources: [
    {
      src,
      type: 'video/mp4'
    }
  ]
}
})
```

到 index.js 中，通过 src 属性传入视频源。

到 VjsPlayer.js 中，把 options 改为一个函数叫 getOptions ，下面修改一下把 src 属性值传递给 getOptions 。

到 VjsConfig 中，options 改为 getOptions 接收 src 作为参数，箭头函数要返回的内容用小括号包裹起来。这样整个配置对象就会全部返回了，src 一项现在不是固定字符串了，赋值为传入的 src 参数。
