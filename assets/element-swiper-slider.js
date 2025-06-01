// assets/element-swiper-slider.js
class SwiperSlider extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Wait for Swiper to be loaded
    if (typeof Swiper === 'undefined') {
      window.addEventListener('load', () => this._init());
    } else {
      this._init();
    }
  }

  _init() {
    if (this._initialized) return;
    this._initialized = true;

    // Find required sub‐elements
    const wrapper = this.querySelector('.swiper-wrapper');
    if (!wrapper) {
      console.warn('<swiper-slider> requires a .swiper-wrapper inside.');
      return;
    }

    // Build Swiper options object
    const options = this._buildOptions();

    // Finally initialize Swiper on this element
    new Swiper(`.${this.id}`, options);
  }

  _buildOptions() {
    const options = {};

    // Helper to parse boolean attributes
    const parseBool = (attr) => this.getAttribute(attr) === 'true';
    

    // ─── Loop ───
    if (parseBool('data-loop')) {
      options.loop = true;
    }

    // ─── Direction ───
    const direction = this.getAttribute('data-direction');
    if (direction === 'horizontal' || direction === 'vertical') {
      options.direction = direction;
    }

    // ─── Speed (animating) ───
    const speed = parseInt(this.getAttribute('data-speed'), 10);
    if (!Number.isNaN(speed) && speed >= 0) {
      options.speed = speed;
    }

    // ─── Slides Per View ───
    const slidesPerView = parseInt(this.getAttribute('data-slides-per-view'), 10);
    if (!Number.isNaN(slidesPerView) && slidesPerView > 0) {
      options.slidesPerView = slidesPerView;
    }

    // ─── Space Between ───
    const spaceBetween = parseInt(this.getAttribute('data-space-between'), 10);
    if (!Number.isNaN(spaceBetween) && spaceBetween >= 0) {
      options.spaceBetween = spaceBetween;
    }

    // ─── Centered Slides ───
    if (parseBool('data-centered-slides')) {
      options.centeredSlides = true;
    }

    // ─── Allow Touch Move ───
    if (parseBool('data-allow-touch-move') === false) {
      options.allowTouchMove = false;
    }

    // ─── Free Mode ───
    if (parseBool('data-free-mode')) {
      options.freeMode = true;
    }

    // ─── Effects: Fade or Flip ───
    if (parseBool('data-fade-effect')) {
      options.effect = 'fade';
      options.fadeEffect = { crossFade: true };
    } else if (parseBool('data-flip-effect')) {
      options.effect = 'flip';
      options.flipEffect = { slideShadows: true };
    }

    // ─── Autoplay ───
    if (parseBool('data-autoplay')) {
      const delay = parseInt(this.getAttribute('data-autoplay-delay'), 10);
      options.autoplay = {
        delay: !Number.isNaN(delay) && delay >= 0 ? delay : 3000,
        disableOnInteraction: false
      };
    }

    // ─── Navigation ───
    if (parseBool('data-navigation')) {
      options.navigation = {
        nextEl: this.querySelector('.swiper-button-next'),
        prevEl: this.querySelector('.swiper-button-prev')
      };
    }

    // ─── Pagination ───
    if (parseBool('data-pagination')) {
      options.pagination = {
        el: this.querySelector('.swiper-pagination'),
        clickable: true
      };
    }

    // ─── Scrollbar ───
    if (parseBool('data-scrollbar')) {
      options.scrollbar = {
        el: this.querySelector('.swiper-scrollbar'),
        draggable: true
      };
    }

    // ─── Thumbs ───
    const thumbsSelector = this.getAttribute('data-thumbs');
    if (thumbsSelector) {
      const thumbsEl = document.querySelector(thumbsSelector);
      if (thumbsEl && thumbsEl.swiper) {
        options.thumbs = { swiper: thumbsEl.swiper };
      } else {
        console.warn(`Thumbs swiper not found or not initialized for selector: ${thumbsSelector}`);
      }
    }

    // ─── Breakpoints (JSON) ───
    const breakpointsAttr = this.getAttribute('data-breakpoints');
    if (breakpointsAttr) {
      try {
        const parsed = JSON.parse(breakpointsAttr);
        if (typeof parsed === 'object' && parsed !== null) {
          options.breakpoints = parsed;
        } else {
          console.warn('Invalid breakpoints: not a valid object');
        }
      } catch (err) {
        console.warn('Error parsing breakpoints JSON:', err);
      }
    }

    return options;
  }
}

customElements.define('swiper-slider', SwiperSlider);
