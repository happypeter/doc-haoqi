# 异步 IO

Nodejs 的一个鲜明的特性是支持“异步 IO”（ Asynchronous IO ）。异步，意思就是”稍后处理”；IO 就是输入输出了，通常就是两类情况，一类是本地文件读写，另一类是网络请求。

Nodejs 由于有异步特性，可以同时发多个 IO 请求，哪个请求的数据返回了，就自动执行自己的 callback 回调函数进行处理，这一点真的是非常的高效和合理，适合实时应用。

### 参考

- [理解 Nodejs 的异步 IO](https://cnodejs.org/topic/4f50dd9798766f5a610b808a)
