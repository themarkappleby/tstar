var fs = require('fs')
var AWS = require('aws-sdk')
var s3 = new AWS.S3({
  endpoint: 's3.ca-central-1.amazonaws.com',
  signatureVersion: 'v4',
  region: 'ca-central-1'
})

var files = [
  './dist/index.html',
  './dist/scripts.js',
  './dist/styles.css',
  './dist/icon.png'
]

var types = {
  html: 'text/html',
  js: 'text/javascript',
  css: 'text/css',
  png: 'image/png'
}

function init () {
  console.log('Uploading...')
  files.forEach(function (file) {
    var name = getName(file)
    var ext = getExt(name)
    if (ext === 'png') {
      fs.readFile(file, function (err, data) {
        if (err) throw err
        upload(name, data)
      })
    } else {
      fs.readFile(file, 'utf-8', function (err, data) {
        if (err) throw err
        upload(name, data)
      })
    }
  })
}

function upload (name, body) {
  var param = {
    Bucket: 'tstar.com',
    Key: name,
    Body: body,
    ContentType: types[getExt(name)]
  }
  s3.upload(param, function (err, data) {
    if (err) console.log(err, err.stack)
    console.log('Uploaded: ' + name)
  })
}

function getName (path) {
  var name = path.split('/')
  return name[name.length - 1]
}

function getExt (name) {
  return name.split('.')[1]
}

module.exports = init
