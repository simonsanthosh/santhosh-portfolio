/* ========================================
   THEME LOADER - Load saved theme from homepage
======================================== */
(function loadTheme() {
  const savedTheme = localStorage.getItem("portfolioTheme") || "green";
  if (savedTheme !== "green") {
    document.body.classList.add(`theme-${savedTheme}`);
  }
})();

/* ========================================
   PART 1: DATA STRUCTURE & GLOBAL VARIABLES
======================================== */

// Journey Data
const journeyData = {
  experience: [
    {
      logo: "/assets/MINI_LOGO_1.png",
      company: "Parla Retail",
      location: "UK Based, Remote",
      dateRange: "MAY 2024 - Present",
      duration: "1 year 5 months",
      role: "UX/UI Designer",
      responsibilities: [
        "Designed omnichannel CTA system integrating calls, messaging & bookings — enhanced engagement across US/UK markets",
        "Revamped Show & Sell platform with video commerce — drove significant sales growth in US expansion",
        "Redesigned sales dashboard & scheduler — reduced booking complexity and improved productivity"
      ],
      projects: ["Show & Sell Platform", "Omnichannel CTA", "Customer Scheduler Appointment"],
      clients: ["/assets/NFM.png", "/assets/Troubadour.png", "/assets/HNDSM.png"],
      apps: []
    },
    {
      logo: "/assets/Intellemo_Logo.jpg",
      company: "Intellemo.AI",
      location: "Gurugram, India",
      dateRange: "OCT 2022 - APR 2024",
      duration: "1 year 6 months",
      role: "UX/UI Designer",
      responsibilities: [
        "Led UI architecture redesign achieving 25% increase in client engagement and ad sales through user-centered design",
        "Optimized billing & subscription model — boosted revenue via improved billing UX and value proposition",
        "Enhanced app usability — scaled downloads from 1K to 10K+ through improved interface and experience design"
      ],
      projects: ["Billing & Subscription", "AI Ad Campaign Feature", "Landing Pages for Small Businesses"],
      clients: ["/assets/UC.png", "/assets/Fabrento.png", "/assets/hoc.png"],
      apps: []
    },
    {
      logo: "/assets/IDF_Logo.jpeg",
      company: "Iconic Dream Focus",
      location: "Chennai, India",
      dateRange: "AUG 2020 - OCT 2022",
      duration: "2 years 2 months",
      role: "UX/UI Designer",
      responsibilities: [
        "Implemented agile design methodologies achieving 25% faster delivery while maintaining high-quality UX standards",
        "Designed DRMURS turned HyU social app from concept to launch — became company's flagship product with strong market reception",
        "TN Govt. redesign (Vandaloor Zoo) — secured 1st place for its UX concept and UI execution has gained popularity for the company"
      ],
      projects: ["HyU Social App", "Vandalur Zoo Redesign", "DRMURS App"],
      clients: [],
      apps: ["/assets/hyu.webp", "/assets/Drmurs.png"]
    }
  ],
  mentorship: [
    {
      logo: "/assets/fita.jpeg", // Update with your mentorship logo
      company: "UX Design Mentor",
      location: "Chennai, India",
      dateRange: "2024 - Present",
      duration: "2+ years",
      role: "UX Design Mentor",
      responsibilities: [
        "Mentored 70+ aspiring designers achieving 25+ placements through personalized guidance on portfolio, case studies, and career strategy",
        "Developed comprehensive UX design syllabus with AI tools integration and conducted hands-on workshops, mock interviews, and college seminars",
        "Promoted UX design education and career awareness through seminars while preparing students for industry roles with modern design workflows",
      ],
      projects: [], // Empty - we'll use timeline instead
      timeline: [ // NEW - Timeline data
        {
          institute: "FITA Academy",
          period: "2021 - 2022",
          logo: "/assets/fita.jpeg"
        },
        {
          institute: "SpaceZee",
          period: "2022 - 2023",
          logo: "/assets/spacezee.jpeg"
        },
        {
          institute: "Guvi",
          period: "2023 - 2024",
          logo: "/assets/guvi.png"
        }
      ],
      clients: [],
      apps: []
    }
  ],
  internship: [
    {
      logo: "/assets/IDF_Logo.jpeg", // Use Iconic Dream Focus logo
      company: "Iconic Dream Focus",
      location: "Chennai, India",
      dateRange: "MONTH YEAR - MONTH YEAR", // Update with actual dates
      duration: "X months",
      role: "Software Developer Intern",
      responsibilities: [
        "Learned HTML, CSS, and JavaScript fundamentals for web development",
        "Developed and launched the company's official website from scratch",
        "Led cross-functional team collaboration from design phase through development",
        "Managed and delivered the company's first complete project as team lead",
        "Coordinated design-to-development workflow ensuring quality and timely delivery"
      ],
      projects: ["Company Website", "First Client Project"],
      clients: [],
      apps: []
    },
    {
      logo: "/assets/icam.png", 
      company: "Summer Program",
      location: "Toulouse, France",
      dateRange: "JUNE 2018",
      duration: "1 month",
      role: "International Summer Program",
      responsibilities: [
        "Participated in intensive international summer program in Toulouse, France",
        "Gained cross-cultural experience and global perspective in technology",
        "Engaged in collaborative learning with international students",
        "Explored European tech innovation and development practices"
      ],
      projects: ["International Collaboration", "Cultural Exchange Program"],
      clients: [],
      apps: []
    }
  ],
  education: [
    {
      logo: "/assets/college.png",
      company: "Loyola-ICAM College of Engineering and Technology",
      location: "Chennai, India (Affiliated to Anna University)",
      dateRange: "2016 - 2020",
      duration: "4 years",
      role: "Bachelor of Technology, Information Technology (B.Tech IT)",
      responsibilities: [
        "Won first place in design challenge conducted by CSI (Computer Society of India)",
        "Demonstrated Projects: Pill Sorting Machine, Voice-Recognised Home appliances",
        "Final Year Project: Head Control Wheelchair - Led the team from documentation to demonstration"
      ],
      projects: [],
      clients: [],
      apps: []
    },
    {
      logo: "/assets/aspira.png",
      company: "Aspira Design",
      location: "Chennai, India",
      dateRange: "APR 2022 - AUG 2022",
      duration: "4 months",
      role: "Advanced UX/UI Design, Industrial and Product Design",
      responsibilities: [
        "Completed certification in Advanced UX/UI Design",
        "Learned Industrial and Product Design methodologies",
        "Enhanced design skills with professional training"
      ],
      projects: [],
      clients: [],
      apps: []
    }
  ]
};

// Skills Data
const skillsDataNew = {
  tools: [
    { name: 'Figma', logo: '/assets/Figma.png' },
    { name: 'Photoshop', logo: '/assets/photoshop.png' },
    { name: 'Illustrator', logo: '/assets/Illustrator.png' },
    { name: 'InDesign', logo: '/assets/indesign.png' },
    { name: 'Corel Draw', logo: '/assets/coreldraw.jpg' },
    { name: 'Framer', logo: '/assets/framer.png' },
    { name: 'Whimsical', logo: '/assets/whimsical.jpg' },
    { name: 'Miro', logo: '/assets/miro.png' },
    { name: 'Maze', logo: '/assets/maze.jpeg' },
    { name: 'Veo3', logo: '/assets/veo3.png' },
    { name: 'Flow', logo: '/assets/flow.png' },
    { name: 'Claude Code', logo: '/assets/claude.jpeg' }
  ],
  technical: [
    { name: 'HTML', icon: 'code' },
    { name: 'CSS', icon: 'palette' },
    { name: 'JavaScript', icon: 'zap' },
    { name: 'UX Research', icon: 'search' },
    { name: 'Qualitative Analysis', icon: 'message-circle' },
    { name: 'Quantitative Analysis', icon: 'trending-up' },
    { name: 'User Persona', icon: 'user' },
    { name: 'User Story', icon: 'file-text' },
    { name: 'Information Architecture', icon: 'layers' },
    { name: 'User Flow', icon: 'git-branch' },
    { name: 'UX Laws', icon: 'book-open' },
    { name: 'UI Design System', icon: 'grid' },
    { name: 'Branding System', icon: 'aperture' },
    { name: 'Wireframing', icon: 'layout' },
    { name: 'Prototyping', icon: 'cpu' },
    { name: 'Usability Testing', icon: 'check-circle' }
  ],
  soft: [
    { name: 'Leadership', icon: 'crown' },
    { name: 'Client Communication', icon: 'message-square' },
    { name: 'Team Collaboration', icon: 'users' },
    { name: 'Adaptability', icon: 'shuffle' },
    { name: 'Good Listener', icon: 'ear' }
  ]
};

/* ========================================
   RECOMMENDATIONS DATA
======================================== */
const recommendationsData = [
  {
    name: "Daniel Forbes",
    role: "Chief Technology Officer at Parla Retail",
    image: "/assets/Daniel.png",
    quote: "I had the pleasure of managing Santhosh as a UX/UI Designer at Parla Retail. He quickly proved himself to be reliable, creative, and thoughtful in his approach to design. Santhosh has a great eye for detail and a clear understanding of how to make products intuitive and user-friendly. His work always balanced good design with practical implementation, making it easy for developers and product managers to move projects forward. Just as importantly, he was a supportive teammate, open to feedback, collaborative, and always positive to work with. I am confident Santhosh will be a strong addition to any team, and I am happy to recommend him for future opportunities."
  },
  {
    name: "Ahobilesan Gurumurthy",
    role: "Senior Software Developer at Parla Retail",
    image: "/assets/Ahobi.png",
    quote: "Working alongside Santhosh has been exceptional. His designs are not just beautiful, they are developer-friendly and thoughtful. He bridges the gap between design and development effortlessly, always considering technical constraints while maintaining creative excellence. His collaborative approach and clear communication made our workflow seamless. Santhosh truly understands how to create designs that developers love to implement."
  },
  {
    name: "Chandresh Kamal",
    role: "Vice President at Intellemo.AI",
    image: "/assets/Chandresh.jpeg",
    quote: "Honouring Santhosh, our exceptional UX Designer! In just a year, he has revolutionised our approach with rapid design, innovative ideas, and user-centric solutions. His impact on our revenue growth has been profound, solidifying his position as a key player in our success story! Additionally, his exceptional communication skills and ability to translate ideas into impactful designs have been instrumental in our client relationships. A true asset to our company, we are grateful for his dedication and expertise!"
  },
  {
    name: "Raju Kumar",
    role: "Lead Designer at Intellemo.AI",
    image: "/assets/Raj.jpeg",
    quote: "Reporting directly to Santhosh, the Design Team Lead was an absolute privilege. His positive mindset and exceptional design skills have been a constant source of inspiration. Santhosh is not just a mentor but a visionary leader who consistently elevates our projects. His strategic use of UX methodologies has set a new standard for our product success, earning well-deserved appreciation. I wholeheartedly recommend him as a transformative mentor, skilled designer and calm leader."
  }
];

/* ========================================
   GLOBAL STATE VARIABLES
======================================== */
let currentIndex = 0;
let cardsArray = [];
let currentCategory = 'experience';
let currentDockSection = 'intro';
let scrollTimer = null;
let recCardsArray = [];
let currentRecIndex = 0;
let journeyAnimated = false;

/* ========================================
   PART 2: JOURNEY CARDS FUNCTIONS
======================================== */

function createCard(data, index) {
  const card = document.createElement('div');
  card.className = 'journey-card';
  card.dataset.index = index;
  card.innerHTML = `
    <div class="bento-container">
      <div class="bento-row bento-row-header">
        <div class="bento-block header-left-block">
          <div class="company-logo">
            <img src="${data.logo}" alt="${data.company}" onerror="this.style.display='none'">
          </div>
          <div class="company-info">
            <div class="company-name">${data.company}</div>
            <div class="location-wrapper">
              <svg class="globe-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span class="location-text">${data.location}</span>
            </div>
          </div>
        </div>
        <div class="bento-block header-right-block">
          <div class="role-title">${data.role}</div>
          <div class="date-range">${data.dateRange}</div>
        </div>
      </div>

      <div class="bento-row bento-row-responsibilities">
        <div class="bento-block responsibilities-block">
          <h4 class="section-header">Responsibilities</h4>
          <ul class="responsibilities-list">
            ${data.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="bento-row bento-row-bottom">
        ${data.timeline && data.timeline.length > 0 ? `
          <!-- MENTORSHIP: Timeline Block -->
          <div class="bento-block timeline-block">
            <h4 class="section-header">Timeline as Mentor</h4>
            <div class="timeline-grid">
              ${data.timeline.map(item => `
                <div class="timeline-item">
                  ${item.logo ? `
                    <div class="timeline-logo">
                      <img src="${item.logo}" alt="${item.institute}">
                    </div>
                  ` : ''}
                  <div class="timeline-institute">${item.institute}</div>
                  <div class="timeline-period">${item.period}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : `
          <!-- OTHERS: Normal Projects/Clients/Apps Blocks -->
          <div class="bento-block projects-block">
            ${data.projects && data.projects.length > 0 ? `
              <h4 class="section-header">Key Projects</h4>
              <div class="project-tags">
                ${data.projects.map(project => `<div class="project-tag">${project}</div>`).join('')}
              </div>
            ` : ''}
          </div>
          <div class="bento-block clients-block">
            ${data.clients && data.clients.length > 0 ? `
              <h4 class="section-header">Key Clients</h4>
              <div class="client-grid">
                ${data.clients.map(client => `
                  <div class="client-item-large">
                    <img src="${client}" alt="Client" onerror="this.style.display='none'">
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${data.apps && data.apps.length > 0 ? `
              <h4 class="section-header">Key Apps</h4>
              <div class="apps-grid">
                ${data.apps.map(app => `
                  <div class="app-item-large">
                    <img src="${app}" alt="App" onerror="this.style.display='none'">
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `}
      </div>
    </div>
  `;
  return card;
}

function renderJourneyTimeline() {
  const container = document.getElementById("journeyTimelineContainer");
  if (!container) {
    console.error('❌ Journey timeline container not found!');
    return;
  }

  container.innerHTML = '';

  // Render each category section
  const categories = [
    { key: 'experience', title: 'WORK EXPERIENCE' },
    { key: 'education', title: 'EDUCATION' },
    { key: 'mentorship', title: 'MENTORSHIP' },
    { key: 'internship', title: 'INTERNSHIP' }
  ];

  categories.forEach(category => {
    const data = journeyData[category.key];
    if (!data || data.length === 0) return;

    const section = document.createElement('div');
    section.className = 'category-section';
    section.innerHTML = `<h3 class="category-header">${category.title}</h3>`;

    data.forEach(item => {
      const entry = document.createElement('div');
      entry.className = 'timeline-entry';

      let institutesHTML = '';
      if (item.timeline && item.timeline.length > 0) {
        institutesHTML = `
          <div class="timeline-institutes">
            ${item.timeline.map(inst => `
              <div class="institute-item">
                ${inst.logo ? `<div class="institute-logo"><img src="${inst.logo}" alt="${inst.institute}"></div>` : ''}
                <div class="institute-name">${inst.institute}</div>
                <div class="institute-period">${inst.period}</div>
              </div>
            `).join('')}
          </div>
        `;
      }

      // Build clients section HTML
      let clientsHTML = '';
      if (item.clients && item.clients.length > 0) {
        clientsHTML = `
          <div class="entry-divider"></div>
          <div class="entry-clients">
            <div class="entry-section-title">CLIENTS</div>
            <div class="clients-grid">
              ${item.clients.map(client => `
                <div class="client-logo">
                  <img src="${client}" alt="Client" onerror="this.style.display='none'">
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      // Build projects section HTML
      let projectsHTML = '';
      if (item.projects && item.projects.length > 0) {
        projectsHTML = `
          <div class="entry-projects">
            <div class="entry-section-title">KEY PROJECTS</div>
            <div class="projects-list">
              ${item.projects.map(project => `
                <span class="project-badge">${project}</span>
              `).join('')}
            </div>
          </div>
        `;
      }

      entry.innerHTML = `
        <div class="entry-header">
          <div class="entry-left">
            <div class="entry-logo">
              <img src="${item.logo}" alt="${item.company}" onerror="this.style.display='none'">
            </div>
            <div class="entry-info">
              <h4 class="entry-title">${item.company}</h4>
              <div class="entry-role">${item.role}</div>
              <div class="entry-location">
                <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span>${item.location}</span>
              </div>
            </div>
          </div>
          <div class="entry-year">${item.dateRange}</div>
        </div>
        <ul class="entry-responsibilities">
          ${item.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
        </ul>
        ${projectsHTML}
        ${clientsHTML}
        ${institutesHTML}
      `;

      // Add data-reveal attribute for scroll animation
      entry.setAttribute('data-reveal', '');

      section.appendChild(entry);
    });

    container.appendChild(section);
  });

  console.log('✅ Journey timeline rendered!');
}

function updateCarouselPositions() {
  cardsArray.forEach((card, index) => {
    card.classList.remove('center', 'left', 'right', 'hidden');

    if (index === currentIndex) {
      card.classList.add('center');
    } else if (index === currentIndex - 1 || (currentIndex === 0 && index === cardsArray.length - 1)) {
      card.classList.add('left');
    } else if (index === currentIndex + 1 || (currentIndex === cardsArray.length - 1 && index === 0)) {
      card.classList.add('right');
    } else {
      card.classList.add('hidden');
    }
  });
}

function updateStackedCarouselPositions() {
  cardsArray.forEach((card, index) => {
    card.classList.remove('stacked-front', 'stacked-back', 'stacked-hidden');
    
    if (index === currentIndex) {
      card.classList.add('stacked-front');
    } else if (index === currentIndex + 1 || (currentIndex === cardsArray.length - 1 && index === 0)) {
      card.classList.add('stacked-back');
    } else {
      card.classList.add('stacked-hidden');
    }
  });
}

function animateCardsToPosition() {
  cardsArray.forEach((card) => {
    if (card.classList.contains('center')) {
      gsap.to(card, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotationY: 0,
        zIndex: 10,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true
      });
    } else if (card.classList.contains('left')) {
      gsap.to(card, {
        x: -450,
        y: 0,
        scale: 0.85,
        opacity: 0.6,
        rotationY: 25,
        zIndex: 9,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true
      });
    } else if (card.classList.contains('right')) {
      gsap.to(card, {
        x: 450,
        y: 0,
        scale: 0.85,
        opacity: 0.6,
        rotationY: -25,
        zIndex: 9,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true
      });
    } else {
      gsap.to(card, {
        opacity: 0,
        scale: 0.7,
        zIndex: 1,
        duration: 0.5,
        ease: 'power3.out',
        force3D: true
      });
    }
  });
}

function animateStackedCardsToPosition() {
  cardsArray.forEach((card) => {
    if (card.classList.contains('stacked-front')) {
      gsap.to(card, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotateY: 0,
        rotateZ: 0,
        filter: 'blur(0px)',
        zIndex: 10,
        duration: 0.8,
        ease: 'back.out(1.7)',
        force3D: true
      });
    } else if (card.classList.contains('stacked-back')) {
      gsap.to(card, {
        x: 80,
        y: 20,
        scale: 0.95,
        opacity: 0.6,
        rotateY: -8,
        rotateZ: 3,
        filter: 'blur(2px)',
        zIndex: 5,
        duration: 0.8,
        ease: 'back.out(1.7)',
        force3D: true
      });
    } else {
      gsap.to(card, {
        opacity: 0,
        scale: 0.8,
        zIndex: 1,
        duration: 0.5,
        ease: 'power3.out',
        force3D: true
      });
    }
  });
}

function animateCardsSlideIn() {
  journeyAnimated = true;
  
  cardsArray.forEach((card) => {
    if (card.classList.contains('center')) {
      gsap.fromTo(card, {
        opacity: 0,
        scale: 0.8,
        y: 100
      }, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotationY: 0,
        zIndex: 10,
        duration: 1.4,
        ease: 'elastic.out(1, 0.6)',
        force3D: true
      });
    } else if (card.classList.contains('left')) {
      gsap.fromTo(card, {
        x: -1000,
        opacity: 0,
        scale: 0.7
      }, {
        x: -450,
        y: 0,
        scale: 0.85,
        opacity: 0.6,
        rotationY: 25,
        zIndex: 9,
        duration: 1.2,
        delay: 0.3,
        ease: 'back.out(1.7)',
        force3D: true
      });
    } else if (card.classList.contains('right')) {
      gsap.fromTo(card, {
        x: 1000,
        opacity: 0,
        scale: 0.7
      }, {
        x: 450,
        y: 0,
        scale: 0.85,
        opacity: 0.6,
        rotationY: -25,
        zIndex: 9,
        duration: 1.2,
        delay: 0.3,
        ease: 'back.out(1.7)',
        force3D: true
      });
    }
  });
  
  // Animate arrows with bounce
  setTimeout(() => {
    gsap.to('.carousel-arrow', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(2)',
      stagger: 0.15
    });
    updateArrowsVisibility();
  }, 600);
}

function animateCardsSlideOut() {
  journeyAnimated = false;
  
  cardsArray.forEach((card) => {
    if (card.classList.contains('center')) {
      gsap.to(card, {
        opacity: 0,
        y: -100,
        scale: 0.8,
        duration: 0.8,
        ease: 'power3.in',
        force3D: true
      });
    } else if (card.classList.contains('left')) {
      gsap.to(card, {
        x: -1000,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.in',
        force3D: true
      });
    } else if (card.classList.contains('right')) {
      gsap.to(card, {
        x: 1000,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.in',
        force3D: true
      });
    }
  });
  
  // Hide arrows
  gsap.to('.carousel-arrow', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'power2.in'
  });
}

function animateStackedCardsSlideIn() {
  journeyAnimated = true;
  
  cardsArray.forEach((card) => {
    if (card.classList.contains('stacked-front')) {
      gsap.fromTo(card, {
        opacity: 0,
        scale: 0.8,
        y: 100,
        rotateZ: 0
      }, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotateY: 0,
        rotateZ: 0,
        filter: 'blur(0px)',
        zIndex: 10,
        duration: 1.4,
        ease: 'elastic.out(1, 0.6)',
        force3D: true
      });
    } else if (card.classList.contains('stacked-back')) {
      gsap.fromTo(card, {
        x: 150,
        opacity: 0,
        scale: 0.7,
        rotateZ: 5
      }, {
        x: 80,
        y: 20,
        scale: 0.95,
        opacity: 0.6,
        rotateY: -8,
        rotateZ: 3,
        filter: 'blur(2px)',
        zIndex: 5,
        duration: 1.2,
        delay: 0.3,
        ease: 'back.out(1.7)',
        force3D: true
      });
    }
  });
  
  // Animate arrows
  setTimeout(() => {
    gsap.to('.carousel-arrow', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(2)',
      stagger: 0.15
    });
    updateArrowsVisibility();
  }, 600);
}

function createNavigationArrows() {
  if (document.querySelector('.carousel-arrow')) return;

  const container = document.querySelector('.journey-section');

  const leftArrow = document.createElement('button');
  leftArrow.className = 'carousel-arrow arrow-left';
  leftArrow.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  `;
  leftArrow.addEventListener('click', navigatePrevious);
  gsap.set(leftArrow, { opacity: 0, scale: 0.8 });

  const rightArrow = document.createElement('button');
  rightArrow.className = 'carousel-arrow arrow-right';
  rightArrow.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  `;
  rightArrow.addEventListener('click', navigateNext);
  gsap.set(rightArrow, { opacity: 0, scale: 0.8 });

  container.appendChild(leftArrow);
  container.appendChild(rightArrow);
}

function updateArrowsVisibility() {
  const leftArrow = document.querySelector('.carousel-arrow.arrow-left');
  const rightArrow = document.querySelector('.carousel-arrow.arrow-right');
  
  console.log('Cards count:', cardsArray.length); // Debug log
  
  if (leftArrow && rightArrow) {
    if (cardsArray.length <= 1) {
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'none';
      console.log('✅ Arrows hidden');
    } else {
      leftArrow.style.display = 'flex';
      rightArrow.style.display = 'flex';
      console.log('✅ Arrows shown');
    }
  }
}

function navigateNext() {
  if (cardsArray.length === 0) return;

  const oldIndex = currentIndex;
  currentIndex = (currentIndex + 1) % cardsArray.length;

  // Use stacked or normal based on category
  if (currentCategory === 'internship') {
    updateStackedCarouselPositions();
  } else {
    updateCarouselPositions();
  }

  gsap.to(cardsArray[oldIndex], {
    rotationY: '+=360',
    duration: 0.6,
    ease: 'power2.inOut',
    force3D: true
  });

  // Use appropriate animation
  if (currentCategory === 'internship') {
    animateStackedCardsToPosition();
  } else {
    animateCardsToPosition();
  }
}

function navigatePrevious() {
  if (cardsArray.length === 0) return;

  const oldIndex = currentIndex;
  currentIndex = (currentIndex - 1 + cardsArray.length) % cardsArray.length;

  // Use stacked or normal based on category
  if (currentCategory === 'internship') {
    updateStackedCarouselPositions();
  } else {
    updateCarouselPositions();
  }

  gsap.to(cardsArray[oldIndex], {
    rotationY: '-=360',
    duration: 0.6,
    ease: 'power2.inOut',
    force3D: true
  });

  // Use appropriate animation
  if (currentCategory === 'internship') {
    animateStackedCardsToPosition();
  } else {
    animateCardsToPosition();
  }
}

function setupCardClicks() {
  cardsArray.forEach((card) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('left')) {
        navigatePrevious();
      } else if (card.classList.contains('right')) {
        navigateNext();
      }
    });
  });
}

function switchCategory(category) {
  if (category === currentCategory) return;

  gsap.to(cardsArray, {
    opacity: 0,
    scale: 0.9,
    duration: 0.3,
    onComplete: () => {
      renderJourneyCards(category);
      if (journeyAnimated) {
        setTimeout(() => {
          // Use appropriate animation based on category
          if (category === 'internship') {
            animateStackedCardsSlideIn();
          } else {
            animateCardsSlideIn();
          }
        }, 100);
      }
    }
  });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    navigatePrevious();
  } else if (e.key === 'ArrowRight') {
    navigateNext();
  }
});

/* ========================================
   PART 3: SKILLS SECTION FUNCTIONS
======================================== */

// Lucide Icons SVG Paths
const lucideIcons = {
  'code': '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
  'palette': '<circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>',
  'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
  'search': '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>',
  'message-circle': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>',
  'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
  'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
  'file-text': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line>',
  'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
  'git-branch': '<line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path>',
  'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>',
  'grid': '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
  'aperture': '<circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>',
  'layout': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>',
  'cpu': '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
  'crown': '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path>',
  'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
  'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  'shuffle': '<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>',
  'ear': '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"></path><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"></path>'
};

function createSkillCategory(category, index) {
  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'skill-category';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'category-title-text';
  titleDiv.textContent = category.title;

  const marqueeContainer = document.createElement('div');
  marqueeContainer.className = 'marquee-container';

  const marqueeTrack = document.createElement('div');
  marqueeTrack.className = 'marquee-track';

  const doubledSkills = [...category.skills, ...category.skills];

  doubledSkills.forEach(skill => {
    const marqueeItem = document.createElement('div');
    marqueeItem.className = 'marquee-item';

    if (skill.logo) {
      marqueeItem.innerHTML = `
        <img src="${skill.logo}" alt="${skill.name}" class="skill-logo-img" onerror="this.style.display='none'">
        <span>${skill.name}</span>
      `;
    } else if (skill.icon && lucideIcons[skill.icon]) {
      marqueeItem.innerHTML = `
        <svg class="skill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${lucideIcons[skill.icon]}
        </svg>
        <span>${skill.name}</span>
      `;
    } else {
      const skillName = typeof skill === 'object' ? skill.name : skill;
      const firstLetter = skillName.charAt(0).toUpperCase();
      marqueeItem.innerHTML = `
        <div class="skill-icon-small">${firstLetter}</div>
        <span>${skillName}</span>
      `;
    }

    marqueeTrack.appendChild(marqueeItem);
  });

  marqueeContainer.appendChild(marqueeTrack);
  categoryDiv.appendChild(titleDiv);
  categoryDiv.appendChild(marqueeContainer);

  return categoryDiv;
}

function renderSkillsWithMarquee() {
  const skillsSection = document.querySelector('.skills-section');
  if (!skillsSection) {
    console.error('❌ Skills section not found!');
    return;
  }

  const oldGrid = skillsSection.querySelector('.skills-grid');
  if (oldGrid) oldGrid.remove();

  const oldTitles = skillsSection.querySelector('.skills-titles-container');
  if (oldTitles) oldTitles.remove();

  const titlesContainer = document.createElement('div');
  titlesContainer.className = 'skills-titles-container';

  const categories = [
    {
      title: 'TOOLS KNOWLEDGE',
      skills: skillsDataNew.tools
    },
    {
      title: 'TECHNICAL KNOWLEDGE',
      skills: skillsDataNew.technical
    },
    {
      title: 'SOFT SKILLS',
      skills: skillsDataNew.soft
    }
  ];

  categories.forEach((category, index) => {
    const categoryDiv = createSkillCategory(category, index);
    titlesContainer.appendChild(categoryDiv);
  });

  skillsSection.appendChild(titlesContainer);

  console.log('✅ Skills marquee rendered!');
}

/* ========================================
   PART 4: RECOMMENDATIONS SECTION FUNCTIONS
======================================== */

let recommendationsAnimated = false;

function createRecommendationCard(data, index) {
  const sentences = data.quote.match(/[^.!?]+[.!?]+/g) || [data.quote];
  let paragraphs = [];
  
  for (let i = 0; i < sentences.length; i += 2) {
    const paragraph = sentences.slice(i, i + 2).join(' ');
    paragraphs.push(paragraph.trim());
  }

  const card = document.createElement('div');
  card.className = 'recommendation-card';
  card.dataset.index = index;
  
  card.innerHTML = `
    <div class="rec-header">
      <img src="${data.image}" alt="${data.name}" class="rec-profile-img" onerror="this.src='/assets/default-profile.jpg'">
      <div class="rec-info">
        <div class="rec-name">${data.name}</div>
        <div class="rec-role">${data.role}</div>
      </div>
    </div>
    <div class="rec-quote">
      <svg class="quote-icon quote-start" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
      </svg>
      ${paragraphs.map(p => `<p class="quote-paragraph">${p}</p>`).join('')}
      <svg class="quote-icon quote-end" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
      </svg>
    </div>
  `;
  
  return card;
}

function renderRecommendationsGrid() {
  const container = document.getElementById('recommendationsGrid');
  if (!container) {
    console.error('❌ Recommendations grid container not found!');
    return;
  }

  container.innerHTML = '';

  // Best phrases extracted for each recommendation
  const bestPhrases = [
    "His work always balanced good design with practical implementation",
    "Bridges the gap between design and development effortlessly",
    "His impact on our revenue growth has been profound",
    "Not just a mentor but a visionary leader"
  ];

  recommendationsData.forEach((rec, index) => {
    const card = document.createElement('div');
    card.className = 'review-card';

    const starIcons = `
      <svg class="star-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    `.repeat(5);

    card.innerHTML = `
      <div class="review-header">
        <img src="${rec.image}" alt="${rec.name}" class="review-avatar" onerror="this.src='/assets/default-profile.jpg'">
        <div class="review-info">
          <div class="review-info-top">
            <h4 class="review-name">${rec.name}</h4>
            <div class="review-stars">${starIcons}</div>
          </div>
          <p class="review-role">${rec.role}</p>
        </div>
      </div>
      <div class="review-content">
        <h5 class="review-title">"${bestPhrases[index]}"</h5>
        <p class="review-text">${rec.quote}</p>
        <button class="review-read-more">
          Read more
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
    `;

    // Add click handler for "Read more"
    const readMoreBtn = card.querySelector('.review-read-more');
    readMoreBtn.addEventListener('click', () => {
      card.classList.toggle('expanded');
      readMoreBtn.textContent = card.classList.contains('expanded') ? 'Show less' : 'Read more';
      readMoreBtn.innerHTML = card.classList.contains('expanded')
        ? 'Show less <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>'
        : 'Read more <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>';
    });

    container.appendChild(card);
  });

  console.log('✅ Recommendations grid rendered!');
}

function updateRecCardPositions() {
  recCardsArray.forEach((card, index) => {
    card.classList.remove('center', 'left', 'right', 'hidden');
    
    if (index === currentRecIndex) {
      card.classList.add('center');
    } else if (index === currentRecIndex - 1 || (currentRecIndex === 0 && index === recCardsArray.length - 1)) {
      card.classList.add('left');
    } else if (index === currentRecIndex + 1 || (currentRecIndex === recCardsArray.length - 1 && index === 0)) {
      card.classList.add('right');
    } else {
      card.classList.add('hidden');
    }
  });
}

function animateRecCardsToPosition() {
  recCardsArray.forEach((card) => {
    if (card.classList.contains('center')) {
      gsap.to(card, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotationY: 0,
        zIndex: 10,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true
      });
    } else if (card.classList.contains('left')) {
      gsap.to(card, {
        x: -650,
        y: 0,
        scale: 0.85,
        opacity: 0.4,
        rotationY: 25,
        zIndex: 5,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true
      });
    } else if (card.classList.contains('right')) {
      gsap.to(card, {
        x: 650,
        y: 0,
        scale: 0.85,
        opacity: 0.4,
        rotationY: -25,
        zIndex: 5,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true
      });
    } else {
      gsap.to(card, {
        opacity: 0,
        scale: 0.7,
        zIndex: 1,
        duration: 0.5,
        ease: 'power3.out',
        force3D: true
      });
    }
  });
}

function animateRecCardsSlideIn() {
  recommendationsAnimated = true;
  
  recCardsArray.forEach((card) => {
    if (card.classList.contains('center')) {
      gsap.fromTo(card, {
        opacity: 0,
        scale: 0.8,
        y: 100
      }, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotationY: 0,
        zIndex: 10,
        duration: 1.4,
        ease: 'elastic.out(1, 0.6)',
        force3D: true
      });
    } else if (card.classList.contains('left')) {
      gsap.fromTo(card, {
        x: -1000,
        opacity: 0,
        scale: 0.7
      }, {
        x: -650,
        y: 0,
        scale: 0.85,
        opacity: 0.4,
        rotationY: 25,
        zIndex: 5,
        duration: 1.2,
        delay: 0.3,
        ease: 'back.out(1.7)',
        force3D: true
      });
    } else if (card.classList.contains('right')) {
      gsap.fromTo(card, {
        x: 1000,
        opacity: 0,
        scale: 0.7
      }, {
        x: 650,
        y: 0,
        scale: 0.85,
        opacity: 0.4,
        rotationY: -25,
        zIndex: 5,
        duration: 1.2,
        delay: 0.3,
        ease: 'back.out(1.7)',
        force3D: true
      });
    }
  });
  
  // Animate arrows
  setTimeout(() => {
    gsap.to('.rec-arrow', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(2)',
      stagger: 0.15
    });
  }, 600);
}

function animateRecCardsSlideOut() {
  recommendationsAnimated = false;
  
  recCardsArray.forEach((card) => {
    if (card.classList.contains('center')) {
      gsap.to(card, {
        opacity: 0,
        y: -100,
        scale: 0.8,
        duration: 0.8,
        ease: 'power3.in',
        force3D: true
      });
    } else if (card.classList.contains('left')) {
      gsap.to(card, {
        x: -1000,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.in',
        force3D: true
      });
    } else if (card.classList.contains('right')) {
      gsap.to(card, {
        x: 1000,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.in',
        force3D: true
      });
    }
  });
  
  gsap.to('.rec-arrow', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'power2.in'
  });
}

function navigateRecNext() {
  if (recCardsArray.length === 0) return;
  
  const oldIndex = currentRecIndex;
  currentRecIndex = (currentRecIndex + 1) % recCardsArray.length;
  
  updateRecCardPositions();
  
  gsap.to(recCardsArray[oldIndex], {
    rotationY: '+=360',
    duration: 0.6,
    ease: 'power2.inOut',
    force3D: true
  });
  
  animateRecCardsToPosition();
}

function navigateRecPrev() {
  if (recCardsArray.length === 0) return;
  
  const oldIndex = currentRecIndex;
  currentRecIndex = (currentRecIndex - 1 + recCardsArray.length) % recCardsArray.length;
  
  updateRecCardPositions();
  
  gsap.to(recCardsArray[oldIndex], {
    rotationY: '-=360',
    duration: 0.6,
    ease: 'power2.inOut',
    force3D: true
  });
  
  animateRecCardsToPosition();
}

function setupRecCardClicks() {
  recCardsArray.forEach((card) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('left')) {
        navigateRecPrev();
      } else if (card.classList.contains('right')) {
        navigateRecNext();
      }
    });
  });
}

function setupRecArrowButtons() {
  const prevBtn = document.getElementById('recPrevBtn');
  const nextBtn = document.getElementById('recNextBtn');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', navigateRecPrev);
    gsap.set(prevBtn, { opacity: 0, scale: 0.8 });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', navigateRecNext);
    gsap.set(nextBtn, { opacity: 0, scale: 0.8 });
  }
}

/* ========================================
   PART 5: INTRO SECTION WAVE ANIMATION
======================================== */

function animateIntroSection() {
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
    // Goal section - Fade up smoothly
    .to('.intro-goal', {
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
}

/* ========================================
   PART 6: NAVIGATION, SOCIAL LINKS & HEADER
======================================== */

document.getElementById("homeBtn").addEventListener("click", () => {
  // Set flag to skip loader on homepage
  sessionStorage.setItem("returningHome", "true");
  window.location.href = "../index.html";
});

document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const link = btn.dataset.link;
    switch (link) {
      case "linkedin":
        window.open("https://www.linkedin.com/in/santhosh-designer/", "_blank");
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

function handleHeaderVisibility() {
  const nav = document.getElementById('aboutNav');
  
  if (!nav) return;

  const currentScrollY = window.scrollY;

  // Fade out immediately when scrolling down from top
  if (currentScrollY > 100) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
}

function handleScrollIndicatorVisibility() {
  const scrollIndicator = document.getElementById('scrollIndicator');
  
  if (!scrollIndicator) return;

  // Hide after scrolling 200px down
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
}

/* ========================================
   PART 7: DOCK CONFIGURATION & DYNAMIC DOCK
======================================== */

const dockConfig = {
  intro: [
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
      label: 'Hire Me',
      action: 'hire'
    },
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
      label: 'Need Mentor',
      action: 'mentorship'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-ruler-icon lucide-pencil-ruler"><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m18 16 2-2"/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>',
      label: 'Freelancing Support',
      action: 'freelance'
    }
  ],
  journey: [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-star-icon lucide-user-star"><path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/><path d="M8 15H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/></svg>',
      label: 'Experience',
      action: 'experience',
      category: 'experience'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-goal-icon lucide-goal"><path d="M12 13V2l8 4-8 4"/><path d="M20.561 10.222a9 9 0 1 1-12.55-5.29"/><path d="M8.002 9.997a5 5 0 1 0 8.9 2.02"/></svg>',
      label: 'Mentorship',
      action: 'mentorship-cat',
      category: 'mentorship'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-badge2-icon lucide-file-badge-2"><path d="m13.69 12.479 1.29 4.88a.5.5 0 0 1-.697.591l-1.844-.849a1 1 0 0 0-.88.001l-1.846.85a.5.5 0 0 1-.693-.593l1.29-4.88"/><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><circle cx="12" cy="10" r="3"/></svg>',
      label: 'Internship',
      action: 'internship',
      category: 'internship'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-university-icon lucide-university"><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 12h.01"/><path d="M18 16h.01"/><path d="M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"/><path d="M6 12h.01"/><path d="M6 16h.01"/><circle cx="12" cy="10" r="2"/></svg>',
      label: 'Education',
      action: 'education',
      category: 'education'
    }
  ],
  recommendations: [
    {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>',
      label: 'Back to Top',
      action: 'backtotop'
    }
  ]
};

function initDynamicDock() {
  const dock = document.getElementById('dockMenu');

  // Initial render
  updateDockForSection('intro');

  let lastScrollTime = 0;

  window.addEventListener('scroll', () => {
    const now = Date.now();
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (now - lastScrollTime > 16) {
      lastScrollTime = now;
      requestAnimationFrame(() => {
        // Auto-hide dock behavior (like mentor.html)
        const isAtIntro = scrollY < windowHeight * 0.8;
        const isAtBottom = scrollY + windowHeight >= documentHeight - 200;

        const mainItems = dock.querySelectorAll('.dock-item:not([data-action="backtotop"])');
        const bottomItem = dock.querySelector('.dock-item[data-action="backtotop"]');

        if (isAtIntro) {
          // Show dock with main items only at top
          dock.classList.remove('hidden');
          mainItems.forEach(item => item.classList.remove('hide-item'));
          if (bottomItem) bottomItem.classList.add('hide-item');
        } else if (isAtBottom) {
          // Show dock with back to top only at bottom
          dock.classList.remove('hidden');
          mainItems.forEach(item => item.classList.add('hide-item'));
          if (bottomItem) bottomItem.classList.remove('hide-item');
        } else {
          // Hide dock completely in middle sections
          dock.classList.add('hidden');
        }

        // Continue with other scroll handlers
        handleHeaderVisibility();
        handleScrollIndicatorVisibility();
        revealElementsOnScroll();
      });
    }
  }, { passive: true });
}

function updateDockForSection(sectionName) {
  const dock = document.getElementById('dockMenu');

  // Render all dock items (intro items + back to top)
  const allItems = [...dockConfig.intro, ...dockConfig.recommendations];

  dock.innerHTML = allItems.map(item => `
    <button class="dock-item ${item.action === 'backtotop' ? 'hide-item' : ''}"
      data-action="${item.action}"
      ${item.category ? `data-category="${item.category}"` : ''}
      title="${item.label}">
      ${item.icon}
      <span class="dock-item-label">${item.label}</span>
    </button>
  `).join('');

  attachDockListeners();
}

function attachDockListeners(sectionName) {
  const dockItems = document.querySelectorAll('.dock-item');
  const blurOverlay = document.getElementById('dockBlurOverlay');
  
  dockItems.forEach(item => {
      item.addEventListener('click', () => {
          const action = item.dataset.action;
          const category = item.dataset.category;
          
          dockItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          
          // Remove blur when clicking dock items
          if (blurOverlay) {
              blurOverlay.classList.remove('active');
          }
          
          if (sectionName === 'journey' && category) {
              switchCategory(category);
          } else {
              handleDockAction(action);
          }
      });
  });
  
  // SET ACTIVE BASED ON CURRENT CATEGORY - UPDATED LOGIC
  if (sectionName === 'journey') {
      // Find the dock item matching currentCategory
      const activeItem = Array.from(dockItems).find(item => item.dataset.category === currentCategory);
      if (activeItem) {
          activeItem.classList.add('active');
      } else if (dockItems.length > 0) {
          dockItems[0].classList.add('active'); // Fallback
      }
  } else {
      // For non-journey sections, activate first item
      if (dockItems.length > 0) {
          dockItems[0].classList.add('active');
      }
  }
}

function handleDockAction(action) {
  switch(action) {
    case 'hire':
      window.location.href = '../hire/hire.html';
      break;
    case 'mentorship':
      // Navigate to mentor page
      window.location.href = '../mentor/mentor.html';
      break;
    case 'freelance':
      window.location.href = '../freelance/freelance.html';
      break;
    case 'backtotop':
      const dock = document.getElementById('dockMenu');
      const blurOverlay = document.getElementById('dockBlurOverlay');
      
      if (blurOverlay) {
        blurOverlay.classList.remove('active');
      }
      
      if (dock) {
        dock.style.pointerEvents = 'none';
      }
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        if (dock) {
          dock.style.pointerEvents = 'auto';
        }
      }, 2500);
      break;
  }
}
function setupDockBlur() {
  const dock = document.getElementById('dockMenu');
  const blurOverlay = document.getElementById('dockBlurOverlay');

  if (!dock || !blurOverlay) return;

  dock.addEventListener('mouseenter', () => {
    blurOverlay.classList.add('active');
  });

  dock.addEventListener('mouseleave', () => {
    blurOverlay.classList.remove('active');
  });
}

/* ========================================
   PART 8: SCROLL REVEAL & INITIALIZATION
======================================== */

function revealElementsOnScroll() {
  const windowHeight = window.innerHeight;

  // Reveal skill categories
  const skillCategories = document.querySelectorAll('.skill-category');
  skillCategories.forEach((category) => {
    const rect = category.getBoundingClientRect();
    if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
      category.classList.add('revealed');
    } else {
      category.classList.remove('revealed');
    }
  });

  // Reveal journey category sections
  const categorySections = document.querySelectorAll('.category-section');
  categorySections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < windowHeight * 0.8) {
      section.classList.add('revealed');
    }
  });

  // Reveal review cards
  const reviewCards = document.querySelectorAll('.review-card');
  reviewCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < windowHeight * 0.8) {
      setTimeout(() => {
        card.classList.add('revealed');
      }, index * 150); // Stagger the reveal
    }
  });

  // Reveal main sections
  const sections = document.querySelectorAll('.journey-section, .skills-section, .recommendations-section');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
      section.classList.add('revealed');
    } else {
      section.classList.remove('revealed');
    }
  });
}

function setupScrollTriggers() {
  // Simplified scroll triggers - no complex carousel animations needed
  console.log('✅ Scroll triggers initialized');
}

/* ========================================
   SCROLL REVEAL ANIMATION (ATM App Style)
======================================== */
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
  console.log('✅ Scroll reveal initialized with', reveals.length, 'elements');
}


/* ========================================
   RESUME MODAL FUNCTIONS
   ======================================== */
   function openResumeModal() {
    const overlay = document.getElementById('resumeModalOverlay');
    const body = document.body;
    const filenameInput = document.getElementById('resumeFilename');
    
    if (overlay) {
      overlay.classList.add('active');
      body.style.overflow = 'hidden';
      
      // Set default filename in input
      if (filenameInput && !filenameInput.value) {
        filenameInput.value = 'Santhosh_UX_Designer_Resume';
      }
      
      console.log('✅ Resume modal opened!');
    }
  }
  
  function closeResumeModal() {
    const overlay = document.getElementById('resumeModalOverlay');
    const body = document.body;
    
    if (overlay) {
      overlay.classList.remove('active');
      body.style.overflow = 'auto';
      console.log('❌ Resume modal closed!');
    }
  }
  
  function downloadResume() {
    const filenameInput = document.getElementById('resumeFilename');
    let filename = 'Santhosh_UX_Designer_Resume'; // Default
    
    // Get custom filename if provided
    if (filenameInput && filenameInput.value.trim()) {
      filename = filenameInput.value.trim();
      // Remove any file extension user might have added
      filename = filename.replace(/\.pdf$/i, '');
    }
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = '/assets/Santhosh_Resume.pdf'; // UPDATE THIS PATH if needed
    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`⬇️ Resume download initiated: ${filename}.pdf`);
  }
  
  // Setup Resume Modal Listeners
  function setupResumeModal() {
    const resumeBtn = document.getElementById('resumeBtn');
    const closeIcon = document.getElementById('resumeCloseIcon');
    const downloadIcon = document.getElementById('resumeDownloadIcon');
    const overlay = document.getElementById('resumeModalOverlay');
    const filenameInput = document.getElementById('resumeFilename');
    
    // Open modal
    if (resumeBtn) {
      resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openResumeModal();
      });
    }
    
    // Close modal - close icon
    if (closeIcon) {
      closeIcon.addEventListener('click', closeResumeModal);
    }
    
    // Close modal - click outside
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeResumeModal();
        }
      });
    }
    
    // Download icon
    if (downloadIcon) {
      downloadIcon.addEventListener('click', downloadResume);
    }
    
    // Allow Enter key to trigger download
    if (filenameInput) {
      filenameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          downloadResume();
        }
      });
    }
    
    // Close with ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeResumeModal();
      }
    });
    
    console.log('✅ Resume modal listeners setup!');
  }

/* ========================================
   INITIALIZE ON LOAD
======================================== */

window.addEventListener("load", () => {
  console.log("🔥 Page loaded!");
  
  const terminalLoader = document.getElementById("terminalLoader");
  const aboutWrapper = document.getElementById("aboutWrapper");

  setTimeout(() => {
    if (terminalLoader) {
      terminalLoader.classList.add("fade-out");
    }

    if (aboutWrapper) {
      aboutWrapper.classList.add("visible");
    }

    setTimeout(() => {
      try {
        if (typeof gsap !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        }

        // Animate intro
        animateIntroSection();

        // Render all sections
        console.log("🔄 Rendering sections...");
        renderJourneyTimeline();
        renderSkillsWithMarquee();
        renderRecommendationsGrid();

        // Setup ScrollTriggers for animations
        setupScrollTriggers();

        // Initialize scroll reveal animations
        initScrollReveal();

        // Initialize dock
        initDynamicDock();
        setupDockBlur();
        handleHeaderVisibility();
        setupResumeModal();

        console.log("✅ Portfolio initialized successfully!");
      } catch (error) {
        console.error("❌ Initialization error:", error);
      }
    }, 300);
  }, 1500);
});

window.addEventListener('resize', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});

console.log("📦 Portfolio script loaded and ready!");