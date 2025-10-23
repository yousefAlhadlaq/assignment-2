# Technical Documentation

## Overview
This is a static simple personal portfolio website with **About**, **Projects**, and **Contact** sections.  
It was built with basic web technologies (HTML, CSS, JavaScript) as part of Assignment 1.

## Structure
The repository follows the guidelines provided on Blackboard.  
The most important files are:
- **index.html** → main structure of the site, containing the three sections.  
- **css/styles.css** → styling for layout, colors, typography, and responsiveness.  
- **js/script.js** → JavaScript logic for interactivity (dark mode toggle).  
Other supporting folders include:
- **assets/images/** for images.  
- **docs/** for documentation files (AI usage report and technical documentation).  
- **.gitignore** to keep unwanted files out of version control.  

## Responsiveness
The site works on desktop, tablet, and mobile.  
I used all three modern techniques:
- **CSS Grid** (mainly for project cards).  
- **Flexbox** (for navigation and smaller layout adjustments).  
- **Media queries** to adapt layout for smaller screens.  

## Interactivity
I implemented a **dark mode toggle button** using JavaScript.  
The toggle saves the user’s choice in `localStorage` and applies the correct theme on reload.  

## Accessibility
I made several choices to ensure accessibility:
- Added **labels** for all form inputs.  
- Ensured **strong color contrast** in both light and dark themes.  
- Used **alt text** for images.  
- Added a **screen-reader-only utility** to help hidden text remain accessible.  

## Testing
I tested the website by:
- **Resizing the browser** window to check responsiveness.  
- Using **DevTools device simulator** for mobile and tablet.  
- **Interacting with the form inputs** to confirm labels and required fields.  
- Checking the dark mode toggle to ensure it worked consistently.  

## Future Enhancements
If I had more time, I would:
- Add more sections (e.g., skills, hobbies, achievements).  
- Enhance the overall UI design for a more professional look.  
- Connect the **Contact form** to a backend service so it actually sends messages.  
- Add animations and transitions to improve user experience.  