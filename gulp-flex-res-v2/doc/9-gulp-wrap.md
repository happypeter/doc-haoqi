# gulp-wrap 使用布局文件

把 header 和 footer 抽出成”布局文件“，然后借助 gulp-wrap 来重新组合成页面。

### 新建 build 任务

```
npm i -D gulp-wrap
```

先来装包。

gulpfile.js

```js
const wrap = require('gulp-wrap')

gulp.task('build', function() {
  gulp
    .src('src/pages/*.html')
    .pipe(wrap({ src: 'src/layout/default.html' }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('watch', function() {
  gulp.watch(['src/**/*.html'], ['build'])
  gulp.watch(['src/*.scss'], ['sass'])
})

gulp.task('default', ['sass', 'build', 'watch'])
```

导入 gulp-wrap ，新建任务 `build` ，把 pages 下的各个页面文件套上一个布局文件 `default.html` 。编译后的结果放到 `dist` 文件夹中。这样 `copy` 任务的作用暂时就被替代了，所以 `watch` 任务中，如果 html 有改动，只要执行 `build` 任务即可。下面 `default` 任务对应的各个子任务中也把 `copy` 改为 `build` 。

下面来做 html 的拆分

layout/default.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
...
</head>

<body>
  <div class="wrap">
    <div class="header">
    ...
    </div>
    <div class="content">
      <%= contents %>
    </div>
    <div class="footer">
      ...
    </div>
  </div>
</body>

</html>
```

把原有的 index.html 重命名为 layout/default.html ，里面的 class 名为 `content` 的 div 的内部替换为 `<%= contents %>` ，意味着可以替换成任意其他内容。这样 default.html 就形成了一个各个页面共用的布局文件。

pages/index.html

```html
<h1>首页</h1>
```

创建 pages/ 文件夹存放各个页面的核心内容。页面内容会插入到布局文件的 `contents` 所在的位置。先创建一个 index.html 。

pages/blog.html

```html
<h1>博客</h1>
```

再创建一个 blog.html 。

layout/default.html

```html
      <a href="index.html">
        Home
      </a>
      <a href="blog.html"
        Blog
      </a>
```

回到 default.html 添加对应的页面链接。

运行 `gulp` 就可以编译出多个页面了。

浏览器中，打开 index.html ，看到 footer 的链接可以工作了。
