### TODO

- 无网络条件下，项目之间报错退出


主要要实现的功能： 拖拽文件以上传至cos的bucket中指定的文件夹里。

功能拆分：
* 拖拽文件
* 上传文件至bucket
* 指定/创建 bucket中的目标文件夹
* 上传进度条显示
* 删除bucket中的文件
* 重命名bucket中的文件


实现步骤：

按照实现的功能来拆分内容即可，先做简单的，例如读取所有文件，这一步中，就把 redux/express/antd 都用起来。然后再做复杂的，例如上传文件，过程中不断丰富 redux/antd 功能即可。

- 读取 bucket
  - 先要调通腾讯云接口，不然就不知道都有哪些数据可以用
    - 使用 curl 或者自己写几个简单的 react/axios 组件，把数据拿到，不求美观，console.log 能看到数据即可
  - 不使用 antd

- 接下来是规划 redux 数据结构
- 写界面


* 前端
    * create-react-app + antd
    * [前端 js SDK v5版本](https://cloud.tencent.com/document/product/436/11459#.E5.88.86.E5.9D.97.E4.B8.8A.E4.BC.A0.E4.BB.BB.E5.8A.A1.E6.93.8D.E4.BD.9C)

* 后端
    * node.js
    * Node.js SDK v5版
