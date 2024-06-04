document
  .getElementById("recipe-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector("#recipe-title").value.trim();
    const description = document
      .querySelector("#recipe-description")
      .value.trim();
    const instructions = document
      .querySelector("#recipe-instructions")
      .value.trim();
    const hasNuts = document.querySelector('input[name="nuts"]:checked').value;
    const ingredients = document
      .querySelector("#recipe-ingredients")
      .value.trim();

    if (name && description && instructions && hasNuts && ingredients) {
      try {
        const response = await fetch("/api/recipe/create-recipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            instructions,
            ingredients,
            has_nuts: hasNuts,
          }),
        });

        if (response.ok) {
          const newPost = await response.json();
          console.log("New post created:", newPost);
          window.location.href = "/dashboard";
        } else {
          console.error("Could not create post:", response.statusText);
        }
      } catch (err) {
        console.error("Failed to create post:", err);
      }
    }
  });

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("updateBtn")) {
    const postElement = event.target.closest(".recipes");
    const postId = postElement.dataset.postId;
    const updatedTitle = prompt("Enter updated title:");
    const updatedDescription = prompt("Enter updated description:");
    const updatedInstructions = prompt("Enter updated instructions:");
    const updatedHasNuts = prompt("Does it contain nuts? (yes/no)") === "yes";

    fetch(`/api/recipe/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: updatedTitle,
        description: updatedDescription,
        instructions: updatedInstructions,
        has_nuts: updatedHasNuts,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Post updated successfully");
          window.location.reload();
        } else {
          console.error("Error updating post");
        }
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  }

  if (event.target.classList.contains("deleteBtn")) {
    const postElement = event.target.closest(".recipes");
    const postId = postElement.dataset.postId;

    fetch(`/api/recipe/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Post deleted successfully");
          postElement.remove();
        } else {
          console.error("Error deleting post");
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  }
});
