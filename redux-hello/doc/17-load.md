# 从服务器端加载数据


### 实现 axios 读取后台评论操作

要求，store 中的死数据（仅限于评论）全部删除，从后台读取，加载到页面上。每篇文章各自显示自己的评论。

难点：后端得到的数据，跟我们前端需要的格式有差异，需要用代码调整一下数据格式。

参考：

如何从服务器加载数据到 redux 中，参考：https://github.com/happypeter/hand-in-hand-react-demo/blob/master/client/complete/src/ui/DashBoard.js#L11

代码：

- [load data from server OK](https://github.com/happypeter/redux-hello/commit/3305ae8cf37dc8c46c535091e2264e1a8eedb13b) 调整了 action ，成功的从服务器端获取了所有评论，并显示到了页面上。
