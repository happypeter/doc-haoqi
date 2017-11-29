#  Airbnb 的 React 代码规范

参考文档： [Airbnb React/JSX 编码规范](https://github.com/JasonBoy/javascript/tree/master/react#basic-rules-%E5%9F%BA%E6%9C%AC%E8%A7%84%E8%8C%83)

### 不给私有函数添加 _ 前缀

因为它们本质上也不是私有的。

- [remove _](https://github.com/happypeter/aa-journey-demo/commit/df2b00b9f1e505a71ed0e80f5de7eb498063da2a)


### 引号

JSX属性值总是使用双引号("), 其他均使用单引号(').

- [quote](https://github.com/happypeter/aa-journey-demo/commit/9c3c1781e0a37993d55c6555f96a7c3ccdf0f976)

### Spacing 空格

- [spacing](https://github.com/happypeter/aa-journey-demo/commit/ba9dbf76e66bc9268c51d78ce5813c842c9d7231)

### 绑定 this

提前在构造函数里把 this 绑定上去.

>为什么? 在每次 render 过程中， 再调用 bind 都会新建一个新的函数，浪费资源.


- [bind in constructor](https://github.com/happypeter/aa-journey-demo/commit/f405fbb37315ea2a37acc8ac4a4f91e5ff76d339)
