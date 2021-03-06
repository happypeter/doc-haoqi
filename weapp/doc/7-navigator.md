# 小程序导航组件使用

上节课程我们已经在小程序首页制作了一个好奇猫上所有课程的展示列表，本节课程我们将给列表中的每一个课程卡片添加一个链接，点击课程卡片会进入到课程详情页面。涉及到的知识点是小程序导航组件（[navigator](https://mp.weixin.qq.com/debug/wxadoc/dev/component/navigator.html)）的使用以及如何在两个小程序页面之间传递数据。

### 创建课程详情页面

我们希望当点击小程序首页的课程卡片的时候，可以进入到课程详情页面。列表中有几十门课程，每门课程的内容都不一样，我们不可能挨个为每门课程都创建一个详情页面。因为课程详情页面的样式结构都是一致的，只不过是显示的数据内容不一样，所以我们只需要创建一个课程详情页面就可以了，页面中的内容可以依据传递给页面的参数的不同而加载不同的数据，这个知识点稍后再介绍。现在，我们只需要添加一个新页面，名为 `course`，代码课程详情页面。如何添加新页面，在第三节课程中已经介绍过了，首先设置 `course` 页面的路由，修改小程序全局配置文件 `app.json` 中的 `pages` 配置项，添加一个新的字符串 `pages/course/course`，代码如下：

```
{
  "pages":[
    ...,
    "pages/course/course"
  ],
}
```

保存文件之后，小程序框架会自动在 `pages/course` 目录下创建 `course` 页面需要的四个不同后缀名的文件。

### 导航组件 navigator

课程详情页面创建完毕之后，首页的课程卡片就可以链接到这个页面了，如何实现呢？小程序框架给开发者提供了一个 [navigator](https://mp.weixin.qq.com/debug/wxadoc/dev/component/navigator.html) 导航组件，这个组件就能实现页面的链接功能。修改 `index.wxml` 文件，使用导航组件：

```
<view wx:for="{{courses}}" wx:key="id">
  <navigator url="../course/course" class="course">
    <image src="{{item.cover}}" mode="widthFix" style="width: 682rpx" />
    <text class="title">{{item.title}}</text>
  </navigator>
</view>
```

因为我们期望点击整个课程卡片的时候，页面就能够跳转，所以用 `navigator` 组件把 `image` 和 `text` 组件都包裹起来。但是，课程卡片的样式就破坏掉了，所以还得调整一下样式，把 `.course` 样式选择器添加到 `navigator` 组件之上。注意一下，`navigator` 组件的 `url` 属性值是一个相对路径，上述代码中课程详情页面相对于首页的路径是 `../course/course`。

保存文件之后，然后点击首页的任意一个课程卡片，都可以打开课程详情页面，并且 `navigator` 组件在点击的时候，还设置了背景色，这个样式可以通过组件的 `hover-class` 属性修改。

当从首页跳转到详情页面的时候，在小程序的导航栏中会出现一个 `返回` 按钮，若点击这个按钮可以返回首页。另外，在模拟器上方的工具栏中多了一个 `正在调试2个页面` 的下拉菜单，点击这个下拉菜单，会看到首页和课程详情页面两个页面的缩略图，展示出目前小程序已经打开的所有页面。这些功能是与导航组件的 `open-type` 属性值 `navigate` 相关联的。这种 `navigate` 打开方式会保留当前页面，然后跳转到新的页面。

### 页面间传递参数

现在通过 `navigator` 组件已经可以从首页跳转到课程详情页面了，但是每个课程卡片的详情页面都是一样的。我们需要让课程详情页面知道应该展示哪一门课程的详细内容，所以我们要把课程卡片对应的课程名称传递给课程详情页。如何在两个页面间传递数据呢？通过给链接路径添加查询字符串，修改 `index.wxml` 文件，代码如下：

```
<navigator url="../course/course?link={{item.link}}" class="course">
```

接下来，就是在课程详情页面中读取路径中查询字符串的数据，修改 `course.js` 文件，先删除不需要的一些代码，最终代码如下所示：

```
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options 为页面跳转所带来的参数
    console.log(options)
  }
})
```

上面代码中的注释部分，已经说明了 `options` 参数的作用，我们先把 `options` 包含的信息打印出来，发现 `options` 是一个对象参数，其包含了路径中查询字符串中的信息：

```
{link: "/gulp-flex-res"}
```

现在，课程详情页面就可以知道加载哪一门课程的详细介绍了。下节课程再介绍。
