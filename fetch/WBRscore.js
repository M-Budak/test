let scoreData = {};
let motorlarData = {};
let dataJson = {};

document.addEventListener('DOMContentLoaded', function() {
    fetch('../data/score.json')
        .then(response => response.json())
        .then(data => {
            scoreData = data;
        })
        .catch(error => console.error('Error fetching score data:', error));

    fetch('../data/motorlar.json')
        .then(response => response.json())
        .then(data => {
            motorlarData = data;
        })
        .catch(error => console.error('Error fetching motorlar data:', error));

    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            dataJson = data;
            showScoresForModel();
        })
        .catch(error => console.error('Error fetching data.json:', error));
});

function showScoresForModel() {
    const urlParams = new URLSearchParams(window.location.search);
    const modelParam = urlParams.get('model').toLowerCase();

    // data.json içinde slug ile eşleşen ID'yi bul
    let idKey = null;
    for (const [key, value] of Object.entries(dataJson)) {
        if (value.slug.toLowerCase() === modelParam) {
            idKey = key;
            break;
        }
    }

    if (!idKey) {
        console.error('Model slug not found in data.json');
        return;
    }

    // motorlar.json içinde bu ID'ye karşılık gelen alt ID'leri bul
    const altIdList = motorlarData[idKey];

    if (!altIdList || altIdList.length === 0) {
        console.error('No sub-IDs found in motorlar.json for the given model');
        return;
    }

    // Alt ID'leri kullanarak score.json içinden skorları bul ve göster
    let scoreFound = false;
    for (const altId of altIdList) {
        if (scoreData[altId]) {
            scoreFound = true;
            showScores(altId);  // showScores function should display the scores
            break;
        }
    }

    if (!scoreFound) {
        console.log('Bu model için skor bulunamadı.');
    }
}

function showScores(category) {
    const scoreContainer = document.getElementById('score');
    scoreContainer.innerHTML = '';

    const categoryData = scoreData[category];
    if (!categoryData) {
        console.error('Skorlar yüklenemedi.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const model = urlParams.get('model');
    const modelUrl = model ? `../puan_ver.html?page=${encodeURIComponent(model)}` : '#';

    const scoreElement = document.createElement('div');
    scoreElement.className = 'col-md-6';
    scoreElement.innerHTML = `
        <div class="row">
            <div class="col-7">
                <h2 class="skor-baslik">Skor</h2>
                <p class="skor-bilgi">Bu sonuçlar kullanıcılar tarafından verilen puanların ortalamasıdır.</p>
                <a href="${modelUrl}" class="modal-btn-oy">Oy Ver</a>
            </div>
            <div class="skor col-5">
                <p>
                    <span class="skor_number">${categoryData.average}</span>
                    <span class="skor_unit">/ 5</span>
                </p>
                <p class="skor-oy">${categoryData.votes} Oy</p>
            </div>
        </div>
    `;
    scoreContainer.appendChild(scoreElement);

    const scoresElement = document.createElement('div');
    scoresElement.className = 'skor-puan col-md-6';
    let categoriesHtml = '';
    for (const [key, value] of Object.entries(categoryData.categories)) {
        categoriesHtml += `
            <div class="col-4">
                <h4>${key}</h4>
                <p>
                    <span class="s_number">${value}</span>
                    <span class="s_unit">/ 5</span>
                </p>
            </div>
        `;
    }
    scoresElement.innerHTML = `<div class="row">${categoriesHtml}</div>`;
    scoreContainer.appendChild(scoresElement);
}
