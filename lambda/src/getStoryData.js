const fetch = require('./fetch')

function getStoryData (stories) {
  console.log('fetching stories data')
  return new Promise ((resolve, reject) => {
    var requests = []
    stories.forEach(story => {
      requests.push(fetch(story.uri).then($ => {
        story.html = $('.article__body').html()
        if (!story.img) {
          story.img = $('.article__body .image__body').first().find('img').attr('src')
        }
      }))
    })
    Promise.all(requests).then(() => resolve(stories))
  })
}

module.exports = getStoryData
