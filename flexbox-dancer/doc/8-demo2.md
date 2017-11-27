# 流体网格

主要涉及到 flex-basis 和 flex-wrap 的深入理解。


### 代码

全部 CSS 代码就是这些了

```
body {
  margin: 0;
  display: flex;
  padding-top: 30px;
  flex-wrap: wrap;
}
.box {
  background-color: goldenrod;
  height: 200px;
  flex-basis: 100%;
  margin: 0 20px 40px;
}

@media (min-width: 600px) {
  .box {
    flex-basis: calc(50% - 40px);
  }
}
@media (min-width: 900px) {
  .box {
    flex-basis: calc(33.3333% - 40px);
  }
}
```

对应 index.html 

```
<body>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</body>
```