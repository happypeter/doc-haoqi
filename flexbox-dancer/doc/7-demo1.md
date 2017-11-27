# 三栏布局

用 flexbox 来制作响应式的三栏布局，主要涉及 flex-grow ，order 等属性的使用。

### 代码

main.css 内容如下

```
body {
  margin: 0;
}
.parent {
  height: 100vh;
  display: flex;
  flex-direction: column;
}



.header, .footer {
  color: white;
  background: #212121;
  padding: 20px;
}

.main {
  flex-grow: 1;
  background-color: #B6B6B6;
  display: flex;
}

.col-1, .col-2, .col-3 {
  padding: 20px;
  color: white;
}
.col-1 {
  background-color: #9C27B0;
  flex-grow: 1;
}
.col-2 {
  background-color: #FF5722;
  order: -1;
  width: 120px;
}
.col-3 {
  background-color: #388E3C;
  width: 120px;
}

@media (max-width: 600px) {
  .main {
    flex-direction: column;
  }
  .col-2, .col-3 {
    width: auto;
  }
}
```

对应 index.html 内容

```
<head>
  ...
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
  <div class="parent">
    <div class="header">header</div>
    <div class="main">
      <div class="col-1">主体内容</div>
      <div class="col-2">导航栏</div>
      <div class="col-3">侧边栏</div>
    </div>
    <div class="footer">footer</div>
  </div>
</body>
```

### 参考

- <https://www.youtube.com/watch?v=H1lREysgdgc>