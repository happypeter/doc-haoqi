# CSS 学习思路

前端正在发生颠覆性的变革，React 兴起，jQuery 等传统老的思路正在淡出，React-Native/Electron 这些技术让 JS 可以来写手机和电脑上的原生应用了，所有这一切都会影响到界面样式的设置方法，而且写样式的思路目前大家也是意见不一致，这里 Peter 说说自己的学习思路。

### 一句话描述

全面拥抱 React 的 inline style 思想，放弃 CSS ，放弃 Bootstrap ，对 CSS module ， Sass ， stylus ，BEM ，PostCSS 这些 CSS 的新思路只吸收思想，不用。

### 为何要放弃 CSS ？

在 [《 CSS 将死》](http://haoduoshipin.com/v/185) 中我已经把各种 CSS 相关技术都黑了一遍，同时全力劝说大家使用 CSS in JS 的思路，使用 React 的 inline style 。

所以今天本篇我主要来说说，作为初学者如何逐步的去掌握 inline style 。


### 学习样式还是要从 HTML&CSS 开始学的

层叠样式表，也就是  xxx.css 这样的文件在 Peter 目前的所有项目中都逐步移除了。但是 CSS 的一些基本的思路，目前依然还是用在 inline-style 这里的，只不过书写形式有了变化，要写成下面这样：

```
let styles = {
  root: {
    maxWidth: '1000px',
    margin: '0 auto',
    paddingTop: '40px',
    paddingBottom: '40px',
    display: 'flex',
    flexWrap: 'wrap'
  }
};
```

对于 Web 开发新手，JS 肯定是要在学习了 HTML 之后开始学的，所以最开始的阶段，学习一下最传统的用 html+css 这种形式做网站也是非常有益的。这里面要注意的是，就是对一些 CSS 的用于层叠复用的那些技巧，例如 BEM ，就都不用学了。体现这一思想的就是我的 [小白变怪兽](http://www.bianguaishou.com/) ，这门课程是 Peter 所有课程中最适合零基础的朋友的，推荐给大家。

### 高级阶段直接上 inline style

Peter 自己多年来是非常喜欢 CSS 的，所以对 CSS 的各种新思路都会关注。现在基本坚信一点，CSS 是无药可救的一种写样式的方式了，只要项目一大，再明智的架构师也管理不了它的复杂度，根源就是网上流行的这句话：

>CSS 只有两个问题，一个是层叠，一个是样式表

所以，像 bootstrap 这样的把 CSS 的层叠机制进一步发挥的思想，基本上就是背道而驰，肯定是不推荐的。但是其他的 Postcss/Sass 的各种思路中都给 CSS 添加了新的很 cool 的功能，所以要学习。而像 CSS module 的思路，就是为了限制 CSS 的层叠，避免大量的全局变量，所以也是非常明智的。


![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/21-1-inline-style.png)

但是，Peter 给出的建议其实非常简单

> 所有的思路都不用看，直接上 inline style 就行

因为 inline style 其实是天然的能够避免各种 CSS 的弊端，同时把各种新的优秀的样式设置思路都基本上融入了进来，直接学习 inline style 就可以避免很多弯路。而且，如果已经掌握了一点 JS 能力，inline style 本质上学起来要比 CSS 更为简单。

### 参考资源

Peter 在 github.com 和 coding.net 上的用户名都是 happypeter ，大家可以去上面参考我的开源代码，目前基本都是 inline style 的了。[《 Meteor React 小鸟》](http://haoqicat.com/meteor-react-bird) 里面有对 inline style 思想的讲解。
