# 小程序数据缓存接口

本节课程将使用小程序的同步数据缓存接口在小程序客户端存储用户信息，用户的头像和昵称将在用户主页面显示出来。

### 存储用户信息

在上节课程中，当小程序初始化完成之后，我们已经能够获取到登录用户的信息。现在我们要把用户信息保存起来，方便小程序页面使用。数据存储到一个可以让小程序的所有页面都可以访问的位置，可以存放到小程序缓存当中。小程序提供了一些[数据缓存接口](https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html)，我们将使用 [wx.setStorageSync](https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxsetstorageobject) 和 [wx.getStorageSync](https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxgetstoragesynckey) 同步数据缓存接口，设置和读取缓存中的信息。修改小程序启动文件 `app.js`，添加代码：

```
wx.getUserInfo({
  success: (res) => {
    wx.setStorageSync('user', res.userInfo)
  }
})
```

当获取用户信息成功之后，调用同步 [wx.setStorageSync](https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxsetstorageobject) 接口将 `res.userInfo` 代表的用户信息存储到本地缓存指定的名为 `user` 的 key 中。这样，在用户主页面中就可以访问本地缓存 `user` 中的值了。

### 添加用户主页

修改小程序全局配置文件 `app.json`，添加用户主页面 `mine` 的路由，如下：

```
"pages": [
  "pages/mine/mine"
],
```

保存之后，小程序自动添加 `mine` 页面需要的 `mine.js`、`mine.wxml`、`mine.json` 和 `mine.wxss` 四个文件。

### 浏览用户主页

暂且使用这种方法，点击小程序开发工具左侧的【编译】标签，设置小程序启动页面为 `pages/mine/mine`

### 用户主页面获取缓存数据

修改 `mine` 页面的脚本文件 `mine.js`，当页面加载的时候，读取本地缓存 `user` 中的用户信息，代码如下：

```
Page({
  onLoad: function () {
    const value = wx.getStorageSync('user')
    console.log(value)
  }
})
```

通过 [wx.getStorageSync](https://mp.weixin.qq.com/debug/wxadoc/dev/api/data.html#wxgetstoragesynckey) 同步接口获取到用户信息并没有完成任务，我们最终目标是把用户信息在 `mine` 页面中显示出来，所以还要把用户信息传递给 `mine.wxml` 布局文件，设置页面的 `data` 数据：

```
Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    const value = wx.getStorageSync('user')
    this.setData({ userInfo: value })
  }
})
```

定义了 `mine` 的动态数据 `userInfo`，通过 WXML 的数据绑定功能，这个 `userInfo` 变量就可以在 `mine.wxml` 访问到了。

### 填充用户主页面

修改 `mine.wxml` 页面，显示用户头像和昵称，添加代码如下：

```
<view class="header">
  <image src="{{userInfo.avatarUrl}}" class="avatar" />
  <view class="name">{{userInfo.nickName}}</view>
</view>
```

### 美化用户主页面

修改 `mine.wxss` 页面，添加控制页面颜值的样式代码：

```
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: #ececec;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.name {
  font-size: 16px;
  margin-top: 10px;
}
```

### 结论

本节课程介绍了通过小程序的本地缓存，在小程序页面之间共享数据，除了这种方法之外，也可以使用小程序[简易课程](https://mp.weixin.qq.com/debug/wxadoc/dev/)中介绍的全局变量 `globalData` 来在页面间共享数据。
