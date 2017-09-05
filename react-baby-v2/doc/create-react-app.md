官网在 https://github.com/facebookincubator/create-react-app 。

后面我们就简称 cra 了。cra 的主要作者就是目前 react 项目的老大 Dan ，以及 facebook 公司的其他一些员工。

cra 是一个开发 React 项目的环境，无需配置直接使用。

### 开发 React 项目曾经很麻烦

没有 cra 之前，开发 React 需要自己搭建下面的环境：

- 需要配置 Webpack ，来把多个 JS 源文件打包成一个文件
- 需要配置 Babel，来编译 ES6
- 需要配置 Babel，来编译 JSX
- 另外还有很多 webpack 配置要来自己做，以便能够处理 svg/css/html 等各种文件类型

总是是非常麻烦。而 cra 就包含 Webpack+Babel ，而且其中的配置都是顶级高手帮我们精心配置好的。

### 有了 cra ，我们开发就省心了

基本上就是，运行下面的命令来创建一个新的 React 项目

```
create-react-app base
```

这样，我们就生成了一个小的脚手架项目叫做 base 。


### 使用淘宝镜像


用本来的国外的 npm 安装源，创建项目可能比较慢，有时候甚至会会创建失败，这时候就先运行

```
npm config set registry https://registry.npm.taobao.org
```

来使用淘宝提供的 npm 镜像。

### 删除不用的文件

保留一个必要的框架，后续本课程的所有案例就都基于这个框架来写。
