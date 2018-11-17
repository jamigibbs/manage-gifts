const assert = require('assert')
import { strToLowercaseDashed, centsToUSD, removeLinkParams, isDomain } from './index'

describe('Utility Functions', function(){
  describe('strToLowercaseDashed()', function() {
    it('should return a single word string as lowercase', function() {
      assert.equal(strToLowercaseDashed('Lowercase'), 'lowercase')
    })

    it('should return multi-word string as lowercase and dashed', function() {
      assert.equal(strToLowercaseDashed('Lowercase With dashes'), 'lowercase-with-dashes')
    })

    it('should handle non-letters', function() {
      assert.equal(strToLowercaseDashed('Lowercase 45 With dashes !'), 'lowercase-45-with-dashes-!')
    })
  })

  describe('centsToUSD', function() {
    it('should convert a single digit', function() {
      assert.equal(centsToUSD(1), '$0.01')
    })
    it('should convert two digits', function() {
      assert.equal(centsToUSD(10), '$0.10')
    })
    it('should convert three digits', function() {
      assert.equal(centsToUSD(100), '$1.00')
    })
    it('should convert four digits', function() {
      assert.equal(centsToUSD(1000), '$10.00')
    })
    it('should convert seven digits', function() {
      assert.equal(centsToUSD(1000000), '$10,000.00')
    })
    it('should convert a very long, random number', function() {
      assert.equal(centsToUSD(87894786578438904382), '$878,947,865,784,389,000.00')
    })
  })

  describe('removeLinkParams', function() {
    const shortUrl = 'https://www.amazon.com/dp/example?first=12345'
    const longUrl = 'https://www.amazon.com/dp/example?first=123&second=567&third=890'

    it('should remove single parameter', function() {
      assert.equal(removeLinkParams(shortUrl), 'https://www.amazon.com/dp/example')
    })
    it('should remove multi parameter', function() {
      assert.equal(removeLinkParams(longUrl), 'https://www.amazon.com/dp/example')
    })
  })

  describe('isDomain', function(){
    it('should correctly identify the link as true', function(){
      assert.equal(isDomain('https://amazon.com/example/link/?test=param', 'amazon.com'), true)
    })
  })
  describe('isDomain', function(){
    it('should correctly identify the link as false', function(){
      assert.equal(isDomain('https://amazon.com/example/link/?test=param', 'google.com'), false)
    })
  })
})
