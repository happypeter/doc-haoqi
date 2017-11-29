# Npm Scripts

这一集瞄准 npm scripts ，也就是 npm 脚本。这个应该说不是 webpack 的知识，而是 npm 自己的功能。
但是用 webpack 的时候，大家都习惯用上 npm 脚本，所以这里咱们来一块聊聊。

### Npm Scripts 基本运行原理

基本的道理其实就是，命令行使用虽然难，但是好处是一旦一个长长的命令我们会用了之后，其实完全没有必要去
每次都敲的，而是可以通过一个代号来呼叫执行。这个很类似于 bash 之中我们使用 alias （别名）功能。

实际上创建一个 npm 脚本非常的简单：

```
cd project/
npm init -y
```

这样会创建一个 package.json 文件，而添加 npm 脚本就是在这个文件里面。打开这个文件，会看到

```
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

上面的 `test` 这一项其实就是一个 npm 脚本了，我们可以运行

```
npm run test
```

来运行 test 这个脚本，那么可以想到，真正得到执行的就是冒号后面的那一串长长的系统命令了。


### 智能路径

现在我们来做一件事情，就是把系统上全局安装的 webpack 卸载掉

```
npm uninstall -g webpack
```

这样，后续再打开新的命令行窗口，执行 webpack 命令的时候，就会报错，说 `Command Not Found` 找不到
这个命令。但是好消息是我们对 webpack 还进行了项目内的局部安装，所以如果命令行中执行

```
cd webpack-es6/
./node_modules/.bin/webpack
```

一样可以执行 webpack 进行项目的编译。如果我们把上面的命令写成 npm 脚本，那么执行起来就会方便很多，修改
package.json 的 scripts 这一项，改成下面这样：

```
"scripts": {
  "build": "./node_modules/.bin/webpack"
},
```

这样，我们只要执行

```
npm run build
```

就可以成功编译项目了。别急，还有更帅的，我们可以把它叫做“智能路径”，就是对于当前项目的
node_modules 中安装的命令， npm 脚本是可以直接查找到的，不需要输入详细的路径。所以
上面的脚本还可以改为：

```
"scripts": {
  "build": "webpack"
},
```

达成的效果是一样的。


### 添加更多脚本

在进行开发的时候，我们会希望每次我们改动源码，webpack 都能自动帮我们编译项目项目，通过 webpack 的
`--watch` 选项（可以简写为 `-w`），这个效果是可以达成的。所以，我们的 package.json 中可以写成这样：

```
"scripts": {
  "build": "./node_modules/.bin/webpack",
  "dev": "webpack -w"
},
```

现在，有了 `dev` 这个脚本，开发项目的时候，只需要运行

```
npm run dev
```

然后每次修改 js 代码，webpack 都可以跟踪到，会自动进行编译，生成新的 bundle.js 文件的，这样到浏览器中
只需要刷新一下，就可以看到新代码的运行效果了，方便了许多。


### 支持简写形式的脚本名

有几个脚本名是支持简写形式的，例如 start, stop, restart 和 test 。也就是

```
npm run start
```

可以简写为

```
npm start
```

可以省略 `run` 。


实际中，我们的项目中一般跟 package.json 平级的位置，还会创建一个  server.js 脚本，里面启动一个
简单 http server 用来运行项目，我们这里先随便写点内容：

```js
console.log('http server running...');
```


这时候，我只要运行

```
npm start
```

就可以看到打印信息，说明 sever.js 已经被执行了。


### 更多技巧

上面我只是演示了一些常用的技巧，其实如果我们参考 [Npm 官网上对 npm script 的介绍](https://docs.npmjs.com/misc/scripts) 和 [阮一峰的相关博客](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html) 会发现有很多其他的技巧。例如，如果我的 package.json 中
一个 npm script 都不写，那么，运行

```
npm start
```

就默认等价于执行

```
node server.js
```

了。当然这时候要求我们的项目内有 server.js 文件。
