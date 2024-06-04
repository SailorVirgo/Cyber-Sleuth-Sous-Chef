const registerFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-register").value.trim();
  const email = document.querySelector("#email-register").value.trim();
  const password = document.querySelector("#password-register").value.trim();

  console.log("Sending data:", { username, email, password }); // Log data before sending

  if (username && email && password) {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        const result = await response.json();
        alert(`Failed to register: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error); // Log any fetch errors
    }
  } else {
    alert("All fields are required.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", registerFormHandler);
  }
});
