# 了解浏览器 event

可以去超 MDN 的 API 文档，也可以到 devtools 中用 monitorEvents 来实时观察一下正在发生的事件。


```
monitorEvents($$('a')[0]) //so so cool
monitorEvents($$('textarea')[0], 'key') //ignore "mouse" events, only log key events
monitorEvents($0, 'mouse') //ignore "key" events
```
