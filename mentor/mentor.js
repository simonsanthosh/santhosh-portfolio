/* ========================================
   THEME LOADER - Load saved theme from homepage
======================================== */
(function loadTheme() {
  const savedTheme = localStorage.getItem("portfolioTheme") || "green";
  if (savedTheme !== "green") {
    document.body.classList.add(`theme-${savedTheme}`);
  }
})();

// Placeholder image - theme color will be applied dynamically
function getPlaceholderImage() {
  const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary-color').trim() || '#0cc060';
  const hexColor = primaryColor.replace('#', '%23');
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='18' fill='${hexColor}'%3EImage Not Found%3C/text%3E%3C/svg%3E`;
}
const PLACEHOLDER_IMAGE = getPlaceholderImage();

/* ========================================
   PART 1: GLOBAL VARIABLES & DATA
   ======================================== */
/* ========================================
   JOURNEY PROGRAM DATA - 4 MONTHS
   ======================================== */

const journeyProgramData = {
  months: [
    {
      number: 1,
      title: "UX Foundations",
      modules: [
        {
          icon: "search",
          title: "UX Research & Strategy",
          items: [
            "User Research Methods",
            "Qualitative & Quantitative",
            "Empathy Mapping",
            "User Persona Creation",
            "IA & User Flow",
            "UX Laws & Principles",
          ],
          aiTools: [
            { name: "ChatGPT", image: "/assets/chatgpt.png" },
            { name: "Notion", image: "/assets/notion.png" },
            { name: "Miro", image: "/assets/miro.png" },
          ],
        },
      ],
    },
    {
      number: 2,
      title: "UI Design",
      modules: [
        {
          icon: "palette",
          title: "UI Design & Figma Mastery",
          items: [
            "Design System Fundamentals",
            "Figma Interface & Tools",
            "Auto Layout & Constraints",
            "Components & Variants",
            "Prototyping & Interactions",
            "Design Handoff & Collaboration",
          ],
          aiTools: [
            { name: "Figma", image: "/assets/figma.png" },
            { name: "Whimsical", image: "/assets/whimsical.jpg" },
            { name: "Coolors", image: "/assets/coolors.png" },
            { name: "Maze", image: "/assets/maze.jpg" },
          ],
        },
      ],
    },
    {
      number: 3,
      title: "Web Development",
      modules: [
        {
          icon: "code",
          title: "Front-end Development",
          items: [
            "HTML Structure & Semantics",
            "CSS Styling & Flexbox/Grid",
            "JavaScript Fundamentals & DOM",
            "Figma Design to Code",
            "Responsive Design",
            "Portfolio Website Creation",
          ],
          aiTools: [
            { name: "HTML", image: "/assets/html.png" },
            { name: "CSS", image: "/assets/css.png" },
            { name: "JS", image: "/assets/js.png" },
            { name: "VS", image: "/assets/vscode.png" },
          ],
        },
      ],
    },
    {
      number: 4,
      title: "Career Launch",
      modules: [
        {
          icon: "briefcase",
          title: "Portfolio & Career Prep",
          items: [
            "Portfolio Case Study Writing",
            "Resume & ATS Optimization",
            "LinkedIn Profile Optimization",
            "Mock Interviews & Feedback",
            "Salary Negotiation Strategies",
            "Job Application Strategy",
          ],
          aiTools: [
            { name: "Claude", image: "/assets/claude.png" },
            { name: "Linkedin", image: "/assets/linkedin.webp" },
            { name: "Word", image: "/assets/word.png" },
          ],
        },
      ],
    },
  ],
  programInfo: [
    {
      icon: "calendar",
      label: "Duration",
      value: "4 Months Full Program",
    },
    {
      icon: "map-pin",
      label: "Location",
      value: "FITA Academy, Anna Nagar, Chennai",
    },
    {
      icon: "award",
      label: "Certification",
      value: "Course Completion Certificate",
    },
    {
      icon: "briefcase",
      label: "Placement",
      value: "Job Support & Guidance",
    },
  ],
};

// Lucide Icons SVG Paths (add new icons)
const lucideIcons = {
  search:
    '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>',
  palette:
    '<circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>',
  code: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
  briefcase:
    '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
  calendar:
    '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
  "map-pin":
    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle>',
  award:
    '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>',
  sparkles:
    '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path>',
};

// Why learn from me data
const whyReasons = [
  {
    image: "/assets/real agency.png", // ADD YOUR IMAGE PATH
    title: "Real Experience",
    description:
      "Learn what actually works in the industry from someone who's worked with UK and US clients across multiple companies.",
  },
  {
    image: "/assets/hoe.jpg", // ADD YOUR IMAGE PATH
    title: "Hands-on Projects",
    description:
      "Build 2-3 portfolio-ready case studies that demonstrate your skills to potential employers.",
  },
  {
    image: "/assets/portfolio.jpg", // ADD YOUR IMAGE PATH
    title: "Job Placement Focus",
    description:
      "Complete career preparation including resume building, portfolio reviews, and interview practice.",
  },
  {
    image: "/assets/guidance.jpg", // ADD YOUR IMAGE PATH
    title: "Personal Guidance",
    description:
      "Direct mentorship from someone who's been through the journey and knows what it takes to succeed.",
  },
  {
    image: "/assets/community.jpg", // ADD YOUR IMAGE PATH
    title: "Industry Network",
    description:
      "Access to design community, industry insights, and job opportunities through my professional network.",
  },
];

// Testimonials data (you can replace with your actual testimonials)
const testimonials = [
  {
    name: "Student Name 1",
    role: "UX Designer at Company Name",
    image: "/assets/Daniel.png", // Replace with actual path
    quote:
      "Santhosh's mentorship changed my career trajectory. His practical approach and industry insights helped me land a UX role within 3 months of completing the program.",
  },
  {
    name: "Student Name 2",
    role: "UI Designer at Company Name",
    image: "/assets/Daniel.png", // Replace with actual path
    quote:
      "The hands-on projects and portfolio guidance were invaluable. I went from zero design knowledge to getting my first job offer. Highly recommend!",
  },
  {
    name: "Student Name 3",
    role: "Product Designer at Company Name",
    image: "/assets/Daniel.png", // Replace with actual path
    quote:
      "Learning from someone with real agency experience made all the difference. The program covered everything from UX research to front-end basics.",
  },
];

// Gallery images data
const galleryImages = [
  {
    src: "/assets/Daniel.png", // Replace with your actual image paths
    caption: "Interactive workshop session with students learning Figma basics",
  },
  {
    src: "/assets/Daniel.png",
    caption: "Students working on their first UX research project",
  },
  {
    src: "/assets/Daniel.png",
    caption: "Conducting a portfolio review session at FITA Academy",
  },
  {
    src: "/assets/Daniel.png",
    caption: "Group discussion on design thinking and user empathy",
  },
  {
    src: "/assets/Daniel.png",
    caption: "Students presenting their final case studies",
  },
  {
    src: "/assets/Daniel.png",
    caption: "Celebrating successful job placements with graduates",
  },
  // Add more images as needed
];

// FAQ data
const faqData = [
  {
    question: "Do I need a design background to enroll?",
    answer:
      "No! The program is designed for beginners. We start from the fundamentals and build up your skills progressively. All you need is dedication and willingness to learn.",
  },
  {
    question: "What software or tools do I need?",
    answer:
      "You'll need a laptop/computer and an internet connection. We'll be using Figma (free), and basic code editors (VS Code - free). All tools we use are free or have free versions.",
  },
  {
    question: "Is this online or offline?",
    answer:
      "The program is conducted at FITA Academy in Chennai. We have both weekday and weekend batches available. Contact me for current batch timings.",
  },
  {
    question: "Do you help with job placement?",
    answer:
      "Yes! Job placement support is a core part of the program. We work on your portfolio, resume, LinkedIn profile, conduct mock interviews, and provide guidance throughout your job search.",
  },
  {
    question: "Can I see the full syllabus?",
    answer:
      "Absolutely! Click the 'View Syllabus' button in the contact section to get the detailed course curriculum as a PDF.",
  },
  {
    question: "How do I enroll in the program?",
    answer:
      "Fill out the contact form below or reach out via WhatsApp/Email. We'll schedule a free consultation call to discuss the program details, fees, and next batch timings.",
  },
];

/* ========================================
     PART 2: INITIALIZATION & LOADER
======================================== */

window.addEventListener("load", () => {
  console.log("🔥 Mentor page loaded!");

  const terminalLoader = document.getElementById("terminalLoader");
  const mentorWrapper = document.getElementById("mentorWrapper");

  // Show loader for 1.5 seconds
  setTimeout(() => {
    if (terminalLoader) {
      terminalLoader.classList.add("fade-out");
    }

    if (mentorWrapper) {
      mentorWrapper.classList.add("visible");
    }

    setTimeout(() => {
      try {
        // Register GSAP plugins
        if (typeof gsap !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
        }

        // Initialize all sections
        renderJourneyProgram();
        renderWhySection();
        renderTestimonials();
        renderGallery();
        renderFAQ();
        renderContactForm();
        setupEmailCopy();

        // Animate intro section
        animateIntroSection();

        // Setup scroll triggers
        setupScrollTriggers();

        // Setup navigation
        setupNavigation();

        // Setup dock menu
        setupDockMenu();

        console.log("✅ Mentor page initialized successfully!");
      } catch (error) {
        console.error("❌ Initialization error:", error);
      }
    }, 300);
  }, 1500);
});

/* ========================================
     PART 3: INTRO ANIMATION
     ======================================== */

// Replace the animateIntroSection function in your mentor.js file

function animateIntroSection() {
  const timeline = gsap.timeline({
    delay: 0.5,
    onStart: () => {
      console.log("🌊 Starting intro animation...");
    },
    onComplete: () => {
      console.log("✅ Intro animation complete!");
    },
  });

  timeline
    // Title (line1) - Fade up smoothly
    .to(".line1", {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      force3D: true,
    })
    // Tagline (line2) - Fade up smoothly
    .to(
      ".line2",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        force3D: true,
      },
      "-=0.6"
    )
    // Description - Fade up smoothly
    .to(
      ".intro-description",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        force3D: true,
      },
      "-=0.5"
    )
    // Stats - Fade up smoothly
    .to(
      ".intro-stats",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        force3D: true,
        onComplete: () => {
          // Start jackpot animation after stats appear
          animateStatsJackpot();
        },
      },
      "-=0.5"
    )
    // Scroll indicator - Fade up smoothly
    .to(
      ".scroll-indicator",
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
      },
      "-=0.4"
    );
}

// NEW FUNCTION: Jackpot roll animation for stats
function animateStatsJackpot() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((statEl, index) => {
    const finalValue = statEl.textContent.trim();
    const isNumeric = /^\d+/.test(finalValue);

    if (!isNumeric) {
      // For non-numeric values (like "100%"), animate differently
      const numericPart = parseInt(finalValue);
      const suffix = finalValue.replace(/\d+/, "");

      if (!isNaN(numericPart)) {
        animateNumberRoll(statEl, numericPart, suffix, index);
      }
      return;
    }

    // For pure numeric values (like "70+", "25+", "3")
    const cleanNumber = parseInt(finalValue);
    const suffix = finalValue.replace(/\d+/, "");

    animateNumberRoll(statEl, cleanNumber, suffix, index);
  });
}

// Replace the animateNumberRoll function in your mentor.js file

function animateNumberRoll(element, finalNumber, suffix, index) {
  const duration = 1500; // 1.5 seconds total duration
  const fps = 60; // 60 frames per second for smooth animation
  const totalFrames = (duration / 1000) * fps;
  const rollsCount = 6; // Number of times it "passes through" values
  let currentFrame = 0;

  // Delay each stat slightly for stagger effect
  const delay = index * 150;

  // Set initial value to 0
  element.textContent = "0" + suffix;

  setTimeout(() => {
    // Show the number and start rolling
    element.classList.add("rolling");

    const interval = setInterval(() => {
      currentFrame++;

      // Calculate progress with easing (ease out cubic)
      const progress = currentFrame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      if (currentFrame >= totalFrames) {
        // Final value
        element.textContent = finalNumber + suffix;
        clearInterval(interval);

        // Add a pulse effect when it stops
        gsap.to(element, {
          scale: 1.2,
          duration: 0.2,
          ease: "back.out(2)",
          yoyo: true,
          repeat: 1,
        });
      } else {
        // Smooth rolling with sine wave for natural acceleration/deceleration
        const wave = Math.sin(progress * Math.PI * rollsCount);
        const variance =
          finalNumber * 0.3 * Math.abs(wave) * (1 - easeProgress);
        const currentValue = Math.floor(finalNumber * easeProgress + variance);

        element.textContent = Math.max(0, currentValue) + suffix;
      }
    }, 1000 / fps);
  }, delay);
}

/* ========================================
     PART 4: RENDER SECTIONS
======================================== */

function renderJourneyProgram() {
  const monthsGrid = document.querySelector(".months-grid");
  const programInfoGrid = document.querySelector(".program-info-grid");

  if (!monthsGrid || !programInfoGrid) return;

  // Render simple month cards
  monthsGrid.innerHTML = journeyProgramData.months
    .map(
      (month) => `
        <div class="month-card">
          <div class="month-header">
            <div class="month-number">MONTH ${month.number}</div>
            <div class="month-title">${month.title}</div>
          </div>
          ${month.modules
            .map(
              (module) => `
            <div class="module-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                ${lucideIcons[module.icon] || ""}
              </svg>
            </div>
            <h4 class="module-title">${module.title}</h4>
            <ul class="module-list">
              ${module.items.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            
            <div class="ai-tools-section">
              <div class="ai-tools-title">TOOLS & SOFTWARES</div>
              <div class="ai-tools-images">
                ${module.aiTools
                  .map(
                    (tool) => `
                  <img src="${tool.image}" 
                       alt="${tool.name}" 
                       class="ai-tool-img"
                       title="${tool.name}"
                       onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}'">
                `
                  )
                  .join("")}
              </div>
            </div>
            `
            )
            .join("")}
        </div>
        `
    )
    .join("");

  // Render program info cards (same as before)
  programInfoGrid.innerHTML = journeyProgramData.programInfo
    .map(
      (info) => `
        <div class="program-info-card">
          <div class="info-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              ${lucideIcons[info.icon] || ""}
            </svg>
          </div>
          <div class="info-label">${info.label}</div>
          <div class="info-value">${info.value}</div>
        </div>
        `
    )
    .join("");

  // Reveal cards after a short delay
  setTimeout(() => {
    document.querySelectorAll(".month-card").forEach((card, index) => {
      setTimeout(() => card.classList.add("revealed"), index * 100);
    });

    document.querySelectorAll(".program-info-card").forEach((card, index) => {
      setTimeout(() => card.classList.add("revealed"), index * 100);
    });
  }, 200);

  console.log("✅ Journey program section rendered");
}

function setupMonthCardHover() {
  const monthCards = document.querySelectorAll(".month-card");

  monthCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      // Collapse all cards
      monthCards.forEach((c) => c.classList.remove("expanded"));
      monthCards.forEach((c) => c.classList.add("collapsed"));

      // Expand hovered card
      card.classList.remove("collapsed");
      card.classList.add("expanded");
    });
  });
}

function startJourneyFloating() {
  const monthCards = document.querySelectorAll(".month-card");
  const programCards = document.querySelectorAll(".program-info-card");

  // Float month cards
  monthCards.forEach((card, index) => {
    const delay = index * 0.3;
    const duration = 5 + Math.random() * 2;
    const yMovement = 8 + Math.random() * 6;

    gsap.to(card, {
      y: yMovement,
      duration: duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: delay,
    });
  });

  // Float program info cards
  programCards.forEach((card, index) => {
    const delay = index * 0.2;
    const duration = 4 + Math.random() * 2;
    const yMovement = 6 + Math.random() * 5;

    gsap.to(card, {
      y: yMovement,
      duration: duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: delay,
    });
  });
}

function renderWhySection() {
  const section = document.querySelector(".why-section");
  if (!section) return;

  // Triple the cards for seamless infinite loop
  const cardsHTML = whyReasons
    .map(
      (reason, index) => `
      <div class="why-card" data-index="${index}">
        <div class="why-image-block">
          <img src="${reason.image}" alt="${reason.title}" class="why-image" onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}'">
        </div>
        <div class="why-title">${reason.title}</div>
        <div class="why-description">
          <p>${reason.description}</p>
        </div>
      </div>
      `
    )
    .join("");

  const wrapperHTML = `
    <div class="why-carousel-wrapper">
      <div class="why-carousel-track" id="whyCarouselTrack">
        ${cardsHTML}
        ${cardsHTML}
        ${cardsHTML}
      </div>
    </div>
  `;

  const grid = document.querySelector(".why-grid");
  if (grid) {
    grid.outerHTML = wrapperHTML;
  }

  console.log("✅ Why section carousel rendered");
}

function startCoverFlowEffect() {
  const track = document.getElementById("whyCarouselTrack");
  const cards = document.querySelectorAll(".why-card");

  if (!track || cards.length === 0) return;

  function updateCoverFlow() {
    const wrapper = track.parentElement;
    const wrapperRect = wrapper.getBoundingClientRect();
    const centerX = wrapperRect.left + wrapperRect.width / 2;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;

      // Distance from center
      const distanceFromCenter = cardCenterX - centerX;
      const maxDistance = wrapperRect.width / 2;
      const normalizedDistance = distanceFromCenter / maxDistance;

      // Calculate transforms
      const rotateY = normalizedDistance * 45; // -45deg to +45deg
      const scale = Math.max(0.7, 1 - Math.abs(normalizedDistance) * 0.3); // Scale down side cards
      const translateZ = Math.abs(normalizedDistance) * -200; // Push side cards back
      const opacity = Math.max(0.5, 1 - Math.abs(normalizedDistance) * 0.5);

      // Apply Cover Flow transform
      card.style.transform = `
        perspective(1500px)
        rotateY(${rotateY}deg)
        scale(${scale})
        translateZ(${translateZ}px)
      `;

      card.style.opacity = opacity;
      card.style.zIndex = Math.round(100 - Math.abs(normalizedDistance) * 100);
    });

    requestAnimationFrame(updateCoverFlow);
  }

  updateCoverFlow();

  console.log("✅ Cover Flow effect started");
}

function startCoverFlowEffect() {
  const track = document.getElementById("whyCarouselTrack");
  const cards = document.querySelectorAll(".why-card");

  if (!track || cards.length === 0) return;

  function updateCoverFlow() {
    const wrapper = track.parentElement;
    const wrapperRect = wrapper.getBoundingClientRect();
    const centerX = wrapperRect.left + wrapperRect.width / 2;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;

      // Distance from center
      const distanceFromCenter = cardCenterX - centerX;
      const maxDistance = wrapperRect.width / 2;
      const normalizedDistance = distanceFromCenter / maxDistance;

      // Calculate transforms
      const rotateY = normalizedDistance * 45; // -45deg to +45deg
      const scale = Math.max(0.7, 1 - Math.abs(normalizedDistance) * 0.3); // Scale down side cards
      const translateZ = Math.abs(normalizedDistance) * -200; // Push side cards back
      const opacity = Math.max(0.5, 1 - Math.abs(normalizedDistance) * 0.5);

      // Apply Cover Flow transform
      card.style.transform = `
        perspective(1500px)
        rotateY(${rotateY}deg)
        scale(${scale})
        translateZ(${translateZ}px)
      `;

      card.style.opacity = opacity;
      card.style.zIndex = Math.round(100 - Math.abs(normalizedDistance) * 100);
    });

    requestAnimationFrame(updateCoverFlow);
  }

  updateCoverFlow();

  console.log("✅ Cover Flow effect started");
}

function position3DCards() {
  const cards = document.querySelectorAll(".why-card");
  const totalCards = cards.length;
  const angleIncrement = 360 / totalCards;
  const radius = 800; /* Larger radius to show 4 cards clearly */

  cards.forEach((card, index) => {
    const angle = angleIncrement * index;

    card.style.transform = `
      rotateY(${angle}deg) 
      translateZ(${radius}px)
    `;

    setTimeout(() => {
      card.style.opacity = "1";
    }, index * 100);
  });

  console.log(`✅ Positioned ${totalCards} cards in 3D carousel`);
}

function setup3DCarouselInteraction() {
  const carousel = document.getElementById("whyCarousel3D");
  const cards = document.querySelectorAll(".why-card");

  if (!carousel) return;

  // Pause rotation on hover
  carousel.addEventListener("mouseenter", () => {
    carousel.classList.add("paused");
  });

  carousel.addEventListener("mouseleave", () => {
    carousel.classList.remove("paused");
  });

  // Pause on individual card hover
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      carousel.classList.add("paused");
    });

    card.addEventListener("mouseleave", () => {
      carousel.classList.remove("paused");
    });
  });

  console.log("✅ 3D carousel interaction setup complete");
}

function positionOrbitCards() {
  const cards = document.querySelectorAll(".why-card");
  if (cards.length === 0) {
    console.log("❌ No cards found!");
    return;
  }

  console.log(`✅ Positioning ${cards.length} cards`);

  const radius = 280; // Distance from center in pixels
  const centerX = 400; // Half of 800px
  const centerY = 400; // Half of 800px

  cards.forEach((card, index) => {
    const angle = (index / cards.length) * 2 * Math.PI - Math.PI / 2; // Start from top
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    card.style.left = `${x - 70}px`; // 70px = half of card width (140px / 2)
    card.style.top = `${y - 70}px`; // 70px = half of card height
    card.style.opacity = "0";
    card.style.transform = "scale(0)";

    // Animate in with stagger
    setTimeout(() => {
      card.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
      card.style.opacity = "1";
      card.style.transform = "scale(1)";
    }, index * 100);
  });

  console.log("✅ Cards positioned!");
}
// Optional: Slow rotation animation
function startOrbitRotation() {
  const container = document.querySelector(".why-orbit-container");
  if (!container) return;

  let rotation = 0;
  let isHovered = false;

  // Pause rotation on hover
  container.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  container.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  function rotate() {
    if (!isHovered) {
      rotation += 0.05; // Slow rotation speed
      container.style.transform = `rotate(${rotation}deg)`;

      // Counter-rotate cards to keep them upright
      const cards = document.querySelectorAll(".why-card");
      cards.forEach((card) => {
        card.style.transform = `rotate(-${rotation}deg)`;
      });
    }
    requestAnimationFrame(rotate);
  }

  rotate();
}

// Call this in your initialization (in window.addEventListener("load"))
// Uncomment the line below if you want auto-rotation:
// setTimeout(startOrbitRotation, 2000);

function renderTestimonials() {
  const container = document.querySelector(".testimonials-container");
  if (!container) return;

  container.innerHTML = testimonials
    .map(
      (testimonial) => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-img" onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}'">
          <div class="testimonial-info">
            <div class="testimonial-name">${testimonial.name}</div>
            <div class="testimonial-role">${testimonial.role}</div>
          </div>
        </div>
        <p class="testimonial-quote">"${testimonial.quote}"</p>
      </div>
    `
    )
    .join("");

  console.log("✅ Testimonials rendered");
}

function renderFAQ() {
  const container = document.querySelector(".faq-container");
  if (!container) return;

  container.innerHTML = faqData
    .map(
      (faq, index) => `
      <div class="faq-item" data-index="${index}">
        <div class="faq-question">
  <span>${faq.question}</span>
  <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
</div>
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      </div>
    `
    )
    .join("");

  // Add click handlers for FAQ accordion
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active");
      }
    });
  });

  console.log("✅ FAQ rendered");
}

function renderContactForm() {
  const content = document.querySelector(".contact-content");
  if (!content) return;

  content.innerHTML = `
    <div class="contact-split-layout">
      <!-- LEFT SIDE - Info & Cards -->
      <div class="contact-left">
        <div class="contact-left-header">
          <p class="contact-left-description">
            Fill out the form to enroll in this course or schedule a 1:1 talk about career guidance, mentorship opportunities, and how I can help you transition into UX/UI design.
          </p>
        </div>

        <div class="contact-cards-grid">
  <!-- Phone Card -->
  <div class="contact-info-card">
    <div class="contact-card-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
    </div>
    <div class="contact-card-content">
      <div class="contact-card-label">Phone</div>
      <a href="tel:+919941292729" class="contact-card-value">+91 99412 92729</a>
    </div>
  </div>

<!-- Email Card -->
<div class="contact-info-card" id="emailCard" style="cursor: pointer;">
  <div class="contact-card-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  </div>
  <div class="contact-card-content">
    <div class="contact-card-label">Email</div>
    <div class="contact-card-value">santhosh.a.designer@gmail.com</div>
  </div>
  <div class="copy-tooltip" id="emailTooltip">Copied!</div>
</div>

  <!-- Available Hours Card -->
  <div class="contact-info-card">
    <div class="contact-card-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg>
    </div>
    <div class="contact-card-content">
      <div class="contact-card-label">Available Hours</div>
      <div class="contact-card-value contact-card-multiline">
        <div>Weekdays: 9:30-11:30 AM</div>
        <div>Evenings: 7-9 PM</div>
        <div>Weekends: 12-2 PM</div>
      </div>
    </div>
  </div>

  <!-- LinkedIn Card -->
  <div class="contact-info-card">
    <div class="contact-card-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    </div>
    <div class="contact-card-content">
      <div class="contact-card-label">LinkedIn</div>
      <a href="https://www.linkedin.com/in/santhosh-designer/" target="_blank" class="contact-card-value">santhosh-designer</a>
    </div>
  </div>
</div>

        <!-- Syllabus Button -->
        <button class="syllabus-btn" id="openSyllabusBtn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text-icon lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
          <span>View Syllabus</span>
        </button>
      </div>

      <!-- RIGHT SIDE - Contact Form -->
      <div class="contact-right">
        <h3 class="form-title">Send Your Details</h3>
        <form class="contact-form" id="contactForm" novalidate>
          <!-- Name & Email Row -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="name">Name *</label>
              <input type="text" id="name" class="form-input" placeholder="Your Full Name">
              <span class="error-message" id="nameError"></span>
            </div>

            <div class="form-group">
              <label class="form-label" for="email">Email *</label>
              <input type="email" id="email" class="form-input" placeholder="Your Professional Email">
              <span class="error-message" id="emailError"></span>
            </div>
          </div>

          <!-- Phone & Status Row -->
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="phone">Phone *</label>
              <input type="tel" id="phone" class="form-input" placeholder="+91 99999 99999">
              <span class="error-message" id="phoneError"></span>
            </div>

            <div class="form-group">
              <label class="form-label" for="status">Current Status *</label>
              <div class="custom-select" id="statusSelect">
                <div class="select-trigger">
                  <span class="select-value">Select your status</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                <div class="select-options">
                  <div class="select-option" data-value="student">Student</div>
                  <div class="select-option" data-value="working">Working Professional</div>
                </div>
              </div>
              <input type="hidden" id="status" name="status">
              <span class="error-message" id="statusError"></span>
            </div>
          </div>

          <!-- Message (Full Width) -->
          <div class="form-group">
            <label class="form-label" for="message">Your Questions / Message</label>
            <textarea id="message" class="form-textarea" placeholder="Tell me about your goals and any questions you have..."></textarea>
          </div>

          <button type="submit" class="submit-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal-icon lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg>
            <span>Send Enquiry</span>
          </button>
        </form>
      </div>
    </div>

    <!-- PDF Viewer Modal -->
    <div class="pdf-modal" id="pdfModal">
      <div class="pdf-modal-content">
        <div class="pdf-modal-header">
          <input type="text" class="pdf-filename-input" id="pdfFilenameInput" value="Santhosh_UX_UI_Syllabus">
          <div class="pdf-modal-actions">
            <button class="pdf-download-btn" id="pdfDownloadBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
            <button class="pdf-close-btn" id="pdfCloseBtn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div class="pdf-viewer-container">
          <img src="/assets/syllabus-preview.jpg" alt="UX/UI Syllabus" class="pdf-preview-image" id="pdfPreviewImage" onerror="this.onerror=null; this.src='${PLACEHOLDER_IMAGE}'">
        </div>
      </div>
    </div>
  `;

  // Setup custom select dropdown
  setupCustomSelect();

  // Setup form validation and submission
  setupFormValidation();

  // Setup PDF modal
  setupPDFModal();

  console.log("✅ Contact form rendered with equal heights");
}

// Setup email copy functionality with confetti
function setupEmailCopy() {
  const emailCard = document.getElementById('emailCard');
  const emailTooltip = document.getElementById('emailTooltip');
  const emailText = 'santhosh.a.designer@gmail.com';
  
  if (!emailCard || !emailTooltip) return;
  
  emailCard.addEventListener('click', async (e) => {
    const clickedElement = e.currentTarget; // Store reference before async
    
    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(emailText);
      
      // Create confetti burst
      createConfetti(clickedElement);
      
      // Show tooltip with spring animation
      emailTooltip.classList.add('show');
      
      // Hide tooltip after 2 seconds
      setTimeout(() => {
        emailTooltip.classList.remove('show');
      }, 2000);
      
      console.log('✅ Email copied to clipboard!');
    } catch (err) {
      console.error('❌ Failed to copy:', err);
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = emailText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      // Create confetti burst
      createConfetti(clickedElement); // Use stored reference
      
      // Show tooltip
      emailTooltip.classList.add('show');
      setTimeout(() => {
        emailTooltip.classList.remove('show');
      }, 2000);
    }
  });
}

// Create confetti burst animation
function createConfetti(element) {
  if (!element) {
    console.error('Element is null');
    return;
  }
  
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  console.log('🎉 Creating confetti at:', centerX, centerY); // Debug log
  
  // Create 5 confetti pieces
  for (let i = 0; i < 5; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    
    // Random direction - spread in all directions
    const angle = (i * 72) + (Math.random() * 40 - 20); // Spread evenly in circle
    const distance = 60 + Math.random() * 40; // Distance 60-100px
    const angleRad = (angle * Math.PI) / 180;
    
    const offsetX = Math.cos(angleRad) * distance;
    const offsetY = Math.sin(angleRad) * distance;
    const rotation = Math.random() * 720 + 360; // Multiple rotations
    
    // Set CSS variables for animation
    confetti.style.setProperty('--fall-distance-start', `${offsetY * 0.3}px`);
    confetti.style.setProperty('--horizontal-offset-start', `${offsetX * 0.3}px`);
    confetti.style.setProperty('--fall-distance', `${offsetY}px`);
    confetti.style.setProperty('--horizontal-offset', `${offsetX}px`);
    confetti.style.setProperty('--rotation', `${rotation}deg`);
    
    // Position at click center using fixed positioning
    confetti.style.left = `${centerX}px`;
    confetti.style.top = `${centerY}px`;
    confetti.style.transform = 'translate(-50%, -50%)'; // Center the confetti
    
    document.body.appendChild(confetti);
    
    console.log('✨ Confetti piece created:', i); // Debug log
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 1200);
  }
}

/* ========================================
   CONTACT FORM FUNCTIONS
   ======================================== */

// Custom Select Dropdown
function setupCustomSelect() {
  const selectContainer = document.getElementById("statusSelect");
  if (!selectContainer) return;

  const trigger = selectContainer.querySelector(".select-trigger");
  const options = selectContainer.querySelectorAll(".select-option");
  const hiddenInput = document.getElementById("status");
  const valueDisplay = selectContainer.querySelector(".select-value");

  // Toggle dropdown
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    selectContainer.classList.toggle("open");
  });

  // Select option
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value;
      const text = option.textContent;

      hiddenInput.value = value;
      valueDisplay.textContent = text;
      valueDisplay.classList.add("selected");

      // Remove active class from all options
      options.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");

      selectContainer.classList.remove("open");

      // Clear error if exists
      const statusError = document.getElementById("statusError");
      if (statusError) statusError.textContent = "";
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    selectContainer.classList.remove("open");
  });
}

// Form Validation
function setupFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default HERE, not in handleFormSubmit

    // Clear previous errors
    document
      .querySelectorAll(".error-message")
      .forEach((err) => (err.textContent = ""));
    document
      .querySelectorAll(".form-input, .form-textarea, .custom-select")
      .forEach((input) => {
        input.classList.remove("error");
      });

    let isValid = true;

    // Validate Name
    const name = document.getElementById("name").value.trim();
    if (!name) {
      showError("name", "Please enter your name");
      isValid = false;
    } else if (name.length < 2) {
      showError("name", "Name must be at least 2 characters");
      isValid = false;
    }

    // Validate Email
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError("email", "Please enter your email");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError("email", "Please enter a valid email address");
      isValid = false;
    }

    // Validate Phone
    const phone = document.getElementById("phone").value.trim();
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phone) {
      showError("phone", "Please enter your phone number");
      isValid = false;
    } else if (phone.length < 10) {
      showError("phone", "Please enter a valid phone number");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      showError("phone", "Phone number contains invalid characters");
      isValid = false;
    }

    // Validate Status
    const status = document.getElementById("status").value;
    if (!status) {
      showError("status", "Please select your current status");
      const statusSelect = document.getElementById("statusSelect");
      if (statusSelect) statusSelect.classList.add("error");
      isValid = false;
    }

    if (isValid) {
      handleFormSubmit(); // No event needed
    }
  });

  // Real-time validation on blur
  ["name", "email", "phone"].forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.addEventListener("blur", () => {
      if (field.value.trim()) {
        validateSingleField(fieldId);
      }
    });

    // Clear error on input
    field.addEventListener("input", () => {
      const errorEl = document.getElementById(fieldId + "Error");
      if (errorEl) errorEl.textContent = "";
      field.classList.remove("error");
    });
  });
}

function validateSingleField(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;

  const value = field.value.trim();

  if (fieldId === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      showError("email", "Please enter a valid email address");
    }
  } else if (fieldId === "phone") {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (value && (value.length < 10 || !phoneRegex.test(value))) {
      showError("phone", "Please enter a valid phone number");
    }
  }
}

function showError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + "Error");
  const inputElement = document.getElementById(fieldId);

  if (errorElement) {
    errorElement.textContent = message;
  }

  if (inputElement) {
    inputElement.classList.add("error");
  }

  // Scroll to first error
  const firstError = document.querySelector(".error-message:not(:empty)");
  if (firstError) {
    firstError.parentElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}

function handleFormSubmit() {
  // No event parameter needed anymore

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const status = document.getElementById("status").value;
  const message = document.getElementById("message").value.trim();

  // Get status display text
  const statusOption = document.querySelector(".select-option.active");
  const statusText = statusOption ? statusOption.textContent : status;

  // Create WhatsApp message
  const whatsappMessage = `*New Mentorship Enquiry*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone}
*Status:* ${statusText}
*Message:* ${message || "No message provided"}`;

  // Encode message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);

  // Open WhatsApp with pre-filled message
  const whatsappURL = `https://wa.me/919941292729?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");

  // Reset form
  const form = document.getElementById("contactForm");
  if (form) form.reset();

  const selectValue = document.querySelector(".select-value");
  if (selectValue) {
    selectValue.textContent = "Select your status";
    selectValue.classList.remove("selected");
  }

  const activeOption = document.querySelector(".select-option.active");
  if (activeOption) activeOption.classList.remove("active");

  // Show success message
  showSuccessMessage();

  console.log("✅ Form submitted successfully!");
}

function showSuccessMessage() {
  // Create temporary success message
  const successMsg = document.createElement("div");
  successMsg.className = "success-toast";
  successMsg.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>Opening WhatsApp... Please send the message!</span>
  `;
  document.body.appendChild(successMsg);

  setTimeout(() => successMsg.classList.add("show"), 100);

  setTimeout(() => {
    successMsg.classList.remove("show");
    setTimeout(() => successMsg.remove(), 300);
  }, 3000);
}

// PDF Modal Setup
function setupPDFModal() {
  const modal = document.getElementById("pdfModal");
  const openBtn = document.getElementById("openSyllabusBtn");
  const closeBtn = document.getElementById("pdfCloseBtn");
  const downloadBtn = document.getElementById("pdfDownloadBtn");
  const filenameInput = document.getElementById("pdfFilenameInput");

  if (!modal || !openBtn) return;

  // Open modal
  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Download PDF
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const filename = filenameInput
        ? filenameInput.value.trim() || "Santhosh_UX_UI_Syllabus"
        : "Santhosh_UX_UI_Syllabus";

      // Create download link
      const link = document.createElement("a");
      link.href = "/assets/syllabus-preview.jpg"; // Change to your actual PDF/image path
      link.download = `${filename}.jpg`; // Change extension to .pdf if using PDF
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`⬇️ Downloaded: ${filename}`);
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

let currentGalleryIndex = 0;

/* ========================================
   RENDER GALLERY FUNCTION
   ======================================== */

function renderGallery() {
  const track = document.getElementById("galleryTrack");
  const dotsContainer = document.getElementById("galleryDots");

  if (!track || !dotsContainer) return;

  // Render slides
  track.innerHTML = galleryImages
    .map(
      (image, index) => `
    <div class="gallery-slide ${
      index === 0 ? "active" : ""
    }" data-index="${index}">
      <img src="${image.src}" alt="${
        image.caption
      }" class="gallery-image" onerror="this.src='/assets/Daniel.png'">
      <div class="gallery-caption">${image.caption}</div>
    </div>
  `
    )
    .join("");

  // Render dots
  dotsContainer.innerHTML = galleryImages
    .map(
      (_, index) => `
    <div class="gallery-dot ${
      index === 0 ? "active" : ""
    }" data-index="${index}"></div>
  `
    )
    .join("");

  // Setup navigation
  setupGalleryNavigation();

  console.log("✅ Gallery rendered");
}

function setupGalleryNavigation() {
  const prevBtn = document.getElementById("galleryPrevBtn");
  const nextBtn = document.getElementById("galleryNextBtn");
  const dots = document.querySelectorAll(".gallery-dot");

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => navigateGallery("prev"));
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => navigateGallery("next"));
  }

  // Dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      goToGallerySlide(index);
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      navigateGallery("prev");
    } else if (e.key === "ArrowRight") {
      navigateGallery("next");
    }
  });

  // Auto-play (optional - uncomment if you want auto-play)
  // startGalleryAutoPlay();
}

function navigateGallery(direction) {
  if (direction === "next") {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  } else {
    currentGalleryIndex =
      (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  }

  goToGallerySlide(currentGalleryIndex);
}

function goToGallerySlide(index) {
  currentGalleryIndex = index;

  const track = document.getElementById("galleryTrack");
  const slides = document.querySelectorAll(".gallery-slide");
  const dots = document.querySelectorAll(".gallery-dot");

  if (!track) return;

  // Update track position
  track.style.transform = `translateX(-${index * 100}%)`;

  // Update active states
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Optional: Auto-play gallery
function startGalleryAutoPlay() {
  setInterval(() => {
    navigateGallery("next");
  }, 5000); // Change slide every 5 seconds
}

/* ========================================
     PART 5: FORM HANDLERS
     ======================================== */

function downloadSyllabus() {
  // Create a temporary link and trigger download
  const link = document.createElement("a");
  link.href = "/assets/UX_UI_Syllabus.pdf"; // UPDATE THIS PATH to your actual PDF
  link.download = "Santhosh_UX_UI_Mentorship_Syllabus.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log("⬇️ Syllabus download initiated!");
}

/* ========================================
     PART 6: SCROLL TRIGGERS & REVEALS
     ======================================== */

function setupScrollTriggers() {
  // Reveal sections on scroll
  const sections = document.querySelectorAll("[data-section]");

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        section.classList.add("revealed");

        // Reveal month cards with stagger
        const monthCards = section.querySelectorAll(".month-card");
        monthCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("revealed");
          }, index * 150);
        });

        // ✅ ADD THIS: Reveal program info cards with stagger
        const infoCards = section.querySelectorAll(".program-info-card");
        infoCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("revealed");
          }, index * 150);
        });

        // Reveal other cards (why, testimonials, faq)
        const cards = section.querySelectorAll(
          ".why-card, .testimonial-card, .faq-item"
        );
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("revealed");
          }, index * 150);
        });

        const contactContent = section.querySelector(".contact-content");
        if (contactContent) {
          contactContent.classList.add("revealed");
        }
      },
    });
  });

  console.log("✅ Scroll triggers setup");
}

/* ========================================
     PART 7: NAVIGATION & HEADER
     ======================================== */

function setupNavigation() {
  const nav = document.getElementById("mentorNav");
  const introSection = document.querySelector(".intro-section");

  // Handle header visibility on scroll - IMMEDIATE FADE
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (!nav) return;

    const currentScrollY = window.scrollY;

    // Fade out immediately when scrolling down from top
    if (currentScrollY > 100) {
      nav.classList.add("hidden");
    } else {
      nav.classList.remove("hidden");
    }

    lastScrollY = currentScrollY;

    // Handle scroll indicator
    handleScrollIndicatorVisibility();
  });

  // Home button
  const homeBtn = document.getElementById("homeBtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      // Set flag to skip loader on homepage
      sessionStorage.setItem("returningHome", "true");
      window.location.href = "../index.html";
    });
  }

  // Social buttons
  document.querySelectorAll(".social-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const link = btn.dataset.link;
      switch (link) {
        case "linkedin":
          window.open(
            "https://www.linkedin.com/in/santhosh-designer/",
            "_blank"
          );
          break;
        case "gmail":
          window.location.href = "mailto:[email protected]";
          break;
        case "whatsapp":
          window.open("https://wa.me/919941292729", "_blank");
          break;
      }
    });
  });

  console.log("✅ Navigation setup complete");
}

function handleScrollIndicatorVisibility() {
  const scrollIndicator = document.getElementById("scrollIndicator");
  if (!scrollIndicator) return;

  // Hide after scrolling 200px down
  if (window.scrollY > 200) {
    gsap.to(scrollIndicator, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  } else {
    gsap.to(scrollIndicator, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  }
}

/* ========================================
   PART 8: DOCK MENU WITH DYNAMIC BEHAVIOR
   ======================================== */
function setupDockMenu() {
  const dockItems = document.querySelectorAll(".dock-item");

  dockItems.forEach((item) => {
    item.addEventListener("click", () => {
      const action = item.dataset.action;
      handleDockAction(action);
    });
  });

  // Setup dock blur overlay
  setupDockBlur();

  // Setup scroll-based dock behavior
  setupDynamicDock();

  console.log("✅ Dock menu setup complete");
}

function setupDockBlur() {
  const dock = document.getElementById("dockMenu");
  const blurOverlay = document.getElementById("dockBlurOverlay");

  if (!dock || !blurOverlay) return;

  dock.addEventListener("mouseenter", () => {
    blurOverlay.classList.add("active");
  });

  dock.addEventListener("mouseleave", () => {
    blurOverlay.classList.remove("active");
  });
}

function setupDynamicDock() {
  const dock = document.getElementById("dockMenu");
  const mainItems = document.querySelectorAll('[data-dock-type="main"]');
  const bottomItem = document.querySelector('[data-dock-type="bottom"]');

  if (!dock) return;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if at intro section (top ~100vh)
    const isAtIntro = scrollY < windowHeight * 0.8;

    // Check if at bottom (within last 200px of page)
    const isAtBottom = scrollY + windowHeight >= documentHeight - 200;

    if (isAtIntro) {
      // Show dock with main items only
      dock.classList.remove("hidden");
      mainItems.forEach((item) => item.classList.remove("hide-item"));
      if (bottomItem) bottomItem.classList.add("hide-item");
    } else if (isAtBottom) {
      // Show dock with back to top only
      dock.classList.remove("hidden");
      mainItems.forEach((item) => item.classList.add("hide-item"));
      if (bottomItem) bottomItem.classList.remove("hide-item");
    } else {
      // Hide dock completely in middle sections
      dock.classList.add("hidden");
    }
  });
}

function handleDockAction(action) {
  const blurOverlay = document.getElementById("dockBlurOverlay");

  // Remove blur when action is clicked
  if (blurOverlay) {
    blurOverlay.classList.remove("active");
  }

  switch (action) {
    case "hire":
      window.location.href = "../hire/hire.html";
      break;
    case "freelance":
      window.location.href = "../freelance/freelance.html";
      break;
    case "about":
      window.location.href = "../about/about.html";
      break;
    case "backtotop":
      const dock = document.getElementById("dockMenu");
      if (dock) {
        dock.style.pointerEvents = "none";
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        if (dock) {
          dock.style.pointerEvents = "auto";
        }
      }, 1000);
      break;
  }
}

/* ========================================
     PART 9: WINDOW RESIZE HANDLER
     ======================================== */

window.addEventListener("resize", () => {
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});

console.log("📦 Mentor page script loaded and ready!");
