// ========================================
// CONFIGURATION - UPDATE YOUR DETAILS HERE
// ========================================
const CONFIG = {
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/santhosh-designer/',
    gmail: 'mailto:[email protected]',
    whatsapp: 'https://wa.me/919941292729'
  },
  whatsappNumber: '919941292729' // Used for pricing plan CTAs
};

// ========================================
// DOCK MENU DATA
// ========================================
const dockItems = [
  {
    id: 'hire',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>`,
    label: 'Hire Me',
    link: '../hire/hire.html'
  },
  {
    id: 'mentor',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>`,
    label: 'Need Mentor',
    link: '../mentor/mentor.html'
  },
  {
    id: 'about',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>`,
    label: 'About Me',
    link: '../about/about.html'
  }
];

// ========================================
// TESTIMONIALS DATA - UPDATE WITH REAL CLIENTS
// ========================================
const testimonials = [
  {
    name: "Client Name 1",
    role: "Founder at Company Name",
    image: "../assets/Daniel.png",
    quote: "Working with Santhosh was an absolute pleasure. The attention to detail and understanding of user needs resulted in a beautiful, functional design that exceeded our expectations."
  },
  {
    name: "Client Name 2",
    role: "Product Manager at Tech Startup",
    image: "../assets/Daniel.png",
    quote: "Exceptional UX/UI design work! Santhosh transformed our complex product into an intuitive experience. The project was delivered on time with excellent communication throughout."
  },
  {
    name: "Client Name 3",
    role: "CEO at E-commerce Company",
    image: "../assets/Daniel.png",
    quote: "The redesign significantly improved our conversion rates. Santhosh's expertise in user research and design systems made a real impact on our business metrics."
  }
];

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLoader();
  initNavigation();
  initIntroAnimations();
  initScrollIndicator();
  initPricingToggle();
  initPricingTooltipCursor();
  initProjectCustomCursor();
  initDockMenu();
  renderTestimonials();
  setupGSAPScrollTriggers();
});

// ========================================
// THEME MANAGEMENT
// ========================================
function initTheme() {
  const savedTheme = localStorage.getItem('portfolioTheme') || 'green';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  const body = document.body;

  // Remove all theme classes
  body.classList.remove('theme-blue', 'theme-purple', 'theme-amber', 'theme-pink');

  // Apply theme based on selection
  if (theme !== 'green') {
    body.classList.add(`theme-${theme}`);
  }

  localStorage.setItem('portfolioTheme', theme);
}

// ========================================
// LOADER
// ========================================
function initLoader() {
  const loader = document.getElementById('terminalLoader');
  const wrapper = document.getElementById('freelanceWrapper');

  setTimeout(() => {
    loader.classList.add('fade-out');
    wrapper.classList.add('visible');

    setTimeout(() => {
      loader.style.display = 'none';
    }, 600);
  }, 1500);
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
  const homeBtn = document.getElementById('homeBtn');
  const socialBtns = document.querySelectorAll('.social-btn');

  // Home button
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      // Set flag to skip loader on homepage
      sessionStorage.setItem('returningHome', 'true');
      window.location.href = '../index.html';
    });
  }

  // Social buttons - using CONFIG
  socialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const linkType = btn.getAttribute('data-link');
      const url = CONFIG.socialLinks[linkType];

      if (url) {
        if (linkType === 'gmail') {
          window.location.href = url;
        } else {
          window.open(url, '_blank');
        }
      } else {
        console.warn(`No URL configured for ${linkType}`);
      }
    });
  });
}

// ========================================
// INTRO ANIMATIONS - SEQUENTIAL LOADING
// ========================================
function initIntroAnimations() {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined') {
    console.error('GSAP library not loaded. Animations will be skipped.');
    // Fallback: Show elements immediately
    document.querySelectorAll('.logo-badge, .line1, .line2, .intro-description, .scroll-indicator').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Create a timeline for sequential animations
  const timeline = gsap.timeline({
    delay: 1.5,
    onStart: () => {
      console.log('🌊 Starting intro animation...');
    },
    onComplete: () => {
      console.log('✅ Intro animation complete!');
    }
  });

  timeline
    // Logo badge - Fade up smoothly
    .to('.logo-badge', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      force3D: true
    })
    // Title (line1) - Fade up smoothly
    .to('.line1', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      force3D: true
    }, '-=0.6')
    // Subtitle (line2) - Fade up smoothly
    .to('.line2', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      force3D: true
    }, '-=0.6')
    // Description - Fade up smoothly
    .to('.intro-description', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      force3D: true
    }, '-=0.5')
    // Scroll indicator - Fade up smoothly
    .to('.scroll-indicator', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      force3D: true
    }, '-=0.4');

  // Show scroll indicator after animations
  setTimeout(() => {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
      scrollIndicator.style.pointerEvents = 'auto';
    }
  }, 2000);
}

// ========================================
// SCROLL INDICATOR & HEADER VISIBILITY
// ========================================
function initScrollIndicator() {
  let scrollTimer;

  window.addEventListener('scroll', () => {
    handleScrollIndicatorVisibility();
    handleHeaderVisibility();
    handleDockVisibility();

    // Add scrolling class to dock
    const dock = document.getElementById('dockMenu');
    if (dock) {
      dock.classList.add('scrolling');

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        dock.classList.remove('scrolling');
      }, 150);
    }
  }, { passive: true });
}

function handleScrollIndicatorVisibility() {
  const scrollIndicator = document.getElementById('scrollIndicator');

  if (!scrollIndicator) return;

  // Hide after scrolling 200px down
  if (typeof gsap !== 'undefined') {
    if (window.scrollY > 200) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to(scrollIndicator, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  } else {
    // Fallback without GSAP
    scrollIndicator.style.opacity = window.scrollY > 200 ? '0' : '1';
  }
}

function handleHeaderVisibility() {
  const nav = document.getElementById('freelanceNav');

  if (!nav) return;

  const currentScrollY = window.scrollY;

  // Fade out immediately when scrolling down from top
  if (currentScrollY > 100) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
}

function handleDockVisibility() {
  const dock = document.getElementById('dockMenu');
  if (!dock) return;

  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    dock.classList.add('hidden');
  } else {
    dock.classList.remove('hidden');
  }
}

// ========================================
// PRICING CTA - WHATSAPP & ACCORDION
// ========================================
function initPricingToggle() {
  // WhatsApp functionality for CTA buttons
  const ctaButtons = document.querySelectorAll('.plan-cta');

  ctaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      const price = btn.getAttribute('data-price');
      const delivery = btn.getAttribute('data-delivery');
      const revisions = btn.getAttribute('data-revisions');

      // Create WhatsApp message
      const message = `Hi Santhosh! 👋

I'm interested in the *${plan} Plan* for freelance work.

📋 *Plan Details:*
💰 Price: ₹${price}
⏱️ Delivery: ${delivery}
🔄 Revisions: ${revisions}

Can we discuss this further?`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);

      // WhatsApp URL - using CONFIG
      const whatsappURL = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappURL, '_blank');
    });
  });

  // Mobile accordion functionality for details toggle
  const detailsToggles = document.querySelectorAll('.details-toggle');

  detailsToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const card = toggle.closest('.pricing-card');
      const isExpanded = card.classList.toggle('expanded');

      // Update aria-expanded for accessibility
      toggle.setAttribute('aria-expanded', isExpanded);
    });

    // Keyboard support (Enter/Space)
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  });
}

// ========================================
// PRICING TOOLTIP CURSOR (DESKTOP ONLY)
// ========================================
function initPricingTooltipCursor() {
  const tooltipCursor = document.getElementById('pricingTooltipCursor');
  const tooltipList = document.getElementById('tooltipList');
  const pricingCards = document.querySelectorAll('.pricing-card');

  if (!tooltipCursor || !tooltipList || !pricingCards.length) return;

  // Only enable on desktop (>768px)
  const isDesktop = () => window.innerWidth > 768;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    if (isDesktop()) {
      tooltipCursor.style.left = e.clientX + 'px';
      tooltipCursor.style.top = e.clientY + 'px';
    }
  });

  // Add hover listeners to each pricing card
  pricingCards.forEach(card => {
    const ctaButton = card.querySelector('.plan-cta');

    card.addEventListener('mouseenter', (e) => {
      if (!isDesktop()) return;

      // Get includes list from this card
      const includesList = card.querySelector('.includes-list');
      if (!includesList) return;

      // Clear and populate tooltip with includes
      tooltipList.innerHTML = '';
      const items = includesList.querySelectorAll('li');
      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.textContent;
        tooltipList.appendChild(li);
      });

      // Show tooltip and hide default cursor
      tooltipCursor.classList.add('active');
      document.body.style.cursor = 'none';
    });

    card.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;

      // Hide tooltip and restore cursor
      tooltipCursor.classList.remove('active');
      document.body.style.cursor = 'default';
    });

    // Hide tooltip when hovering over the CTA button
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        if (!isDesktop()) return;
        tooltipCursor.classList.remove('active');
        document.body.style.cursor = 'pointer';
      });

      ctaButton.addEventListener('mouseleave', () => {
        if (!isDesktop()) return;
        tooltipCursor.classList.add('active');
        document.body.style.cursor = 'none';
      });
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (!isDesktop()) {
      tooltipCursor.classList.remove('active');
      document.body.style.cursor = 'default';
    }
  });

  // Hide tooltip immediately on scroll
  window.addEventListener('scroll', () => {
    if (tooltipCursor.classList.contains('active')) {
      tooltipCursor.classList.remove('active');
      document.body.style.cursor = 'default';
    }
  }, { passive: true });
}

// ========================================
// PROJECT CUSTOM CURSOR
// ========================================
function initProjectCustomCursor() {
  const customCursor = document.getElementById('projectCustomCursor');
  const projectCards = document.querySelectorAll('.project-showcase-card');

  if (!customCursor || !projectCards.length) return;

  // Only enable on desktop (>1024px)
  const isDesktop = () => window.innerWidth > 1024;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    if (isDesktop()) {
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    }
  });

  // Add hover listeners to each project card
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!isDesktop()) return;

      // Show custom cursor and hide default
      customCursor.classList.add('active');
      document.body.style.cursor = 'none';
    });

    card.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;

      // Hide custom cursor and restore default
      customCursor.classList.remove('active');
      document.body.style.cursor = 'default';
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (!isDesktop()) {
      customCursor.classList.remove('active');
      document.body.style.cursor = 'default';
    }
  });

  // Hide cursor on scroll
  window.addEventListener('scroll', () => {
    if (customCursor.classList.contains('active')) {
      customCursor.classList.remove('active');
      document.body.style.cursor = 'default';
    }
  }, { passive: true });
}

// ========================================
// DOCK MENU
// ========================================
function initDockMenu() {
  const dockMenu = document.getElementById('dockMenu');
  const dockBlurOverlay = document.getElementById('dockBlurOverlay');

  if (!dockMenu) return;

  // Render dock items with labels
  dockMenu.innerHTML = dockItems
    .map(item => `
      <button class="dock-item" data-link="${item.link}" title="${item.label}">
        ${item.icon}
        <span class="dock-item-label">${item.label}</span>
      </button>
    `)
    .join('');

  // Add click listeners
  const dockItemElements = dockMenu.querySelectorAll('.dock-item');
  dockItemElements.forEach(item => {
    item.addEventListener('click', () => {
      const link = item.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });

  // Add blur overlay on dock hover
  if (dockBlurOverlay) {
    dockMenu.addEventListener('mouseenter', () => {
      dockBlurOverlay.classList.add('active');
    });

    dockMenu.addEventListener('mouseleave', () => {
      dockBlurOverlay.classList.remove('active');
    });
  }
}

// ========================================
// TESTIMONIALS RENDERING
// ========================================
function renderTestimonials() {
  const container = document.querySelector('.testimonials-container');
  if (!container) return;

  const placeholderImage = '../assets/Daniel.png';

  container.innerHTML = testimonials
    .map(testimonial => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img" onerror="this.onerror=null; this.src='${placeholderImage}'">
          <div class="testimonial-info">
            <div class="testimonial-name">${testimonial.name}</div>
            <div class="testimonial-role">${testimonial.role}</div>
          </div>
        </div>
        <p class="testimonial-quote">"${testimonial.quote}"</p>
      </div>
    `)
    .join('');
}

// ========================================
// GSAP SCROLL TRIGGER ANIMATIONS
// ========================================
function setupGSAPScrollTriggers() {
  // Register GSAP ScrollTrigger plugin
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.error('GSAP or ScrollTrigger not loaded');
    return;
  }

  // Projects Section Animation
  gsap.fromTo('.projects-section',
    {
      y: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Project Cards Animation (staggered)
  gsap.fromTo('.project-showcase-card',
    {
      y: 80,
      opacity: 0,
      scale: 0.95
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Pricing Section Animation
  gsap.fromTo('.pricing-section',
    {
      y: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.pricing-section',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Pricing Cards Animation (staggered)
  gsap.fromTo('.pricing-card',
    {
      y: 80,
      opacity: 0,
      scale: 0.95
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Success Stories Section Animation
  gsap.fromTo('.success-section',
    {
      y: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.success-section',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Testimonial Cards Animation (staggered)
  gsap.fromTo('.testimonial-card',
    {
      y: 80,
      opacity: 0,
      scale: 0.95
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.testimonials-container',
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  console.log('✅ GSAP ScrollTrigger animations initialized');
}

