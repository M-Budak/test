document.addEventListener("DOMContentLoaded", function() {
    fetch('../data/model.json')
        .then(response => response.json())
        .then(data => {
            // URL'den model ID'sini alın
            const urlParams = new URLSearchParams(window.location.search);
            const modelId = urlParams.get('model') || 'egea_sedan'; // Default olarak 'egea_sedan' kullanılır

            const model = data.models.find(m => m.id === modelId);

            if (model) {
                // Sayfa başlığı
                document.title = model.title;

                // Benzer araçları yükleme
                loadSimilarCars(modelId, data.models);
            } else {
                console.error('Model bulunamadı!');
            }
        })
        .catch(error => console.error('JSON dosyası yüklenirken hata oluştu:', error));
});

function loadSimilarCars(modelId, models) {
    fetch('../data/benzer.json')
        .then(response => response.json())
        .then(similarData => {
            const similarModels = similarData[modelId];

            if (similarModels && similarModels.length > 0) {
                const container = document.querySelector('.scrollable-cards');
                container.innerHTML = ''; // Mevcut içeriği temizleyin

                similarModels.forEach(similarId => {
                    const model = models.find(m => m.id === similarId);

                    if (model) {
                        const card = document.createElement('div');
                        card.classList.add('card');
                        card.style.width = '225px';

                        const link = document.createElement('a');
                        link.href = `${model.id}.html?model=${model.id}`;

                        const img = document.createElement('img');
                        img.src = model.image;
                        img.classList.add('card-img-top');
                        img.alt = model.alt;

                        const title = document.createElement('h5');
                        title.classList.add('yeni-eklenen-title');
                        title.textContent = model.name;

                        link.appendChild(img);
                        link.appendChild(title);
                        card.appendChild(link);
                        container.appendChild(card);
                    }
                });
            } else {
                console.error('Benzer araçlar bulunamadı!');
            }
        })
        .catch(error => console.error('Benzer araçlar yüklenirken hata oluştu:', error));
}
