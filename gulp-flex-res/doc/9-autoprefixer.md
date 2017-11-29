# autoprefixer 添加厂商前缀

gulp 任务其实一般都是多个一块用，连成一条链的。前面介绍了 gulp-sass 来处理 sass ，这一集来给处理出来的 css 加上厂商前缀（ vendor prefix ），用到 gulp-autoprefixer 这个包。


### 什么是厂商前缀？

很多 CSS3 的新属性，如果你只是写成下面这样：

```
display: flex
```

有的浏览器下能生效，但是其他浏览器，或者同一浏览器的比较老得版本中就不生效。需要添加厂商前缀。

```
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
```

比如对于 flexbox ，写成上面这样才能达成最佳的浏览器兼容效果。

### 真正靠谱的解决方案

但是手动添加厂商前缀几乎是不可能的，因为规则很复杂，无规律。很多工具里面都可以自动补全厂商前缀，但是如果不是社区活跃维护的工具是不值得用的。因为厂商前缀会随着时间的推移而改变的（注意有时候是来回变，不一定是越来变得越少）。 Peter 认为目前业内万众归心的解决方案就一个，使用 [autoprefixer](https://github.com/postcss/autoprefixer) 。  可以在[浏览器内使用](http://autoprefixer.github.io/) ，但是最方便的方式当然是用 [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) 命令行方式使用了。

autoprefixer 是基于 [caniuse.com](http://caniuse.com/) 的规则来添加厂商前缀的。caniuse 是咱们每天都用的，所以 autoprefixer 的处理结果当然也是值得信赖的。

### 强大的 gulp 管道线

进入项目，添加 gulp-autoprefixer 进来

```
$ cnpm i -D gulp-autoprefixer
```


### 视频中的 gulpfile.js

```
var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('sass', function(){
  gulp.src('src/main.scss')
      .pipe(sass())
      .pipe(prefix())
      .pipe(gulp.dest('dist/'));
});

gulp.task('copy-assets', function(){
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['sass', 'copy-assets']);
```

注：`prefix()` 之中其实还可以传入参数，来设置要支持那些浏览器版本。细节可以参考 [官网](https://github.com/postcss/autoprefixer) ，不过一般保留默认值就可以了。

### 结语

这样，每次在输出的 main.css 中，都可以看到 vendor prefix 自动添加。后面我们在写 scss 的时候，关于厂商前缀这一步，就可以高枕无忧了。
