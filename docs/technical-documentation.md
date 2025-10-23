# Technical Documentation

## Overview
This is an enhanced version of my Assignment 1 portfolio with interactive features.  
It includes **dynamic greeting**, **enhanced contact form**, and **smooth animations**.  
Built with HTML, CSS, and JavaScript for Assignment 2.

## Structure
The repository follows the assignment guidelines.  
The most important files are:
- **index.html** → main structure with About, Projects, and Contact sections.  
- **css/styles.css** → styling for layout, colors, animations, and responsiveness.  
- **js/script.js** → JavaScript for interactivity (greeting, form validation, animations).  
Other supporting folders include:
- **assets/images/** for images.  
- **docs/** for documentation files (AI usage report and technical documentation).  
- **.gitignore** to keep unwanted files out of version control.  

## Features Implemented

### Feature 1: Dynamic Time-Based Greeting
A greeting that changes based on the current time of day.  
- **Morning (6am-12pm):** "Good morning, Yousef! 🌅"  
- **Afternoon (12pm-6pm):** "Good afternoon, Yousef! ☀️"  
- **Evening (6pm-12am):** "Good evening, Yousef! 🌙"  
- **Late Night (12am-6am):** "Still coding, Yousef? 🌃"  

**How it works:**
- Uses JavaScript `Date` object to get current hour with `.getHours()`.
- Checks time ranges using if/else conditions.
- Updates the HTML element with `id="greeting"` using `.textContent`.
- Runs automatically when page loads.

### Feature 2: Enhanced Contact Form
A smart contact form with validation, auto-save, and user feedback.

**Validation:**
- Name must be at least 2 characters.
- Email must match valid format (uses regex pattern).
- Message must be 10-500 characters.
- Shows ✅ or ❌ icons as user types.
- Displays specific error messages below each field.

**Character Counter:**
- Shows "X / 500 characters" below message field.
- Updates in real-time as user types.
- Changes color when approaching limit.

**Auto-save to localStorage:**
- Saves form data every 3 seconds while user types.
- Loads saved draft when page refreshes.
- Shows "💾 Draft saved" indicator.
- Clears saved data after successful submit.

**Submit handling:**
- Validates all fields before allowing submit.
- Shows loading state on button ("Sending...").
- Displays success message with animation.
- Clears form after submission.

**How it works:**
- Event listeners on 'input' event for real-time validation.
- Regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` checks email format.
- `localStorage.setItem()` and `getItem()` for saving/loading data.
- `setTimeout()` for debouncing auto-save (waits 3 seconds after user stops typing).
- `JSON.stringify()` and `JSON.parse()` to convert data for storage.

### Feature 3: Smooth Animations
Animations throughout the site for better user experience.

**Scroll animations:**
- Sections fade in when they come into view.
- Uses Intersection Observer API to detect when elements are visible.
- Adds 'visible' class which triggers CSS animation.

**Hover effects:**
- Project cards lift up slightly on hover.
- Buttons scale larger on hover.
- Smooth transitions using CSS.

**Smooth scroll:**
- Clicking navigation links scrolls smoothly to sections.
- Uses `scrollIntoView({ behavior: 'smooth' })`.

**Form animations:**
- Input fields glow when focused.
- Success message slides in with fade effect.
- Loading spinner on submit button.

**How it works:**
- Intersection Observer watches sections and triggers animations when visible.
- CSS keyframe animations (@keyframes fadeIn, slideUp) define animation steps.
- CSS transitions for hover effects (transform, box-shadow).
- JavaScript adds/removes classes to trigger animations.

## Responsiveness
The site works on desktop, tablet, and mobile.  
I used the same responsive techniques from Assignment 1:
- **CSS Grid** (for project cards layout).  
- **Flexbox** (for navigation and form layout).  
- **Media queries** to adapt layout for smaller screens.  
All new features work responsively across all device sizes.

## Interactivity
I added three main interactive features:
- **Dynamic greeting** that updates based on time.
- **Real-time form validation** with instant feedback.
- **Scroll-triggered animations** using Intersection Observer.
The original **dark mode toggle** from Assignment 1 still works and is saved in localStorage.

## Data Handling
The contact form uses **localStorage** to save user data:
- Auto-saves draft every 3 seconds while typing.
- Restores draft when page reloads.
- Clears saved data after successful submission.
This prevents users from losing their work if they accidentally close the page.

## Browser Compatibility
I tested the website on:
- **Chrome**.
- **Safari**.
All features work correctly across these browsers.

## Accessibility
I maintained accessibility from Assignment 1:
- **Labels** for all form inputs.  
- **Strong color contrast** in both light and dark themes.  
- **Alt text** for images.  
- **Error messages** that are clear and helpful.
Added new accessibility features:
- **prefers-reduced-motion** support (animations can be disabled).
- **Keyboard navigation** works for all interactive elements.

## Testing
I tested the website by:
- **Typing in the form** with valid and invalid data to check validation.
- **Refreshing the page** to confirm localStorage saves and loads correctly.
- **Scrolling** to test fade-in animations.
- **Hovering** over project cards and buttons to check hover effects.
- **Changing system time** to test different greeting messages.
- **Using DevTools device simulator** for mobile and tablet.
- **Testing dark mode** to ensure all features work in both themes.

## Performance
The website loads quickly:
- No external libraries or frameworks.
- Small JavaScript file size.
- Animations use `transform` which is GPU-accelerated.
- Intersection Observer is more performant than scroll event listeners.

## Known Limitations
- Contact form doesn't actually send emails (no backend).
- localStorage has a limit (~5-10MB) but this is more than enough for form data.
- Intersection Observer not supported in Internet Explorer 11 (but IE11 is deprecated).
## Future Enhancements
If I continue this project, I would:
- Add a backend to actually send form submissions.
- Add more project filtering options (filter by category, search).
- Create a skills section with progress bars.
- Add more animations and micro-interactions.
- Implement automated testing for JavaScript functions.