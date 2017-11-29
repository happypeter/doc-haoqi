# “积极”的 UI

这一集主要来引入添加评论功能，可能会让您感到奇怪的就是，为何 Meteor 每次提交一个 comment ，需要在客户端和服务器端同时提交呢？这个就会涉及 Meteor 的 Optimistic UI （“积极 UI” 或者 ”乐观 UI“ )的思路。

### 一个接口，两端调用

定义一个 Mongo 的 collections 接口，然后分别在 server 和 client 端都执行一次

imports/api/comments.js 的内容如下

```
import { Mongo } from 'meteor/mongo';

export const Comments = new Mongo.Collection('comments');
```

Meteor 开发环境下是自带 Mongo 数据库的，同时在 client 端，Meteor 也有一个 minimongo 数据库。


### 为啥要两端执行

简单一句话：为了更为平滑的用户体验。