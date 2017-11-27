# 通过 rpx 设置图片宽高

本节课程介绍如何通过图片组件 `image` 的缩放模式（ mode ）和小程序规定的手机屏幕宽度（ rpx ），让轮播图中的每张图片都能在不同的手机屏幕上正常显示。

### 图片组件的 widthFix 缩放模式

打开小程序调试工具，我们可以查看图片的尺寸，首先点击右侧的 `Wxml` 标签项，展示小程序首页的页面结构，然后点击页面元素捕捉器图标，当图片变成蓝色之后，紧接着点击模拟器中的图片，就可以在调试工具的最右侧面板中看到所选中图片的样式，如下所示：

```
width:320px;
height:240px;
display:inline-block;
overflow:hidden;
```

由此可见，图片的高度和宽度都是固定像素值，所以图片不能自适应屏幕的宽度。那如何解决这个问题呢？不用担心，小程序开发人员已经给我们提供了非常便利的解决方法，`image` 组件默认有四种缩放模式，其中一种是 `widthFix` 模式，使用这种模式可以让图片宽度不变，高度自动变化，保持原图宽高比不变，所以我们先给轮播图中的每个 `image` 组件添加 `widthFix` 模式，修改 `index.wxml` 文件，代码如下：

```
<swiper-item>
  <image src="http://o86bpj665.bkt.clouddn.com/posters/redux-tower.png" mode="widthFix" />
</swiper-item>
<swiper-item>
  <image src="http://o86bpj665.bkt.clouddn.com/posters/gulp-flex-res.png" mode="widthFix" />
</swiper-item>
<swiper-item>
  <image src="http://o86bpj665.bkt.clouddn.com/posters/gitbeijing.png" mode="widthFix" />
</swiper-item>
```

小程序的编辑器支持多点编辑，按下 `option` 按键可以选中多个编辑点，并且支持自动补全功能。文件保存之后，我们发现图片效果没有变化，继续调试，打开调试工具，查看图片样式，发现 `image` 组件的 `widthFix` 模式生效了，因为图片的高度变成180px，符合原来图片640*360的宽高比，但是图片并没有覆盖屏幕的宽度，解决这个问题代码如下：

```
<swiper-item>
  <image src="http://o86bpj665.bkt.clouddn.com/posters/redux-tower.png" mode="widthFix" style="width: 750rpx"/>
</swiper-item>
<swiper-item>
  <image src="http://o86bpj665.bkt.clouddn.com/posters/gulp-flex-res.png" mode="widthFix" style="width: 750rpx"/>
</swiper-item>
<swiper-item>
  <image src="http://o86bpj665.bkt.clouddn.com/posters/gitbeijing.png" mode="widthFix" style="width: 750rpx"/>
</swiper-item>
```

上述代码中，`rpx` 是小程序规定的尺寸单位，能够根据手机屏幕调整显示的宽度，在不同的手机设备上，`rpx` 与 `px` 两个尺寸单位之间有不同的转换关系；`750rpx` 是小程序规定的手机屏幕宽度，兼容大部分主流机型。因此当把图片的宽度设置为 `750rpx` 的时候，意思就是说把图片的宽度固定为手机屏幕的宽度，在不同的手机上，图片的宽度总能占满手机屏幕的宽度。

关于 `rpx` 尺寸单位的详细介绍，请参考文档 [WXSS](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxss.html)

### 调整 swiper 组件高度

现在，图片显示的宽度和宽高比已经合适了，但是图片高度方向显示的内容不完整，这是因为 `swiper` 组件的高度是固定的，并且小于图片本该显示的高度。

修改 `index.wxml` 文件，设置 `swiper` 组件的高度，添加代码：

```
<swiper indicator-dots="true"
  autoplay="true" interval="5000" duration="1000" style="height: 422rpx">
  ...
</swiper>
```

注意：`swiper` 组件高度的尺寸单位是 `rpx`，因为这个高度值是由小程序规定的手机屏幕的宽度 `750rpx` 计算(750 x 9/16 ，图片的 高度/宽度 比是 9/16)得到的。

### 不自动播放轮播图

修改 `index.wxml` 文件，设置 `swiper` 组件的 `autoplay` 属性为 `false`，代码如下：

```
<swiper indicator-dots="{{true}}"
  autoplay="{{false}}" interval="5000" duration="1000" style="height: {{swiperHeight}}rpx">
  ...
</swiper>
```

这里也修正了前面一个错误，当使用 `true` 和 `false` 布尔值的时候，应该用 `{{false}}` 表示，不能直接用 `"false"` 的字符串形式，不然不生效。

小程序的数据绑定规则，请参考文档 [WXML](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/)
