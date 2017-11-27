# 使用 Babel 编译 ES6

并不是所有的浏览器都支持 ES6（ES2015）的各种新语法，尽管像 Chrome 的最新版本已经支持了99%的新语法了。
但是，如果我们要把用 ES6 写的代码运行到产品环境下，还是要把 ES6 语法编译成 ES5 （也就是老语法）以获得
最佳的浏览器支持的。目前，工程实践中最常用的做法是用 Babel 来完成这个编译工作，本节来演示一下如何搭建
Babel 的编译环境。

注：如果只想尝试一下 ES6 语法，可以使用 https://babeljs.io/repl/ 。

### Babel 搭建步骤


```
echo '{}' >package.json
npm install --save-dev babel-cli
npm install --save-dev babel-preset-es2015
```


### 代码

index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>o-o-js</title>
</head>
<body>
  <script src="build/main.js"></script>
</body>
</html>
```

src/main.js

```
class Person {
  constructor(name) {
    this.name = name
  }
}

var Peter = new Person('Peter')
console.log(Peter.name)
```




### 参考

- https://babeljs.io/repl/
