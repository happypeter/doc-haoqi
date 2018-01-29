# 语法和格式检查

自带的语法检查就非常的贴心，一旦敲错一般下面都会看到红线标出。

### eslint

但是还可以通过 ESlint 让提示信息更丰富些。

我们这里只介绍 create-react-app 环境下的配置 eslint 的方式，create-react-app 环境本身是自带 eslint 的，通常这些信息只会显示到命令行或者 Chrome 终端中。

例如，到 js 中添加一个变量但是不去使用。

浏览器中是可以看到 eslint 给出的 no-unused-vars 规则触发警告的。

根据 [create-react-app 官方对 Lint 的编辑器支持文档](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#displaying-lint-output-in-the-editor)  ，我只需要做两件事情：

第一，安装 eslint 的 vscode 插件。

第二，添加 .eslintrc 文件

```json
{
  "extends": "react-app"
}
```

这样编辑器中，就会看到黄色下滑线的警告信息了。进一步修改 .eslintrc 可以添加更多检查规则进来，这些新加进来的规则只会影响编辑器的报错，不会影响命令行和 Chrome 中的报错。

### 安装 prettier

[create-react-app 官方推荐用 prettier 做格式美化](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#formatting-code-automatically) ，格式检查确实让人心情舒畅。

Cmd-Shift-X 安装 prettier 。

进入 Settings 界面，搜索 prettier 可以看到很多默认选项。

```json
"prettier.semi": false,
"prettier.singleQuote": true,
"editor.formatOnSave": true
```

添加几项来覆盖一下默认值。添加 semi false ，因为我写 js 不要分号，singleQuote 设置为 true ，因为用单引号不用双引号。formatOnSave ，就是保存的时候就自动用 prettier 的各种规则来调整代码。

到一个格式混乱的代码中，Cmd-S 保存一下，发现格式马上就完美了。
