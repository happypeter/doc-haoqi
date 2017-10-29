# layout 组件

本节课程我们将修改网站每个页面中都显示的 header 部分的文字和样式，将涉及到 Gatsby 中布局组件的使用和如何在页面中添加样式

### 修改 header 文字

网页中 header 部分的文字是 `src/layouts/index.js` 文件中的 Header 组件要展示的内容。

Header 组件的代码如下：


```
const Header = () => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Gatsby
        </Link>
      </h1>
    </div>
  </div>
)
```



注：Layout 是什么原理......
