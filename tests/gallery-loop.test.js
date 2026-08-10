const assert = require('node:assert/strict');
const { wrapLoopOffset } = require('../gallery-loop');

assert.equal(wrapLoopOffset(0, 100), 0);
assert.equal(wrapLoopOffset(-1, 100), -1);
assert.equal(wrapLoopOffset(-101, 100), -1);
assert.equal(wrapLoopOffset(1, 100), -99);
assert.equal(wrapLoopOffset(100, 100), 0);
assert.equal(wrapLoopOffset(24, 0), 0);

console.log('gallery loop offset checks passed');
