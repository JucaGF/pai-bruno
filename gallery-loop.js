(function registerGalleryLoop(globalScope) {
  function wrapLoopOffset(offset, repeatWidth) {
    if (!Number.isFinite(offset) || !Number.isFinite(repeatWidth) || repeatWidth <= 0) return 0;

    const remainder = offset % repeatWidth;
    return remainder > 0 ? remainder - repeatWidth : remainder;
  }

  const galleryLoop = { wrapLoopOffset };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = galleryLoop;
  }

  globalScope.galleryLoop = galleryLoop;
})(typeof window !== 'undefined' ? window : globalThis);
