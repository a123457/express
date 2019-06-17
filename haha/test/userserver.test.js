const assert = require('assert')
const userFunc = require('../userserver.js')
const should = require('should')
describe("测试用户数据", function() {
    it("#getAllUserList()", function() {
        let arr = userFunc.getAllUserList()
        assert.equal(true, Array.isArray(arr))
    })   
    it("#getPageListInfo()", function() {
        let data = userFunc.getPageListInfo(1,10)
        data.data.should.be.a.Array()
        data.should.have.property('data')
        should(data).be.a.Object()
    })
})