# 使用 gulp-sass

gulp 是一个非常强大的自动化任务处理系统，功能多多。这一集我们用它来运行 gulp-sass 插件，进行 [Sass](http://sass-lang.com/) 文件的编译。

### 安装 gulp

```
npm i -g gulp
```

全局安装 gulp ，目的是为了拥有 gulp 这个系统命令。

```
mkdir gulp-flex-res-v2
cd gulp-flex-res-v2
npm init -y
```

新建项目，项目内生成一个 package.json 文件。

### 编译 sass

到项目文件夹内

```
npm i -D gulp-sass gulp
```

gulp-sass 依赖于 libsass ，这是一个 C++ 的包，需要在本地编译，所以要确保本地 Mac 机器上是有 Xcode 的。gulp 还需要在项目内安装一次，这样才能在 gulpfile 中去 require 它。

gulpfile.js

```js
const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('sass', function() {
  gulp
    .src('src/css/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/'))
})
```

项目顶级位置，创建 gulpfile.js 文件。导入 gulp 和 gulp-sass 。新建一个名为 `sass` 的 gulp 任务，这个任务具体要执行的代码都写到了回调函数中。通过 gulp 的 `src` 接口锁定要处理的数据源，这里就是 `src/css/main.scss` ，是一个 sass 文件，数据拿到后，通过管道，也就是 `pipe` 接口传递给 `sass` 去进行格式转换，转换得到的纯 css 文件又通过管道流动到下一个环节，这里我们用 `dest` 接口锁定了目的地位置在 `dist` 文件夹内。

src/css/main.scss

```
.peter {
  .inner {
    color: red;
  }
}
```

再来添加要处理的 main.scss 文件。写一个简单的嵌套格式，用于测试。

命令行中，运行 `gulp sass` 就可以把 `main.scss` 文件，编译输出为`dist/main.css` 了。

## 忽略文件

.gitignore

```
node_modules
dist
```

把安装的第三方文件，和生成的 dist 文件全部忽略掉。便于 vscode 中打开文件，和用 git 进行版本控制。
