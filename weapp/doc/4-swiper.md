# 滑块视图（轮播图）

本节课程将修改小程序首页展示的内容，删除案例已有代码，通过小程序的 `swiper` 组件在首页制作一个轮播图效果。

### 删除首页案例代码

小程序首页的代码存放在 `pages/index/` 目录中，我们先把这个目录中所有文件的内容清空并保存，然后点击左侧工具栏中的 `调试` 标签，打开小程序调试工具，在右侧的控制台中提示错误信息：

>pages/index/index 出现脚本错误或者未正确调用 Page()

这是因为小程序的首页没有在 `index.js` 文件中调用 [Page()](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/page.html) 函数进行页面注册，所以报告上述错误信息。

消除错误信息，打开 `index.js` 文件，添加如下代码：

```
Page({})
```

注意：`Page()` 函数接受一个 object 参数，这个参数不能省略，若省略之后，调试小程序的时候会报错。目前，我们不需要在逻辑层操作页面，所以 `Page()` 函数参数是一个空对象。

然后按下快捷键 `cmd + s` 保存 `index.js` 文件，再次调试小程序，控制台中就不会报告错误信息了。


接下来修改首页页面结构，打开 `index.wxml` 文件，添加代码：

```
<view>
  Hello World
</view>
```

调用小程序的 [view](https://mp.weixin.qq.com/debug/wxadoc/dev/component/view.html) 视图容器组件，相当于 HTML 中的 `<div></div>` 元素，然后保存 `index.wxml` 文件。

然后点左侧的“编译”选项，*设置启动页面* 一项改为

```
pages/index/index
```

然后，点"确定"，页面会自动刷新，首页会显示 `Hello World` 字样。


### 添加 Swiper

继续修改代码，去掉刚才添加的 `Hello World` 一行文字，调用小程序提供的 [swiper](https://mp.weixin.qq.com/debug/wxadoc/dev/component/swiper.html) 滑块视图容器组件，代码如下：

```
<view>
  <swiper indicator-dots="true"
    autoplay="true" interval="5000" duration="1000">
      <swiper-item>
        <image src="http://o86bpj665.bkt.clouddn.com/posters/redux-tower.png" />
      </swiper-item>
      <swiper-item>
        <image src="http://o86bpj665.bkt.clouddn.com/posters/gulp-flex-res.png" />
      </swiper-item>
      <swiper-item>
        <image src="http://o86bpj665.bkt.clouddn.com/posters/gitbeijing.png" />
      </swiper-item>
  </swiper>
</view>
```

`swiper` 组件结合 `swiper-item` 组件和 [image](https://mp.weixin.qq.com/debug/wxadoc/dev/component/image.html) 组件就可以构建一组轮播图，其中 `swiper` 组件的四个属性意义如下：

* indicator-dots 是否显示轮播图面板指示点，默认不显示

* autoplay 是否自动切换，默认值为 false，不自动切换

* interval 自动切换时间间隔，默认值为5000毫秒

* duration 滑动动画时长，默认值为500毫秒

### 总结

在不同的手机上，图片宽高显示还不太完美，下节继续介绍。
