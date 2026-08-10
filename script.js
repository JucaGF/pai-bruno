const audio = document.querySelector('#tribute-audio');
const audioDock = document.querySelector('.audio-dock');
const audioStatus = document.querySelector('#audio-status');
const audioProgress = document.querySelector('#audio-progress');
const audioCurrentTime = document.querySelector('#audio-current-time');
const audioDuration = document.querySelector('#audio-duration');
const audioButtons = [...document.querySelectorAll('[data-audio-toggle]')];
const galleryDialog = document.querySelector('#gallery-dialog');
const dialogImage = document.querySelector('[data-dialog-image]');
const dialogClose = document.querySelector('[data-dialog-close]');
const gallery = document.querySelector('.gallery');
const galleryPreview = document.querySelector('[data-gallery-preview]');
const galleryGrid = document.querySelector('[data-gallery-grid]');
const galleryToggle = document.querySelector('[data-gallery-toggle]');
const galleryToggleLabel = document.querySelector('[data-gallery-toggle-label]');
const galleryTracks = [...document.querySelectorAll('[data-gallery-track]')];

document.body.classList.add('reveal-enabled');

function formatAudioTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

function updateAudioProgress() {
  if (!audio) return;
  if (audioProgress && Number.isFinite(audio.duration)) {
    audioProgress.max = String(audio.duration);
    audioProgress.value = String(audio.currentTime);
  }
  if (audioCurrentTime) audioCurrentTime.textContent = formatAudioTime(audio.currentTime);
  if (audioDuration) audioDuration.textContent = formatAudioTime(audio.duration);
}

function setAudioState(isPlaying) {
  audioButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(isPlaying));
    const label = button.querySelector('[data-audio-label]');
    if (label) {
      label.textContent = isPlaying ? 'Pausar a trilha' : 'Ouvir a trilha do Yellowar';
    }

    const icon = button.querySelector('.audio-icon');
    if (icon) {
      icon.textContent = isPlaying ? 'Ⅱ' : button.classList.contains('audio-button--dock') ? '▶' : '♪';
    }
  });

  if (audioDock) {
    audioDock.classList.toggle('is-visible', isPlaying || audio.currentTime > 0);
  }

  if (audioStatus) {
    audioStatus.textContent = isPlaying ? 'Tocando agora' : audio.currentTime > 0 ? 'Trilha pausada' : 'Pronta para tocar';
  }
}

function toggleAudio() {
  if (!audio) return;

  if (audio.paused) {
    audio
      .play()
      .then(() => setAudioState(true))
      .catch(() => {
        if (audioStatus) audioStatus.textContent = 'A trilha precisa de um toque para começar.';
      });
    return;
  }

  audio.pause();
  setAudioState(false);
}

audioButtons.forEach((button) => button.addEventListener('click', toggleAudio));
audio?.addEventListener('play', () => setAudioState(true));
audio?.addEventListener('pause', () => setAudioState(false));
audio?.addEventListener('ended', () => setAudioState(false));
audio?.addEventListener('loadedmetadata', updateAudioProgress);
audio?.addEventListener('durationchange', updateAudioProgress);
audio?.addEventListener('timeupdate', updateAudioProgress);
audioProgress?.addEventListener('input', () => {
  if (!audio) return;
  audio.currentTime = Number(audioProgress.value);
  updateAudioProgress();
});

const revealItems = [...document.querySelectorAll('[data-reveal]')];

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

function buildGalleryTrack(track, galleryItems) {
  const cards = document.createDocumentFragment();

  [...galleryItems, ...galleryItems].forEach((galleryItem) => {
    const sourceImage = galleryItem.querySelector('img');
    if (!sourceImage) return;

    const card = document.createElement('span');
    card.className = 'gallery-marquee-item';
    card.setAttribute('aria-hidden', 'true');

    const image = document.createElement('img');
    image.src = sourceImage.getAttribute('src') || sourceImage.src;
    image.alt = '';
    image.decoding = 'async';
    card.append(image);
    cards.append(card);
  });

  track.replaceChildren(cards);
}

function enableGallerySwipe() {
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let committedOffset = 0;
  let isHorizontalGesture = false;

  function setTrackOffset(offset) {
    galleryTracks.forEach((track) => {
      track.style.setProperty('--gallery-drag-offset', `${offset}px`);
    });
  }

  function finishPointer(event) {
    if (pointerId !== event.pointerId) return;

    if (isHorizontalGesture) {
      committedOffset += event.clientX - startX;
      setTrackOffset(committedOffset);
    }

    galleryPreview.classList.remove('is-dragging');
    if (galleryPreview.hasPointerCapture?.(pointerId)) {
      galleryPreview.releasePointerCapture(pointerId);
    }
    pointerId = null;
    isHorizontalGesture = false;
  }

  galleryPreview.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    isHorizontalGesture = false;
    galleryPreview.setPointerCapture?.(pointerId);
  });

  galleryPreview.addEventListener('pointermove', (event) => {
    if (pointerId !== event.pointerId) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (!isHorizontalGesture) {
      if (Math.abs(deltaY) > Math.abs(deltaX) || Math.abs(deltaX) < 8) return;
      isHorizontalGesture = true;
      galleryPreview.classList.add('is-dragging');
    }

    event.preventDefault();
    setTrackOffset(committedOffset + deltaX);
  });

  galleryPreview.addEventListener('pointerup', finishPointer);
  galleryPreview.addEventListener('pointercancel', finishPointer);
}

function initializeGallery() {
  if (!gallery || !galleryPreview || !galleryGrid || !galleryToggle || !galleryToggleLabel || galleryTracks.length !== 2) {
    return;
  }

  const galleryItems = [...galleryGrid.querySelectorAll('[data-gallery-image]')];
  if (!galleryItems.length) return;

  const previewItems = galleryItems.slice(0, 8);
  galleryTracks.forEach((track) => buildGalleryTrack(track, previewItems));
  gallery.classList.add('gallery--interactive');
  enableGallerySwipe();

  let expanded = false;

  function setGalleryExpanded(nextExpanded) {
    expanded = nextExpanded;
    gallery.classList.toggle('gallery--expanded', expanded);
    galleryToggle.setAttribute('aria-expanded', String(expanded));
    galleryGrid.setAttribute('aria-hidden', String(!expanded));
    galleryGrid.inert = !expanded;
    galleryToggleLabel.textContent = expanded ? 'Recolher galeria' : 'Ver todas as fotos';

    if (expanded) {
      galleryItems.forEach((item) => item.classList.add('is-visible'));
    }
  }

  galleryToggle.addEventListener('click', () => setGalleryExpanded(!expanded));
  setGalleryExpanded(false);
}

initializeGallery();

let lastGalleryTrigger = null;

function openGalleryImage(image) {
  if (!galleryDialog || !dialogImage) return;
  lastGalleryTrigger = image;
  dialogImage.src = image.querySelector('img')?.src || '';
  dialogImage.alt = image.querySelector('img')?.alt || '';
  if (typeof galleryDialog.showModal === 'function') {
    galleryDialog.showModal();
  } else {
    galleryDialog.setAttribute('open', '');
  }
  dialogClose?.focus();
}

function closeGallery() {
  if (!galleryDialog) return;
  if (typeof galleryDialog.close === 'function') {
    galleryDialog.close();
  } else {
    galleryDialog.removeAttribute('open');
  }
  lastGalleryTrigger?.focus();
  lastGalleryTrigger = null;
}

document.querySelectorAll('[data-gallery-image]').forEach((image) => {
  image.addEventListener('click', () => openGalleryImage(image));
});

dialogClose?.addEventListener('click', closeGallery);
galleryDialog?.addEventListener('click', (event) => {
  if (event.target === galleryDialog) closeGallery();
});

setAudioState(false);
updateAudioProgress();
