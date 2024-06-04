document.getElementById('recipe-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.querySelector('#recipe-title').value.trim();
    const description = document.querySelector('#recipe-description').value.trim();
    const instructions = document.querySelector('#recipe-instructions').value.trim();
    const hasNuts = document.querySelector('input[name="nuts"]:checked').value; // Get the selected value for nuts

    if (title && description && hasNuts) {
        console.log(title)
        try {
            const response = await fetch('/api/posts/create-recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, hasNuts, instructions }),
            });

            if (response.ok) {
                window.location.href = '/dashboard';
            } else {
                console.error('Could not create post:', response.statusText);
            }
        } catch (err) {
            console.error('Failed to create post:', err);
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('updateBtn')) {
        const postElement = event.target.closest('.recipes');
        const postId = postElement.dataset.postId;
        const updatedTitle = prompt('Enter updated title:');
        const updatedDescription = prompt('Enter updated description:');
        const updatedInstructions = document.querySelector('#recipe-instructions').value.trim();
        const updatedHasNuts = document.querySelector('input[name="nuts"]:checked').value;

        fetch(`/api/recipes/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: updatedTitle, description: updatedDescription, instructions: updatedInstructions, hasNuts: updatedHasNuts }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Post updated successfully');
                // Optionally update the post element in the UI with the new data
            } else {
                console.error('Error updating post');
            }
        })
        .catch(error => {
            console.error('Error updating post:', error);
        });
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteBtn')) {
        const postElement = event.target.closest('.recipes');
        const postId = postElement.dataset.postId;
        console.log('Post ID:', postId);

        fetch(`/api/recipes/${postId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log('Post deleted successfully');
                postElement.remove();
            } else {
                console.error('Error deleting post');
            }
        })
        .catch(error => {
            console.error('Error deleting post:', error);
        });
    }
});