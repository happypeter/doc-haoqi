先来安装 JSX 语法高亮支持，还有 emmet 这个自动补齐工具

```
apm install react
apm install emmet
```

然后配置支持 emmet 在 jsx 环境下的使用。


- 打开 keymap.cson 文件
  - 点菜单栏 Atom -> Keymap…
- 添加

```
'atom-text-editor[data-grammar~="jsx"]:not([mini])':
  'tab': 'emmet:expand-abbreviation-with-tab'
```

- 现在打开一个 jsx 文件，敲

```
div.myclass
```

然后 tab 。

就可以补齐成

```
<div className="myclass"></div>
```

注意：打开 js 文件后，先要把文件类型，改为 jsx 。苹果电脑是 shift-control-l ，然后选择 jsx(Javascript)

### 参考

- https://gist.github.com/mxstbr/361ddb22057f0a01762240be209321f0
