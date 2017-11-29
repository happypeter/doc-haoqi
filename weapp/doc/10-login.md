# 小程序客户端实现用户登录功能

本节课程主要完成的任务是调用小程序接口（wx.login）实现登录，登录成功之后打印用户信息。

### 获取登录凭证

当小程序启动的时候，调用小程序的 [wx.login](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject) 接口实现登录。修改 `app.js` 文件，代码如下：

```
App({
  onLaunch: () => {
    wx.login({
      success: (res) => {
        console.log(res)
      }
    });
  }
})
```

当用户登录成功之后，打印出返回的信息：

```
Object {errMsg: "login:ok", code: "001i9O302ozU9Z0y4O402IVO302i9O30"}
```

其中 `code` 官方文档称为【登录凭证】，`code` 的值是随机的，每次重启小程序，这个 `code` 的值都不一样，`code` 将用来在小程序的服务器端获取用户登录的状态信息，从而维护用户的登录状态。后面课程将会演示。

### 获取用户公开信息

```
App({
  onLaunch: () => {
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.getUserInfo({
            success: (res) => {
              console.log(res)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})
```

当用户登录成功之后，调用 [wx.getUserInfo](https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html#wxgetuserinfoobject) 接口，获取用户公开信息，并在控制台中打印出来。

保存文件，小程序重新启动，首页出现一个【微信登陆】对话框，请求获取你的公开信息，点击【允许】，则在控制台看到打印出来的用户信息。之后，再重启小程序，这个【微信登陆】对话框也不会出现了。为了调试方便，需要清除一下缓存，点击左侧工具栏中的 `缓存` 标签，再弹出的菜单中，选择【清除工具授权数据】，这样操作之后，重启小程序的时候，又可以看到【微信登陆】对话框了。
