# 用 trash 不要用 rm

### 有这样一个笑话

说有了系统出了问题，最佳解决方案就是

```
cd /
sudo rm -rf *
```

其实上面的操作就可以直接把系统删除。所以 rm 是非常危险的，因为一旦误删除是没有办法恢复的。

### trash 命令就是救星

这个是我在 <http://commandlinepoweruser.com/> 跟 Wes Bos 学的。trash 删除的东西会被放到废纸篓里面，可以恢复的。