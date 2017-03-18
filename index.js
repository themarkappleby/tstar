var request = require('request-promise')
var cheerio = require('cheerio')
var pug = require('pug')
var fs = require('fs')

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
      buildTemplate(stories)
    })
  })
  // callback(null, 'Hello from Lambda')
}

function buildTemplate (stories) {
  var html = pug.renderFile('index.pug', { stories: stories })
  fs.writeFile('index.html', html)
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
      console.log(err)
    })
    promises.push(promise)
  })
  Promise.all(promises).then(function () {
    cb()
  })
}

// For local testing
exports.handler()
