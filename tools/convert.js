// node convert.js ce
const fs = require('fs')

const course = process.argv[2]
const content = fs.readFileSync(`../${course}/doc/SUMMARY.md`, 'utf8')
const lines = content.split('\n')
const arr = []
for (let i = 0; i < lines.length; i++) {
  let obj = {}
  const line = lines[i].trim()
  const reg = /^[*-]\s+\[(.*)\]\((.*)\)$/
  if (line && reg.test(line)) {
    obj.title = line.replace(reg, '$1')
    obj.link = line.replace(reg, '$2').slice(0, -3)
    arr.push(obj)
  }
}
const data = {}
data.section = arr.slice(1)

const wrapper = {
  vlink: '',
  cover_video: '0-intro',
  name: '',
  price: '0',
  intro: '',
  content: []
}

wrapper.content.push(data)

fs.writeFileSync(
  `../${course}/doc/index.json`,
  JSON.stringify(wrapper, null, 2)
)
