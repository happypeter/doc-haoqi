vscode 自带的[集成终端](https://code.visualstudio.com/docs/editor/integrated-terminal) 非常好用，不过快捷键用不习惯。可以简单配置一下，就跟普通 Mac 下 iTerm 的用法非常类似了。

### 打开和关闭终端窗口

Cmd-Shift-P 打开命令面板，选中 keyboard shortcut file 。

```json
  {
    "key": "cmd+h",
    "command": "workbench.action.terminal.toggleTerminal"
  },
  {
    "key": "cmd+t",
    "command": "workbench.action.terminal.new",
    "when": "terminalFocus"
  },
  {
    "key": "cmd+right",
    "command": "workbench.action.terminal.focusNext",
    "when": "terminalFocus"
  },
  {
    "key": "cmd+left",
    "command": "workbench.action.terminal.focusPrevious",
    "when": "terminalFocus"
  },
  {
    "key": "cmd+w",
    "command": "workbench.action.terminal.kill",
    "when": "terminalFocus"
  }
```

配置粘贴到 keyBindings.json 文件，每一项的作用是：

* Cmd-h 打开和关闭终端窗口，关闭窗口后里面的命令行会照常运行，再次打开后依然可见
* Cmd-t 新建终端，一个终端窗口中，可以创建多个终端
* Cmd-right/left 可以在终端间切换
* Cmd-w 不想要的终端，用 cmd-w 来关闭
* Ctrl-l 清空终端输出

### 配置样式

打开配置文件。

```json
"terminal.integrated.lineHeight": 1.8,
```

添加 terminal ，也就是终端的行高设置，把行高设置大点。