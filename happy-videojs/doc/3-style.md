


### 6-实现样式的自定制

以上内容都聚焦于功能。本节，对播放器的外观进行修改，创造自己的播放器皮肤文件。

官方的 [Creating a Skin](http://docs.videojs.com/tutorial-skins.html) 文档中推荐的方法是直接覆盖掉原有的默认皮肤。

#### 为播放器增加自定制的 `className`

文档中的示例代码为`<video>`标签增加了一个新的 `class`。

类似的，在我们的 React 项目中，则需增加一个新的className：`vjs-hqcat`

**VideoPlayer.js**
```
<video
  ref={node => this.videoNode = node}
  className='video-js vjs-hqcat'
/>
```

#### 新建自定制的皮肤样式文件

我们将其命名为 `videojs-hqcat.css`，放到 `src/lib/VideoPlayer` 目录下。

#### 创建自己的皮肤

现在，利用浏览器的开发工具，找到自己想修改的部分的选择器，就可以进行相应的修改了！

**居中播放键**

例如，在默认皮肤里，视频加载完成后，大播放键的位置是画面的左上角，看起来很别扭。

通过 Chrome Dev tool，发现播放键的类名是 `vjs-big-play-butto`。据此，有如下代码：

**src/lib/VideoPlayer/videojs-hqcat.css**
```
/*居中按钮*/
.vjs-hqcat .vjs-big-play-button {
  height: 1.5em;
  width: 3em;
  left: 50%;
  top: 50%;
  margin-left: -1.5em;
  margin-top: -0.75em;
  border-color: rgb(0, 188, 212);
}
```

成功居中了播放键，顺便改了个好看的颜色。

**修改 controlBar 颜色**

同理，给播放器的控制栏也换个好看的颜色

**src/lib/VideoPlayer/videojs-hqcat.css**
```
/*颜色*/
.vjs-hqcat.video-js {
  color: rgb(0, 188, 212);
}

.vjs-hqcat:hover .vjs-big-play-button,
.vjs-hqcat .vjs-big-play-button:focus {
  border-color: rgb(0, 188, 212);
}

.vjs-hqcat .vjs-volume-level,
.vjs-hqcat .vjs-play-progress,
.vjs-hqcat .vjs-slider-bar {
  background:rgb(0, 188, 212);
}

```

这下颜色顺眼多了！

还有些小问题，比如控制栏的字体大小，以及倍速选择栏的样式等。同理，找到相应的class名，在新皮肤文件中添加代码如下：

**src/lib/VideoPlayer/videojs-hqcat.css**
```
/*控制栏字体*/
.vjs-hqcat .vjs-control-bar {
  font-size: small;
}

.vjs-hqcat .vjs-menu-item {
  font-size: small;
}

.vjs-hqcat li.vjs-selected {
  background-color:rgb(0, 188, 212);
}

.vjs-hqcat .vjs-playback-rate-value {
  font-size: small;
  line-height: 3em;
}

/*完善倍速选择器样式*/
.vjs-menu li.vjs-selected,
.vjs-menu li.vjs-selected:focus,
.vjs-menu li.vjs-selected:hover {
  background-color: #2B333F;
  color: rgb(0, 188, 212); }

```

创建自定制皮肤文件成功！


### 7-总结

在这个案例中，我们在 React 项目里引入 video.js，实现了自定制的 HTML5 视频播放器。

我们在播放器默认设置的基础之上，
* 通过 options 控制现有功能；
* 通过 plugins 扩展添加了自己想要的新功能；
* 通过增加新的皮肤样式文件实现了外观的自定制。


-----------------------------------------------
[讲解文字稿](https://github.com/BeijiYang/VideoJsCustomization/blob/master/IntroMarkDown/%E6%96%87%E5%AD%97%E7%A8%BF.md)

### GET STARTED

* 确保自己装了`Node`和`Grunt`
  * 全局安装Grunt `npm install -g grunt-cli`

* create-react-app 创建初始项目，删去没用的代码

* 安装`video.js`
  * `npm install --save-dev video.js`

* 引入播放器组件
  * 创建`VideoPlayer.js` ，官方建议方法二没跑通，先用方法一
  * 播放器组件和参数分离

* 按照Dan的思想，将组件拆分整理为container & component

* 把相对独立的VideoPlayer组件放到`Lib/`里

* 用options实现倍速播放，音量条竖直等等
  * 跨浏览器兼容问题：多格式视频源

* 用[这篇文档的Customize Styles部分](http://docs.videojs.com/tutorial-skins.html)进行样式的自定制
  * 为video实例增加属性
    * `<video ref={node => this.videoNode = node} className='video-js vjs-hqcat' />`
  * 增加自定制样式文件
    *  `videojs-hqcat.css`
