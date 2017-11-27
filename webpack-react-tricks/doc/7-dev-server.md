# 使用 webpack-dev-server 辅助开发

前面我们使用直接用 chrome 打开 index.html 的形式来运行我们的项目，其实这个是很不专业的，
浏览器的 console 中一直报警告，提示我们要使用一个 http server 来启动项目。实际情况是如果
我们用到 react-router 的一些功能，如果不启动 http server 项目根本就跑不起来。

这集我们就来使用 webpack-dev-server 。它就是一个基于 express 框架写的一个 http server ，
同时它是专门用来配合 webpack 使用的，所以可以给我们的开发提供很多实用的便利。


### 安装配置

首先要来装包

```
cd webpack-es6
npm i --save webpack-dev-server
```

修改 package.json 中的 scripts 中的 `dev`

```
---    "dev": "webpack -w"
+++    "dev": "webpack-dev-server"
```


浏览器中访问 localhost:8080/webpack-dev-server 就可以看到项目正常运行了。可以看到的是，只要我们的 index.html 放到了项目的顶级位置，webpack-dev-server 就可以找到它。同时代码也自动被监控了，每次代码修改保存之后，代码都会重新被编译，并且浏览器可以自动刷新页面，看到新代码的运行效果了。index.html 中的指向 bundle.js 的链接需要改一下位置：

```
--- "./dist/bundle.js"
+++ "/bundle.js"
```

### inline 模式

另外，打开的 localhost:8080/webpack-dev-server 这个页面中顶部有个状态条，如果我们不想要的话，可以打开 package.json 在稍微做一下修改

```
--- "dev": "webpack-dev-server"
+++ "dev": "webpack-dev-server --inline"
```

后台重启一下 `npm run dev` 可以看到这次输出信息让我们打开的链接就是：localhost:8080 （没有后面的 /webpack-dev-server 了）。并且这次页面打开后，就没有顶部的状态条了。同时，代码自动编译和浏览器自动刷新的功能是照旧可以使用的。


### 结语

webpack-dev-server 之上，是可以跑很酷的开发辅助性的功能的，其中一个就是“模块热替换”，这个我们后面会去演示。
