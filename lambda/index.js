exports.handler = (event, context, callback) => {
  require('./src/getHomepage')()
    .then(require('./src/parseTopStories'))
    .then(require('./src/getStoryData'))
    .then(require('./src/uploadToS3'))
    .then(success)
    .catch(error)
}

function success () {
  console.log('done')
}

function error (msg) {
  console.log('error')
  console.log(msg)
}

exports.handler()
