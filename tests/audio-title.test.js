const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');

assert.match(html, /<strong>Agora te Vejo - banda EJC<\/strong>/);
assert.doesNotMatch(html, /<strong>Yellowar em movimento<\/strong>/);
assert.match(html, /id="audio-progress"/);
assert.match(html, /aria-label="Escolher o momento da música"/);

const script = fs.readFileSync('script.js', 'utf8');
assert.match(script, /audioProgress/);
assert.match(script, /audio\.currentTime = Number\(audioProgress\.value\)/);

console.log('audio title is correct');
