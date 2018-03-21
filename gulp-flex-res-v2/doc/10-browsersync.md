# browser-sync 页面自动刷新

browser-sync 可以让页面自动刷新，同时也可以让我们在手机上调试样式。

```
npm i -D browser-sync
```

装包。

gulpfile.js

```js
const browserSync = require('browser-sync')

gulp.task('browser-sync', ['build', 'sass'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  })
})

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
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('watch', function() {
  gulp.watch(['src/**/*.html'], ['rebuild'])
  gulp.watch(['src/css/*.scss'], ['sass'])
})

gulp.task('rebuild', ['build'], function() {
  browserSync.reload()
})

gulp.task('default', ['browser-sync', 'watch'])
```

gulpfile 中，导入 browsersync 。新建一个任务 `browsery-sync` 执行这个任务等价于三件事，第一，执行 `build` ，第二，执行 `sass` ，第三，以 `dist/` 文件夹为根目录搭建一个本地 web 服务器。

下面我们要做的配置就是当 html 或者 css 有更新之后，重启 brosersync 以便自动加载新代码。具体的方式，就是到 `sass` 任务中，添加 `browserSync.reload` 代码，这保证了我们一旦修改了 sass 代码，browserSync 可以重启加载新代码。那当我们修改 html 的时候呢？就来执行一个新任务 `rebuild` 。下面定义 `rebuild` ，作用就是 `build` 加上重启 browsersync 。

最后，`default` 中，把 `sass` 和 `build` 两个任务替换为 `browser-sync` 这个任务。

命令行中，运行 `gulp` ，可以看到浏览器会自动打开并显示编译后的页面内容。如果修改 sass 或者 html 源码，修改都会自动体现到浏览器中。

### 连接手机微信

```
ifconfig|grep 192
```

首先查找到电脑的本地局域网 ip 。

确保手机也是通过 wifi 连接，这样电脑和手机就在统一局域网内了。手机微信中打开电脑 ip 的 3000 端口，例如 `http://192.168.1.101:3000` ， 就可以看到，真实手机上网站的运行效果了。
