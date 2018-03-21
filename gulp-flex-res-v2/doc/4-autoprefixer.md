# autoprefixer 添加厂商前缀

gulp 任务其实一般都是多个一块用，连成一条链的。前面介绍了 gulp-sass 来处理 sass ，这一集来给处理出来的 css 加上厂商前缀（ vendor prefix ），用到 [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) 这个包。

### 强大的 gulp 管道线

src/css/common.scss

```
* {
  box-sizing: border-box;
}
```

首先到 common.scss 中，写一些需要加前缀的代码。

```
npm i -D gulp-autoprefixer
```

安装 `gulp-autoprefixer` 到开发环境。

gulpfile.js

```js
const autoprefixer = require('gulp-autoprefixer')

gulp.task('sass', function() {
  gulp
    .src('src/main.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions']
      })
    )
    .pipe(gulp.dest('dist/'))
})
```

gulpfile 中，把被 sass 处理过的数据流再通过管道线传递给 `autoprefixer` 处理一下即可。

命令行中，执行 `gulp` 命令。dist/main.css 中，可以看到厂商前缀已经加上了。
