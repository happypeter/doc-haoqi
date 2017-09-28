# 展示与删除

首先，我们先来展示一下现在云端Bucket里的内容。
这里用到了antd的Table组件
[文档](https://ant.design/components/table-cn/)

根据文档，dataSource属性即为指定的数据源，对应到这里，就是我们读取到的云端bucket中的对象。

首先，在state中创建一个空数组contents。在读取到云端数据后，填入这个数组中

```
... ..
class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      contents: [],
      progress: [],
      folder: ''
    }
  }

  componentDidMount () {

    //读取云端bucket中的文件对象
    axios.get('http://localhost:3000/bucket')
    .then(
      res => {
        console.log(res)
        this.setState({
          contents: res.data.Contents
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

Table组件的另一个属性columns定义了 表格列的配置描述。
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
       const onDelete = function () {
           ... ...
       }

        return (
          <span>
            <Button onClick={onDelete}>删除</Button>
          </span>
        )
      },
    }]

    ... ...
```
在删除函数中，我们使用antd组件的Modal组件，来生成一个模态窗，让用户确认一下。
如果用户确认删除，则调用js-SDK的删除文件接口，否则什么也不做。

```
... ...

const onDelete = function () {
  confirm({
    title: `确认删除 ${record.Key} ？`,
    content: '删除之后无法恢复',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {

      console.log('OK')
      const delParams = {
        Bucket: 'hq123',
        Region: 'ap-chengdu',              /* 必须 */
        Key : record.Key                   /* 必须 */
      }

    cos.deleteObject(delParams, function(err, data) {
      if(err) {
        console.log(err);
        message.error(`${record.Key} 删除失败`)
      } else {
        console.log(data);
        message.success(`已删除：${record.Key}`)
      }
    });

  },
  onCancel() {
    console.log('Cancel');
  },
});

... ...

```

创建Table组件：

```
... ...
        {/*展示云端bucket中的文件对象*/}
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
handleDelete (id) => {
  //axios 删除后台数据

  this.setState({
    fileList: this.state.fileList.filter(t => t.id !== id)
    })
}
```
