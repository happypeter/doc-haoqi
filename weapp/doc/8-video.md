# 小程序视频组件使用

本节课程要完成的任务是给课程详情页面添加一些内容进来，学习一个新的小程序组件（[video 组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/video.html)）和 WXML 标签语言提供的条件渲染属性（[wx:if](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/conditional.html)）

### 设置课程详情页为启动页面

因为每次修改代码，保存文件之后，小程序都会重启，加载首页的内容。这样，访问课程详情页就有些不方便，所以把课程详情页临时设置为启动页面。点击开发工具左侧工具栏中的 `编译` 标签，打开一个`自定义预览`对话框，在第一个输入框中填写 `pages/course/course`，第二个输入框中填写 `link=gulp-flex-res`，设置详情页面需要的参数，别忘了勾选上 `使用以上条件编译` 选项，最后点击 `确定` 按钮，小程序重新启动，启动页面就变成课程详情页面了。

### 调用小程序网络 API

课程详情页面的测试数据也以 JSON 文件的形式上传到了 GitHub 的代码库中，获取测试数据的地址请[点击这里](https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/gulp-flex-res.json)。如何在小程序中发送网络请求，获得第三方数据，在前面的第六小节课程中我们已经介绍过了，这里就直接贴代码了，修改 `course.js` 文件，添加代码：

```
Page({
  data:{
    link: '',
    detail: []
  },
  onLoad:function(options){
    let that = this
    wx.request({
      url: `https://raw.githubusercontent.com/happypeter/weapp-demo/master/doc/${options.link}.json`,
      success: function(res) {
        that.setData({detail: res.data, link: options.link})
      },
      fail: function() {
        console.log('fail')
      }
    })
  }
})
```

上面代码中，使用了 ES6 的语法，`let` 关键字和 `模板字符串`

### 课程详情页面布局结构

修改 `course.wxml` 文件，添加代码：

```
<view class="media">
  <view class="name">{{detail.name}}</view>
  <view wx:if="{{link.length > 0}}">
    <video src="http://o86bpj665.bkt.clouddn.com/{{link}}/index.mp4" controls class="video"></video>
  </view>
</view>
<view class="intro">
  {{detail.intro}}
</view>
<view class="content">
  <view class="header">课程内容</view>
  <view wx:for="{{detail.content}}" wx:key="id">
      <view class="chapter">{{item.header}}</view>
      <view wx:for="{{item.section}}" wx:key="title" class="title">
        {{index + 1}}. {{item.title}}
      </view>
  </view>
</view>
```

上述代码中，用到了小程序 WXML 标签语言提供的条件渲染 [wx:if](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/conditional.html) 控制属性和 [video](https://mp.weixin.qq.com/debug/wxadoc/dev/component/video.html) 组件。

### 美化课程详情页

修改 `course.wxss` 文件，添加代码：

```
view {
  font-family: Arial, Helvetica, sans-serif;
}
.media {
  background-color: #00bcd4;
  text-align: center;
  padding: 20px 32rpx;
}
.name {
  color: #fff;
  letter-spacing: 1px;
  display: inline-block;
  border-bottom: 2px solid #ffe200;
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-size: 16px;
}
.video {
  width: 686rpx;
  height: 386rpx;
}
.intro {
  margin-top: 30px;
  margin-bottom: 30px;
  padding-left: 32rpx;
  padding-right: 32rpx;
  font-size: 16px;
  line-height: 1.5;
}
.content {
  margin-bottom: 30px;
}
.header {
  font-size: 20px;
  padding: 5px 32rpx;
  border-left: 3px solid #00bcd4;
  color: #212121;
}
.chapter {
  font-size: 16px;
  padding: 16px 32rpx;
}
.title {
  padding: 8px 48rpx;
  font-size: 14px;
  color: rgba(0,0,0,0.6);
}
```

### 结语

这样，效果就出来了。
