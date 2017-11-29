# Meteor 项目中安装 React

本节来把 React 装上，并写一个 Hello World 组件。

### 安装 react 和 react-dom 包

首先，必须运行下面的命令安装 package.json 文件中列出的 npm 依赖包 meteor-node-stubs，要不然我们的 React 组件不能生效，会在浏览器控制台报告很多的错误信息。本课程使用的 node 版本 v5.4.0，npm 版本 3.3.12 ，不过其他更新或者老一些的版本也都不会有问题，推荐使用 nvm 来安装 node 。

```
npm install
```

然后安装 react 和 react-dom 两个 npm 包，参考文档 install React，打开一个新的终端窗口，在应用根目录下运行命令：

```
npm install --save react react-dom
```

命令中指定的 --save 选项的意思是说所安装的 npm 包是应用在生产环境下运行必需的，其对应的版本信息会存放到 package.json 文件中的 dependencies 标签下。

### 定义一个 React 组件

首先要在项目中创建几个新文件，执行下面一系列操作：

```
mkdir imports && cd imports
mkdir ui && cd ui
touch Hello.jsx
```

操作完成后得到了一个新文件 imports/ui/Hello.jsx，定义了一个简单的组件 Hello，并把它导出供外部文件使用，文件内容如下：

```
import React, { Component } from 'react';

class Hello extends Component {
  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

export default Hello;
```

### 修改静态 main.html 文件

最后一步，删除 client/main.html 文件中的原有内容，添加一些新代码：（不必担心 HTML5 的 Doctype 声明等内容，Meteor 会帮我们自动添加的）

```
<head>
</head>

<body>
  <div id="app-container"></div>
</body>
```

后台保持 meteor 命令一直运行，访问 http://localhost:3000/ 页面，会看到一行字符串 Hello World。另外，Meteor 还自带了页面自动刷新功能，一旦项目中的代码有变动，页面就会自动刷新，非常方便开发。

### 总结

好，这样 Meteor 项目中安装 React 就胜利完成了。