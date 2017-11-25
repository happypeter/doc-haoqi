# 介绍视频

你好，我是 Peter 。欢迎来到 《React 社交化电商》课程。这集是课程简介，分两个部分来说，第一个就是都用到了哪些技术，第二个就是实现了哪些功能

### 技术点

先看第一部分，都用到了哪些技术呢？

- 第一个，Sketch 快速画出你的想法
- 第二个，React 让组件化思想拆分负责度
- 第三个，蚂蚁设计，用户体验超棒的 React 组件库
- 第四个，Redux ，用单向数据流加唯一状态树，大大简化组件间数据交互
- 第五个，React-Router 单页面应用的心脏

前四个都是前端技术，再来看后端

- 第六个，Express Nodejs 社区实现 API 的最流行方案，没有之一
- 第七个，MongoDB ，来看看文档型数据库的数据冗余怎么玩


### 再看案例

来，一起看看咱们会一起实现哪些功能点。
（我会分多个小点来说，每个小点可能会穿插一个或者多个操作，一个操作为一个单位，由三部分组成，
 先说功能名称，然后演示功能，最后补充说明。）

先来看，前台用户系统都有哪些功能点。

- 第一个，在手机微信中完美打开。适应移动大时代。
- 第二个，注册功能。通过用户名密码注册。
- 第三个，登录功能。退出登录后，用户可以用相同的用户名密码再次登录进来。
- 第四个，登录后的加载 Spinner ，延迟是我故意在 API 上加的，前端的底层是用 Redux 设置一个 isFetching 状态位来实现
- 第五个，操作盘界面可以看到网站更新。基本内容就是我 follow 的人对一些甜点的评价。而这些来自我喜欢的人的点评，会直接影响我的购买欲望。
  - 这也就是所谓的社交化电商。
- 第六个，个人中心上传头像。
  - 【点侧边栏】-> 【个人中心】
  - 这里可以上传新头像
- 第七个，修改可以直接映射到其他组件上。
  - 这个要大力感谢 Redux 了
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
- 第十二个，受保护页面。
  - 如果用户没有登录，那么他也可以选购商品
  - 但是如果想点购物车图标进入结算区
  - 会发现结算区页面是一个受保护的页面
  - 访客会自动被重定向到登录页，要求进行登录
  - 登录后，网站会自动跳转回之前的受保护页面
  - 可以看到原有的购物信息还在

前台用户系统就是这十二个主要功能了。

下面来介绍后台管理系统的功能点。

- 第一个，甜点店老板可以以管理员身份登录。登录进来，看到的是操作盘界面。
- 第二个，看到网站各种资源统计信息。包括自己点里面目前的甜点品种，订单信息。
- 第三个，新增甜点。上传海报，填写名称描述和价格。到前台，就可以看到新加的甜点了。


最后看一看 API 这边都实现了哪些功能点。

- 表关系。
- multer 图片上传。


好，介绍视频的内容就到这里。《React 社交化电商》，咱俩一起做。