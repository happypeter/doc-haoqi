# 配置 Nginx 服务器

代码上传到服务器只是部署工作的第一步，接下来我们看看如何用 tmux 维持进程不死，并且如何配置 Nginx 实现端口代理。


### npm 装包

运行 `npm i` 进行装包，然后，先启动 tmux ，以便维持 npm start 进程不死：

```
peter@cat:~/sites/express-love-api-demo/server-api$ npm start

> server-api@1.0.0 start /home/peter/sites/express-love-api-demo/server-api
> node index.js

running on port 5000...
success!
```

现在的问题是，我们这个项目跑到 5000 端口，但是如果我们用 express-api.haoqicat.com 这个域名直接访问服务器，默认是80端口。现在的问题是如何，让指向80端口的访问转到5000端口。


### 配置 nginx

通过下面的方式来把80端口和5000端口对应起来：

```
server {
    listen     80;
    server_name express-api.haoqicat.com;

    location / {
        proxy_pass http://localhost:5000;
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

然后重启 ngnix

```
sudo service nginx reload
```

这样就行了。
