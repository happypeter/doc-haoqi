# 使用 font-awesome 图标

来给 header 和 footer 中添加图标。


### 所有代码

[font-awesome](https://github.com/happypeter/flex/commit/e99a2252e57a5dd253338b4dd1cd4d368988e1ae)

### font-awesome

[官网](fontawesome.io) 上的 CDN 加载太慢，所以使用国内提供的 CDN 吧，在 <http://www.bootcss.com/p/font-awesome/> 。


### flexbox 技巧

让各个 item 宽度统一，要用到

```
flex-grow: 1;
```

也用到了 flex-shrink 和 align-item 的技巧，详细讲解可以参考 <http://flexbox.io> 的内容。

### gulp sass 任务 handleError

代码如下

```
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('sass', function () {
    return gulp.src('src/style/main.scss')
        .pipe(sass()).on('error', handleError)
...
});
```

有了上面这些内容，当我们不小心 scss 语句敲了一半的时候，误点了 save ，后台 gulp 就不至于死掉了。
