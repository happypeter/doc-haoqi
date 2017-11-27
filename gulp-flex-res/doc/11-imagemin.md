# 使用 imagemin 来压缩图片

图片压缩以前我都是不弄的，因为嫌麻烦。但是，用上 gulp 系统，现在压缩图片就是写几条语句自动化完成，所以“嫌麻烦”已经不能作为借口了。

### 装包

需要安装两个包，一个是 [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) ，另一个是 [imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant) 。

```
cnpm i -D  gulp-imagemin imagemin-pngquant
```

### gulpfile.js 内容

```
...
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('imagemin', function(){
  return gulp.src('src/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/images'));
});

...
```

### 结语

差不多可以压掉一半，真是很棒！
