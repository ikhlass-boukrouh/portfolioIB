document.addEventListener("DOMContentLoaded", () => {
  // Check for hash in URL when page loads (for back navigation from detail pages)
  checkHashOnLoad()
  
  // Initialize active navigation
  setActiveNav()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize theme toggle
  initThemeToggle()

  // Initialize skills toggle functionality
  initSkillsToggle()

  // Initialize EmailJS
  initEmailJS()
})

// Simple function to handle hash navigation only on page load
function checkHashOnLoad() {
  const hash = window.location.hash
  if (hash === '#research-section') {
    // If coming back from a detail page, show research section
    showContent('research-section')
  } else if (!hash) {
    // Default to home section if no hash
    showContent('home-section')
  }
}

// Initialize EmailJS with your public key
function initEmailJS() {
  emailjs.init("MtYAZ9L8ukr4_WpGw")
}

// Send email using EmailJS
function sendEmail(event) {
  event.preventDefault()

  // Get form elements
  const form = document.getElementById("contact-form")
  const submitButton = document.getElementById("submit-button")
  const successMessage = document.getElementById("success-message")
  const errorMessage = document.getElementById("error-message")

  // Hide any previous messages
  successMessage.style.display = "none"
  errorMessage.style.display = "none"

  // Add loading state to button
  submitButton.classList.add("loading")
  submitButton.innerHTML = '<span class="loading-spinner"></span>Sending...'
  submitButton.disabled = true

  // Prepare template parameters
  const templateParams = {
    from_name: document.getElementById("contact-name").value,
    from_email: document.getElementById("contact-email").value,
    subject: document.getElementById("contact-subject").value,
    message: document.getElementById("contact-message").value,
    to_email: "ikhlassboukrouh@gmail.com",
  }

  // Send the email
  emailjs.send("service_f4rv0al", "template_kh7oc6s", templateParams, "MtYAZ9L8ukr4_WpGw").then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text)

      // Show success message
      successMessage.style.display = "block"

      // Reset form
      form.reset()

      // Reset button
      submitButton.classList.remove("loading")
      submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message'
      submitButton.disabled = false
    },
    (error) => {
      console.log("FAILED...", error)

      // Show error message
      errorMessage.style.display = "block"

      // Reset button
      submitButton.classList.remove("loading")
      submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message'
      submitButton.disabled = false
    },
  )
}

// Submit course notification form
function submitCourseForm(event) {
  event.preventDefault()

  // Get form elements
  const form = document.getElementById("notifyForm")
  const submitButton = form.querySelector(".submit-button")
  const successMessage = document.getElementById("notify-success-message")
  const errorMessage = document.getElementById("notify-error-message")

  // Hide any previous messages
  successMessage.style.display = "none"
  errorMessage.style.display = "none"

  // Add loading state to button
  submitButton.classList.add("loading")
  submitButton.innerHTML = '<span class="loading-spinner"></span>Sending...'
  submitButton.disabled = true

  // Get selected interests
  const interestCheckboxes = form.querySelectorAll('input[name="interests"]:checked')
  const interests = Array.from(interestCheckboxes)
    .map((cb) => cb.value)
    .join(", ")

  // Prepare template parameters
  const templateParams = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    interests: interests || "None selected",
    to_email: "boukrouh.ikhlass@gmail.com",
    subject: "Course Notification Request",
  }

  // Send the email
  emailjs.send("service_f4rv0al", "template_kh7oc6s", templateParams, "MtYAZ9L8ukr4_WpGw").then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text)

      // Show success message
      successMessage.style.display = "block"

      // Reset form
      form.reset()

      // Reset button
      submitButton.classList.remove("loading")
      submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Subscribe'
      submitButton.disabled = false
    },
    (error) => {
      console.log("FAILED...", error)

      // Show error message
      errorMessage.style.display = "block"

      // Reset button
      submitButton.classList.remove("loading")
      submitButton.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Subscribe'
      submitButton.disabled = false
    },
  )
}

// Theme toggle
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle")
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle")

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener("click", toggleTheme)
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode")
  // Save theme preference
  const isDarkMode = document.body.classList.contains("dark-mode")
  localStorage.setItem("theme", isDarkMode ? "dark" : "light")
}

// Mobile menu
function initMobileMenu() {
  const menuOpen = document.getElementById("menu-open")
  const menuClose = document.getElementById("menu-close")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (menuOpen && mobileMenu) {
    menuOpen.addEventListener("click", () => {
      mobileMenu.classList.add("active")
    })
  }

  if (menuClose && mobileMenu) {
    menuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  }
}

// Improve the mobile menu functionality to ensure it closes properly after navigation
function closeMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu")
  if (mobileMenu) {
    mobileMenu.classList.remove("active")
  }
}

// Section navigation - Keep original functionality
function showContent(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active")
  })

  // Show selected section
  const selectedSection = document.getElementById(sectionId)
  if (selectedSection) {
    selectedSection.classList.add("active")
  }

  // Update active nav link
  setActiveNav(sectionId)

  // Scroll to top
  window.scrollTo(0, 0)
}

function setActiveNav(sectionId = "home-section") {
  // Remove active class from all nav links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active")
  })

  // Add active class to current section nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("onclick") && link.getAttribute("onclick").includes(sectionId)) {
      link.classList.add("active")
    }
  })
}

function showForm() {
  document.getElementById("notifyContainer").style.display = "block" // Show the form
  document.getElementById("notifyButton").style.display = "none" // Hide the button
}

// Update typewriter animation for AI roles
document.addEventListener("DOMContentLoaded", () => {
  const typewriterSpan = document.querySelector(".typewriter span")
  if (typewriterSpan) {
    typewriterSpan.style.setProperty("--before-content", '"AI Researcher"')
  }
})

function initSkillsToggle() {
  // Get all toggle buttons
  const toggleButtons = [
    { toggle: document.getElementById("ai-modeling-toggle"), details: document.getElementById("ai-modeling-details") },
    {
      toggle: document.getElementById("statistical-analysis-toggle"),
      details: document.getElementById("statistical-analysis-details"),
    },
    {
      toggle: document.getElementById("tools-programming-toggle"),
      details: document.getElementById("tools-programming-details"),
    },
    {
      toggle: document.getElementById("academic-editorial-toggle"),
      details: document.getElementById("academic-editorial-details"),
    },
    { toggle: document.getElementById("languages-toggle"), details: document.getElementById("languages-details") },
  ]

  // Add click event listeners to each toggle button
  toggleButtons.forEach((item) => {
    if (item.toggle && item.details) {
      item.toggle.addEventListener("click", () => {
        // Toggle active class on the details container
        item.details.classList.toggle("active")
        // Toggle active class on the toggle button
        item.toggle.classList.toggle("active")

        // Update the description text
        const descriptionEl = item.toggle.querySelector(".category-description")
        if (descriptionEl) {
          descriptionEl.textContent = item.details.classList.contains("active") ? "Show less" : "Show more"
        }
      })
    }
  })
}