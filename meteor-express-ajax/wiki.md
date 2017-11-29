# meteor 部分



### 数据存储
Comment.insert 会同时在客户端和浏览器端执行，目的就是达成“延迟补偿”的效果。
所以在 server/main.js 也要导入 Comment 。

参考文档：http://docs.meteor.com/api/collections.html#Mongo-Collection-insert

### 实时数据订阅

container 那一部分
