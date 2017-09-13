本节学习如何用 json-server 来搭建 API 。

官网：https://github.com/typicode/json-server

### 使用

```
npm i -g json-server
```

创建 db.json 文件

```js
{
  "posts": [
    {
      "id": "134",
      "title": "Git 使用技巧",
      "content": "main content"
    },
    {
      "id": "256",
      "title": "命令使用技巧",
      "content": "main content"
    },
    {
      "id": "545",
      "title": "Github 基础",
      "content": "main content"
    }
  ]
}
```


然后运行：

```
json-server --watch db.json -p 3008
```

可以将上面的命令写成一个 npm 脚本，放到 package.josn 中。

上面的命令：执行之后，会在命令行中，一直轮询，直到我们敲 Ctrl-C 才会停止。大家不要认为，程序卡住了。


### 可以得到的 API

```
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
DELETE /posts/1
```

功能分别是

```
读取所有文章
读取 id 为 1 的文章
发布一篇文章
更新 id 为 1 的文章
删除 id 为 1 的文章
```


注意：启动了 json-server 之后，我们就拥有了一套 API ，包括上面几个。但是，其中不包括 `/` 这个 API 。也就是说访问 http://localhost:3008/ 这个位置是不会看到任何数据的。


### 视频

http://digicity-1253322599.costj.myqcloud.com/json-server.mp4
