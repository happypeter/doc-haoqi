# 配置自动补齐

[IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) 是微软自己的商标名，其实就是主要就是自动补齐，包括 snippet 补齐，已有字符串补齐，语法补齐等功能。

### 补齐文件路径

文件路径是可以自动补齐的，不用装扩展包。例如 js 文件里敲 import from 后面的引号中敲点斜杠就可以看到备选项目。

### 点触发

由一个点能触发语法补齐。例如一个 class 内部定义了 onClick 方法，这样输入 this 然后点，就可以看到备选项中有 onClick ，选中它，然后敲括号，就会看到提示框中显示出了它的参数类型，这个提示功能也是 IntelliSense 提供的，这个似乎是超出了自动补齐的概念了。

其他默认 intelliSense 提供的补齐还有不少，输入过程中就会看到很多。

### Emmet

另外，根据[官方说明](https://code.visualstudio.com/docs/editor/emmet) ，Emmet 也是自带的。

### snippets

除了默认的功能，还可以自己配置。通过 snippets 机制把自己常用的代码片段，按照语法类型分组保存。

保证当前打开的是一个 js 文件，打开命令面板，搜 snippet 。有两条可以匹配上，一条是插入自带的一些 snippet ，另一条就是 Open User Snippets ，回车选中，可以来创建自己的 snippet 。

添加好之后，回到 js 文件中，就可以敲关键词，然后 tab 进行补齐了。欢迎到 github.com/happypeter/dotVScode 中拷贝我的那些 snippet 。
