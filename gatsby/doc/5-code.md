# 实现代码高亮


在 md 文件中加入一些代码，来《实现代码高亮》。


```
npm install --save  gatsby-remark-prismjs
```

prism 需要 gatsby-transformer-remark 的配合，不过 gatsby-transformer-remark 之前我们已经安装了。


hightlight----



# 设置动态 title

Helmet

UPDATE: 这个方法不合适。

```
    }
    allIndexJson {
      edges {
@ -42,5 +41,9 @@ export const query = graphql`
        }
      }
    }
    indexJson(id: {eq: $pid}) {
      id
      title
    }
```

凡是一个资源，有 allXXX 给出数据数组，那么也一样可以有取出单个数据的 XXX 这个查询节点。

favicon---


# Deploy 到 github Pages

```
npm i --dev gh-pages
```

deploy---

这样，每次修改了代码，直接 npm run deploy 就可以部署了。
