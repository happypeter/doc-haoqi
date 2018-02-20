### 部署到 github pages

咱们来把 html 内容部署到公网上，用到的是 github 的 pages 服务。

### docs 文件夹 Push 到 github

运行 `git add -A; git commit` 操作，把 docs 文件夹保存到版本中，然后 git push 上传。

浏览器中，到 https://github.com/haoqicat/gitbook-demo ，可以看到 docs/ 文件夹上传完毕。

### 配置 pages 服务

到 [仓库配置页面](https://github.com/happypeter/gitbook-demo/settings) 到 `Github Pages` 一项下面。`Source` 一项设置为 `master branch docs folder` 意思就是 master 分支的 docs 文件夹。

等待几分钟，到 https://haoqicat.github.io/gitbook-demo ，可以看到本书上线了。

### 部署到 gh-pages 分支

当然也可以部署到 gh-pages 分支，部署会麻烦一下。参考 [通过脚本实现部署到 gh-pages 分支](https://happypeter.github.io/gitbook/github/script.html) 的这篇文档。
