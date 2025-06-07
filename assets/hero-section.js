// Hero Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize hero section functionality
  const heroSections = document.querySelectorAll('.hero-section');
  
  heroSections.forEach(function(section) {
    const videos = section.querySelectorAll('video');
    
    // Handle video autoplay and intersection observer
    videos.forEach(function(video) {
      if (video.hasAttribute('autoplay')) {
        // Ensure video plays when in viewport
        const observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              video.play().catch(function(error) {
                console.log('Video autoplay failed:', error);
              });
            } else {
              video.pause();
            }
          });
        }, {
          threshold: 0.5
        });
        
        observer.observe(video);
      }
    });
    
    // Add smooth scroll for anchor buttons
    const buttons = section.querySelectorAll('a[href^="#"]');
    buttons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  });
  
  // Handle responsive video sizing
  function handleVideoResize() {
    const fullWidthVideos = document.querySelectorAll('.hero-full-width video');
    fullWidthVideos.forEach(function(video) {
      const container = video.closest('.hero-video-container');
      if (container) {
        const containerRatio = container.offsetWidth / container.offsetHeight;
        const videoRatio = video.videoWidth / video.videoHeight;
        
        if (containerRatio > videoRatio) {
          video.style.width = '100%';
          video.style.height = 'auto';
        } else {
          video.style.width = 'auto';
          video.style.height = '100%';
        }
      }
    });
  }
  
  // Run on load and resize
  window.addEventListener('load', handleVideoResize);
  window.addEventListener('resize', handleVideoResize);
});