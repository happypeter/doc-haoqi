# 使用 gulp-sass

gulp 是一个非常强大的自动化任务处理系统，功能多多。这一集我们用它来运行 gulp-sass 插件，进行 [Sass](http://sass-lang.com/) 文件的编译。

Sass 是 CSS 的一个“扩展语言”，功能比 CSS 多，强大，但是同时 Sass 写得代码反而会比 CSS 更加自然和易懂。Sass 语法的文件浏览器是不能直接运行的。

### 安装 gulp

前提是 nodejs 已经装好。这样，先来把 gulp 全局安装一次

```
$ cnpm i -g gulp
```

这样的目的是为了拥有 gulp 这个系统命令。注：`cnpm` 就是 npm ，只不过是使用了淘宝的镜像的 npm 。

然后，新建项目，比如

```
$ mkdir project
$ cd project
```

进入项目后，还要把 gulp 在项目内安装一次

```
$ cnpm init # 生成一个 package.json 文件
$ cnpm i -D gulp # -D 等价于 --save-dev
```

这样做的目的是，保证项目内部的 gulpfile.js 中，使用 `require('gulp')` 的时候不会报错。

### 安装 gulp-sass

到项目文件夹内

```
cnpm i -D gulp-sass
```

注意，gulp-sass 依赖于 libsass ，这是一个 C++ 的包，需要在本地编译，所以要确保本地 Mac 机器上是有 Xcode 的( Linux 系统上要先安装 g++ ，执行 apt-get install g++ ，或者 yum install g++ 这样的命令 )。 装好之后，gulpfile.js 中写下面的内容

```
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  gulp.src('src/main.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/'));
});
```

这样每次运行 `gulp sass` 就可以把 main.scss 文件，编译输出为 main.css 了。


### 结语

有了 gulp-sass ，你和 sass 距离就是一个装包命令。
