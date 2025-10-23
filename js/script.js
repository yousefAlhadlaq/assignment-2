console.log("Portfolio loaded");

/**
 * Displays a dynamic greeting based on the current time of day
 * Time ranges:
 * - 6am-12pm: Morning greeting with sunrise emoji
 * - 12pm-6pm: Afternoon greeting with sun emoji
 * - 6pm-12am: Evening greeting with moon emoji
 * - 12am-6am: Late night greeting with night city emoji
 */
function displayTimeBasedGreeting() {
  // Get the greeting element from the DOM
  const greetingElement = document.getElementById("greeting");

  // If the greeting element doesn't exist, exit the function
  if (!greetingElement) {
    console.error("Greeting element not found");
    return;
  }

  // Get the current date and time
  const now = new Date();

  // Extract the current hour (0-23)
  const currentHour = now.getHours();

  // Variable to store the appropriate greeting message
  let greetingMessage = "";

  // Determine which greeting to display based on the current hour
  if (currentHour >= 6 && currentHour < 12) {
    // Morning: 6am to 11:59am
    greetingMessage = "Good morning, Yousef! 🌅";
  } else if (currentHour >= 12 && currentHour < 18) {
    // Afternoon: 12pm to 5:59pm
    greetingMessage = "Good afternoon, Yousef! ☀️";
  } else if (currentHour >= 18 && currentHour < 24) {
    // Evening: 6pm to 11:59pm
    greetingMessage = "Good evening, Yousef! 🌙";
  } else {
    // Late night/Early morning: 12am to 5:59am
    greetingMessage = "Still coding, Yousef? 🌃";
  }

  // Set the greeting message as the text content of the greeting element
  greetingElement.textContent = greetingMessage;
}

// Call the greeting function when the page loads
displayTimeBasedGreeting();

// Theme toggle functionality
document.getElementById("themeToggle").addEventListener("click", () => {
  const r = document.documentElement;
  const dark = r.dataset.theme === "dark";
  if (dark) { r.removeAttribute("data-theme"); localStorage.removeItem("theme"); }
  else { r.dataset.theme = "dark"; localStorage.setItem("theme", "dark"); }
});

// ============================================================================
// CONTACT FORM ENHANCEMENT
// ============================================================================

/**
 * Contact Form Manager
 * Handles validation, localStorage, character counting, and form submission
 */

// Get all form elements
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("contactName");
const emailInput = document.getElementById("contactEmail");
const messageInput = document.getElementById("contactMessage");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");
const sendAnotherBtn = document.getElementById("sendAnotherBtn");

// Get validation indicator elements
const nameValidation = document.getElementById("nameValidation");
const emailValidation = document.getElementById("emailValidation");
const messageValidation = document.getElementById("messageValidation");

// Get error message elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// Get character counter and draft indicator
const charCounter = document.getElementById("charCounter");
const draftIndicator = document.getElementById("draftIndicator");

// Auto-save timer variable
let autoSaveTimer = null;

// localStorage key for saving form data
const FORM_DATA_KEY = "contactFormDraft";

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates the name field
 * Requirements: At least 2 characters
 * @param {string} name - The name to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
function validateName(name) {
  // Remove leading/trailing whitespace
  const trimmedName = name.trim();

  // Check if empty
  if (trimmedName.length === 0) {
    return {
      isValid: false,
      message: "Name is required"
    };
  }

  // Check minimum length
  if (trimmedName.length < 2) {
    return {
      isValid: false,
      message: "Name must be at least 2 characters"
    };
  }

  // Valid name
  return {
    isValid: true,
    message: ""
  };
}

/**
 * Validates the email field
 * Requirements: Valid email format (using regex)
 * @param {string} email - The email to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
function validateEmail(email) {
  // Remove leading/trailing whitespace
  const trimmedEmail = email.trim();

  // Check if empty
  if (trimmedEmail.length === 0) {
    return {
      isValid: false,
      message: "Email is required"
    };
  }

  // Regular expression for basic email validation
  // Format: text@text.text
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test if email matches the pattern
  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      message: "Please enter a valid email address"
    };
  }

  // Valid email
  return {
    isValid: true,
    message: ""
  };
}

/**
 * Validates the message field
 * Requirements: 10-500 characters
 * @param {string} message - The message to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
function validateMessage(message) {
  // Remove leading/trailing whitespace
  const trimmedMessage = message.trim();

  // Check if empty
  if (trimmedMessage.length === 0) {
    return {
      isValid: false,
      message: "Message is required"
    };
  }

  // Check minimum length
  if (trimmedMessage.length < 10) {
    return {
      isValid: false,
      message: `Message must be at least 10 characters (currently ${trimmedMessage.length})`
    };
  }

  // Check maximum length
  if (trimmedMessage.length > 500) {
    return {
      isValid: false,
      message: "Message must not exceed 500 characters"
    };
  }

  // Valid message
  return {
    isValid: true,
    message: ""
  };
}

// ============================================================================
// UI UPDATE FUNCTIONS
// ============================================================================

/**
 * Updates the validation indicator for a field
 * Shows ✅ for valid, ❌ for invalid
 * @param {HTMLElement} indicator - The validation icon element
 * @param {boolean} isValid - Whether the field is valid
 */
function updateValidationIcon(indicator, isValid) {
  if (isValid) {
    indicator.textContent = "✅";
    indicator.className = "validation-icon valid";
  } else {
    indicator.textContent = "❌";
    indicator.className = "validation-icon invalid";
  }
}

/**
 * Updates the error message for a field
 * @param {HTMLElement} errorElement - The error message element
 * @param {string} message - The error message to display
 */
function updateErrorMessage(errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = message ? "block" : "none";
}

/**
 * Updates the character counter for the message field
 * Changes color when approaching the limit
 */
function updateCharacterCounter() {
  const currentLength = messageInput.value.length;
  const maxLength = 500;

  // Update counter text
  charCounter.textContent = `${currentLength} / ${maxLength} characters`;

  // Change color based on character count
  if (currentLength > 450) {
    // Red when very close to limit
    charCounter.className = "char-counter danger";
  } else if (currentLength > 400) {
    // Orange when approaching limit
    charCounter.className = "char-counter warning";
  } else {
    // Normal color
    charCounter.className = "char-counter";
  }
}

// ============================================================================
// REAL-TIME VALIDATION
// ============================================================================

/**
 * Validates the name field in real-time as user types
 */
function validateNameField() {
  const validation = validateName(nameInput.value);

  // Update validation icon
  if (nameInput.value.length > 0) {
    updateValidationIcon(nameValidation, validation.isValid);
  } else {
    nameValidation.textContent = "";
  }

  // Update error message
  updateErrorMessage(nameError, validation.isValid ? "" : validation.message);

  // Update input border color
  if (nameInput.value.length > 0) {
    nameInput.className = validation.isValid ? "valid" : "invalid";
  } else {
    nameInput.className = "";
  }

  return validation.isValid;
}

/**
 * Validates the email field in real-time as user types
 */
function validateEmailField() {
  const validation = validateEmail(emailInput.value);

  // Update validation icon
  if (emailInput.value.length > 0) {
    updateValidationIcon(emailValidation, validation.isValid);
  } else {
    emailValidation.textContent = "";
  }

  // Update error message
  updateErrorMessage(emailError, validation.isValid ? "" : validation.message);

  // Update input border color
  if (emailInput.value.length > 0) {
    emailInput.className = validation.isValid ? "valid" : "invalid";
  } else {
    emailInput.className = "";
  }

  return validation.isValid;
}

/**
 * Validates the message field in real-time as user types
 */
function validateMessageField() {
  const validation = validateMessage(messageInput.value);

  // Update validation icon
  if (messageInput.value.length > 0) {
    updateValidationIcon(messageValidation, validation.isValid);
  } else {
    messageValidation.textContent = "";
  }

  // Update error message
  updateErrorMessage(messageError, validation.isValid ? "" : validation.message);

  // Update textarea border color
  if (messageInput.value.length > 0) {
    messageInput.className = validation.isValid ? "valid" : "invalid";
  } else {
    messageInput.className = "";
  }

  return validation.isValid;
}

// ============================================================================
// LOCALSTORAGE FUNCTIONS
// ============================================================================

/**
 * Saves the current form data to localStorage
 * Called automatically every 2 seconds after user stops typing
 */
function saveFormData() {
  // Create an object with the form data
  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
    savedAt: new Date().toISOString() // Timestamp
  };

  // Save to localStorage as JSON string
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));

  // Show "Draft saved" indicator
  draftIndicator.textContent = "Draft saved ✓";
  draftIndicator.className = "draft-indicator visible";

  // Hide the indicator after 2 seconds
  setTimeout(() => {
    draftIndicator.className = "draft-indicator";
  }, 2000);
}

/**
 * Loads saved form data from localStorage
 * Called when the page loads
 */
function loadFormData() {
  // Get saved data from localStorage
  const savedData = localStorage.getItem(FORM_DATA_KEY);

  // If no saved data exists, return
  if (!savedData) {
    return;
  }

  try {
    // Parse the JSON string
    const formData = JSON.parse(savedData);

    // Populate the form fields
    nameInput.value = formData.name || "";
    emailInput.value = formData.email || "";
    messageInput.value = formData.message || "";

    // Update character counter
    updateCharacterCounter();

    // Validate all fields to show current status
    validateNameField();
    validateEmailField();
    validateMessageField();

    // Show a message that draft was loaded
    draftIndicator.textContent = "Draft loaded ✓";
    draftIndicator.className = "draft-indicator visible";

    setTimeout(() => {
      draftIndicator.className = "draft-indicator";
    }, 3000);
  } catch (error) {
    // If there's an error parsing the data, clear it
    console.error("Error loading form data:", error);
    localStorage.removeItem(FORM_DATA_KEY);
  }
}

/**
 * Clears saved form data from localStorage
 * Called after successful form submission
 */
function clearSavedFormData() {
  localStorage.removeItem(FORM_DATA_KEY);
}

/**
 * Schedules an auto-save after 2 seconds of inactivity
 * Resets the timer each time user types
 */
function scheduleAutoSave() {
  // Clear any existing timer
  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
  }

  // Set a new timer to save after 2 seconds
  autoSaveTimer = setTimeout(() => {
    saveFormData();
  }, 2000);
}

// ============================================================================
// FORM SUBMISSION
// ============================================================================

/**
 * Handles form submission
 * Validates all fields, shows loading state, and displays success message
 * @param {Event} event - The form submit event
 */
async function handleFormSubmit(event) {
  // Prevent default form submission (page reload)
  event.preventDefault();

  // Validate all fields
  const isNameValid = validateNameField();
  const isEmailValid = validateEmailField();
  const isMessageValid = validateMessageField();

  // If any field is invalid, stop submission
  if (!isNameValid || !isEmailValid || !isMessageValid) {
    // Show error message on button briefly
    submitBtn.textContent = "Please fix errors above";
    submitBtn.className = "error-shake";

    setTimeout(() => {
      submitBtn.textContent = "Send";
      submitBtn.className = "";
    }, 2000);

    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  submitBtn.className = "loading";

  // Simulate sending (2-second delay)
  // In a real application, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Clear the form
  contactForm.reset();

  // Clear validation indicators
  nameValidation.textContent = "";
  emailValidation.textContent = "";
  messageValidation.textContent = "";

  // Clear input classes
  nameInput.className = "";
  emailInput.className = "";
  messageInput.className = "";

  // Reset character counter
  updateCharacterCounter();

  // Clear saved draft from localStorage
  clearSavedFormData();

  // Hide the form and show success message
  contactForm.style.display = "none";
  successMessage.classList.add("show");

  // Reset button state
  submitBtn.disabled = false;
  submitBtn.textContent = "Send";
  submitBtn.className = "";
}

/**
 * Handles "Send Another Message" button click
 * Hides success message and shows form again
 */
function handleSendAnother() {
  // Hide success message
  successMessage.classList.remove("show");

  // Show form again
  contactForm.style.display = "grid";

  // Focus on name input
  nameInput.focus();
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Real-time validation as user types
nameInput.addEventListener("input", () => {
  validateNameField();
  scheduleAutoSave();
});

emailInput.addEventListener("input", () => {
  validateEmailField();
  scheduleAutoSave();
});

messageInput.addEventListener("input", () => {
  validateMessageField();
  updateCharacterCounter();
  scheduleAutoSave();
});

// Form submission
contactForm.addEventListener("submit", handleFormSubmit);

// Send another message button
sendAnotherBtn.addEventListener("click", handleSendAnother);

// Load saved form data when page loads
loadFormData();

// Initialize character counter
updateCharacterCounter();

// ============================================================================
// SCROLL ANIMATIONS
// ============================================================================

/**
 * Intersection Observer for Scroll Animations
 * Detects when sections come into view and adds 'visible' class
 * This triggers the CSS animations defined in styles.css
 */

/**
 * Creates an Intersection Observer to watch for elements entering the viewport
 * Think of it like a motion sensor that triggers when you enter a room
 *
 * How it works:
 * 1. Observer watches all sections on the page
 * 2. When a section scrolls into view (intersects with viewport)
 * 3. The 'visible' class is added to that section
 * 4. CSS animations are triggered by the 'visible' class
 */
const scrollObserver = new IntersectionObserver((entries) => {
  // Loop through each observed element
  entries.forEach(entry => {
    // Check if the element is visible in the viewport
    if (entry.isIntersecting) {
      // Add 'visible' class to trigger CSS animations
      entry.target.classList.add('visible');

      // Optional: Stop observing this element after it becomes visible
      // This ensures the animation only happens once
      scrollObserver.unobserve(entry.target);
    }
  });
}, {
  // Configuration options
  threshold: 0.1,    // Trigger when 10% of the element is visible
  rootMargin: '0px'  // No margin around the viewport
});

/**
 * Start observing all sections on the page
 * This includes #about, #projects, and #contact sections
 */
document.querySelectorAll('section').forEach(section => {
  scrollObserver.observe(section);
});

// ============================================================================
// SMOOTH SCROLL NAVIGATION
// ============================================================================

/**
 * Enhanced Smooth Scroll for Navigation Links
 * Adds smooth scrolling behavior when clicking navigation links
 * Even though CSS has scroll-behavior: smooth, this provides more control
 * and works better across all browsers
 */

/**
 * Handles smooth scrolling to sections when nav links are clicked
 * @param {Event} event - The click event
 */
function smoothScrollToSection(event) {
  // Check if the clicked element is a navigation link (not the theme toggle)
  const link = event.target.closest('a[href^="#"]');

  // If not a hash link, exit
  if (!link) return;

  // Prevent default jump behavior
  event.preventDefault();

  // Get the target section ID from the href (e.g., "#about" → "about")
  const targetId = link.getAttribute('href').substring(1);

  // Find the target section element
  const targetSection = document.getElementById(targetId);

  // If section doesn't exist, exit
  if (!targetSection) return;

  // Get the header height to offset scroll position
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;

  // Calculate scroll position (section top - header height - small buffer)
  const targetPosition = targetSection.offsetTop - headerHeight - 20;

  // Smooth scroll to the calculated position
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });

  // Update URL hash without jumping
  history.pushState(null, null, `#${targetId}`);
}

/**
 * Add smooth scroll event listener to navigation
 * This catches all clicks within the nav element
 */
const nav = document.querySelector('nav');
if (nav) {
  nav.addEventListener('click', smoothScrollToSection);
}

// ============================================================================
// PAGE LOAD ANIMATIONS
// ============================================================================

/**
 * Check if user prefers reduced motion
 * This respects accessibility preferences set in the operating system
 */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * If animations are enabled, show first section immediately
 * This prevents a blank page on initial load
 */
if (!prefersReducedMotion) {
  // Make the first section visible immediately on page load
  const firstSection = document.querySelector('section');
  if (firstSection) {
    // Small delay to allow CSS to load
    setTimeout(() => {
      firstSection.classList.add('visible');
    }, 100);
  }
}

/**
 * Handle direct navigation to hash links (e.g., page.html#contact)
 * If user arrives with a hash in the URL, scroll to that section smoothly
 */
window.addEventListener('load', () => {
  // Check if there's a hash in the URL
  if (window.location.hash) {
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
      const targetId = window.location.hash.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Make sure the target section is visible
        targetSection.classList.add('visible');
      }
    }, 300);
  }
});

// ============================================================================
// PARALLAX EFFECT (OPTIONAL ENHANCEMENT)
// ============================================================================

/**
 * Subtle parallax scrolling effect for background images
 * This creates depth by moving background elements at different speeds
 * Only applied if user doesn't prefer reduced motion
 */
if (!prefersReducedMotion) {
  window.addEventListener('scroll', () => {
    // Get scroll position
    const scrolled = window.pageYOffset;

    // Apply parallax effect to about section pseudo-elements (background images)
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      // Calculate parallax offset (moves slower than scroll)
      const parallaxOffset = scrolled * 0.3;

      // Apply transform (this affects the ::before and ::after pseudo-elements)
      aboutSection.style.setProperty('--parallax-offset', `${parallaxOffset}px`);
    }
  });
}