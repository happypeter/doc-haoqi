# Web App 概念的内涵和外延

我们都知道 Web Page 是网页的意思，Web App 就是基于 Web 技术写成的 App （ 应用程序 )。同样是运行在浏览器中，只是功能复杂了。

### Html5 让 Web App 成为可能

为何早些年很少有人提 Web App 这个概念呢？ 因为浏览器提供的功能有限，所以 Web 页面中能实现的功能比起桌面应用来差得很远。但是到了今天，浏览器支持 HTML5 ，CSS3 ，拥有更快的 JS 运算引擎，浏览器内实现各种复杂的功能，获取类似于桌面或者手机 App 类似的用户体验，不仅仅变得可能，而且也是我们的用户期待的效果了。

以前我们上网，有个说法叫“冲浪”，其实就是以获取信息为主。当人们要真正完成一些复杂的功能的时候，都会自然想到去安装桌面软件。但是今天的 Web App 很多方面的功能甚至可以比桌面应用更强大。

### 异步交互改变用户体验

最早的网页是静态的，每次我们访问一个新的 URL ，老页面会被新页面所替代，出现整个页面都刷新一下的现象。这种架构下很难实现用户体验良好的 Web App 。后来 Ajax 技术出现，页面发出请求后并不会刷新，而是等待服务器返回数据后，直接更改需要改变的那一个页面局部的显示。客户端和服务器之间从此可以异步交互了，Web App 才真正大行其道，最早的一个代表就是 gmail 。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic10-1-ajax-socket.png)

现在， Ajax 几乎有点过时了，websocket 的广泛使用彻底的打破了 HTTP 协议传统的“请求/响应”架构，客户端和服务器可以建立长链接，互操作，Web App 的用户体验又得到了革命性的提升。

### 新的语言标准

ES6 这个 JS 语言新规范的提出，React 等前端 JS 框架的流行，让 Web 开发的底层技术流程，从原来的“写 CSS 美化 HTML 在来点 JS 动态效果”，变成了现在的越来越专业的类似于传统 C++ 写界面的“面向对象编程，模块化组织项目”的编程工作。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic10-2-es6.png)

应该这样说，遵循 ES5 标准的 Javascript 语言，因为历史原因，缺乏对面向对象等高级编程特性的支持，所以其实不太适合去写复杂的 App 。但是 ES6 到来，引入了面向对象编程特性以及各种语法增强，Peter 认为已经跟 Ruby 和 Python 这些语言很像了，可以很好的胜任 App 开发了。

### 强大的互联网做后台

Web App 的一个经常被批评的点是需要联网才能用。其实这恰好是 Web App 最强大的一点，有了网络，相当于 Web App 后台有各种服务器可以为我们提供数据运算，可以是多台服务器共同服务一个 App，也可能是一台超级服务器。无限强大的运算能力，按需供给有保证了费用的低廉。同时，联网意味着我可以和我的朋友进行连接，协同操作一个软件又给我们提供了无限的想象空间。

### Web App 技术已经可以用来开发 Native App

Web App 翻译作网页应用，而 Native App 意思是原生应用。

Web App 的特点是运行在浏览器（或者是手机的 WebView ）之上，基于 HTML5 机制。但是随着 React Native 和 [electron](http://electron.atom.io/) 的发展，HTML5/JS 这套技术已经可以用来开发真正原生的 ios/安卓/PC/Mac 应用程序了。这个是 JS 开发者的大喜讯。

![](http://o86bpj665.bkt.clouddn.com/happypeter-js-kingdom/pic10-3-native.png)

举例来说，我们用的微信 App 本身就是一个原生应用（是用 Java/Swift 这样的平台原生语言开发的），但是我们在微信中打开的一些第三方的微店等各种应用，一般都是 Web App （运行于微信内置浏览器上）。当然，手机/PC 浏览器中打开的 App 就都是 Web App 了，例如 facebook.com taobao.com。

### 参考

- <http://www.html5rocks.com/webappfieldguide/know-your-apps/intro/>