// Firebase Configuration
// Replace these values with your actual Firebase project credentials
// Get these from: Firebase Console > Project Settings > General > Your apps > Web app

const firebaseConfig = {
  apiKey: "AIzaSyAcisifYyPfZ2KSKidbo2pQVodv1b8_wpg",
  authDomain: "santhosh-portfolio-2e71a.firebaseapp.com",
  databaseURL: "https://santhosh-portfolio-2e71a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "santhosh-portfolio-2e71a",
  storageBucket: "santhosh-portfolio-2e71a.firebasestorage.app",
  messagingSenderId: "298572356953",
  appId: "1:298572356953:web:3a532041a520c216590048",
  measurementId: "G-S6FQVQC5B0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get reference to database
const database = firebase.database();

// Visitor tracking system
const VisitorTracker = {
  sessionId: null,
  presenceRef: null,

  // Generate unique session ID
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  // Initialize visitor tracking
  init() {
    this.sessionId = this.generateSessionId();
    this.presenceRef = database.ref(`visitors/${this.sessionId}`);

    // Set up presence system
    const connectedRef = database.ref('.info/connected');

    connectedRef.on('value', (snapshot) => {
      if (snapshot.val() === true) {
        // When connected, mark as online
        this.presenceRef.set({
          online: true,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        // When disconnected, remove this session
        this.presenceRef.onDisconnect().remove();
      }
    });

    // Listen for visitor count changes
    this.listenToVisitorCount();
  },

  // Listen to real-time visitor count
  listenToVisitorCount() {
    const visitorsRef = database.ref('visitors');

    visitorsRef.on('value', (snapshot) => {
      const visitors = snapshot.val();
      const onlineCount = visitors ? Object.keys(visitors).length : 0;

      // Update the UI
      const visitorCountElement = document.getElementById('visitorCount');
      if (visitorCountElement) {
        visitorCountElement.textContent = onlineCount;
      }
    });
  },

  // Clean up on page unload
  cleanup() {
    if (this.presenceRef) {
      this.presenceRef.remove();
    }
  }
};

// Initialize visitor tracking when page loads
if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
  // Initialize after a short delay to ensure DOM is ready
  setTimeout(() => {
    VisitorTracker.init();
  }, 1000);

  // Clean up when page is closed
  window.addEventListener('beforeunload', () => {
    VisitorTracker.cleanup();
  });
} else {
  console.warn('Firebase not initialized. Using fallback visitor count.');
  // Fallback to random number if Firebase is not configured
  setTimeout(() => {
    const visitorCountElement = document.getElementById('visitorCount');
    if (visitorCountElement && visitorCountElement.textContent === '--') {
      visitorCountElement.textContent = Math.floor(Math.random() * 150) + 50;
    }
  }, 1000);
}
