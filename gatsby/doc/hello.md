# 跑一个 Hello World

借助 Gatsby 提供的命令行工具和 Hello World 脚手架，快速搭建一个基本的 Gatsby 网站开发环境，跑一个 Hello World。

### 安装 Gatsby 的命令行工具

为了创建网站，我们需要一个命令行工具，先来安装一下。

```
npm install -g gatsby-cli
```

安装完毕之后，我们就可以到命令行中，运行

```
gatsby new mySite
```

这样的命令来创建网站了。

### 下载 Hello World 脚手架

Gatsby 有多个不同类型的[脚手架](https://www.gatsbyjs.org/docs/gatsby-starters/)，我们选择一个功能最简单的 [Hello World](https://github.com/gatsbyjs/gatsby-starter-hello-world) 脚手架，来跑一下。

先来创建：

```
gatsby new gatsby-demo https://github.com/gatsbyjs/gatsby-starter-hello-world
```

上述命令会在当前目录下新建一个 `gatsby-demo` 目录，并且从 GitHub 下载跑起一个 Hello World 网站所需要的文件，同时安装需要的 npm 包。

命令执行完毕之后，进入到 `gatsby-demo` 目录，就可以看到目录中的文件结构了。

### 运行项目

项目创建好之后，执行命令就可以把网站运行起来了。

执行：

```
gatsby develop
```

或者执行命令：

```
npm run develop
```

然后，打开 localhost:8000 网址，在页面左上角会显示 `Hello world!`。

### 总结

这样，一个 Gatsby 的 Hello World 网站就这么跑起来了。
