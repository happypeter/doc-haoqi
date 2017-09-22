snippet 就是代码小片段的意思。 Atom 下可以很方便的添加一些 snippet 来辅助我们的开发，
我自己目前的 snippet 内容如下：


```

# Your snippets
#
# Atom snippets allow you to enter a simple prefix in the editor and hit tab to
# expand the prefix into a larger code block with templated values.
#
# You can create a new snippet in this file by typing "snip" and then hitting
# tab.
#
# An example CoffeeScript snippet to expand log to console.log:
#
# '.source.coffee':
#   'Console log':
#     'prefix': 'log'
#     'body': 'console.log $1'
#
# Each scope (e.g. '.source.coffee' above) can only be declared once.
#
# This file uses CoffeeScript Object Notation (CSON).
# If you are unfamiliar with CSON, you can read more about it in the
# Atom Flight Manual:
# http://flight-manual.atom.io/using-atom/sections/basic-customization/#_cson

'.source.css':
  '去除点按阴影':
    'prefix': 'webkithi'
    'body': '-webkit-tap-highlight-color: rgba(0, 0, 0, 0);'
'.source.gfm':
  'Commit Link':
    'prefix': 'fff'
    'body': '- [$1](./faq/$2)'
'.source.js':
  'styled-components':
    'prefix': 'imstyle'
    'body': "import styled from 'styled-components'"
  'Console log':
    'prefix': 'log'
    'body': "console.log('$1')"
  'Container':
    'prefix': 'con'
    'body': """
      import React, { Component } from 'react'
      import $1 from '../components/$1/$1'

      class $1Container extends Component {
        render () {
          return (
            <$1 />
          )
        }
      }

      export default $1Container
    """
  'React Class':
    'prefix': 'recl'
    'body': """
      import React, { Component } from 'react'

      class $1 extends Component {
        render () {
          return (
            <div className='$1'>
              $1
            </div>
          )
        }
      }

      export default $1

    """
  'React Func':
    'prefix': 'refuc'
    'body': """
      import React from 'react'

      export default () => (
        $1
      )
    """
  'JSX div':
    'prefix': 'div'
    'body': """
      <div className='$1'>
      </div>
    """
```
