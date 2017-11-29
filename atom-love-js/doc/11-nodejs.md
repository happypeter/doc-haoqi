#  Nodejs

这一集算是对前面介绍的基础知识的综合运用了，看看怎么来用 atom 技巧来加速具体的语言和框架的开发过程。


### Express 常用 snippet

Atom 预装的 language-javascript 这个包，里面自带很多实用的 snippet 。

也可以自己新建 snippet 。


### 自建 snippet


```
'.source.js':
  'es6 module':
    'prefix': 'e6m'
    'body': """
      function ${1:foo}() {
        console.log('${1:foo}');
      }

      export default ${1:foo};
    """
  'express routes':
    'prefix': 'epr'
    'body': """
       app.${1:get}('${2:/}', function(req, res) {
         res.send('hello world');
       });
    """
```


### ternjs

https://github.com/tststs/atom-ternjs 暂时处于观望。
