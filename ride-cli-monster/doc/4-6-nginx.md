# 配置 nginx

安装服务器软件 nginx ，然后进行配置，让我们的代码上线。

### 安装

```
sudo apt-get -y install nginx
```

### 最简单的配置

project.conf 内容如下

```
server {
  listen 80 default;
  root /home/peter/project;
}
```

### 查看错误

配置修改完毕，需要重启 nginx 加载配置，也就是要执行

```
sudo service nginx reload
```

如果这一步失败，可以通过下面的命令来查看具体的报错信息：


```
nginx -t
```
