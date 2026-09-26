document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer if it exists
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear().toString()
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle")
  const themeIcons = document.querySelectorAll(".theme-icon")

  // Check for saved theme preference or use system preference
  const getTheme = () => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      return savedTheme
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  
  function swapLogo(){
       // Target the logo image
    const logo = document.getElementById('logo');
  
      // Check the current theme and update logo accordingly
    if (document.documentElement.classList.contains('dark')) {
      // If it's dark theme, switch to the bright logo
      logo.src = 'images/4KHDHUB-Bright-Logo.png';
    } else {
      // If it's light theme, switch to the dark logo
      logo.src = 'images/4KHDHUB-Dark-Logo.png';
    }
  }
  

  // Apply theme to document
  const applyTheme = (theme) => {
    
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
      themeIcons.forEach((icon) => {
        // Moon icon for dark mode
        icon.innerHTML = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      `
      })
      
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
      themeIcons.forEach((icon) => {
        // Sun icon for light mode
        icon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `
      })
    }
    localStorage.setItem("theme", theme);
    swapLogo();
  }

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = getTheme()
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    applyTheme(newTheme)
  }

  // Initialize theme
  const initialTheme = getTheme()
  applyTheme(initialTheme)

  // Add event listener for theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  // Mobile menu functionality - SINGLE MENU APPROACH
  const menuToggle = document.getElementById("menu-toggle")
  const mainNav = document.getElementById("main-nav")
  const header = document.querySelector('.header');

  const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop")
  const closeMobileMenuButton = document.getElementById("close-mobile-menu")

  // Function to open mobile menu
  const openMobileMenu = () => {
    mainNav.classList.add("open")
    mobileMenuBackdrop.classList.remove("hidden")
    closeMobileMenuButton.classList.remove("hidden")
    document.body.style.overflow = "hidden" // Prevent scrolling
    header.style.backdropFilter = 'none';
    
  }

  // Function to close mobile menu
  const closeMobileMenu = () => {
    mainNav.classList.remove("open")
    mobileMenuBackdrop.classList.add("hidden")
    closeMobileMenuButton.classList.add("hidden")
    document.body.style.overflow = "" // Restore scrolling
    header.style.backdropFilter = 'blur(16px)';
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", openMobileMenu)

    // Close mobile menu when clicking outside
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.addEventListener("click", closeMobileMenu)
    }

    // Close mobile menu when clicking the close button
    if (closeMobileMenuButton) {
      closeMobileMenuButton.addEventListener("click", closeMobileMenu)
    }

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mainNav.querySelectorAll("a:not(.dropdown-toggle)")
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu)
    })
  }

  // Dropdown functionality - works for both mobile and desktop
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault()

      const isMobile = window.innerWidth < 768
      const dropdown = toggle.closest(".dropdown")
      const dropdownMenu = dropdown.querySelector(".dropdown-menu")
      const chevron = toggle.querySelector("svg")

      if (isMobile) {
        // Mobile dropdown behavior - toggle open/closed
        dropdownMenu.classList.toggle("open")

        if (chevron) {
          chevron.style.transform = dropdownMenu.classList.contains("open") ? "rotate(180deg)" : "rotate(0deg)"
        }
      } else {
        // Desktop dropdown behavior - only needed for click (not hover)
        // This is optional since we're using hover on desktop
      }
    })
  })

  // Mobile search functionality
  const searchToggle = document.getElementById("search-toggle")
  const searchOverlay = document.getElementById("search-overlay")
  const closeSearch = document.getElementById("close-search")
  
  const searchBackdrop = document.getElementById("search-overlay")
  
  const searchForm = document.querySelector('.search-form');
const searchInput = searchForm?.querySelector('input[name="s"]');


const searchSubmitBtn = searchForm?.querySelector('.search-submit');

if (searchSubmitBtn && searchForm && searchInput) {
    
    console.log("inside searchSubmitBtn present ");
    
    
  searchSubmitBtn.addEventListener('click', (e) => {
      
     
    e.preventDefault();      // ✅ stop the form from submitting instantly
    e.stopPropagation();     // ✅ stop bubbling to backdrop

  console.log("searchSubmitBtn clicked ");
      

    const value = searchInput.value.trim();
    if (value !== '') {
      searchForm.submit(); // ✅ Manually submit the form
    } else {
      searchInput.focus(); // Optionally refocus or show a message
    }
  });

  // Optional: prevent clicks on the form itself from closing modal
  searchForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener("click", () => {
      searchOverlay.classList.remove("hidden")
      // Focus the search input
      const searchInput = searchOverlay.querySelector('input[type="search"]')
      if (searchInput) {
        setTimeout(() => {
          searchInput.focus()
        }, 100)
      }
    })

    // Close search when clicking the close button
    if (closeSearch) {
      closeSearch.addEventListener("click", () => {
        searchOverlay.classList.add("hidden")
      })
    }

    // Close search when clicking outside
    if (searchBackdrop) {
      searchBackdrop.addEventListener("click", (e) => {
          
          console.log("e.target : ",e.target);
          
        if (e.target === searchBackdrop) {
            searchOverlay.classList.add("hidden");
        }
        
        // searchOverlay.classList.add("hidden")
      })
    }

    // Close search when pressing Escape
    document.addEventListener("keydown", (e) => {
        
      if (e.key === "Escape" && !searchOverlay.classList.contains("hidden")) {
        searchOverlay.classList.add("hidden")
      }
      
    })
  }

  // Back to top button functionality
  const backToTopButton = document.getElementById("back-to-top")

  if (backToTopButton) {
    // Show button when page is scrolled down
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.remove("opacity-0", "pointer-events-none")
        backToTopButton.classList.add("opacity-100")
      } else {
        backToTopButton.classList.remove("opacity-100")
        backToTopButton.classList.add("opacity-0", "pointer-events-none")
      }
    })

    // Scroll to top when button is clicked
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
})
