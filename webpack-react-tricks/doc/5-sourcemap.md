# 使用 Sourcemap 提供准确报错位置

Sourcemap 是每个用 JS 的人都应该会的知识点，即使你不用 Webpack-React 这一套。
这集来聊聊什么是 Sourcemap ，已经 Webpack 下如何配置使用。

### 什么是 Sourcemap ？

Sourcemap 的字面意思就是”代码映射“，意思是指把编译后的 output.js 中的代码行数”映射“到
编译前原始代码的每一行。

通常我们开发的时候，一个项目会有几十个或者更多的 js 文件，但是放到浏览器中去执行的时候，由于 HTTP 链接
数量的限制，同时加载太多 JS 文件会导致页面渲染太慢，所以实际的做法一般都是经过一定的**预处理**，把多个
js 文件打捆成为一个 output.js 文件（过程中会进行压缩代码等其他优化加载速度的操作），然后再去真正执行。

但是这样问题就出现了，一旦 output.js 文件运行出错，那么浏览器 console 中只会报出这样的错误：

```
ERROR：output.js:3452
```

我们没有办法去知道到底我们的代码错误是在原始代码的哪个文件的哪一行，所以给调试带来很大麻烦。那么这个问题的
解决方法就是使用 Sourcemap ，有了 sourcemap ，编译的时候就会生成一个 output.js.map 文件，里面指明了
output.js 中的每一行都对应（映射）原始文件中的哪一行代码，这样，一旦运行报错，报错信息也会变为

```
ERROR：App.js:7
```

定位错误就变得 so easy 了。


### 实际操作：区分“编译错误”和”运行时错误”

当前条件下我们的环境中没有 Sourcemap 的功能，这样如果改错一个地方，例如 App.js 中

```
--- <div>
+++ <dv>
```

做出一个这样的错误来。运行 Webpack 编译，直接编译就过不去，终端中就会报错：

```
bundle.js  755 kB       0  [emitted]  main
    + 179 hidden modules

ERROR in ./src/App.js
Module build failed: SyntaxError: Expected corresponding JSX closing tag for <dv> (8:6)

   6 |       <dv>
   7 |         App
>  8 |       </div>
     |       ^
   9 |     )
```

你可能会说，这不是有 Sourcemap 功能么？错误不是准确指向了 App.js 的第八行了么？答案是：这个不算。
现在 bundle.js 都还没有生成，所以错误当然是报出原始文件位置了。需要到代码真正运行到浏览器的时候出错，
也就是出现**运行时错误**的时候，才会用到 Sourcemap 功能。

现在，把上面的错误改正，然后我们改 App.js 中的另外一个地方：


```
--- import React , { Component } from 'react';
+++ import { Component } from 'react';
```

也就是把上面的 `React` 删除了，这次，运行 webpack 进行编译是可以成功生成 bundle.js 文件的。

但是运行的时候会出错：

```
Uncaught ReferenceError: React is not defined bundle.js:21566
```

上面错误的意思：未捕捉的“引用错误”：React 没有被定义。报错位置是 bundle.js 文件的第 21566 行。
你说这样的行数对于咱们找 bug 有啥用？

### 操作：生成 .map 文件

有了 Webpack 生成 .map 文件就很容易了，只需要在 webpack.config.js 中添加一行的内容：


```js
module.exports = {
  devtool: 'source-map',
  ...
}
```

重新运行 webpack 命令，可以看到 dist 文件夹下生成了 bundle.js.map 文件了。嗯，看来有戏。

到 Chrome 终端中，打开 Console 继续看到报错，但是这次的报错信息就变成了：

```
Uncaught ReferenceError: React is not defined App.js:6
```

大功告成！欧耶！
