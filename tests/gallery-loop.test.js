const assert = require('node:assert/strict');
const { getInitialLoopOffset, getRepeatWidth, wrapLoopOffset } = require('../gallery-loop');

assert.equal(wrapLoopOffset(0, 100), 0);
assert.equal(wrapLoopOffset(-1, 100), -1);
assert.equal(wrapLoopOffset(-101, 100), -1);
assert.equal(wrapLoopOffset(1, 100), -99);
assert.equal(wrapLoopOffset(100, 100), 0);
assert.equal(wrapLoopOffset(24, 0), 0);

// A transformed track must loop using a set's own width, never the position
// reported for a later flex sibling.
assert.equal(getRepeatWidth(1016.5), 1016.5);
assert.equal(getRepeatWidth(0), 0);
assert.equal(getRepeatWidth(Number.NaN), 0);

// The right-moving row starts from the preceding copy so it is visible before
// the first animation frame advances it.
assert.equal(getInitialLoopOffset(-1, 1016.5), 0);
assert.equal(getInitialLoopOffset(1, 1016.5), -1016.5);

console.log('gallery loop offset checks passed');
