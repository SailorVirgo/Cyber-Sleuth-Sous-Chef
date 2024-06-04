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

    if (name && description && instructions && hasNuts) {
      try {
        const response = await fetch("/api/recipe/create-recipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            instructions,
            has_nuts: hasNuts,
          }),
        });

        if (response.ok) {
          const newPost = await response.json();
          console.log("New post created:", newPost);

          // Append new post to the DOM
          const postList = document.querySelector(".recipes");
          const postElement = document.createElement("div");
          postElement.classList.add("recipes");
          postElement.dataset.postId = newPost.id;
          postElement.innerHTML = `
            <h3>${newPost.name}</h3>
            <p>${newPost.description}</p>
            <p>${newPost.instructions}</p>
            <p>${newPost.has_nuts ? "Contains nuts" : "No nuts"}</p>
            <button class="updateBtn btn btn-primary" type="update">Update</button>
            <button class="deleteBtn btn btn-primary" type="delete">Delete</button>
          `;
          postList.appendChild(postElement);
          window.location.href = "/dashboard"; // Optionally redirect to the dashboard
        } else {
          console.error("Could not create post:", response.statusText);
        }
      } catch (err) {
        console.error("Failed to create post:", err);
      }
    }
  });
