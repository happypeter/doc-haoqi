# 创建一个 Meteor 应用

Meteor 是目前 Nodejs 社区最为流行的全栈框架。本节看一下如何安装 Meteor，如何创建一个 Meteor 应用。

### 安装 Meteor

安装参考 [这里](https://www.meteor.com/install) ，说到底就是下面一条命令：

```
curl https://install.meteor.com/ | sh
```

这样 Meteor 就装好了。注意：有时候需要翻墙才能安装成功。

### 创建一个新应用

新建一个名为 meteor-react-bird-demo 的应用，执行命令：

```
meteor create meteor-react-bird-demo
```

这样一个简单的 Meteor 应用就有了，进入到应用根目录。可以看到一些自动生成的文件，其中有一个 package.json 文件，记录了开发所依赖的 npm 包的信息。另外，还有一个隐藏的 .meteor 目录，其中记录了开发需要的 Atmosphere 包的信息。

### 启动应用

进入到应用目录，然后运行 `meteor` 命令，启动项目。

```
cd meteor-react-bird-demo
meteor
```

这样，就可以在浏览器中访问 http://localhost:3000/ 页面，浏览运行效果。

查看代码：[创建一个 meteor 项目](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/bc4dec559670eec75b2791f2bd4a6e10d725325a)
