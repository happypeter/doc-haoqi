# 生成目录

这集来生成目录。

### 解析 JSON

目录信息我把它存到一个 json 中，所以先要学会解析 JSON。

来安装另一个 transformer 。

```
npm i gatsby-transformer-json
```

它的作用就是解析 json 。现在写代码来使用插件解析 json 数据。

data/git-beijing/toc.json

```json
[
  {
    "id": "001-setup",
    "title": "基本设置"
  },
  {
    "id": "002-clone",
    "title": "克隆项目"
  },
  {
    "id": "003-pull",
    "title": "获取更新"
  }
]
```

data/git-beijing 文件夹下添加了 toc.json 文件夹来存放目录数据。里面存放了各个 id 和 title 。

gatsby-config.js

```js
plugins: ['gatsby-transformer-json']
```

同时 gatsby-config.js 中添加了插件名称。重启 npm run develop 。

浏览器中，打开 graphiql 界面，刷新一下，添加了 json 插件后又多了两项数据用来取一项数据信息的 tocJson 和取所有信息的 allTocJson ，这里的 Toc 显然是由文件名 toc.json 决定的。

发出查询

```
{
  allTocJson {
    edges {
      node {
        id
        title
      }
    }
  }
}
```

就可以读出所有的信息了。

### 实现博客目录

数据到手，就可以来实现目录了。

src/pages/git-beijing.js

```js
import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

export default ({ data }) => {
  const { edges: episodes } = data.allTocJson

  return (
    <ul>
      {episodes.map(ep => (
        <StyledLink key={ep.node.id} to={`/git-beijing/${ep.node.id}`}>
          {ep.node.title}
        </StyledLink>
      ))}
    </ul>
  )
}

export const pageQuery = graphql`
  query TocQuery {
    allTocJson {
      edges {
        node {
          id
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

添加 pages/git-beijing.js ，导入 Link 和 styled-components ，拿到 data 数据，并且解构赋值把 data.allTocJson.edges 赋值给 episodes 常量。下面 map 一下，拿到每一个小节 ep 。 ep 的 id 做 key ，同时利用 ep 的 id ，通过字符串拼接获得各个链接指向，每个链接的文本显示文章标题。

定义 query ，把 graphiql 中调试过的语句粘贴到这里。

用 styled-components 对 Link 添加了一下样式，所以就有了这里的 styledLink。

浏览器中，可以看到目录可以工作了。
