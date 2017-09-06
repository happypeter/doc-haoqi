# 复用 form 组件

本节制作 Signup 和 Login 两个展示组件。主要的一个大技巧是如何复用 form 。关于复用 css ，我越来越支持的一句话

>要以组件为单位来复用

而不要定义一些全局的 css ，然后到各个组件中通过使用相同的 class 名来完成样式复用。那样就是自己挖坑自己跳了。

### 动手步骤

- 首先抽离出 Form 这个组件，Signup.js 和 Login.js 中都会用到
- 通过往 From 组件中传递 fileds 数据，生成不同的 inputList
- CSS 做好
- 如何拿到各个 from input 中用户提交的数据

视频中有详细的演示。

### 总结

好的组织结构，就会带来难度大（用到的知识点多），但是复杂度低（代码结构简单，DRY）的代码。