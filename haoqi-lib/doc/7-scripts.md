# 从独立仓库下载数据

实际中，每本书的书稿数据应该是存放到独立的 git 仓库中的，这集来写 node 脚本，下载各个仓库到 data/ 文件夹。

### 添加 git 基础功能文件

scripts/git-cmd.js

```js
const { spawn } = require('child_process')

exports.clone = (repo, cwd) => {
  const args = ['clone', repo]
  return cmd(args, cwd)
}

const cmd = (args, cwd, fn) => {
  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''
    let child = spawn('git', args, { cwd })

    child.stdout.on('data', function(chunk) {
      stdout += chunk
    })
    child.stderr.on('data', function(chunk) {
      stderr += chunk
    })
    child.on('close', function(code) {
      if (code !== 0) {
        let error = new Error(stderr)
        error.code = code
        reject(error)
      } else if (!stdout.length) {
        resolve(null)
      } else {
        resolve(stdout)
      }
    })
  })
}
```

创建 scripts/git-cmd.js ，导出 clone 命令，实际执行的就是系统上的 git clone 操作。注意，每一个 cmd 中返回的都是一个 Promise 。

scripts/clone-repo.js

```js
const books = require('../data/index.json')
const git = require('./git-cmd')

const cwd = './data'
const promiseArr = books.map(book =>
  git.clone(`git@github.com:${book.githubAccount}/${book.bookId}.git`, cwd)
)

Promise.all(promiseArr).then(result => console.log('clone finished'))
```

创建 scripts/clone-repo.js ，导入书籍列表的数据，cwd 变量中指定执行命令的位置，也就是 data 文件夹。map 一下，组成 Promise 数组，通过 Promise.all 来执行。

data/index.json

```
[
  {
    "bookId": "gitbeijing",
    "title": "Git 北京",
    "githubAccount": "happypeter"
  },
  {
    "bookId": "go-responsive",
    "title": "多屏时代",
    "githubAccount": "haoqicat"
  }
]
```

添加 githubAccount 一项。也就是 github 账户名，同时 github 仓库名保持和 bookId 一致。

package.json

```json
  "scripts": {
    "clone": "node ./scripts/clone-repo.js"
  }
```

添加 clone 脚本。

命令行中

```
npm run clone
```

稍后，看到 clone finished 字样。

编辑器中，可以看到 gitbeijing 和 go-responsive 两本书都下载完毕了。
