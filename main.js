// Enhanced session management for better UX
window.addEventListener("beforeunload", () => {
  // Only clear if it's actually closing the browser (not just navigating)
  if (performance.navigation.type === 1) {
    // Reload - Don't clear on refresh
    return;
  }
  // Clear flags when browser closes
  sessionStorage.removeItem("hasSeenLoader");
  sessionStorage.removeItem("hasSeenTypewriter");
  sessionStorage.removeItem("hasSeenAboutLoader");
});

// ===== SMOOTH SEQUENTIAL PORTFOLIO ANIMATION =====
// Global animation controller
const AnimationController = {
  isComplete: false,
  currentStep: 0,
  // Check if we should skip animations
  shouldSkipAnimations: () => {
    return (
      sessionStorage.getItem("hasSeenLoader") === "true" ||
      sessionStorage.getItem("hasSeenTypewriter") === "true"
    );
  },
  // Animation timing (in milliseconds)
  timings: {
    loaderComplete: 1200,
    logoAppear: 800,
    versionInfo: 600,
    visitorCounter: 400,
    terminal: 800,
    typewriterSpeed: 80,
    optionsDelay: 600,
    optionStagger: 200,
  },
};

// ===== LOADER ANIMATION =====
window.addEventListener("load", () => {
  const overlay = document.getElementById("loader-overlay");
  const bar = document.querySelector(".progress-bar");

  // Check if user is coming from internal pages (about/mentor)
  const isReturningFromInternalPage = sessionStorage.getItem("returningHome") === "true";

  if (isReturningFromInternalPage) {
    // Clear the flag
    sessionStorage.removeItem("returningHome");

    // Skip ALL animations for return visits from internal pages
    overlay.style.display = "none";
    document.body.style.overflow = "auto";

    // Immediately show everything without animations
    showEverythingInstantly();
    return;
  }

  // First visit - show loader animation
  sessionStorage.setItem("hasSeenLoader", "true");
  sessionStorage.setItem("hasSeenTypewriter", "true");

  // Hide main content initially
  document.body.style.overflow = "hidden";

  // Setup circle progress
  const radius = bar.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  bar.style.strokeDasharray = circumference;
  bar.style.strokeDashoffset = circumference;

  let progress = 0;
  const targetProgress = 100;

  // Smooth easing function
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function animateProgress() {
    if (!AnimationController.isComplete) {
      progress += 0.8;
      const easedProgress =
        easeOutCubic(Math.min(progress / targetProgress, 1)) * targetProgress;
      const offset = circumference * (1 - easedProgress / 100);
      bar.style.strokeDashoffset = offset;

      if (easedProgress >= 99.9) {
        AnimationController.isComplete = true;
        // Wait for full completion then start main sequence
        setTimeout(() => {
          startMainSequence();
        }, AnimationController.timings.loaderComplete);
      } else {
        requestAnimationFrame(animateProgress);
      }
    }
  }

  // Start loader animation
  setTimeout(() => {
    requestAnimationFrame(animateProgress);
  }, 300);
});

// ===== SMOOTH INSTANT SHOW (for return visits) =====
function showEverythingInstantly() {
  const mainContent = document.getElementById("main-content");
  const topLogo = document.getElementById("topLogo");
  const logoSvg = topLogo.querySelector(".header-logo-svg");
  const versionInfo = document.getElementById("versionInfo");
  const visitorCounter = document.getElementById("visitorCounter");
  const terminal = document.getElementById("terminal");
  const typewriter = document.getElementById("typewriter");
  const options = document.getElementById("options");
  const cards = options.querySelectorAll(".glass-card");

  // Show main content immediately
  mainContent.style.opacity = "1";
  mainContent.classList.add("show");

  // Show logo immediately
  topLogo.style.transition = "none";
  topLogo.classList.add("show");
  topLogo.style.opacity = "1";
  topLogo.style.transform = "translateX(-50%) translateY(0)";

  // Start logo animation
  setTimeout(() => {
    logoSvg.classList.add("animate");
  }, 100);

  // Show version info
  setupBootNoise();
  versionInfo.style.opacity = "1";
  versionInfo.classList.add("show");

  // Show visitor counter (Firebase will update the actual count)
  const visitorCountElement = document.getElementById("visitorCount");
  if (visitorCountElement.textContent === '--') {
    visitorCountElement.textContent = '...';
  }
  visitorCounter.style.transition = "none";
  visitorCounter.classList.add("show");
  visitorCounter.style.opacity = "1";
  visitorCounter.style.transform = "translateX(0)";

  // Show theme selector
  setTimeout(() => {
    const themeSelector = document.getElementById("themeSelector");
    if (themeSelector) {
      themeSelector.style.transition = "none";
      themeSelector.classList.add("show");
      themeSelector.style.opacity = "1";
      themeSelector.style.transform = "translateX(0)";
    }
  }, 300);

  // Show AI chat toggle
  setTimeout(() => {
    const aiChatToggle = document.getElementById("aiChatToggle");
    if (aiChatToggle) {
      // Remove inline style first
      aiChatToggle.removeAttribute("style");
      aiChatToggle.style.transition = "none";
      aiChatToggle.style.display = "flex";
      aiChatToggle.classList.add("show");
      aiChatToggle.style.opacity = "1";
      aiChatToggle.style.transform = "translateX(0)";
    }
  }, 400);

  // Re-enable transitions for smooth effects
  setTimeout(() => {
    topLogo.style.transition = "";
    visitorCounter.style.transition = "";
    const themeSelector = document.getElementById("themeSelector");
    const aiChatToggle = document.getElementById("aiChatToggle");
    if (themeSelector) {
      themeSelector.style.transition = "";
    }
    if (aiChatToggle) {
      aiChatToggle.style.transition = "";
      aiChatToggle.style.display = "";
    }
  }, 50);

  // SMOOTH SEQUENTIAL APPEARANCE OF TERMINAL AND OPTIONS
  // Delay terminal slightly for smooth entrance
  setTimeout(() => {
    // Show terminal with smooth animation
    terminal.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    terminal.classList.add("show");
    terminal.style.opacity = "1";
    terminal.style.transform = "translate(-50%, -45%) translateY(0)";

    // Fade in typewriter text smoothly
    typewriter.style.opacity = "0";
    typewriter.innerHTML = [
      "Initializing Santhosh Portfolio...",
      "> System online. All modules loaded.",
      "> Hello! May I know what you are looking for?",
    ].join("<br>");

    setTimeout(() => {
      typewriter.style.transition = "opacity 0.5s ease";
      typewriter.style.opacity = "1";
    }, 200);

    // Create preview section
    createPreviewSection();

    // Show options container after terminal
    setTimeout(() => {
      options.style.transition = "all 0.5s ease";
      options.classList.add("show");
      options.style.opacity = "1";
      options.style.visibility = "visible";

      // Animate cards sequentially with smooth stagger
      cards.forEach((card, index) => {
        // Initially hide cards
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

        // Stagger the appearance
        setTimeout(() => {
          card.classList.add("show");
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";

          // Add handlers after card appears
          if (!card.hasAttribute("data-handlers-added")) {
            card.setAttribute("data-handlers-added", "true");

            // Add click handler
            card.addEventListener("click", (e) => {
              const option = e.target.dataset.option;
              handleOptionClick(option);
            });

            // Add hover handlers for preview
            card.addEventListener("mouseenter", (e) => {
              const option = e.target.dataset.option;
              showPreview(option);
            });

            card.addEventListener("mouseleave", () => {
              hidePreview();
            });
          }
        }, index * 120); // 120ms stagger between cards
      });

      // Initialize welcome tag after all cards shown
      setTimeout(() => {
        initializeWelcomeTag();
      }, cards.length * 120 + 300);
    }, 500); // Options appear 500ms after terminal
  }, 300); // Terminal appears 300ms after page load

  // Mark animations as complete
  setTimeout(() => {
    AnimationController.isComplete = true;
  }, 2000);
}

// ===== MAIN ANIMATION SEQUENCE (for first visit) =====
function startMainSequence() {
  // Hide loader
  const overlay = document.getElementById("loader-overlay");
  const mainContent = document.getElementById("main-content");

  overlay.style.opacity = "0";
  overlay.style.visibility = "hidden";

  // Show main content container
  mainContent.classList.add("show");
  document.body.style.overflow = "auto";

  // Start the sequential animation
  setTimeout(() => {
    step1_ShowTopLogo();
  }, 200);
}

// Step 1: Show top logo with stroke animation
function step1_ShowTopLogo() {
  const topLogo = document.getElementById("topLogo");
  const logoSvg = topLogo.querySelector(".header-logo-svg");

  // Show logo container
  topLogo.classList.add("show");

  // Start stroke animation
  setTimeout(() => {
    logoSvg.classList.add("animate");
    // Move to next step after logo animation
    setTimeout(() => {
      step2_ShowVersionInfo();
    }, AnimationController.timings.logoAppear);
  }, 100);
}

// Step 2: Show version info
function step2_ShowVersionInfo() {
  const versionInfo = document.getElementById("versionInfo");

  // Setup boot noise content
  setupBootNoise();

  // Show version info
  versionInfo.classList.add("show");

  // Move to next step
  setTimeout(() => {
    step3_ShowVisitorCounter();
  }, AnimationController.timings.versionInfo);
}

// Step 3: Show visitor counter
function step3_ShowVisitorCounter() {
  const visitorCounter = document.getElementById("visitorCounter");

  // Firebase will update the count automatically
  // Initial placeholder will be replaced by real count
  const visitorCountElement = document.getElementById("visitorCount");
  if (visitorCountElement.textContent === '--') {
    visitorCountElement.textContent = '...';
  }

  // Show visitor counter
  visitorCounter.classList.add("show");

  // Show theme selector right after visitor counter
  setTimeout(() => {
    const themeSelector = document.getElementById("themeSelector");
    if (themeSelector) {
      themeSelector.classList.add("show");
    }
  }, 300);

  // Show AI chat toggle after theme selector
  setTimeout(() => {
    const aiChatToggle = document.getElementById("aiChatToggle");
    if (aiChatToggle) {
      // Remove inline style first
      aiChatToggle.removeAttribute("style");
      aiChatToggle.classList.add("show");
    }
  }, 500);

  // Move to next step - wait for AI toggle to appear before showing terminal
  setTimeout(() => {
    step4_ShowTerminal();
  }, 700); // Show terminal 200ms after AI toggle (700ms total from visitor counter)
}

// Step 4: Show terminal and start fade-up text
function step4_ShowTerminal() {
  const terminal = document.getElementById("terminal");

  // Show terminal container
  terminal.classList.add("show");

  // Start fade-up text after terminal appears
  setTimeout(() => {
    startFadeUpText();
  }, AnimationController.timings.terminal);
}

// ===== FADE-UP TEXT ANIMATION (Replaced Typewriter) =====
function startFadeUpText() {
  const typewriter = document.getElementById("typewriter");
  const options = document.getElementById("options");

  const bootLines = [
    "Initializing Santhosh Portfolio...",
    "> System online. All modules loaded.",
    "> Hello! May I know what you are looking for?",
  ];

  // Show all text with delayed fade-up animation (400ms between lines)
  typewriter.innerHTML = bootLines.map((line, index) =>
    `<div class="fade-line" style="animation-delay: ${index * 0.4}s">${line}</div>`
  ).join("");

  // Show options after text fades in
  setTimeout(() => {
    showOptions();
  }, bootLines.length * 400 + 500); // Stagger delay + buffer
}

// ===== OPTIONS ANIMATION =====
function showOptions() {
  const options = document.getElementById("options");
  const cards = options.querySelectorAll(".glass-card");
  
  createPreviewSection();
  options.classList.add("show");
  
  // Staggered spring animation for each card
  cards.forEach((card, index) => {
    // Initially hide the card
    card.style.opacity = "0";
    card.classList.remove("show");
    
    setTimeout(() => {
      // Add show class to trigger animation
      card.classList.add("show");
      
      // Add handlers only once
      if (!card.hasAttribute("data-handlers-added")) {
        card.setAttribute("data-handlers-added", "true");
        
        card.addEventListener("click", (e) => {
          const option = e.target.dataset.option;
          handleOptionClick(option);
        });
        
        card.addEventListener("mouseenter", (e) => {
          const option = e.target.dataset.option;
          showPreview(option);
        });
        
        card.addEventListener("mouseleave", () => {
          hidePreview();
        });
      }
    }, index * 150); // 150ms stagger
  });
  
  setTimeout(() => {
    initializeWelcomeTag();
  }, cards.length * 150 + 500);
}

// ===== UTILITY FUNCTIONS =====
// Setup boot noise with live updating info
function setupBootNoise() {
  const bootNoise = document.getElementById("bootNoise");

  const bootLines = [
    "v2.3.1 — Initializing...",
    "System Uptime: 00:00:00",
    "IP: 192.168.0.1",
    "Port: 5500",
    "Status: Stable",
    "Deploy: 2025-09-08 21:45",
    "Ping: 12ms",
    "Trace: OK",
  ];

  let uptimeSeconds = 0;

  function updateUptime() {
    uptimeSeconds++;
    const hrs = String(Math.floor(uptimeSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((uptimeSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const secs = String(uptimeSeconds % 60).padStart(2, "0");
    bootLines[1] = `System Uptime: ${hrs}:${mins}:${secs}`;
  }

  function flickerBoot() {
    updateUptime();
    const randomLines = bootLines
      .map((line) => {
        if (Math.random() < 0.15) {
          // Reduced flicker frequency
          return line.replace(/[A-Za-z0-9]/g, () =>
            String.fromCharCode(33 + Math.floor(Math.random() * 94))
          );
        }
        return line;
      })
      .join("\n");

    bootNoise.textContent = randomLines;
  }

  // Start boot noise updates
  setInterval(flickerBoot, 1200);
}

// Handle option clicks - Updated for about page navigation
function handleOptionClick(option) {
  // Add visual feedback
  const clickedCard = document.querySelector(`[data-option="${option}"]`);

  if (clickedCard) {
    // Store original styles
    const originalBg = clickedCard.style.background;
    const originalBorder = clickedCard.style.borderColor;

    // Get CSS variable values from computed styles
    const glowColor = getComputedStyle(document.body).getPropertyValue('--glow-color').trim();
    const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color').trim();

    // Apply click feedback
    clickedCard.style.background = glowColor;
    clickedCard.style.borderColor = primaryColor;
    clickedCard.style.transform = "translateY(-2px) scale(0.98)";

    // Reset after animation
    setTimeout(() => {
      clickedCard.style.background = originalBg;
      clickedCard.style.borderColor = originalBorder;
      clickedCard.style.transform = "";
    }, 200);
  }

  // Handle navigation
  switch (option) {
    case "hire":
      setTimeout(() => {
        window.location.href = "hire/hire.html";
      }, 300);
      break;
    case "freelance":
      setTimeout(() => {
        window.location.href = "freelance/freelance.html";
      }, 300);
      break;
    case "mentorship":
      setTimeout(() => {
        window.location.href = "mentor/mentor.html";
      }, 300);
      break;
    case "about":
      // Mark that we're navigating internally
      sessionStorage.setItem("navigatingFromPortfolio", "true");
      setTimeout(() => {
        window.location.href = "about/about.html?from=portfolio";
      }, 300);
      break;
    default:
      break;
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Smooth scroll prevention during loading
document.addEventListener(
  "wheel",
  (e) => {
    if (!AnimationController.isComplete) {
      e.preventDefault();
    }
  },
  { passive: false }
);

// ===== PET ANIMATION =====
const pet = document.getElementById("pet");
let mouseX = 0;
let mouseY = 0;
let petX = window.innerWidth / 2;
let petY = window.innerHeight / 2;
let isFollowing = false;
let followTimeout;
let trails = [];
let pathPoints = [];
let chargeSize = 6;
let charging = false;
let pressTimer;
let isBursting = false;

// Enhanced smooth animation with velocity-based movement
let petVX = 0;
let petVY = 0;
const FRICTION = 0.85;
const ACCELERATION = 0.15;

// Throttle mousemove for better performance
let lastMouseMoveTime = 0;
const MOUSE_MOVE_THROTTLE = 16; // ~60fps

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastMouseMoveTime < MOUSE_MOVE_THROTTLE) return;
  lastMouseMoveTime = now;

  mouseX = e.clientX;
  mouseY = e.clientY;

  if (!isFollowing && !isBursting) {
    isFollowing = true;
    pet.classList.add("following");
    pathPoints = [];
  }

  pathPoints.push({ x: mouseX, y: mouseY });
  if (pathPoints.length > 100) pathPoints.shift();

  clearTimeout(followTimeout);
  followTimeout = setTimeout(() => {
    if (!isBursting) {
      isFollowing = false;
      pet.classList.remove("following");
      pathPoints = [];
    }
  }, 3000);
});

function animatePet() {
  if (isFollowing && pathPoints.length > 0 && !isBursting) {
    const target = pathPoints[pathPoints.length - 1];

    // Smooth velocity-based movement
    const dx = target.x - petX;
    const dy = target.y - petY;

    // Apply acceleration towards target
    petVX += dx * ACCELERATION;
    petVY += dy * ACCELERATION;

    // Apply friction
    petVX *= FRICTION;
    petVY *= FRICTION;

    // Update position
    petX += petVX;
    petY += petVY;

    pet.style.setProperty("--mouse-x", petX + "px");
    pet.style.setProperty("--mouse-y", petY + "px");

    // Create smoother trail with velocity consideration
    if (Math.abs(petVX) > 0.5 || Math.abs(petVY) > 0.5) {
      createTrail(petX, petY);
    }
  }

  requestAnimationFrame(animatePet);
}

animatePet();

function createTrail(x, y) {
  const trail = document.createElement("div");
  trail.className = "trail";
  // Use cssText for batched style updates (better performance)
  trail.style.cssText = `
    transform: translate(${x - 1.5}px, ${y - 1.5}px);
    opacity: 1;
    transition: opacity 1.2s ease-out;
    filter: blur(1px);
  `;

  document.body.appendChild(trail);
  trails.push(trail);

  setTimeout(() => {
    trail.style.opacity = "0";
    setTimeout(() => {
      trail.remove();
      trails = trails.filter((t) => t !== trail);
    }, 1200);
  }, 100);

  // Limit trail count for performance
  if (trails.length > 40) {
    const oldTrail = trails.shift();
    if (oldTrail.parentNode) oldTrail.parentNode.removeChild(oldTrail);
  }
}

// Enhanced burst particles with smoother animation
const particleContainer = document.getElementById("particle-container");
let burstParticles = [];

function createBurstParticles(x, y) {
  isBursting = true;

  // Hide main pet smoothly
  pet.classList.remove("following", "burst");
  pet.style.transition = "opacity 0.2s ease-out";
  pet.style.opacity = "0";

  // Create heart-shaped particle burst
  const numParticles = 20;
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.background = "#00ff00";
    particle.style.borderRadius = "50%";
    particle.style.boxShadow = "0 0 8px #00ff00";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9998";
    particle.style.opacity = "1";

    // Heart shape using parametric equations
    const t = (i / numParticles) * 2 * Math.PI;
    const scale = 3;

    // Parametric heart equations
    const heartX = scale * 16 * Math.pow(Math.sin(t), 3);
    const heartY = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    const finalX = x + heartX;
    const finalY = y + heartY;

    burstParticles.push({
      element: particle,
      startX: x,
      startY: y,
      finalX: finalX,
      finalY: finalY,
    });

    document.body.appendChild(particle);

    // Smooth burst animation with staggered timing
    particle.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    setTimeout(() => {
      particle.style.left = `${finalX}px`;
      particle.style.top = `${finalY}px`;
      particle.style.opacity = "1";
    }, 50 + i * 20);
  }

  // Start rejoining after burst
  setTimeout(() => {
    rejoinParticles(x, y);
  }, 1200);
}

function rejoinParticles(centerX, centerY) {
  burstParticles.forEach((particleData, index) => {
    setTimeout(() => {
      particleData.element.style.transition =
        "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
      particleData.element.style.left = `${centerX}px`;
      particleData.element.style.top = `${centerY}px`;
      particleData.element.style.opacity = "1";
      particleData.element.style.transform = "scale(1.2)";

      // Shrink back to normal
      setTimeout(() => {
        particleData.element.style.transform = "scale(1)";
      }, 200);
    }, index * 40);
  });

  // Clean up and restore main pet
  setTimeout(() => {
    burstParticles.forEach((particleData) => {
      particleData.element.remove();
    });
    burstParticles = [];

    // Restore main pet smoothly
    petX = centerX;
    petY = centerY;
    petVX = 0;
    petVY = 0;
    pet.style.setProperty("--mouse-x", petX + "px");
    pet.style.setProperty("--mouse-y", petY + "px");
    pet.style.opacity = "1";
    pet.style.transition = "opacity 0.3s ease-in";
    isBursting = false;

    // Resume following if cursor is still active
    if (pathPoints.length > 0) {
      pet.classList.add("following");
    }
  }, 1400);
}

// Enhanced charging animation
document.addEventListener("mousedown", () => {
  // Skip burst effect in pixel theme
  if (document.body.classList.contains("theme-mono")) return;
  if (!isFollowing || isBursting) return;

  charging = true;
  let chargeStartTime = Date.now();

  pressTimer = setTimeout(() => {
    createBurstParticles(petX, petY);
    chargeSize = 6;
    pet.style.setProperty("--charge-size", chargeSize + "px");
  }, 500);

  // Smooth growing effect
  function grow() {
    if (charging && chargeSize < 20 && !isBursting) {
      const elapsed = Date.now() - chargeStartTime;
      const progress = Math.min(elapsed / 500, 1);
      chargeSize = 6 + 14 * Math.sin(progress * Math.PI * 0.5);
      pet.style.setProperty("--charge-size", chargeSize + "px");
      requestAnimationFrame(grow);
    }
  }
  grow();
});

document.addEventListener("mouseup", () => {
  // Skip in pixel theme
  if (document.body.classList.contains("theme-mono")) return;

  charging = false;
  chargeSize = 6;
  pet.style.setProperty("--charge-size", chargeSize + "px");
  clearTimeout(pressTimer);
});

// ================ Preview content data ===========================
const PreviewContent = {
  hire: {
    subtitle: "Preview",
    title: "LOOKING TO HIRE?",
    status: "Actively Seeking",
    stats: [
      { number: "4", label: "Case Studies" },
      { number: "5+", label: "Experience" },
      { number: "3", label: "Companies Worked" },
    ],
    clients: [
      "Nebraska Furniture Mart (Canada)",
      "Troubadour (UK)",
      "HNDSM (UK)",
      "Jio Mart (India)",
      "Urban Company (India)",
      "House of Candy (India)",
    ],
  },
  mentorship: {
    subtitle: "Preview",
    title: "SEEKING MENTORSHIP!",
    status: "Ready to Guide",
    stats: [
      { number: "3+", label: "Years Mentoring" },
      { number: "50+", label: "Students Trained" },
      { number: "20+", label: "Students Placed" },
    ],
    clients: [
      "UX/UI Methods",
      "Figma & AI Tools",
      "HTML/CSS/JS",
      "Graphic Design",
      "Portfolio Building",
      "Resume Preparation",
      "Job Placement",
    ],
  },
  freelance: {
    subtitle: "Preview",
    title: "FREELANCING REQUEST*",
    status: "Available Now",
    stats: [
      { number: "4.5/5", label: "Client Rating" },
      { number: "2+", label: "Years Experience" },
      { number: "100%", label: "Client Satisfaction" },
    ],
    clients: [
      "UX/UI (Website & App)",
      "B2B SaaS Dashboard",
      "Logo Design",
      "Poster Design",
      "Brochure Design",
      "Business Cards",
    ],
  },
  about: {
    subtitle: "Preview",
    title: "ABOUT ME~",
    status: "UX Designer | Mentor",
    stats: [
      { number: "5+", label: "Workshops Conducted" },
      { number: "1", label: "Design Community" },
      { number: "3", label: "International Clients" },
    ],
    clients: [
      "User Research",
      "IA & User Flow",
      "Figma Mastery & Manage Design System",
      "HTML, CSS & JS",
      "Leadership",
      "Problem Solver",
      "Client Communication",
    ],
  },
};

// Create preview section in HTML
function createPreviewSection() {
  const terminal = document.querySelector(".terminal-content");

  // Check if preview section already exists
  if (document.getElementById("previewSection")) {
    return;
  }

  const previewHTML = `
    <div class="welcome-tag">Welcome Aboard User!</div>
    <div class="preview-section" id="previewSection">
      <div class="preview-card" id="previewCard">
        <!-- Content will be dynamically updated -->
      </div>
    </div>
  `;

  terminal.insertAdjacentHTML("beforeend", previewHTML);
}

// Update preview content
function updatePreviewContent(option) {
  const previewCard = document.getElementById("previewCard");
  const content = PreviewContent[option];

  if (!content) return;

  const statsHTML = content.stats
    .map(
      (stat) => `
      <div class="preview-stat">
        <span class="preview-stat-number">${stat.number}</span>
        <div class="preview-stat-label">${stat.label}</div>
      </div>
    `
    )
    .join("");

  const clientsHTML = content.clients
    .map(
      (client) => `
      <span class="preview-tag">${client}</span>
    `
    )
    .join("");

  previewCard.innerHTML = `
    <div class="preview-subtitle">${content.subtitle}</div>
    <div class="preview-header">
      <div class="preview-title">${content.title}</div>
      <div class="preview-status">
        <div class="status-dot"></div>
        ${content.status}
      </div>
    </div>
    <div class="preview-content">
      ${statsHTML}
    </div>
    <div class="preview-clients">
      <div class="preview-clients-title">${
        option === "mentorship"
          ? "Learning Outcomes"
          : option === "freelance"
          ? "Project Types"
          : option === "about"
          ? "Skills"
          : "Clients"
      }</div>
      ${clientsHTML}
    </div>
  `;

  // Jackpot roll effect for stats
  const statEls = previewCard.querySelectorAll(".preview-stat-number");
  statEls.forEach((el, i) => {
    const final = el.textContent;
    const isNumeric = /^[\d.]+/.test(final);
    const cleanFinal = parseFloat(final);

    if (!isNumeric) return;

    let frame = 0;
    const totalFrames = 20;
    const roll = setInterval(() => {
      const random = Math.floor(Math.random() * cleanFinal * 1.5);
      el.textContent = random + final.replace(/[\d.]/g, "");
      frame++;
      if (frame >= totalFrames) {
        clearInterval(roll);
        el.textContent = final;
      }
    }, 25 + i * 8);
  });
}

// Show preview content
function showPreview(option) {
  const previewSection = document.getElementById("previewSection");
  if (!previewSection) return;

  updatePreviewContent(option);

  // Use requestAnimationFrame for smoother animation
  requestAnimationFrame(() => {
    previewSection.classList.add("show");
  });
}

// Hide preview section
function hidePreview() {
  const previewSection = document.getElementById("previewSection");
  if (!previewSection) return;

  previewSection.classList.remove("show");
}

// =================== Welcome Tag ====================
let welcomeTag;
let idleTimeout;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseIdleTime = 0;

function initializeWelcomeTag() {
  welcomeTag = document.querySelector(".welcome-tag");
  if (!welcomeTag) return;

  // Hover messages for each option
  const hoverMessages = {
    hire: "Hey Hiring Manager 👋 Click to explore my case studies!",
    freelance:
      "Hey Client 💼 Wanna get your app/website ready? Click to know more!",
    mentorship:
      "Hey Future Designer 🎓 Ready to learn UX/UI? Click to dive in!",
    about:
      "Curious about me? 🤔 Click to see my education, experience & skills!",
  };

  let isHoveringCard = false;
  let isHoveringOptions = false;

  // Helper function to hide pet and trails
  function hidePetAndTrails() {
    const pet = document.getElementById("pet");
    if (pet) pet.style.opacity = "0";

    // Hide all existing trails
    document.querySelectorAll(".trail").forEach((trail) => {
      trail.remove();
    });
  }

  // Helper function to show pet
  function showPet() {
    const pet = document.getElementById("pet");
    if (pet) pet.style.opacity = "1";
  }

  // Add hover listeners to cards
  document.querySelectorAll(".glass-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      isHoveringCard = true;
      isHoveringOptions = true;
      const option = card.dataset.option;
      if (hoverMessages[option]) {
        updateWelcomeMessage(hoverMessages[option]);
      }

      // Show preview on hover
      showPreview(option);

      // Hide perimeter loader and all trails
      hidePetAndTrails();

      // Blur console when hovering buttons
      const aiConsole = document.getElementById("ai-console");
      if (aiConsole) {
        aiConsole.classList.add("blur-effect");
      }
    });

    card.addEventListener("mouseleave", () => {
      isHoveringCard = false;
      isHoveringOptions = false;

      // Hide preview on mouse leave
      hidePreview();

      setTimeout(() => {
        if (!isHoveringCard) {
          updateWelcomeMessage("Welcome Aboard User!");
        }
      }, 500);

      // Show perimeter loader again
      showPet();

      // Remove blur from console
      const aiConsole = document.getElementById("ai-console");
      if (aiConsole) {
        aiConsole.classList.remove("blur-effect");
      }
    });
  });

  // Add hover listeners to theme selector
  const themeSelector = document.getElementById("themeSelector");
  if (themeSelector) {
    themeSelector.addEventListener("mouseenter", hidePetAndTrails);
    themeSelector.addEventListener("mouseleave", showPet);
  }

  // Add hover listeners to visitor counter
  const visitorCounter = document.getElementById("visitorCounter");
  if (visitorCounter) {
    visitorCounter.addEventListener("mouseenter", hidePetAndTrails);
    visitorCounter.addEventListener("mouseleave", showPet);
  }

  // Add hover listeners to AI chat toggle
  const aiChatToggle = document.getElementById("aiChatToggle");
  if (aiChatToggle) {
    aiChatToggle.addEventListener("mouseenter", hidePetAndTrails);
    aiChatToggle.addEventListener("mouseleave", showPet);
  }

  // Mouse movement tracking - only reset on significant movement
  document.addEventListener("mousemove", (e) => {
    const dx = Math.abs(e.clientX - lastMouseX);
    const dy = Math.abs(e.clientY - lastMouseY);

    // Only reset timer if there's significant movement (more than 5px)
    if (dx > 5 || dy > 5) {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      // Reset idle timer
      clearTimeout(idleTimeout);
      mouseIdleTime = 0;

      // Start idle timer
      startIdleTimer();
    }
  });

  // Also reset on clicks and key presses
  document.addEventListener("click", () => {
    clearTimeout(idleTimeout);
    startIdleTimer();
  });

  document.addEventListener("keydown", () => {
    clearTimeout(idleTimeout);
    startIdleTimer();
  });

  // Start idle timer initially
  startIdleTimer();

  // Start periodic hint for green theme only
  startPeriodicHint();
}

function startIdleTimer() {
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    updateWelcomeMessage("Select something to explore me");

    // Return to welcome after showing idle message
    setTimeout(() => {
      updateWelcomeMessage("Welcome Aboard User!");
    }, 4000);
  }, 10000); // 10 seconds idle
}

// Periodic hint for green theme - first at 5s, then every 25s
let periodicHintTimeout;
let periodicHintInterval;
function startPeriodicHint() {
  // Clear any existing timeout/interval
  if (periodicHintTimeout) clearTimeout(periodicHintTimeout);
  if (periodicHintInterval) clearInterval(periodicHintInterval);

  // Show first message at 5 seconds
  periodicHintTimeout = setTimeout(() => {
    if (!document.body.classList.contains("theme-mono")) {
      updateWelcomeMessage("Long press anywhere to see a surprise ❤️");
      setTimeout(() => {
        updateWelcomeMessage("Welcome Aboard User!");
      }, 3000);
    }

    // Then show every 25 seconds
    periodicHintInterval = setInterval(() => {
      if (!document.body.classList.contains("theme-mono")) {
        updateWelcomeMessage("Long press anywhere to see a surprise ❤️");
        setTimeout(() => {
          updateWelcomeMessage("Welcome Aboard User!");
        }, 3000);
      }
    }, 25000); // Every 25 seconds
  }, 5000); // First time at 5 seconds
}

function updateWelcomeMessage(message) {
  if (!welcomeTag) return;

  // Smooth transition effect
  welcomeTag.style.opacity = "0";
  welcomeTag.style.transform = "translateX(-50%) scale(0.9)";

  setTimeout(() => {
    welcomeTag.textContent = message;
    welcomeTag.style.opacity = "1";
    welcomeTag.style.transform = "translateX(-50%) scale(1)";
  }, 150);
}

// =================== Theme Switcher ====================
function initializeThemeSwitcher() {
  const customDropdown = document.getElementById("customDropdown");
  const dropdownTrigger = document.getElementById("dropdownTrigger");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  if (!customDropdown || !dropdownTrigger || !dropdownMenu) return;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("portfolioTheme") || "green";
  applyTheme(savedTheme);
  updateActiveItem(savedTheme);

  // Toggle dropdown
  dropdownTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    customDropdown.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!customDropdown.contains(e.target)) {
      customDropdown.classList.remove("active");
    }
  });

  // Handle theme selection
  dropdownItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedTheme = item.getAttribute("data-theme");
      applyTheme(selectedTheme);
      updateActiveItem(selectedTheme);
      localStorage.setItem("portfolioTheme", selectedTheme);
      customDropdown.classList.remove("active");
    });
  });
}

function updateActiveItem(theme) {
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach(item => {
    if (item.getAttribute("data-theme") === theme) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// ===== MATRIX RAIN EFFECT FOR PIXEL THEME =====
const MatrixRain = {
  canvas: null,
  ctx: null,
  drops: [],
  fontSize: 14,
  columns: 0,
  animationId: null,
  isRunning: false,

  init() {
    this.canvas = document.getElementById("matrix-rain");
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());
  },

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(this.columns).fill(1);
  },

  start() {
    if (this.isRunning) return;
    if (!this.canvas || !this.ctx) {
      console.warn("Matrix rain canvas not initialized");
      return;
    }
    this.isRunning = true;
    this.animate();
  },

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isRunning = false;
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  },

  animate() {
    if (!this.isRunning || !this.ctx || !this.canvas) return;

    // Black background with higher transparency for faster fade (less trail)
    this.ctx.fillStyle = "rgba(15, 15, 15, 0.1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // White pixel characters
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      // Random characters (binary, letters, numbers for pixel/matrix feel)
      const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
      const text = chars[Math.floor(Math.random() * chars.length)];

      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      this.ctx.fillText(text, x, y);

      // Reset drop to top randomly
      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
};

function applyTheme(theme) {
  // Remove all theme classes
  document.body.classList.remove("theme-green", "theme-mono");

  // Add selected theme class (green is default, no class needed)
  if (theme !== "green") {
    document.body.classList.add(`theme-${theme}`);
  }

  // Update color indicator
  const indicator = document.getElementById("themeColorIndicator");
  if (indicator) {
    // Define theme colors
    const themeColors = {
      green: "#0cc060",
      mono: "#ffffff"
    };
    indicator.style.background = themeColors[theme] || themeColors.green;
  }

  // Control matrix rain based on theme
  if (theme === "mono") {
    // Ensure matrix rain is initialized before starting
    if (!MatrixRain.canvas) {
      MatrixRain.init();
    }
    MatrixRain.start();
  } else {
    MatrixRain.stop();
  }
}

// Initialize both theme switcher and matrix rain when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    MatrixRain.init();
    initializeThemeSwitcher();
  });
} else {
  MatrixRain.init();
  initializeThemeSwitcher();
}

// ===== AI CONSOLE SYSTEM =====
const AIConsole = {
  isTyping: false,
  hasMessages: false,
  state: 'minimized', // 'minimized', 'expanded', 'closed'
  isEnabled: false, // Chat must be enabled first
  currentTagSet: 0, // Track which tag set is showing

  // Tag sets that rotate after each click
  tagSets: [
    // Set 1: Initial professional queries
    [
      { label: 'Experience', query: 'Tell me about your work experience' },
      { label: 'Skills', query: 'What skills and tools do you use' },
      { label: 'Challenges', query: 'What challenges have you faced in projects' },
      { label: 'Education', query: 'Tell me about your education background' }
    ],
    // Set 2: Mentorship & Contact
    [
      { label: 'Mentorship', query: 'How do you mentor students' },
      { label: 'Placements', query: 'How many students have you placed' },
      { label: 'Contact', query: 'How can I contact you' },
      { label: 'Resume', query: 'Can I see your resume' }
    ],
    // Set 3: Projects & Portfolio
    [
      { label: 'Projects', query: 'Tell me about your key projects' },
      { label: 'LinkedIn', query: 'What is your LinkedIn profile' },
      { label: 'Achievements', query: 'What are your achievements' },
      { label: 'Freelance', query: 'Are you available for freelance work' }
    ],
    // Set 4: Deep dive
    [
      { label: 'Work Style', query: 'How do you approach design problems' },
      { label: 'Companies', query: 'Which companies have you worked with' },
      { label: 'Success Rate', query: 'What is your mentorship success rate' },
      { label: 'Goals', query: 'What are your future goals' }
    ]
  ],

  // Comprehensive Knowledge Base
  knowledge: {
    // Greetings
    greeting: {
      keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
      responses: [
        "Hey there! 👋 I'm here to tell you about Santhosh. What would you like to know?",
        "Hello! 👋 Ask me anything about Santhosh's work, experience, or skills!",
        "Hi! 👋 I'm Santhosh's AI assistant. Feel free to ask me anything!"
      ]
    },
    // Personal & Contact
    personal: {
      keywords: ['name', 'who', 'contact', 'email', 'phone', 'linkedin', 'location', 'where'],
      response: "I'm Santhosh, a UX/UI Designer based in Chennai, India. You can reach me at [email protected], WhatsApp: +91 99412 92729, or connect on LinkedIn: linkedin.com/in/santhosh-designer"
    },

    // Education
    education: {
      keywords: ['education', 'degree', 'college', 'university', 'study', 'studied', 'graduate', 'school'],
      response: "I have a Bachelor of Technology in Information Technology (B.Tech IT) from Loyola-ICAM College of Engineering and Technology, Chennai, affiliated to Anna University (2016-2020). I won first place in a design challenge by CSI (Computer Society of India), demonstrated projects like Pill Sorting Machine and Voice-Recognised Home appliances, and led my Final Year Project: Head Control Wheelchair. I'm also certified in Advanced UX/UI Design from Aspira Design, Chennai (Apr 2022 - Aug 2022)."
    },

    // Experience Overview
    experience: {
      keywords: ['experience', 'work', 'worked', 'career', 'companies', 'years', 'background'],
      response: "I have 5+ years of UX/UI design experience across 3 companies:\n\n• Currently at Parla Retail (UK, Remote) since May 2024\n• Intellemo.AI (Gurugram) - Oct 2022 to Apr 2024\n• Iconic Dream Focus (Chennai) - Aug 2020 to Oct 2022\n\nI've worked with clients from UK, US, and Canada, delivering impactful design solutions!"
    },

    // Current Role
    currentRole: {
      keywords: ['current', 'now', 'present', 'parla'],
      response: "Currently, I'm a UX/UI Designer at Parla Retail (UK-based, remote). I've designed their omnichannel CTA system, Show & Sell platform with video commerce, and revamped their sales dashboard. Working with clients like Nebraska Furniture Mart, Troubadour, and HNDSM!"
    },

    // Skills
    skills: {
      keywords: ['skills', 'tools', 'figma', 'design', 'what can you', 'technologies', 'software'],
      response: "My core skills include:\n\n🎨 Design: Figma (primary), Adobe Suite, Framer, Miro\n💡 UX: Research, User Personas, Information Architecture, Usability Testing\n💻 Technical: HTML, CSS, JavaScript\n🧠 Soft Skills: Leadership, Client Communication, Team Collaboration\n\nI focus on creating scalable design systems and AI-powered workflows!"
    },

    // Projects & Challenges
    projects: {
      keywords: ['project', 'challenge', 'problem', 'faced', 'difficult', 'solved', 'issue'],
      response: "Some key challenges I've tackled:\n\n• Scaled app downloads from 1K to 10K+ through UX improvements at Intellemo.AI\n• Achieved 25% increase in client engagement through UI architecture redesign\n• Optimized billing & subscription models to boost revenue\n• Led HyU social app from concept to launch (became company flagship)\n• Won 1st place for TN Government Vandaloor Zoo redesign\n\nI love solving complex UX problems with data-driven design!"
    },

    // Mentorship
    mentorship: {
      keywords: ['mentor', 'teach', 'training', 'students', 'learn', 'course'],
      response: "I'm passionate about mentoring! I've been a UX Design Mentor since 2024:\n\n✨ Mentored 70+ aspiring designers\n🎯 25+ successful job placements\n💯 100% student satisfaction\n📚 4-month comprehensive program\n\nI've worked with SpaceZee, Guvi, and currently FITA Academy, teaching modern UX with AI tools integration!"
    },

    // Achievements
    achievements: {
      keywords: ['achievement', 'accomplishment', 'success', 'award', 'recognition'],
      response: "Some proud achievements:\n\n🚀 Scaled app from 1K to 10K+ downloads\n📈 25% faster delivery with agile design methods\n🎨 HyU app became company flagship product\n🏆 1st place for Vandaloor Zoo UX redesign\n👥 25+ mentees placed in industry roles\n🌍 Worked with international clients (UK, US, Canada)"
    },

    // Why Hire
    hire: {
      keywords: ['hire', 'why', 'unique', 'stand out', 'different', 'benefit'],
      response: "Why work with me?\n\n• 5+ years experience with proven impact\n• Increased client engagement by 25%\n• Expertise in scalable design systems\n• Strong developer collaboration skills\n• International client experience (UK, US, Canada)\n• Agile methodology expert\n• Mentored 70+ designers successfully\n\nI deliver design solutions that make a real business impact!"
    },

    // Freelance
    freelance: {
      keywords: ['freelance', 'available', 'hire', 'rate', 'cost', 'client'],
      response: "Yes, I'm available for freelance projects! I have:\n\n⭐ 4.5/5 client rating\n💼 2+ years freelance experience  \n✅ 100% client satisfaction\n🌍 3 international clients\n\nI specialize in UX/UI design, design systems, and AI-powered workflows. Let's discuss your project!"
    },

    // Goals & Vision
    vision: {
      keywords: ['goal', 'future', 'vision', 'want', 'looking', 'seeking', 'next'],
      response: "I'm seeking opportunities in design agencies to:\n\n🎯 Explore diverse design challenges\n🏗️ Build scalable design systems\n🤖 Innovate with AI-powered workflows\n💫 See my interfaces used, loved, and making a difference for real people\n\nI want to push the boundaries of what's possible in UX/UI!"
    },

    // Specific Companies/Projects
    intellemo: {
      keywords: ['intellemo', 'ai ad', 'billing'],
      response: "At Intellemo.AI (Oct 2022 - Apr 2024), I:\n\n• Led UI architecture redesign → 25% increase in engagement\n• Optimized billing & subscription model → boosted revenue\n• Scaled app from 1K to 10K+ downloads\n• Worked with Urban Company, Fabrento, House of Candy\n\nFocus was on AI ad campaigns and small business solutions!"
    },

    iconic: {
      keywords: ['iconic', 'hyu', 'vandalur', 'zoo', 'drmurs'],
      response: "At Iconic Dream Focus (Aug 2020 - Oct 2022), I:\n\n• Implemented agile design → 25% faster delivery\n• Created HyU social app (became company flagship!)\n• Won 1st place for Vandaloor Zoo UX redesign\n• Launched DRMURS app\n• Started as Software Developer Intern, built company website"
    },

    // Mentorship (from mentor page analysis)
    mentorshipProgram: {
      keywords: ['mentor', 'mentorship', 'program', 'course', 'training', 'teach', 'workshop'],
      response: "I run a comprehensive UX/UI Design Mentorship Program:\n\n🎯 Program Highlights:\n• 3-4 month intensive program\n• 70+ students mentored\n• 25+ successful job placements\n• 100% student satisfaction\n\n📚 What You'll Learn:\n• UX Research & User Personas\n• Information Architecture\n• Figma & AI tools integration\n• Portfolio building from scratch\n• Resume preparation\n• Job placement support\n\n💼 My approach: Hands-on learning with real-world projects. You'll leave job-ready with a standout portfolio!"
    },

    // Placements
    placements: {
      keywords: ['placement', 'placed', 'job', 'students placed', 'success'],
      response: "My mentorship success speaks for itself:\n\n✨ 25+ students successfully placed in design roles\n📈 70+ total students mentored\n💯 100% student satisfaction rate\n🎓 3-4 month program from beginner to job-ready\n\n🏆 Success Stories:\n• Students placed at startups and agencies\n• Portfolio transformation from zero to hired\n• Resume and interview prep included\n• Continuous support until placement\n\nI don't just teach design—I help you land your dream job!"
    },

    // Contact
    contact: {
      keywords: ['contact', 'reach', 'email', 'phone', 'whatsapp', 'message', 'connect'],
      response: "Let's connect! Here's how you can reach me:\n\n📧 Email: [email protected]\n📱 WhatsApp: +91 99412 92729\n💼 LinkedIn: linkedin.com/in/santhosh-designer\n\nFeel free to reach out for:\n• Job opportunities\n• Freelance projects\n• Mentorship inquiries\n• Collaboration\n\nI typically respond within 24 hours!"
    },

    // Resume
    resume: {
      keywords: ['resume', 'cv', 'download', 'portfolio pdf'],
      response: "You can download my resume from the About page!\n\n📄 My resume includes:\n• 5+ years of UX/UI experience\n• Work at Parla Retail, Intellemo.AI, Iconic Dream Focus\n• International client work (UK, US, Canada)\n• Mentorship achievements\n• Skills & tools\n• Education from College of Engineering, Chennai\n\n💡 Tip: Check out the About page for the download button in the navigation!"
    },

    // Work style
    workStyle: {
      keywords: ['approach', 'methodology', 'work style', 'process', 'how do you'],
      response: "My design approach is user-first and data-driven:\n\n🎯 My Process:\n1. Research & understand the problem\n2. Define user personas & pain points\n3. Information architecture & user flows\n4. Wireframes & prototypes\n5. Usability testing & iteration\n6. High-fidelity designs\n7. Developer handoff & QA\n\n💡 My Strengths:\n• Agile methodology (25% faster delivery)\n• Scalable design systems\n• Strong developer collaboration\n• AI-powered workflow optimization\n• Client communication\n\nI believe great design solves real problems with measurable impact!"
    },

    // Companies worked with
    companies: {
      keywords: ['companies', 'clients', 'worked with', 'brands'],
      response: "I've worked with diverse clients across industries:\n\n🌍 International Clients:\n• Nebraska Furniture Mart (Canada)\n• Troubadour (UK)\n• HNDSM (UK)\n\n🇮🇳 Indian Clients:\n• Jio Mart\n• Urban Company\n• House of Candy\n• Fabrento\n\n🏢 Full-time Companies:\n• Parla Retail (UK, Remote) - Current\n• Intellemo.AI (Gurugram)\n• Iconic Dream Focus (Chennai)\n\nFrom startups to established brands, I deliver impactful design solutions!"
    },

    // Success rate
    successRate: {
      keywords: ['success rate', 'statistics', 'numbers', 'metrics'],
      response: "Let me share some numbers:\n\n📊 Work Impact:\n• 25% increase in client engagement (Intellemo.AI)\n• Scaled app from 1K to 10K+ downloads\n• 25% faster delivery with agile methods\n• HyU app became company flagship\n\n🎓 Mentorship Impact:\n• 70+ students mentored\n• 25+ successful job placements\n• 100% student satisfaction\n• 3-4 month transformation time\n\n🏆 Recognition:\n• 1st place for Vandaloor Zoo UX redesign\n• 4.5/5 freelance client rating\n• International client portfolio (UK, US, Canada)\n\nData-driven results that make a difference!"
    },

    // Default fallback
    default: {
      keywords: [],
      response: "That's an interesting question! I'm here to tell you about Santhosh's experience, skills, education, and projects. Try asking about:\n\n• His work experience\n• Skills and tools he uses\n• Education background\n• Project challenges he faced\n• Mentorship programs\n• Why he's a great hire\n\nWhat would you like to know?"
    }
  },

  // Get AI response from Groq API
  async getAIResponse(userMessage) {
    try {
      console.log('Calling Groq API with message:', userMessage);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received AI response:', data.reply);
      return data.reply;
    } catch (error) {
      console.error('Error calling AI API:', error);
      // Fallback to keyword matching if API fails
      return this.findResponseFallback(userMessage);
    }
  },

  // Fallback keyword matching (used if API fails)
  findResponseFallback(userMessage) {
    const message = userMessage.toLowerCase().trim();

    // Check for greeting first
    if (this.knowledge.greeting.keywords.some(keyword => message.includes(keyword))) {
      const responses = this.knowledge.greeting.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }

    let bestMatch = null;
    let maxMatches = 0;

    // Check each knowledge category
    for (const [key, data] of Object.entries(this.knowledge)) {
      if (key === 'default' || key === 'greeting') continue;

      const matchCount = data.keywords.filter(keyword =>
        message.includes(keyword.toLowerCase())
      ).length;

      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatch = data;
      }
    }

    // Return best match or default
    return bestMatch ? bestMatch.response : this.knowledge.default.response;
  },

  // Parse text and create clickable links
  parseLinks(text) {
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-z]{2,}\/[^\s]*|linkedin\.com\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;

    return text.replace(urlRegex, (url) => {
      let href = url;
      // Add https if missing
      if (!url.startsWith('http') && !url.startsWith('mailto:')) {
        if (url.includes('@')) {
          href = 'mailto:' + url;
        } else {
          href = 'https://' + url;
        }
      }
      return `<a href="${href}" class="console-link" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  },

  // Typewriter effect
  async typewriterEffect(element, text) {
    const parsedText = this.parseLinks(text);
    element.innerHTML = '';

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = parsedText;

    const nodes = Array.from(tempDiv.childNodes);

    for (const node of nodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        // Type text character by character
        for (const char of node.textContent) {
          element.innerHTML += char;
          await new Promise(resolve => setTimeout(resolve, 15)); // Typing speed
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Add link elements directly
        element.appendChild(node.cloneNode(true));
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  },

  // Add console line
  async addConsoleLine(content, type = 'bot') {
    if (this.isTyping) return;

    const messagesContainer = document.getElementById('console-messages');
    const line = document.createElement('div');
    line.className = `console-line ${type}`;

    const prefix = document.createElement('div');
    prefix.className = 'console-line-prefix';
    prefix.textContent = type === 'user' ? '>' : '←';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'console-line-content';

    line.appendChild(prefix);
    line.appendChild(contentDiv);
    messagesContainer.appendChild(line);

    if (type === 'bot') {
      this.isTyping = true;
      await this.typewriterEffect(contentDiv, content);
      this.isTyping = false;
    } else {
      contentDiv.textContent = content;
    }

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  },

  // Show typing indicator
  showTypingIndicator() {
    const messagesContainer = document.getElementById('console-messages');
    const line = document.createElement('div');
    line.className = 'console-line bot typing-indicator-line';
    line.id = 'typing-indicator';

    const prefix = document.createElement('div');
    prefix.className = 'console-line-prefix';
    prefix.textContent = '←';

    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';

    line.appendChild(prefix);
    line.appendChild(indicator);
    messagesContainer.appendChild(line);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  },

  // Remove typing indicator
  removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  },

  // Handle user input
  async handleUserMessage(message) {
    console.log('handleUserMessage called with:', message);
    console.log('isTyping:', this.isTyping, 'hasMessages:', this.hasMessages);

    if (!message.trim()) {
      console.log('Empty message, returning');
      return;
    }

    if (this.isTyping) {
      console.log('Already typing, returning');
      return;
    }

    // Show header and messages area on first message
    if (!this.hasMessages) {
      console.log('First message - showing header and messages');
      this.hasMessages = true;
      this.showHeaderAndMessages();
    }

    console.log('Adding user message to console');
    // Add user message
    await this.addConsoleLine(message, 'user');

    console.log('Showing typing indicator');
    // Show typing indicator
    this.showTypingIndicator();

    // Get AI response from Groq API
    console.log('Getting AI response for:', message);
    const response = await this.getAIResponse(message);
    console.log('Got response:', response.substring(0, 50) + '...');

    console.log('Removing typing indicator');
    // Remove typing indicator
    this.removeTypingIndicator();

    console.log('Adding bot response to console');
    await this.addConsoleLine(response, 'bot');

    // Clear input
    const input = document.getElementById('console-input');
    if (input) {
      input.value = '';
      console.log('Input cleared');
    }

    // Save state to localStorage
    this.saveState();
    console.log('State saved, message handling complete');
  },

  // Update tags in the header
  updateTags() {
    const tagsContainer = document.getElementById('console-tags');
    if (!tagsContainer) {
      console.error('Tags container not found!');
      return;
    }

    const currentTags = this.tagSets[this.currentTagSet];
    console.log('=== Updating tags to set', this.currentTagSet, '===');
    console.log('Tags:', currentTags);
    console.log('Tags container:', tagsContainer);

    // Clear existing tags
    tagsContainer.innerHTML = '';
    console.log('Cleared existing tags');

    // Add new tags
    currentTags.forEach((tag, index) => {
      const tagButton = document.createElement('button');
      tagButton.className = 'console-tag';
      tagButton.textContent = tag.label;
      tagButton.setAttribute('data-query', tag.query);

      // Make sure it's clickable
      tagButton.style.cursor = 'pointer';
      tagButton.style.pointerEvents = 'auto';

      // Fade in animation
      tagButton.style.opacity = '0';
      tagButton.style.transform = 'translateY(-10px)';

      tagsContainer.appendChild(tagButton);
      console.log('Added tag button:', tag.label, 'to container');

      // Animate in with stagger
      setTimeout(() => {
        tagButton.style.transition = 'all 0.3s ease';
        tagButton.style.opacity = '1';
        tagButton.style.transform = 'translateY(0)';
      }, index * 100);

      // Add click handler
      tagButton.addEventListener('click', (e) => {
        console.log('=== TAG CLICKED ===');
        console.log('Tag clicked:', tag.label);
        console.log('Event:', e);
        console.log('Is enabled?', this.isEnabled);

        if (!this.isEnabled) {
          console.log('Console not enabled, ignoring click');
          return;
        }

        // If console is minimized, expand it first
        const aiConsole = document.getElementById('ai-console');
        if (aiConsole && aiConsole.classList.contains('minimized')) {
          console.log('Console is minimized, expanding it');
          aiConsole.classList.remove('minimized');
          aiConsole.classList.add('expanded');
          this.state = 'expanded';
          this.saveState();
        }

        const query = tagButton.getAttribute('data-query');
        console.log('Tag query:', query);
        if (query) {
          const input = document.getElementById('console-input');
          if (input) {
            input.value = query;
            console.log('Input field updated with:', query);
          }

          console.log('Calling handleUserMessage with:', query);
          this.handleUserMessage(query);

          // Rotate to next tag set
          this.rotateTagSet();
        }
      });

      console.log('Added click listener to tag:', tag.label);
    });

    console.log('Total tags in container now:', tagsContainer.children.length);
  },

  // Rotate to next tag set
  rotateTagSet() {
    this.currentTagSet = (this.currentTagSet + 1) % this.tagSets.length;
    console.log('Rotating to tag set:', this.currentTagSet);

    // Update tags after a brief delay to allow for smooth transition
    setTimeout(() => {
      this.updateTags();
    }, 600);
  },

  // Show header and messages area with slide-up animation
  showHeaderAndMessages() {
    const header = document.getElementById('console-header');
    const messages = document.getElementById('console-messages');
    const aiConsole = document.getElementById('ai-console');

    console.log('Showing header with tags and messages area...');

    if (header) {
      header.style.display = 'flex';
      // Add slide-up animation
      setTimeout(() => {
        header.classList.add('slide-up');
        console.log('Header with tags sliding up');
      }, 10);
    }

    if (messages) {
      messages.style.display = 'flex';
      // Add slide-up animation with slight delay
      setTimeout(() => {
        messages.classList.add('slide-up');
        console.log('Messages area sliding up');
      }, 100);
    }

    // Expand console to show header and messages
    if (aiConsole && aiConsole.classList.contains('minimized')) {
      aiConsole.classList.remove('minimized');
      aiConsole.classList.add('expanded');
      this.state = 'expanded';
      console.log('Console expanded to show header with tags');
    }

    // Update tags to current set
    this.updateTags();
  },

  // Hide header and messages area
  hideHeaderAndMessages() {
    const header = document.getElementById('console-header');
    const messages = document.getElementById('console-messages');

    if (header) header.style.display = 'none';
    if (messages) messages.style.display = 'none';
  },

  // Minimize console
  minimizeConsole() {
    const aiConsole = document.getElementById('ai-console');
    if (!aiConsole) return;

    if (this.state === 'expanded') {
      this.state = 'minimized';
      aiConsole.classList.add('minimized');
      aiConsole.classList.remove('expanded');
    } else {
      this.state = 'expanded';
      aiConsole.classList.remove('minimized');
      aiConsole.classList.add('expanded');
    }

    this.saveState();
  },

  // Clear console messages
  clearConsole() {
    const messagesContainer = document.getElementById('console-messages');
    if (!messagesContainer) return;

    messagesContainer.innerHTML = '';
    this.hasMessages = false;
    this.hideHeaderAndMessages();
    this.saveState();
  },

  // Close console
  closeConsole() {
    const aiConsole = document.getElementById('ai-console');
    const consoleTab = document.getElementById('console-tab');
    const toggleBtn = document.getElementById('aiChatToggle');

    if (!aiConsole || !consoleTab) return;

    console.log('Closing console and disabling chat');

    this.state = 'closed';
    this.isEnabled = false; // Disable chat when closing

    aiConsole.classList.add('closed');
    consoleTab.classList.add('show');

    // Update toggle button to inactive state
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      console.log('Toggle button set to inactive');
    }

    this.saveState();
    console.log('Console closed and chat disabled');
  },

  // Reopen console
  reopenConsole() {
    const aiConsole = document.getElementById('ai-console');
    const consoleTab = document.getElementById('console-tab');
    const toggleBtn = document.getElementById('aiChatToggle');

    if (!aiConsole || !consoleTab) return;

    console.log('Reopening console and enabling chat');

    this.isEnabled = true; // Re-enable chat when reopening

    // If there are existing messages, open in expanded state
    if (this.hasMessages) {
      console.log('Console has messages, opening in expanded state');
      this.state = 'expanded';
      aiConsole.classList.remove('closed', 'minimized');
      aiConsole.classList.add('expanded');
    } else {
      this.state = 'minimized';
      aiConsole.classList.remove('closed');
      aiConsole.classList.add('minimized');
    }
    consoleTab.classList.remove('show');

    // Update toggle button to active state
    if (toggleBtn) {
      toggleBtn.classList.add('active');
      console.log('Toggle button set to active');
    }

    this.saveState();
    console.log('Console reopened and chat enabled');

    // Initialize tags when reopening
    this.updateTags();
    console.log('Tags re-initialized on reopen');

    // Focus input
    setTimeout(() => {
      const input = document.getElementById('console-input');
      if (input) input.focus();
    }, 300);
  },

  // Enable console
  enableConsole() {
    this.isEnabled = true;
    const aiConsole = document.getElementById('ai-console');
    const toggleBtn = document.getElementById('aiChatToggle');
    const consoleTab = document.getElementById('console-tab');

    console.log('Enabling console - Sliding up...');
    if (aiConsole) {
      // Clear any inline styles that might be blocking the animation
      aiConsole.style.transform = '';
      aiConsole.style.opacity = '';
      aiConsole.style.visibility = '';
      aiConsole.style.transition = '';

      // Remove disabled class to trigger slide-up animation
      aiConsole.classList.remove('disabled');

      // If there are existing messages, open in expanded state
      if (this.hasMessages) {
        console.log('Console has messages, opening in expanded state');
        this.state = 'expanded';
        aiConsole.classList.remove('closed', 'minimized');
        aiConsole.classList.add('expanded');
        if (consoleTab) consoleTab.classList.remove('show');
      } else if (this.state === 'closed') {
        // If console was closed and no messages, reopen to minimized state
        console.log('Console was closed, reopening to minimized state');
        this.state = 'minimized';
        aiConsole.classList.remove('closed');
        aiConsole.classList.add('minimized');
        if (consoleTab) consoleTab.classList.remove('show');
      }

      console.log('Console enabled - Classes:', aiConsole.className);
      console.log('Console enabled - Inline styles cleared, should be visible now');
    }

    if (toggleBtn) {
      toggleBtn.classList.add('active');
      console.log('Toggle button now active');
    }

    this.saveState();

    // Initialize tags when console is enabled
    this.updateTags();
    console.log('Tags initialized on console enable');

    // Focus input after slide animation
    setTimeout(() => {
      const input = document.getElementById('console-input');
      if (input) {
        input.focus();
        console.log('Console visible and ready to use');
      }
    }, 650);
  },

  // Disable console
  disableConsole() {
    this.isEnabled = false;
    const aiConsole = document.getElementById('ai-console');
    const toggleBtn = document.getElementById('aiChatToggle');
    const input = document.getElementById('console-input');

    console.log('Disabling console - Sliding down...');

    // Blur input before hiding
    if (input) input.blur();

    // Add disabled class to trigger slide-down animation
    if (aiConsole) {
      aiConsole.classList.add('disabled');
      console.log('Console disabled - Classes:', aiConsole.className);
    }

    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      console.log('Toggle button deactivated');
    }

    this.saveState();
    console.log('Console sliding down and will be hidden');
  },

  // Toggle console enabled state
  toggleConsoleEnabled() {
    console.log('Toggle clicked! Current state:', this.isEnabled);
    if (this.isEnabled) {
      console.log('Disabling console - will slide down');
      this.disableConsole();
    } else {
      console.log('Enabling console - will slide up with input field only');
      this.enableConsole();
    }
  },

  // Save state to localStorage
  saveState() {
    const state = {
      state: this.state,
      hasMessages: this.hasMessages,
      isEnabled: this.isEnabled
    };
    localStorage.setItem('aiConsoleState', JSON.stringify(state));
  },

  // Load state from localStorage
  loadState() {
    const savedState = localStorage.getItem('aiConsoleState');
    console.log('Loading console state:', savedState);

    if (!savedState) {
      // Default: console is disabled and hidden on first load
      console.log('First visit - console disabled by default');
      this.isEnabled = false;
      this.state = 'minimized';
      const aiConsole = document.getElementById('ai-console');
      const toggleBtn = document.getElementById('aiChatToggle');
      if (aiConsole) {
        // Ensure console is hidden on first load
        aiConsole.classList.add('disabled');
        aiConsole.classList.add('minimized');
        aiConsole.classList.remove('closed');
        // Force immediate hide without animation on first load
        aiConsole.style.transition = 'none';
        aiConsole.style.transform = 'translateY(100%)';
        aiConsole.style.opacity = '0';
        aiConsole.style.visibility = 'hidden';
        // Re-enable transitions after a brief moment
        setTimeout(() => {
          if (aiConsole) aiConsole.style.transition = '';
        }, 100);
      }
      if (toggleBtn) toggleBtn.classList.remove('active');
      console.log('Console hidden - will only show when user enables it');
      return;
    }

    try {
      const state = JSON.parse(savedState);
      this.state = state.state || 'minimized';
      this.hasMessages = state.hasMessages || false;
      this.isEnabled = state.isEnabled || false;

      console.log('Loaded state:', { state: this.state, hasMessages: this.hasMessages, isEnabled: this.isEnabled });

      const aiConsole = document.getElementById('ai-console');
      const consoleTab = document.getElementById('console-tab');
      const toggleBtn = document.getElementById('aiChatToggle');

      // Set enabled/disabled state
      if (this.isEnabled) {
        console.log('Returning user - console was previously enabled');
        aiConsole?.classList.remove('disabled');
        toggleBtn?.classList.add('active');

        // If enabled but closed, reopen to minimized
        if (this.state === 'closed') {
          console.log('Enabled state loaded but was closed, opening to minimized');
          this.state = 'minimized';
          aiConsole?.classList.remove('closed');
          aiConsole?.classList.add('minimized');
          consoleTab?.classList.remove('show');
        } else if (this.state === 'expanded') {
          aiConsole?.classList.remove('minimized');
          aiConsole?.classList.add('expanded');
        }
        console.log('Console will be visible for returning user');
      } else {
        console.log('Returning user - console was disabled');
        aiConsole?.classList.add('disabled');
        toggleBtn?.classList.remove('active');

        // When disabled, keep it hidden
        if (this.state === 'closed') {
          aiConsole?.classList.add('closed');
          consoleTab?.classList.add('show');
        } else if (this.state === 'expanded') {
          aiConsole?.classList.remove('minimized');
          aiConsole?.classList.add('expanded');
        }
        console.log('Console will stay hidden');
      }

      // Show/hide header based on hasMessages
      if (this.hasMessages) {
        const header = document.getElementById('console-header');
        const messages = document.getElementById('console-messages');
        if (header) header.style.display = 'flex';
        if (messages) messages.style.display = 'flex';
      } else {
        this.hideHeaderAndMessages();
      }
    } catch (e) {
      console.error('Error loading console state:', e);
      this.isEnabled = false;
      this.state = 'minimized';
      const aiConsole = document.getElementById('ai-console');
      const toggleBtn = document.getElementById('aiChatToggle');
      if (aiConsole) {
        aiConsole.classList.add('disabled');
        aiConsole.classList.add('minimized');
        aiConsole.classList.remove('closed');
      }
      if (toggleBtn) toggleBtn.classList.remove('active');
    }
  },

  // Initialize console
  init() {
    const consoleInput = document.getElementById('console-input');
    const consoleSend = document.getElementById('console-send');
    const minimizeBtn = document.getElementById('console-minimize');
    const clearBtn = document.getElementById('console-clear');
    const closeBtn = document.getElementById('console-close');
    const consoleTab = document.getElementById('console-tab');
    const consoleTags = document.querySelectorAll('.console-tag');
    const toggleBtn = document.getElementById('aiChatToggle');

    if (!consoleInput || !consoleSend) return;

    // Load saved state
    this.loadState();

    // Show toggle button after short delay
    setTimeout(() => {
      if (toggleBtn) toggleBtn.classList.add('show');
    }, 2000);

    // Toggle button - Enable/Disable chat
    if (toggleBtn) {
      console.log('Toggle button found, attaching event listener');
      toggleBtn.addEventListener('click', (e) => {
        console.log('Toggle button clicked!');
        e.preventDefault();
        e.stopPropagation();
        this.toggleConsoleEnabled();
      });
    } else {
      console.error('Toggle button not found!');
    }

    // Send message on button click
    consoleSend.addEventListener('click', () => {
      if (!this.isEnabled) return; // Prevent if disabled
      this.handleUserMessage(consoleInput.value);
    });

    // Send on Enter
    consoleInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.isTyping && this.isEnabled) {
        this.handleUserMessage(consoleInput.value);
      }
    });

    // Prevent typing when disabled
    consoleInput.addEventListener('keydown', (e) => {
      if (!this.isEnabled) {
        e.preventDefault();
      }
    });

    // Minimize/Expand console
    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => {
        this.minimizeConsole();
      });
    }

    // Clear console
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearConsole();
      });
    }

    // Close console
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeConsole();
      });
    }

    // Reopen console
    if (consoleTab) {
      consoleTab.addEventListener('click', () => {
        this.reopenConsole();
      });
    }

    // Note: Tag click handlers are now added dynamically in updateTags()
    // Tags rotate through different sets after each click

    // Initialize tags immediately if console is enabled
    if (this.isEnabled) {
      this.updateTags();
    }

    // Custom placeholder management
    const customPlaceholder = document.getElementById('custom-placeholder');
    const placeholderText = customPlaceholder?.querySelector('.custom-placeholder-text');

    const placeholderQuestions = [
      "Why should I hire you?",
      "What challenge did you face in your projects?",
      "Tell me about your UX design process",
      "How do you approach user research?",
      "What makes you different as a designer?",
      "Tell me about your mentorship program"
    ];
    let currentPlaceholder = 0;

    // Function to update placeholder with animation
    const updatePlaceholder = (text) => {
      if (!placeholderText) return;

      // Remove animation to reset it
      placeholderText.style.animation = 'none';

      // Force reflow to restart animation
      void placeholderText.offsetWidth;

      // Update text and reapply animation
      placeholderText.textContent = text;
      placeholderText.style.animation = 'slideUp 0.5s ease-out';
    };

    // Initialize first placeholder
    if (placeholderText) {
      updatePlaceholder(placeholderQuestions[0]);
    }

    // Hide/show placeholder based on input
    if (consoleInput && customPlaceholder) {
      consoleInput.addEventListener('input', () => {
        if (consoleInput.value) {
          customPlaceholder.classList.add('hidden');
        } else {
          customPlaceholder.classList.remove('hidden');
        }
      });

      consoleInput.addEventListener('focus', () => {
        if (consoleInput.value) {
          customPlaceholder.classList.add('hidden');
        }
      });

      consoleInput.addEventListener('blur', () => {
        if (!consoleInput.value) {
          customPlaceholder.classList.remove('hidden');
        }
      });
    }

    // Rotate placeholder every 3 seconds
    setInterval(() => {
      if (consoleInput && !consoleInput.value && customPlaceholder && !customPlaceholder.classList.contains('hidden')) {
        currentPlaceholder = (currentPlaceholder + 1) % placeholderQuestions.length;
        updatePlaceholder(placeholderQuestions[currentPlaceholder]);
      }
    }, 3000);

    // Focus input on load (only if enabled and not closed)
    if (this.state !== 'closed' && this.isEnabled) {
      setTimeout(() => consoleInput.focus(), 1000);
    }
  }
};

// Initialize AI Console when page loads
window.addEventListener('load', () => {
  console.log('=== AI Console Initializing ===');
  AIConsole.init();
  console.log('AI Console initialized');
  console.log('Current state:', AIConsole.state);
  console.log('Is enabled:', AIConsole.isEnabled);
  console.log('Has messages:', AIConsole.hasMessages);
});
