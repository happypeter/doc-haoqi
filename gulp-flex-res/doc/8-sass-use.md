# sass 的三大作用

Sass 是目前前端高手的标配，为何 Sass 如此流行呢？我觉得有下面三大技巧会让人觉得相见恨晚。

### 必备三大技巧

sass 的功能挺多，我觉得最重要的有三个：

- 第一，变量使用。
- 第二，语句嵌套。
- 第三，文件拆分。


视频中有详细演示。另外，sass 还有 mixin 等其他功能，见 [sass 基本语法-中文参考资料](http://www.sass.hk/sass-course.html) 。

### 视频中用到的 gulpfile.js

代码如下：

```
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  gulp.src('src/main.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/'));
});

gulp.task('copy-assets', function(){
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['sass', 'copy-assets']);
```

### 总结

会了上面这三招，sass 也就算基本学会了。
