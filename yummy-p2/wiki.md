
注意：后台管理系统，会放到《蚂蚁设计实战》中去讲解。

第二门
《社交化电商，功能篇》，主要实现社交化和电商的各项具体功能，架构上基本没有什么新的知识

- 受保护页面
- 数据可视化元素
- 走马灯界面增强
- 修改头像
- 发评论
- 购物车

### 图片上传

multer 要求客户端发过来的请求必须是 mutipart
的，所以，再进行服务器端调试之前，先要保证，客户端的 network
标签下，输出如下：

``
Content-Type:multipart/form-data;
boundary=----WebKitFormBoundary2sCUKPuI2gClzzTf
Host:localhost:3008
Origin:http://localhost:3000
Pragma:no-cache
Referer:http://localhost:3000/profile
User-Agent:Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X)
AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143
Safari/601.1
Request Payload
------WebKitFormBoundary2sCUKPuI2gClzzTf
Content-Disposition: form-data; name="avatar"; filename="b.png"
Content-Type: image/png


------WebKitFormBoundary2sCUKPuI2gClzzTf
Content-Disposition: form-data; name="userId"

5a17c130d1b60aaec58a9cfd
------WebKitFormBoundary2sCUKPuI2gClzzTf--
Name
avatar
data:image/png;base…
150a376f1692f6283753be1ecc7127af
``

具体需要做的就是用 formData 来组织数据，然后把 formData 直接传递给 axios
即可，不需要给 axios 设置 config { header: xxx}
axios 可以自动识别 formData 对象，改变 Content-Type。

我自己的浪费时间的地方在于，本来应该

``
this.props.updateAvatar(formData)
``

结果我写成了

``
this.props.updateAvatar({formData})
``

导致，传递给 axios 的实际数据是一个空对象，所以请求的 Content-Type 一直就都是
application/json 。


lideStr 的时候，dish-card 之外必须包裹一层 div ，这样 dish-card
自身设置的高度才会生效。

``
let slideStr = [
  <div className='dish-card-wrap' key='1'>
    <div className='dish-card'>
      hh
    </div>
  </div>,
  <div className='dish-card-wrap' key='2'>
    <div className='dish-card'>
    </div>
  </div>
]

let slides = (
  <Slider {...settings}>
    { slideStr}
  </Slider>
)
``

### 坑：关于 dot 的拜访

下面的几个点，我希望用 flexbox 形式让它们始终停留在屏幕最底端，不过由于作者对
dot 的位置设置用了

``
position: absolute;
margin-top: -25px;
``

这样的操作，导致设置 flexbox 遇到了困难。所以，还是干脆给卡片本身设置了：

``
height: 75vh
``

下方给 dot
留出了足够的显示空间。这样效果也并不难看，而且也能适应大部分屏幕尺寸。

