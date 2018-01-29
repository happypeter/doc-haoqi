# 定制界面

本节的任务就是让界面好看一点。安装 [Nord](https://marketplace.visualstudio.com/items?itemName=arcticicestudio.nord-visual-studio-code) 主题。然后配置一下细节。

### 安装 Nord

打开 code ，Shift-Cmd-P 打开命令面板，搜索 theme ，选中 Color Theme 回车。这样可以打开颜色主题选择界面，这里敲 install ，回车，可以来安装新 theme 。右侧边栏打开的主题搜索界面中，搜索 nord ，进行安装。

装好之后，来把 nord 写入配置，保证每次重启 code ，都会自动加载这个主题。

依然是 Shift-Cmd-P 打开命令面板，搜 user settings 打开用户配置文件。

```json
{
  "workbench.colorTheme": "Nord"
}
```

添加 colorTheme ，这样配置就写死了。每次打开 code 都是好看的 nord 主题了。

### 隐藏活动栏

最右侧的 activity bar ，也就是活动栏，挺占地方的。所以我选择隐藏掉，打开 user settings ，添加

```json
    "workbench.activityBar.visible": false
```

这样活动栏就看不到了。用一组快捷键呼出活动栏上面的功能：

* Shift-Cmd-E：打开文件浏览器
* Shift-Cmd-D：打开调试器
* Shift-Cmd-F；打开搜索界面
* Shift-Cmd-X: 打开装包界面

### 隐藏 minimap

打开用户设置页面，右侧搜索 minimap ，可以看到 minimap 默认设置为 true ，也就是显示。

```
"editor.minimap.enabled": false
```

拷贝右侧内容的这行，添加到左侧，并且改值为 false ，即可隐藏 minimap 。

### 行高字符间距设置

```json
    "editor.lineHeight": 25,
    "editor.fontSize": 13,
```

再来添加一点配置，让字体看上去舒服点，行高 25，字体 13 。