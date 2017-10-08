# 创建文件夹

这一步，我们要实现如下功能：

* 可以将文件上传至 bucket 中指定的文件夹（在我自己的好奇猫上，一门课程对应一个文件夹）
* 如果该文件夹还不存在，上传时自动创建之

仔细阅读[js-SDK的文档](https://cloud.tencent.com/document/product/436/11459#put-object)，会注意到**Put Object**小节里，有这么一句：

> 注意，Key(文件名) 不能以 / 结尾，否则会被识别为文件夹

那么，反其道而行之，我们就有了指定文件夹的方法。



### 具体方式

其实非常简单，就是在 cos.sliceUploadFile 传参数的时候，params 中这样写

```
      Key: `peter/${file.name}`,
```

这样，文件就上传到 `peter` 这个文件夹了。下面的内容主要是如何创建和选择文件夹名。

### 选择已有文件夹名

前面已经准备好了读 bucket 的接口（ http://localhost:3008/bucket）得到的数据，形式如下

```
[
  {
    key: 'aDir/a.mp4'
  },
  {
    key: 'bDir/b.mp4'
  }
]
```

下面，我希望得到文件夹组成的数组，也就是

```
let data = [
  {
    key: 'aDir/a.mp4'
  },
  {
    key: 'bDir/b.mp4'
  }
]

let dirs = data.reduce((arr, t) => {
  const dirName = t.key.split('/')[0]
  return arr.concat(dirName)
}, [])

console.log(dirs)
<!--
log 出来的结果是
[
  'aa',
  'bb'
]
正是我想要的。
-->
```

接下来就展示出所有的文件夹，同时可以方便的选择其中一个作为上传目的地。

具体代码参看最终 commit 。

### 创建新文件夹

添加一个 input 进来，以便我们可以创建新的文件夹。

### commit

create dir
