# 搭建项目开发环境


### 最终代码

课程最终完整的代码都在：[This Repo](https://coding.net/u/happypeter/p/redux-tower-demo/git)

### 准备工作

* node v5.4.1 (npm v3.3.12)
* react-transform-boilerplate

###  搭建 webpack-react 开发环境

本项目所使用的开发环境位于 `dev-env` 目录下面，主要参考了 [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate) 开源项目的配置文件，并添加了一些必要的 npm 包，可以查看 `dev-env/package.json` 文件。

下面安装这些必需的 npm 包。以下所有操作，都是在 `dev-env` 目录中：

#### 安装 babel transform

```
npm install --save-dev babel-plugin-transform-object-rest-spread
```

为了支持 es6 的 rest 和 spread 属性，参考[文档](https://babeljs.io/docs/plugins/transform-object-rest-spread/)

同时，还要配置一下，在项目根目录下 .babelrc 文件下，添加代码

```
{
  "plugins": ["transform-object-rest-spread"]
}
```

#### 安装 react 以及相关包

```
npm install --save react@15.1.0 react-dom@15.1.0 react-addons-css-transition-group@15.1.0
```

### 安装 mui

```
npm install --save material-ui@0.15.1 react-tap-event-plugin@1.0.0
```

### 安装 webpack loader

```
npm install --save-dev css-loader style-loader
```

用来加载项目中唯一的一个 CSS 样式文件。

### 安装路由

```
npm install --save react-router
```

### 安装 redux 相关包

```
npm install --save redux react-redux react-router-redux
```

### 安装 Radium

这个 [radium issue](https://github.com/FormidableLabs/radium/issues/759) 已经在最新的 radium v0.18.1 版本中修复了，直接用下面命令安装 radium 就可以了：

```
npm install --save radium
```

另外，后续视频将要实现的功能都会添加到 `dev-env/src` 目录中，其中 `src/data` 目录中存放了本项目所需要的课程和评论信息，`src/styles` 目录中存放了本项目唯一的样式文件。
