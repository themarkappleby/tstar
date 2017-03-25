const https = require('https')
const cheerio = require('cheerio')
const AWS = require('aws-sdk')
const URI = 'www.thestar.com'

exports.handler = (event, context, callback) => {
  getHomepage()
    .then(parseTopStories)
    .then(getStoryData)
    .then(uploadToS3)
    .then(success)
    .catch(error)
}

function getHomepage () {
  console.log('fetching homepage data')
  return fetch(URI)
}

function parseTopStories ($) {
  console.log('extracting top stories')
  return new Promise ((resolve, reject) => {
    const stories = []
    $('.a1__top .story').each(function () {
      stories.push({
        title: $(this).find('.story__headline').text(),
        uri: URI + $(this).find('a').attr('href'),
        img: $(this).find('.story__image img').attr('src')
      })
    })
    resolve(stories)
  })
}

function getStoryData (stories) {
  console.log('fetching stories data')
  return new Promise ((resolve, reject) => {
    var requests = []
    stories.forEach(story => {
      requests.push(fetch(story.uri).then($ => {
        story.html = $('.article__body').html()
      }))
    })
    Promise.all(requests).then(() => resolve(stories))
  })
}

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
      Body: JSON.stringify(stories),
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

function success () {
  console.log('done')
}

function error (msg) {
  console.log('error')
  console.log(msg)
}

function fetch (path) {
  console.log('fetching: ', path)
  return new Promise ((resolve, reject) => {
    var options = {
      host: URI,
      path: path.replace(URI, ''),
      rejectUnauthorized: false,
      family: 4
    }

    https.get(options, res => {
      var html = ''
      res.setEncoding('utf8')
      res.on('data', chunk => html += chunk)
      res.on('error', e => reject(e))
      res.on('end', () => resolve(cheerio.load(sanitize(html)))
      )
    })
  })
}

function sanitize (body) {
  body = body.replace(/‘/g, "'")
  body = body.replace(/’/g, "'")
  return body
}

exports.handler()
