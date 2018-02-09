# 添加表单

咱们先一口气把样式做完，然后再做功能。

### 添加 input

global.css

```css
* {
  box-sizing: border-box;
}
```

添加 box-sizing 设置，让后续咱们添加 border 或者 padding 的时候，元素整个不会变胖。

TextInput.js

```js
import { LIGHT_PRIMARY } from '../constants/Colors'

class TextInput extends Component {
  render() {
    return (
      <Wrap>
        <Input />
        <Button />
      </Wrap>
    )
  }
}

export default TextInput

const Wrap = styled.div`
  padding: 20px;
  display: flex;
`

const Input = styled.input`
  padding: 3px 13px;
  border-radius: 35px 0 0 35px;
  border: 2px solid ${LIGHT_PRIMARY};
  flex-grow: 1;
  :focus {
    outline: none;
  }
`

const Button = styled.div`
  padding: 7px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transform: scale(1.8);
  background: ${LIGHT_PRIMARY};
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`
```

TextInput 组件中，添加 Input 和 Button ，导入浅主色。下面来添加样式组件 Input 和 Button 。

浏览器中，看到 Input 和一个圆形的按钮了。

### 给按钮添加图标

到阿里图标库，搜`add` 。

```
svgr add.svg >AddIcon.js
```

用 svgr 转换成 AddIcon.js 。

TextInput.js

```js
import AddIcon from './AddIcon'

class TextInput extends Component {
  render() {
        <Button>
          <AddIcon fill="white" width="16" height="16" />
        </Button>
```

把图标添加进来。

浏览器中，看到图标显示到按钮之上了。
