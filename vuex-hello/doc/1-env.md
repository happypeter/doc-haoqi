# vue-cli 搭建开发环境

本节来用 vue-cli 搭建开发环境。


### Vue-cli

https://github.com/vuejs/vue-cli

相比于 create-react-app 的单一化配置，vue-cli 的这种有默认官方配置可以选择，同时可以非常方便的定制自己的开发环境模板的能力，让人眼前一亮。


### 创建 Github 项目

github.com 上添加一个  vuex-hello-demo 仓库。


### 基本环境代码


```
vue-init webpack vuex-hello-demo
```

提示选择的各项：

- 使用 vue-router
- 采用 [Standard 代码规范](https://standardjs.com/)，因为我不想敲分号
- 测试相关的都选 No
- 其他保留默认

注：非常喜欢 vue-cli 环境对代码规范的强制执行，规范有误，直接就是项目根本起不来。

```
cd vuex-hello-demo
npm i
npm run dev
```

这样就可以启动项目开发环境了。
