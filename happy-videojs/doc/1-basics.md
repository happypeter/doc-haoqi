
### 1-着手开发


```
gatsby new happy-videojs
```



安装 video.js

```
npm install --save-dev video.js
```

#### 项目中引入 video.js

对于如何在 React 项目中使用 video.js ，官方文档就这一篇：[ video.js  and  ReactJS integration](http://docs.videojs.com/tutorial-React.html)

我们参考文档中的基本方法，主要思路就是利用 React 组件的生命周期函数：
* 在 `componentDidMount` 阶段实例化一个 video.js 播放器
* 在 `componentWillUnmount` 阶段将其销毁

在我们的项目中，新建文件夹 `src/lib/VideoPlayer`，在其中新建组件 `VideoPlayer.js`:

特别注意，需要加入对 css 文件的引用

**VideoPlayer.js**
```
import React from 'React'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default class VideoPlayer extends React.Component {
  componentDidMount () {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady () {
      console.log('onPlayerReady', this)
    })
  }

  // destroy player on unmount
  componentWillUnmount () {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/ video.js /pull/3856
  render () {
    return (
      <div data-vjs-player>
        <video ref={node => this.videoNode = node} className='video-js' />
      </div>
    )
  }
}

```

然后新建课程组件，它将引用 VideoPlayer 组件：


很容易发现，页面加载完成后，播放器会自动播放视频。能否禁止这个默认行为呢？

下一节我们就看如何对播放器的功能进行控制和扩展。

[commit](https://github.com/BeijiYang/VideoJsCustomization/tree/897f3ca7ccce59cb9490011e19bad0a7112088c8)


### 4-用 options 控制功能

本节，我们用 options 实现对基本功能的控制。

 video.js 中，可以通过 [options](http://docs.videojs.com/tutorial-options.html) 对播放器实例进行控制，如循环播放、静音、以及宽高样式等方面。

上面案例代码中的 `CourseVideoJsOptions` 就是一个例子。定义一个 options 对象，将其作为参数传入 VideoPlayer 组件中：

**src/components/Course.js**
```
... ...
<VideoPlayer {...this.props.videoJsOptions} />
... ...
```

案例代码中的 options 对象如下：

```
const CourseVideoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }]
}
```

其中有三个 key，对照 [options](http://docs.videojs.com/tutorial-options.html) 文档，不难知道
* autoplay 是否自动播放
* controls 是否显示控制条
* sources 规定视频源

通过 options，我们可以对功能进行控制与添加：
* playbackRates：倍速播放
* poster： 视频播放前显示的图片
* volumePanel：音量条
* fluid： 播放器自动充满容器

```
const CourseVideoJsOptions = {
  autoplay: false,
  controls: true,
  sources: [{
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }, {
    src: 'http://vjs.zencdn.net/v/oceans.webm',
    type: 'video/webm'
  }],
  poster: 'http://videojs.com/img/logo.png',
  fluid: 'true', // put the player in the VideoPlayerWrap box
  'playbackRates': [0.75, 1, 1.5, 2],
  controlBar: {
    volumePanel: {
      inline: false // 将音量控制条垂直
    }
  }
}
```

注意：这里 `sources` 对应的值是一个视频源对象数组。数组中每个 `src` 都是同一个视频，但格式各异。

这样可以解决不同浏览器之间的兼容性问题：Video.js 会检测当前浏览器所支持的视频格式，然后在数组中选择合适的视频源进行播放。

**src/components/Course.js**
```

import React, { Component } from 'React'
import VideoPlayer from '../lib/VideoPlayer/VideoPlayer'
import styled from 'styled-components'

const VideoPlayerWrap = styled.div`
  margin: 10px;
  padding: 10px;
  border: 2px solid green;
`

class Course extends Component {

  render () {
    return (
      <div className='course-container'>
        <h2>CourseDemo</h2>
        <VideoPlayerWrap>
          <VideoPlayer {...this.props.videoJsOptions} />
        </VideoPlayerWrap>
      </div>
    )
  }
}

export default Course
```

注：这里使用了 [styled-component](https://www.styled-components.com/)。

在播放器外套了一层 VideoPlayerWrap（其实就是 div ），这么做的好处在于：
* 由于 VideoPlayer options 中打开了 `fluid`，播放器可以自适应 VideoPlayerWrap 容器。如此，options 就可以专注于对功能进行控制。
* VideoPlayerWrap 的样式代码，同时也规定了播放器的样式。将样式代码集中写到展示性组件中，也符合 Dan Abramov 的思想

本节，我们用 video.js 的 options 机制，实现了播放器的倍速播放、添加 poster、样式控制等功能。

以上都是对现有功能进行控制。下一节，我们来看看如何按照我们的想法，对播放器的功能进行扩展。
