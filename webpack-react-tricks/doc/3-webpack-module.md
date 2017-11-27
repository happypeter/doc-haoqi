# Webpack 打捆 ES6 模块

Webpack 可以支持的模块格式不局限于 **ES6 模块** ，但是由于我们写 React 项目主要用
ES6 来写，所以这一集就来演示一下用 Webpack 打捆 ES6 模块。


### 模块的命名导出和默认导出


我们这一集的重点并不是讲解模块的基础知识。但是还是顺便提一下 ES6 模块可以支持命名导出和默认导出两种形式。

src/index.js 如下：

```js
import  i from './a';
import { j, k } from './a';

console.log(i);
console.log(j);
console.log(k);
```

src/a.js 如下：

```js
const i = 1;
const j = 2;
const k = 3;

export { j, k };

export default i;
```

webpack.config.js 跟上集中一样。

### 编译和运行

执行 webpack 命令，可以把 index.js 和 a.js 打捆成一个 bundle.js 文件，浏览器中运行，chrome console
中会打印出

```
1
2
3
```

运行成功了。
