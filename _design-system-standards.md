# Design System Standards - Santhosh Portfolio

## Typography
- **Font Family**: "Cascadia Code", "JetBrains Mono", monospace
- **Mono Theme**: Maintain monospace font across all pages

## Section Titles
```css
.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 5rem;
  letter-spacing: 0.05em;
  text-shadow: 0 0 40px var(--glow-color);
  text-transform: uppercase;
}
```

## Navigation Buttons
```css
.home-btn,
.social-btn,
.resume-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--primary-color);
}

.home-btn svg { width: 20px; height: 20px; }
.social-btn svg { width: 22px; height: 22px; }
.resume-btn svg { width: 18px; height: 18px; }

.resume-btn {
  width: auto;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
}

.home-btn:hover,
.social-btn:hover,
.resume-btn:hover {
  transform: scale(1.05) translateY(-2px);
  background: var(--bg-overlay);
  border-color: var(--primary-color);
  box-shadow: 0 5px 15px var(--border-color);
}
```

## Section Spacing
```css
section[data-section] {
  min-height: 80vh;
  padding: 8rem 2rem 5rem;
}
```

## Cards (Project/Testimonial/Case Study)
```css
.card {
  background: var(--bg-overlay);
  backdrop-filter: blur(20px);
  border: 2px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.4s ease;
}

.card:hover {
  border-color: var(--primary-color);
  transform: translateY(-10px);
  box-shadow: 0 10px 40px var(--glow-color);
}
```

## Dock Menu
```css
.dock-menu {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  background: rgba(15, 15, 15, 0.9);
  backdrop-filter: blur(20px);
  border: 2px solid var(--border-color);
  border-radius: 25px;
  padding: 1rem 1.5rem;
  z-index: 999;
}

.dock-icon {
  width: 50px;
  height: 50px;
  background: rgba(15, 15, 15, 0.8);
  border: 2px solid var(--border-color);
  border-radius: 12px;
}

.dock-icon:hover {
  border-color: var(--primary-color);
  background: rgba(0, 255, 65, 0.1);
  box-shadow: 0 0 20px var(--glow-color);
  transform: translateY(-5px);
}
```
