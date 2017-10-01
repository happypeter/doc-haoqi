# 重命名

我们在与删除按钮并列的位置，添加重命名按钮。

因为需要用户填写新文件夹的名字，我们希望能在弹出层中的新建表单，这里

参考[antd Form文档的](https://ant.design/components/form-cn/)**弹出层中的新建表单**部分


将antd案例代码中不需要的部分删去，留下CollectionCreateForm部分， Modal 逻辑部分。
在前者return的表单当中，校验文件名，规则：必须有名字且与旧名字不同
在后者的handleCreate()函数中，调用js-SDK接口

调用cos.putObjectCopy
参考https://cloud.tencent.com/document/product/436/11459#put-object 可知，该接口用于复制

重命名逻辑如下：
 * 拷贝一份源文件的副本，命名为新名字；
  * 注意 CopySource 参数，它是源文件的URL，在拼接的时候，注意对汉字的处理(讲解encodeURI())
    ```
      CopySource: Bucket + '-' + AppId + '.cos.' + 'ap-chengdu' + '.myqcloud.com/' + encodeURI(this.state.oldName),
    ```
 * 若副本创建成功，删除源文件
 * 若删除成功，刷新列表

就会呈现重命名的效果


目前存在的性能问题：
  页面中生成多少个重命名按钮，就会执行多少次相关逻辑。
