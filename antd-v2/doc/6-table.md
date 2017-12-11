# 使用表格组件

欢迎来到新的一关《使用表格组件》。美观的展示订单以及甜点信息。


### 运行组件

进入《运行组件》这个任务。参考 [官方的 Table 文档](https://ant.design/components/table-cn/) 来进行开发。

第一步就是要做列定义

define-column---

传入 Table 组件的 columns 属性值是一个数组，数组中定义了一共有几列，通过 title 定义了每一列的标题是什么，通过 dataIndex 指定了这一类要显示数据的那个字段。

下面来把后端服务器启动。

```
cd happy-api-starter
npm i
npm run db
npm run dev
```

同时保证 happy-api-starter/public/uploads/posters 中有 hsl.png 和 tlms.png 这两张甜点海报。

添加种子数据。浏览器中访问 localhost:3008/seed-dishes ，就可以把数据库中插入两个甜点数据。

拿到数据暂时粘贴到前端源码中。浏览器中访问 localhost:3008/dishes ，可以拿到 dishes 数据。

代码中添加临时数据。

data---

数据一定要是一个对象数组，同时对象中的每个元素的 key ，要和列定义中的 dataIndex 一一对应。


看看达成的效果。这样页面中数据就显示出来了。

### 美化显示格式

进入《美化显示格式》这个任务。通过列定义中的 render 方法来完成。

先来个简单的，给价格添加单位，了解一下 render 的基本使用方法。

add-unit

render 可以拿到初始数据为参数，在函数内部对参数做任意的修饰，然后最终显示返回的结果。

也可以 render React 组件。

render-react---

暂时没有用 _id 数据。

来把海报图片显示出来。

add poster----

通过添加 posterUrl 拿到图片链接，通过定义 Poster 组件，显示出了图片。

Menu 中还需要传入 rowKey

fix-warning----

这样终端中就不会有警告信息了。

看看达成的效果。这样显示效果就比较完美了。

至此，《使用表格组件》这一关就通过了。
