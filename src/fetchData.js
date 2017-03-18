var request = require('request-promise')
var cheerio = require('cheerio')
var fs = require('fs')
var buildTemplate = require('./build')

var requestOptions = {
  uri: 'https://www.thestar.com/',
  rejectUnauthorized: false,
  transform: function (body) {
    return cheerio.load(body)
  }
}

exports.handler = (event, context, callback) => {
  request(requestOptions).then(function ($) {
    var stories = getStories($)
    populateStories(stories, function () {
      fs.writeFile('./data/data.json', JSON.stringify(stories), function () {
        buildTemplate()
      })
    })
  })
  // callback(null, 'Hello from Lambda')
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

// For local testing
exports.handler()
