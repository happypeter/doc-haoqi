# 备份配置文件

根据[官方配置文档](https://code.visualstudio.com/docs/getstarted/settings)可以找到各项配置信息都保存到了系统上的哪个位置。

创建一个自己的 github 仓库，把

```
$HOME/Library/Application Support/Code/User/
```

的内容都上传到仓库中。可以把这个文件夹用 git 控制，添加 github 仓库为上游，然后每次有修改就可以直接上传了，当然要 ignore 这里的 workspaceStorage 。

VScode 默认的扩展列表没有保存到配置文件中，但是可以很简单的用命令列出

```
$ code --list-extensions
```

输出信息保存到 README 中，换机器的时候自己手动装上即可。

### 一句话介绍

配置文件中每一行内容给一个一句话介绍。

```json
    "workbench.colorTheme": "Nord",
    "workbench.activityBar.visible": false,
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.minimap.enabled": false,
    "terminal.integrated.lineHeight": 1.8,
    "editor.fontSize": 13,
    "editor.tabSize": 2,
    "editor.letterSpacing": 0.7,
    "editor.lineHeight": 25,
```

这几句作用是：

- 使用 Nord 颜色主题
- 隐藏活动栏
- 使用 Cmd 进行多点编辑
- 隐藏 miniMap
- 终端行高 1.8
- 字体大小 13
- 每个 tab 等于两个空格的宽度
- 字符间距 0.7
- 行高 25

```json
    "emmet.includeLanguages": {
        "vue-html": "html",
        "javascript": "javascriptreact"
    },
    "explorer.confirmDragAndDrop": false,
    "files.trimFinalNewlines": true,
    "explorer.confirmDelete": false,
    "files.insertFinalNewline": true,
    "files.autoSave": "onFocusChange",
```

- emmet 生效范围包含 vue 组件和 react 的 JSX 
- 文件浏览器中进行拖拽改变文件位置时候，不需要确认
- 文件浏览器中如果删除一个文件，不需要确认
- 文件末尾如果有多个空行，保存的时候自动去掉
- 但是要保留一个空行，不然很多地方都会抱怨
- 只要焦点失去，就保存文件


```json
    "prettier.semi": false,
    "prettier.singleQuote": true,
    "editor.formatOnSave": true
}
```

- prettier 设置，分号，不要
- prettier 设置，使用单引号
- 保存文件时候，自动触发格式化操作，prettier 就会被触发
