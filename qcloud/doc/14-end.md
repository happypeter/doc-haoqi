# 结语

感谢你一路跟到课程最后一节，辛苦！本节聊聊应用开发到现在还存在的不足，以及相应的解决方案。

### 待完善的功能

首先是文件重命名。文件重命名功能我们就不做了。提示一个思路，首先拷贝一下原来的文件，给个新名字，然后删除原来的文件。

```js
cos.putObjectCopy()
cos.deleteObject()
```

这两个是可以参考使用的接口。

第二个功能，删除文件夹。文件夹，可以登录腾讯云自己的后台去删除。或者在我们的应用中另起一个页面做删除，因为是比较低频的操作，不建议占用首页位置。

第三个，也是最后一个，报错防护。本版代码还是比较单纯的去实现功能，但是一旦网络出问题，各种报错会直接导致程序退出，虽然基本上都可以通过刷新页面来重启应用，但是如果实际上线，还需要添加一些所谓的”卫士代码“，来应对各种出错情况，增强界面友好性。


### 总结

至此，《其他功能》这一章就胜利完成了。本章也是课程的最后一章。最后来总结一下课程。

本套课程还是有深度的。比较灵活的使用了 Redux 的思想，通过中央数据 store 的形式，有效的解耦了各个组件，降低了开发难度。同时蚂蚁设计也让项目通过很少的代码，达成了良好的用户体验。

好，课程就到这里，我是 Peter ，咱们其他课程中，再见！