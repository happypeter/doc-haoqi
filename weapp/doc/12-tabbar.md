# 配置 tabBar 属性切换页面

上节课程中我们暂时把用户主页面设置为小程序的启动页面，这样虽然方便调试，但是小程序案例代码并没有添加用户主页的访问入口，所以这节课程我们将设置小程序的 [tabBar](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html) 属性
在小程序窗口的底部添加一个 tab 导航栏，通过 tab 导航栏访问用户主页，正如我们平常使用的手机 APP 的设计样式一样。

### 配置 tabBar 属性

配置 tabBar 属性需要编辑小程序的全局配置文件 [app.json](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html)，添加一些代码进来：

```
{
  ...,
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/mine/mine",
        "text": "我的"
      }
    ]
  }
}
```

`tabBar` 属性值是一个对象类型，其中的 `list` 属性是一个数组，数组元素至少有2个，最多有5个，每个数组元素代表一个 tab 标签，数组元素在 `list` 数组中的先后顺序，则对应 tab 标签在小程序窗口中从左到右的排列顺序。`pagePath` 属性表示小程序页面的路由，`text` 属性表示 tab 标签上显示的文字。

修改完成之后，保存 `app.json` 文件，小程序重启，用户主页下方出现一个导航栏，导航栏中有2个 tab 标签【首页】和【我的】，点击这两个标签可以在首页和用户主页两个页面之间来回切换。

### 注意事项

通过设置 `tabBar` 属性添加 tab 导航栏是很容易的，不过有一点需要注意，tab 导航栏并不会出现在小程序所有页面的底部，只出现在 `tabBar` 配置中所包含的页面的底部。点击首页的一个课程卡片，进入【课程详情页】，你会发现页面底部并没有显示 tab 导航栏。那如果我们想在【课程详情页】访问【用户主页】，可以使用小程序的 [navigator](https://mp.weixin.qq.com/debug/wxadoc/dev/component/navigator.html) 导航组件。

前面课程中我们已经学习了 `navigator` 组件的用法，这个组件有一个页面链接打开方式属性 `open-type`，其属性值有三个可选项 `navigate`、`redirect` 和 `switchTab`。之前，我们使用的都是 `navigate` 方式。现在，若是在【课程详情页】中，通过导航组件链接到 tabBar 属性包含的【用户主页】页面，我们需要使用 `switchTab` 打开方式。接下来，我们测试一下，打开 `course.wxml` 组件，添加代码：

```
<view>
  <navigator url="../mine/mine" open-type="switchTab">我的主页</navigator>
</view>
```

保存 `course.wxml` 文件之后，进入【课程详情页】，点击页面最底部的文字`我的主页`就可以链接到用户主页了。

### 美化 tab 导航栏

接下来，给每个 tab 标签添加一个图标，在项目根目录下新建一个文件夹 `images`，存放四个图标文件，点击[图标文件链接](https://github.com/happypeter/weapp-demo/tree/master/images)获取图片。然后，设置 tabBar 属性如下：

```
"tabBar": {
  "list": [
    {
      ...,
      "iconPath": "images/ic_home.png",
      "selectedIconPath": "images/ic_home_select.png"
    },
    {
      ...,
      "iconPath": "images/ic_person.png",
      "selectedIconPath": "images/ic_person_select.png"
    }
  ]
}
```

通过设置 `iconPath` 给 tab 标签添加未选中状态下显示的图标，设置 `selectedIconPath` 属性指定 tab 标签选中状态下显示的图标。另外，再更改一下 tab 标签选中后，其上面的文字的颜色样式，添加代码：

```
"tabBar": {
  "selectedColor": "#0097a7",
  ...
}
```

保存文件，当选中某个 tab 标签，其样式就与未选的标签样式区别开来了。至此，设置 tabBar 属性添加导航栏的功能也就介绍完毕了。
