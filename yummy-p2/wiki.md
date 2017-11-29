

- 第八个，数据可视化。
  - 【侧边栏】-> 【猜你喜欢】-> 【单品详情】
  - 实现了可以点击进行互动的饼状图。
- 第九个，发评论。
  - 
- 第十个，加好友。
  - 退出登录，用另一个用户身份登录
  - 默认操作盘页面上没有好友更新
  - 浏览商品的时候，看到 happypeter 
  - 点击，进入 happypeter 的个人详情页
  - 点 follow 
  - 这样， billie 就是 happypeter 的粉丝了
  - billie 到自己的操作盘页面，就可以看到 happypeter 的评论内容了。
- 第十一个，购物车。
  - 前面的几个功能都是社交相关，购物车功能是电商网站的核心功能。
  - 从操作盘界面，看到的好友评价，直接点击进入甜点详情页
  - 架构标签下面有购物车图标
  - 点一下，右下角会出现购物车图标，显示已购商品数量
  - 点一下图标，可以进入结算区，进行单品数量的增减
  - 可以继续购物
  - 最终回到结算区，点结算，成功后会跳转到操作盘页面，并显示提示信息。


前台用户系统就是这十二个主要功能了。

再来看一看 API 这边都实现了哪些功能点。

- 表关系。
- multer 图片上传。

最后说说后台管理系统的功能点。主要是提交和管理新甜点的功能。这部分的源码会跟前端代码一样提供给大家，但是开发过程会放到《蚂蚁设计实战》课程中去详细讲解。


好，介绍视频的内容就到这里。《React 社交化电商》，咱俩一起做。



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

