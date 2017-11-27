# 部署小程序后端 API 服务到阿里云

后续我们要实现微信支付的功能，整个支付流程要在真机环境下测试，所以这节课程我们就把小程序的后端代码部署到阿里云服务器上。主要介绍的知识点是 [pm2](http://pm2.keymetrics.io/) 进程管理工具的使用，以及同一台阿里云服务器上配置 [nginx](https://nginx.org/en/) 服务器，让域名和子域名都能使用 HTTPS 协议。

### 服务器上设置 Node.js 运行环境

本课程以好奇猫网站所在的阿里云服务器为例，登录到服务器上之后，先检查一下 [Node.js](https://nodejs.org/en/) 运行环境，执行命令：

```
nvm ls
```

因为小程序的后端代码使用了 ES6 的语法，比如说关键字 `const` 等，低版本的 Node.js 不能很好的支持 ES6 特性，所以要保证服务器上 Node.js 的版本是比较新的版本。那么，我们在服务器上直接安装最新的 Node.js 版本就好了。

```
nvm install v7.5.0
```

然后把 Node.js v7.5.0 版本设置为默认使用的版本，也就是一登录服务器，Node.js 的运行环境是 v7.5.0 版本：

```
nvm alias default 7.5.0
```

### 安装 pm2

Node.js 运行环境设置完毕之后，就可以全局安装 [pm2](http://pm2.keymetrics.io/) 包了，执行命令：

```
npm install pm2 -g
```

上述命令执行完毕之后，测试一下 pm2 是否安装好了：

```
pm2 --version
```

### 运行小程序后端代码

首先把小程序后端代码上传到服务器上之后，进入到项目目录，安装 npm 包：

```
cd ~/weapp-server
npm install
```

npm 包都安装好之后，该一下应用监听的端口号，因为 3000 端口已经被占用了，修改 `index.js` 文件：

```
app.listen(8080, function() {
  console.log('Your server is running on port 8080');
});
```

然后就可以使用 pm2 启动项目了，执行命令：

```
pm2 start index.js
```

这样，项目就启动起来了，可以通过下面命令查看 pm2 管理的进程：

```
pm2 list
```

查看小程序后台项目运行情况，执行命令：

```
pm2 show index
```

若项目启动失败，可以到项目的日志输出目录 `~/.pm2/logs` 中，查看文件 `index-error-0.log` 里面包含的错误信息。

关于 pm2 更多的介绍，请观看好多视频[第203期](http://www.haoduoshipin.com/v/203.html)的内容。

### 配置 nginx 服务器

项目我们的小程序后端代码已经运行起来了，但是公网上还不能访问，所以配置 nginx 服务器让域名 `api.haoqicat.com` 指向小程序后端 API 服务，并让域名使用 HTTPS 协议，上一节课我们已经介绍了这个知识点，首先从阿里云管理控制台获取免费的绑定 `api.haoqicat.com` 子域名的数字证书，然后把证书放置到 `/etc/nginx` 目录下，并设置访问权限，这个过程就不演示了。

然后创建域名配置文件：

```
cd /etc/nginx/sites-enabled
touch weapp-server.conf
```

添加以下内容到 `weapp-server.conf` 文件中：

```
server {
    listen       443 ssl;
    server_name  api.haoqicat.com;

    ssl on;
    ssl_certificate   /etc/nginx/https-api-cert/xxx.pem;
    ssl_certificate_key  /etc/nginx/https-api-cert/xxx.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_x_forwarded_host;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 3m;
        proxy_send_timeout 3m;
    }
}
```

保存文件，重新加载一下 nginx，让配置文件生效：

```
sudo service nginx reload
```

顺便说一下，若 nginx 重新加载失败，说明配置文件有错误，可以运行下面命令查找错误原因：

```
sudo nginx -t
```



至此，小程序后端 API 服务就算部署完毕了。


### 客户端调整

回到自己的开发机器，把本地运行的开发环境下的 weapp-server 代码都停下。


到微信小程序网页管理后台，在 `request合法域名` 中添加一项 `https://api.haoqicat.com`，这样，回到小程序开发者工具的“项目”选项卡下，点 `配置信息`，最终显示成这样：

```
https://raw.githubusercontent.com
https://api.haoqicat.com
```

然后，到 `项目 -> 基础信息` 下面，把 `不校验请求域名和 TLS 版本` 这一项撤销勾选。

最后，到小程序代码中，把所有的 `http://localhost:3000` 地址都改成 `https://api.haoqicat.com` 之后，测试一下运行结果吧。
