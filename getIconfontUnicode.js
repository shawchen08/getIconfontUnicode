/**
 * 通过 nodejs 从 iconfont 的 svg 字体文件中提取图标名及其 unicode （nodejs is required）
 * 用法：直接在命令行中执行脚本
 * eg1: `node ./getIconfontUnicode.js`（要求 iconfont.svg 与脚本在同一目录下）
 * eg2: `node ./getIconfontUnicode.js ./xxx.svg`（可以指定其他目录的 svg 字体文件）
 */
const fs = require('fs')
const path = require('path')

const targetFilePath = process.argv[2] || './iconfont.svg'

if (targetFilePath.slice(-4) !== '.svg') {
  throw new Error('错误的 svg 字体文件')
}

const data = {}

fs.readFile(path.resolve(__dirname, targetFilePath), 'utf8', (err, str) => {
  if (err) throw err

  str.replace(/glyph-name="(.+)" unicode="&#(\d+);"/g, (str, key, val) => {
    data[key] = +val
    return str
  })

  fs.writeFile(path.resolve(__dirname, './iconfont.json'), JSON.stringify(data, null, 2), err => {
    if (err) throw err
  })
})
