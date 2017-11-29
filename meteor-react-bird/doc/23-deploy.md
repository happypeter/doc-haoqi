# 部署应用到服务器

依赖工具：

* Ubuntu 14.04.1 LTS (GNU/Linux 3.13.0-32-generic x86_64)
* nginx v1.6.2
* mongodb-org v3.0
* node 版本 v5.4.0
* 服务器 aliyun
* tmux

到目前为止，这个基于 meteor 的聊天室小应用已经开发完成了，接下来要做的工作就是把它部署到服务器上。请参考官方文档 [定制部署](http://guide.meteor.com/deployment.html#custom-deployment)。

### 本地准备工作

1. 把项目代码打包成一个 tarball，执行 [meteor build](http://docs.meteor.com/#/full/meteorbuild) 命令：

```
cd meteor-react-bird-demo
npm install --production
meteor build ../build --architecture os.linux.x86_64
```

命令执行完之后，会在 `../build` 目录下生成一个名为 meteor-react-bird-demo.tar.gz 的 tarball。

2. 然后把 tarball 传送到服务器上，运行命令：

```
scp meteor-react-bird-demo.tar.gz your_name@your_domain_name:~/chat
```

到目前为止，本地开发机上的工作就全部完成了，后续工作全部在服务器上完成。

### 服务器上的准备工作

首先要登录到远端服务器，执行命令：

```
ssh your_name@your_domain_name
```

#### 设置 Nginx web 服务器

如果服务器上没有 Nginx，首先安装 Nginx

```
sudo apt-get install nginx
```

配置一个域名，到 `/etc/nginx/sites-enabled` 目录下, 新建一个文件名为 chat.conf

```
cd /etc/nginx/sites-enabled
sudo touch chat.conf
```

`/etc/nginx/sites-enabled/chat.conf` 文件中的内容如下：

```
server {
    listen         80;
    server_name chat.haoduoshipin.com;

    location / {
        proxy_pass http://localhost:9000;
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

上面的配置文件，其中 `server_name` 需要用你自己的域名代替，这里就用 `chat.haoqi.com` 为例说明。另外，`http://localhost:9000` 代码中的`9000`是端口号，要确保没有被其它应用占用，若被占用了，则修改为其它空闲端口号，如 3001 端口。

然后在命令行中运行命令，重新启动 Nginx：

```
sudo service nginx reload
```

* 如何为网站绑定域名， 可以参考[好多视频的第131期](http://haoduoshipin.com/v/131)
* 如何配置 nginx，可以参考[好多视频的第130期](http://haoduoshipin.com/v/130)
* 如何申请服务器，可以参考[好多视频的第129期](http://haoduoshipin.com/v/129)

#### 安装 mongodb 数据库

在本地开发 meteor 项目的时候，不需要单独安装 mongodb 数据库，不过把项目部署到服务器上，则需要我们手动安装 mongodb 数据库。

安装步骤按照 mongodb 官方提供的文档，[Ubuntu v14.04 中安装 mongodb 3.0](https://docs.mongodb.org/v3.0/tutorial/install-mongodb-on-ubuntu/)

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

安装成功之后，命令行中就有 `mongo` 命令了。

#### 安装 nodejs

Meteor 是基于 nodejs 的框架，并且 meteor 安装包自带了 nodejs 环境，所以开发 meteor 应用的时候，我们不需要手动安装 nodejs，就能把应用跑起来。但是部署 meteor 应用的时候，情形就不一样了。在命令行中运行：

```
nvm install v5.4.0
```

#### 安装 npm 模块并运行项目

回到服务器的 ~/chat 目录下，解压 tarball 包：

```
server@aliyun:~/chat$ tar -zxf meteor-react-bird-demo.tar.gz
```

解压之后，查看一下 `~/chat` 目录下的文件，运行 `ls` 命令，输出结果：

```
server@aliyun:~/chat$ ls
bundle  meteor-react-bird-demo.tar.gz
```

进入到 `~/chat/bundle` 目录下，运行 `ls` 命令，输出结果：

```
server@aliyun:~/chat/bundle$ ls
main.js  programs  README  server  star.json
```

根据 README 文件中的步骤进行操作, 首先安装 npm 包，进入到 `~/chat/bundle/programs/server` 目录下，运行命令：

```
server@aliyun:~/chat/bundle/programs/server$ npm install
```

npm 包都装好之后，回到项目根目录 `~/chat/bundle`，导出几个环境变量。首先导出项目所需要的 mongodb 数据库的地址：

```
server@aliyun:~/chat/bundle$ export MONGO_URL=mongodb://localhost:27017/chat
```

上面命令中的 `chat` 是创建的 mongodb 数据库的名字，如果在命令行中执行下面命令，可以直接访问 `chat` 数据库：

```
server@aliyun:~/chat/bundle$ mongo localhost:27017/chat
```

然后是导出项目域名地址和可访问的端口，这些都是在 nginx 配置文件中设置好的：

```
server@aliyun:~/chat/bundle$ export ROOT_URL=http://chat.haoduoshipin.com
server@aliyun:~/chat/bundle$ export PORT=9000
```

注意这里的端口号要与 nginx 配置文件 chat.conf 中使用的端口号保持一致。当所有的设置都完成之后，我们就可以启动应用了，执行下面的命令：

```
server@aliyun:~/chat/bundle$ node main.js
```

这时，项目就成功运行起来了，打开浏览器，访问地址 `http://chat.haoduoshipin.com`，就可以看到项目主页了。


### 安装 tmux 软件包

虽然我们的应用已经跑起来了，但是从服务器上退出登录之后，应用就停止了。为了保证应用持续运行，可以通过 [tmux](http://en.wikipedia.org/wiki/Tmux) 工具，

```
sudo apt-get install tmux
```

安装好之后，在命令行运行：

```
server@aliyun:~/chat/bundle$ tmux
```

打开一个 tmux 命令行窗口运行以下命令：

```
export MONGO_URL=mongodb://localhost:27017/chat
export ROOT_URL=http://chat.haoduoshipin.com
export PORT=9000
node main.js
```

这样，就能保证应用持续运行了。关于 tmux 的更多介绍，可以参考[好多视频第41期](http://haoduoshipin.com/v/41)。

