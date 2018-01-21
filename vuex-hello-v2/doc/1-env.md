# vue-cli 搭建开发环境

本节来用 vue-cli 搭建开发环境。

### Vue-cli

首先参考 [Vue-cli])(https://github.com/vuejs/vue-cli) 的官网，来搭建脚手架。

```
npm i -g vue-cli
```

安装 vue-cli

相比于 create-react-app 的单一化配置，vue-cli 的这种有默认官方配置可以选择，同时可以非常方便的定制自己的开发环境模板的能力，让人眼前一亮。

### 基本环境代码

vue-cli 装好之后，系统上就有了 vue-init 这个命令。

```
vue-init webpack vuex-hello-v2
```

vue-cli 能够创建的脚手架类型有多种，其中一种比较强大的名字叫 webpack ，所以运行 vue-init webpack 后面跟上项目名 vuex-hello-v2 ，就可以创建一个项目脚手架程序。

提示选择的各项：

- 第一项问是否要把 vuex-hello-v2 作为项目名称，直接回车，表示同意。
- 第二项询问项目描述，回车，保留默认值。
- 第三项，询问作者，回车，使用默认值
- 第四项，编译工具。直接回车，选择 runtime 也就是运行时，和 compiler 也就是编译器。
- 第五项，vue-router ，也就是路由器，回答 n ，回车，先不安装
- 第六项，是否使用 ESLint 进行代码检查，选择 n ，避免新手看到过多的报错信息
- 第七项，单元测试，回答 n 。
- 第八项，e2e 测试，回答 n 。
- 第九项，直接回车，选择 npm 作为装包工具。

然后就创建好了 vuex-hello-v2 这个项目。

下面运行这个项目

```
npm run dev
```

npm run dev 的意思是，在开发环境下运行项目，dev 是开发环境的意思。

浏览器中，访问 localhost:8080 ，可以看到一个页面运行起来了。
