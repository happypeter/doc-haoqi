# 创建一个 express 应用

本节就是来生成一个项目脚手架，给后续添加评论功能做准备。

### 创建脚手架

如何快速的搭建一个 express 应用，官方文档推荐安装 express-generator，请参考[文档](https://github.com/expressjs/express)

```
npm install -g express-generator@4
```

安装完毕之后，就可以使用 express 命令创建应用了，比如说应用名为 myapp

```
express myapp
```

命令执行完成后，会生成一个 myapp 的目录

### 安装依赖包

```
cd myapp
npm install
```

这样就可以把 package.json 文件中列出的依赖包一下子全部安装了。

### 启动服务器

```
npm start
```


这时候，就可以访问 <http://localhost:3000> 查看页面了
