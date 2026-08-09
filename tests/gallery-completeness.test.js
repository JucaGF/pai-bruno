const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');
const galleryImages = (html.match(/class="gallery-item[^"]*"[\s\S]*?<img /g) || []).length;

assert.ok(
  galleryImages >= 40,
  `A galeria precisa conter pelo menos 40 fotos; encontrou ${galleryImages}.`,
);

console.log(`gallery completeness check passed with ${galleryImages} photos`);
