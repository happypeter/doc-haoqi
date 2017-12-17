# 生成首页列表

读取 posts/index.json 中的信息，《生成首页列表》


### 引入真实数据

real-haoduo-data---

把原来的 md 文件全部删除，从好多视频的真实数据中那出一小部分来，posts/index.json 存放的是目录信息。videos/ 文件夹中是每一节的 md 文字稿。


### 解析 JSON

```
npm i gatsby-transformer-json
```


allIndexJson----


- 生效条件
  - source-filesystem 的文件夹位置中包含 .json 文件
  - graphql 请求时写 allXXXJson 就对应 XXX.json 文件

到 graphiql 中请求

```
{
  allIndexJson {
    edges {
      node {
        id,
        title,
        name,
        created_at
      }
    }
  }
}
```

就可以读出所有的信息了。注意，上面 allIndexJson 对应 index.json 文件，这里存在文件名对应关系。请求代码粘贴到源码中，就可以打印出 json 信息了。

### 实现文章列表

index-page---

这样，首页上就能看到文章目录了。
