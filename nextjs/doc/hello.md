### 创建项目

创建一个项目为`nextjs-demo`，执行以下几个命令：

```
mkdir nextjs-demo
cd nextjs-demo
npm init -y
npm install --save react react-dom next@4.0.0-beta.2
mkdir pages
```

执行上述命令之后，修改 package.json 文件如下：

```
"scripts": {
  "dev": "next"
},
```

然后，执行下面命令，就可以把创建的 nextjs-demo 项目跑起来了

```
npm run dev
```

打开浏览器访问 localhost:3000 网址，可以看到一个404页面，说明我们访问的项目首页不存在。

### 添加首页

在目录 pages 下面新建一个文件名为 `index.js`，文件内容如下：

```
const Index = () => (
  <div>
    <p>Hello world</p>
  </div>
)

export default Index
```

保存文件之后，再次访问 localhost:3000 页面，会发现页面中出现了'hello world'字样
