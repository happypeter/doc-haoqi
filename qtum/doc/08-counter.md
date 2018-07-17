开发环境有了，马上来写一个智能合约吧。为了把基本原理演示清楚，我们先来写一个 Hello World 级别的智能合约，本节来把它写好，部署一下，下一节来看看如何来调用它。

## 写合约

我们用经典的 solidity 语言来写我们的合约，保存到 Counter.sol 文件中，注意，文件名首字母要大写。

```
pragma solidity ^0.4.22;

contract Counter {
  uint256 count;
  
  constructor(uint256 startCount) public {
    count = startCount;
  }

  // Increment counter by n
  function increment(uint256 n) public {
    count += n;
  }

  // Return current count
  function getCount() public returns(uint256) {
    return count;
  }
}
```

来解释一下： pragma 这一行设置了 solidity 的编译器器版本。第二行 contract ，也就是合同，是一个非常独特的数据类型了。这里我们的合同超级简单了，就是一个计数器，你说计数器能算是一个智能合约吗？答案是，Yes 。所以智能合约这个概念还是比较宽泛的。`uint256` 是无符号整形，`count` 是我们要去修改的变量名。下面构造函数中，接收一个计数初始值，如何传入一会儿会看到。下面定义一个方法 `increment` ，可以接收参数 n ，决定每次增加的数量，方法中会修改 count 的值，这是一个对区块链的写操作。下面 `getCount` 是一个读操作。

solidty 基本语法还是很简单的，有点 C 语言和面向对象基础，就可以看懂。

## 配置合约 owner

首先明确一点，量子链上部署合约是要花钱的。所以部署合约的时候肯定是要指定一个里面有余额的量子币账户地址的。

进入开发环境的命令行。

```
qcli getnewaddress
```

运行命令来生成一个新地址。得到的这一串数，就是地址了。

```
qdbtyhPBb2se1jeoYipUvfYE5QMSus5dEh
```

之前我们不是通过记账获得了两万个量子币，下面来往这个地址中转十个币。

```
qcli sendtoaddress qdbtyhPBb2se1jeoYipUvfYE5QMSus5dEh 10
```

执行的子命令是 sendtoaddress 。

这样，我们就有了一个地址，里面存着十个量子币。当然，这些只是我们自己的开发环境下才承认的量子币，外面可流通不了。

这个地址，就会作为合约的拥有者。

### 部署合约

来看看具体部署步骤吧。

```
export QTUM_SENDER=qdbtyhPBb2se1jeoYipUvfYE5QMSus5dEh
```

首先把要作用拥有者的的地址设置成一个环境变量。

```
/dapp # solar deploy Counter.sol '[1]'
exec: solc [Counter.sol --combined-json bin,metadata --optimize --allow-paths /dapp]
🚀  All contracts confirmed
   deployed Counter.sol => 124e0c5c0015381d3992daed379cadbfa65f4803
```

接下来用 solar 命令进行部署，solar 是专门的部署工具。Counter.sol 是合约名，还是要注意首字母需要大写。合约的构造函数中是需要传递参数的，这里传入1，用单引号和中括号包裹。

回车执行操作，输出中可以看到首先调用了 `solc` 也就是是 solidity 的编译器对代码进行了编译。下面 `All contracts confirmed` 意思是所有合约都得到了确认。最后一行中长长的一串数就是合约地址了，这个后面会用到。


```
solar status
```

执行 `solar status` 查看合约部署情况。

```
✅  Counter.sol
        txid: ac90dcd4f3b95f8a11e79292d5f314ff2a0efb5f3b547879563c6abbd3a4b331
     address: 124e0c5c0015381d3992daed379cadbfa65f4803
   confirmed: true
       owner: qVq6eqiKsfVuWMdYWTWxo8Xzh7QcAHvBwr
```

输出的信息中可以看到合约名，`Counter.sol` ，`txid` 是交易 id ，因为部署合约的过程也是发起一个交易。`address` 是前面提过的合约地址。`comfirmed` 表示本次交易得到了确认，也就是合约已经正式生效了。最后一行就是 `owner` ，也就是之前我们存了10个量子币的那个地址。合约执行的时候是需要花钱的，每次就是从 owner 地址中去扣。

## 总结

这一节部署了一个计数器合约。主要内容就是这些了，来回顾一下咱们都做了点啥。首先一步是写合约代码，使用的是 solidity 语言。然后生成了一个新的量子币账户地址，作为合约的拥有者。最后进行了合约部署，把合约部署到了我们自己开发环境的这条区块链上。
