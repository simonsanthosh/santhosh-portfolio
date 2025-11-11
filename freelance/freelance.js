// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLoader();
  initNavigation();
  initIntroAnimations();
  initDock();
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
  const resumeBtn = document.getElementById('resumeBtn');
  const socialBtns = document.querySelectorAll('.social-btn');

  homeBtn.addEventListener('click', () => {
    window.location.href = '../index.html';
  });

  resumeBtn.addEventListener('click', () => {
    window.open('../assets/Santhosh_Resume.jpg', '_blank');
  });

  socialBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const link = btn.getAttribute('data-link');
      if (link === 'linkedin') {
        window.open('https://www.linkedin.com/in/your-profile', '_blank');
      } else if (link === 'gmail') {
        window.location.href = 'mailto:your.email@gmail.com';
      } else if (link === 'whatsapp') {
        window.open('https://wa.me/your-number', '_blank');
      }
    });
  });
}

// ========================================
// INTRO ANIMATIONS
// ========================================
function initIntroAnimations() {
  gsap.from('.line1', {
    y: 60,
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out'
  });

  gsap.from('.line2', {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.intro-description', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1.1,
    ease: 'power3.out'
  });

  gsap.from('.intro-goal', {
    y: 40,
    opacity: 0,
    duration: 1,
    delay: 1.4,
    ease: 'power3.out'
  });
}

// ========================================
// DOCK
// ========================================
function initDock() {
  const themeGreen = document.getElementById('themeGreen');
  const themeMono = document.getElementById('themeMono');

  themeGreen.addEventListener('click', () => {
    applyTheme('green');
  });

  themeMono.addEventListener('click', () => {
    applyTheme('mono');
  });
}
