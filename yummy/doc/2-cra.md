# 确定 CSS 使用规范
进入第二小节《确定 CSS 使用规范》。我们先来创建一个 [Create-react-app](https://github.com/facebookincubator/create-react-app) 的项目，然后调整一下文件结构，核心在于确定基于 styled-components 技术的 CSS 使用规范。
第一步，创建一个项目。先创建一个文件夹，并用 Atom 打开，里面创建一个 README.md 文件，写一行项目介绍。
```diff
diff --git a/README.md b/README.md
new file mode 100644
index 0000000..4769abf
--- /dev/null
+++ b/README.md
@@ -0,0 +1 @@
+# 好奇猫《 React 社交化电商》课程代码
下一步来，删除我不用的文件。用 atom 打开项目，删除 src/ 中的所有文件， 然后自己创建 src/index.js 内容如下
a