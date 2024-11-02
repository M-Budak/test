let reviewsData = {};

document.addEventListener('DOMContentLoaded', function() {
    fetch('yorumlar.json')
        .then(response => response.json())
        .then(data => {
            reviewsData = data;
        })
        .catch(error => console.error('Error fetching reviews data:', error));
});

function showReviews(category) {
    const reviewsContainer = document.getElementById('yorumlar');
    reviewsContainer.innerHTML = '';

    if (reviewsData[category]) {
        reviewsData[category].forEach(review => {
            const reviewElement = createReviewElement(review);
            reviewsContainer.appendChild(reviewElement);
        });
    }
}

function createReviewElement(review) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    const cardTitle = document.createElement('h4');
    cardTitle.className = 'card-title';
    cardTitle.innerHTML = `<strong>${review.author}</strong> - ${review.title}`;
    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = `${review.date} ${review.duration}`;
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardText);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    const cardContent = document.createElement('p');
    cardContent.className = 'card-text';
    cardContent.textContent = review.content;
    cardBody.appendChild(cardContent);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    return card;
}
