# 搭建基本环境

https://github.com/vuejs/vue-cli


相比于 create-react-app 的单一化配置，vue-cli 的这种有默认官方配置可以选择，同时可以非常方便的定制自己的开发环境模板的能力，让人眼前一亮。


### 创建 Github 项目


 github.com 上添加一个  vuex-hello-demo 仓库。



### 基本环境代码


```
vue-init webpack vuex-hello-demo
```

提示选择的各项：

- 使用 vue-router
- 采用 [Standard 代码规范](https://standardjs.com/)，因为我不想敲分号
- 测试相关的都选 No
- 其他保留默认


注意：非常喜欢 vue-cli 环境对代码规范的强制执行，规范有误，直接就是项目根本起不来。


```
cd vuex-hello-demo
npm i
npm run dev
```

这样就可以启动项目开发环境了。

### 写两个组件

接下来到 Post.vue 里面导入两个组件。一个叫做 PostBody ，另外一个叫做 CommentBox 。


Vue 项目中组件创建和使用的方式：

第一，创建 components/PostBody.vue ，里面写基本内容

```
<template>
  <div class="post-body">
    <h1>PostBody</h1>
  </div>
</template>

<script>
export default {
  name: 'post-body',
};
</script>
```

上面的 `name` 一项就是组件名，未来使用的时候就写成 `<post-body></post-body>` Vue 项目中的组件名不强制，但是鼓励使用 `-` 并且小写的形式。


第二，到 Post.vue 文件中，导入，注册，使用，即可：

```
<template>
  <div class="home">
    <post-body></post-body>
  </div>
</template>

<script>
import PostBody from './PostBody';

export default {
  ...
  components: { PostBody },
  ...
};
</script>

```

注意：上面 import 的时候，`./PostBody` 后面不许加 `.vue` 。


我们就演示这两个组件间如何进行数据通信。

[two components](https://github.com/happypeter/vuex-hello-deom/commits)


### 调整 CSS


赞一下：每一个 vue 组件中的 `<style>` 都可以加上 `scoped` 修饰符，这样，保证了本文件的 css 不会影响其他文件。这个非常符合我自己的使用习惯，也很可惜 create-react-app 中默认就没有这个功能。


那么全局的 css 写到哪里呢？参考 [官方的 vue-hackernews](https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/App.vue)，写到 App.vue 文件中。

```
<style>
body {
  margin: 0;
}
```

小贴士：打开 .vue 文件后，文件类型设置成 html ，这样，到 `<script>` 标签内，依然可以使用 emment 补齐的。


下面把页面 CSS 调整一下，以便后续开发：


[two components(css)](https://github.com/happypeter/vuex-hello-demo/commits)


### Tip：打开 .vue 文件时候，切换到 html 语法

这样就可以使用 emmet 补齐了，具体方式就是：

- atom->命令面板->"config" 打开 config.cson 文件
- 添加 core 配置，

```
"*":
  autosave:
    enabled: true
  core:
    customFileTypes:
        'source.html.basic': [
          'vue'
```

即可。
