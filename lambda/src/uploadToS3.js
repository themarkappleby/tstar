const AWS = require('aws-sdk')
const moment = require('moment')

function uploadToS3 (stories) {
  console.log('uploading to S3')
  return new Promise ((resolve, reject) => {
    var s3 = new AWS.S3({
      endpoint: 's3.ca-central-1.amazonaws.com',
      signatureVersion: 'v4',
      region: 'ca-central-1'
    })

    var params = {
      Bucket: 'tstar.com',
      Key: 'data.json',
      Body: prepData(stories),
      ContentType: 'application/json'
    }

    s3.upload(params, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

function prepData (data) {
  return JSON.stringify({
    stories: data,
    date: moment().local().format('MMMM Do, h:mm a')
  })
}

module.exports = uploadToS3
