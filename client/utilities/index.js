/**
 * Replaces all string spaces with a dash "-" and turns to lowercase.
 * Example: "Lowercase With dashes" to "lowercase-with-dashes"
 *
 * @param {str}  str  The string to modify
 * @return {str}
 */
const strToLowercaseDashed = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase()
}

/**
 * Converts a non-decimal number into a USD currency value.
 * Example: 1000 to "$10.00"
 *
 * @param {num}  num  The value to convert to USD
 * @return {str}
 */
const centsToUSD = (num) => {
  const dollars = num / 100
  return dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
}

/**
 * Removes all parameters from a url starting with the first '?' flag.
 *
 * @param {str}  url  The url that we want paramenters removed from.
 * @return {str}
 */
const removeLinkParams = (url) => {
  return url.split('?')[0]
}

/**
 * Checks if a provided string is a URL.
 *
 * @param {str}  str  The string to check.
 * @return {bool}
 */
const isURL = (str) => {
  var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (res == null)
    return false;
  else
    return true;
}

/**
 * Checks if a link contains a given domain.
 * For example, given `http://example.com/my-link/?some=param` and the domain
 * `example.com`, the function will return true.
 *
 * @param {str}  url  The link to match a domain against.
 * @param {str}  domain  The domain to match against the link.
 * @return {bool}
 */
const isDomain = (url, domain) => {
  return url.includes(domain)
}

/**
 * Used with the loading reducer, this will identify if an action is
 * in the loading state.
 *
 * @param {arr}  actions  The actions to log in the loading reducer.
 * @param {obj}  state The redux store state object
 * @return {bool}
 */
const createLoadingSelector = (actions) => {
  return function(state) {
    return actions.some(action => state.loading[action])
  }
}

/**
 * Function checks if a given object has values that all equal
 * the boolean value false.
 *
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
  isURL,
  removeLinkParams,
  centsToUSD,
  strToLowercaseDashed,
  createLoadingSelector,
  allFalseValues
}
