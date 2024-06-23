document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/games', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Error while fetching game list');
        }
        const games = await response.json();
        console.log('Game list:', games);

        const gamesListContainer = document.getElementById('gameList');
        games.forEach(game => {
            const gameElement = document.createElement('li');
            gameElement.innerHTML = `
                <h2>${game.title}</h2>
                <p><strong>Genres:</strong> ${game.genres.join(', ')}</p>
                <button class="like-button" data-game-id="${game._id}">Like</button>
                <hr>
            `;
            gamesListContainer.appendChild(gameElement);
        });

        document.querySelectorAll('.like-button').forEach(button => {
            button.addEventListener('click', async function() {
                const gameId = this.getAttribute('data-game-id');
                try {
                    const response = await fetch('/like', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ gameId })
                    });
                    if (!response.ok) {
                        throw new Error('Error when sending a like');
                    }
                    const result = await response.json();
                    console.log(result.message);
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
