# 内部 data 使用

这一集不涉及 vuex ，我们只是使用 Vue 的基本功能来达成评论效果。

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
      { content: 'Foo' },
      { content: 'Bar' },
    ],
  }),
};
</script>
```

注意：在组件中，data 必须写成一个函数。参考：https://cn.vuejs.org/v2/guide/components.html


代码： [show comment list](https://github.com/happypeter/vuex-hello-demo/commits)

### 任务二：添加 form

参考：

- https://cn.vuejs.org/v2/guide/forms.html
- https://egghead.io/lessons/vue-create-a-list-component-in-vue-js


代码： [add form](https://github.com/happypeter/vuex-hello-demo/commits)



### 逆序显示评论

参考： https://vuejs.org/v2/guide/list.html


注意：

```
<li v-for="comment in comments">
        {{ comment.content }}
</li>
```

直接用 `comments.reverse()` 是可以显示出逆序效果的，但是会报出终端警告：

```
you may have an infinite update loop in a component render function.
```

所以，结论是，不要在 template 中对数据再进行更改。


这里，reverse 效果的实现不能用 filter ，因为 filter 必须用在 `{{ }}` 之内。

可以用 methods 来实现。例如：

```diff
<button v-on:click="addComment">添加评论</button>
</div>
<ul>
-      <li v-for="comment in comments">
+      <li v-for="comment in reverse(comments)">
  {{ comment.content }}
</li>
</ul>
@@ -30,6 +30,9 @@
    })
    input.value = ''
  }
+      },
+      reverse (value) {
+        return value.slice().reverse()
}
}
}
```

或者使用 https://vuejs.org/v2/guide/computed.html ，

代码：[reversedComments]()


上面两种方法的使用，都要注意修改 copy ，而不要修改原始数据。
