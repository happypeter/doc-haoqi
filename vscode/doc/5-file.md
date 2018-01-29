# 操作文件

本节关注查找文件，移动文件，重命名文件，删除文件这些操作。

### 查找文件

一个打开的项目中，使用 `Cmd-P` 然后模糊搜索一下，就可以快速打开文件了。被添加到 .gitignore 文件中的文件夹会被自动忽略，例如 node_modules 文件夹。

不管用命令面板还是鼠标单击，打开文件的时候，只要按下 Cmd 键，就能在新格子打开文件。

如果同时打开了多个项目，就需要先要 Ctrl-w 切换项目。

### 创建文件

用 [advanced New File](https://marketplace.visualstudio.com/items?itemName=patbenatar.advanced-new-file) 来创建文件。

装好之后，打开命令面板，到 Keybord shortcut file ，也就是快捷键配置文件 ，添加

```json
  {
    "key": "alt+cmd+o",
    "command": "extension.advancedNewFile"
  },
```

这样，每次想要创建新文件的时候，就敲 alt-cmd-o 。先选择要创建的位置，然后输入文件路径即可。

### 删除文件

删除文件要想不用鼠标，需要安装 [File Utils](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils) 。

装好后，运行 Cmd-Shift-p 打开命令面板，搜 file ，就可以看到这个包提供的各项功能了。追加 delete ，就可以搜出删除当前文件的命令了。

### 重命名文件

重命名也用 File Utils 提供的命令，命令面板搜 file rename 。

### 移动文件

同样的，move 命令可以用来移动文件位置。
