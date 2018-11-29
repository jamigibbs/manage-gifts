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
 * @param {str}  url  The link to match a domain against.
 * @param {str}  domain  The domain to match against the link.
 *
 * @return {bool}
 */
const isDomain = (url, domain) => {
  return url.includes(domain)
}

/**
 * Used with the loading reducer, this will identify if an action is  
 * in the loading state.
 * @param {arr}  actions  The actions to log in the loading reducer.
 */
const createLoadingSelector = (actions) => {
  /**
   * The apps state for us to update.
   * @param {obj}  state The redux store state object
   * @return {bool}
   */
  return function(state) {
    return actions.some(action => state.loading[action])
  }
}

/**
 * Function checks if a given object has values that all equal
 * the boolean value false.
 * @param {obj}  obj  The apps state for us to update.
 * @return {bool}
 */
const allFalseValues = function(obj){
  return Object.keys(obj).every(function(val){ 
    return obj[val] === false 
  })
}

module.exports = {
  isDomain,
  removeLinkParams,
  centsToUSD,
  strToLowercaseDashed,
  createLoadingSelector,
  allFalseValues
}
