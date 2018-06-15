# 更多实用技巧

mui 的小技巧还有很多，我们课程中就不一一列举了，大家可以参考官网进行学习。课程的最后一个小节，我们挑选几个特别实用的来介绍一下。

### <a name="x5uwtg"></a>设置阴影

材料设计的一大特点就是大量通过阴影来体现各元素间的层级。对应 mui 的有阴影的组件，例如 paper/card/appbar 等等，设置阴影的方式就是使用 elevation 属性。


[默认 theme](https://material-ui.com/customization/default-theme/) 中的 shandows 下有25个阴影选项，对应 elevation 的 25 个级别。我们可以选择一个跟设计图比较类似的应用在我们的元素上。


Header.js

```javascript
<AppBar elevation={4}>
```

例如把我们的 AppBar 的 `elevation` 设置为 `4` 。如果所有 25 个阴影中没有跟设计图一致的，还可以通过之前介绍的覆盖 theme 的方式来设置自己的阴影效果。


浏览器中，可以看到不同的 `elevation` 级别对应的是不同的阴影效果，阴影越大，显得这个卡片就提升的就越高，这也就是 elevation 这个名字的由来。


### <a name="g3vvue"></a>完善代码

最后来把代码完善起来。其中 Tab 切换的效果按照官方 tabs 的 [demo](https://material-ui.com/demos/tabs/#full-width)  做一下即可，其他的代码也都参考官网文档开发即可，所以咱们这里就不详细介绍了。


浏览器中，最终实现了这样的效果：

* drawer 的开关。
* tabs 切换可以通过点击 tab 
* 也可以通过滑动主体内容
* 当然还有一些商品图片

### <a name="09utpu"></a>响应式

我们这个案例只做手机版。但是 mui 的响应式的思路也是非常棒的，值得提一下。

[默认 theme](https://material-ui.com/customization/default-theme/) 中的 breakpoints 一项下设置了对应不同尺寸的多个断点。这样 [Grid](https://material-ui.com/layout/grid/) 中就可以应用这些断点。也可以在 JSS 中，通过


```javascript
  [theme.breakpoints.up('sm')]: {
    color: 'red',
   },
```

这样的语句来控制任意元素的样式。例如这里的意思是，当屏幕宽度大于 `small` 对应的那个断点值的时候，让字体颜色变红。


浏览器中，拉伸视窗，会看到大于某个断点后，字体果然变红了。情况复杂一些的时候，这样写要比自己手写 media-query 方便很多。

好，咱们这套 material-ui 的课程就到这里了。谢谢！
