# 展示与删除

首先，我们先来展示一下现在云端 Bucket 里的内容。
这里用到了 antd 的 Table 组件：[文档](https://ant.design/components/table-cn/)

根据文档，dataSource 属性即为指定的数据源，对应到这里，就是我们读取到的云端 bucket 中的对象。

首先，在 state 中创建一个 files 。在读取到云端数据后，填入 files 这个数组中

```
... ..

  state = {
    files: []
  }

  componentDidMount () {
    //读取云端bucket中的文件对象
    axios.get('http://localhost:3000/bucket')
    .then(
      res => {
        console.log(res)
        this.setState({
          files: res.data.Contents
        })
      }
    )
    .catch(
      err => {
        console.log(err)
      }
    )
  }
  ... ...
```

Table 组件的另一个属性 columns 定义了表格列的配置描述。
参考上面的文档：

> render	生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引...
>
> render:  Function(text, record, index) {}

所以我们可以在render中创建删除函数。


```
... ...

//antd表格列部分
   const TableColumns = [{
     title: '名称',
     dataIndex: 'Key',
     key: 'Key',
   }, {
     title: '更新时间',
     dataIndex: 'LastModified',
     key: 'LastModified',
     render: (text) => {
       return <span>{moment(text).format('YYYY-MM-DD kk:mm:ss')}</span>
     }
   }, {
     title: '操作',
     dataIndex: 'ETag',
     key: 'ETag',
     render: (text, record, index) => {
        return (
          <span>
            <Button onClick={onDelete}>删除</Button>
          </span>
        )
      },
    }]

    ... ...
```
在删除函数中，我们使用 antd 组件的 Modal 组件，来生成一个模态窗，让用户确认一下。
如果用户确认删除，则调用 js-SDK 的删除文件接口，否则什么也不做。

然后，显示 Table 组件：

```
... ...
        {/*展示云端 bucket 中的文件对象*/}
        <Table columns={TableColumns}
        dataSource={this.state.contents}
        rowKey={item => item.ETag}
        />
... ...
```

Etag 是文件内容的 md5 ，这里就当文件 id 用了。

运行项目，就可以看到云端的文件，并进行删除了。

### 删除后更新前端文件列表

```
cos.deleteObject(delParams, (err, data) => {
  ...
    } else {
      message.success(`已删除：${record.Key}`)
      this.setState({
        files: this.state.files.filter(
          t => t.ETag != record.ETag
        )
      })
     }
   })
```

commit: delete
