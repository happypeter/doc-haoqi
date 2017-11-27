# 创建商品

### 后台 API 代码


- [API product](https://github.com/happypeter/aa-journey-demo/commit/091a27797dfc3f4822d3cdbe24d85ece7a0e5473) 全部的 API 代码



```js
$ curl -X POST -H 'Content-Type: application/json'  -d '{"name": "shoe"}' localhost:3005/cat

$ curl -X GET localhost:3005/cats

$ curl -X POST -H 'Content-Type: application/json' localhost:3008/product/new -d '{ "name": "商品 fishA", "summary": "这是简介", "price": 1003, "poster": "http://7xopqp.com1.z0.glb.clouddn.com/avater.jpg", "cat": "58d91dbfb13513bfe7ae82c3" }'
```

重点涉及到表关系，

```
cat.products
```

总是取不到数据

model/cat.js 中必须有

```
products: [{
  type: ObjectId,
  ref: 'Product'
}]
```

这样

```
$ curl -X POST -H 'Content-Type: application/json' localhost:3008/product/new -d '{ "name": "商品A", "summary": "这是简介", "price": 1003, "poster": "http://7xopqp.com1.z0.glb.clouddn.com/avater.jpg", "cat": "58d34967aa3fcd439fdd9190" }'
{"msg":"新增商品成功","product":{"__v":0,"name":"商品名称","summary":"这是简介","price":1003,"poster":"http://7xopqp.com1.z0.glb.clouddn.com/avater.jpg","cat":"58d34318d7323710331dc2bc","_id":"58d344c5d4668b112628a765"}}%
```

获取一个商品也可以成功了：

```
$ curl localhost:3008/product/detail/58db2677099b77fde4469219
{"msg":"获取商品详情成功","product":{"_id":"58d345d5d4668b112628a766","name":"商品B","summary":"这是简介","price":1003,"poster":"http://7xopqp.com1.z0.glb.clouddn.com/avater.jpg","cat":{"_id":"58d34318d7323710331dc2bc","name":"fish"},"__v":0}}%
```

### 前端创建一个新页面

- [new product page](https://github.com/happypeter/aa-journey-demo/commit/8ae3490c8b7d7c5041a1171b2c8446cf2a393fa8)


### 表单提交

- [new-product component](https://github.com/happypeter/aa-journey-demo/commit/d2f13912ed133d3752976dd577d447bf7174271a)
