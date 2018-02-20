# 保存到 github 仓库

来把书稿保存到 Github 仓库中。

### 新建 github 仓库

到自己的 github 账号下，创建一个新项目。我这里叫 gitbook-demo 了。拷贝添加仓库地址的代码。

### 编译项目

接下来把原始书稿上传到 github 仓库保存起来。

```
cd gitbook-demo
echo _book >> .gitignore
git init
git add -A
git commit -m"msg"
git remote add origin git@github.com:haoqicat/gitbook-demo.git
git push -u origin master
```

进入项目文件夹，把 `_book` 添加到 gitignore 。初始化 git 仓库，添加所有内容，作版本。添加远端仓库地址，最后 push 到 master 分支。

浏览器中，访问 https://github.com/haoqicat/gitbook-demo 就可以看到笔记稿了。
