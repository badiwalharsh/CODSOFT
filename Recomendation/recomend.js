const userItemRatings = [
    { user: 'User1', item: 'Movie A', rating: 5 },
    { user: 'User1', item: 'Movie B', rating: 4 },
    { user: 'User1', item: 'Movie D', rating: 3 },
    { user: 'User2', item: 'Movie B', rating: 5 },
    { user: 'User2', item: 'Movie C', rating: 2 },
    { user: 'User3', item: 'Movie A', rating: 4 }
];

function recommendMovies() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Please enter a username.');
        return;
    }

    const userRatings = userItemRatings.filter(item => item.user === username);

    if (userRatings.length === 0) {
        alert('No ratings found for the entered username.');
        return;
    }

    const recommendations = getRecommendations(username);

    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = `<h3>Recommendations for ${username}:</h3>`;
    
    if (recommendations.length === 0) {
        recommendationsContainer.innerHTML += `<p>No recommendations found.</p>`;
    } else {
        recommendations.forEach(item => {
            recommendationsContainer.innerHTML += `<p>${item.item}: Predicted Rating = ${item.rating.toFixed(2)}</p>`;
        });
    }
}

function getRecommendations(username) {
    const userRatings = userItemRatings.filter(item => item.user === username);

    const itemsNotRated = userItemRatings
        .filter(item => item.user !== username)
        .filter(item => !userRatings.some(rating => rating.item === item.item));

    const recommendations = [];
    itemsNotRated.forEach(item => {
        const similarUsers = userItemRatings.filter(rating => rating.item === item.item);
        if (similarUsers.length > 0) {
            const averageRating = similarUsers.reduce((sum, rating) => sum + rating.rating, 0) / similarUsers.length;
            recommendations.push({ item: item.item, rating: averageRating });
        }
    });

    recommendations.sort((a, b) => b.rating - a.rating);

    return recommendations;
}
