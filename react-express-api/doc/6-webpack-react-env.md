# 搭建前端开发环境

本节课程将搭建 Webpack 和 React 开发环境，好奇猫上的《塔顶上的 Redux》和《Webpack-React 鼹鼠》两门课程都详细介绍了配置过程。

### 配置 Webpack 和 React 开发环境

在项目根目录 `react-express-api-demo` 中，新建一个 `client` 目录，然后再创建一个 `dev-env` 目录，这个目录中存放了前端开发环境的代码，当前目录下的 `package.json` 文件中列出了所有依赖的 npm 包。

运行下面命令，把开发环境运行起来：

```
cd client/dev-env
npm install
npm start
```

项目运行成功之后，打开浏览器，访问地址 http://localhost:8080，页面中会出现 `hello world` 字样。后续课程都会再此代码之上进行修改

[代码地址](https://coding.net/u/happypeter/p/react-express-api-demo/git/tree/master/client/dev-env)
