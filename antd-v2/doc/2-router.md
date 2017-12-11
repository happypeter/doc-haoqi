# 提交表单

欢迎来到新的一关《提交表单》。看到表单中如何拿到数据，如何触发 action ，同时如何在 action 中实现页面跳转。

### 呼叫提交函数

进入《呼叫提交函数》这个任务。

添加 handleSubmit 函数

handleSubmit---

跟普通的 Form 一样，添加 onSubmit 事件即可。但是如果不加 htmlType=submit 那么点按钮就不会有任何反应，因为蚂蚁设计的按钮的 type 属性用来干别的了，为了区分，所以这里写 htmlType ，可以参考 [官方的 Button 文档](https://ant.design/components/button/) 上对 htmlType 的说明。

看看达成的效果。这样页面中点提交按钮，就可以看到 handleSubmit 函数中的打印语句已经生效了。

### 获取用户输入

进入《获取用户输入》这个任务。主要来使用蚂蚁设计提供的高阶组件。

getfiledsvalue---

用 Form.create()() 包裹一下当前组件，蚂蚁设计就会往当前组件注入一个新的属性 form ，这个也就是后续操作的枢纽了。handleSubmit 中可以用 this.props.form.getFieldsValue() 来取用户输入，但是默认是拿不到任何值的。需要把每一个 Input 用 ，getFieldDecorator 包裹一下才行。


看看达成的效果。输入内容，然后点提交按钮，终端中可以看到打印的内容了。

### 触发 action 创建器

进入《触发 action 创建器》这个任务。来把拿到的数据交给 action 创建器去处理。

需要添加 authActions.js 来存放 action 创建器。

action---

定义并导出创建器，容器组件拿到，展示组件中去使用，把数据传递给 Action 创建器。

看看达成的效果。输入内容，点提交，login 函数中打印出了用户输入。

### 页面跳转

进入《页面跳转》这个任务。真实的登录还要复杂的多，但是咱们这里就简化了。

先装包

```
npm i react-router
```

包装好了。

添代码进来。

history---

App.js 中添加两条路由规则，其中一个指向 dashboard ，添加 dashboard 的容器和展示组件这个不用说，这里没有使用 react-router 自带的 history 而是到 routerUtils 文件中自己初始化一个 history 对象，目的就是方便在 react-router 够不着的位置，例如 action 文件中使用 history 。

看看达成的效果。点登录，可以跳转到 dashboard 页面。


### 密码校验

进入《密码校验》这个任务。

check-password---

使用了 Promise 的形式，这样我就可以把全局提示写到展示组件中了，而不用到 action 创建函数中去直接呼叫。

看看达成的效果。输入正确的用户名密码，可以跳转到 dashboard 页面，提示信息为登录成功，否则不跳转，显示登录失败。

至此，《提交表单》这一关就通过了。
