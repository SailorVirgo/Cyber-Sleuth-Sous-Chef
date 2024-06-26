document.addEventListener("DOMContentLoaded", () => {
  const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
      try {
        const response = await fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.replace("/dashboard");
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
});
