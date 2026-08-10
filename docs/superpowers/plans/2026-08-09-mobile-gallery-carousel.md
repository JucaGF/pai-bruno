# Mobile Gallery Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the custom gallery loop with two independent, touch-safe infinite carousels.

**Architecture:** Swiper owns looping, autoplay and gestures for each row. The page script builds each row from gallery images and only controls initialization and visibility when the full gallery is expanded.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Swiper 11 CDN, Node built-in test runner.

## Global Constraints

- Keep the existing gallery grid as the no-JavaScript fallback.
- Keep two simultaneously visible rows at every viewport width.
- Do not use manual `requestAnimationFrame`, pointer capture, offsets, or DOM clone calculations.
- Autoplay must resume after a touch interaction.

---

### Task 1: Define the carousel contract

**Files:**
- Modify: `tests/gallery-interaction.test.js`
- Remove: `tests/gallery-loop.test.js`, `gallery-loop.js`

**Interfaces:**
- Consumes: gallery preview markup and image grid.
- Produces: tests requiring two independent Swiper containers and rejecting the former manual loop API.

- [x] **Step 1: Write failing tests**

Assert for two `data-gallery-swiper` containers, the Swiper CDN assets, two initializer calls, and absence of `requestAnimationFrame`/`pointerdown` loop code.

- [x] **Step 2: Run the focused tests**

Run: `node --test tests/gallery-interaction.test.js`

Expected: FAIL because the current preview uses `data-gallery-track` and custom loop code.

### Task 2: Replace the runtime loop

**Files:**
- Modify: `index.html`
- Modify: `script.js`
- Delete: `gallery-loop.js`

**Interfaces:**
- Consumes: `data-gallery-image` buttons in `#gallery-grid`.
- Produces: `buildGallerySwiper(swiperElement, galleryItems)` and two `new Swiper(...)` instances.

- [x] **Step 1: Add Swiper assets and two carousel containers**

Load Swiper 11 CSS and JavaScript before `script.js`. Each row is a `.swiper[data-gallery-swiper]` with a `.swiper-wrapper` child.

- [x] **Step 2: Build one slide per selected photo**

Create `.swiper-slide.gallery-marquee-item` elements from the source image URL. Split the first 32 source images between the two rows.

- [x] **Step 3: Initialize each row independently**

Use `loop: true`, `slidesPerView: 'auto'`, `allowTouchMove: true`, `autoplay.disableOnInteraction: false`, and opposite `reverseDirection` values. Stop and start both autoplays when the full gallery opens or closes.

### Task 3: Preserve the visual layout

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: Swiper container, wrapper and slide classes.
- Produces: two visible rows with the existing paper-photo appearance.

- [x] **Step 1: Remove custom loop layout rules**

Delete `.gallery-track`, `.gallery-track-set`, drag cursor, and custom gap-loop rules.

- [x] **Step 2: Style Swiper rows and slides**

Keep `overflow: hidden` on the preview, assign the row gap through Swiper spacing, and retain the 118px mobile slide width.

### Task 4: Verify the replacement

**Files:**
- Test: `tests/*.test.js`

- [x] **Step 1: Run the focused regression test**

Run: `node --test tests/gallery-interaction.test.js`

Expected: PASS.

- [x] **Step 2: Run all checks**

Run: `node --test tests/*.test.js && node --check script.js && git diff --check`

Expected: all tests pass, JavaScript parses, and the diff has no whitespace errors.
