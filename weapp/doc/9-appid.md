# 真机预览小程序

本节课程简单介绍一下如何到[微信公众平台](https://mp.weixin.qq.com/)注册一个小程序，获取开发小程序需要的 AppID，然后在真机上预览咱们前面课程中开发的小程序。

### 注册小程序账号

打开 [微信公众平台](https://mp.weixin.qq.com/) 网页，在【账号分类】标题下方选择【小程序】，打开【微信小程序】介绍页面，在页面底部有一个绿色的【前往注册】按钮，点击按钮，就会打开【小程序注册】表单，按照提示填写账号信息、激活邮箱、信息登记。注册小程序的过程是很简单的，但是个人并不能注册微信小程序。本案例是以企业资质注册的微信小程序，在【信息登记】过程中，需要验证企业资质，采用企业对公账户向腾讯公司打款的方式进行验证。另外，还要绑定小程序管理员的微信号（绑定银行卡的微信号）。详细步骤参考[微信小程序接入指南](https://mp.weixin.qq.com/debug/wxadoc/introduction/index.html?t=1486373145)

当使用企业的对公账户向腾讯公司打款之后，当天小程序管理员就可以接受到微信团队发送的【小额打款验证结果通知】，验证成功之后，登录小程序管理后台，完善小程序信息，获取开发小程序需要的 [AppID](https://mp.weixin.qq.com/debug/wxadoc/dev/index.html)

### 真机测试

前面课程中，我们已经开发了一个简单没有 AppID 的小程序，现在我们把这个小程序改变成有 AppID 的小程序。启动【微信开发者工具】，添加一个新项目，打开【添加项目】对话框，填写我们已经获得的小程序 AppID，项目名称为 `haoqicat`，项目目录就选择已经开发的没有 AppID 的小程序所在的目录，最后点击 [添加项目]，这样，之前没有 AppID 的小程序就成了有 AppID 的小程序了。

小程序打开之后，点击左侧工具栏中的【项目】标签项，打开小程序项目的【基础信息】介绍页面，这时【预览】按钮已经生效了，点击这个按钮会弹出一个对话框，用小程序管理员的微信扫描对话框中的二维码，就可以在手机中浏览小程序的运行效果了。

不止小程序管理员微信号可以真机体验小程序，绑定为小程序开发者的微信号也有这个权限，绑定小程序开发者需要由小程序管理员完成。

### 小程序管理后台

在本课程小程序案例中，我们使用了小程序的网络 API 请求存放到 GitHub 上的测试数据。当在手机上预览小程序的时候，你会发现无法请求 GitHub 上的数据。这是因为存放测试数据的域名没有在小程序的管理后台注册，导致域名不合法，所以无法请求到数据。因此，登录小程序管理后台，设置小程序的【服务器域名】。添加【request 合法域名】完成之后，在本地小程序开发者工具的【项目】标签项下的【配置信息】页面中，点击【刷新】按钮，可以看到在小程序管理后台添加的 [request 合法域名]。

这会儿再点击【基础信息】页面中的【预览】按钮，重新扫描一下新生成的小程序预览二维码，这次在手机上就能看到从 GitHub 上请求的测试数据了。
