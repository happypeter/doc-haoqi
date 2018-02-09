# 添加操作按钮

主要是添加两个图标进来。

### 下载图标

一个经验是，下载图标最好是成套的，不然 css 设置的大小即使一样，看上去大小可能也不一样。

```
svgr list.svg >ListIcon.js
```

添加一个 ListIcon 图标组件进来。

Actions.js

```js
import RightIcon from './RightIcon'
import ListIcon from './ListIcon'
import { BLUE, GRAY } from '../constants/Colors'

class Actions extends Component {
  render() {
    return <Wrap>Actions</Wrap>
    return (
      <Wrap>
        <RightIcon fill={GRAY} width="30" height="30" />
        <ListIcon fill={BLUE} width="30" height="30" />
      </Wrap>
    )
  }
}

export default Actions

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 40px;
  svg {
    cursor: pointer;
  }
`
```

导入两个图标组件，导入颜色常量，显示出两个图标，分别给出灰色和蓝色的填充色，蓝色表示 active 状态。

添加 BLUE 颜色常量。

浏览器中，可以看到图标显示完美。
