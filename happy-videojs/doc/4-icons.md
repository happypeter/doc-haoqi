# 使用自己的图标

这集来看看怎么自己用 sketch 画出 svg 图标，通过 videojs 给的工具转换成字体图标，替换播放器默认的那些图标。这套东西学会，整个字体图标的使用方法也就都学会了，可以用到其他地方。

### 使用 sketch 作图

到 sketch 中，新建一个 200x200 的画布。敲 v ，调出矢量画笔，转弯处保证是 Straight 直线转弯，画出一个播放按钮形状的三角形。

按住 shift ，选中三个顶点，把 corner 设置为 30 。注意，画 svg 图的时候，不能有 transform ，不然转换字体图标的时候旋转角度就会很怪异。

取消 border ，fill 填充色设置为黑色。选中画布，到右下角的导出区，导出格式选择 svg ，点 export 按钮导出，文件名为 play 。

### 编译 svg 成字体图标

官方提供了[字体编译工具](https://github.com/videojs/font) 。

把项目 clone 到本地

```
npm i
npm i -g grunt
grunt
open index.html
```

然后运行命令 `npm i` 把需要的包装上，全局安装 grunt ，以便使用 grunt 命令。运行 grunt 命令，编译字体图标。打开 index.html 就可以看到这些图标了。

现在来把第一个图标，也就是播放按钮，替换成咱们自己的。

icons-json---

打开 icons.json 文件，可以看到目前使用的是 `ic_play_arrow_48px.svg` ，它的位置在上面 `root-dir` 指定的文件夹中，也就是当前项目安装的 material design 的包中。现在来把位置改写成 play.svg 同时在本对象内部添加一个 root-dir 指定图标的存放位置是当前位置的 peter 文件夹，注意最后要有斜杠。

```
mkdir peter
mv ~/Desktop/play.svg peter
grunt
open index.html
```

创建 peter 文件夹，把咱们的图标拷贝进来。运行 grunt 重新编译，然后打开 index.html 。

浏览器中，可以看到咱们的图标已经编辑进来了。打开 chrome 开发者工具，选中 class 名为 vjs-icon-play 的 span 的伪元素 before ，可以看到 play 按钮对应的字体编码是 `\f101` ，这个编码是由图标的在 icons.json 文件中的出现顺序决定。同时 videojs 的自带 css 中，指定播放按钮，也是用了这个字体编码，所以在编译各个按钮的时候，千万不要打乱顺序，这样使用图标的时候就会方便很多。

### 使用字体图标

编译的输出是什么呢？

```
ls fonts
ls css
ls scss
```

是 fonts 文件夹下的各种格式的字体包，还有 css 和 scss 中的字体文件。

访问：https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face

到 MDN 网站上可以看到 woff 可以支持所有主流浏览器了，所以咱们可以忽略 fonts/ 和 scss 文件夹中的内容。

打开 css 文件夹中的 videjs-icons.css 文件。拷贝把 woff 格式内联存放的 font-face 定义。

vjs-hq.css

```css
@ -0,0 +1,5 @@
@font-face {
  font-family: VideoJS;
  src: url(data:application/font-woff;charset=utf-8;base64,d09GRgA...ABB4=) format("truetype");
  font-weight: normal;
  font-style: normal; }
```

VjsPlayer.js

```js
import '../assets/vjs-hq.css'
```

新建 assets/vjs-hq.css 把 font-face 定义粘贴进来。

到 VjsPlayer.js 中，在 video-js.css 之后，导入 vjs-hq.css 文件。

浏览器中，可以看到播放器的 play 按钮已经变了。
