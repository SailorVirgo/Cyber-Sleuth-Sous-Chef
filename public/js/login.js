const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  console.log("Sending data:", { email, password }); // Log data before sending

  if (email && password) {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/homepage");
      } else {
        const result = await response.json();
        alert(`Failed to log in: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during fetch:", error); // Log any fetch errors
    }
  } else {
    alert("All fields are required.");
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
