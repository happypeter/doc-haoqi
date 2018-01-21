# 添加 Vue 组件

本节来添加两个 Vue 组件进来。

打开项目，看到文件虽然多，但是需要我们自己修改的内容都在 src 下， src 是 source 的缩写，意思是源码。

到 src 下，看到 main.js ，它是整个程序的入口。打开 main.js ，里面看到导入了 App 组件，并且挂载到了 id 为 app 的 html 节点上。

类似于 App 这样的 vue 组件都是以 .vue 为后缀的，里面内容分三类：

- 模板， template 标签内
- JS 代码， script 标签内
- CSS ，写到 style 标签内

可以看到 App 中内容不少，关键是导入了另外一个组件 HelloWorld 。

[App.vue](https://github.com/haoqicat/vuex-hello-v2/commit/3a35e6284b32ddfef51f4d283c7c073d16e91e4b#diff-ea994a51b0d9884f4fc046eca11a5c99)

```js
<template>
  <div>
    HelloWorld
  </div>
</template>
```

我先来写一个 Hello World ，把 script 和 style 的内容全部删除，。然后在 App.vue 的 templete 里面写一个 div 标签，里面写 hello world 字符串。

把 src 下的 components 和 assets 文件夹也删除

```
rm -rf components assets
```

浏览器中，可以看到 HelloWorld 字符串。

### 导入组件

下面来把 HelloWorld 字符串，独立抽出成一个组件来使用。

[HelloWorld.vue](https://github.com/haoqicat/vuex-hello-v2/commit/892225fed0627366f63638751e7120545d6377b3#diff-4736853c62ba81ab6486ff1f0c13eada)


```js
<template>
  <h1>Hello</h1>
</template>

<script>
  export default {
    name: 'HelloWorld' 
  }
</script>
```

要显示的内容 Hello 放到 template 标签下。现在还缺少组件名，所以到 script 标签下，export default 导出一个对象，里面 name 属性就用来指定组件名，这里给一个字符串 HelloWorld ，这个就是当前组件名了。


[App.vue](https://github.com/haoqicat/vuex-hello-v2/commit/892225fed0627366f63638751e7120545d6377b3#diff-ea994a51b0d9884f4fc046eca11a5c99)

```js
<template>
  <div>
    <HelloWorld />
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  export default {
    components: {
      HelloWorld
    }
  }
</script>
```

到 App.js 中，使用组件就是用标签包裹组件名即可。但是 script 标签内要进行导入。导入 HelloWorld ，export default 后面跟的对象中，这次用 components 属性，来声明一下当前组件都会使用哪些子组件。components 的值是一个对象，现在先添加一项  HelloWorld 。

这样，定义，导入，使用的代码都有了。

到浏览器中，看到 HelloWorld 组件正确的显示出来了。

### 写两个组件

把 HelloWorld.vue 改名为 Post.vue ，用来显示一篇文章。

[App.vue](https://github.com/haoqicat/vuex-hello-v2/commit/ad92fc35c427dce6bce3e78130b1495e2a2692ee#diff-ea994a51b0d9884f4fc046eca11a5c99)

```js
<template>
  <div class="home">
    <Post />
  </div>
</template>

<script>
import Post from './components/Post'

export default {
  name: 'app',
  components: {
    Post
  }
}
</script>
```

到 App.vue 中，把各个 HelloWorld 的地方，都改成 Post 。

[Post.vue](https://github.com/haoqicat/vuex-hello-v2/commit/ad92fc35c427dce6bce3e78130b1495e2a2692ee#diff-f1a6107427a67b328a6ae8e35eb61b86)

```js
<template>
  <div>
    <PostBody />
    <CommentBox />
  </div>
</template>

<script>
  import PostBody from './PostBody'
  import CommentBox from './CommentBox'
  
  export default {
    name: 'Post',
    components: {
      PostBody,
      CommentBox
    }
  }
</script>
```

Post.vue 中，使用两个组件 PostBody 和 CommentBox ，下面 script 标签内，导入这两个组件，并且声明这两个组件。

[PostBody.vue](https://github.com/haoqicat/vuex-hello-v2/commit/ad92fc35c427dce6bce3e78130b1495e2a2692ee#diff-2ad1eda28c5d1ad16c0678963fde344b)

```js
<template>
  <h1>PostBody</h1>
</template>

<script>
  export default {
    name: 'PostBody'
  }
</script>
```

创建 PostBody.vue，里面写一个字符串。

[CommentBox.vue](https://github.com/haoqicat/vuex-hello-v2/commit/ad92fc35c427dce6bce3e78130b1495e2a2692ee#diff-973b8a21f7787152d40923e7df42e001)

```js
<template>
  <h1>CommentBox</h1>
</template>

<script>
  export default {
    name: 'CommentBox'
  }
</script>
```

添加 CommentBox.vue ，里面也是一个字符串。

浏览器中，可以看到 PostBody 和 CommentBox 两个字符串。

### 调整 CSS

[Post.vue]

```html
<template>
  <div class="post">
    ...
  </div>
</template>

<style scoped>
  .post {
    background-color: #00bcd4;
  }
</style>
```

每一个 vue 组件中的 `<style>` 都可以加上 `scoped` 修饰符，这样，保证了本文件的 css 不会影响其他文件。这个非常符合我自己的使用习惯，也很可惜 create-react-app 中默认就没有这个功能。


[App.vue]()

```
<style>
  body {
    margin: 0;
  }
</style>
```

那么全局的 css 写到哪里呢？参考 [官方的 vue-hackernews](https://github.com/vuejs/vue-hackernews-2.0/blob/master/src/App.vue)，写到 App.vue 文件中。


### 完善样式

Post.vue

```js
<template>
  <div class="post">
    <div class="upper">
      <PostBody />
    </div>
    <div class="bottom">
      <CommentBox />
    </div>
  </div>
</template>

<style scoped>
  .post {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .upper {
    display: flex;
    min-height: 40vh;
    background-color: #00bcd4;
  }
  .bottom {
    display: flex;
    flex-grow: 1;
    background-color: rgba(240, 240, 240, .5);
  }
</style>
```

class 名为 post 的 div 包裹两兄弟 upper 和 bottom ，两兄弟中分别放 PostBody 和 CommentBox 。

style 标签中写样式。

post 设置为 display flex 同时内容垂直排列。高度沾满整个可见区域。

upper 设置 display: flex ，是为了防止 margin 重叠等各种问题，暂时没作用。最小高度40vh ，给一个蓝色作为背景。

bottom 这个大块的作用也是提供背景色，flex-grow: 1 ，保证了，它能占据页面上 upper 剩下的所有高度。

CommentBox.vue

```html
<template>
  <div class="comment-box">
    CommentBox
  </div>
</template>

<style scoped>
  .comment-box {
    background-color: #fff;
    width: 400px;
    min-height: 30vh;
    margin: 20px auto;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  }
</style>
```

CommentBox 中，添加 class 名为 comment-box 的 div ，下面，在 script 标签内，选中这个 class 名。背景色设置成白色，宽度400，最小高度30vh ，居中，给一个好看的阴影效果。


PostBody.vue

```js
<template>
  <div class="post-body">
    hhh
  </div>
</template>

<style scoped>
  .post-body {
    background-color: #fff;
    width: 400px;
    min-height: 30vh;
    margin: 20px auto;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
  }
</style>
```

和 CommentBox 中完全一样的思路，也做出一个大白纸片的效果。

浏览器中，看上去不错。
