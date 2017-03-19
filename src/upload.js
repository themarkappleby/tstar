var AWS = require('aws-sdk')
var s3 = new AWS.S3({
  endpoint: 's3.ca-central-1.amazonaws.com',
  signatureVersion: 'v4',
  region: 'ca-central-1'
})
var fs = require('fs')

function init () {
  var files = [
    './dist/index.html',
    './dist/scripts.js',
    './dist/styles.css'
  ]

  files.forEach(function (file) {
    var name = file.split('/')
    name = name[name.length - 1]
    fs.readFile(file, function (err, data) {
      if (err) throw err
      upload(name, data)
    })
  })
}

function upload (name, body) {
  var param = {
    Bucket: 'tstar-app',
    Key: name,
    Body: body
  }
  s3.upload(param, function (err, data) {
    if (err) console.log(err, err.stack)
    console.log('actually done!')
    // context.done()
  })
}

module.exports = init
