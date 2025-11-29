/* ============================================
   CASE STUDY INTERACTIONS
   ============================================ */

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initAOS();
  initSwiper();
  initReadingProgress();
  initTypingAnimation();
  initSmoothScroll();
});

/* ============================================
   AOS - ANIMATE ON SCROLL
   ============================================ */
function initAOS() {
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100,
    delay: 0,
    anchorPlacement: 'top-bottom'
  });
}

/* ============================================
   SWIPER CAROUSEL
   ============================================ */
function initSwiper() {
  const swiper = new Swiper('.mockup-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
}

/* ============================================
   READING PROGRESS BAR
   ============================================ */
function initReadingProgress() {
  const progressBar = document.getElementById('progressBar');

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate scroll percentage
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    // Update progress bar
    progressBar.style.width = scrollPercent + '%';
  });
}

/* ============================================
   TYPING ANIMATION (Simple version)
   ============================================ */
function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-text');

  if (!typingElement) return;

  const text = typingElement.textContent;
  typingElement.textContent = '';

  let index = 0;

  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }

  // Start typing after a small delay
  setTimeout(type, 500);
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================
   BLINKING ARROW (for call-to-action elements)
   ============================================ */
function initBlinkingArrows() {
  const arrows = document.querySelectorAll('.blink-arrow');

  arrows.forEach(arrow => {
    setInterval(() => {
      arrow.style.opacity = arrow.style.opacity === '0' ? '1' : '0';
    }, 600);
  });
}

/* ============================================
   LAZY LOAD IMAGES (Performance optimization)
   ============================================ */
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/* ============================================
   NUMBER COUNTER ANIMATION (for stats)
   ============================================ */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Initialize counters when they come into view
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ============================================
   IMAGE ZOOM ON CLICK (Lightbox effect)
   ============================================ */
function initImageZoom() {
  const images = document.querySelectorAll('.content-section img');

  images.forEach(img => {
    img.style.cursor = 'pointer';

    img.addEventListener('click', function() {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
      `;

      // Create zoomed image
      const zoomedImg = document.createElement('img');
      zoomedImg.src = this.src;
      zoomedImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      `;

      overlay.appendChild(zoomedImg);
      document.body.appendChild(overlay);

      // Close on click
      overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
      });

      // Close on ESC key
      document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape' && document.body.contains(overlay)) {
          document.body.removeChild(overlay);
          document.removeEventListener('keydown', closeOnEsc);
        }
      });
    });
  });
}

/* ============================================
   PARALLAX SCROLL EFFECT (Optional)
   ============================================ */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

/* ============================================
   SCROLL REVEAL (Alternative to AOS)
   ============================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });

  reveals.forEach(reveal => revealObserver.observe(reveal));
}

/* ============================================
   COPY TO CLIPBOARD (for color codes)
   ============================================ */
function initColorCopy() {
  const colorItems = document.querySelectorAll('.color-item');

  colorItems.forEach(item => {
    item.style.cursor = 'pointer';

    item.addEventListener('click', function() {
      const hexCode = this.querySelector('.color-hex').textContent;

      navigator.clipboard.writeText(hexCode).then(() => {
        // Show feedback
        const feedback = document.createElement('div');
        feedback.textContent = 'Copied!';
        feedback.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--primary-color, #0cc060);
          color: #000;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          animation: fadeInOut 1.5s ease;
        `;

        document.body.appendChild(feedback);

        setTimeout(() => {
          document.body.removeChild(feedback);
        }, 1500);
      });
    });
  });
}

// Add fadeInOut animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  }
`;
document.head.appendChild(style);
