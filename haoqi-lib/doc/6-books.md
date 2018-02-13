# 添加多本书

图书馆项目，不能只有一本书，看看有了多本书如何处理。

### 生成书籍列表

data/index.json

```json
[
  {
    "bookId": "git-beijing",
    "title": "Git 北京"
  },
  {
    "bookId": "react-tips",
    "title": "React 技巧"
  }
]
```

书籍列表的原始数据放到 data/index.json 中，分别有 bookId 和 title 两项内容。目前有 git-beijing 这本已经有数据了， react 技巧这本还没有。

pages/index.js

```js
import React from 'react'
import { PRIMARY } from '../constants/Colors'
import styled from 'styled-components'
import Link from 'gatsby-link'

export default ({ data }) => {
  const { edges: books } = data.allIndexJson
  return (
    <ul>
      {books.map(p => (
        <StyledLink key={p.node.bookId} to={`/${p.node.bookId}`}>
          {p.node.title}
        </StyledLink>
      ))}
    </ul>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allIndexJson {
      edges {
        node {
          bookId
          title
        }
      }
    }
  }
`

const StyledLink = styled(Link)`
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  display: flex;
  line-height: 50px;
  color: rgba(0, 0, 0, 0.87);
  &:before {
    content: '';
    width: 5px;
    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
    margin-right: 10px;
  }
  &:hover {
    &:before {
      background: ${PRIMARY};
    }
  }
`
```

pages/index.js 会被自动创建为网站首页，这里来显示图书列表。导入主色，导入 Link 。参数 data 中拿到 index.json 中的数据形成的节点数据。解构赋值把 data.allIndexJson.edges 赋值给 books 。map 一下显示出链接列表。

下面定义查询，来获取 data 属性的数据。

然后把样式组件 StyledLink 添加上。

浏览器中，看到首页上，书籍列表出来了。

### 添加第二本书的数据

data/git-beijing/toc.json

```
[
  {
    "episodeId": "001-react-setup",
    "title": " React 基本设置"
  },
  {
    "episodeId": "002-react-clone",
    "title": "克隆 react 项目"
  },
  {
    "episodeId": "003-pull",
    "title": "获取 react 更新"
  }
]
```

不同书的 toc 数组中如果有对象的 id 相同，请求数据时就会造成覆盖，所以原有的把 id 改为 episodeId.

添加第二本书的数据。包括 react-tips/toc.json 和各个章节的 markdown 文件。拷贝原有的 git-beijing 文件夹，命名为 react-tips ，其中把 toc.json 中的每一个 title 都添加上 react 字样，然后第一个 markdown 文件中也添加上 react 字样便于调试。

重启 npm run develop ，浏览器中请求 allTocJson 时候，会看到老数据还在，需要

```
rm -rf .cache
```

然后重启 npm run develop 。

浏览器中，打开 graphiql 界面，请求

```
{
  allTocJson {
    edges {
      node {
        episodeId
        title
      }
    }
  }
}
```

可以看到所有书的 toc 中的小节信息了。

### 添加 bookId 给小节节点

到 `http://localhost:8000/git-beijing` 会看到显示出了所有的小节，所以需要筛选出属于当前书的小节。

先来给每个小节的数据节点都添加上它所在的书的 id 。

onCreateNode.js

```js
if (node.internal.type === `TocJson`) {
  const fullPath = createFilePath({ node, getNode })
  const bookId = fullPath.split('/')[1]

  createNodeField({
    node,
    name: `bookId`,
    value: bookId
  })
}
```

如果当前节点是 TocJson 类型，那么就用 createFilePath 拿到当前节点的文件路径，其中就会包含书的 id 的信息，路径中把 bookId 截取出来。添加到名为 bookId 的字段中。

命令行中，删除 cache 文件夹，重启 npm run develop 。

浏览器中，刷新 graphiql ，请求

```
{
  allTocJson {
    edges {
  		node {
        episodeId
        fields {
          bookId
        }
  		}
    }
  }
}
```

输出为

```
{
  "data": {
    "allTocJson": {
      "edges": [
        {
          "node": {
            "episodeId": "001-setup",
            "fields": {
              "bookId": "git-beijing"
            }
          }
        },
        ...
      ]
    }
  }
}
```

可以看到小节节点中都有自己的 bookId 了。

### 筛选自己的 toc

pages/git-beijing.js

```js
export const pageQuery = graphql`
  query TocQuery {
    allTocJson(filter: { fields: { bookId: { eq: "git-beijing" } } }) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`
```

到 git-beijing.js 中，只需要对 allTocJson 数据做一下筛选即可，只读取 filelds.bookId 等于 git-beijing 的节点数据。

删除 .cache, 重启 npm run develop 。

浏览器中，可以看到 `localhost:8000/git-beijing` 页面上只显示属于自己的小节了。

### 自动创建每本书的首页

现在咱们要根据 index.json 中的内容，自动生成每本书的首页了。

gatsby/createPages.js

```js
  //  创建每本书的首页
  const allTocJson = await graphql(`
    {
      allTocJson {
        edges {
          node {
            fields {
              bookId
            }
          }
        }
      }
    }
  `)

  allTocJson.data.allTocJson.edges.map(({ node }) => {
    const { bookId } = node.fields
    createPage({
      path: bookId,
      component: path.resolve(`./src/templates/book.js`),
      context: {
        bookId
      }
    })
  })
```

通过 graphql 请求，拿到小节节点中包含的 bookId 数据。

下面 map 迭代一下，使用 bookId 中包含的字符串为路径创建页面，使用的页面模板是 book.js 。

同时通过 context 机制，把 bookId 传递给创建好的页面。

删除 pages/git-beijing.js 。

templates/book.js

```js
import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

export default ({ data, pathContext }) => {
  const { edges: episodes } = data.allTocJson
  const { bookId } = pathContext

  return (
    <ul>
      {episodes.map(ep => (
        <StyledLink
          key={ep.node.episodeId}
          to={`${bookId}/${ep.node.episodeId}`}
        >
          {ep.node.title}
        </StyledLink>
      ))}
    </ul>
  )
}

export const pageQuery = graphql`
  query TocQuery($bookId: String!) {
    allTocJson(filter: { fields: { bookId: { eq: $bookId } } }) {
      edges {
        node {
          episodeId
          title
        }
      }
    }
  }
`

const StyledLink = styled(Link)`
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  display: block;
  line-height: 40px;
  padding-left: 10px;
  color: rgba(0, 0, 0, 0.87);
  &:hover {
    background: rgb(232, 232, 232);
  }
`
```

添加 book.js 模板，内容跟 gei-beijing.js 基本一致，只是用 bookId 添加了普适性。

浏览器中，可以看到每本书都有了自己的首页，同时点击每个小节标题，都可以正确打开小节页面。
