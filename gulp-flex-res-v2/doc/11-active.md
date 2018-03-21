# 实现 tab 选中状态

添加一些 js 代码，实现 footer 中各 tab 项的选中状态。

### 修改 gulpfile

src/main.js

```js
console.log('I am main.js')
```

src/layout/default.html

```html
  <script type="text/javascript" src="./main.js"></script>
</body>
```

到布局文件中，body 结束标签之前，添加对 `main.js` 的导入。

gulpfile.js

```js
gulp.task('browser-sync', ['build', 'sass', 'copy'], function() {
  ...
})

gulp.task('copy', function() {
  gulp.src('src/main.js').pipe(gulp.dest('dist/'))
})

gulp.task('watch', function() {
  ...
  gulp.watch(['src/main.js'], ['copy'])
})
```

gulpfile 中，现在要用到 copy 任务了，因为需要把 main.js 拷贝到 `dist` 文件夹中。`watch` 任务中再来添加一条语句，以便我们修改 main.js 之后，可以自动执行 `copy` 任务。

执行 `gulp` 命令。

浏览器中，打开开发者工具的 console ，可以看到 main.js 成功执行了。

### 写 js 代码

src/main.js

```js
const selector = '.footer a'
var elements = document.querySelectorAll(selector)
Array.prototype.forEach.call(elements, function(el) {
  const path = document.location.pathname.split('/')
  const page = path[path.length - 1]
  const href = el.getAttribute('href')
  if (href === page) {
    const className = 'active'
    if (el.classList) el.classList.add(className)
    else el.className += ' ' + className
  }
})
```

首先，选择器设置为 `footer a` ，这样通过 `querySelectorAll` 选中的是布局文件中 footer 中的四个链接元素。

通过 `forEach` 进行迭代，回调函数的参数中 el 会赋值为每一个链接元素。回调函数中，首先拿到 url 路径中保存的当前页面名，例如 index.html 或者 blog.html ，保存到 `page` 变量中。接下来，通过 `getAttirbute` 拿到当前元素的 `href` 属性对应的值，可能是 index.html 或者 blog.html 。这样，通过 `if` 进行判断，哪个链接元素的 `href` 值如果和 url 中的页面名相等，就给这个链接添加上一个新的 class 名： `active` 。

src/css/layout.scss

```
.footer {
  ...
  a.active {
    border-bottom: 4px solid $accent-color;
  }
}
```

添加 css ，处于 `active` 状态的 tab 项，下面加一个 border 。

浏览器中，看到当前页面对应的 tab 项目下面有了高亮下滑线了。
