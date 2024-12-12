document.addEventListener('DOMContentLoaded', () => {
    fetch('spaces.json')
        .then(response => response.json())
        .then(data => {
            const spacesContainer = document.getElementById('spaces-container');
            data.forEach(space => {
                const spaceCard = document.createElement('div');
                spaceCard.className = 'space-card';
                spaceCard.innerHTML = `
                    <h2>${space.title}</h2>
                    <p><strong>ID:</strong> ${space.id}</p>
                    <p><strong>Author:</strong> ${space.author}</p>
                    <p><strong>Likes:</strong> ${space.likes}</p>
                    <p><strong>Current Hardware:</strong> ${space.current_hardware}</p>
                    <p><strong>Short Description:</strong> ${space.shortDescription || 'No description available'}</p>
                `;
                spacesContainer.appendChild(spaceCard);
            });
        })
        .catch(error => {
            console.error('Error fetching spaces.json:', error);
            const spacesContainer = document.getElementById('spaces-container');
            spacesContainer.innerHTML = '<p>Failed to load spaces. Please try again later.</p>';
        });
});