# 内部 data 使用

这一集不涉及 vuex ，我们只是使用 Vue 组件内部数据（ state ）来达成评论效果。

### 任务一： 显示两条死的评论在页面上。

参考：https://cn.vuejs.org/v2/guide/list.html

到 CommentBox.vue 中

```
<template>
  <div class="comment-box">
    <ul>
      <li v-for="comment in comments">
        {{ comment.content }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'comment-box',
  data: () => ({
    comments: [
      { text: 'Foo' },
      { text: 'Bar' },
    ],
  }),
};
</script>
```

注：

- 在组件中，data 必须写成一个函数。参考：https://cn.vuejs.org/v2/guide/components.html
- 另外，凡是以 v- 打头的都叫[指令](https://cn.vuejs.org/v2/guide/syntax.html#指令)


### 任务二：添加 form

参考：

- https://cn.vuejs.org/v2/guide/forms.html
- https://egghead.io/lessons/vue-create-a-list-component-in-vue-js


### 逆序显示评论

参考： https://vuejs.org/v2/guide/list.html

注意：

```
<li v-for="comment in comments">
  {{ comment.text }}
</li>
```

不要直接用 `comments.reverse()` 。

而要用 https://vuejs.org/v2/guide/computed.html ，

另外，要注意修改 copy ，而不要修改原始数据。
