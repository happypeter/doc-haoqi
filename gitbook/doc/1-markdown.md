# 上手 Markdown

Markdown 是程序员写文档的标准语法，参考 [一篇文档](https://coding.net/help/doc/project/markdown.html) 就可以轻松上手。

### 用 Markdown 来记笔记

Markdown 跟 HTML 一样，是一种标签语言。但是 Markdown 语法特别简单，适合用来写书或者做笔记。

Mardown 语法不是浏览器能直接支持的，所以需要先把 Mardown 语法写成的内容，编译成
HTML ，才能美观的显示出来。Github 就提供了这个编译环境。

例如，创建一个 README.md ，后缀一定要 .md 不然无法编译成功。

README.md

```
[百度](http://baidu.com)

<a href="http://baidu.com">百度</a>
```

添加内容，提交保存之后，页面显示出完全一样的链接效果。可见 markdown 中是兼容 html 语法的，但是显然用 Markdown 语法来写更简便。

### Mardown 中添加语法高亮

通常编辑器中有语法高亮，也就是不同语法作用的字符串会显示成不同的颜色。

README.md

````
    ```js
    console.log('hello');
    ```

    ```css
    body {
      background: red;
    }
    ```
````

如果用三个到引号包裹代码，并且后面跟上具体的语法类型，就可以在最终效果中显示高亮。

### 标题和列表

README.md

```md
# 一级标题

## 二级标题

### 三级标题

添加一个无序列表

* 第一项内容
* 第二项内容
* 第三项内容
```

添加标题也很简单，一个井号打头表示一级标题 h1 ，同理，h2 是两个井号，h3 是三个井号。无序列表就是把各项用中划线或者星号打头。

保存，浏览器中，可以看到效果显示出来了。
