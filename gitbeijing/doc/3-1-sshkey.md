# 添加 ssh key

如果想用 ssh 协议的形式往 github.com 上上传东西，会有“权限拒绝”这样的错误，如何解决呢？就是要靠添加 ssh key 。


### 生成

运行

```
ssh-keygen
```

这样可以在 ~/.ssh 中看到这一对儿 key 了。


### 添加

到 用户个人主页 -> Edit Profile -> SSH Key 
