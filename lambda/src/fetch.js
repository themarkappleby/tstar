const https = require('https')
const cheerio = require('cheerio')
const URI = require('./constants').URI

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

module.exports = fetch
