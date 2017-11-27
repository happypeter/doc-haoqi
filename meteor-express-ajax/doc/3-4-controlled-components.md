# 当输入框”受控“

这一集把 Post.jsx 页面上的内容丰富起来，添加一个图片，下面跟一个[受控](https://facebook.github.io/react/docs/forms.html#controlled-components) 的 from 。

### 受控组件 

在 form 这里，我们使用一个 React 的知识点 controlled components，受控组件。给组件设置一个 value 属性，组件就成了受控组件，由 value 属性值控制组件状态。

```
<input value='text' />
```

这会儿会发现表单输入框中永远显示一个 text 字符串，输入任何内容都不会被显示出来，字符串 text 也不会被删除。那你可能会说，这不是吃饱了撑得吗？原来输入框是让自由输入的，现在不让自由输入了。TextField 组件受控之后，除了被虐之外，还有什么好处呢？其实，input 的 value 属性值可以用一个 state 变量来控制:

```
<input value={this.state.inputValue} />
```

这样就可以通过 inputValue 状态值来随时改变输入框中显示的字符，这其实是非常符合 React 组件的基本思想的，代码也显得更加干净利落。

每次使用一个 state 变量，就给它设置一个初始值：

```
constructor(props) {
  super(props);
  this.state = {
    inputValue: ''
  };
}
```

现在导致的结果是，到聊天室页面的输入框中，不管我们输入什么字符，不显示任何内容，因为此时 inputValue 状态值为空字符，进而 input 的 value 属性值也为空字符，所以输入框不显示任何内容。解决方法是给 TextFiled 组件再添加一个 onChange 事件，当输入框内容有变化的时候，触发 handleChange 事件处理器。

接下来，定义 handleChange 方法：

```
handleChange(e) {
  this.setState({inputValue: this.refs.message.value});
}
```

这样，受控组件就可以工作了。

### 总结

关于如何真正去提交评论，我们下一集再介绍。