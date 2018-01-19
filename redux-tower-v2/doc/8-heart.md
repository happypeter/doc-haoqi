# 点赞动效

点赞的时候，来添加一个心形的有过渡效果图案。

### 添加静态效果

拷贝一张 heart.png 放到 src/assets/ 文件夹。

CourseCart.js

```js
import heart from '../assets/heart.png'

class CourseCard extends Component {
  render() {
    const { course } = this.props
    return (
      <Wrap>
        <Poster>
          {course.title}
          <div className='likes-heart'>{course.likes}</div>
        </Poster>
      </Wrap>
    )

const Wrap = styled(Card)`
  width: 300px;
  position: relative;
  .likes-heart {
    background: url(${heart}) center no-repeat;
    background-size: contain;
    font-size: 10px;
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    color: #ff4081;
    transform: translateX(-50%) translateY(-50%) scale(1);
    transition: all .5s;
  }
`
```

导入加进来的心形图案。添加一个 class 名为 likes-heart 的 div ，文字部分显示点赞数。

添加样式进来。通过 postition realtive 和 postion absolute 的配合，让整个心形区域的右上角居中。然后再配合 transform 中的 translate 也就是平移语句，移动自身宽和高的50%，这样就能保证整个 .likes-heart 区域居中了。

scale 也就是缩放现在是1，这个会作为过渡变量。

浏览器中，看到显示出了一个比较小的心形。

### 添加过渡效果

```
npm i react-transition-group
```

通过 react-transition-group 来添加过渡需要的 class 名给 likes-heart div 。


CourseCard.js

```js
import { CSSTransition } from 'react-transition-group'

class CourseCard extends Component {
  state = {
    showHeart: false
  }

  showHeart = () => {
    this.setState({
      showHeart: true
    })
    setTimeout(
      () => {
        this.setState({
          showHeart: false
        })
      }
      , 1000
    )
  }
  render() {
    const { showHeart } = this.state
    return ( 
      <Wrap>
        <Poster>
          <CSSTransition in={showHeart} timeout={1000} classNames='like'>
            <div className='likes-heart'>{course.likes}</div>
          </CSSTransition>
        </Poster>
        <Actions {...this.props} showHeart={this.showHeart} />
      </Wrap>
    )
  }

  .likes-heart {
    transform: translateX(-50%) translateY(-50%) scale(1);
    opacity: 0;
  }

  .like-enter.likes-heart {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) scale(5);
  }
```

导入 CSSTransition 。

专门设置一个 showHeart state 来控制 CSSTranstition 的进入和退出。默认为 false ，用户触发动作显示心形图案后，先让 showHeart 变为 true ，这样心形图案的 div 会从 .likes-heart ，变成 .likes-heart 加上 .like-enter ，然后随即变成这两个再加上 .like-enter-active 。虽然在 timeout 属性设置的时间之后，新加上的这两个 class 会消失。但是，我们还是需要自己再设置一个定时，把 showHeart 状态值变成 false ，这样才能保证下次点按钮的时候，再次成功添加前面的那两个 class 名。

showHeart 作为 in 属性值传入 CSSTransition 。

showHeart 函数作为属性传递给 Action 组件。

特别注意：CSSTransition 的属性不是 `className` 而是 classNames 。

CourseCardActions.js

```js
import Comment from 'material-ui-icons/Comment'

class CourseCardActions extends Component {
  handleClick = id => {
    this.props.like(id)
    this.props.showHeart()
  }
  
  render() {
    return (
      <Wrap>
        <Button onClick={() => this.handleClick(id)}>
          <ThumbUp />
          {likes}
        </Button>
```

Actions 组件内，把 like 和 showHeart 两个操作封装到一个 handleClick 函数内。并用 handleClick 替换 like 函数，响应用户点赞动作。

浏览器中，点赞效果出现了。
