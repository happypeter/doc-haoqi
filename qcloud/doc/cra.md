创建 Create-react-app 的一个基本项目。

### 创建  Git 仓库

创建一个文件夹

```
mkdir qcloud-cos
```

把这个文件夹作为 Git 仓库。


### 创建客户端项目

```
cd  qcloud-cos
create-react-app client
```

然后按照我习惯的方式删除调整一下文件结构：

- 删除不需要的文件，例如 App.css logo.svg 等
- 把所有组件移动到 src/components 文件夹
- 所有 container 移动到 src/containers

### 显示一个 hello 即可

client 文件夹内

```
npm start
```

能正确显示 hello 即可。

### 项目技术架构

* 前端
    * create-react-app + antd
    * [前端 js SDK v5版本](https://cloud.tencent.com/document/product/436/11459#.E5.88.86.E5.9D.97.E4.B8.8A.E4.BC.A0.E4.BB.BB.E5.8A.A1.E6.93.8D.E4.BD.9C)

* 后端
    * node.js
    * Node.js SDK v5版


### 代码

commit: cra
