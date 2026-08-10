const assert = require('node:assert/strict');
const fs = require('node:fs');

const css = fs.readFileSync('styles.css', 'utf8');
const mobileStyles = css.match(/@media \(max-width: 700px\)\s*\{([\s\S]*?)\n\}/)?.[1] || '';

assert.match(mobileStyles, /\.hero-collage\s*\{[\s\S]*?display:\s*grid/);
assert.match(mobileStyles, /\.hero-collage\s*\{[\s\S]*?min-height:\s*0/);
assert.match(mobileStyles, /\.paper-photo\s*\{[\s\S]*?position:\s*relative/);
assert.match(mobileStyles, /\.paper-photo\s*\{[\s\S]*?inset:\s*auto/);

console.log('responsive layout regression checks passed');
