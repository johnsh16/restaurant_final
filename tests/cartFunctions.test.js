const { test } = require('jest-circus')
const {saveCart, loadCart} = require('../lib/cartFunctions')

test('returns an array for items and a number for total', done => {
    return loadCart().then(data => {
        expect(typeof data.items).toBe('array')
        expect(typeof data.total).toBe('number')
    })
})