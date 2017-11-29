# 懒汉的 ES6 模块

本节专门来介绍一下 ES6 模块的最最最简单的使用方法，为后面定义 react 组件打下基础。


### 所有代码

[es6 module](https://github.com/happypeter/react-transform-boilerplate/commit/d58cd81c784342b8a3754bdd48b214a6aeaf1eaa)

### 定义一个 ES6 语法的 class

参考[阮一峰书的 Class 部分](http://es6.ruanyifeng.com/#docs/class)

```
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '('+this.x+', '+this.y+')';
  }

}
```

### 使用 defualt export （默认导出）

关于这一部分，可以参考 [使用 npm 和 ES6 模块进行前端开发](http://haoduoshipin.com/v/179) 这篇文章的 defualt export 相关小节。

```
export default firstNames
```

模块中导出的也不一定是 class ，也可以导出 function （参考 [阮一峰的书](http://es6.ruanyifeng.com/#docs/module#export-default命令)）或者是变量。


### Bable

ES6 的功能，包括我们这里的模块功能，都是浏览器不支持的，但是没有关系，可以通过 [Babel](https://github.com/babel/babel) 来进行编译。Babel 可以把 ES6 代码编译成浏览器可以识别的 js 。
