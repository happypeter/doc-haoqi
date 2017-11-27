# 申请并登陆服务器

到阿里云上申请一台 ECS 服务器，安装 Ubuntu 系统，并创建一个普通用户 peter 。

### 购买

到 aliyun.com 上操作就可以了。


### 命令行操作

ssh 登陆

```
ssh root@ip
```

查看服务器版本

```
lsb_release -a
```


创建一个有 sudo 能力的普通用户

```
adduser peter --ingroup sudo
```

从 root 身份切换成 peter 用户

```
su peter
```

### 总结

到这一步，我们后续要登陆服务器就只需要

```
ssh ip
```

就可以了。但是每次还是要输入 peter 这个用户的密码。如何进行免密码登陆呢，下一集揭晓。