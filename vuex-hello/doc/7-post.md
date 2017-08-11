# 添加另一类数据

添加 post 数据进来。

使用 vue 也有不太爽的地方：

```
<ul>
  <li v-for="comment in posts">
    <router-link :to="'/post/' + comment.id" class="post">
      {{ comment.title }}
    </router-link>
  </li>
</ul>
```

这个 `:to=xxx` 部分就比较不如 JSX 中最直接的使用 JS 来实现来得简单通用。


### 使用 Getters

参考：

- https://vuex.vuejs.org/en/getters.html
- 官方的：shoppingCart 代码


第一，到 modules/post.js 中添加 Getters

```
// getters
const getters = {
  allPosts: state => state.all,
  getPostById: (state, getters) => (id) => {
    return state.all.find(post => post._id === id)
  }
}
...
export default {
  state,
  mutations,
  actions,
  getters
}
```

第二，到 Home.vue 中使用一下 allPosts 这个 Getter

```
computed: {
  ...mapGetters({
    posts: 'allPosts'
  })
}
```

这样就可以直接使用 posts 了，例如：

```
<li v-for="post in posts">
```

第三，到 PostBody.vue 中使用一下带参数的 Getter


可以写成这样

```
computed: {
  ...mapGetters([
    'getPostById'
  ]),
  post: function () {
    return this.getPostById(this.postId)
  },
```

或者等价的，写成：

```
computed: {
  post: function () {
    return this.$store.getters.getPostById(this.postId)
  }
},
```


### 解决 Post.vue 刷新报错

v-if 是正解：https://forum.vuejs.org/t/any-better-way-than-v-if-to-render-content-that-is-temporarily-undefined/5327

直接打开 `/post/xxxx` 刷新一下页面，终端中会报错

```
likes of undefined
```

原因就是，初始状态，store 中的 posts 还没有加载。

页面显示是正常的，但是也挺恶心。解决方法是

```
<div v-if="show" class="post-body">
...
computed:
  show: function () {
    return this.post && this.post.length !== 0
  },
```


### 点赞功能
