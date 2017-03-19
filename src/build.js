var pug = require('pug')
var fs = require('fs')
var upload = require('./upload')

function buildTemplate (stories) {
  fs.readFile('./data/data.json', function (err, data) {
    if (err) throw err
    var html = pug.renderFile('./src/index.pug', { stories: JSON.parse(data) })
    fs.writeFile('./dist/index.html', html, upload)
  })
}

module.exports = buildTemplate
