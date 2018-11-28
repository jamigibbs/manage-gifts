const strToLowercaseDashed = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase()
}

const centsToUSD = (num) => {
  const dollars = num / 100
  return dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
}

const removeLinkParams = (url) => {
  return url.split('?')[0]
}

/**
 * Checks if a link contains a given domain.
 * For example, given `http://example.com/my-link/?some=param` and the domain
 * `example.com`, the function will return true.
 *
 * @param {str}   url           The link to match a domain against.
 * @param {str}   domain        The domain to match against the link.
 *
 * @return {bool}
 */
const isDomain = (url, domain) => {
  return url.includes(domain)
}

/**
 * Used with the loading reducer, this will identify if an action is  
 * in the loading state.
 *
 * @param {arr}   actions       The actions to log in the loading reducer.
 * @param {obj}   state         The apps state for us to update.
 *
 * @return {bool}
 */
  
const createLoadingSelector = (actions) => {
  return function(state) {
    return actions.some(action => state.loading[action])
  }
}

module.exports = {
  isDomain,
  removeLinkParams,
  centsToUSD,
  strToLowercaseDashed,
  createLoadingSelector
}
