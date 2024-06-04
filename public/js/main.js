document.addEventListener("DOMContentLoaded", () => {
  // Function to toggle navigation menu
  const toggleNav = () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("open");
  };

  // Event listener for toggling the navigation menu
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
  }

  // Function to display a notification
  const showNotification = (message, type = "info") => {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Function to validate forms
  const validateForm = (form) => {
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    let valid = true;

    inputs.forEach((input) => {
      const errorElement = input.nextElementSibling;
      if (!input.value.trim()) {
        valid = false;
        input.classList.add("invalid");
        if (errorElement) errorElement.textContent = "This field is required.";
      } else {
        input.classList.remove("invalid");
        if (errorElement) errorElement.textContent = "";
      }
    });

    return valid;
  };

  // Event listener for form submission
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!validateForm(form)) {
        event.preventDefault();
        showNotification("Please fill in all required fields", "error");
      }
    });
  });

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    const darkModeEnabled = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", darkModeEnabled);
  };

  // Event listener for dark mode toggle
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", toggleDarkMode);
  }

  // Check and apply dark mode preference on load
  const darkModeEnabled = JSON.parse(localStorage.getItem("darkMode"));
  if (darkModeEnabled) {
    document.body.classList.add("dark-mode");
  }

  // Function to show AJAX loader
  const showLoader = () => {
    const loader = document.createElement("div");
    loader.className = "ajax-loader";
    document.body.appendChild(loader);
  };

  // Function to hide AJAX loader
  const hideLoader = () => {
    const loader = document.querySelector(".ajax-loader");
    if (loader) {
      loader.remove();
    }
  };

  // Utility function to trigger custom AJAX events
  const triggerEvent = (eventName) => {
    const event = new Event(eventName);
    document.dispatchEvent(event);
  };

  // Wrap fetch to include loader events
  const customFetch = async (url, options) => {
    triggerEvent("ajaxStart");
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }
      return response;
    } finally {
      triggerEvent("ajaxStop");
    }
  };

  // Handle login form submission
  const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
      try {
        const response = await customFetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.replace("/homepage");
        } else {
          const errorData = await response.json();
          alert(`Failed to log in: ${errorData.message}`);
        }
      } catch (error) {
        alert(`Login error: ${error.message}`);
      }
    }
  };

  const loginForm = document.querySelector(".login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", loginFormHandler);
  }

  const registerForm = document.querySelector(".register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", registerFormHandler);
  }
});
