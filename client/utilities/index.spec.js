const assert = require('assert')
import { strToLowercaseDashed } from './index'

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
})
