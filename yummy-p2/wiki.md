- 第一章瞄准社交和电商之外的功能
  - 数据可视化
  - 发评论
  - 走马灯界面增强

- 第二章社交化
  - 操作盘界面可以看到网站更新。基本内容就是我 follow 的人对一些甜点的评价。而这些来自我喜欢的人的点评，会直接影响我的购买欲望。
  - 个人中心上传头像。
    - 【点侧边栏】-> 【个人中心】
    - 修改可以直接映射到其他组件上。
    - 后端 multer 图片上传。
    - 表关系。
  - 加好友。
    - 退出登录，用另一个用户身份登录
    - 默认操作盘页面上没有好友更新
    - 浏览商品的时候，看到 happypeter
    - 点击，进入 happypeter 的个人详情页
    - 点 follow
    - 这样， billie 就是 happypeter 的粉丝了
    - billie 到自己的操作盘页面，就可以看到 happypeter 的评论内容了。

- 第三章电商
  - 购物车。
    - 从操作盘界面，看到的好友评价，直接点击进入甜点详情页
    - 架构标签下面有购物车图标
    - 点一下，右下角会出现购物车图标，显示已购商品数量
    - 点一下图标，可以进入结算区，进行单品数量的增减
    - 可以继续购物
    - 最终回到结算区，点结算，成功后会跳转到操作盘页面，并显示提示信息。

注意：后台管理系统，会放到《蚂蚁设计实战》中去讲解。


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

=