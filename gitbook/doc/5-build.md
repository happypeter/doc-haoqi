# 编译

来把书稿编译成 html 页面。

### 修改文件夹结构

为了部署方便，我们把内容结构稍微调整一下

```
cd gitbook-demo
mkdir content
mv *.md content
mv chap1 content
```

把原有的所有的笔记都放到 content 文件夹中。

### 添加自动化脚本

```
gitbook serve
```

就会报错，因为文件找不着了。

```
gitbook serve ./content ./docs
```

这样，我们就又可以启动成功了，同时，也会自动创建 docs 文件夹，文件夹中的内容，就是编译后的输出。

每次启动的时候，都要敲长长的命令，很不方便，所以，我们就需要把命名简短化，具体就是去写成 **npm 脚本**。

```
npm init -y
```

把项目变成一个 nodejs 的项目。

package.json

```json
"scripts": {
  "start": "gitbook serve ./content ./docs"
},
```

把长长的命令变成一个名为 start 的 npm 脚本。

```
npm start
```

浏览器中，就又可以访问 4000 端口看到书的内容了。

### 进行编译

package.json

```json
"scripts": {
  "build": "gitbook build ./content ./docs"
},
```

添加名为 build 的脚本。

然后命令行中运行

```
npm run build
```

这样 html 内容被编译好之后就会被保存到 docs 文件夹中。
