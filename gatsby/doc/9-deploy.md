# 部署到 Github Pages

来把咱们的应用部署到 Github Pages 之上。

先来装包

```
npm i --only=dev gh-pages
```

gh-pages 这个包可以帮我们把 master 分支上的内容自动推送到 github 仓库中的 gh-pages 分支上。

deploy---

然后到 github.com 创建一个仓库叫 gatsby-demo 。然后把仓库链接添加到本地项目中。

```
git remote add origin git@github.com:happypeter/gatsby-demo.git
```

然后添加部署用的 npm 脚本。到 package.json 中

```
"deploy": "gatsby build --prefix-paths && gh-pages -d public"
```

gatsby-config.js 中，添加

```
pathPrefix: `/gatsby-demo`
```

对应 github 仓库名。

运行

```
npm run deploy
```

这样就可以先编译后部署了。

浏览器中，打开 github.com/happypeter/gatsby-demo ，就可以看到项目了。

这样，每次修改了代码，直接 npm run deploy 就可以部署了。
