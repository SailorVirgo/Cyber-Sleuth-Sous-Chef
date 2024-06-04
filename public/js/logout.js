const logout = async () => {
  try {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log out.");
    }
  } catch (error) {
    console.error("Error during fetch:", error); // Log any fetch errors
  }
};

document.querySelector("#logout").addEventListener("click", logout);
