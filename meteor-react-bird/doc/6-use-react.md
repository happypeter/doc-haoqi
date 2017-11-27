# 在 Meteor 应用中使用 React

默认 Meteor 项目的 UI 库是 [Blaze](http://guide.meteor.com/blaze.html)，所以生成的 view 层代码也是 Blaze 的模板语法，咱们就不介绍了。因为课程要使用的是 React 组件。

### 安装 react 和 react-dom 包

首先，必须运行下面的命令安装 package.json 文件中列出的 npm 依赖包 `meteor-node-stubs`，要不然我们的 React 组件不能生效，会在浏览器控制台报告很多的错误信息。本课程使用的 node 版本 v5.4.0，npm 版本 3.3.12 ，不过其他更新或者老一些的版本也都不会有问题，推荐使用 [nvm](https://github.com/creationix/nvm) 来安装 node 。

```
npm install
```

然后安装 react 和 react-dom 两个 npm 包，参考文档 [install React](http://guide.meteor.com/react.html#using-with-meteor)，打开一个新的终端窗口，在应用根目录下运行命令：

```
npm install --save react react-dom
```

查看更改：[安装 npm 包 react 和 react-dom](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/7be5bd1c8d008a35984f77914545880bcd0bd90e)

命令中指定的 `--save` 选项的意思是说所安装的 npm 包是应用在生产环境下运行必需的，其对应的版本信息会存放到 package.json 文件中的 dependencies 标签下。

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

查看更改：[定义一个 react 组件 Hello](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/d404d5b394038eacbe591bc407934b8bfb7d4e56)

目前 Meteor 已经完全支持 [ES2015 模块系统](http://guide.meteor.com/structure.html#es2015-modules)了，所以我们可以使用 ES2015 的新语法定义 React 组件，并把它导出供外部文件使用。不过定义的 ES2015 模块需要放置到项目的 imports/ 目录中，因为 Meteor 构建系统对 imports/ 目录中(这里是指应用中所有的叫做 imports 的目录)的文件采用懒加载策略，只有用 import 语句导入的模块才加载，具体请参考 Meteor 项目的[文件结构规范](http://guide.meteor.com/structure.html#javascript-structure)。

另外，ES2015 模块也称为 ES6 模块的导出方式分两类，一类是 `named exports` (命名导出)，另一类是 `default exports`（默认导出），刚刚定义的 Hello 组件采用的是默认导出方式 `export default xxx`。这两种模块导出方式，又对应着不同的导入方式，详情请参考好多视频网第179期：[使用 npm 和 ES6 模块进行前端开发](http://haoduoshipin.com/v/179)。

注意：Meteor 对 React 组件的文件后缀名没有限制，可以是 js 或 jsx，由自己的喜好决定，本课程将使用 jsx 后缀名。

### 渲染 React 组件

既然应用中已经有了一个 Hello 组件，接下来就是让它在页面中显示出来。进入到 client/ 文件夹下，删除 main.js 文件，新建一个 main.jsx 文件，这是客户端 JS 代码的入口文件，添加一些代码：

```
import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Hello from '../imports/ui/Hello.jsx';

Meteor.startup(() => {
  render(<Hello />, document.getElementById('app-container'));
});
```

查看更改：[渲染 Hello 组件](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/7c1ed203b80269bfa8ba0a165059db27562f8c2b)

通过 ES2015 的 import 语法导入 Hello 组件，并借助 npm 包 react-dom 提供的 render 方法把 Hello 组件挂载到页面的 `app-container` 结点上。

注意：Meteor 应用中安装的 Atmosphere 包，在导入的时候，为了避免与 npm 包命名空间产生冲突，需要在导入路径的前面添加 `meteor/` 前缀，详情请参考官方[文档](http://guide.meteor.com/structure.html#importing-from-packages)。还有一点要注意，定义 React 组件的时候，不管组件中是否明文使用了 npm 包 react 提供的功能，首先都要在文件的开头加入这行代码：

```
import React from 'react';
```

### 修改静态 main.html 文件

最后一步，删除 client/main.html 文件中的原有内容，添加一些新代码：（不必担心 HTML5 的 Doctype 声明等内容，Meteor 会帮我们自动添加的）

```
<head>
  <title>Meteor+React Bird Demo</title>
</head>

<body>
  <div id="app-container"></div>
</body>
```

查看更改：[修改 client/main.html 文件 ](https://coding.net/u/happypeter/p/meteor-react-bird-demo/git/commit/84620366f43c4d0c585384116e51f201b5698fe5)

后台保持 `meteor` 命令一直运行，访问 http://localhost:3000/ 页面，会看到一行字符串 `Hello World`。另外，Meteor 还自带了页面自动刷新功能，一旦项目中的代码有变动，页面就会自动刷新，非常方便开发。

### 为什么不采用 meteor npm install 装包

Meteor 支持原生的 npm 包，并可以通过 `meteor npm install` 或者 `npm install` 命令安装，前者用的是 Meteor 打包的 npm 版本，后者是系统中自己安装的 npm 版本。若系统中没有可用的 npm 版本，可以直接使用 `meteor npm install` 命令安装 npm 包，查看 Meteor 自带的 npm 版本号：

```
meteor npm --version
```

不用自己手动安装了，的确是方便些，但是本课程后面再安装其他的 npm 包的时候遇到了问题，比如说安装 Material-UI 和 Radium 包的时候，会报出这样的警告信息：

```
inline-style-prefixer@1.0.3: wanted: {"node":">=0.12"} (current: {"node":"0.10.43","npm":"2.14.22"})
```

意思是说，当前 Meteor 自带的 node 版本不满足 [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer) 依赖包所需要的 node 版本，因此采用系统中的高版本的 node 提供的 npm install 命令安装 npm 包，则不会出现警告信息。

如何在 Meteor 中使用 npm 包，官方文档 [npm](https://guide.meteor.com/using-packages.html#npm) 一章，有详细的说明。
