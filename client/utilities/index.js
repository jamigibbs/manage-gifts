export const strToLowercaseDashed = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase()
}

export const centsToUSD = (num) => {
  const dollars = num / 100
  return dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
}
