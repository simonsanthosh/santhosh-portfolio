// ========================================
// CONFIGURATION - UPDATE YOUR DETAILS HERE
// ========================================
const CONFIG = {
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/santhosh-designer/',
    gmail: 'mailto:[email protected]',
    whatsapp: 'https://wa.me/919941292729'
  },
  resumePath: '../assets/Santhosh_Resume.jpg',
  resumeDownloadPath: '../assets/Santhosh_Resume.pdf'
};

// ========================================
// CASE STUDIES DATA - UPDATE WITH REAL PROJECTS
// ========================================
const caseStudies = [
  {
    title: "E-Commerce Platform Redesign",
    description: "Complete redesign of a major e-commerce platform, focusing on improving user flow and increasing conversion rates through data-driven design decisions.",
    image: "../assets/case-study-placeholder-1.jpg",
    tags: ["UX Research", "UI Design", "A/B Testing"],
    link: "#"
  },
  {
    title: "Mobile Banking App",
    description: "Designed an intuitive mobile banking experience from ground up, conducting extensive user research and creating a design system for consistency.",
    image: "../assets/case-study-placeholder-2.jpg",
    tags: ["Mobile UX", "Design System", "User Testing"],
    link: "#"
  },
  {
    title: "Healthcare Dashboard",
    description: "Created a comprehensive dashboard for healthcare professionals to monitor patient data and analytics with focus on accessibility and information hierarchy.",
    image: "../assets/case-study-placeholder-3.jpg",
    tags: ["Dashboard Design", "Data Visualization", "Accessibility"],
    link: "#"
  }
];

// ========================================
// GRAPHIC DESIGN DATA - UPDATE WITH REAL WORKS
// ========================================
const graphicDesigns = [
  {
    title: "Tech Conference Poster",
    category: "posters",
    image: "../assets/poster-placeholder-1.jpg"
  },
  {
    title: "Startup Logo Design",
    category: "logos",
    image: "../assets/logo-placeholder-1.jpg"
  },
  {
    title: "Product Brochure",
    category: "brochures",
    image: "../assets/brochure-placeholder-1.jpg"
  },
  {
    title: "Music Festival Poster",
    category: "posters",
    image: "../assets/poster-placeholder-2.jpg"
  },
  {
    title: "Brand Identity Logo",
    category: "logos",
    image: "../assets/logo-placeholder-2.jpg"
  },
  {
    title: "Service Brochure",
    category: "brochures",
    image: "../assets/brochure-placeholder-2.jpg"
  }
];

// ========================================
// DOCK MENU DATA
// ========================================
const dockItems = [
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
    id: 'freelance',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/>
      <path d="m8 6 2-2"/>
      <path d="m18 16 2-2"/>
      <path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/>
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
      <path d="m15 5 4 4"/>
    </svg>`,
    label: 'Freelancing Support',
    link: '../freelance/freelance.html'
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
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLoader();
  initNavigation();
  initIntroAnimations();
  initScrollIndicator();
  initResumeModal();
  initDockMenu();
  renderCaseStudies();
  renderGraphicDesigns();
  initCategoryFilter();
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
  body.classList.remove('theme-blue', 'theme-purple', 'theme-amber', 'theme-pink');
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
  const wrapper = document.getElementById('hireWrapper');

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
  if (typeof gsap === 'undefined') {
    console.error('GSAP library not loaded. Animations will be skipped.');
    document.querySelectorAll('.line1, .intro-description, .scroll-indicator').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const timeline = gsap.timeline({
    delay: 0.5,
    onStart: () => {
      console.log('🌊 Starting intro animation...');
    },
    onComplete: () => {
      console.log('✅ Intro animation complete!');
    }
  });

  timeline
    // Title (line1) - Fade up smoothly
    .to('.line1', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      force3D: true
    })
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
    scrollIndicator.style.opacity = window.scrollY > 200 ? '0' : '1';
  }
}

function handleHeaderVisibility() {
  const nav = document.getElementById('hireNav');
  if (!nav) return;

  const currentScrollY = window.scrollY;

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
// RESUME MODAL
// ========================================
function initResumeModal() {
  const resumeBtn = document.getElementById('resumeBtn');
  const resumeModalOverlay = document.getElementById('resumeModalOverlay');
  const resumeCloseIcon = document.getElementById('resumeCloseIcon');
  const resumeDownloadIcon = document.getElementById('resumeDownloadIcon');
  const resumeFilename = document.getElementById('resumeFilename');

  // Open modal
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      resumeModalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close modal
  const closeModal = () => {
    resumeModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (resumeCloseIcon) {
    resumeCloseIcon.addEventListener('click', closeModal);
  }

  // Close on overlay click
  resumeModalOverlay.addEventListener('click', (e) => {
    if (e.target === resumeModalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Download resume
  if (resumeDownloadIcon) {
    resumeDownloadIcon.addEventListener('click', () => {
      const filename = resumeFilename.value.trim() || 'Santhosh_UX_Designer_Resume';
      const link = document.createElement('a');
      link.href = CONFIG.resumeDownloadPath;
      link.download = `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

// ========================================
// DOCK MENU
// ========================================
function initDockMenu() {
  const dockMenu = document.getElementById('dockMenu');
  const dockBlurOverlay = document.getElementById('dockBlurOverlay');

  if (!dockMenu) return;

  // Render dock items
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
// CASE STUDIES RENDERING
// ========================================
function renderCaseStudies() {
  const container = document.getElementById('caseStudiesGrid');
  if (!container) return;

  const placeholderImage = '../assets/project-placeholder-1.jpg';

  container.innerHTML = caseStudies
    .map(study => `
      <article class="case-study-card" data-link="${study.link}">
        <img src="${study.image}" alt="${study.title}" class="case-study-image" onerror="this.onerror=null; this.src='${placeholderImage}'">
        <div class="case-study-content">
          <h3 class="case-study-title">${study.title}</h3>
          <p class="case-study-description">${study.description}</p>
          <div class="case-study-tags">
            ${study.tags.map(tag => `<span class="case-study-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    `)
    .join('');

  // Add click listeners for case studies
  const caseStudyCards = container.querySelectorAll('.case-study-card');
  caseStudyCards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.getAttribute('data-link');
      if (link && link !== '#') {
        window.location.href = link;
      }
    });
  });
}

// ========================================
// GRAPHIC DESIGNS RENDERING
// ========================================
function renderGraphicDesigns(filterCategory = 'all') {
  const container = document.getElementById('graphicDesignGrid');
  if (!container) return;

  const placeholderImage = '../assets/project-placeholder-1.jpg';

  const filteredDesigns = filterCategory === 'all'
    ? graphicDesigns
    : graphicDesigns.filter(design => design.category === filterCategory);

  container.innerHTML = filteredDesigns
    .map(design => `
      <div class="graphic-design-item" data-category="${design.category}">
        <img src="${design.image}" alt="${design.title}" class="graphic-design-image" onerror="this.onerror=null; this.src='${placeholderImage}'">
        <div class="graphic-design-info">
          <h3 class="graphic-design-title">${design.title}</h3>
          <p class="graphic-design-category">${design.category}</p>
        </div>
      </div>
    `)
    .join('');

  // Re-trigger GSAP animations for filtered items
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
    gsap.fromTo('.graphic-design-item', {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }
}

// ========================================
// CATEGORY FILTER
// ========================================
function initCategoryFilter() {
  const categoryTabs = document.querySelectorAll('.category-tab');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));

      // Add active class to clicked tab
      tab.classList.add('active');

      // Get category and filter
      const category = tab.getAttribute('data-category');
      renderGraphicDesigns(category);
    });
  });
}

// ========================================
// GSAP SCROLL TRIGGER ANIMATIONS
// ========================================
function setupGSAPScrollTriggers() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.error('GSAP or ScrollTrigger not loaded');
    return;
  }

  // Case Studies Section Animation
  gsap.fromTo('.case-studies-section',
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
        trigger: '.case-studies-section',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Case Study Cards Animation (staggered)
  gsap.fromTo('.case-study-card',
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
        trigger: '.case-studies-grid',
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Graphic Design Section Animation
  gsap.fromTo('.graphic-design-section',
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
        trigger: '.graphic-design-section',
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Graphic Design Items Animation (staggered)
  gsap.fromTo('.graphic-design-item',
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
        trigger: '.graphic-design-grid',
        start: 'top 85%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  console.log('✅ GSAP ScrollTrigger animations initialized');
}
