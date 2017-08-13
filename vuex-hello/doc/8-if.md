### 应对初始数据为空

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
    return this.post && Object.keys(this.post).length !== 0
  },
```
