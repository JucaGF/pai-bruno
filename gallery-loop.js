(function registerGalleryLoop(globalScope) {
  function getRepeatWidth(setWidth) {
    return Number.isFinite(setWidth) && setWidth > 0 ? setWidth : 0;
  }

  function getInitialLoopOffset(direction, repeatWidth) {
    if (!Number.isFinite(repeatWidth) || repeatWidth <= 0) return 0;
    return direction > 0 ? -repeatWidth : 0;
  }

  function wrapLoopOffset(offset, repeatWidth) {
    if (!Number.isFinite(offset) || !Number.isFinite(repeatWidth) || repeatWidth <= 0) return 0;

    const remainder = offset % repeatWidth;
    return remainder > 0 ? remainder - repeatWidth : remainder;
  }

  const galleryLoop = { getInitialLoopOffset, getRepeatWidth, wrapLoopOffset };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = galleryLoop;
  }

  globalScope.galleryLoop = galleryLoop;
})(typeof window !== 'undefined' ? window : globalThis);
