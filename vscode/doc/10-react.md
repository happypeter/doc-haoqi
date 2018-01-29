# 支持 React 项目

[Vscode 对 react 也有很好的支持](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial) 。

### 默认支持功能

先来看默认就支持的一些功能，一个 react Class 内，有了 state 值，敲 this. 或者 this.state. 都可以有补齐项目。

### 自动添加导入语句

再来一个更酷的，在项目的任意位置添加一个新的 js 文件，里面导出一个 myFun 。这样，到其他 js 文件中，我就可以直接使用 myFun 了，import 语句会自动帮我加上的。末尾有我不想要的分号？没关系，Cmd-S 保存一下 prettier 自动就帮我去掉。

### JSX 中的 emmet 补齐

jsx 中 emmet 默认不工作，需要添加配置。

```json
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    }
```

emmet 支持语言中，把 react 添加进来。

编辑器中，试一下，可以了。

### styled-component

就像你经常看到的，我项目中是会使用 styled-component 的。默认显示是没有高亮支持的。来安装 styled-components 这个包，高亮就有了。美中不足，这个包暂时还不能提供 emmet 补齐给我们，但是很快就可以了。

* https://github.com/styled-components/vscode-styled-components/pull/41

支持 emmet 自动补齐，需要等待下一个版本的 vsCode。
