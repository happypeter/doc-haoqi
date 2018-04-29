# 部署 API 到 Nginx 服务器

把代码用 scp 或者 git clone 的形式放到服务器上，下面来部署一下 API 。主要看看如何用 tmux 维持进程不死，并且如何配置 Nginx 实现端口代理。

### tmux 维持进程不死

```
ssh haoqicat.com
```

登录服务器。然后进入项目， 运行 `npm i` 进行装包，

```
tmux
```

启动 tmux ，以便维持进程不死。

```
node index.js
```

在 tmux 的一个 session 中，启动 express 。如果遇到端口被占用而造成的报错，就调整一下端口号。

这样，`ctrl-b-d` 退出 tmux session 。 `ctrl-d` 退出 haoqicat.com 服务器，然后再次登录。

```
tmux a
```

可以看到，express 进程不会因为服务器 shell 的关闭而被杀死。

### 配置 nginx

/etc/nginx/site-enabled/express-api.conf

```
server {
    listen     80;
    server_name express-api.haoqicat.com;

    location / {
        proxy_pass http://localhost:3009;
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

把 localhost 的 3009 端口，映射为 80 端口，也就是 http 的默认端口。

```
sudo service nginx reload
```

然后重启 ngnix 。

启动 postman ，执行 `GET http://express-api.haoqicat.com/posts` 请求，看到服务器是可以成功响应的。
