本节就是真的来写页面了，引入[蚂蚁设计](https://ant.design/) 使用 Table 组件来美观的展示文件列表。

### 文件改名

真正使用 Table 之前要处理一个小问题，也就是要把 TableContainer 改一下名字，因为按照常规 TableContainer 对应的展示组件就应该叫 Table 了，跟 antd 我们要使用的组件重名。

所以我们先把 TableContainer.js 改一下名字为 FileTableContainer.js ，里面的内容也调整一下：

```diff
--- class TableContainer extends Component {
+++ class FileTableContainer extends Component {

--- export default connect(mapStateToProps)(TableContainer)
+++ export default connect(mapStateToProps)(FileTableContainer)
```

同时到 Main.js 也要改一下名字：

```diff
--- import TableContainer from '../containers/TableContainer'
+++ import FileTableContainer from '../containers/FileTableContainer'

--- <TableContainer />
+++ <FileTableContainer />
```

到这里，改名完成，到浏览器查看，程序能够正常运行即可。

### antd 大块布局

先使用 [Layout](https://ant.design/components/layout-cn/) 来把页面大布局做好。

安装 antd （也就是蚂蚁设计的 npm 包），然后使用一下其中的 Layout 组件。

先来装包

```
npm i antd
```

这样，强大的蚂蚁设计组件库就免费到手。

到 Main.js 做一下修改，最终改成这样：

```js
import React from 'react'
import './main.css'
import FileTableContainer from '../containers/FileTableContainer'
import styled from 'styled-components'
import { Layout } from 'antd'
const { Header, Sider, Content } = Layout

const headerHeight = 70

const LogoWrap = styled.div`
  height: ${headerHeight}px;
  background-color: #ececec;
`

export default () => (
  <Layout
    style={{ height: '100vh' }}
  >
    <Sider
      style={{
        background: '#fff'
      }}
    >
      <LogoWrap />
    </Sider>
    <Layout>
      <Header style={{ height: `${headerHeight}px` }}>
      </Header>
      <Content>
        <FileTableContainer />
      </Content>
    </Layout>
  </Layout>
)
```

没有实质性的功能，就是用 `Layout` 组件实现了一个带侧边栏（ `Sider` ）的布局。同时侧边栏中未来放菜单，如果顶头不好看，所以现在加一个 `<LogoWrap />` 占据顶部。

然后，到我们存放全局 css 的文件 main.css 中添加

```css
@import '~antd/dist/antd.css';
```

注意末尾的 `;` 不能删。

这样，浏览器中可以看到一个灰黑白三色的布局了。

### 使用 antd 的 Table 组件

接下来添加 FileTableContainer.js 对应的展示组件。

先来修改一下 FileTableContainer.js ，添加对展示组件的导入和使用


```js
import FileTable from '../components/FileTable'
...
  render () {
    return (
      <div>
        <FileTable allFiles={this.props.allFiles}/>
      </div>
    )
  }
```

这里稍微停一下，观察发现我们要传递给展示组件去显示的数据也就是 this.props.allFiles 其实有点问题，因为它通常长成这样

```js
[
  {
    Key: 'cc/'
  },
  {
    Key: 'cc/cc.txt'
  },
  {
    Key: 'dd/'
  },
  {
    Key: 'dd/dd.txt'
  }
]
```

上的数据省略了不少内容，但是我想要突出的是，整个的所谓 allFiles 列表中，其实有些只是列出了文件夹，所以这部分要从数组中除去。具体做法就是到 redux/reducers/index.js 中，添加

```js
export const getOnlyFiles = state => {
  return state.allFiles.filter(
    t => t.Key.split('/')[1]
  )
}
```

这样，getOnlyFiles(state) 最终得到的数据中就不会有那些空文件夹了，也就是最终得到的数据就变为：


```js
[
  {
    Key: 'cc/cc.txt'
  },
  {
    Key: 'dd/dd.txt'
  }
]
```

这样就符合我们在组件中使用的要求了。

接下来添加 src/components/FileTable.js 内容如下：

```js
import React from 'react'
import { Table } from 'antd'
import moment from 'moment'

const tableColumns = [
  {
    title: '文件名',
    dataIndex: 'Key',
    render: (text) => {
      return <span>{text}</span>
    }
  },
  {
    title: '上传时间',
    dataIndex: 'LastModified',
    render: (text) => {
      return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
    }
  }
]

export default ({ allFiles }) => (
  <div>
    <Table columns={tableColumns}
      dataSource={allFiles}
      rowKey={item => item.ETag}
      pagination={false}
      />
  </div>
)

```

就是把 FileTableContainer 传递过来的 allFiles 数据展示到 Table 中。其中

```
columns={tableColumns}
```

规定了表格有多少列（ tableColumns 数组的长度），每一列的标题是什么（ e.g `title: '上传时间'`)，数据要显示什么内容（通过 render 函数来实现）。

详细说说数据显示逻辑。我们通过 `dataSource={allFiles}` 传递给 Table 组件的是一个对象数据，数据大致长成这样：

```js
[
  {
    Key: 'cc/cc.txt',
    LastModified: 'xxx'
  },
  {
    Key: 'dd/dd.txt',
    LastModified: 'ddd'
  }
]
```

那么每一列的 render 函数的参数中可以拿到一个数据对象了，也就是

```js
{
  Key: 'cc/cc.txt',
  LastModified: 'xxx'
}
```

但是每列有了各自的 `dataIndex` 的设置，render 的 text 的值就会是 Key 或者 LastModified 的具体值了。

另外，需要通过 `rowKey` 来保证 Table 每一行都有一个独立的 key ，我们的数据中虽然没有 id ，但是有每个文件都有自己的 Etag 数据，都是独一无二的，恰好可以用在 `rowKey={item => item.ETag}` 中。

另外，render 函数中可以使用各种技巧对数据显示格式进行处理，例如，我们采用了大名鼎鼎的 [momentjs](https://momentjs.com/) 对时间显示格式做了调整。

至此，页面上就显示出文件列表了，这一节我们想做的主体功能也就完成了。

### 完善一下样式

到 src/components/Main.js 中添加下面的代码

```js
const Wrap = styled.div`
  background-color: #fff;
  width: 95%;
  margin: 20px auto;
  padding: 20px;
`

export default () => (
  <MainWrap>
    <Wrap>
      <FileTableContainer />
    </Wrap>
  </MainWrap>
)
```

这样，Table 的就美观的显示在一个白色背景上了。

### 总结

本节我们使用了 antd 的 Table 组件，美观的展示了文件列表，其中一个小技巧就是使用了 redux 的 **函数选择器** 整理了一下 allFiles 数据。
