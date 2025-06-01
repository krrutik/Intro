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

    // Read data- attributes (all come back as strings; convert where needed)
    const loop = this.getAttribute('data-loop') === 'true';
    const autoplay = this.getAttribute('data-autoplay') === 'true';
    const autoplayDelay = parseInt(this.getAttribute('data-autoplay-delay')) || 0;
    const speed = parseInt(this.getAttribute('data-speed')) || 300;
    const slidesPerView = parseInt(this.getAttribute('data-slides-per-view')) || 1;
    const spaceBetween = parseInt(this.getAttribute('data-space-between')) || 0;
    const showNavigation = this.getAttribute('data-show-navigation') === 'true';
    const showPagination = this.getAttribute('data-show-pagination') === 'true';

    // Find required sub‐elements
    const wrapper = this.querySelector('.swiper-wrapper');
    if (!wrapper) {
      console.warn('<swiper-slider> requires a .swiper-wrapper inside.');
      return;
    }

    // Build Swiper options object
    const options = {
      loop,
      speed,
      slidesPerView,
      spaceBetween
    };

    if (autoplay) {
      options.autoplay = { delay: autoplayDelay, disableOnInteraction: false };
    }

    if (showNavigation) {
      options.navigation = {
        nextEl: this.querySelector('.swiper-button-next'),
        prevEl: this.querySelector('.swiper-button-prev')
      };
    }

    if (showPagination) {
      options.pagination = {
        el: this.querySelector('.swiper-pagination'),
        clickable: true
      };
    }

    // Finally initialize Swiper on this element
    new Swiper(`.${this.id}`, options);
  }
}

customElements.define('swiper-slider', SwiperSlider);
