# 使用 imagemin 来压缩图片

有了 imagemin ，压缩图片现在变得非常的简单了。

### 装包

```
npm i -D  gulp-imagemin imagemin-pngquant
```

需要安装两个包，一个是 [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) ，另一个是 [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) 。

gulpfile.js

```js
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')

gulp.task('imagemin', function() {
  return gulp
    .src('src/img/*')
    .pipe(
      imagemin({
        use: [pngquant()]
      })
    )
    .pipe(gulp.dest('dist/img'))
})
```

导入 imagemin 和 pngquant ，添加一个新的 gulp 任务 `imagemin` ，里面把 `src/img/` 文件夹下的图片作为输入，通过 imagemin 进行压缩。src/img 文件夹下放一张 PNG 图片便于测试。

命令行中，执行 `gulp imagemin` 命令，可以看到对 png 图片，压缩效果很棒。
