# 把 Videojs 添加到 React 项目

这集来把《 Videojs 添加到 React 项目》里。

### 跑一个 gatsby 的 Hello World

这里咱们用 [gatsby](https://github.com/gatsbyjs) 做 React 运行环境，不过除了启动命令，其实用不到太多 gatsby 的任何知识。先来跑一个 gatsby 的 Hello World 。

```
mkdir happy-videojs
cd happy-videojs
npm init -y
npm i gatsby
```

咱们这个项目就叫 happy-videojs 了，进入项目文件夹，生成一个 package.json 文件，安装 gatsby  ，这样包版本信息会保存到 package.json 中。

来添加一个首页。

index.js

```js
import React from 'react'

export default () => {
  return (
    <div>
      Hello
    </div>
  )
}
```

这个是 gatsby 的格式要求了，要放到 src/pages/index.js 中，写一个纯粹的 React 组件即可。

```
gatsby develop
```

到浏览器中，访问 localhost:8080, 看到 Hello ，表示一切都跑起来了。

### 安装 video.js

下一步来安装 videjs 的 npm 包

```
npm i video.js
```

注意包名 video 点 js ，不要安装成没点的那个包。

下面参考 React 项目中集成 videojs 的[官方文档](http://docs.videojs.com/tutorial-React.html) ，把 video.js 运行起来。

先添加需要的 html 标签。

index.js

```js
import React from 'react'
import Player from '../components/VjsPlayer'

export default () => {
  return (
    <div>
      <Player />
    </div>
  )
}
```

VjsPlayer.js

```js
  render () {
    return (
      <div data-vjs-player>
        <video ref={node => (this.videoNode = node)} className='video-js' />
      </div>
    )
  }
```

到 pages/index.js 中，从 components/VjsPlayer 组件中导入 Player ，下面把 Hello 去掉，显示 Player 。

创建 src/components/VjsPlayer.js 文件，导入 React 和 Component ，导出一个类组件叫做 VjsPlayer ，里面的 render 函数中返回的是两个元素，一个 div 带一个属性叫做 `data-vjs-player`，里面包裹一个 video 标签，class 名叫做 video-js 。这些都是 videojs 能够成功运行的前提，所以不能拼错。

下面来实例化一个播放器。

VjsPlayer.js

```js
import React, { Component } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default class VjsPlayer extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode)
  }

  componentWillUnmount() {
    if(this.player) {
      this.player.dispose()
    }
  }

  render () {
    return (
      <div data-vjs-player>
        <video ref={node => (this.videoNode = node)} className='video-js' />
      </div>
    )
  }
}
```


导入 videojs ，以及它的 css 文件。为了拿到 video 标签的 dom 节点，添加一个 ref ，赋值到 this.videoNode 。组件内添加 componentDidMount ，调用 videojs 接口，里面传入 this.videoNode ，这样就可以得到一个 player 实例了，保存到 this.player 中，方便在 class 内全局都可以访问到。组件即将从页面上卸载的时候，执行 this.player.dispose ，做一下垃圾清理。

到浏览器中，可以看到一个空屏幕。

下面，可以通过传递选项来对播放器做添加视频源等配置。

VjsPlayer.js

```js
import React, { Component } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { options } from '../constants/VjsConfig'

export default class VjsPlayer extends Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, options)
  }

  componentWillUnmount() {
```

VjsConfig.js

```js
export const options = {
  controls: true,
  sources: [
    {
      src: 'http://vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }
  ]
}
```

还是回到 VjsPlayer.js 中，把 options 写到专门的一个常量文件中。然后再把 options 作为第二个参数，传递给 videojs 接口。

再来创建 constants/VjsConfig.js 文件。导出 options 对象，例如 controls 设置为 true 让播放器显示各种控制按钮，下面通过 sources 一项，传递视频源。多年前我会传递三种格式，除了 mp4 之外，还会为 firefox 这些开源浏览器传递 ogg 和 webm 格式，到今天感觉没必要了 mp4 就可以支持所有平台了，几乎所有。

浏览器中看一下，播放器能正常工作了，欧耶。
