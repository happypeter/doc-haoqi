# 一键部署脚本

项目部署一般步骤是比较多的，为了方便部署，我们把所有的部署任务都可以写成一个脚本来完成。

### 需要的命令

```
ssh 123.56.94.191 'cd /home/peter/project/; git pull'
```

### 命令编程一个可执行脚本

创建 project_deploy 文件，内容如下

```
#!/usr/bin/env bash

ssh 123.56.94.191 'cd /home/peter/project/; git pull'
```

添加可执行权限

```
chmod +x project_deploy
```

这样，就可以来执行脚本了

```
./project_deploy
```

### 把脚本变成一个系统命令

这个要涉及到 PATH 这个环境变量

```
echo $PATH
```

可以打印出当前 PATH 的值。打印出来的结果就是系统上很多个文件夹的位置。要把一个普通的脚本（例如 project_deploy ）变成一个系统命令，我们需要做的就是把它移动到任意一个 PATH 文件夹中即可。

### 总结

这样，我们就可以执行

```
project_deploy
```

命令来完成一键部署了。