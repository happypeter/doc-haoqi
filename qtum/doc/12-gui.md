前面一节实现了在测试网上发币以及用 ABIPlayer 的形式来给用户转账。本节来实现一个有 Web 界面的用户提币流程。来看看一个 DApp 是如何跟智能合约交互，来实现转账的。代码是一个常见的前后端分离架构。前端跟之前我们提过的 Steemit.com 类似是 React 写的，后端是 Nodejs 。因为每个人技术栈可能并不相同，所以这里代码我们就不讲太细了，大家关键听一下思路。

## 搭建 React 前端

先来看前端代码。

```js
import React, { Component } from 'react'
import axios from 'axios'

class Home extends Component {
  state = {
    toAddr: ''
  }

  handleChange = e => {
    this.setState({ toAddr: e.target.value })
  }

  handleSubmit = () => {
    const url = 'http://localhost:3001/transfer'
    const { toAddr } = this.state
    axios.post(url, { toAddr }).then(res => {
      if (res.data.success) {
        alert('转币操作已提交到区块链')
      }
    })
    this.setState({ toAddr: '' })
  }

  render() {
    return (
      <Wrapper>
        <Content>
          <div>获得奖励数量5个</div>
          <Input
            placeholder="十六进制支付地址"
            value={this.state.toAddr}
            onChange={this.handleChange}
          />
          <Button onClick={this.handleSubmit}>提现</Button>
        </Content>
      </Wrapper>
    )
  }
}

export default Home
```

HTTP 客户端使用的是 axios 。state 值和 handleChange 函数都是是关于 React 受控组件的，这个大家不必太在意。重要的是用户提交的输入框中的字符串，可以在 `handleSubmit` 中拿到，然后发送到后端的 API 中，发送的内容就是一项，也就是提币者的量子链地址，并且需要是十六进制格式的那种，转换方法前面演示过了。

总之前端没有任何复杂内容，就是用户填写自己的提币地址，然后点提交按钮就可以发送给 API 了。

## 搭建 Express 后端

所以关键的代码还是在后端。

```js
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { QtumRPC, Contract } = require('qtumjs')
const repo = require('./solar.json')

const rpc = new QtumRPC('http://qtum:test@localhost:3889')
const myToken = new Contract(
  rpc,
  repo.contracts['openzeppelin-solidity/contracts/token/ERC20/CappedToken.sol']
)

const ownerAddr = 'qcpwZourCVREiVp9xZQLjbzysmxsYsBxNg'

app.use(bodyParser.json())
app.use(cors())

app.post('/transfer', async (req, res) => {
  const { toAddr } = req.body
  console.log(toAddr)
  try {
    const tx = await myToken.send('transfer', [toAddr, 5], {
      senderAddress: ownerAddr
    })

    console.log('transfer tx:', tx.txid)
    // const confirmation = await tx.confirm(1)
    // console.log('confirmation...', confirmation)

    return res.json({ success: true })
  } catch (err) {
    console.log('transfer err...', err)
  }
})

app.listen(3001, (req, res) => {
  console.log('running on port 3001')
})

```

导入 express 启动一个简单的 Web 服务器。其实跟前面我们演示过的 Node 脚本的思路没有太多区别，只不过代码现在封装到了一个 API 接口中去执行了。这里有几点需要注意：

- 首先要保证 docker 处于启动状态，并且使用的是测试网区块链，这个前面小节中已经演示过了。
- solar.json 一定要是部署到测试网的那个合约对应的 json 文件。
- 下面 ownerAddr 一项是合约的拥有者地址，如果忘了，可以到 solar.json 所在的文件夹中，执行 solar status 来查看。

接下来 transfer 接口中，执行 send 操作，呼叫合约的 `tranfer` 接口，进行转账，toAddr 是客户端提交过来的用户地址，是转入地址。用户拥有的代币数量这里是写死的5个。`senderAddress` 是合约拥有者地址。也就是本次转账的转出方。

## 提币过程解析

到前端界面中，填写十六进制地址，然后点提币。可以看到界面中显示出”转币操作已经提交到区块链“的通知。等待几分钟，等网络确认完成后 ，到 https://testnet.qtum.info/address/qaJZMwDzgyhX5V34KYUP9TZvF1mrBWr6tY 查看代币接收地址的详情，可以看到代币已经到账了。

用户提币过程，来梳理一下。首先用户在 web 界面上输入自己的提币地址，发送到服务器。后端程序把用户钱包地址以及提币金额传递给 docker 中运行的测试网的本地节点。这里的重点是 docker 容器中有合约拥有者的钱包，钱包中有合约拥有者的私钥的，钱包需要做的首先是生成交易，其中包括发起方地址，也就是拥有者地址，转账金额，这里是5，最后是接收方地址，也就是客户的地址。

交易构造完成之后，用钱包中的私钥对该交易进行签名。注意，签名这一步是至关重要的，前面的小节中，咱们一直说，私钥就像密码，有了它我就可以把私钥对应的地址中的币转出了。这个说法没有错，但是底层实现还是有很多细节的。交易签署后，真正要在全网生效，需要的是全网上其他的节点，都要承认这个交易。但是问题来了，其他节点中肯定是没有合约 owner 的钱包私钥的，那么他们怎么去验证这个交易的确是私钥持有者发起的呢？这个就涉及到私钥和公钥的关系问题了。因为其他节点是可以看到拥有者地址的，刚才说了，地址就是公钥。有了公钥，大家可以通过公钥和签名，来断定签名是不是由这个公钥对应的私钥签署的。这样也就等价于验证了，这个交易是不是真的由私钥的持有人签署的。更多的原理大家可以去网上搜搜数字签名方面的资料来看看。

这些就是整个提币过程的底层逻辑。

## 总结

本节的内容就是这些了，来总结一下。首先我们写了前后端代码，看到了在代码中如何实现用户提币的操作。然后介绍了整个过程的各个相关方，包括本地节点，钱包，私钥和地址都是如何来系统工作的。最主要的知识点就是理解公钥和私钥的关系，明白全网节点是如何确认交易发出者身份的。本节完整的代码在 [haoqicat/qtum/simple](https://github.com/haoqicat/qtum/tree/master/simple) ，欢迎大家参考。
