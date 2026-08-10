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
const gallerySwipers = [...document.querySelectorAll('[data-gallery-swiper]')];

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

function createGallerySlide(galleryItem) {
  const sourceImage = galleryItem.querySelector('img');
  if (!sourceImage) return null;

  const slide = document.createElement('div');
  slide.className = 'swiper-slide gallery-marquee-item';
  slide.setAttribute('aria-hidden', 'true');

  const image = document.createElement('img');
  image.src = sourceImage.getAttribute('src') || sourceImage.src;
  image.alt = '';
  image.decoding = 'async';
  slide.append(image);

  return slide;
}

function buildGallerySwiper(swiperElement, galleryItems) {
  const wrapper = swiperElement.querySelector('.swiper-wrapper');
  if (!wrapper) return false;

  const slides = galleryItems.map(createGallerySlide).filter(Boolean);
  if (slides.length < 2) return false;
  wrapper.replaceChildren(...slides);
  return true;
}

function createGallerySwiper(swiperElement, reverseDirection) {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return new Swiper(swiperElement, {
    loop: true,
    loopAdditionalSlides: 4,
    slidesPerView: 'auto',
    spaceBetween: 14,
    speed: 9000,
    allowTouchMove: true,
    touchStartPreventDefault: false,
    autoplay: reduceMotion
      ? false
      : {
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection,
          waitForTransition: false,
        },
    freeMode: {
      enabled: true,
      momentum: false,
    },
  });
}

function initializeGallery() {
  if (
    !gallery ||
    !galleryPreview ||
    !galleryGrid ||
    !galleryToggle ||
    !galleryToggleLabel ||
    gallerySwipers.length !== 2 ||
    typeof window.Swiper !== 'function'
  ) {
    return;
  }

  const galleryItems = [...galleryGrid.querySelectorAll('[data-gallery-image]')];
  if (!galleryItems.length) return;

  const previewItems = galleryItems.slice(0, 32);
  const trackItems = [
    previewItems.filter((_, index) => index % 2 === 0),
    previewItems.filter((_, index) => index % 2 === 1),
  ];
  const didBuildAllSwipers = gallerySwipers.every((swiperElement, index) => buildGallerySwiper(swiperElement, trackItems[index]));
  if (!didBuildAllSwipers) return;

  const gallerySwiperInstances = gallerySwipers.map((swiperElement, index) =>
    createGallerySwiper(swiperElement, index === 1),
  );

  galleryPreview.hidden = false;
  gallery.classList.add('gallery--interactive');

  let expanded = false;

  function setGalleryExpanded(nextExpanded) {
    expanded = nextExpanded;
    gallery.classList.toggle('gallery--expanded', expanded);
    galleryToggle.setAttribute('aria-expanded', String(expanded));
    galleryGrid.setAttribute('aria-hidden', String(!expanded));
    galleryGrid.inert = !expanded;
    galleryToggleLabel.textContent = expanded ? 'Recolher galeria' : 'Ver todas as fotos';
    gallerySwiperInstances.forEach((swiper) => {
      if (!swiper.autoplay) return;
      if (expanded) swiper.autoplay.stop();
      else swiper.autoplay.start();
    });

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
