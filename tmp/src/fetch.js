var request = require('request-promise')
var cheerio = require('cheerio')
var fs = require('fs')
var build = require('./build')

var requestOptions = {
  uri: 'https://www.thestar.com/',
  rejectUnauthorized: false,
  transform: function (body) {
    return cheerio.load(sanitize(body))
  }
}

function fetch () {
  request(requestOptions).then(function ($) {
    var stories = getStories($)
    populateStories(stories, function () {
      stories = JSON.stringify(stories)
      fs.writeFile('./data/data.json', stories, build)
    })
  })
}

function getStories ($) {
  var stories = []
  $('.a1__top .story').each(function () {
    stories.push({
      title: $(this).find('.story__headline').text(),
      url: 'https://www.thestar.ca' + $(this).find('a').attr('href'),
      img: $(this).find('.story__image img').attr('src')
    })
  })
  return stories
}

function populateStories (stories, cb) {
  var promises = []
  stories.forEach(function (story) {
    requestOptions.uri = story.url
    var promise = request(requestOptions).then(function ($) {
      story.html = $('.article__body').html()
    })
    .catch(function (err) {
    })
    promises.push(promise)
  })
  Promise.all(promises).then(cb)
}

function sanitize (body) {
  body = body.replace(/‘/g, "'")
  body = body.replace(/’/g, "'")
  return body
}

module.exports = fetch
