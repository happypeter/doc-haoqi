# 部署

最后演示一下，如何部署到服务器。

### 基本 nginx 配置

/etc/nginx/site-enabled/static.conf

```
server {
  listen 80;
  server_name static.haoqicat.com;

  root /home/peter/sites/static/;
}
```

做完域名指向后，添加一个简单的静态配置文件即可。

### gzip 压缩

/etc/nginx/nginx.conf

```
##
# Gzip Settings
##


# peter commented out the following 2 lines

# gzip on;
# gzip_disable "msie6";

# peter add the following 6 lines

gzip on;
gzip_vary on;
gzip_proxied expired no-cache no-store private auth;
gzip_types text/plain text/css text/xml text/javascript applicati
on/x-javascript application/xml;
gzip_disable "MSIE [1-6]\.";
```

注释掉原有的两行内容，添加六行内容进来。

```
sevice nginx reload
```

重新加载一下配置。

浏览器，Network 标签下，会发现每个文件都变成原始大小的三分之一左右了。

### 在线测试

发现由于代码分割，预加载，gzip 各种技巧的并用，UI 响应是非常良好的。

### netlify

最后就是可以推荐使用 netlify 这样的平台，很多工作就自动完成了。
