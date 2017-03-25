const fetch = require('./fetch')
const URI = require('./constants').URI

function getHomepage () {
  console.log('fetching homepage data')
  return fetch(URI)
}

module.exports = getHomepage
