# HTML CSS Javascript 和 HTML5

Web 应用开发的最核心的几个概念都在这里了。HTML5 先学会，才能去搞 JS 。

### HTML

HTML 是一种网站开发用的标注语言，就是专门用来写网页的，用来组织内容的逻辑结构。HTML 可以说是 Web 世界的基石，一直以来 HTML 都是非常简单的一个语言，一些标签，用来像网页中嵌入标题，图片，链接等等。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic7-1-html.png)

但是时至今日，人们期待他们的页面不再像以前的那种文档一样的感觉，网站功能变得更为丰富，可以在网页上使用地图，网页上还可以玩游戏。而且用户也期待大部分的操作是不需要页面刷新的，这样使用体验会更平滑。

动态效果良好的页面开发就需要借助 Javascript （后面我们简称 JS ）这种编程语言了。各大主流浏览器都默认支持 JS ，有了 JS 我们就可以给网页加入很多实时交互性的功能。举个例子，如果我填写一个 form ，然后点提交按钮，JS 可以帮我们实时的检查有没有填写错误，并且及时报错。

### Ajax

但是动态网站真正腾飞的观点点，就是 Ajax 技术得到广泛应用。其中代表性的事件就是 google 的 gmail 的出现，通过对 Ajax ，页面实现了__局部刷新__的功能，让人们对 Web 页面能做的事情有了一个新的认识。页面从此变得功能更为丰富，使用起来也更舒适。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic7-2-ajax.png)

Ajax 最好的学习方式就是通过看实际例子，比如 [好多视频107期#如何把评论框 Ajax 化](http://haoduoshipin.com/v/107) 。
这个是一个 Rails 框架下的例子，可以代表所有的传统（用 Django/PHP/Python ）思路。但是新一代摩登 JS 框架中( React 和 Meteor )，实现 Ajax 有了更简便的方式。所以 Peter 建议大家传统思路了解一下就好了，动手时候使用摩登 JS 框架来完成。

### CSS

光有功能还不够，页面怎么样才能变得漂亮呢？CSS 的意思是“层叠样式表”，就是专门用来设置 HTML 页面样式的。通过 CSS 我们可以对页面元素设置颜色，圆角，阴影，动画等各种好看的效果。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic7-3-css.png)

CSS 的学习和 HTML 是不可分的，这方面的基础课程，请观看我的[《 HTML 七日行 》](http://haoqicat.com/html7) 。

另外，对于摩登的开发者，必须要知道的是

> CSS 并不是设置页面样式的唯一方式，CSS 不等于 style

在 HTML 和 JS 中，我们一样可以去设置样式（ style ）。目前，在 Peter 自己的大部分的使用 React 开发的项目中，都是没有 CSS 文件的。



### HTML5

尽管 Web 诞生已经超过二十年了，但是人们依然会思考到底 Web 是什么，未来能成为什么的问题。我们还可以借助 Web 这个平台来实现哪些实用的功能，改变人们的日常生活。我们明天会使用什么样的工具来开发这些网站。最重要的是，浏览器要增加哪些新的动能才能让我们的想法真正在浏览器内运行起来。

所有这些思考，最终落脚在新一版的 HTML ，也就是 HTML5 。HTML5 带来了一整套原来浏览器中没有的新功能，让我们可以开发出功能更为强大的 Web 应用。比如 HTML5 引入了 video 标签，让浏览器不用安装 flash 插件就可以直接播放视频。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic7-4-h5.png)

除了 video 标签，HTML5 还提供了很多其他的功能，例如拖拽，地理位置接口，web socket 等功能，详细列表参照 [MDN 的文档](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) 。仔细看一下这些新功能，就可以看出 HTML5 的目的就是让原来只能运行简单网页的平台变成了可以运行复杂功能的 Web App 的平台。所谓 HTML5 不仅仅是在原来 HTML4 的基础上又增改了一些标签，其实更多的 HTML5 的功能是由浏览器通过 JS 接口的形式提供出来的(另外，CSS3 的内容，Peter 也认为应该属于 HTML5 的一部分)。所以，HTML5 跟我们在“这是 html 代码，这是 css 代码”这个语境下所说的 html 是不同的两个概念。

### HTML5 不是一个东西

比如我们经常会问：“这个浏览器支持 HTML5 吗？”，其实这个问题本身是有问题的，因为 HTML5 是一套东西，不是一个大的不可分割的整体。所以具体到一款浏览器，正确的表述应该是它能支持 HTML5 的哪些功能。比如它支持画布吗？支持地理位置接口吗？支持视频吗？这些都是有明确答案的。但是一个浏览是支持 HTML5 吗？这个问题是没有明确答案的。

同时，HTML5 的各项新功能可以说都是在原有的 HTML4 的基础上添加的，所以用了 HTML5 ，原来的 HTML4 的老的功能也是一样可以正常工作的。

如果我们错略的认为：一个支持 HTML5 大部分功能的浏览器，就是一个 HTML5 浏览器了，那么可以说今天所有的主流浏览器都是 HTML5 浏览器。所以， HTML5 可以放心大胆的用了。

### 参考文献

- <http://www.20thingsilearned.com/en-US/html/1>
- <http://www.20thingsilearned.com/en-US/html5/1>
- <http://diveintohtml5.info/introduction.html>
- [解释 H5 给程序员听](http://haoduoshipin.com/v/174)