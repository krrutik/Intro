class SiteHeader extends HTMLElement {
  constructor() {
    super();

    this.lastScrollTop = 0;
    this.scrollHandler = this.handleScroll.bind(this);
  }

  connectedCallback() {
    this.header = this.closest('header');
    this.stickyOption = this.dataset.stickyOption || 'none';

    if (!this.header) return;

    this.initStickyBehavior();
    this.initMegamenuHover();
  }

  initStickyBehavior() {
    switch (this.stickyOption) {
      case 'always':
        this.header.classList.add('is-sticky');
        break;

      case 'on-scroll-up':
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
        break;

      case 'none':
      default:
        this.header.classList.remove('is-sticky', 'is-visible', 'is-hidden');
        break;
    }
  }

  handleScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
      this.showHeader();
    } else if (currentScroll < this.lastScrollTop) {
      this.showHeader();
    } else if (currentScroll > this.lastScrollTop) {
      this.hideHeader();
    }

    this.lastScrollTop = currentScroll;
  }

  showHeader() {
    this.header.classList.remove('is-hidden');
    this.header.classList.add('is-visible');
  }

  hideHeader() {
    this.header.classList.remove('is-visible');
    this.header.classList.add('is-hidden');
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  initMegamenuHover() {
  const hoverItems = this.querySelectorAll('[data-hover-handler]');
  const megamenus = document.querySelectorAll('.dropdown-megamenu');

  hoverItems.forEach(item => {
    const handler = item.dataset.hoverHandler;

    item.addEventListener('mouseenter', () => {
      megamenus.forEach(menu => {
        if (menu.dataset.menuHandler === handler) {
          menu.classList.add('show');
        } else {
          menu.classList.remove('show');
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      setTimeout(() => {
        megamenus.forEach(menu => menu.classList.remove('show'));
      }, 150);
    });
  });

  megamenus.forEach(menu => {
    menu.addEventListener('mouseenter', () => {
      menu.classList.add('show');
    });

    menu.addEventListener('mouseleave', () => {
      menu.classList.remove('show');
    });
  });
}

}

customElements.define('site-header', SiteHeader);
