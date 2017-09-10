在 React 组件化项目中，CSS 的书写跟传统思路差别很大：

- 基本不用全局 CSS （个别情况，例如 type-face 定义等除外）
- 基本不单独复用 CSS
- 而要跟 html 一起复用（以组件为单位复用）
- 整个项目，class 名不重复

摘自：https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#post-processing-css


>Generally, we recommend that you don’t reuse the same CSS classes across different components.

> 总体上，我们建议不要再不同组件中，使用相同的 CSS 的 class 名。

### 全局样式处理

注意，在 create-react-app 环境下，任意 css 文件中的语句，都是全局有效的，所以一定要主要避免 class 使用重复。

注意事项清单：

- 全局 CSS 基本可以不用
  - a: text-decoration, p: margin: 0, h1: margin: 0 这样的代码，这样的**重置性代码** 不要用。直接写到各个组件的 css 文件中。会有一定的重复，但是代码也变得更加的清晰。
- 全局 CSS 中不好干掉的，基本只有一个就是 type-face 定义（中文网站很少用），但是如果用到，这个还是写到全局 CSS 中的，另外就是 clearfix 定义（不过现在有 flexbox 了，clearfix 也很少用了）。
- body {margin: 0} 直接写到 index.html 中的 style 标签里即可

总之，除非极个别情况，不要使用全局 CSS 。

### 文件组织规范

这一点，前面《组件拆分》一节已经演示过了。基本原则如下：

到 components 文件夹下，创建

```
mkdir CommentBox/
```

里面放组件文件，CommentBox.js 和对应的 css 文件，comment-box.css

总之

- 组件文件名用骆驼字体，首字母大写
- 对应的 css 文件，全部小写，中划线隔开。
