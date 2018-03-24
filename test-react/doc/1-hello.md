# Hello World

测试 React 目前最流行的方式是使用 facebook 自己的 [Jest 框架](https://facebook.github.io/jest/zh-Hans/)，本节先跑一个 Jest 测试的 Hello World 。

### create-react-app 创建项目

```
create-react-app demo
cd demo
npm test
```

创建课程案例项目，进入项目，直接运行 npm test 。

命令行中， 可以看到自动运行了 App.test.js 中的测试代码，可见在 create-react-app 环境下 Jest 是已经配置好的。

### 第一个测试

删除 App.test.js 。来动手写自己的第一个测试。

src/selectors/index.js

```js
export const sum = (a, b) => a + b
```

src/selectors/index.spec.js

```js
import { sum } from './index'

it('should return sum', () => {
  expect(sum(1, 1)).toBe(2)
})
```

首先导入被测试对象 `sum` 函数。下面写一个 Jest 的测试。接口是 `it` ，跟自己的第一个参数 `should return sum` 正好可以连接成一句完整的话，这句话就是这个测试的目的，这里就是：它要能返回数字之和。具体的测试语句都写到 `it` 的第二个参数，也就是回调函数中。

测试无非就是给一个函数合法的输入，来判断一下它的输出是否符合我们的期待。这里 Jest 提供的 `expect` 接口，字面意思正好也是期待的意思。`expect` 基本不会单独使用，后面都会跟上匹配器，例如这里的 `toBe` 。官网上[给出的匹配器](https://facebook.github.io/jest/docs/en/expect.html)有二十来种。这里的测试语句几乎就是一句英文大白话了：我期待 `sum(1, 1)` 的返回结果是 `2` 。

命令行中，运行 `npm test` ，可以看到 `should return sum` 这一行前面有个小对号，表示测试通过了。
