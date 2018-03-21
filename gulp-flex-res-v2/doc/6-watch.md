# gulp watch 模式

每次修改代码都需要再次运行 gulp ，很麻烦，所以来添加一下 gulp 的 watch 模式 。

### 基本配置

gulpfile.js

```js
gulp.task('watch', function() {
  gulp.watch(['src/*.html'], ['copy'])
  gulp.watch(['src/css/*.scss'], ['sass'])
})

gulp.task('default', ['sass', 'copy', 'watch'])
```

添加一个新任务 `watch` ，监控 src 下的所有 html 文件，如果有了修改，就拷贝到 dist 文件夹。监控所有的 scss 文件，如果有了修改就执行 `sass` 任务重新编译。

命令行中，重启 gulp 命令，可以看到进入了 watch 模式，每次修改 html 和 scss ，都可以自动进行编译了。

### 防止崩溃

如果 sass 代码写错，比如少写了末尾的分号，watch 模式就会直接崩溃。

gulpfile.js

```js
function handleError(err) {
  console.log(err.toString())
  this.emit('end')
}

gulp.task('sass', function() {
  gulp
    .src('src/css/main.scss')
    .pipe(sass())
    .on('error', handleError)
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(gulp.dest('dist/'))
})
```

gulpfile.js 中添加错误处理就可以解决这个问题。添加 `handleError` 函数，下面在 `sass` 任务中，sass 处理之后的数据流，添加错误处理。

命令行中，可以看到现在如果 sass 代码有错，watch 模式会报错，但是不会退出，一旦错误修复，代码又可以自动编译了。
