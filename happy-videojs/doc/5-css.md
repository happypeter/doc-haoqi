# 自定制 css

关于如何定制自己的播放器皮肤，官方的 [Creating a Skin](http://docs.videojs.com/tutorial-skins.html) 文档中推荐的方法是直接覆盖原有的 css。

到浏览器中，找到自己需要覆盖的元素的选择符，修改一下进度条的颜色。

VjsPlayer.js

```js
        <video ref={node => (this.videoNode = node)} className='video-js vjs-hq' />
```

vjs-hq.css

```css
  .video-js.vjs-hq .vjs-play-progress:before {
    color: #00bcd4;
  }

  .video-js.vjs-hq .vjs-play-progress {
    background-color: #00bcd4;
  }
```

到 VjsPlayer.js 中，对 video 标签需增加一个新的 className：`vjs-hq` 。到 vjs-hq.css 中去把浏览器中的选择符写到这里，但是前面加上一层限制 .video-js.vjs-hq ，保证了选择的精确性。

浏览器中再次观看，进度条颜色改变了。

### 添加新图标进来

到浏览器中，倍速播放按钮现在还没有图标，所以添加一个进来。chrome 开发者工具中看到图标都是给对应的 button 设置 before 来实现的，所以按照其他按钮的规律，仔细看一下这里的 button 的 class 名为 vjs-playback-rate 。

到字体编译工具，也就是 font 项目中

icons.json

```json
  {
    "name": "play-backrate",
    "svg": "rate.svg",
    "root-dir": "./peter/"
  }
```

打开 icons.json 文件，把新图标添加到最后，保证其他图标的顺序不被打乱。添加一项 playback-rate ，图标也拷贝到 peter 文件夹中，运行 grunt 命令。

浏览器中，可以看到新的倍速图标出现在了末尾。

打开生成的 videojs-icons.css 拷贝 woff 的 fontface 定义，同时到末尾看到新图标的字体编码为 f121 ，一个元素中要使用字体图标，除了添加编码，还需要指定 font-family 才行，所以才有了上面的这三行的内容。


新的 font-face 定义粘贴到 vjs-hq.css 中，替换原有内容。然后修改一下 css 代码。

vjs-hq.css

```css
.video-js.vjs-hq .vjs-playback-rate .vjs-icon-placeholder:before {
  font-family: 'Videojs';
  content: "\F121";
}

.video-js.vjs-hq .vjs-playback-rate .vjs-playback-rate-value {
  display: none
}
```

找到对应的选择器，覆盖一下即可。添加图标的时候，不仅仅添加了字体编码，还添加了 font-family ，下面，把原来的 1X 字体隐藏掉。

浏览器中，看到图标出现了。
