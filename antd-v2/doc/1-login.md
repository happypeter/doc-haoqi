# 创建登录页

欢迎来到新的一关《创建登录页》。后台管理系统一般一进来就是个登录页，这集来把样式完成，先不做功能。

### 创建项目

进入《创建项目》这个任务。参考[官网文档](https://ant.design/docs/react/use-with-create-react-app-cn) 即可。

创建一下新项目

```
create-react-app admin
```

调整项目文件夹。删除整个 src ，然后自己添加 src/index.js 文件。

change-org---

还添加了容器组件 App 。

看看达成的效果，页面在3000端口运行起来了。

### 添加组件

进入《添加组件》这个任务。先把我自己常用的一些 starter 代码运行起来。

添加展示组件和容器组件。

con-com---

上面的代码是我的常用写法，所以定义了编辑器代码片段来完成。

要运行起来需要安装一些包

```
npm i react-redux redux redux-thunk styled-components redux-logger
```

分别是 redux 相关的三个包，还有写样式用的 styled-components 。

还要把 redux 的一些基础代码添加进来。

redux-things----

一些非常常见的写法，包括 store 文件，reducer 文件，常量文件 ActionTypes 等等。

看看达成的效果。这样页面上 Home 组件就成功运行起来了。

### 运行 antd 的按钮组件

进入《运行 antd 的按钮组件》这个任务。按照[官网教程](https://ant.design/docs/react/use-with-create-react-app-cn)跑一个基本组件。

先来装包

```
npm i antd
```

安装了3.0版本的蚂蚁设计。

添加 Button 组件

add-btn---

导入并使用了 Button 组件。

还需导入 css 才行。

add-css---

全局 css 我会放到 assets/global.css 文件中。这里导入的这一行，意思是我们装了一个包叫 antd 里面有个 dist 文件夹，里面真的是有一个 antd.css 文件的。官网上有专门的 [Button 按钮的文档](https://ant.design/components/button-cn/) 可以随时查阅。

看看达成的效果。页面上，一个美观的按钮就运行起来了，点一下看看，有动效的。

### 使用 styled-components

进入《使用 styled-components》这个任务。styled-components 最酷的地方是我们不需要重复写 div clasName=xxx 了，页面上减少了很多噪音。

改写一下已有样式。

styled---

首先，一个普通的 html 标签，例如 div ，可以用 styled.div 这种形式来添加样式。已经写好的组件，例如这里的 Button ，也可以用 styled-components 来进一步添加样式，不过这次不是点了，而是 styled(Button)。这个可以参考 [官方文档上的说明](https://www.styled-components.com/docs/basics#styling-any-components) 。


看看达成的效果。

### 添加表单

进入《添加表单》这个任务。参考 [表单官方文档](https://ant.design/components/form-cn/) 。

首先添加一个 Input 进来。

first-input---

导入 Input 和 Icon 进来，然后通过 prefix 等于 xxx Icon 的形式来添加前置图标，如果要添加后置图标这里就是 suffix 了，可以通过 Icon 属性来指定图标类型，我们这里写 user ，就会显示成一个小用户图标，也可以用 style 属性来指定样式。

表单内的每一项内容要写到一个[表单域](https://ant.design/components/form-cn/#表单域) Form.Item 中。

form-item---

导入表单进来，同时添加了一个图标为 lock ，类型为 password 的 input 来输入密码，这样表单中一共就有三个元素了，分别用表单域包裹起来。

看看达成的效果。页面上看到了一个完整的登录表单。表单还有很多功能，后面我们会继续介绍。

至此，《创建登录页》这一关就通过了。
