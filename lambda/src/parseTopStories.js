const URI = require('./constants').URI

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

module.exports = parseTopStories
