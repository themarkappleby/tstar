var s3 = require('s3')
var AWS = require('aws-sdk')

var awsS3Client = new AWS.S3({
  endpoint: 's3.ca-central-1.amazonaws.com',
  signatureVersion: 'v4',
  region: 'ca-central-1'
})

var client = s3.createClient({
  s3Client: awsS3Client
})

var params = {
  localDir: './build/',
  s3Params: {
    Bucket: 'tstar.com'
  },
}

var uploader = client.uploadDir(params)

uploader.on('error', function(err) {
  console.error('unable to sync:', err.stack)
})

uploader.on('progress', function() {
  console.log('progress', uploader.progressAmount, uploader.progressTotal)
})

uploader.on('end', function() {
  console.log('done uploading')
})
