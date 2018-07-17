本节课程我们将在 NodeJS 环境中，编写一个 NodeJS 脚本，借助量子链提供的 Qtum.js 库调用上一节部署的 Counter.sol 智能合约的接口。

## 写 node 程序

保证我们的 Mac 系统上已经安装了 NodeJS v8.0 以上的版本。 创建并进入一个名为 server 的文件夹。

```
npm init -y 
npm install --save qtumjs
```

生成 package.json 文件，然后安装 qtumjs 。qtumjs 是量子链官方发布的辅助大家用 JS 开发 Dapp 的库。作用主要就是负责如何在 JS 程序中调用智能合约。

index.js

```js
const { QtumRPC, Contract } = require('qtumjs')

const repo = require('./solar.development.json')
const rpc = new QtumRPC('http://qtum:test@localhost:3889')
const contract = new Contract(rpc, repo.contracts['Counter.sol'])

async function increment() {
  // send to write
  const tx = await contract.send('increment', [2])
  console.log(`tx:`, tx)
}

async function count() {
  // call to read
  const res = await contract.call('getCount')
  const count = res.outputs[0]
  console.log('count', count.toNumber())
}

increment()

count()
```

创建 index.js 里面来执行调用智能合约的操作。首先从 `qtumjs` 库中导入 `QtumRPC` 和 `Contract` 。导入 solar.json 中的信息，连接 docker 中的 qtum 服务，然后获得协议的句柄存放到 contract 变量中。定义 increment 函数，里面通过该 `contract.send` 执行合约中的 `increment` 方法，传递的参数是 `2` 用中括号括起来。最后打印一下交易详情。

下面在 count 方法中，调用智能合约的 `getCount` 接口，并打印返回的 `count` 值。

这样，代码就写好了。

## 执行

在 docker 镜像正常运行的条件下，执行命令

```
node index.js
```

多次执行，会发现每次执行完毕，count 并不会立即变化，而需要经过几秒钟的确认时间，大部分的区块链上的写操作都是需要网络上的确认，所以都需要一定的确认时间，例如比特币的确认时间是10分钟。开发中需要注意的是，向区块链上的写操作时一个异步操作。

```
qcli listunspent 1 99999 '["qSucHpTJJiUXQf5f8HG3bCV1n92KMFxtA1"]'
```

每次执行合约都要花费一定数量的 gas ，可以通过 `qcli listunspent` 命令，查看 owner 地址余额的变化，会发现代码执行的次数越多，余额就会越少。Gas 是以太坊智能合约引入的一个很巧妙的机制，防止智能合约作者滥用区块链资源，例如写一个无线循环。有了 Gas 机制，owner 账号的币会不断作为 gas 消耗，如果消耗光了，那么智能合约也就不能执行了。

## 总结一下

这节演示了使用 nodejs 脚本跟智能合约进行交互。总体上跟我们日常开发中调用 API 没有区别，但是有两点需要注意。首先，每次执行合约，都会有确认时间的问题，所以如果执行了对合约的写操作，不要期望能立刻读取到修改后的值。第二就是，执行合约代码，合约的 owner 会被扣 gas 的，也就是要花钱的。这两个特点是跟我们通常的编程情景不太相同的。
