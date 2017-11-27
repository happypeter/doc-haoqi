# 添加 Ajax 效果

给评论功能添加 Ajax 效果，实现局部刷新。

### 安装 Zepto

到官方网站 http://zeptojs.com/ 下载 zepto.min.js 到 public/javascripts/vendor 目录下，执行命令

```
cd public/javascripts
mkdir vendor && vendor
wget http://zeptojs.com/zepto.min.js
```

Zepto 默认包含 Core、Ajax、Event、Form、IE 几个模块，足够满足我们所需要的功能。它和 jQuery 的接口用法一致，所以很容易上手。

### 发送 Ajax 请求

在 public/javascripts 目录下新建一个文件 main.js，粘贴如下内容：

```
function init() {
  function sendMessage(e) {
    e.preventDefault();
    var comment = $('#comment').val();
    $.ajax({
      url:  '/comment',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({content: comment}),
      success: function(data) {
        $('#comments ul').append('<li>' + data.comment + '</li>');
      }
    });
    $('#comment').val('');
  }

  $('#commentForm').on('submit', sendMessage);
}

$(document).on('ready', init);
```

Zepto.js 的 Ajax 接口文档 <http://zeptojs.com/#$.ajax>


### 加载 JS

打开 views/index.jade 文件，在文件末尾添加两行新代码：

```
script(src='/javascripts/vendor/zepto.min.js')
script(src='/javascripts/main.js')
```

### 添加一个新路由

打开 routes/index.js 文件，删除原有的 `comment/add` 路由（同时 index.jade 文件中的 form 的 action 和 method 也可以删除了），添加一个新的路由

```
/* ajax to add comment */
router.post('/comment', function(req, res) {
  var content = req.body.content;
  var db = req.db;
  db.bind('comments');
  db.comments.insert({
    comment : content
  }, function (err, doc) {
    res.status(200).json({comment: content});
  });
});
```


最后，重新启动服务器，访问 localhost:3000 试试吧。