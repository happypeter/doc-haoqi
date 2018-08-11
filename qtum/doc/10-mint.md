这集就非常激动人心了，我们来发行自己的代币。量子链上可以发行 ERC20 标准的代币，和以太坊平台上完全兼容。

## 部署合约

发币本身就是发起一个智能合约，合约中规定了币的各种属性。比如，最常见的的一个属性是这个代币是否有上限。这里我们要发行的就是 CappedToken ，也就是有上限的代币。智能合约不用自己写，网上有现成的，我们先下载下来。

保证 docker 处于启动状态。

```
mkdir mytoken && cd mytoken
```

创建一个 mytoken 文件夹，并进入。

```
git clone https://github.com/OpenZeppelin/openzeppelin-solidity.git
```

下载 OpenZeppelin 发布在 Github 上的代码。其中就包含了我们需要的 CappedToken 的合约代码，是 Solidity 语言写的。


```
qcli getnewaddress
qdgznat81MfTHZUrQrLZDZteAx212X4Wjj
```

部署合约的过程跟前面讲的没有区别，先来生成 owner 地址。

```
qcli sendtoaddress qdgznat81MfTHZUrQrLZDZteAx212X4Wjj 10
```

向地址中转十个币，用来做手续费。

```
qcli listunspent 1 99999 '["qdgznat81MfTHZUrQrLZDZteAx212X4Wjj"]'
```

稍后查看一下，发现钱到账了。


```
export QTUM_SENDER=qdgznat81MfTHZUrQrLZDZteAx212X4Wjj
```

把这个地址设置为 `QTUM_SENDER` 这个环境变量的值。solar 会使用这个环境变量。


```
 solar deploy openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol  '[50000000]'
```

执行 `solar deploy` 部署智能合约，这里的五千万，指的是代币发行量上限。

## 使用 ABIPlayer 

前面章节中，合约部署后，我们直接写代码跟程序进行了交互。其实在量子链官方的环境中，还提供了 ABIPlayer 这种图形界面的形式来交互。

docker 容器中是包含 ABIPlayer 的，到 http://localhost:9899/abiplay/ 即可打开 Player 。

调用接口 `totalSupply` 可以看到此时余额为0。所以现在我们就铸造一些代币。点 mint 按钮。弹出的界面中 to 一项填写 owner 地址，如果忘了，可以用 solar status 获得。地址格式要求是十六进制的，所以要用 `qcli gethexaddress` 来转换一下。铸造数量写 10000 。

发行代币是要收手续费的，所以要到 http://localhost:9899/ 授权。授权完毕，就可以回到 http://localhost:9899/abiplay/ 看到代币铸造中的状态了。

稍后，再次执行 totalSupply ，可以看到 output 变成一万了，意思是我们发行了一万个代币，而代币的上限是五千万了，所以如果未来不够用了，可以回来继续发。

- 参考： http://book.qtum.site/en/part2/erc20-token.html#deploy-contract

## Nodejs 脚本

下面我们用 Nodejs 脚本来跟智能合约简单交互一下。

server/index.js

```js
const { QtumRPC, Contract } = require('qtumjs')

const repo = require('./solar.json')

const rpc = new QtumRPC('http://qtum:test@localhost:3889')
const myToken = new Contract(
  rpc,
  repo.contracts['openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol']
)

async function totalSupply() {
  const res = await myToken.call('totalSupply')

  // supply is a BigNumber instance (see: bn.js)
  const supply = res.outputs[0]

  console.log('supply', supply.toNumber())
}

totalSupply()
```

代码中实现了读取 supply ，也就是读取目前已经发行的代币数量的操作。需要注意的就是这里的 `solar.json` 就是刚刚执行 solar deploy 时候生成的那个 json 文件。另外就是 `repo.contracts` 后面的 key 值，必须跟 solar.json 中对应的 key 值匹配上，不然执行本程序的的时候就会报错，说 `abi of undefined` 。


```
node index.js
```

执行，可以打印出刚刚铸币的数量，也就是一万。

## 总结一下

总结一下本节的成果。借助已有的开源合约代码，我们部署了一个发币的智能合约，设置了发行量上限是 5000万，然后通过 ABIPlayer 发行了1万个代币。最后用 Nodejs 程序跟智能合约交互，读取了代币的值。
