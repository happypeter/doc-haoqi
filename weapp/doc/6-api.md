# 小程序中请求网络 API

本节课程将使用小程序提供的网络 API 获取 GitHub 上的数据，然后在首页中把数据列表显示出来。主要用到的知识点有：页面生命周期函数，发送请求函数 wx.request() 以及用 setData() 接口来动态修改页面数据。

### 小程序页面生命周期函数

测试数据是好奇猫网站上的所有课程的信息，这些信息以 JSON 文件的形式存放到了 GitHub 网站上，数据的链接地址[点击这里](https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/index.json)。不过，在获取测试数据之前，我们还需要考虑一个问题，就是何时调用小程序的 API 向 GitHub 发送请求？答案是在首页加载的时候，那么又该如何监听到这个事件呢？此时，小程序页面的生命周期函数就该出场了。修改 `index.js` 文件，添加一些代码：

```
Page({
  onLoad: function() {
    console.log('loading...')
  }
})
```

上述代码中，前面课程我们已经知道了 `Page()` 方法是用来注册一个小程序页面的，这个方法接受一个对象参数，现在这个对象参数不为空了，包含了一个 `onLoad` 属性，这个属性就是小程序页面的一个[生命周期函数](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/page.html)，当页面加载的时候，就会执行这个函数。保存 `index.js` 文件，在调试工具的控制台中会看到打印出来的字符串 `loading...`。

### 调用小程序网络 API 发送请求

继续修改 `index.js` 文件，调用 [wx.request](https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html#wxrequestobject) 接口请求测试数据：

```
Page({
  onLoad: function() {
    wx.request({
      url: 'https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/index.json',
      success: function(res) {
        console.log(res.data)
      },
      fail: function() {
        console.log('fail')
      }
    })
  }
})
```

官方文档中已经给出了 `wx.request` 接口的使用范例，直接拿过来按需修改就可以了。需要注意的是文档中规定 `wx.request` 发起的是 HTTPS 请求，不过在开发环境下没有这个限制。当数据请求成功之后，会在调试工具的控制台打印出获取的数据。若请求失败之后，则打印出 `fail` 字符串。

### 保存测试数据

既然我们已经得到了测试数据，下面要做的事情就是想办法让数据在首页显示出来。在小程序中渲染层 `.wxml` 文件中的动态数据都来自 `Page()` 方法对象参数中的 `data` 属性，所以先定义首页的初始化数据：

```
Page({
  data: {
    courses: []
  },
  ...
})
```

上述代码中通过 `data` 属性添加了一个名为 `courses` 数组变量，初始值为空。这个 `courses` 变量将用来存放从 GitHub 获取的测试数据，修改代码：

```
Page({
  ...
  onLoad: function() {
    var that = this
    wx.request({
      url: 'https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/index.json',
      success: function(res) {
        that.setData({courses: res.data.published})
      },
      ...
    })
  }
})
```

调用小程序提供的 `Page.prototype.setData()` 函数可以修改 `courses` 变量的值，当 `courses` 变量值改变的时候，页面会重新渲染。

### 页面显示测试数据

通过小程序 WXML 提供的 [数据绑定](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/data.html) 和 [列表渲染](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/list.html) 功能把首页提供的动态数据 `courses` 列举出来，修改 `index.wxml` 文件，添加代码：

```
<view wx:for="{{courses}}" wx:key="id">
  <image src="{{item.cover}}" />
  <text>{{item.title}}</text>
</view>
```

其中，代码中的 `wx:key` 是用来指定列表中条目唯一性的标识，`wx:key` 的值有两种表示形式，一种是字符串，正如代码中所示，`id` 与 `courses` 数组中对象元素的 `id` 属性名保持一致。

### 美化页面

现在测试数据已经在首页中显示出来了，但是列表样式很难看，所以给各个组件添加一些样式，修改 `index.wxml` 文件：

```
<view>
  <text class="label">已经发布的课程</text>
  <view class="courses">
    <view wx:for="{{courses}}" wx:key="id" class="course">
      <image src="{{item.cover}}" mode="widthFix" style="width: 682rpx"/>
      <text class="title">{{item.title}}</text>
    </view>
  </view>
</view>
```

给组件添加 `class` 和 `style` 属性控制组件的样式。另外，对于图片的样式仍然采用 `widthFix` 缩放模式，固定图片宽度的情况下，保证图片的宽高比。接下来，就是在 `index.wxss` 文件中，编写组件选择器的样式，代码如下：

```
.label {
  border-left: 3px solid #00bcd4;
  display: block;
  margin-top: 16px;
  padding: 10px;
  font-size: 16px;
  color: #212121;
}
.courses {
  margin: 0 32rpx;
}
.course {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2rpx solid #ddd;
  margin: 16px 0;
}
.title {
  color: #212121;
  font-size: 14px;
  border-top: 1px solid #ddd;
  width: 100%;
  text-align: center;
  padding-top: 16px;
  padding-bottom: 16px;
}
```

添加上述代码之后，首页的列表就好看多了。对于小程序的样式语言规范，可以查看文档 [WXSS](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxss.html)。
