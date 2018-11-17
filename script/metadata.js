
const metascraper = require('metascraper')([
  require('metascraper-amazon')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
  require('metascraper-image')()
])

const got = require('got')

const metadata = async function(targetUrl){
  try {
    const { body: html, url } = await got(targetUrl)
    const metadata = await metascraper({ html, url })
    return metadata
  } catch(err) { console.log(err) }
}

module.exports = metadata
