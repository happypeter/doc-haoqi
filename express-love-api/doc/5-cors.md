# 解决跨域请求问题

但是，如果我们到 react-client 项目中，发 axios 请求

```
componentWillMount() {
  axios.post('http://localhost:5000/post', {title: 'myTitile', content: 'myContent', Category: 'myCat'}).then(
    console.log('request sent....')
  )
}
```

上面的代码本身没有错误，但是执行的时候，依然会报错：


```
XMLHttpRequest cannot load http://localhost:5000/post. Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access.

```

翻译：XMLHttpRequest（是 chrome 底层发送 http 请求的工具）不能加载 http://localhost:5000/post 。请求没有通过访问权限检查：被访问的资源的报头中，没有设置 Access-Control-Allow-Origin 这一项。所以访问源头 http://localhost:3000 （也就是我们客户端网站的网址）不允许访问服务器。


这个问题就是属于**跨域请求**，这个默认都是不允许的。具体什么是跨域请求，我们到 《 跟 Peter 学 HTTP 》部分再详细讲。这里直接给出解决方案。


### 解决方案

大家要记住的是：这个问题必须由后端开发者解决。需要安装一个包

```
npm i  --save cors
```

这个上面的报错就没有了。
