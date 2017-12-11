# 添加导航

欢迎来到新的一关《添加导航》。使用 https://ant.design/components/menu-cn/ 来制作导航。

### 运行导航菜单组件

进入《运行导航菜单组件》这个任务。

参考导航菜单文档，来把组件运行起来。

add-menu---

Dashboard 组件里面添加了 Nav 组件专门存放导航菜单。Nav 组件内部导入了蚂蚁设计的 Menu ，也就是导航菜单组件。其中各个参数的意义都可以在文档上找到，其中 defaultOpenKeys 的意思是默认要打开那个子菜单，我们这里内容比较少，所以把两个子菜单全部设置为默认打开状态。selectedKeys 用来指定处于高亮状态的是那一项，注意这两个 Keys 的数据类型都是数组，不是字符串。菜单里面包含子菜单，子菜单里面包含导航项，其中导航项的 key 都设置为对应的页面链接了，后面会比较方便跟路由操作配合。

看看达成的效果。页面上有很多导航项了，默认高亮的一项在新建甜点一项下，由于 selectedKeys 设置为固定值，所以不能点击切换到其他导航项目。


### 添加路由规则

进入《添加路由规则》这个任务。

添加各个页面的路由规则进来。

routes---

按照 react-router 的基本用法，添加一条条的 Route 以及对应的各个组件进来，代码加了不少，逻辑并不复杂。

看看达成的效果。页面上手动敲链接，例如 /dashboard/dishes 或者 /dashboard/dishes/new ，右侧主体部分是可以显示对应组件的。

### 使用导航菜单

进入《使用导航菜单》这个任务。

现在要让点菜单项的时候，右侧主体内容部分有体现。

click-to-nav


方式也很简单，因为每个菜单项目在被 click 的时候，事件函数中都能得到这个菜单项目的 key ，而我们这里设置的 key 又恰好是要跳转的路径，所以直接发送到 action 中，执行 history.push 就能执行跳转。但是现象是地址栏 url 会变，但是右侧显示不变，造成这个的原因在于 PrivateRoute 的写法，里面因为使用了 render 造成本来的路由信息断了，所以这里改写了一下 PrivateRoute ，去掉 render 形式，直接使用 component=xxx 组件的形式。


看看达成的效果。每次点菜单项，右侧会显示对应组件了。


### 切换菜单项高亮

进入《切换菜单项高亮》这个任务。

selected-index---

看看达成的效果。点每一个菜单项，随着右侧显示的切换，菜单项的高亮也会切换过来。


### 页面刷新时保持高亮正确

进入《页面刷新时保持高亮正确》这个任务。现在如果在任意的一个页面上，刷新一下高亮的位置就会回到 redux 中设置的 selectedIndex 的初始值。

现在的思路是让页面刷新的时候，去更新一下 redux 中的 selectedIndex 。

load-index---

页面刷新时会触发 App 组件的生命周期函数，从而执行 loadSelectedIndex 这个 action 创建器，创建器内通过 history.location.pathname 拿到当前页面链接，并用它到 reducer 中修改 selectedIndex 的值即可。

看看达成的效果。跳转到任意页面刷新，高亮保持正确。

至此，《添加导航》这一关就通过了。