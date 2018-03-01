# 用 class 关键字创建类

这里写书写我们的第一个 class ，主要介绍用 ES6 语法如何写，但是也演示了 ES5 下的老写法。

### 搭建环境

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>o-o-js</title>
</head>
<body>
  <h1>Try OO</h1>
  <script src="src/index.js"></script>
</body>
</html>
```

创建一个空的 html ，里面指向 src/index.js 。 由于 Chrome 已经支持了大部分的 ES6 语法，所以这里暂时不用配置 Babel 了。

src/index.js

```js
console.log('hello')
```

添加 index.js 进来。

浏览器中，打开 index.html ，看到 console 中打印出了 hello 。

### 创建一个类

index.js

```js
class Person {
  constructor(name) {
    this.name = name
  }
}
let peter = new Person('peter')
console.log(peter.name)
```

创建一个 Person 类，构造函数中可以传递参数 name 。传入的值会作为当前对象的属性 name 的值。下面来使用这个类，具体方式就是使用 new 关键字，传递参数 peter 。new 出来的对象赋值给 peter 变量。最后打印 peter.name 。

浏览器中，可以看到打印出来 peter 。

## 添加一个方法

index.js

```js
class Person {
  constructor(name) {
    this.name = name
  }
  changeName(newName) {
    this.name = newName
  }
}
let peter = new Person('peter')
peter.changeName('happypeter')
console.log(peter.name)
```

添加 changeName 方法，下面调用一下传入 happypeter 。

浏览器中，可以看到打印出了 happypeter 。

### 用 prototype 老语法重新实现一下

index.js

```js
function Person(name) {
  this.name = name
}

Person.prototype.changeName = function(newName) {
  this.name = newName
}

var peter = new Person('peter')
peter.changeName('happypeter')

console.log(peter.name)
```

虽然实际中我推荐大家直接用 ES6 新语法，但是 ES5 下的老语法下用 prototype 如何来实现相同的效果咱们还是要了解的。首先定义构造函数 Person 注意，构造函数习惯上是要大写的。然后用 prototype 的形式添加 changeName 方法进来。使用的时候也用 new 关键字。

浏览器中，看到运行正常。
